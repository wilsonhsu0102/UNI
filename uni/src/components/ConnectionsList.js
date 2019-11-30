import React from 'react';
import { uid } from 'react-uid';
import AlignItemsList from './Connection'


/* Component for the List of Students */
class ConnectionsList extends React.Component {
    
    render() {
        const { students, selfId, selfName } = this.props
        console.log(selfId);
        return (
            <div>
                <div style={{height: "40px", width:"100vw"}}></div>
                <h2 style={{paddingLeft: "30px"}}>Your Connections:</h2>
                { students.map((student) => {
                return(
                    AlignItemsList(uid(student), student, selfId, selfName)
                )
                }) }
            </div>
        );
    }
}

export default ConnectionsList; 