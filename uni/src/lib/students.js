/* A Basic Node JSON api */
import connectionData from '../data/dummyData'


// Adding a student
export function updateNewConnection(student) {
    
    console.log("updating with student...", connectionData.accounts.connections)
    connectionData.accounts.connections.push(student)
    const index = connectionData.accounts.students.indexOf(student)
    connectionData.accounts.students.splice(index, 1)
    console.log("new connection", connectionData)
}



// Getting all students from the JSON file
export function getUnconnectedStudents(){
    console.log("getUnconnectedStudents", connectionData.accounts.students)
	return connectionData.accounts.students
}

export function getConnectedStudents(){
    console.log("connectedStudents", connectionData.accounts.connections)
	return connectionData.accounts.connections
}

