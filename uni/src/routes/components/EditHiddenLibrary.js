import React from 'react';
import ImageUploader from 'react-images-upload';
 
class EditHiddenLibrary extends React.Component {
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
            <div class='edithiddenlibrarydiv'>
                <span id='edithiddenlibraryheader'><h3>Update My Interests</h3></span>
                <ImageUploader
                    className='edithiddenlibrary'
                    name='My Interests'
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

export default EditHiddenLibrary