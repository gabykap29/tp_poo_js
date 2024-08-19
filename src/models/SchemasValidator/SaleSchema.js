import { body, validationResult } from "express-validator";

export const saleValidation = [
  body("userId").isString().isLength({ min: 3 }),
  body("items").isArray(),
  body("totalPrice").isNumeric(),
];

export const validateRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
