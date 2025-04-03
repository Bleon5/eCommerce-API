import { categorySchema } from "../schemas/categorySchemas.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const categoryValidate = (req, res, next) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(
      new ErrorResponse(
        "Validation error",
        400,
        error.details.map((err) => err.message)
      )
    );
  }
  next();
};
