import inquirer from 'inquirer';
import os from 'os';
import path from 'path';

export default class GetFromCli {
  /**
   * Get Profiles From cli
   *
   * @returns {Promise<Array<String>>}
   */
  static async getProfiles() {
    const { profiles } = await inquirer.prompt([
      {
        type: 'input',
        message: 'AWS alias profile',
        name: 'profiles',
        default: 'all',
      },
    ]);

    return profiles.split(',');
  }

  /**
   * Get Credentials File Path Stored At ~/.aws/credentials
   *
   * @returns {Promise<String>}
   */
  static async getFilePath() {
    const { filePath } = await inquirer.prompt([
      {
        type: 'input',
        message: 'AWS credentials file path',
        name: 'filePath',
        default: '~/.aws/credentials',
      },
    ]);

    if (!filePath.startsWith('~')) {
      return filePath;
    }

    const userHomeDir = os.homedir();
    return path.join(userHomeDir, filePath.substring(1));
  }

  /**
   * Get Credentials File Path Stored At ~/.aws/credentials
   *
   * @returns {Promise<String>}
   */
  static async getUsername() {
    const { username } = await inquirer.prompt([
      {
        type: 'input',
        message: 'AWS IAM username',
        name: 'username',
        validate: (u) => {
          if (u) {
            return true;
          }

          return 'IAM username is required to reset password';
        },
      },
    ]);

    return username;
  }
}
