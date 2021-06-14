const express = require('express');
const StudentRouter = require('./student');
const UserRouter = require('./user');
const CourseRouter = require('./course');

const router = express.Router();

router.use('/students',StudentRouter);
router.use('/users',UserRouter);
router.use('/courses',CourseRouter);

module.exports = router;