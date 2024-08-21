/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const { check, validationResult, oneOf } = require('express-validator'); // validation middleware
const cors = require('cors');

const courseDao = require('./dao-courses');
const enrollmentsDao = require('./dao-enrollments');
const incompatibilitiesDao = require('./dao-incompatibilities');
const studentsDao = require('./dao-students');

/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());


  

/*** Utility Functions ***/

// This function is used to format express-validator errors as strings
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

/*** Courses APIs ***/

app.get('/api/list-courses',
    (req, res) => {
        courseDao.listCourses()
            .then(courses => res.json(courses))
            .catch((err) => res.status(500).json(err));
    }
);

app.get('/api/get-course-from-code/:code',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        courseDao.getCourseFromCode(req.params.code)
            .then(course => res.json(course))
            .catch((err) => res.status(500).json(err));
    }
);


app.get('/api/get-maxstud-from-code/:code',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        courseDao.getMaxStudFromCode(req.params.code)
            .then(course => res.json(course))
            .catch((err) => res.status(500).json(err));
    }
);

app.get('/api/get-mandatory-from-code/:code',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        courseDao.getMandatoryExamOfCourse(req.params.code)
            .then(course => res.json(course))
            .catch((err) => res.status(500).json(err));
    }
);

/* Incompatibles APIs */

app.get('/api/get-incompatibilities-from-code/:code',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        incompatibilitiesDao.getIncompatiblesFromCode(req.params.code)
            .then(course => res.json(course))
            .catch((err) => res.status(500).json(err));
    }
);

/* Enrollments APIs */ 

app.post('/api/add-course-to-student/:code/:id',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
        check('code').isInt().withMessage('Invalid student id')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const result = enrollmentsDao.addCourseToStudent(req.params.code, req.params.id);
            res.json(result);
        } catch{
            res.status(503).json({ error: `Database error during the creation of new enrollment: ${err}` });
        }
    }
);

app.delete('/api/delete-course-from-student/:code/:id',
    [
        check('code').isLength({ min: 7, max: 7 }).withMessage('Invalid course code, 7 characters needed.'),
        check('code').isInt().withMessage('Invalid student id')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const result = enrollmentsDao.deleteCourseFromStudent(req.params.code, req.params.id);
            res.json(result);
        } catch{
            res.status(503).json({ error: `Database error during the creation of new enrollment: ${err}` });
        }
    }
);

/* Students APIs */

app.get('/api/list-students',
    async (req, res) => {
        studentsDao.listStudents()
            .then(students => res.json(students))
            .catch((err) => res.status(500).json(err));
    }
);

app.get('/api/get-student/:id',
    (req, res) => {
        studentsDao.getStudent(req.params.id)
            .then(student => res.json(student))
            .catch((err) => res.status(500).json(err));
    }
);




// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));