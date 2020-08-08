import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const commentsSchema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true }
})

const Task = new Schema({
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  comments: [{ type: commentsSchema }]
}, { timestamps: true, toJSON: { virtuals: true } })


Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


export default Task