export const validateUserRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Barcha maydonlar to'ldirilishi kerak!" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ message: "Email formati notog'ri!" });

  if (password.length < 6) return res.status(400).json({ message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!" });

  next();
};

export const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email va parol kiritilishi shart!" });
  next();
};
