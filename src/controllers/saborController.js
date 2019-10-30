const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM SABORES", (err, sabor) => {
            if (err) {
                next(err);
            }
            console.log(sabor);
            res.render("sabor", {
                data: sabor
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO SABORES set ?", [data], (err, user) => {
            res.redirect("/sabor");
        });
    });
};

controller.edit = (req, res) => {
    const id_sabor = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM SABORES WHERE id_sabor = ?", [id_sabor], (err, client) => {
            console.log(client);
            res.render('sabor_edit', {
                data: client[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id_linea = req.params.id;
    const newLinea = req.body;
    req.getConnection((err,conn) =>{
        conn.query('UPDATE SABORES SET ? WHERE id_sabor = ?', [newLinea, id_linea],(err, rows) =>{
            res.redirect('/sabor');
        });
    });
};

controller.delete = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(
            "DELETE FROM SABORES WHERE id_sabor = ?",
            [id_usuario],
            (err, rows) => {
                res.redirect("/sabor");
            }
        );
    });
};

module.exports = controller;
