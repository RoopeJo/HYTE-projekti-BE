import { validationResult } from "express-validator";

// Middleware for checking all input validation errors
// param {Request} req - httprequest object
// param {Response} res - http response object
// param {Function} next - function for calling next function in middleware chain
const validationErrorHandler = (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ message: 'Invalid input data', errors: errors.array()});
 }
};

export {validationErrorHandler};