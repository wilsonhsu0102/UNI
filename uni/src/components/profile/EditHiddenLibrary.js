import React from 'react';
import ImageUploader from 'react-images-upload';
import constants from '../../lib/constants'
import axios from 'axios'; 

class EditHiddenLibrary extends React.Component {
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
            console.log(this.state.images[0].imageData.path)
        })
    }
    uploadImage(e) {
        if (window.confirm('Add photo to profile?')) {
            let imageFormObj = new FormData();
            imageFormObj.append("email", this.state.profile.email);
            imageFormObj.append("type", "hiddenlib");
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
 
    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }
 
    render() {
        return (
            <div class='edithiddenlibrarydiv'>
                <span id='edithiddenlibraryheader'><h3>Update My Interests</h3></span>
                <ImageUploader
                    className='edithiddenlibrary'
                    name='My Interests'
                    withIcon={false}
                    withPreview={false}
                    buttonText='Choose Images'
                    onChange={(e) => this.uploadImage(e)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            </div>
        );
    }
}

export default EditHiddenLibrary