import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().required().min(3).max(50).messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be at most 50 characters long",
    "any.required": "Title is required",
  }),
  content: Joi.string().required().min(10).max(500).messages({
    "string.empty": "Content cannot be empty",
    "string.min": "Content must be at least 10 characters long",
    "string.max": "Content must be at most 500 characters long",
    "any.required": "Content is required",
  }),
})

export default postSchema;