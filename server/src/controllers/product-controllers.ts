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
  //   const jsonStream = StreamArray.withParser();
  //   const filterRegex: RegExp = new RegExp(`.*${filter}.*`, 'g');

  //   jsonStream.on('data', ( data: {key: number, value: Product} ) => {
  //     const product: Product = data.value;
  //     const productName: string = product.name;
  //     if (productName?.match(filterRegex)?.length > 0) {
  //        res.write(JSON.stringify(product));
  //       }
  // });

  // jsonStream.on('error', (err) => {
  //   console.error('error ocurred', err);
  //   res.status(500).send('internal server error');
  // });


  // jsonStream.on('end', () => {
  //   res.status(200).end();
  // });

  // fs.createReadStream(filePath).pipe(jsonStream.input);

  } else {
    res.status(400).send();
  }
};
