const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')
const mssql = require('mssql')

module.exports={
    Create: async(req, res)=>{
        let {id, profile_id,written_text,created} = req.body
            let pool = await poolPromise()
            pool.query(`insert into user_post 
                        VALUES('${id}','${profile_id}', '${written_text}', '${created}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                res.send("Your post has been published")
                                console.log("Post has been published")
                            }
                        })
            
        },
        View: async(req,res)=>{
            let pool = await poolPromise()
            pool.query(`select * from user_post`)
            .then(results=>{
                if(results.recordset){
                    return res.status(200).json({
                        status:200,
                        success: true,
                        message: "These are all the posts",
                        results:results.recordset
                    })
                }
                res.status(404).json({
                    status:404,
                    success: false,
                    message: "There are no posts",
                    results:{}
                
            })
        })}
}
