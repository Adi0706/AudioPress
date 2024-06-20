const { sqlConnection } = require('../Connection/sqlConnection');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
const cookieParser = require('cookie-parser') ; 
const jwt = require('jsonwebtoken') ; 
const dotenv = require('dotenv') ; 
const { v4: uuidv4 } = require('uuid');


dotenv.config() ; 

const jwt_secret_key = process.env.JWT_SECRET_KEY ; 

async function handleServer(req, res) {
    return res.send("hello this is server");
}

// USER SIGNUP 
async function handleSignup(req, res) {
    const { fullname, email, password } = req.body; // get the values from body first  
    try {
        const dbConnection = await sqlConnection();

        // Check if the user already exists
        const checkUserSql = 'SELECT email FROM USER_SIGNUP WHERE email=?';
        dbConnection.query(checkUserSql, [email], async (err, result) => {
            if (err) {
                console.error("Error checking user existence:", err);
                return res.json({ Error: "Error in checking user existence" });
            }
            
            if (result.length > 0) {
                // User already exists
                return res.json({ Error: "User Already Exists" });
            }

            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);
                // const _id=uuidv4() ; 
                const values = [fullname, email, hashedPassword];

                // Insert the new user
                const newUserSql = 'INSERT INTO USER_SIGNUP (fullname, email, password) VALUES (?, ?, ?)';
                dbConnection.query(newUserSql, values, (err, result) => {
                    if (err) {
                        console.error("Error inserting data:", err);
                        return res.json({ Error: "Error in inserting data" });
                    }
                    console.log("Number of records inserted: " + result.affectedRows);
                    return res.json({ Status: "Success" });
                });
            } catch (hashError) {
                console.error("Error hashing password:", hashError);
                return res.json({ Error: "Error hashing password" });
            }
        });
    } catch (error) {
        console.error("Error connecting to database:", error);
        return res.json({ Error: 'Internal Server Error' });
    }
}
//LOGIN USER 
async function handleLogin(req, res) {
    const loginUser = 'SELECT * FROM USER_SIGNUP WHERE email=?';
    const value = req.body.email;

    try {
        const dbConnection = await sqlConnection();

        dbConnection.query(loginUser, value, (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ Error: "Unexpected Error" });
            }

            if (result.length > 0) {
                // email exists
                // check password matches the database or not 
                bcrypt.compare(req.body.password.toString(), result[0].password, (err, isMatch) => {
                    if (err) {
                        console.error("Password comparison error:", err);
                        return res.status(500).json({ Error: "Unexpected error in comparing password" });
                    }
                    if (isMatch) {
                        // password matches 
                        //generating jwt token if login is successfull --sending full name and emal in the token 

                        const name  = result[0].fullname ; 
                        const email = result[0].email ; 
                        const _id = result[0].id;
                        const token = jwt.sign({_id,name,email},jwt_secret_key,{expiresIn:'1d'})
                        res.cookie('token',token) ; //generating the token which expires in 1 day . 

                        return res.status(200).json({ Status: "Success" });
                    } else {
                        return res.status(401).json({ Error: "Password does not match" });
                    }
                });
            } else {
                return res.status(404).json({ Error: "User not found" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ Error: "Unexpected Error" });
    }
}
//LOGOUT USER
async function handleLogout(req,res){
    res.clearCookie('token');
    return res.json({Status:"Success"})
}
//FETCH USER DETAILS
async function handleFetchUserDetails(req, res) {
    const { email } = req.user; // Assuming req.user contains the authenticated user's details

    try {
        const dbConnection = await sqlConnection();
        const getDetailsQuery = 'SELECT fullname, email FROM USER_SIGNUP WHERE email = ?';

        dbConnection.query(getDetailsQuery, [email], (err, data) => {
            if (err) {
                console.error("Error fetching details:", err);
                return res.status(500).json({ error: "Error fetching details" });
            }

            if (data.length > 0) {
                const user = data[0];
                return res.json({ fullname: user.fullname, email: user.email });
            } else {
                return res.status(404).json({ error: "User not found" });
            }
        });
    } catch (err) {
        console.error("Error in fetching details:", err);
        return res.status(500).json({ error: "Error in fetching details" });
    }
}
//UPDATE USER DETAILS 
async function handleUpdateUserDetails(req, res) {
    // Take the current name and email from the request body
    const { fullname, email } = req.body;

    // Check if the fullname and email are present
    if (!fullname || !email) {
        return res.status(400).json({ Error: "Name and email are required" });
    }

    try {
        // Get a database connection
        const dbConnection = await sqlConnection();

        // SQL query to update the user details
        const updateSqlQuery = 'UPDATE USER_SIGNUP SET fullname = ?, email = ? WHERE id = ?';
        const values = [fullname, email, req.user._id]; // Assuming req.user.id contains the user's ID

        // Execute the query
        dbConnection.query(updateSqlQuery, values, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).json({ Error: "Failed to update user details" });
            }
            // Check if any rows were affected (optional)
            if (result.rowCount === 0) {
                return res.status(404).json({ Error: "User not found or no changes made" });
            }
            // Respond with success message
            return res.status(200).json({ Status: "User details updated successfully" });
        });

    } catch (err) {
        console.error("Database connection error:", err);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
}
//FORGOT PASSWORD 
async function handleForgotPassword(req,res){

}


module.exports = {
    handleServer,
    handleSignup,
    handleLogin,
    handleLogout,
    handleFetchUserDetails,
    handleUpdateUserDetails,
    handleForgotPassword
};
