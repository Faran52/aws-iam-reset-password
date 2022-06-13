import fs from 'fs/promises';
import AWS from 'aws-sdk';
import ProgressBar from 'progress';
import generator from 'generate-password';

import CliUtil from '../cli/util';
import GetFromCli from '../cli/get-from-cli';

class Reset {
  static async main() {
    const {
      normal,
      success,
      error,
    } = CliUtil.cliTextFormats();

    let profiles = await GetFromCli.getProfiles();

    // Only get AWS Profiles If All Is Needed
    if (profiles[0] === 'all') {
      const filePath = await GetFromCli.getFilePath();

      console.log(
        `Extracting ${normal('AWS')} profiles from ${normal(filePath)}...`,
      );

      profiles = await this.#getProfiles(filePath);
      if (profiles.length === 0) {
        console.log(
          error(`No profiles found at ${filePath}!`),
        );
        return;
      }

      console.log(
        `${success(profiles.length.toString())} profiles found for ${normal(filePath)}...`,
      );
    }

    const username = await GetFromCli.getUsername();
    const responseRows = await this.#resetPasswords(username, profiles);

    let table = [
      [
        'Profile',
        'Password',
        'Updated',
        'Error',
      ],
    ].concat(responseRows);

    table = table.map((r, index) => {
      if (index === 0) {
        r = r.map((r) => normal(r));
      } else {
        r[0] = normal(r[0]);
        r[1] = success(r[1]);
        r[2] = r[2] ? success(r[2]) : error(r[2]);
        r[3] = r[3] !== 'N/A' ? error([r[3]]) : 'N/A';
      }

      return r;
    });

    // Print Response As Table
    const cliTable = CliUtil.generateCliTable(table);
    console.log(
      `\n${normal('Password reset summary:')}\n\n${cliTable}`,
    );
  }

  /**
   * Resets IAM password for provided profile array
   *
   * @param {String} username
   * @param {Array<String>} profiles
   * @returns {Promise<Array<String>>}
   */
  static async #resetPasswords(username, profiles) {
    const password = generator.generate({
      length: 20,
      numbers: true,
      symbols: true,
    });

    const updatedPasswordArray = [];

    console.log(
      `Attempting password reset for ${profiles.length} profiles`,
    );
    const progressBar = new ProgressBar('[:bar] :current/:total :percent', { total: profiles.length, width: 20 });
    progressBar.render();

    // eslint-disable-next-line no-restricted-syntax
    for await (const c of profiles) {
      if (c !== '') {
        const credentials = new AWS.SharedIniFileCredentials({ profile: c });
        const iam = new AWS.IAM({
          apiVersion: '2010-05-08',
          credentials,
        });

        const payload = [
          c,
          password,
          true,
          'N/A',
        ];

        try {
          const params = {
            UserName: username,
            Password: password,
            PasswordResetRequired: false,
          };
          await iam.updateLoginProfile(params).promise();
        } catch ({ message, stack, code }) {
          payload[2] = false;
          payload[3] = message;
        }

        progressBar.tick();
        updatedPasswordArray.push(payload);
      }
    }

    return updatedPasswordArray;
  }

  /**
   * Get Profiles Names From AWS Credentials File
   *
   * @returns {Promise<Array<*>>}
   */
  static async #getProfiles(filePath) {
    const results = [];
    try {
      const regex = /\[([^\][]*)]/g;
      const responseFile = await fs.readFile(filePath, 'utf-8');
      let m = regex.exec(responseFile);
      while (m) {
        results.push(m[1]);
        m = regex.exec(responseFile);
      }
      results.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return results;
  }
}

export const command = 'reset';
export const aliases = '*';
export const describe = 'Reset IAM user password';
export const handler = () => Reset.main();
