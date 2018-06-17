import express from 'express';
import morgan from 'morgan';
import StudentRoute from './routes/StudentRoute';
import students from './data/students.json';
import _ from 'lodash';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3000;
const server = express();

server.use(morgan('tiny'));
server.use(bodyParser.json());
server.use('/static', express.static('public'));

const buildUrl = (version, path) => `/api/${version}/${path}`;
const STUDENTS_BASE_URL = buildUrl('v1','students');

server.use(STUDENTS_BASE_URL, StudentRoute);

server.get('/download/images/:imageName', (req, res) => {
    res.download(path.join('public', 'images', req.params.imageName));
});


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