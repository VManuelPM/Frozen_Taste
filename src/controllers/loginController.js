const controller = {};

controller.inicio = (req, res) => {
    res.send("works");   
};


controller.login = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body;
        console.log(data);
        conn.query("SELECT * FROM USARIOS", (err, linea) => {
            if (err) {
                next(err);
            }
            console.log(linea);
            res.redirect("/users");
        });
    });
};