import { body, validationResult } from "express-validator";
//validaciones de los campos de usuario
export const userValidation = [
  body("name").isString().isLength({ min: 3 }),
  body("lastname").isString().isLength({ min: 3 }),
  body("username").isString().isLength({ min: 3 }),
  body("pass").isString().isLength({ min: 5 }),
];
//validar campos de usuario, si no cumple con las validaciones, se envia un mensaje de error
export const validateRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
