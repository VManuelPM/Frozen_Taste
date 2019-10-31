const controller = {};


controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT DISTINCT p.nombre_producto,  t.tipo , s.sabor , l.linea, s.id_sabor, l.id_linea, p.id_producto FROM  productos as p , sabores AS s ,  lineas as l ,tipos as t , productos_sabores AS ps , productos_lineas AS pl WHERE ps.fk_id_producto=p.id_producto AND s.id_sabor=ps.fk_id_sabor AND pl.fk_id_producto=p.id_producto AND pl.fk_id_linea=l.id_linea AND P.fk_id_tipo=T.id_tipo;", (err, productos) => {
            conn.query("SELECT * FROM SABORES", (err, sabor) => {
                conn.query("SELECT * FROM TIPOS", (err, tipo) => {
                    conn.query("SELECT * FROM lineas", (err, linea) => {
                if (err) {
                    next(err);
                }
                console.log(linea);
                console.log(productos);
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
    console.log(data);
    console.log(typeof(nombre_producto));
    console.log(typeof(tipo));
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO PRODUCTOS VALUES (?,?,?)", [null,tipo, nombre_producto], (err, user) => {
            var ultimo_id_producto = user.insertId;
            conn.query("INSERT INTO PRODUCTOS_LINEAS VALUES (?,?,?)", [null,ultimo_id_producto,linea], (err, linea) => {   
                conn.query("INSERT INTO PRODUCTOS_SABORES VALUES (?,?,?)", [null,ultimo_id_producto,sabor], (err, sabor) => {  
                    console.log("error " + err);  
                    res.redirect("/producto");
                });
            });
        });
    });
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
    const id_producto = req.params.id;
    const id_sabor = req.params.idSabor;
    const id_linea = req.params.idLinea;
    req.getConnection((err, conn) => {
        conn.query( "DELETE FROM productos_sabores WHERE fk_id_producto = ? AND fk_id_sabor = ?", [id_producto,id_sabor],(err, rows) => {
            conn.query( "DELETE FROM productos_lineas WHERE fk_id_producto = ? AND fk_id_linea = ?", [id_producto,id_linea],(err, rows) => {
                conn.query( "DELETE FROM productos WHERE id_producto = ?", [id_producto],(err, rows) => {
                res.redirect("/producto");
                });
            });
        });
    });
};



module.exports = controller;