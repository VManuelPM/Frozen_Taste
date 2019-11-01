const bcrypt = require('bcrypt');
const controller = {};
const users = [];

controller.load=(req,res)=>{
    res.render('login.ejs')
};


controller.entrar=async(req,res)=>{
    try{
        const data = req.body;
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
 
       req.getConnection((err, conn) => {
        conn.query("SELECT u.email,u.password FROM USUARIOS u WHERE email=?", data.email, (err, user) => {
                    if(user.email==data.email && user.password==hashedPassword){
                        res.redirect('/user');
                    }else{
                    console.log("error " + err);
                    res.redirect('/login');
                    }
                });
            });            
    }catch{
        console.log("error catch " + err);
        res.redirect('/login');
    }
    console.log(users)
};


module.exports = controller;
