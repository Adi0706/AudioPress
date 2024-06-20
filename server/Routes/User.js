const express = require('express') ; 

const {handleServer} = require('../Controllers/User')
const {handleSignup} = require('../Controllers/User')
const {handleLogin} = require('../Controllers/User')
const {handleLogout} = require('../Controllers/User')
const {handleFetchUserDetails} = require('../Controllers/User')
const {handleUpdateUserDetails} = require('../Controllers/User')
const {handleForgotPassword} = require('../Controllers/User')

const {verifytoken} = require('../Middlewares/User') ; 


const router = express.Router() ; 


// GET ROUTES
router.get('/',handleServer) ; 
router.get('/Logout',handleLogout)
router.get('/UserDetails', verifytoken, handleFetchUserDetails) 


//POST ROUTES
router.post('/Register',handleSignup)
router.post('/Login',handleLogin)
router.post('/ForgotPassword',handleForgotPassword)

//DELETE ROUTES 


//PUT-UPADTE ROUTES 
router.put('/Update',verifytoken,handleUpdateUserDetails)

module.exports = router ; 