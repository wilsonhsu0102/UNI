import React from 'react';
// import GoogleMapReact from 'google-map-react';

/* For our google map service later on */
// class GoogleMap extends React.Component {
//     constructor(props) {
//         super(props);
//         this.defaultMap = {
//             center: {
//               lat: 43.6629,
//               lng: -79.3957
//             },
//             zoom: 15
//           };
//     }

    

//     render() {
//         const Marker = (props) => {
//             const { name, id } = props;
//             return (
//               <div className="marker"
//                 title={name}
//               />
//             );
//           };
//         return (
//             <div style={{ height: '100%', width: '100%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key:'AIzaSyD1ixD08kOHRT5tKUM7Q3dem0TKU908fzA'}} // Dont do bad things with this please
//                     defaultCenter={this.defaultMap.center}
//                     defaultZoom={this.defaultMap.zoom}>
//                         <Marker
//                             lat={43.6629}
//                             lng={-79.3957}
//                             name="UC120"
//                         />
//                         {/* <Marker
//                             lat={43.665}
//                             lng={-79.39}
//                             name="My Marker"
//                             color="blue"
//                         /> */}
//                 </GoogleMapReact>
//             </div>
//         );
//     }
// }

class GoogleMapMock extends React.Component {
  render() {
    return <img src={require('../images/map.png')} alt="Google map of the location"/>
  }
}

export default GoogleMapMock;