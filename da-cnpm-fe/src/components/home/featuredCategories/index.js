import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "redux/categoryRedux";

export default function FeaturedCategories() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section>
      <Box mb={4}>
        <Typography className={classes.headText}>
          Featured Categories
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box display="flex" justifyContent="center">
              <img src={categories[0]?.image} alt="" height={490} />
            </Box>
            <Typography className={classes.cateText}>
              {categories[0]?.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={categories[1]?.image} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>
                    {categories[1]?.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={categories[2]?.image} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>
                    {categories[2]?.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={categories[3]?.image} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>
                    {categories[3]?.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={categories[4]?.image} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>
                    {categories[4]?.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
