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
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = 'INSERT INTO USER_SIGNUP (fullname, email, password) VALUES (?, ?, ?)';
        const values = [fullname, email, hashedPassword]; // then create the value array 

        const dbConnection = await sqlConnection();//get the dbConnection from Connection file
        dbConnection.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({Error:"Error in Inserting Data "})
            }
            console.log("Number of records inserted: " + result.affectedRows);
            return res.json({Status:"Success"})
        });
    } catch (error) {
        console.error("Error hashing password or connecting to database:", error);
        return res.json({Error:'Internal Server Error'}) ; 
    }
}

module.exports = {
    handleServer,
    handleSignup
};
