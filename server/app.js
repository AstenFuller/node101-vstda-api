const express = require('express');
const morgan = require('morgan');

var bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

let mockData = [{
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }];

app.get('/', (req, res) => {
    res.status(200).send({status: 'ok'});
});

app.get('/api/TodoItems', (req, res) => {
    { mockData ?
        res.status(200).send(mockData)
        :
        res.status(404).send('no todo list found')
    };
});

app.get('/api/TodoItems/:number', (req, res) => {
    { mockData[req.params.number] ? 
        res.status(200).send(mockData[req.params.number]) 
        : 
        res.status(404).send('no item found')
    };
});

app.post('/api/TodoItems/', (req, res) => {
   
})



module.exports = app;
