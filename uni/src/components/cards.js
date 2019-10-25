
import React, {Component} from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import ProfilePic from '../images/stock.jpg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';

class Cards extends Component {
  render() {
 
    return (
        <Flippy
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ width: '400px', height: '600px' , margin: "0 auto"}} /// these are optional style, it is not necessary
      >
        <FrontSide
          style={{
            backgroundColor: '#f1f1f1',
            position: 'relative'
          }}
        >
          <img src={ProfilePic} class='cardProfile'></img>
          <FavoriteIcon style={{ position: 'absolute', bottom: '40px', right: '30px', fontSize: '60px', color: 'red'}}></FavoriteIcon>
          </FrontSide>
        <BackSide
          style={{ backgroundColor: '#f3acc9', color: 'white'}}>
          <h1>Mr. Clean</h1>
          <h2>Age: 20</h2>
          <h3>Program: Computer Science</h3>
          <br></br>
          <p>I'm mr. clean and I am a fourth year computer science major, minoring in cleaning services. In my free time I like to wash toilets and from time to time I'll film some commercials. Since this is my final year, I really want to make some friends and make this final year the best one.</p>
        </BackSide>
      </Flippy>
    );
  }

}
export default Cards;