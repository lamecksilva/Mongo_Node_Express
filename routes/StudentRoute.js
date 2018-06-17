import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';
const router = express.Router();

let studentsArray = students;


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