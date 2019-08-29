const uid = require('./uid')
const express = require('express');
const _ = require('lodash');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ````fetchs from LinkWindow````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

app.post('/createRoomId', function (req, res) {
    let insertOne = new roomsModel({
        name: '',
        messages: ""
    });
    insertOne.save(function (err, insertOne) {
        var roomId = insertOne.id
        res.send({ roomId })
        // console.log(roomId)
        if (err) return console.error(err);
    });

});
app.post('/generateRoomId', function (req, res) {
    var rooms = mongoose.model('rooms', roomsSchema);
    rooms.findOne({ _id: req.body.passToken }, function (err, result) {
        if (result !== undefined) {
            usersModel.findOne({ name: req.body.userName }, function (err, results) {
                // console.log(results)
                if (results !== null) {
                    res.send({ error: "userTaken" })
                } else {
                    let insertOne = new usersModel({
                        name: req.body.userName,
                        rooms: req.body.passToken
                    })
                    insertOne.save(function (err, insertOne) {
                        if (err) return console.error(err);
                    });
                    res.send({ success: "roomFound,userInserted" })
                }
            })

        } else {
            res.send({ error: "roomNotFound" })
        }

    });
});




// ```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//connect mongoDB
const url = "mongodb://localhost:27017/newDb";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are connected!');
});

//Define a schema
const Schema = mongoose.Schema;
const roomsSchema = new Schema({
    userInRoom: Array
});


// create collection (model) with it's schema
const roomsModel = mongoose.model('rooms', roomsSchema);

// Create an instance of model SomeModel
var rooms_instance = new roomsModel({ userInRoom: '' });

// Save the new model instance, passing a callback
// rooms_instance.save(function (err) {
//     if (err) return handleError(err);
//     console.log('saved')
// });
// Define a schema
// const Schema = mongoose.Schema;
const usersSchenma = new Schema({
    name: String,
    uid: String,
    rooms: Array
});


// create collection (model) with it's schema
const usersModel = mongoose.model('Users', usersSchenma);

// Create an instance of model SomeModel
var users_instance = new usersModel({ name: '', rooms: "" });

// Save the new model instance, passing a callback
// users_instance.save(function (err) {
//     if (err) return handleError(err);
//     console.log('saved')
// });
//Define a schema
// const Schema = mongoose.Schema;
const messagesSchema = new Schema({
    name: String,
    message: String,
    date: Date,
    room: String
});


// create collection (model) with it's schema
const messagesModel = mongoose.model('messages', messagesSchema);

// Create an instance of model SomeModel
var messages_instance = new messagesModel({ name: 'awesome', message: "bla", date: new Date() });


let name

app.use(cors());

let roomsNamesObj = {};
let userRoomObj = {}

io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (room) {
        console.log('joining room', room);
        socket.join(room);
        userRoomObj[socket.id] = room


    })

    socket.on('name', nameObj => {
        socket.username = nameObj.name;
        if (roomsNamesObj.hasOwnProperty(nameObj.room)) {
            roomsNamesObj[nameObj.room].push(nameObj.name)
        } else {
            roomsNamesObj[nameObj.room] = [];
            roomsNamesObj[nameObj.room].push(nameObj.name)
        }

        console.dir(roomsNamesObj)
       
        try {
            io.in(nameObj.room).emit('name', roomsNamesObj[nameObj.room])
        } catch(err) {
        console.error(err)
        }
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        console.log(roomsNamesObj);
        
        var connectionMessage = socket.username + " Disconnected from Socket " + socket.id;
       
        let y = socket.username
       
        try {
            let roomOfUser = userRoomObj[socket.id];
            let indexOfUser = roomsNamesObj[roomOfUser].indexOf(socket.username);
            roomsNamesObj[roomOfUser].splice(indexOfUser, 1);
            console.log(roomsNamesObj)
            io.in(roomOfUser).emit('updateusers', roomsNamesObj[roomOfUser])
        } catch {

        }
        
    });




    socket.on('sendMessage', function (data) {
        // console.log('sending message', data);

        // save message to db
        let newMessage = new messagesModel({ name: data.name, message: data.message, date: new Date(), room: data.room });
        newMessage.save(function (err) {
            if (err) return handleError(err);
            console.log('saved')
        });

        io.in(data.room).emit('message', data);
    });
});

http.listen(4000, function () {
    console.log('listening on *:4000');
});


app.post('/messages/:room', (req, res) => {
    let name = req.body.name
    const roomZ = req.params.room;
    messagesModel.find({ room: roomZ }, (err, docs) => {

        if (err) throw err;

        res.send({ "messages": docs })
    }).sort({ 'date': -1 }).limit(20)
})















app.listen(port, () => console.log(`server listening on port ${port}!!!`))