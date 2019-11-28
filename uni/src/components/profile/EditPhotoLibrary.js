import React from 'react';
import ImageUploader from 'react-images-upload';
import constants from '../../lib/constants'


 
class EditPhotoLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: null, 
            profile: this.getProfile()
        };
        //  this.onDrop = this.onDrop.bind(this);
        console.log(this.state.profile)
    }

    // componentDidMount() {
    //     this.getProfile().then((result => {
    //         this.setState({
    //             profile: result,
    //             id: result.id
    //         })
    //     })).catch((error => {
    //         console.log(error)
    //         console.log("Edit photo library not getting profile")
    //     }))
    // }

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
                    resolve({
                        id: result
                    })
                },
                (error) => {
                    reject('issue with getting resource')
                }
            )
        })
        
    }

 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        console.log(this.state.id)
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