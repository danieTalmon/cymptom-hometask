import { Product } from './../models/product-model';
import * as express from 'express';
import { products } from '..';


export const getProductsByFilter: (
  req: express.Request,
  res: express.Response
) => any = (req, res) => {
  let result: Product[] = [];
  const filter: string = req.query.filter as string;
  const page: number = Number(req.query.page);


  if (filter && filter !== '' && req.query.page && page > -1) {
    const filterRegex: RegExp = new RegExp(`.*${filter}.*`, 'g');
    const productsToken = 10;
    const skip = page > 1 ? (page - 1) * productsToken : 0;
    const searchSuggestions = products.filter(product => {
        const productName: string = product.name;
        return productName?.match(filterRegex)?.length > 0;
      });
    res.json(searchSuggestions.slice(skip,skip + productsToken));
  } else {
    res.status(400).send();
  }
};
