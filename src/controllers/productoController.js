const controller = {};

var getSabores = "SELECT * FROM SABORES";
var getTipos = "SELECT * FROM TIPOS";
var getLineas = "SELECT * FROM lineas";


controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT DISTINCT p.nombre_producto,  t.tipo , s.sabor , l.linea, s.id_sabor, l.id_linea, p.id_producto, t.id_tipo FROM  productos as p , sabores AS s ,  lineas as l ,tipos as t , productos_sabores AS ps , productos_lineas AS pl WHERE ps.fk_id_producto=p.id_producto AND s.id_sabor=ps.fk_id_sabor AND pl.fk_id_producto=p.id_producto AND pl.fk_id_linea=l.id_linea AND P.fk_id_tipo=T.id_tipo;", (err, productos) => {
            conn.query(getSabores, (err, sabor) => {
                conn.query(getTipos, (err, tipo) => {
                    conn.query(getLineas, (err, linea) => {
                        if (err) {
                            next(err);
                        }
                        res.render("producto", {
                            data: productos,
                            dataS: sabor,
                            dataT: tipo,
                            dataL: linea
                        });
                    });
                });
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    const nombre_producto = data.nombre_producto;
    const tipo = parseInt(data.tipo);
    const linea = parseInt(data.linea);
    const sabor = parseInt(data.sabor);
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO PRODUCTOS VALUES (?,?,?)", [null, tipo, nombre_producto], (err, user) => {
            var ultimo_id_producto = user.insertId;
            conn.query("INSERT INTO PRODUCTOS_LINEAS VALUES (?,?,?)", [null, ultimo_id_producto, linea], (err, linea) => {
                conn.query("INSERT INTO PRODUCTOS_SABORES VALUES (?,?,?)", [null, ultimo_id_producto, sabor], (err, sabor) => {
                    console.log("error " + err);
                    res.redirect("/producto");
                });
            });
        });
    });
};

controller.edit = (req, res) => {
    const id_producto = req.params.id;
    const id_sabor = req.params.idSabor;
    const id_linea = req.params.idLinea;
    const id_tipo = req.params.idTipo;

    req.getConnection((err, conn) => {
        conn.query(" SELECT DISTINCT " +
            "p.nombre_producto , T.tipo , t.id_tipo , s.id_sabor , s.sabor , l.linea , l.id_linea," +
            "pl.id_producto_linea, ps.id_producto_sabor, p.id_producto " +
            "FROM  productos as p inner join  productos_sabores as ps ON ps.fk_id_producto=p.id_producto " +
            "inner join tipos as t ON p.fk_id_tipo=t.id_tipo inner join sabores as s " +
            "ON ps.fk_id_sabor=s.id_sabor inner join productos_lineas as pl " +
            "ON PL.fk_id_producto=P.id_producto INNER JOIN lineas as l " +
            "ON pl.fk_id_linea=l.id_linea  WHERE p.id_producto = ?", [id_producto], (err, client) => {
                conn.query(getSabores, (err, sabor) => {
                    conn.query(getTipos, (err, tipo) => {
                        conn.query(getLineas, (err, linea) => {
                            console.log(err);
                            console.log(client);
                            res.render('producto_edit', {
                                data: client[0],
                                dataS: sabor,
                                dataT: tipo,
                                dataL: linea
                            });
                        });
                    });
                });
            });
    });
};

controller.update = (req, res) => {
    const id_producto = parseInt(req.params.id);
    const id_producto_sabor = parseInt(req.params.idProductosSabores);
    const id_producto_linea = parseInt(req.params.idProductosLineas);

    const data = req.body;
    const nombre_producto = data.nombre_producto;
    const id_tipo = data.tipo;
    const id_linea = data.linea;
    const id_sabor = data.sabor;

    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('UPDATE PRODUCTOS SET id_producto=?,fk_id_tipo=?,nombre_producto=? ' +
            'WHERE id_producto=?', [id_producto, id_tipo, nombre_producto, id_producto], (err, rows) => {
                conn.query('UPDATE PRODUCTOS_SABORES SET id_producto_sabor=?,fk_id_producto=?,fk_id_sabor=? ' +
                    'WHERE id_producto_sabor=?', [id_producto_sabor, id_producto, id_sabor, id_producto_sabor], (err, rows) => {
                        conn.query('UPDATE PRODUCTOS_LINEAS SET id_producto_linea=?,fk_id_producto=?,fk_id_linea=? ' +
                            'WHERE id_producto_linea=?', [id_producto_linea, id_producto, id_linea, id_producto_linea], (err, rows) => {
                                console.log(err);
                                res.redirect('/producto');
                            });
                    });
            });
    });
};

controller.delete = (req, res) => {
    const id_producto = req.params.id;
    const id_sabor = req.params.idSabor;
    const id_linea = req.params.idLinea;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM productos_sabores WHERE fk_id_producto = ? AND fk_id_sabor = ?", [id_producto, id_sabor], (err, rows) => {
            conn.query("DELETE FROM productos_lineas WHERE fk_id_producto = ? AND fk_id_linea = ?", [id_producto, id_linea], (err, rows) => {
                conn.query("DELETE FROM productos WHERE id_producto = ?", [id_producto], (err, rows) => {
                    res.redirect("/producto");
                });
            });
        });
    });
};



module.exports = controller;