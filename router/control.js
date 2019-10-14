const express = require('express');
const pool = require('../pool');
const qs = require("querystring");
var router = express.Router();


router.post('/login', (req, res) => {
    req.on('data', (buf) => {
        var obj = qs.parse(buf.toString())
        console.log(buf)
        console.log(obj)
        var sql = `SELECT uname,phone,password FROM user_login WHERE phone=?`
        pool.query(sql, [obj.phone], (err, result) => {
            if (err) throw err;
            if (result == '') {
                res.json({ data: -1, msg: '该手机号尚未注册^o^' })
            } else if (obj.password != result[0].password) {
                res.json({ data: 0, msg: 'X密码错误X' });
            } else {
                console.log(result);
                var uname = result[0].uname;
                res.json({ data: 1, msg: '--登录成功--', name: uname })
            }
        })
    })
})

router.post('/register', (req, res) => {
    req.on('data', (buf) => {
        var obj = qs.parse(buf.toString());
        var sql = `INSERT INTO user_login (phone,password,uname) VALUES(?,?,?)`
        var sql_select = `SELECT phone FROM user_login WHERE phone=?`
        pool.query(sql_select, [obj.phone], (err, result) => {
            if (result == '') {
                pool.query(sql, [obj.phone, obj.password, obj.name], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        res.json({ data: 1, msg: '注册成功' })
                    } else {
                        res.json({ data: 0, msg: '注册失败，请刷新页面重试' })
                    }
                })
            } else {
                res.json({ data: -1, msg: '该手机号已注册' })
            }
        })
    })
})
router.post('/forget', (req, res) => {
    req.on('data', (buf) => {
        var obj = qs.parse(buf.toString());
        var sql = `UPADTE  user_login  SET password=？ WHERE phone=? AND uname=?`
        pool.query(sql_select, [obj.password, obj.phone, obj.name], (err, result) => {
            if (err) throw err;
            if (affectedRow > 0) {
                res.json({ data: 1, msg: '更改密码成功' })
            } else {
                res.json({ data: -1, msg: '手机号与用户名需匹配' })
            }
        })

    })

})
module.exports = router