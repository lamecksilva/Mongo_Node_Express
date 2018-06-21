import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';
import mongoose, { mongo } from 'mongoose';


const DB_USER = 'lameck';
const DB_USER_PASSWORD = 'JABUTICABA1';
const DB_URL = `mongodb://${DB_USER}:${DB_USER_PASSWORD}@ds263460.mlab.com:63460/lameck01`


const router = express.Router();

let studentsArray = students;

mongoose.connect(DB_URL);
const db = mongoose.connection;


db.once('open', ()=>{
    console.log("Hooray we connected to mlab");
});


const StudentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});


router.get('/',(req, res)=> {
    res.json(studentsArray);
});

router.get('/:id', (req,res) => {
    const student = _.find(studentsArray, student => student.id === req.params.id);
    if (student) {
        res.json(student);
    }else {
        res.send(`User ${req.params.id} not found`);
    }
});

router.post('/', (req,res) => {
    console.log("handling POST request...");
    console.log(req.body);
    studentsArray.push(req.body);
    res.status(200).send("OK");
});

router.put('/', (req,res) => {
    console.log("handling PUT request...");
    res.end();
});

router.delete('/', (req,res) => {
    console.log("handling DELETE request...");
    res.end();
});

router.param('id', (req, res, next, id) => {
    if (isNaN(id)) {
        next(`${id} is not a valid number`);
    }
    next();
})

module.exports = router;