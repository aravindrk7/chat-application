const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

const router = require('./router');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(router);
app.use(express.static(__dirname + '/uploads'));

const server = http.createServer(app);
const io = socketIo(server);

const { addUser, removeUser, getUser, getAllUsers, storeUserMessages, getUserMessages } = require('./users');


data = fs.readFileSync('registeredUser.json');
users = JSON.parse(data);

io.on('connection', (socket) => {

    socket.on('join', (name, callback) => {
        const { error, user } = addUser({ id: socket.id, name });
        if (error) return callback(error);
        socket.join(name);

        users.forEach(user => {
            if (user.userName === name) {
                user['lastSeen'] = 'online';
                socket.broadcast.emit('userLastSeen', user);
            }
        });
        data = JSON.stringify(users, null, 2);
        data = fs.writeFile('registeredUser.json', data, (err) => { });
        callback();
    });

    socket.on('sendMessage', (targetData, callback) => {
        // console.log(targetData);
        storeUserMessages(targetData);
        io.to(targetData['to']).emit('message', targetData);
    });

    socket.on('getUserMessages', ({ from, to }, callback) => {
        let messages = getUserMessages({ from, to });
        // console.log(messages);
        io.to(from).emit('userMessages', messages);
    });

    socket.on('disconnect', function () {
        user_ = getUser(socket.id);
        if (user_) {
            name = user_['name'];
            users.forEach(user => {
                if (user.userName === name) {
                    user['lastSeen'] = new Date();
                    socket.broadcast.emit('userLastSeen', user);
                }
            });
            data = JSON.stringify(users, null, 2);
            data = fs.writeFile('registeredUser.json', data, (err) => { });
        }
    });

});

server.listen(port, () => { console.log('Server has started on port ' + port) });

