const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')
const mssql = require('mssql')

module.exports={
    home:(req,res)=>{
        res.send('Hello there...')
    },
    register: async(req, res)=>{
        let {id, username, email, paswd} = req.body
            let pool = await poolPromise()
            pool.query(`insert into Users 
                        VALUES('${id}','${username}', '${email}', '${paswd}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                res.send("Account has been created")
                                console.log("Account has been created")
                            }
                        })
            
        },
        login: async (req, res)=>{
            const {username, password} = req.body
            let pool = await poolPromise()
            pool.query(`select * FROM Users WHERE username='${username}'`)
            .then(results=>{
                let user=results.recordset[0]
                if(user){
                    let pass=user.password
                    if(password===pass){
                            return res.json({
                                status:200,
                                success: true,
                                message: "Logged in successfully",
                                results:user
                            })
    
                    }
                    res.status(404).json({
                                status:404,
                                success: false,
                                message: "Couldn't login. Check your credentials",
                                results:{}
                    })
                    }                        
                })
        }
}
