
const { getDB } = require("../config/db");

async function createStudent(student) {
    const pool = getDB();

    const { name, email, age, course } = student;

    const query = `
        INSERT INTO students (name, email, age, course)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [name, email, age, course];

    const result = await pool.query(query, values);

    return result.rows[0];
}

async function getStudents() {
    const pool = getDB();

    const result = await pool.query(
        "SELECT * FROM students ORDER BY id ASC"
    );

    return result.rows;
}

module.exports = {
    createStudent,
    getStudents
};
