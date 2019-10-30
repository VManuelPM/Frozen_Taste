const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM TIPOS", (err, tipo) => {
            if (err) {
                next(err);
            }
            console.log(tipo);
            res.render("tipo", {
                data: tipo
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO TIPOS set ?", [data], (err, user) => {
            res.redirect("/tipo");
        });
    });
};

controller.edit = (req, res) => {
    const id_tipo = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM TIPOS WHERE id_tipo = ?", [id_tipo], (err, client) => {
            console.log(client);
            res.render('tipo_edit', {
                data: client[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id_tipo = req.params.id;
    const newTipo = req.body;
    req.getConnection((err,conn) =>{
        conn.query('UPDATE TIPOS SET ? WHERE id_tipo = ?', [newTipo, id_tipo],(err, rows) =>{
            res.redirect('/tipo');
        });
    });
};

controller.delete = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(
            "DELETE FROM TIPOS WHERE id_tipo = ?",
            [id_usuario],
            (err, rows) => {
                res.redirect("/tipo");
            }
        );
    });
};

module.exports = controller;
