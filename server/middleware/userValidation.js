import { addUserSchema,updateUserSchema } from "../schemas/userSchemas.js";
import ErrorResponse from "../utils/ErrorResponse.js";


const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(
          new ErrorResponse(`Validation Error: ${error.details[0].message}`, 400)
        );
      }
      next();
    };
  };

  export const validateAddUser = validate(addUserSchema);
  export const validateUpdateUser = validate(updateUserSchema);