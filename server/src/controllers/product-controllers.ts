import { Product } from './../models/product-model';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, '../assets/products.json');

export const getProductsByFilter: (
  req: express.Request,
  res: express.Response
) => any = (req, res) => {
  let result: any;
  const productsObject: Product[] = JSON.parse(
    fs.readFileSync(filePath).toString()
  );
  const filter: string = req.query.filter as string;


  if (filter && filter !== '') {
    const filterRegex: RegExp = new RegExp(`.*${filter}.*`, 'g');
    result = productsObject.filter((product) => {
      const productName: string = product.name;
      return productName?.match(filterRegex)?.length > 0;
    });
    res.json(result);
  } else {
    res.status(404).send(result);
  }
};
