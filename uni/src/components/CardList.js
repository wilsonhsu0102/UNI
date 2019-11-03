import React from 'react';
import { uid } from 'react-uid';
import Cards from './Card'


/* Component for the List of Students */
class CardList extends React.Component {
    
    render() {
        let cards = []
        const { students, connectStudent, rejectStudent } = this.props
        // Outer loop to create parent
        for (let i = 0; i < students.length; i++) {
            if (i === 0){
                cards.push(<Cards key={uid(students[i])} student={students[i]} connectStudent={connectStudent} rejectStudent={rejectStudent} show="block"></Cards>)
            } else {
                cards.push(<Cards key={uid(students[i])} student={students[i]} connectStudent={connectStudent} rejectStudent={rejectStudent} show="none"></Cards>)
            }
        }
        console.log("cards", cards)
        return (
            <div>
                {cards}
            </div>
        );
    }
}

export default CardList; 