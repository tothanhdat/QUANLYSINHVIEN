const route = require('express').Router();
const SINH_VIEN_MODEL = require('../models/SinhVien');
const KHOA_MODEL = require('../models/Khoa');
const ROLE_ADMIN = require('../utils/checkRole');
route.get('/them', async (req, res) => {
    let result = await KHOA_MODEL.getList();
    res.render('pages/them-sinh-vien', { result: result.data });
})
route.post('/add', async (req, res) => {
    let { hoTen, mssv, maKhoa } = req.body;
    try {
        let result = await SINH_VIEN_MODEL.insert(hoTen, mssv, maKhoa);
        res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-them-sinh-vien');
    }
});
route.get('/danh-sach', ROLE_ADMIN, async (req, res) => {
    let result = await SINH_VIEN_MODEL.getList();
    res.render('pages/danhsach', { result: result.data });
});
route.get('/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let result = await SINH_VIEN_MODEL.getID(id);
    res.json(result);
});
route.get('/update/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let result = await SINH_VIEN_MODEL.getID(id);
    res.render('pages/edit-sinh-vien', { infoStudent: result.data });
})
route.post('/update/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let { hoTen, mssv, maKhoa } = req.body;
    console.log({ id, hoTen, mssv });
    try {
    let result = await SINH_VIEN_MODEL.updateID(id, hoTen, mssv, maKhoa);
    res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-update-sinh-vien');
    }
});
route.get('/delete/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    try {
        let result = await SINH_VIEN_MODEL.deleteID(id);
        res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-xoa-sinh-vien');
    }
});

module.exports = route;