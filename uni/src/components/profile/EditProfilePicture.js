import React from 'react';
import ImageUploader from 'react-images-upload';
import constants from '../../lib/constants'
import axios from 'axios'; 

 
class EditProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            profile: {},
            buttons: [],
            images: [],
        };
        // this.onDrop = this.onDrop.bind(this);
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, {withCredentials: true})
        .then(res => {
            this.setState({
                images: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            // console.log(this.state.images[0].imageData.path)
        })
    }

    componentDidMount() {
        this.getProfile().then((result => {
            this.setState({
                profile: result,
                buttons: this.setupButtons(result.pictures.photolib),
            })
            console.log(this.state.profile);
            console.log(this.state.profile.email)
            console.log(this.state.images)
        })).catch((error => {
            console.log(error)
            console.log("ERROR Edit photo library not getting profile")
        }))
    }

    uploadImage(e) {
        if (window.confirm('Add photo to profile?')) {
            let imageFormObj = new FormData();
            imageFormObj.append("email", this.state.profile.email);
            imageFormObj.append("type", "profilepic");
            console.log(imageFormObj.email)
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            console.log(e[0])
            imageFormObj.append("imageData", e[0]);
            console.log(imageFormObj)
            axios.post(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, imageFormObj)
                .then((data) => {
                    if (data.data.sucesss) {
                        alert("Image has been successfully uploaded")
                    }
                })
                .catch((err) => {
                    alert("Error while uploading image");
                    console.error(err)
                })
        }
    }

     getProfile(){
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
                method: "GET",
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then(
                (result) => {
                    console.log(result)
                    resolve(result)
                },
                (error) => {
                    reject('issue with getting resource')
                }
            )
        })
        
    }
 
    render() {
        return (
            <div class='editprofilepicturediv'>
                <img id='editcurrentprofilepic' src={this.state.profile.profilePicture} alt='Me'/>
                <span id='editprofilepictureheader'><h3>Change My Profile Picture</h3></span>
                <ImageUploader
                    className='editprofilepicture'
                    name='Profile Picture'
                    withIcon={false}
                    withPreview={false}
                    buttonText='Choose Images'
                    onChange={(e) => this.uploadImage(e)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                />
            </div>
        );
    }
}

export default EditProfilePicture