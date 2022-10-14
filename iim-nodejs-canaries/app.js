var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const Show = require('./models/show');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { MongoKerberosError } = require('mongodb');

var app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://Zoe_test:canatest@cluster0.dfcbj.mongodb.net/canaries'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/add-show', (req, res) => {
    const show = new Show({
        title: 'Spider-Man | Into The Spider Verse',
        question: 'Comment s’appelle le personnage principale?',
        answer: 'Miles Morales'
    },
    {
        title: 'Interstellar',
        question: 'En quelle année est sorti Interstellar ?',
        answer: '2014'
    },
    {
        title: 'Inception',
        question: 'Quel est le nom de l’architecte ?',
        answer: 'Ariane'
    },
    {
        title: 'How I Met Your Mother',
        question: 'Dans quel circonstance Ted rencontre sa femme ?',
        answer: 'Mariage'
    },
    {
        title: 'The Big Bang Theory',
        question: 'Dans l’épisode ou Sheldon et Leonard range l’appartement de Penny, qu’écrit Leonard quand Penny vient se plaindre auprès de Sheldon ?',
        answer: 'Sarcasme'
    },
    );

    show.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/all-shows', (req, res) => {
    Show.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/single-show', (req, res) => {
    Show.findById('')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
