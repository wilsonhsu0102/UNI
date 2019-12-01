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
import {Modal} from "react-bootstrap"
import {FormGroup, FormControl} from "react-bootstrap";
import { SessionContext, removeSessionCookie, setSessionCookie, getSessionCookie } from "../session";
import  { Redirect } from 'react-router-dom'

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
    constructor(props){
      super(props)
      this.state = {
        username: '',
        password: '',
        show: false
      }
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
        const email = this.state.username
        const password = this.state.password
        if (email === '' || password === '') {
          alert('Please fill in all the fields')
          return
        }
        const opts = {
          email: email,
          password: password
        }
        fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/login', {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify(opts),
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then((result) => {
                    if (result.success) {
                      console.log('login successful')
                      setSessionCookie({ email: email });
                      //window.location.href='http://localhost:3000/home';
                      window.location.href= constants.HTTP + constants.HOST + constants.PORT + '/home'
                      window.location.href='http://uni-uoft.herokuapp.com/home';
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

    // saveUser(user){
    //   console.log('qweqwrqwr123')
    //   return new Promise((resolve, reject) => {
    //       fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/addUser', {
    //           method: "POST",
    //           credentials: 'include',
    //           body: JSON.stringify(user),
    //           headers: {
    //           "Access-Control-Allow-Credentials": "true",
    //           "Content-type": "application/json; charset=UTF-8"
    //           }})
    //           .then(res => { console.log(res); res.json().then( data => {
    //             console.log('wtf is in here ')
    //             console.log(data)
    //             resolve({
    //               user: data.user
    //             })
    //           })})
    //           .then(
    //               (result) => {
    //                   console.log("result: " + result)
    //                   resolve({
    //                     user: result
    //                   })
    //               },
    //               (error) => {
    //                   console.log("errror: " + error)
    //                   reject(error)
    //               }
    //           )
    //       })
    // }
        
    handleClose = () => {
      console.log('qwrqwrqwrq1')
      this.setState({show: false})
    }

    handleShow = () => {
      console.log('qwrqwrqwrq2')
      this.setState({show: true})
    }

    handleSave = () => {
      const name = document.querySelector("#user-name").value;
      let description =  document.querySelector("#user-description").value;
      const email = document.querySelector("#user-email").value;
      const password1 = document.querySelector('#user-password1').value;
      const password2 = document.querySelector('#user-password2').value;
      const age = document.querySelector('#user-age').value;
      const major = document.querySelector('#user-major').value;
      console.log('qwrqwrqwrq')
      if (name === '') {
          alert("Name cannot be empty")
          return
      } else if (email === '') {
          alert("Email cannot be empty")
          return
      } else if(password1 !== password2){
          alert("Passwords entered does not match")
          return
      } else if (age === '') {
        alert("Please enter your age")
        return
      } else if (major === '') {
        alert('Please enter your field of study')
        return
      }
      if (description === '') {
          description = '[ No Description ]'
      }
      const new_user = {
          name: name,
          email: email,
          description: description,
          password: password1,
          profilePicture: '',
          age: age,
          major: major,
          connections: [],
          pendingConnections: [],
          invitations: [],
          pendingInvitations: []
      }
      console.log(new_user)
      console.log(JSON.stringify(new_user))
      fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/addUser', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(new_user),
        headers: {
        "Access-Control-Allow-Credentials": "true",
        "Content-type": "application/json; charset=UTF-8"
        }})
        .then(res => { 
          res.json().then( data => {
            console.log('wtf is in here ')
            if (data.msg === 'Email in Use') {
              alert('This Email is already registered')
              return
            } else {
              console.log(data.user)
            }
          })
          .catch(err => {
            console.log('inner')
            console.error(err)
          })
        })
        .catch(err => {
          console.log('outter')
          console.error(err)
        })
      this.handleClose()
    }

    signUpModal = () => {
      const all_ages = []
      for(let i = 1; i < 101; i++) {
        all_ages.push(<option key={'option' + i}> {i} </option>)
      }
      return (
        <Modal className='edit-modal' show={this.state.show} onHide={this.handleClose} >
          <Modal.Header className='create-account-header'>
              <Modal.Title> Sign Up </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="create-account-body">
              <div className="create-account-input-col1">
                <span className='create-account-text'> Name </span>
                <FormGroup>
                    <FormControl
                        type="text"
                        id="user-name"
                        />
                </FormGroup>
              </div>
              <div  className="create-account-input-col2">
                <span className= 'create-account-text' > Email </span>
                <FormGroup>
                    <FormControl
                        type="text"
                        id="user-email"
                    />
                </FormGroup>
              </div>
              <div className="create-account-input-col1">
                <span className= 'create-account-text' > Password </span>
                <FormGroup>
                    <FormControl
                        type="text"
                        id="user-password1"
                    />
                </FormGroup>
              </div>
              <div className="create-account-input-col2">
                <span className= 'create-account-text' > Confirm Password </span>
                <FormGroup>
                    <FormControl
                        type="text"
                        id="user-password2"
                    />
                </FormGroup>
              </div>
              <div className="create-account-input-col1">
                <span className= 'create-account-text' > Age </span>
                <FormGroup>
                    <FormControl
                        as='select'
                        type="text"
                        id="user-age"
                    >
                      {all_ages}
                    </FormControl>
                </FormGroup>
              </div>
              <div className="create-account-input-col2">
                <span className= 'create-account-text' > Field of Study </span>
                <FormGroup>
                    <FormControl
                        type="text"
                        id="user-major"
                    />
                </FormGroup>
              </div>
              <div className="create-account-input-description">
                <span className= 'create-account-text' > Self-Intro </span>
                <FormGroup>
                    <FormControl
                        as='textarea'
                        rows='2'
                        type="text"
                        id="user-description"
                    />
                </FormGroup>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
              <button className='modalBtn' onClick={this.handleClose}>
              Close
              </button>
              <button className='modalBtn' onClick={this.handleSave}>
              Submit
              </button>
          </Modal.Footer>
        </Modal>
      );
    }

   
    render() {
        removeSessionCookie()
        // console.log(getSessionCookie())
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
                      <button id='styled-like-link' href='GAYY' onClick={this.handleShow}>
                        Don't have an account? Sign Up
                      </button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              {this.signUpModal()}
              <Box mt={8}>
                {this.Copyright()}
              </Box>
            </Container>
        );
    }
}
export default withStyles(styles)(Login);