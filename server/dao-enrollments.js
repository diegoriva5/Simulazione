'use strict';

/* Data Access Object (DAO) module for accessing enrollments data */

const db = require('./db');

exports.getCourseFromStudentID = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT course_code FROM enrollments WHERE student_id=?';
      db.all(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row == undefined) {
          resolve({ error: 'Course not found.' });
        } else {
          resolve({ course_code: row.course_code });
        }
      });
    });
};

exports.addCourseToStudent = (code, id) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO enrollments (student_id, course_code) VALUES(?, ?)';
      db.run(sql, [id, code], (err, row) => {
        if (err) {
          reject(err);
        }
      });
    });
};

// This function deletes an existing student_id/course_code pair.
exports.deleteCourseFromStudent = (code, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM enrollments WHERE student_id=? and course_code=?';
    db.run(sql, [id, code], function (err) {
      if (err) {
        reject(err);
      } else
        resolve(this.changes);
    });
  });
}