const controller = {};


controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT DISTINCT p.nombre_producto,  t.tipo , s.sabor , l.linea FROM  productos as p , sabores AS s ,  lineas as l ,tipos as t , productos_sabores AS ps , productos_lineas AS pl WHERE ps.fk_id_producto=p.id_producto AND s.id_sabor=ps.fk_id_sabor AND pl.fk_id_producto=p.id_producto AND pl.fk_id_linea=l.id_linea AND P.fk_id_tipo=T.id_tipo;", (err, productos) => {
            conn.query("SELECT * FROM SABORES", (err, sabor) => {
                if (err) {
                    next(err);
                }
                console.log(sabor);
                console.log(productos);
                res.render("producto", {
                    data: productos,
                    dataS: sabor
                });
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(data);
  /*  req.getConnection((err, conn) => {
        conn.query("INSERT INTO PRODUCTOS set ?", [data], (err, user) => {
            res.redirect("/producto");
        });
    });*/
};

controller.edit = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM PRODUCTOS WHERE id_usuario = ?", [id_usuario], (err, client) => {
            console.log(client);
            res.render('producto_edit', {
                data: client[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id_usuario = req.params.id;
    const newUser = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE PRODUCTOS SET ? WHERE id_usuario = ?', [newUser, id_usuario], (err, rows) => {
            res.redirect('/producto');
        });
    });
};

controller.delete = (req, res) => {
    const id_usuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(
            "DELETE FROM productos WHERE id_usuario = ?",
            [id_usuario],
            (err, rows) => {
                res.redirect("/producto");
            }
        );
    });
};



module.exports = controller;