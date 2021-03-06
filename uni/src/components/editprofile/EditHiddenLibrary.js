import React from 'react';
import ImageUploader from 'react-images-upload';
import constants from '../../lib/constants'
import axios from 'axios'; 

class EditHiddenLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            account: {},
            images: [],
        };
    }

    componentDidMount() {
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
        })
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
            })
            console.log(res)
			console.log(this.state.account)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		
		})
    }


    uploadImage(e) {
        if (window.confirm('Add photo to interests?')) {
            let imageFormObj = new FormData();
            imageFormObj.append("email", this.state.account.email);
            imageFormObj.append("id", this.state.account._id);
            imageFormObj.append("type", "hiddenlib");
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e[0]);
            imageFormObj.append("image", e[0].path);
            axios.post(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, imageFormObj)
                .then((data) => {
                    if (data) {
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