import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';
const router = express.Router();

router.get('/',(req, res)=> {
    res.json(students);
});

router.get('/:id', (req,res) => {
    const student = _.find(students, student => student.id === req.params.id);
    if (student) {
        res.json(student);
    }else {
        res.send(`User ${req.params.id} not found`);
    }
});

router.post('/', (req,res) => {
    console.log("handling POST request...");
    console.log(req.body);
    res.end();
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