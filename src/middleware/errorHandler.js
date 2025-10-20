// src/middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error("❌ Xatolik:", err);

  // Agar xatoda status kodi bo‘lsa, uni olamiz, bo‘lmasa 500 (Server error)
  const statusCode = err.status || 500;

  // Xabarni aniqlaymiz
  const message = err.message || "Serverda kutilmagan xatolik yuz berdi";

  // Foydalanuvchiga javob qaytaramiz
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};
