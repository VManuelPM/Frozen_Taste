const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM lineas", (err, linea) => {
            if (err) {
                next(err);
            }
            console.log(linea);
            res.render("linea", {
                data: linea
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO LINEAS set ?", [data], (err, user) => {
            res.redirect("/linea");
        });
    });
};

controller.edit = (req, res) => {
    const id_linea = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM LINEAS WHERE id_linea = ?", [id_linea], (err, client) => {
            console.log(client);
            res.render('linea_edit', {
                data: client[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id_linea = req.params.id;
    const newLinea = req.body;
    req.getConnection((err,conn) =>{
        conn.query('UPDATE LINEAS SET ? WHERE id_linea = ?', [newLinea, id_linea],(err, rows) =>{
            res.redirect('/linea');
        });
    });
};

controller.delete = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(
            "DELETE FROM LINEAS WHERE id_linea = ?",
            [id_usuario],
            (err, rows) => {
                res.redirect("/linea");
            }
        );
    });
};

module.exports = controller;
