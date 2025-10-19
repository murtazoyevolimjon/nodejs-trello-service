import pool from "../config/db.js"
import { loginPassword} from "../helper/hashPassword.js"


export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    const valid = await loginPassword(password, user.rows[0].password)
    const checkPassword = loginPassword(password, user.rows[0].password)
    
    if (user.rows.length === 0){
      return res.status(404).json({ message: `not found email ${email}`})
    }
    if(!checkPassword){
      return res.status(400).json({message:`INVALID PASSWORD!`})
    }
    if (!valid) return res.status(401).json({ message: "notugri password" })

    const { password: _, ...data } = user.rows[0]
    res.status(200).json({data: `Tizimga kirdingiz`})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}