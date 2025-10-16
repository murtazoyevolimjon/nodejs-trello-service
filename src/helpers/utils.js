import pool from "../config/db.js";

export async function GetAll(tablename) {
    try {
        const query = `SELECT * FROM ${tablename}`;
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const GetOne = async (table, id) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${table} WHERE id=$1`,
    [id]
  );
  return rows[0];
};

export const DeleteFromtable = async (tablename, id, res) => {
    try {
        const all = await GetAll(tablename);
        const index = all.findIndex(item => item.id === id);
        if (index === -1) return res.status(404).send({ message: `${id} not found` });
        const query = `DELETE FROM ${tablename} WHERE id=$1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return res.status(200).send({
            message: `${id} deleted from table`,
            data: rows[0] 
        });
    } catch (err) {
        throw new Error(err);
    }
};



export const Updatetable = async (table, id, req, res) => {
  try {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Yangilanish uchun maydon yuborilmadi",
      });
    }

    
    const setClause = fields.map((field, i) => `${field}=$${i + 1}`).join(", ");

    
    const query = `UPDATE ${table} SET ${setClause} WHERE id=$${fields.length + 1} RETURNING *`;

    const { rows } = await pool.query(query, [...values, id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${table} jadvalida ${id} topilmadi`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ma'lumot muvaffaqiyatli yangilandi",
      data: rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: err.message,
    });
  }
};


export const pagination = async (tablename, req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const query = `SELECT * FROM ${tablename} LIMIT $1 OFFSET $2`;
        const { rows } = await pool.query(query, [limitNumber, offset]);
        return res.status(200).send({
            page: pageNumber,
            limit: offset,
            total: rows.length,
            data: rows
        });
    } catch (err) {
        throw new Error(err);
    }
};