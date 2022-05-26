import "../App.css";
import React, { useState } from "react";
import { API } from "../global.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function Email() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);

  function handleGetEmail() {
    fetch(`${API}/users/password-reset/get-email`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        setFound(data.success);
        setOpen(true);
        if (found) {
          setTimeout(() => {
            window.close();
            window.open("_blank");
          }, 6000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={found ? "success" : "error"}>
          {found
            ? "Email has been sent with link & code"
            : "Email has not been found in db"}
        </Alert>
      </Snackbar>
      <div className="base">
        <div className="vbase">
          <Card sx={{ maxWidth: 500 }} raised="true">
            <CardMedia
              component="img"
              height="150"
              image="https://us.123rf.com/450wm/jirsak/jirsak1707/jirsak170700007/82255755-cybersecurity-and-information-technology-security-services-concept-login-or-sign-in-internet-concept.jpg?ver=6"
              alt="login"
            />
            <CardContent>
              <div className="content">
                <Typography variant="h5" component="div">
                  Password Reset
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth="true"
                  sx={{ mt: 3 }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={handleGetEmail}>
                Get Email
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

