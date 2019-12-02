import React from 'react';
import constants from '../../lib/constants'
import axios from 'axios'; 
 
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
 
    handleChange(event, field) {
        switch(field) {
            case "intro":
                this.setState({intro: event.target.intro})
                break;
            case "year":
                this.setState({year: parseInt(event.target.year)})
                break;
            case "major":
                this.setState({major: event.target.major})
                break;
            case "campus":
                this.setState({campus: event.target.campus})
                break;
            default:
                break;    
        }
    }

    handleSubmit(event) {

        alert('Information has been saved.');
        event.preventDefault();
    }

    render() {
        return ([
            <div id="profileinputdiv"> 
                <form  onSubmit={this.handleSubmit}>
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
                </form>

            </div>
        ]);
    }
}

export default EditProfileInfo