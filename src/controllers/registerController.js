const bcrypt = require('bcrypt');
const controller = {};
const users = [];

controller.load=(req,res)=>{
    res.render('register.ejs')
};

controller.registrar=async(req,res)=>{
    try{
        const data = req.body;
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       users.push({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            password: hashedPassword,
            rol: "us"
       });
      
       req.getConnection((err, conn) => {
        conn.query("SELECT u.email FROM USUARIOS u WHERE email=?", data.email, (err, user) => {
            console.log(err);
                conn.query("INSERT INTO USUARIOS SET ?", users, (err, user) => {
                    if(err){
                        res.redirect('/register');
                    }else{
                    console.log("error " + err);
                    res.redirect('/login');
                    }
                     });
                });
                    
       });
    
    }catch{
        console.log("error catch " + err);
        res.redirect('/register');
    }
    console.log(users)
};

module.exports = controller;
