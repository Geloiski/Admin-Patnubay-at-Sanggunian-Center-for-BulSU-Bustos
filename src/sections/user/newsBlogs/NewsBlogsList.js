import React from "react";
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import NewsBlogsCard from './NewsBlogsCard';
// ----------------------------------------------------------------------



NewsBlogsList.propTypes = {
  newsBlogs: PropTypes.array.isRequired
};

export default function NewsBlogsList({ newsBlogs, ...other }) {
  return (
    <Grid container spacing={2} {...other}>
      {newsBlogs.map((news) => (
        <Grid key={news.id} item xs={12} md={3.5}>
          <NewsBlogsCard news={news} />
         
          
        </Grid>
      ))}
    </Grid>
  );
}
