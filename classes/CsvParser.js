'use strict';

const csv = require('csv-parse');

const defaultParserOptions = {
  delimiter: ',',
  newline: '\n',
  escapeChar: '"',
  enclosedChar: '"',
  relax: true,
  relax_column_count: true
}

class CsvParser {
  constructor (rs, Model) {
    if (!rs) throw new Error('rs is not defined');
    if (!Model) throw new Error('Model is not defined');
    this.rs = rs;
    this.Model = Model;
    this._i = 0;
    this._result = { success: 0, fail: 0 };
    this._fileData = {}
  }

  async parse ({ options, columns }) {
    options = Object.assign({}, options, defaultParserOptions || {});
    if (columns) options.columns = columns;
    const parser = csv(options);
    this._stream = this.rs.pipe(parser);

    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this.rs.on('error', err => {
        this._end();
        reject(err);
      });

      this._stream.on('error', err => {
        this._end();
        reject(err);
      });

      this._stream.on('end', () => {
        this._ended = true;
        if (this._i !== 0) return;
        this._end();
        resolve(this._result);
      })

      this._stream.on('data', (data) => {
        this._dataHandler(data);
      });
    })
  }

  async _dataHandler (data) {
    this._add();
    try {
      await this.Model.updateDoc(data, this._fileData);
      this._result.success++;
      this._minus();
    } catch (err) {
      console.error(err);
      this._result.fail++;
      return this._minus();
    }
  }

  _add () {
    this.rs.pause();
    this._i++;
  }

  _minus () {
    this._i--;
    if (this._i !== 0) return;
    if (!this._ended) return this.rs.resume();
    this._end();
    this._resolve(this._result);
  }

  _end () {
    this._stream.removeAllListeners();
    this.rs.removeAllListeners();
  }
}

module.exports = CsvParser;
