import React, { Component } from "react";
import Home from './homepage';
import connectionData from '../data/dummyData'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          username: "",
          password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                uni
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        );
    }

    onEmailChangeHandler = event => {
        this.setState({
          username: event.target.value
        });
    }

    onPassChangeHandler = event => {
        this.setState({
          password: event.target.value
        });
    }

    handleSubmit = event => {
        // Do Stuff
        if (connectionData.accounts.credentials.username == this.state.username
          && connectionData.accounts.credentials.password == this.state.password) {
            console.log(true)
            this.props.history.push({pathname: `/home`, user: 1, admin: 0})
          }
    }

   
    render() {
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            defaultValue=""
            autoFocus
            onChange={this.onEmailChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onPassChangeHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        Copyright()
      </Box>
    </Container>
        );
    }
}