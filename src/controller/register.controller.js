import pool from "../config/db.js"
import {hashPassword} from "../helper/hashPassword.js"


export const register = async (req, res)=> {
    try{
        const{name, email, password} = req.body
        const hashed = await hashPassword(password)
        const user = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,[name, email, hashed])
    res.status(201).json(user.rows[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}