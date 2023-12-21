const express = require('express');
const app = express();
const port = 5000;
const mysql2 = require('./connection').con;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render("login.ejs", {user : 'ok'});
});

app.get('/auth_login', (req, res) => {
    var { username, password } = req.query;
    let q = "select * from user where username=? and password=?";
    mysql2.query(q, [username, password], (err, results) => {
        if(err)throw err;
        else {
            if(results.length>0){
                let q1 = "select * from post";
                mysql2.query(q1, (err, results) => {
                    if(err)throw err;
                    else {
                        res.render("feed.ejs", {user : username, A:results});
                    }
                });
            } else {
                res.render("login.ejs", {user : 'wrong'});
            }
        }
    });
});

app.get('/addPost', (req, res) => {
    var { title, content, user } = req.query;
    var d = new Date();
    let q = "insert into post values(?,?,?,?)";
    mysql2.query(q, [title, content, d, user], (err, results) => {
        if(err)throw err;
        else {
            let q1 = "select * from post";
            mysql2.query(q1, (err, results) => {
                if(err)throw err;
                else {
                    res.render("feed.ejs", {user : user, A:results});
                }
            });
        }
    });
});

app.get('/signup', (req, res) => {
    res.render("signup.ejs");
});

app.get('/auth_signup', (req, res) => {
    var { username, password } = req.query;
    let q = "insert into user values(?,?)";
    mysql2.query(q, [username, password], (err, results) => {
        if(err)throw err;
        else {
            res.render("login.ejs", { user : 'ok' });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});