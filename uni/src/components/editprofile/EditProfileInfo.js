import React from 'react';
import constants from '../../lib/constants'
import axios from 'axios'; 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
class EditProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            intro: '',
            year: '',
            major: '',
            campus: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log("Loading info submission forms.")
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
			})
			console.log(this.state.account)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		
		})
    }
 
    // handleChange(event, field) {
    //     switch(field) {
    //         case "intro":
    //             this.setState({intro: event.target.intro})
    //             break;
    //         case "year":
    //             this.setState({year: event.target.year})
    //             break;
    //         case "major":
    //             this.setState({major: event.target.major})
    //             break;
    //         case "campus":
    //             this.setState({campus: event.target.campus})
    //             break;
    //         default:
    //             break;    
    //     }
    // }

    handleSubmit() {
        const description = document.querySelector("#selfintro").value;
        const major = document.querySelector("#major").value;
        const year = document.querySelector("#year").value;
        const campus = document.querySelector("#campus").value;
        if (description === '') {
            this.state.intro = this.state.account.description;
        } else {
            this.state.intro = description;
        }
        if (year === '') {
            this.state.year = this.state.account.year
        } else {
            this.state.year = year;
        }
        
        if (major === '') {
            this.state.major = this.state.account.major
        } else {
            this.state.major = major;
        }
        
        if (campus === '') {
            this.state.campus = this.state.account.campus
        } else {
            this.state.campus = campus;
        }

        // axios.post(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/updateAccountInfo`, {withCredentials: true},
        //     {body : {intro: this.state.intro, year: this.state.year, major: this.state.major, campus: this.state.campus} })
        // .then((data) => {
        //     if (data.data.sucesss) {
        //         alert("Info has been updated!")
        //     }
        // })
        // .catch((err) => {
        //     alert("Error while attempting to change info.");
        //     console.error(err)
        // })

        const opts = {intro: this.state.intro, year: this.state.year, major: this.state.major, campus: this.state.campus} 
          fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/updateAccountInfo', {
                  method: 'post',
                  credentials: 'include',
                  body: JSON.stringify(opts),
                  headers: {
                  "Access-Control-Allow-Credentials": "true",
                  "Content-type": "application/json; charset=UTF-8"
                  }})
                  .then(res => res.json())
                  .then((result) => {
                      if (result) {
                        alert('Information has been saved.')
                      } else {
                        alert('Information failed to save.')
                      }
                      
                  },
                  (error) => {
                      alert('Error occurred.')
                  }
              )
    }

    render() {
        return ([
            <div id="profileinputdiv"> 
                <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Major</Form.Label>
                            <Form.Control type="major" placeholder={this.state.account.major} id='major'/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Campus</Form.Label>
                            <Form.Control type="campus" placeholder={this.state.account.campus} id='campus'/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select" id='year'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>Other</option>
                            </Form.Control >
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Self Introduction</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder={this.state.account.description} id='selfintro'/>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                {/* <form  onSubmit={this.handleSubmit}>
                    <label>
                        <span class="inputdescriptor">Year: </span>
                        <input class="editlabel" placeholder={this.state.year} type="text" onChange={this.handleChange("year")} />
                    </label>
                    <br></br>
                    <label>
                    <span class="inputdescriptor">Major: </span> 
                        <input class="editlabel" placeholder={this.state.major} type="text" onChange={this.handleChange("major")} />
                    </label>
                    <br></br>
                    <label>
                    <span class="inputdescriptor">Campus: </span>
                        <input class="editlabel" type="text" placeholder={this.state.campus} onChange={this.handleChange("campus")} />
                    </label>
                    <br></br>
                    <label>
                    <span class="inputdescriptor">Self Introduction: </span>
                        <input class="editlabel" id="editintro" type="text" placeholder={this.state.intro} onChange={this.handleChange("intro")} />
                    </label>
                    <br></br>
                    <input class="inputdescriptor" id="submitbutton" type="submit" value="Submit" />
                </form> */}

            </div>
        ]);
    }
}

export default EditProfileInfo