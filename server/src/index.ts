import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from './models/product-model';
import { router as productRouter } from './routers/product-routes';

const filePath: string = path.join(__dirname, '/assets/products.json');
const port: number = 3000;
const app: express.Express = express();
export const products: Product[] = JSON.parse(fs.readFileSync(filePath).toString());

app.use('/', productRouter);

app.listen(port, () =>
  console.log(`products suggestions app listening at http://localhost:${port}`)
);
