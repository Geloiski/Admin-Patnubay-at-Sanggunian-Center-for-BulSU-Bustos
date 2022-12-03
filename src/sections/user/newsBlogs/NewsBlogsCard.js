import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  CardContent,
  CardMedia,
  IconButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
// import { fCurrency } from '../../../utils/formatNumber';
//
// import Label from '../../../components/Label';
// import ColorPreview from '../../../components/ColorPreview';

// ----------------------------------------------------------------------
//icon
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import MoreVertIcon from "@mui/icons-material/MoreVert";

// ----------------------------------------------------------------------

NewsBlogsCard.propTypes = {
  news: PropTypes.object,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsBlogsCard({ news }) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    Title,
    Desc,
    Image,
    Date
  } = news;

  const buttonEdit = (id) => {
    history.push(`editnewsblogs?newsblogs=${id}`);
    console.log(id);
  }
  return (
    <Card sx={{ maxWidth: {xs: "100%",md:345} }}>
      <Box sx={{ position: "relative" }}>
      
        <Box
          sx={{
            backgroundColor: "gray",
            opacity: 0.9,
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            borderRadius: 10,
          }}
        >
          <IconButton aria-label="delete">
            <ModeEditOutlineOutlinedIcon
            onClick={() => buttonEdit(news.id)}
              style={{ color: "white", fontSize: 13 }}
            />
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          height="250"
          image={Image}
          alt="green iguana"
        />
      </Box>

      <CardContent>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ margin: 2 }}
        >
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography fontSize={15} noWrap fontWeight={600}>
              {Title.substring(0, 20)}
            </Typography>
          </Link>
          
          <ExpandMore
            sx={{ right: 0 }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </CardContent>

      {/* <CardActions>
        <Button variant="contained" size="small">
          <Typography sx={{ textTransform: "capitalize" }}>Edit</Typography>
        </Button>
        <Button size="small">
          {" "}
          <Typography sx={{ textTransform: "capitalize" }}>Delete</Typography>
        </Button>
      </CardActions> */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>Date: {Date} </Typography>
          <Typography paragraph>Description </Typography>
          <Typography paragraph>{Desc}</Typography>
         </CardContent>
      </Collapse>
    </Card>
  );
}
