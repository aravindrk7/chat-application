const fs = require('fs');

let userMessages = {};
let usersOnline = [];

data = fs.readFileSync('registeredUser.json');
users = JSON.parse(data);

users.forEach(user => {
    userMessages[user['userName']] = []
});

const getLatestMessage = (user) => {
    let msg = [];
    Object.keys(userMessages).forEach((chatter) => {
        u_msg = (userMessages[chatter].filter(msg => {
            return msg.to == user;
        }));
        msg.push(u_msg[(u_msg.length) - 1]);
    });
    return msg;
};

const storeUserMessages = ({ from, to, text, image, audio, type, time }) => {
    userMessages[from.trim().toLowerCase()].push({ from: from, to: to, text: text, image: image, audio: audio, type: type, time: time });
};

const getUserMessages = ({ from, to }) => {
    let result1 = userMessages[from.trim().toLowerCase()].filter(obj => {
        return obj.to == to;
    });
    let result2 = userMessages[to.trim().toLowerCase()].filter(obj => {
        return obj.to == from;
    });
    let result = result1.concat(result2)
    result.sort((a, b) => new Date(a.time) - new Date(b.time));
    return result;
};

const addUser = ({ id, name }) => {
    name = name.trim().toLowerCase();
    const user = { id, name };
    usersOnline.push(user);
    return { user };
};
const removeUser = (id) => {
    const index = usersOnline.find((user) => { user.id === id });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => usersOnline.find((user) => user.id === id);
// const getAllUsers = () => users;


module.exports = { storeUserMessages, getUserMessages, getUser, removeUser, addUser, getLatestMessage };





