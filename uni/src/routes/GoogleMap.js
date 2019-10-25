import React from 'react';
import GoogleMapReact from 'google-map-react';

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.defaultMap = {
            center: {
              lat: 59.95,
              lng: 30.33
            },
            zoom: 11
          };
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key:AIzaSyD1ixD08kOHRT5tKUM7Q3dem0TKU908fzA}} // Dont do bad things with this please
                    defaultCenter={this.defaultMap.centre}
                    defaultZoom={this.defaultMap.zoom}>
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;