
import React, {Component} from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CancelIcon from '@material-ui/icons/Cancel';
import path from 'path'
class Cards extends Component {

  render() {
    const { student, connectStudent, rejectStudent, show } = this.props
    
    let imageURL = student.profilePicture
    return (
        
        <Flippy
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ width: '400px', height: '600px' , margin: "0 auto", display: show}} /// these are optional style, it is not necessary
      >
          <div style={{ height: '30px' , width: '100vw'}}></div>
        <FrontSide
          style={{
            backgroundImage: `url(data:image/png;base64,${imageURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
        >

          <CancelIcon id="cancelButt" onClick={ 
            rejectStudent.bind(this, student)
          } style={{ position: 'absolute', bottom: '40px', left: '30px', fontSize: '60px', color: 'blue'}}></CancelIcon>
          <FavoriteIcon id="likeButt" onClick={ 
            connectStudent.bind(this, student)
          } style={{ position: 'absolute', bottom: '40px', right: '30px', fontSize: '60px', color: 'red'}}></FavoriteIcon>
        </FrontSide>
        <div style={{ height: '30px' , width: '100vw'}}></div>
        <BackSide
          style={{ backgroundColor: '#f3acc9', color: 'white'}}>
          <h1>{student.name}</h1>
          <h2>Age: {student.age}</h2>
          <h3>Program: {student.major}</h3>
          <br></br>
          <p>{student.description}</p>
        </BackSide>
        
      </Flippy>

      
    );
  }

}
export default Cards;