import React from 'react';
import ImageUploader from 'react-images-upload';
import constants from '../../lib/constants'
import axios from 'axios';
const fs = require('fs')

 
class EditPhotoLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            profile: {},
            buttons: [],
            images: [],
        };
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

    // getProfile(){
    //     return new Promise((resolve, reject) => {
    //         fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
    //             method: "GET",
    //             credentials: 'include',
    //             headers: {
    //             "Access-Control-Allow-Credentials": "true",
    //             "Content-type": "application/json; charset=UTF-8"
    //             }})
    //             .then(res => res.json())
    //             .then(
    //             (result) => {
    //                 console.log(result)
    //                 resolve(result)
    //             },
    //             (error) => {
    //                 reject('issue with getting resource')
    //             }
    //         )
    //     })
        
    // }

    // var a = new A;
    // a.img.data = fs.readFileSync(imgPath);
    // a.img.contentType = 'image/png';

    uploadImage(e) {
        if (window.confirm('Add photo to profile?')) {
            let imageFormObj = new FormData();
            imageFormObj.append("email", this.state.profile.email);
            imageFormObj.append("type", "photolib");
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e[0]);
            imageFormObj.append("image", e[0].path);
            console.log(e[0])
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

    render() {
        console.log(this.state.buttons)
        return (
            <div class='editphotolibrarydiv'>
                <span id='editphotolibraryheader'><h3>Update My Photos</h3></span>
                <ImageUploader
                    className='editphotolibrary'
                    name='My Album'
                    withIcon={false}
                    withPreview={false}
                    buttonText='Choose Images'
                    onChange={(e) => this.uploadImage(e)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                {/* {this.state.buttons} */}
                {/* </form> */}
            </div>
        );
    }
}

export default EditPhotoLibrary