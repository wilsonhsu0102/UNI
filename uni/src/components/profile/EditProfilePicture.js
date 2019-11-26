import React from 'react';
import ImageUploader from 'react-images-upload';
 
class EditProfilePicture extends React.Component {
    constructor(props) {
        super(props);

        // will retrieve photos from database 
        if (this.props.id !== "1") {
            this.state = { pictures: [require('../../images/profilepic.jpg')] };
        } else {
            this.state = { pictures: [require('../../images/coverPhoto1.jpg')] };
        }
        this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
            <div class='editprofilepicturediv'>
                <img id='editcurrentprofilepic' src={this.state.pictures[0]} alt='Me'/>
                <span id='editprofilepictureheader'><h3>Change My Profile Picture</h3></span>
                <ImageUploader
                    className='editprofilepicture'
                    name='Profile Picture'
                    withIcon={false}
                    withPreview={true}
                    buttonText='Choose Images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                />
            </div>
        );
    }
}

export default EditProfilePicture