import CliTable from 'cli-table';
import { green, white, yellow, red } from 'chalk';

export default class CliUtil {
  /**
   * Return Cli Text Formats
   *
   * @returns {Object}
   */
  static cliTextFormats() {
    const normal = white.bold;
    const success = green.bold;
    const warning = yellow.bold;
    const error = red.bold;

    return {
      normal,
      success,
      warning,
      error,
    };
  }

  /**
   * Write Data As Table Formatted To Cli
   *
   * @param {Array<Array<String>>} rows
   * @returns {Table}
   */
  static generateCliTable(rows) {
    const table = new CliTable({ style: { 'padding-left': 2 } });

    if (rows) {
      table.push(...rows);
    }

    return table;
  }
}
