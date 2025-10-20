import pool from "../config/db.js"
import bcrypt from "bcrypt"

const validTables = ["users", "boards", "tasks", "columns"]

export const BaseController = (table) => {
  if (!validTables.includes(table)) {
    throw new Error(`Invalid table name: ${table}`)
  }

  return {
    getAll: async (req, res, next) => {
      try {
        const getAllData = await pool.query(`SELECT * FROM ${table}`)
        const data = getAllData.rows.map(({ password, ...rest }) => rest)
        res.status(200).json({message: `data found from ${table}`,data: data})
      } catch (error) {
        next(error)
      }
    },

    getOne: async (req, res, next) => {
      try {
        const { id } = req.params
        const checkId = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id])

        if (checkId.rows.length === 0) {
          return res.status(404).json({ message: `Not found ID ${id} from ${table}` })
        }
        const data = checkId.rows.map(({ password, ...rest }) => rest)
        res.status(200).json({ message: `data found for ID ${id} from ${table}`,data: data})
      } catch (error) {
        next(error)
      }
    },

    createOne: async (req, res, next) => {
      try {
        if (table === "tasks") {
          const { userId, boardId, columnId } = req.body

          const boardIdCheck = await pool.query(`SELECT * FROM boards WHERE id = $1`, [boardId])
          if (boardIdCheck.rows.length === 0)
            return res.status(404).json({ message: `not found boardId from boards` })

          const columnIdCheck = await pool.query(`SELECT * FROM columns WHERE id = $1`, [columnId])
          if (columnIdCheck.rows.length === 0)
            return res.status(404).json({ message: `not found columnId from columns` })

          const userIdCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
          if (userIdCheck.rows.length === 0)
            return res.status(404).json({ message: `not found userId from users` })
        }

        if (table === "users") {
          const { email, password } = req.body
          if (!email) return res.status(400).json({ message: `email is required` })
          if (!password) return res.status(400).json({ message: `Password is required` })

          const emailUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
          if (emailUser.rows.length > 0) {
            return res.status(400).json({ message: `email ${email} already exists` })
          }

          req.body.password = await bcrypt.hash(password, 10)
        }
        if (table === "columns") {
          const { boardId } = req.body
          const boardIdCheck = await pool.query(`SELECT * FROM boards WHERE id = $1`, [boardId])
          if (boardIdCheck.rows.length === 0) {
            return res.status(404).json({ message: `boardId not found from boards` })
          }
        }

        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`
        const createOne = await pool.query(query, values)
        const data = createOne.rows.map(({ password, ...rest }) => rest)

        res.status(201).json({ message: `data created on the ${table}`,data: data})
      } catch (error) {
        next(error)
      }
    },

    updateOne: async (req, res, next) => {
      try {
        const { id } = req.params
        const checkId = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id])

        if (checkId.rows.length === 0) {
          return res.status(404).json({ message: `not found ID ${id} from ${table}` })
        }
        if (req.body.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        const updateQuery = `UPDATE ${table} SET ${keys.map((key, i) => `${key} = $${i + 1}`).join(", ")} WHERE id = $${keys.length + 1} RETURNING *`
        const updateOne = await pool.query(updateQuery, [...values, id])

        const data = updateOne.rows.map(({ password, ...rest }) => rest)
        res.status(200).json({ message: `data updated on the ${table}`,data: data })
      } catch (error) {
        next(error)
      }
    },

    deleteOne: async (req, res, next) => {
      try {
        const { id } = req.params
        const checkId = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id])

        if (checkId.rows.length === 0) {
          return res.status(404).json({ message: `not found ID ${id} from ${table}` })
        }

        await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id])
        res.status(200).json({ message: `deleted id ${id} from ${table}` })
      } catch (error) {
        next(error)
      }
    },
    search: async (req, res, next) => {
      try {
        const { page =1, limit =10 } = req.body
        
      } catch (error) {
        next(error)
      }
    }
  }
}