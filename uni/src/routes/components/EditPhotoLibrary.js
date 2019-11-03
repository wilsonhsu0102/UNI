import React from 'react';
import ImageUploader from 'react-images-upload';
 
class EditPhotoLibrary extends React.Component {
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
            <div class='editphotolibrarydiv'>
                <span id='editphotolibraryheader'><h3>Update My Photos</h3></span>
                <ImageUploader
                    className='editphotolibrary'
                    name='My Album'
                    withIcon={false}
                    withPreview={true}
                    buttonText='Choose Images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            </div>
        );
    }
}

export default EditPhotoLibrary