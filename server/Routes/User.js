const express = require('express') ; 
const {handleServer} = require('../Controllers/User')
const {handleSignup} = require('../Controllers/User')


const router = express.Router() ; 


router.get('/',handleServer) ; 
router.post('/Register',handleSignup)


module.exports = router ; 