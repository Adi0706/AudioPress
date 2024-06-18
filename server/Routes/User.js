const express = require('express') ; 
const {handleServer} = require('../Controllers/User')
const {handleSignup} = require('../Controllers/User')
const {handleLogin} = require('../Controllers/User')


const router = express.Router() ; 


router.get('/',handleServer) ; 
router.post('/Register',handleSignup)
router.post('/Login',handleLogin)


module.exports = router ; 