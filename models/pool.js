const connection = require("./mysqlconfig.js");

/*********************Cryptage*****************************/
const bcrypt = require("bcrypt");
const saltRounds = 10;

/******************************************************/
//* create
/******************************************************/

exports.create = (user, cb) => {
    const query2 =
        "INSERT INTO user(nom, prenom, email, password) VALUES (?, ?, ?, ?)";
    // Ici, va hasher le mot de passe
    bcrypt.hash(user.pwd, saltRounds, function (err, hasher) {
        if (err) throw err;
        console.log(hasher);

    // Ici on se connecte
        connection.query(
            query2,
            [user.nom, user.prenom, user.email, hasher],
            (err, rows) => {
                console.log(err);
                if (err.code == "ER_DUP_ENTRY") {
                    cb("Email existant");
                }
                cb();
            });
    });
};

/******************************************************/
//* Login
/******************************************************/

exports.log = (user, cb) => {
    const email = user.data.email;
    const pwd = user.data.password;

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, email , (err, row) => {
    if (row.length > 0) {
        bcrypt.compare(pwd, row[0].password, function (err, result) {
            cb(result);
        });
    } else {
        cb(false);
    }
  });
};

/******************************************************/
//* FindAll
/******************************************************/

exports.findAll = (callback) =>
{
    connection.query("SELECT * FROM user", (err, rows) =>
    {
        callback(rows);
    })
}

/******************************************************/
// find
/******************************************************/
exports.find = (id, callback) =>
{
    connection.query("SELECT * FROM user WHERE id="+id, (err, rows) =>
    {
        if (err) {throw err};
        callback(rows);
    })
}


/******************************************************/
// update
/******************************************************/
exports.modifuser = (user, callback) =>
{
    connection.query('UPDATE user SET nom =? , prenom =?, email =? WHERE id = ? ' ,[user.nom, user.prenom, user.email, user.id],

    (err,row) =>
    {
        if (err) {throw err};
        callback(row);
    })
}


/******************************************************/
        // Delete
/******************************************************/
exports.del = (id, callback) =>
{
    connection.query('DELETE FROM user WHERE id ='+id, (err, row) =>
    {
        if (err) {throw err};
        callback(row);
    })
}