import express from 'express';
import morgan from 'morgan';
import StudentRoute from './routes/StudentRoute';
import students from './data/students.json';
import _ from 'lodash';

const PORT = 3000;
const server = express();

server.use(morgan('tiny'));

const buildUrl = (version, path) => `/api/${version}/${path}`;
const STUDENTS_BASE_URL = buildUrl('v1','students');

server.use(STUDENTS_BASE_URL, StudentRoute);

server.get('/route-handlers', (req, res, next) => {
    res.send("Learning route handlers is cool");
    next();
},(req, res, next) => {
    console.log("Second Handler");
    next();
},(req, res) => {
    console.log("Third Handler ");
});

server.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
})