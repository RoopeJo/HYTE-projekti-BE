import express from 'express';
import { deleteEntry, getEntries, getEntryById, postEntry } from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { body } from 'express-validator';

const entryRouter = express.Router();

entryRouter.route('/').get(authenticateToken, getEntries)
.post(authenticateToken, body('weight').isFloat({min: 0}), body('steps').isInt({min: 0}), body('caloriesConsumed').isInt({min: 0}), body('caloriesBurned').isInt({min: 0}), postEntry);

entryRouter.route('/:id').get(getEntryById). delete(authenticateToken, deleteEntry);

export default entryRouter;
