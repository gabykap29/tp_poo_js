import { body, validationResult } from "express-validator";

// Validaciones para el carrito
export const cartValidation = [
  // Verifica que 'items' sea un array
  body("items")
    .isArray()
    .withMessage("Items debe ser un array")
    .bail() // detiene la cadena de validaciones si hay un error
    .custom((items) => {
      // Verifica que cada ítem en el array tenga los campos requeridos
      items.forEach((item) => {
        if (!item.productId || !item.quantity || !item.price) {
          throw new Error("Cada ítem debe tener productId, quantity y price");
        }
        if (typeof item.quantity !== "number" || item.quantity <= 0) {
          throw new Error("La cantidad debe ser un número positivo");
        }
        if (typeof item.price !== "number" || item.price < 0) {
          throw new Error("El precio debe ser un número no negativo");
        }
      });
      return true;
    }),

  // Verifica que 'totalPrice' sea un número
  body("totalPrice")
    .isNumeric()
    .withMessage("TotalPrice debe ser un número")
    .bail()
    .custom((totalPrice, { req }) => {
      // Verifica que el totalPrice sea consistente con la suma de los precios de los ítems
      const calculatedTotalPrice = req.body.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      if (totalPrice !== calculatedTotalPrice) {
        throw new Error("TotalPrice no coincide con la suma de los ítems");
      }
      return true;
    }),
];

// Middleware para manejar errores de validación
export const validateRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
