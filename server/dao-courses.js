'use strict';

/* Data Access Object (DAO) module for accessing courses data */

const db = require('./db');

const convertCourseFromDbRecord = (dbRecord) => {
    const course = {};
    course.code = dbRecord.code;
    course.name = dbRecord.name;
    course.credits = dbRecord.credits;
    course.max_students = dbRecord.max_students;
    course.mandatory_exam = dbRecord.mandatory_exam;

    return course;
}


// This function retrieves the list of all courses from the database
exports.listCourses = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM courses';
      db.all(sql, (err, rows) => {
        if (err) { reject(err); }
  
        const courses = rows.map((e) => {
          const courses = convertCourseFromDbRecord(e);
          return courses;
        });
        resolve(courses);
      });
    });
};

// This function retrieves a course given its code.
exports.getCourseFromCode = (code) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM courses WHERE code=?';
      db.get(sql, [code], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row == undefined) {
          resolve({ error: 'Course not found.' });
        } else {
          const course = convertCourseFromDbRecord(row);
          resolve(course);
        }
      });
    });
};

// This function retrieves the maximum number of studentr of a course given its code.
exports.getMaxStudFromCode = (code) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT max_students FROM courses WHERE code=?';
      db.get(sql, [code], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row == undefined) {
          resolve({ error: 'Course not found.' });
        } else {
          resolve({ max_students: row.max_students });
        }
      });
    });
};

// This function retrieves the mandatory exam from a course given its code.
exports.getMandatoryExamOfCourse = (code) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT mandatory_exam FROM courses WHERE code=?';
      db.get(sql, [code], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row == undefined) {
          resolve({ error: 'Course not found.' });
        } else {
          resolve({ mandatory_exam: row.mandatory_exam });
        }
      });
    });
};