var express = require('express');
var router = express.Router();
var userService = require('../services/user');


/* LOGIN USER */
router.post('/login', userService.login);

/* GET ALL USERS */
router.get('/', userService.getUsers);

/* GET SINGLE USER BY ID */
router.get('/:id', userService.getUser);

/* SAVE USER */
router.post('/', userService.createUser);

/* UPDATE USER */
// router.put('/:id', userService.updateUser);

/* DELETE USER */
// router.delete('/:id', userService.deleteUser);


module.exports = router;