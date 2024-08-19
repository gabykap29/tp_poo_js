import { body, validationResult } from "express-validator";

export const productValidation = [
  body("name").isString().isLength({ min: 3, max: 50 }),
  body("description").isString().isLength({ min: 3, max: 200 }),
  body("price").isNumeric(),
  body("category").isString().isLength({ min: 3, max: 50 }),
  body("stock").isNumeric(),
];

export const validateRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
