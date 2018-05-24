var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var UserModel = require('./model/userSchema');
var bookModel = require('./model/bookingSchema');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://heroku_5td1tzzv:k1pllddcpirfk35untl66qk6vk@ds143131.mlab.com:43131/heroku_5td1tzzv');
var app = express()
app.use(bodyParser.json())


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send('hi')
})
const authMiddleWare = (req, res, next) => {
    console.log("in here auth")
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({
        message: 'No token provided.'
    });

    jwt.verify(token, "abcd", function (err, decoded) {
        if (err) {
            return res.status(500).send({
                message: 'Failed to authenticate token.'
            });
            req.user = undefined
        }

        console.log(decoded);
        req.user = decoded.user
        next();
    })
}

app.post('/register', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password);
    UserModel.findOne({
        'email': req.body.email
    }, function (err, user) {
        if (user && user.email) {
            return res.status(409).json({
                'error': "email already exists"
            })
        } else {
            var user = UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });

            user.save((err, user) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(user)
                    console.log(" saved")

                    var token = jwt.sign({
                        user: user
                    }, "abcd", {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.json({
                        'jwt': token
                    })

                    // send jwt to react native
                }
            })


        }
    })


})

app.post('/booking/:alumni_name/:alumni_id', authMiddleWare, (req, res) => {
    console.log("+++++++++++++++++++++++++++")
    console.log(req.user)

    var book = bookModel({
        student_id: req.user._id,
        student_name: req.user.name,
        student_email: req.user.email,
        alumni_id: req.params.alumni_id,
        alumni_name: req.params.alumni_name,
        date: new Date(req.body.date),
        time_slot: req.body.time_slot
    });

    book.save((err, user) => {
        if (err) {
            console.log(err)
        } else {
            console.log(user)
            console.log("booking created")
            return res.status(200).json({
                'message': 'booking placed'
            })
            // send jwt to react native
        }
    })

})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password);
    UserModel.findOne({
        'email': req.body.email
    }, function (err, user) {
        if (user && user.email && (req.body.password === user.password)) {
            var token = jwt.sign({
                user: user
            }, "abcd", {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.json({
                'jwt': token
            })
        } else if (user && user.email) {
            return res.status(401).json({
                'error': 'user password is incorrect'
            })
        } else {
            return res.status(404).json({
                'error': 'user not found'
            })
        }
    })


})

app.get('/alumnus', authMiddleWare, (req, res) => {

    UserModel.find({
        role: 'alumni'
    }, 'name email', function (err, users) {
        return res.status(200).json(users)
    })

})

app.get('/alumnus/:alumni_id/:date', authMiddleWare, (req, res) => {

    bookModel.findOne({
        'alumni_id': req.params.alumni_id,
        'date': new Date(req.params.date),
        'booking_status': 'pending'
    }, function (err, bookings) {
        return res.status(200).json(bookings)
    })

})

app.get('/booking/delete/:id', authMiddleWare, (req, res) => {

    bookModel.remove({
        '_id': req.params.id,
    }, function (err, bookings) {
        return res.status(200).json({
            'message':'Succesfully Deleted'
    })
    })
})

app.get('/booking/update/:id', authMiddleWare, (req, res) => {

    bookModel.update({
        '_id': req.params.id,
    },{ 'booking_status':'Accepted' }, function (err, bookings) {
        return res.status(200).json({
            'message':'Succesfully Updated'
    })
    })
})
app.get('/alumnus/:alumni_id', authMiddleWare, (req, res) => {

    bookModel.find({
        'alumni_id': req.params.alumni_id,
        'booking_status': 'pending'
    }, function (err, bookings) {
        return res.status(200).json(bookings)
    })

})

app.listen(process.env.PORT)