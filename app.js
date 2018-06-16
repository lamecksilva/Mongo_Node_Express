import express from 'express';
import students from './data/students.json';

const PORT = 3000;
const server = express();
const buildUrl = (version, path) => `/api/${version}/${path}`;

server.get(buildUrl('v1','students'),(req, res)=> {
    res.json(students);
})

server.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
})