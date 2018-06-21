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

const StudentModel = mongoose.model('Student', StudentSchema);

router.get('/',(req, res)=> {
    // res.json(studentsArray);
    StudentModel.find((err, students) => {
        if(err) res.status(500).send(err);
        res.json(students);
    });
});

router.get('/:id', (req,res) => {
    /*
    const student = _.find(studentsArray, student => student.id === req.params.id);
    if (student) {
        res.json(student);
    }else {
        res.send(`User ${req.params.id} not found`);
    }
    */

    StudentModel.findById(req.params.id, (err, student) =>{
        if (err) res.status(500).send(err);
        if (student) {
            res.json(student);
        }else {
            res.status(404).send(`User ${req.params.id} not found`);
        }
    });
});

router.post('/', (req,res) => {
    /*
    console.log("handling POST request...");
    console.log(req.body);
    studentsArray.push(req.body);
    res.status(200).send("OK");
    */

    const id = new mongoose.Types.ObjectId();
    const studentToPersist = Object.assign({
        _id: id 
    }, req.body);
    console.log(JSON.stringify(studentToPersist));

    const student = new StudentModel(studentToPersist);

    student.save().then((err, student) => {
        if(err) res.status(500).send(err);
        res.json(student);
    })
    
});

router.put('/:id', (req,res) => {
    StudentModel.findById(req.params.id, (err, student) => { //Find a student whit specific ID
        if(err) res.status(500).send(err);  // If err, show err;
        if (student) {
            student.name = req.body.name;       // Else, update the name, and his course
            student.course = req.body.course;
            student.save().then((err, student) => {     // Save the changes
                if (err) res.status(500).send(err);
                res.json(student);
           });
        } else {
            res.status(404).send(`User with id ${req.params.id} not found`);
        }
    });
});

router.delete('/:id', (req,res) => {
    StudentModel.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) res.status(500).send(err);
        res.status(200).send(`Student with id ${req.params.id} was deleted`);
    });
});

/*
router.param('id', (req, res, next, id) => {
    if (isNaN(id)) {
        next(`${id} is not a valid number`);
    }
    next();
});
*/

module.exports = router;