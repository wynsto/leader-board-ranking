import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { v4 as uuid } from 'uuid';


const generateUserList = (num = 100) => {
    const users = []

    for (let i = 0; i < num; i++) {
        const username = uniqueNamesGenerator({ dictionaries: [names] }); // big_red_donkey
        const score = Math.round(Math.random() * 1000)
        const id = uuid()
        users.push({
            username, score, id
        })
    }
    return users
} 

export default generateUserList