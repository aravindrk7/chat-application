const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { getLatestMessage } = require('./users');

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

router.get('/', (req, res) => {
    res.send('Server is up and running');
});
router.post('/register', upload.single('displayPicture'), (req, res) => {
    const index = users.find((user) => user.userName === req.body['userName']);
    if (typeof index !== 'undefined') {
        res.send({ message: "User already exists", status: 'warning' });
    }
    else {
        let user = req.body;
        user['image'] = req.file['filename'];
        user['lastSeen'] = new Date();
        users.push(req.body);
        data = JSON.stringify(users, null, 2);
        data = fs.writeFile('registeredUser.json', data, (err) => {
            if (err) res.send({ message: 'Cannot add the user', status: 'failed' })
            res.send({ message: "User Successfully added", status: 'success' });
        });
    }

});

router.post('/login', (req, res) => {
    const index = users.find((user) => (user.userName === req.body['userName']) & (user.password === req.body['password']));
    if (typeof index !== 'undefined') {
        res.send({ message: "Login Successfull", status: 'success' });
    }
    else {
        res.send({ message: "Invalid Credentials", status: 'failed' });
    }
});

router.post('/userList', (req, res) => {
    filtered_users = users.filter((user) => user.userName !== req.body['name']);
    res.send({ data: filtered_users, status: 'success' });
});
router.post('/userData', (req, res) => {
    users.filter((user) => {
        if (user.userName === req.body['name']) {
            res.send({ data: user, status: 'success' });;
        }
    });
});
router.post('/userLatestMessage', (req, res) => {
    msg = getLatestMessage(req.body['name']);
    res.send({ data: msg, status: 'success' });
});
module.exports = router;