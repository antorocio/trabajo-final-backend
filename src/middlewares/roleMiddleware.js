const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userLogged.role)) {
            return res.status(403).json({
                success: false,
                error: "No tienes permisos para realizar esta acción"
            })
        }

        next()
    }
}

export { authorizeRoles }