const bcrypt = require('bcrypt');
const controller = {};
const users = [];

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM usuarios", (err, users) => {
            if (err) {
                next(err);
            }
            console.log(users);
            res.render("users", {
                data: users
            });
        });
    });
};

controller.save =async(req, res) => {
    try{
        const data = req.body;
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       users.push({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            password: hashedPassword,
            rol: data.rol
       });
      
       req.getConnection((err, conn) => {
        conn.query("SELECT u.email FROM USUARIOS u WHERE email=?", data.email, (err, user) => {
            console.log(err);
                conn.query("INSERT INTO USUARIOS SET ?", users, (err, user) => {
                    if(err){
                        res.redirect('/user');
                    }else{
                    console.log("error " + err);
                    res.redirect('/user');
                    }
                     });
                });
                    
       });
    
    }catch{
        res.redirect('/user');
    }
    console.log(users)
};


controller.edit = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM USUARIOS WHERE id_usuario = ?", [id_usuario], (err, client) => {
            console.log(client);
            res.render('users_edit', {
                data: client[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id_usuario = req.params.id;
    const newUser = req.body;
    req.getConnection((err,conn) =>{
        conn.query('UPDATE USUARIOS SET ? WHERE id_usuario = ?', [newUser, id_usuario],(err, rows) =>{
            res.redirect('/user');
        });
    });
};

controller.delete = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(
            "DELETE FROM usuarios WHERE id_usuario = ?",
            [id_usuario],
            (err, rows) => {
                res.redirect("/user");
            }
        );
    });
};

module.exports = controller;
