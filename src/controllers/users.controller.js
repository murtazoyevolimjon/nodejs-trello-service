import pool from "../config/db.js";
import * as bcrypt from "bcrypt";
import { DeleteFromtable, GetOne, pagination, Updatetable } from "../helpers/utils.js";

const setup = async (req, res, next) => {
    try {
        const { query } = req.body;
        const result = await pool.query(query);
        return res.status(200).send({ message: result.command });
    } catch (err) {
        return next(err);
    }
};

const deletetable = async (req, res) => {
    try {
        const { query } = req.body;
        const result = await pool.query(query);
        return res.status(200).send({ message: result.command });
    } catch (err) {
        throw new Error(err);
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
            [name, email, hashPassword]
        );
        return res.status(200).send({
            success: true,
            message: "Muvaffaqiyatli ro'yxatdan o'tkazildi",
            data: rows[0]
        });
    } catch (err) {
        throw new Error(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
        const user = rows[0];
        if (!user) return res.status(404).send({ message: "Topilmadi, ro'yxatdan o'ting" });
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) return res.status(400).send({ message: "Parol mos emas" });
        return res.status(200).send({ message: "Kirish muvaffaqiyatli amalga oshirildi" });
    } catch (err) {
        throw new Error(err);
    }
};

const getAll = async (req, res) => {
    try {
        const result = await pagination("users", req, res);
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await GetOne("users", id, res);
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Updatetable("users", id, req, res);
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await DeleteFromtable("users", id, res);
        return result.rows;
    } catch (err) {
        throw new Error(err);
    }
};

export { deleteUser, getAll, getOne, update, setup, login, register, deletetable };