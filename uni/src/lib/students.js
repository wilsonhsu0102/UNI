/* A Basic Node JSON api */
import connectionData from '../data/dummyData'
import constants from '../lib/constants'

// DON'T USE THIS FILE
// WILL BE DELETED LATER
//
//
//
//
function requestUsers(){
    return new Promise((resolve, reject) => {
        fetch(constants.HTTP + constants.HOST + constants.PORT + '/eventList/all', {
            method: "GET",
            headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
            }})
            .then(res => res.json())
            .then(
                
            (result) => {
                resolve({
                    users: result
                })
            },
            (error) => {
                reject('issue with getting resource')
            }
        )
    })
}

function getUsers(){
    requestUsers.then((result) => {
        return result.users
    }).catch((error) => {
        console.log(error)  // handle any rejects that come up in the chain.
        return []
    })
}



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

