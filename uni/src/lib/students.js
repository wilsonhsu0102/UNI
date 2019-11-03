/* A Basic Node JSON api */
import connectionData from '../data/dummyData'

const log = console.log

// Adding a student
export function updateNewConnection(student) {
    
    console.log("updating with student...", connectionData.connections)
    connectionData.connections.push(student)
    const index = connectionData.students.indexOf(student)
    connectionData.students.splice(index, 1)
    console.log("new connection", connectionData)
}



// Getting all students from the JSON file
export function getUnconnectedStudents(){
    console.log("getUnconnectedStudents", connectionData.students)
	return connectionData.students
}

export function getConnectedStudents(){
    console.log("connectedStudents", connectionData.connections)
	return connectionData.connections
}

