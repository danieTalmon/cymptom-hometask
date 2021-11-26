import { getProductsByFilter } from './../controllers/product-controllers';
import * as express from 'express';

const router = express.Router();

router.get('/product', getProductsByFilter);


export { router };
