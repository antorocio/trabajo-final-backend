import { Task } from "../models/TaskModel.js";

const getTasks = async (req, res) => {
    try {
        const userLogged = req.userLogged

        const { status, priority, search, sort,  page = 1, limit = 5 } = req.validatedQuery 

        const filters = { userId: userLogged.id }

        if (status) { filters.status = status }

        if (priority) { filters.priority = priority }

        if (search) { filters.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] }

        const allowedSorts = [ "createdAt", "-createdAt", "dueDate", "-dueDate", "title", "-title" ]

        const sortOption = allowedSorts.includes(sort) ? sort : "-createdAt"

        const skip = (page - 1) * limit

        const filterTasks = await Task.find(filters).sort(sortOption).skip(skip).limit(Number(limit))

        const totalTasks = await Task.countDocuments(filters)

        const totalPages = Math.ceil(totalTasks / limit)

        res.json({
            success: true,
            data: filterTasks,
            pagination: { 
                page: Number(page),
                limit: Number(limit),
                totalTasks,
                totalPages
            },
            message: "Tareas obtenidas correctamente"
        })
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al obtener las tareas" })
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id
        const foundTask = await Task.findById(id, { userId: 0 })
        if (!foundTask) return res.status(404).json({ success: false, error: "No existe una tarea con ese ID" })
        res.json({
            success: true,
            data: foundTask,
            message: "Tarea obtenida correctamente"
        })
    } catch (error) {
        res.status(400).json({ success: false, error: "El formato del ID no es válido" })
    }
}

const createTask = async (req, res) => {
    try {
        const body = req.body
        const userLogged = req.userLogged

        const newTask = await Task.create({
            title: body.title,
            description: body.description,
            status: body.status,
            priority: body.priority,
            dueDate: body.dueDate,
            userId: userLogged.id
        })

        newTask.save()

        const task = newTask.toObject()
        delete task.userId

        res.json({
            success: true,
            data: task,
            message: "Tarea creada correctamente"
        })
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al crear la tarea" })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updatedTask = await Task.findByIdAndUpdate(id, { ...body }, { new: true, projection: { userId: 0 } })

        if (!updatedTask) return res.status(404).json({ success: false, error: "No existe una tarea con ese ID" })

        res.json({
            success: true,
            data: updatedTask,
            message: "Tarea actualizada correctamente"
        })
    } catch (error) {
        res.status(400).json({ success: false, error: "El formato del ID no es válido" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id

        const deletedTask = await Task.findByIdAndDelete(id)
        if (!deletedTask) return res.status(404).json({ success: false, error: "No existe una tarea con ese ID" })
        const task = deletedTask.toObject()
        delete task.userId

        res.json({
            success: true,
            data: task,
            message: "Tarea eliminada correctamente"
        })
    } catch (error) {
        res.status(400).json({ success: false, error: "El formato del ID no es válido" })
    }
}

const getAllTasksAdmin = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("userId", "username email role")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            data: tasks,
            message: "odas las tareas fueron obtenidas correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error al obtener las tareas"
        })
    }

}

const deleteTaskAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const deletedTask = await Task.findByIdAndDelete(id)

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                error: "Tarea no encontrada"
            })
        }

        return res.status(200).json({
            success: true,
            data: deletedTask,
            message: "Tarea eliminada correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: "ID de tarea inválido"
        })
    }
}

export { getTasks, getTask, createTask, updateTask, deleteTask, getAllTasksAdmin, deleteTaskAdmin }
