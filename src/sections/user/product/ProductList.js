import React from "react";
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

// ----------------------------------------------------------------------



ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={2} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} md={3.5}>
          <ProductCard product={product} />
         
          
        </Grid>
      ))}
    </Grid>
  );
}
