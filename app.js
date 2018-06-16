import express from 'express';
import students from './data/students.json';
import _ from 'lodash';

const PORT = 3000;
const server = express();

const buildUrl = (version, path) => `/api/${version}/${path}`;
const STUDENTS_BASE_URL = buildUrl('v1','students');

server.get(STUDENTS_BASE_URL,(req, res)=> {
    res.json(students);
});

server.get(`${STUDENTS_BASE_URL}/:id`, (req,res) => {
    const student = _.find(students, student => student.id === req.params.id);
    if (student) {
        res.json(student);
    }else {
        res.send(`User ${req.params.id} not found`);
    }
})




server.post(STUDENTS_BASE_URL, (req,res) => {
    console.log("handling POST request...");
});

server.put(STUDENTS_BASE_URL, (req,res) => {
    console.log("handling PUT request...");
});

server.delete(STUDENTS_BASE_URL, (req,res) => {
    console.log("handling DELETE request...");
});

server.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
})