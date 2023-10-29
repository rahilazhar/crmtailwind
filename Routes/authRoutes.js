const express = require('express')

const { Registeruser, Login, Rightsuser , GetallRights } = require('../Controllers/authController')
const { AssignRights} = require('../Controllers/Rightscontroller')
const { Addstaff } = require('../Controllers/Staffcontroller')



const router = express.Router()


// Auth Routes
router.post('/registration', Registeruser)
router.post('/login', Login)


// Rights Routes
router.post('/assign-rights/:id', AssignRights)

// Staff Routes
router.post('/addstaff', Addstaff)












module.exports = router
