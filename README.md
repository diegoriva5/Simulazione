# Server

## Database

The database contains different tables:
- courses: each course has an id, a unique code, a name, the number of credits, the number of max students that can be enrolled in and an optional mandatory exam to insert that course in the study plan
- enrollments: it is used to know if a student is enrolled into a course. It has a student_id and a course_code column
- incompatibilities: some courses can be incompatible with other ones. This table contains a course_code and the incompatible_code course
- students: each student is identified with an id, an email, a password, a name and a variable that is used to know if that student has a study plan

## APIs

### Courses APIs

* **GET `/api/list-courses`**: retrieve a list of all the courses from the database as a JSON list.
    - **Response body**: List of JSON objects, or description of the error(s):
      ```
      [ {
            "code": "CS10101",
            "name": "Introduction to Computer Science",
            "credits": 8,
            "max_students": 6,
            "mandatory_exam": null
        },
        ...
      ]
      ```
    - Codes: `200 OK`, `500 Internal Server Error`.

* **GET `/api/get-course-from-code/:code`**: retrieve a course given its unique code.
    - **Response body**: JSON object with a single course, or description of the error(s):
    ```
    [
        {
            "code": "MATH102",
            "name": "Calculus I",
            "credits": 10,
            "max_students": 6,
            "mandatory_exam": null
        }
    ]
    ```
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

* **GET `/api/get-maxstud-from-code/:code`**: retrieve the number of max students allowed to be enrolled in a course, given its code.
    - **Response body**: JSON object with the max number of students for the given course, or description of the error(s):
    ```
    [
        {
            "max_students": 4
        }
    ]
    ```
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

* **GET `/api/get-mandatory-from-code/:code`**: retrieve the mandatory course for a specific course, given its code.
    - **Response body**: JSON object with the mandatory course for the given course, or description of the error(s):
    ```
    [
        {
            "mandatory_exam": "MATH102"
        }
    ]
    ```
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

### Incompatibles APIs

* **GET `/api/get-incompatibilities-from-code/:code`**: retrieve the list of incompatible courses for a specific course, given its code.
    - **Response body**: array of incompatible courses for the given course, or description of the error(s):
    ```
    [
        [
            "CS10101",
            "PHYS201"
        ]
    ]
    ```
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

### Enrollments APIs

* **POST `/api/add-course-to-student/:code/:id`**: adds a course to a student.
    - **Response body**: empty on success, otherwise a JSON object with the error:
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

* **DELETE `/api/delete-course-from-student/:code/:id`**: delete a course from a student plan.
    - **Response body**: array of incompatible courses for the given course, or description of the error(s)
    ```
    [
        [
            "CS10101",
            "PHYS201"
        ]
    ]
    ```
    - Codes: `200 OK`, `400 Bad Request`, `500 Internal Server Error`

### Students APIs

* **GET `/api/list-students`**: retrieves a list of all the students as a JSON list.
    - **Response body**: List of JSON objects, or description of the error(s):
    ```
    [
        {
            "id": 1,
            "email": "alice@example.com",
            "name": "Alice",
            "has_study_plan": 0
        },
        ...
    ]
    ```
    - Codes: `200 OK`, `500 Internal Server Error`

* **GET `/api/get-student/:id`**: retrieves a student given its id.
    - **Response body**: JSON object that contains all student info (except for the password), or description of the error(s):
    ```
    [
        {
            "id": 2,
            "email": "bob@example.com",
            "name": "Bob",
            "has_study_plan": 0
        }
    ]
    ```
    - Codes: `200 OK`, `500 Internal Server Error`


# Client

## List of Routes

## List of components developed








# Overall

## Screenshot

## Username and passwords of the users



