/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Grid, Typography, Link, Container } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" target="blank" href="https://vishalj254.github.io">
        Vishal Jain
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default React.memo(() => {
  return (
    <center style={{ marginTop: "5%" }}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Grid item xs={12} sm={2}>
          <Link
            target="blank"
            href="https://www.facebook.com/VishalJainOfficial"
          >
            <FacebookIcon />
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Link target="blank" href="https://www.github.com/vishalj254">
            <GitHubIcon />
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Link target="blank" href="https://www.linkedin.com/in/vishalj254">
            <LinkedInIcon />
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Link target="blank" href="https://vishalj254.github.io">
            <LanguageIcon />
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Link target="blank" href="https://www.twitter.com/vishalj254">
            <TwitterIcon />
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Link target="blank" href="https://www.instagram.com/vishalj254">
            <InstagramIcon />
          </Link>
        </Grid>
      </Container>
      <div style={{ marginTop: "2%" }}>
        <Copyright />
      </div>
    </center>
  );
});
