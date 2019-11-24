import React from "react";
// import Home from './homepage';
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
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import constants from '../lib/constants'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: "white",
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color:'#EC7063'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    color: '#EC7063',
    
  },
  submit: {
    backgroundColor: '#f3acc9',
    "&:hover": {
      backgroundColor: '#EC7063 !important'
    }
  },
  links: {
    color:'#EC7063'
  },
  inputFocused: {
    backgroundColor: '#f3acc9',
    borderColor: '#f3acc9'
  }
});

class Login extends React.Component {

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
        const email = this.state.username
        const password = this.state.password
        const opts = {
          email: email,
          password: password
        }
        fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/login', {
                method: 'post',
                body: JSON.stringify(opts),
                headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then((result) => {
                    if (result.success) {
                      console.log('login successful')
                      setSessionCookie({ email });
                      this.props.history.push({pathname:`/home`})
                    } else {
                      alert('The email or password you provided was incorrect')
                    }
                    
                },
                (error) => {
                    alert('Something went wrong during login')
                }
            )
            /*
        if (connectionData.accounts.credentials.username === this.state.username
          && connectionData.accounts.credentials.password === this.state.password) {
            console.log(true)
            this.props.history.push({pathname:`/home`, state: { id: 1}})
          } else if (connectionData.admin.credentials.username === this.state.username
            && connectionData.admin.credentials.password === this.state.password){
              this.props.history.push({pathname:`/admin/`+this.state.username, state: { id: 0}})
          } else {
            alert("incorrect credentials")
          }
          */
    }

   
    render() {
        const { classes } = this.props;
        return (
            <Container style={{marginTop:"100px"}} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar >
          <LockOutlinedIcon />
        </Avatar >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} classes={{ focus: classes.inputFocused}} noValidate>
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
            className={classes.submit}
            onClick={this.handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.links} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.links} href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {this.Copyright()}
      </Box>
    </Container>
        );
    }
}
export default withStyles(styles)(Login);