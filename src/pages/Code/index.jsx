/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/display-name */
import React, { useEffect, useCallback, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { firebase_app } from "../../firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: window.innerHeight * 0.5,
  },
}));
export default React.memo(() => {
  const { urlCode } = useParams();
  const { replace } = useHistory();
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(true);

  const readData = useCallback(async () => {
    if (urlCode !== undefined) {
      const document = await firebase_app
        .firestore()
        .collection("url")
        .doc(urlCode)
        .get();
      if (document.data()) {
        // window.history.go(-(window.history.length - 1));
        window.open(document.data().longUrl, "_self");
      } else {
        setisLoading(false);
      }
    }
  }, [urlCode]);

  useEffect(() => {
    readData();
  }, [readData]);

  const handleClick = useCallback(() => {
    replace("/");
  }, [replace]);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div class="content-block">
      <img
        src="/meditation.png"
        class="image"
        alt="woman meditating"
      />
      <div class="headline-wrapper">
        <h1 class="headline">Something's wrong here.</h1>
        <p class="headline-copy">
          This is a 404 error, which means you've clicked on a bad link or
          entered an invalid URL. Maybe what you are looking for can be found at{" "}
          <a href="" style={{ cursor: "pointer" }} onClick={handleClick}>
            {process.env.REACT_APP_BASE_URL}
          </a>
          . P.S. {process.env.REACT_APP_BASE_URL} links are case sensitive.
        </p>
      </div>
    </div>
  );
});
