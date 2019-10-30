const controller = {};

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

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO USUARIOS set ?", [data], (err, user) => {
            res.redirect("/");
        });
    });
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
            res.redirect('/');
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
                res.redirect("/");
            }
        );
    });
};

module.exports = controller;
