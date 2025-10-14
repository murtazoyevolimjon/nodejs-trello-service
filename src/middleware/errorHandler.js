const ErrorHandler = (err, req, res, next) => {
    console.error("Xatolik:", err.message);

    const status = err.status || 500;
    let message = "Serverda ichki xatolik";

    if (status === 404) message = "Ma'lumot topilmadi";
    if (status === 400) message = "Noto‘g‘ri so‘rov yuborildi";
    if (status === 401) message = "Ruxsat etilmagan foydalanuvchi";
    if (status === 403) message = "Kirish taqiqlangan";

    return res.status(status).json({
        success: false,
        status,
        message,
        error: err.message
    });
};

export default ErrorHandler;