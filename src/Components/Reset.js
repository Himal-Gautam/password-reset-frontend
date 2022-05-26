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

export function Reset() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(0);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  function handleReset() {
    fetch(`${API}/users/password-reset/reset`, {
      method: "PATCH",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(data.success);
        setMsg(data.msg);
        setOpen(true);
        if (data.success) {
          // window.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheck() {
    fetch(`${API}/users/password-reset/otp`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        otp: otp
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(data.success);
        setMsg(data.msg);
        setOpen(true);
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
        <Alert onClose={handleClose} severity={success ? "success" : "error"}>
          {msg}
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
                  disabled={success}
                />
                <TextField
                  id="outlined-basic"
                  label="OTP"
                  variant="outlined"
                  fullWidth="true"
                  sx={{ mt: 3 }}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={success}
                />
                {success ? (
                  <TextField
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    fullWidth="true"
                    sx={{ mt: 3 }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <></>
                )}
              </div>
            </CardContent>
            <CardActions>
              {success ? (
                <Button size="small" variant="contained" onClick={handleReset}>
                  RESET
                </Button>
              ) : (
                <Button size="small" variant="contained" onClick={handleCheck}>
                  CHECK
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}
