const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { getLatestMessage } = require('./users');

const mongoose = require('mongoose');
const registeredUsers = require('./models/registered-users');
const userMessages = require('./models/user-messages');

//Connect to Database
mongoose.connect('mongodb://localhost:27017/chat', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to DB');
});

//routes
router.get('/', (req, res) => {
    res.send('Server is up and running');
});


// Multer for storing photos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, getCurrentTime() + '_' + file.originalname)
    }
});

function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    return dateTime = date + '_' + time;
}
const upload = multer({ storage: storage });

data = fs.readFileSync('registeredUser.json');
users = JSON.parse(data);


// Register new User
router.post('/register', upload.single('displayPicture'), async (req, res) => {
    const user = new registeredUsers({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        image: req.file.filename,
        lastSeen: new Date(),
    });

    const userMSg = new userMessages({
        userName: req.body.userName,
        messages: []
    });

    try {
        const savedUser = await user.save();
        const savedUserMsg = await userMSg.save();
        res.json(savedUser, savedUserMsg);
    }
    catch (err) {
        res.json({ message: err });
    }

    // const index = users.find((user) => user.userName === req.body['userName']);
    // if (typeof index !== 'undefined') {
    //     res.send({ message: "User already exists", status: 'warning' });
    // }
    // else {
    //     let user = req.body;
    //     user['image'] = req.file['filename'];
    //     user['lastSeen'] = new Date();
    //     users.push(req.body);
    //     data = JSON.stringify(users, null, 2);
    //     data = fs.writeFile('registeredUser.json', data, (err) => {
    //         if (err) res.send({ message: 'Cannot add the user', status: 'failed' })
    //         res.send({ message: "User Successfully added", status: 'success' });
    //     });
    // }

});

router.post('/login', (req, res) => {
    // fetch user and test password verification
    registeredUsers.findOne({ userName: req.body.userName }, function (err, user) {
        if (err || !user) return res.json(false);

        // test a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            res.json(isMatch);
        });

        // // test a failing password
        // user.comparePassword(req.body.password, function (err, isMatch) {
        //     if (err) throw err;
        //     console.log('123Password:', isMatch); // -&gt; 123Password: false
        //     res.json(isMatch);
        // });
    });
    // const index = users.find((user) => (user.userName === req.body['userName']) & (user.password === req.body['password']));
    // if (typeof index !== 'undefined') {
    //     res.send({ message: "Login Successfull", status: 'success' });
    // }
    // else {
    //     res.send({ message: "Invalid Credentials", status: 'failed' });
    // }
});

router.post('/userList', async (req, res) => {

    try {
        const users = await registeredUsers.find({ userName: { $ne: req.body['name'] } });
        // const users = await registeredUsers.find();
        res.json(users);
    }
    catch (err) {
        res.json({ message: err });
    }
    // filtered_users = users.filter((user) => user.userName !== req.body['name']);
    // res.send({ data: filtered_users, status: 'success' });
});
router.post('/userData', async (req, res) => {
    try {
        const userData = await registeredUsers.find({ userName: req.body['name'] });
        res.json(userData[0]);
    }
    catch (err) {
        res.json({ message: err });
    }
    // users.filter((user) => {
    //     if (user.userName === req.body['name']) {
    //         res.send({ data: user, status: 'success' });;
    //     }
    // });
});
router.post('/userLatestMessage', async (req, res) => {
    try {
        const users = await userMessages.find();

        let msg = [];
        users.forEach((chatter) => {
            u_msg = (chatter['messages'].filter(msg => {
                return msg.to == req.body['name'];
            }));
            msg.push(u_msg[(u_msg.length) - 1]);
        });
        res.json(msg);
    }
    catch (err) {
        // res.json({ message: err });
    }
    // msg = getLatestMessage(req.body['name']);
    // res.send({ data: msg, status: 'success' });
});
module.exports = router;