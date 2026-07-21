import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    versionKey: false,
    timestamps: true
})

const Task = model("Task", taskSchema)

export { Task }