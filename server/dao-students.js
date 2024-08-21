'use strict';

/* Data Access Object (DAO) module for accessing students data */

const db = require('./db');

const convertStudentFromDbRecord = (dbRecord) => {
    const student = {};
    student.id = dbRecord.id;
    student.email = dbRecord.email;
    student.name = dbRecord.name;
    student.has_study_plan = dbRecord.has_study_plan;
    // This function doesn't include the password
    return student;
}

// This function retrieves the list of all students
exports.listStudents = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM students';
        db.all(sql, (err, rows) => {
            if(err) { reject(err); }

            const students = rows.map((e) => {
                const students = convertStudentFromDbRecord(e);
                return students;
            });
            resolve(students);
        });
    });
};

exports.getStudent = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM students WHERE id=?';
        db.get(sql, [id], (err, row) => {
            if(err) { 
                reject(err);
            }

            if(row == undefined){
                resolve({ error: 'Student not found'});
            } else {
                const student = convertStudentFromDbRecord(row);
                resolve(student);
            }
        });
    });
};