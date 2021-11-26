import * as express from 'express';
import { router as productRouter } from './routers/product-routes';

const port: number = 3000;
const app: express.Express = express();

app.use('/', productRouter);

app.listen(port, () =>
  console.log(`products suggestions app listening at http://localhost:${port}`)
);
