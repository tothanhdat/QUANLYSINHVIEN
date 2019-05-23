const route = require('express').Router();
const USER_MODEL = require('../models/User');

route.post('/register', async (req, res) => {
    let { username, password } = req.body;
    let infoUser = await USER_MODEL.register(username, password);
    if (infoUser.error)
        return res.redirect('/user/dang-ky');
    return res.redirect('/user/dang-nhap');
});

route.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let infoUser = await USER_MODEL.signIn(username, password);
    if (infoUser.error)
        return res.json({ message: 'sai username hoac password' });
    res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    return res.redirect('/sinhvien/danh-sach');
})

route.get('/dang-nhap', async (req, res) => {
    res.render('pages/login');
})
route.get('/dang-ky', async (req, res) => {
    res.render('pages/register');
})

module.exports = route;