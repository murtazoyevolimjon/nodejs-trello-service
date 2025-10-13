import pool from "../config/db.js";
import { DeleteFromtable, GetOne, pagination, Updatetable } from "../helpers/utils.js";

export const ColumnController = {
    getAllColumns: async function (req, res) {
        try {
            const result = await pagination("columns", req, res);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },

    getOneColumn: async function (req, res) {
        try {
            const id = req.params.id;
            const result = await GetOne("columns", id, res);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },

    post: async function (req, res) {
        try {
            const { title, order_index, board_id } = req.body;
            const query = `INSERT INTO columns(title, order_index, board_id) VALUES($1, $2, $3) RETURNING *`;
            const { rows } = await pool.query(query, [title, order_index, board_id]);
            return res.status(200).send(rows);
        } catch (err) {
            throw new Error(err);
        }
    },

    update: async function (req, res) {
        try {
            const id = req.params.id;
            const result = await Updatetable("columns", id, req, res);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },

    delete: async function (req, res) {
        try {
            const id = req.params.id;
            const result = await DeleteFromtable("columns", id, res);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
};
