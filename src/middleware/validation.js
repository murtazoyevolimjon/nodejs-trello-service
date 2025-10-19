export const validation = (schema) => {
    return (req, res, next) =>{
        const {error} = schema.validate(req.body,{abortEarly: false})
        

        if(error){
            return res.status(400).json({
                message: "Validate xatosi",
                errors: err.details.map((err) => err.message)
            })
        }
        next()
    }
}