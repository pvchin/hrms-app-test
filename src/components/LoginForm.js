import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardActionArea,
  CardMedia,
  Divider,
  Typography,
  Paper,
} from "@material-ui/core";
import { useRecoilState } from "recoil";

import { makeStyles } from "@material-ui/core/styles";

import img from "../assets/AppSutLogo.jpg";
import SigninForm from "./SigninForm";
import DashboardAdmin from "./DashboardAdmin";
import { loginLevelState } from "./data/atomdata";

const LoginForm = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsLoading(true);
    return <DashboardAdmin />;
  };

  return (
    <Container className={classes.root}>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Signin
      </Button> */}
      <Paper variant="outlined">
        <img src={img} alt="logo"/>
      </Paper>
      <Card className={classes.card}>
        {/* <CardHeader
          //  avatar={
          //    <Avatar aria-label="recipe" className={classes.avatar}>
          //      L
          //    </Avatar>
          //  }
          className={classes.cardHeader}
          title="AppSmiths"
          titleTypographyProps={{ variant: "h3" }}
          subheader="Sutera Sdn Bhd"
          subheaderTypographyProps={{ variant: "h4" }}
          style={{
            textAlign: "center",
            fontSize: 60,
            // backgroundColor: "background",
          }}
        /> */}
        <CardActionArea>
          {/* <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            // className={classes.media}
            image={img}
            title="Contemplative Reptile"
          /> */}
          <Divider className={classes.divider} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h3"
              className={classes.typography}
              style={{ textAlign: "center" }}
            >
              Login
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h3"
              style={{ textAlign: "center" }}
            >
              {/* Access to Admin dashboard */}
            </Typography>
            <SigninForm  />
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",
    width: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  card2: {
    position: "relative",
    width: "400px",
    color: "primary",
    //borderStyle: "solid",
    //borderColor: "blue",
    boxShadow:
      "rgba(255, 0, 0, 0.117647) 0px 1px 6px, rgba(255, 0, 0, 0.117647) 0px 1px 4px",
  },
  cardHeader: {
    display: "flex",
    paddingBottom: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    flexGrow: 1,
    align: "center",
  },
  media2: {
    margin: "-70px auto 0",
    width: "80%",
    height: 300,
    borderRadius: "4px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 1000,
    paddingTop: "56.25%",
  },
  card: {
    width: 650,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    height: "800",
    width: "100%",
    objectFit: "cover",
    // marginLeft: '33%'
    // paddingTop: "56.25%", // 16:9
  },
  divider: {
    // Theme Color, or use css color in quote
    background: theme.palette.divider,
    padding: 4,
  },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
}));

export default LoginForm;
