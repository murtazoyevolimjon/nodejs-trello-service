import pool from "../config/db.js";
import { DeleteFromtable, GetOne, pagination, Updatetable } from "../helpers/utils.js";

export const BoardController = {
    post: async function (req, res) {
        try {
            const { title, user_id } = req.body;
            const values = [title, user_id];
            const query = `INSERT INTO boards(title, user_id) VALUES($1, $2) RETURNING *`;
            const { rows } = await pool.query(query, values);
            return res.status(201).send({ message: "Board qo‘shildi", data: rows[0] });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    getAll: async function (req, res) {
        try {
            const result = await pagination("boards", req, res);
            return result;
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    getOne: async function (req, res) {
        try {
            const id = req.params.id;
            const tablename = "boards";
            const result = await GetOne(tablename, id, res);
            return result;
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    update: async function (req, res) {
        try {
            const id = req.params.id;
            const result = await Updatetable("boards", id, req, res);
            return result;
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    delete: async function (req, res) {
        try {
            const id = req.params.id;
            const result = await DeleteFromtable("boards", id, res);
            return result;
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    }
};
