/* eslint-disable eqeqeq */
import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import shortid from "shortid";

import { firebase_app } from "../../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [error, seterror] = useState(false);
  const [url, setUrl] = useState("");
  const [isSubmitted, setisSubmitted] = useState(false);
  const [cardData, setcardData] = useState({});

  function validateURL(link) {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
      return link;
    } else {
      return `http://${link}`;
    }
  }

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (validURL(url)) {
        const urlCode = shortid.generate();
        const shortUrl = process.env.REACT_APP_BASE_URL + "/" + urlCode;

        const data = {
          longUrl: validateURL(url),
          shortUrl,
          urlCode,
          date: new Date(),
        };
        setcardData(data);
        firebase_app
          .firestore()
          .collection("url")
          .doc(data.urlCode)
          .set(data)
          .then(() => {
            setUrl("");
            setisSubmitted(true);
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
      } else {
        seterror(true);
      }
    },
    [url]
  );

  const handleChange = useCallback((event) => {
    setUrl(event.target.value);
    if (validURL(event.target.value)) {
      seterror(false);
    } else {
      seterror(true);
    }
  }, []);

  const handleGenerate = useCallback(() => {
    setisSubmitted((state) => !state);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>URL SHORTNER</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              error={error}
              id="standard-error-helper-text"
              label="URL"
              type="url"
              value={url}
              onChange={handleChange}
              helperText={error ? "Invalid URL" : ""}
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Generate short url
            </Button>
          </form>
        ) : (
          <>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {cardData.urlCode}
                </Typography>
                <Typography variant="h5" component="h2">
                  Autual URL: {cardData.longUrl}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Short URL: {cardData.shortUrl}
                </Typography>
                <Typography variant="body2" component="p">
                  Date: {cardData.date}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(cardData.shortUrl);
                  }}
                >
                  Copy Short URL
                </Button>
              </CardActions>
            </Card>
            <Button
              onClick={handleGenerate}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Generate new short url
            </Button>
          </>
        )}
      </div>
    </Container>
  );
}
