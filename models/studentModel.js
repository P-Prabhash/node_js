const { getDB } = require("../config/db");

async function createStudent(student) {
    const db = getDB();

    const result = await db.collection("students").insertOne(student);

    return result;
}

async function getStudents() {
    const db = getDB();

    const students = await db
        .collection("students")
        .find()
        .toArray();

    return students;
}

module.exports = {
    createStudent,
    getStudents
};