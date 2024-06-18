const { sqlConnection } = require('../Connection/sqlConnection');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

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
async function handleLogin(req,res){ 
    const {email,password} = req.body ; 

}

module.exports = {
    handleServer,
    handleSignup,
    handleLogin
};
