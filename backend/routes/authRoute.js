const express = require('express');
const postgres = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//POST LOGIN
router.route('/login').post(async (req, res) => {
    try {
        const sql = `SELECT * FROM users WHERE userNick=$1`;
        const values = [req.body.userNick];
        const resql = await postgres.query(sql, values);
        const user = resql.rows[0];
        if (user) {
            const cmp = await bcrypt.compare(req.body.userPassword, user.userpassword);
            if (cmp) {
                const token = jwt.sign({
                    userNick: user.usernick,
                    userAdmin: user.useradmin
                }, "oyakRenaultSecureKey16");
                res.status(200).json({
                    "baslik": "Auth Success",
                    "token": token,
                    "user": {
                        userID: user.userid,
                        userName: user.username,
                        userNick: user.usernick,
                        userAdmin: user.useradmin
                    }
                });
            } else {
                res.json({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
            }

        } else {
            res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
        }
    } catch (error) {
        res.status(400).json({ "hata": error });
    }
});

// POST ADDUSER
router.route('/addUser').post(authMiddleware, async (req, res) => {
    if (req.userData.userAdmin != 1) {
        res.json({ "mesaj": "Yetkiniz yok!" })
        return;
    }
    try {
        let user = req.body;
        const nick = await postgres.query(`SELECT * FROM users WHERE usernick = $1`, [user.userNick]);
        if (nick.rows[0]) {
            res.json({ "mesaj": "Kullanıcı adı kullanılıyor","hata":true });
            return;
        }
        await bcrypt.genSalt(10).then(salt => {
            return bcrypt.hash(user.userPassword, salt);
        }).then(hash => {
            user.userPassword = hash;
        });
        const sql = `INSERT INTO users(username,usernick,userpassword,useradmin) VALUES($1,$2,$3,$4) RETURNING *`
        const values = [user.userName, user.userNick, user.userPassword, user.userAdmin];
        const resql = await postgres.query(sql, values);
        res.status(200).json({ "mesaj": "Kullanıcı başarıyla eklendi!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ "hata": error });
    }
});

// GET GETUSERS
router.route('/getUsers').get(authMiddleware, async (req, res) => {
    try {
        const sql = `SELECT userid,username,usernick,useradmin FROM users`;
        const resql = await postgres.query(sql);
        res.json({ "res": resql.rows });
    } catch (error) {
        console.log(error);
        res.status(400).json({ "hata": error });
    }
});

//POST UPDATEUSER
router.route('/updateUser').post(authMiddleware, async (req, res) => {
    if (req.userData.userAdmin != 1) {
        res.json({ "mesaj": "Yetkiniz yok!" })
        return;
    }
    try {
        var sql = `SELECT * FROM users WHERE usernick = $1`;
        const valresql = await postgres.query(sql, [req.body.userNick]);
        if(valresql.rows[0].usernick!=req.body.userNick){
            res.json({"mesaj":"Kullanıcı adı kullanılıyor"});
            return
        }

        var sql = `SELECT * FROM users WHERE usernick = $1`;
        const resql = await postgres.query(sql, [req.body.oldUserNick]);
        const user = req.body;
        const sqlUser = resql.rows[0];
        var values = [];
        if (sqlUser) {
            if (req.body.userPassword) {
                await bcrypt.genSalt(10).then(salt => {
                    return bcrypt.hash(user.userPassword, salt);
                }).then(hash => {
                    user.userPassword = hash;
                });
                sql = `UPDATE users SET username = $1 ,usernick = $2 , userpassword = $3 ,useradmin= $4 WHERE userid= $5`;
                values = [user.userName, user.userNick, user.userPassword, user.userAdmin, sqlUser.userid]
            } else {
                sql = `UPDATE users SET username = $1 ,usernick = $2 ,useradmin= $3 WHERE userid= $4`;
                values = [user.userName, user.userNick, user.userAdmin, sqlUser.userid]
            }
            const resql = await postgres.query(sql, values);
            res.status(200).json({ "mesaj": "Kullanıcı başarılıyla düzenlendi!", "user": user });
        } else {
            res.status(400).json({ "hata": "Kullanıcı bulunamadı" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ "hata": error });
    }
});


// POST DELUSER
router.route('/delUser').post(authMiddleware, async (req, res) => {
    if (req.userData.userAdmin != 1) {
        res.json({ "mesaj": "Yetkiniz yok!" })
        return;
    }

    try {
        const sql = `SELECT * FROM users WHERE usernick = $1`;
        const values = [req.body.usernick];
        const resql = await postgres.query(sql, values);
        const user = resql.rows[0];
        if (user) {
            const sql = `DELETE FROM users WHERE userid=$1`;
            const values = [user.userid]
            const resql = await postgres.query(sql, values);
            res.status(200).json({ "mesaj": "Kullanıcı başarılıyla silindi!" });
        } else {
            res.status(400).json({ "mesaj": "Kullanıcı bulunamadı" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "hata": error });
    }
})


module.exports = router;