'use strict';

/* Data Access Object (DAO) module for accessing incompatibilities data */

const db = require('./db');

exports.getIncompatiblesFromCode = (code) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT incompatible_code FROM incompatibilities where course_code=?';
      db.all(sql, [code], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row == undefined) {
          resolve({ error: 'Course not found.' });
        } else {
          const courses = row.map((e) => {
            return e.incompatible_code;
          });
          resolve(courses);
        }
      });
    });
};