import pool from "../config/db.js";

export const TaskController = {
    getAlltasks: async function (req, res) {
        try {
            const { boardId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);
            const offset = (pageNumber - 1) * limitNumber;
            const query = `SELECT * FROM tasks WHERE board_id=$1 LIMIT $2 OFFSET $3`;
            const { rows } = await pool.query(query, [boardId, limitNumber, offset]);
            if (rows.length === 0)
                return res.status(404).send({ message: `Ushbu board (${boardId}) uchun tasklar topilmadi` });
            return res.status(200).send({
                page: pageNumber,
                limit: limitNumber,
                total: rows.length,
                data: rows,
            });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    getOneTask: async function (req, res) {
        try {
            const { id, boardId } = req.params;
            const query = `SELECT * FROM tasks WHERE id=$1 AND board_id=$2`;
            const { rows } = await pool.query(query, [id, boardId]);
            if (rows.length === 0)
                return res.status(404).send({ message: "Task topilmadi" });
            return res.status(200).send(rows[0]);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    post: async function (req, res) {
        try {
            const { title, order_index, description, user_id, board_id, column_id } = req.body;
            const query = `INSERT INTO tasks(title, order_index, description, user_id, board_id, column_id)
                           VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
            const { rows } = await pool.query(query, [title, order_index, description, user_id, board_id, column_id]);
            return res.status(201).send({ message: "Task qo‘shildi", data: rows[0] });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    update: async function (req, res) {
        try {
            const { boardId, id } = req.params;
            const existing = await pool.query("SELECT * FROM tasks WHERE board_id=$1 AND id=$2", [boardId, id]);
            if (existing.rows.length === 0)
                return res.status(404).send({ message: "Bu boardda task topilmadi" });
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);
            const setQuery = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");
            const query = `UPDATE tasks SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`;
            const { rows } = await pool.query(query, [...values, id]);
            return res.status(200).send({ message: "Task yangilandi", data: rows[0] });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },

    delete: async function (req, res) {
        try {
            const { boardId, id } = req.params;
            const existing = await pool.query("SELECT * FROM tasks WHERE board_id=$1 AND id=$2", [boardId, id]);
            if (existing.rows.length === 0)
                return res.status(404).send({ message: "Bu boardda task topilmadi" });
            const query = `DELETE FROM tasks WHERE board_id=$1 AND id=$2 RETURNING *`;
            const { rows } = await pool.query(query, [boardId, id]);
            return res.status(200).send({ message: "Task o‘chirildi", data: rows[0] });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    },
};