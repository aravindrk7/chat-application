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
const mongoose = require('mongoose');
const registeredUsers = require('./models/registered-users');
const onlineUsers = require('./models/online-users');
const userMessages = require('./models/user-messages');


// data = fs.readFileSync('registeredUser.json');
// users = JSON.parse(data);

io.on('connection', (socket) => {

    socket.on('join', async (userName, callback) => {
        // const { error, user } = addUser({ id: socket.id, name });
        // if (error) return callback(error);
        const user = new onlineUsers({
            id: socket.id,
            userName: userName,
        });
        try {
            const savedUser = await user.save();
            socket.join(userName);
            // res.json(savedUser);
        }
        catch (err) {
            // res.json({ message: err });
        }

        try {
            const updatedUser = await registeredUsers.updateOne({ userName: userName }, { $set: { lastSeen: 'online' } });
            console.log(updatedUser);
            const latestUser = await registeredUsers.findOne({ userName: user.userName });
            socket.broadcast.emit('userLastSeen', latestUser);
        }
        catch (err) {
            console.log(err);
        }

        // users.forEach(user => {
        //     if (user.userName === name) {
        //         user['lastSeen'] = 'online';
        //         socket.broadcast.emit('userLastSeen', user);
        //     }
        // });

        // data = JSON.stringify(users, null, 2);
        // data = fs.writeFile('registeredUser.json', data, (err) => { });
        callback();
    });

    socket.on('sendMessage', async (targetData, callback) => {
        // storeUserMessages(targetData);
        try {
            const updatedUser = await userMessages.update(
                { userName: targetData.from },
                {
                    $push: {
                        messages: {
                            from: targetData.from,
                            to: targetData.to,
                            text: targetData.text,
                            image: targetData.image,
                            audio: targetData.audio,
                            type: targetData.type,
                            time: targetData.time
                        }
                    }
                }

            );
        }
        catch (err) {
            console.log(err);
            // res.json({ message: err });
        }
        // userMessages[from.trim().toLowerCase()].push({ from: from, to: to, text: text, image: image, audio: audio, type: type, time: time });
        io.to(targetData['to']).emit('message', targetData);
        io.to(targetData['from']).emit('message', targetData);
    });

    // socket.on('sendFile', (targetData, callback) => {
    //     storeUserMessages(targetData);
    //     io.to(targetData['to']).emit('message', targetData);
    // });

    socket.on('getUserMessages', async ({ from, to }, callback) => {
        try {
            const messages1 = await userMessages.findOne(
                // "userName": from,
                {
                    "messages.from": from,
                    "messages.to": to
                },
            );
            const messages2 = await userMessages.findOne(
                {
                    "messages.from": to,
                    "messages.to": from
                }
            );
            let messages = [];
            if (messages1) {
                if (messages2) {
                    messages = messages1['messages'].concat(messages2['messages']);
                }
                else {
                    messages = messages1['messages'];
                }
            }
            else {
                if (messages2) {
                    messages = messages2['messages'];
                }
            }
            messages.sort((a, b) => new Date(a.time) - new Date(b.time));
            io.to(from).emit('userMessages', messages);
        }
        catch (err) {
            // res.json({ message: err });
        }

        // messages.sort((a, b) => new Date(a.time) - new Date(b.time));
        // // let messages = getUserMessages({ from, to });
        // // console.log(messages);
        // io.to(from).emit('userMessages', messages);
    });

    socket.on('disconnect', async () => {
        console.log('deleted');
        try {

            const user = await onlineUsers.findOne({ id: socket.id });
            const deletedUser = await onlineUsers.deleteOne({ id: socket.id });
            // const user = await onlineUsers.find();
            // res.json(user);
            console.log("*****");
            console.log(user);
            console.log(deletedUser);
            console.log("*****");
            const updatedUser = await registeredUsers.updateOne({ userName: user.userName }, { $set: { lastSeen: new Date() } });
            console.log(updatedUser);
            const latestUser = await registeredUsers.findOne({ userName: user.userName });
            socket.broadcast.emit('userLastSeen', latestUser);
        }
        catch (err) {

            // res.json({ message: err });
        }

        // try {
        //     const updatedUser = await registeredUsers.updateOne({ id: req.params.id }, { $set: { lastSeen: new Date() } });
        //     // res.json(updatedUser);
        // }
        // catch (err) {
        //     // res.json({ message: err });
        // }

        // user_ = getUser(socket.id);
        // if (user_) {
        //     name = user_['name'];
        //     users.forEach(user => {
        //         if (user.userName === name) {
        //             user['lastSeen'] = new Date();
        //             socket.broadcast.emit('userLastSeen', user);
        //         }
        //     });
        //     data = JSON.stringify(users, null, 2);
        //     data = fs.writeFile('registeredUser.json', data, (err) => { });
        // }
    });

});

server.listen(port, () => { console.log('Server has started on port ' + port) });

