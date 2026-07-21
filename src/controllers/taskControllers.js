import { Task } from "../models/TaskModel.js";

const getTasks = async (req, res) => {
    try {
        const userLogged = req.userLogged
        const filterTasks = await Task.find({ userId: userLogged.id })
        res.json({
            success: true,
            data: filterTasks,
            message: "Tareas obtenidas correctamente"
        })
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al obtener las tareas" })
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id
        const foundTask = await Task.findById(id, { userId: 0})
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
        const updatedTask = await Task.findByIdAndUpdate(id, { ...body }, { new: true, projection: {userId : 0 } })

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

export { getTasks, getTask, createTask, updateTask, deleteTask }