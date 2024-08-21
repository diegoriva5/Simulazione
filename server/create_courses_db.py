import sqlite3

# Nome del file del database principale
db_filename = 'university.db'

# Connessione al database principale (crea il file se non esiste)
conn = sqlite3.connect(db_filename)
cursor = conn.cursor()

# Creazione della tabella per i corsi universitari
cursor.execute('''
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL CHECK(LENGTH(code) = 7),
    name TEXT NOT NULL,
    credits INTEGER NOT NULL CHECK(credits BETWEEN 6 AND 12),
    max_students INTEGER NOT NULL CHECK(max_students BETWEEN 2 AND 6),
    mandatory_exam TEXT, -- Codice di un altro corso
    FOREIGN KEY(mandatory_exam) REFERENCES courses(code)
)
''')

# Creazione della tabella per gli studenti
cursor.execute('''
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    has_study_plan BOOLEAN NOT NULL DEFAULT 0 -- Default false
)
''')

# Creazione della tabella per le iscrizioni ai corsi
cursor.execute('''
CREATE TABLE IF NOT EXISTS enrollments (
    student_id INTEGER,
    course_code TEXT,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(course_code) REFERENCES courses(code),
    PRIMARY KEY (student_id, course_code)
)
''')

# Creazione della tabella per le incompatibilità
cursor.execute('''
CREATE TABLE IF NOT EXISTS incompatibilities (
    course_code TEXT NOT NULL,
    incompatible_code TEXT NOT NULL,
    FOREIGN KEY(course_code) REFERENCES courses(code),
    FOREIGN KEY(incompatible_code) REFERENCES courses(code),
    PRIMARY KEY (course_code, incompatible_code)
)
''')

# Inserimento dei dati di esempio per i corsi
courses_data = [
    ('CS10101', 'Introduction to Computer Science', 8, 6, None),
    ('MATH102', 'Calculus I', 10, 6, None),
    ('PHYS201', 'General Physics', 9, 5, 'MATH102'),
    ('CHEM101', 'General Chemistry', 7, 4, None),
    ('BIO1020', 'Introduction to Biology', 6, 4, None),
    ('HIST101', 'World History', 8, 6, None),
    ('PSY1011', 'Introduction to Psychology', 6, 5, None),
    ('ECON201', 'Microeconomics', 7, 3, None),
    ('ENG1012', 'English Literature', 9, 4, None),
    ('ART1030', 'Introduction to Art', 6, 3, None),
    ('PHIL101', 'Philosophy', 7, 4, None),
    ('CS10202', 'Data Structures', 9, 6, 'CS10101'),
    ('MATH202', 'Calculus II', 10, 6, 'MATH102'),
    ('PHYS202', 'Electromagnetism', 12, 5, 'PHYS201'),
    ('CHEM202', 'Organic Chemistry', 9, 4, 'CHEM101'),
    ('BIO2030', 'Genetics', 8, 5, 'BIO1020'),
    ('HIST202', 'Modern European History', 7, 6, 'HIST101'),
    ('PSY2021', 'Cognitive Psychology', 6, 4, 'PSY1011'),
    ('ECON202', 'Macroeconomics', 8, 4, 'ECON201'),
    ('ENG2021', 'Advanced English Composition', 12, 3, 'ENG1012')
]

cursor.executemany('''
INSERT INTO courses (code, name, credits, max_students, mandatory_exam)
VALUES (?, ?, ?, ?, ?)
''', courses_data)

# Inserimento dei dati di esempio per gli studenti
students_data = [
    ('alice@example.com', 'pwd', 'Alice', 0),
    ('bob@example.com', 'pwd', 'Bob', 0),
    ('charlie@example.com', 'pwd', 'Charlie', 0),
    ('diana@example.com', 'pwd', 'Diana', 0),
    ('eve@example.com', 'pwd', 'Eve', 0)
]

cursor.executemany('''
INSERT INTO students (email, password, name, has_study_plan)
VALUES (?, ?, ?, ?)
''', students_data)

# Definizione delle incompatibilità
incompatibilities_data = [
    ('CS10101', 'MATH102'),
    ('MATH102', 'CS10101'),
    ('CS10101', 'CHEM101'),
    ('CHEM101', 'CS10101'),
    ('PHYS201', 'CHEM101'),
    ('CHEM101', 'PHYS201'),
    ('BIO1020', 'PHYS201'),
    ('PHYS201', 'BIO1020'),
    ('HIST101', 'ART1030'),
    ('ART1030', 'HIST101'),
    ('CS10202', 'ENG1012'),
    ('ENG1012', 'CS10202'),
    ('MATH202', 'PHYS202'),
    ('PHYS202', 'MATH202'),
    ('CHEM202', 'BIO2030'),
    ('BIO2030', 'CHEM202'),
    ('ENG1012', 'PSY2021'),
    ('PSY2021', 'ENG1012'),
    ('HIST202', 'BIO2030'),
    ('BIO2030', 'HIST202'),
    ('PHIL101', 'HIST101'),
    ('HIST101', 'PHIL101'),
    ('ART1030', 'MATH202'),
    ('MATH202', 'ART1030')
]

cursor.executemany('''
INSERT INTO incompatibilities (course_code, incompatible_code)
VALUES (?, ?)
''', incompatibilities_data)

# Commit e chiusura della connessione al database principale
conn.commit()
conn.close()

print(f"Database '{db_filename}' creato con successo!")
