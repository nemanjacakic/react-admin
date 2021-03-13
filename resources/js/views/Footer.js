import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: theme.palette.primary.main,
    padding: "5px 0",
    zIndex: 1201
  },
  footerText: {
    color: theme.palette.common.white
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" align="center" className={classes.footerText}>
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
              Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
}
