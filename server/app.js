const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded());

app.use(express.json());

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
    res.status(200).send({status: 'ok', Use: 'Go to /api/TodoItems or /api/TodoItems/:number'});
});

app.get('/api/TodoItems', (req, res) => {
    { mockData ?
        res.status(200).send(mockData)
        :
        res.status(404).send('no todo list found')
    };
});

app.get('/api/TodoItems/:number', (req, res) => {
    let found = false;

    for(let i = 0; i < mockData.length; i++) {
        if(mockData[i].todoItemId == req.params.number) {
            res.status(200).send(mockData[i]);
            found = true;
        }
    }

    if(!found) {
        res.status(404).send('item not fount');
    }

});

app.post('/api/TodoItems/', (req, res) => {
    const todoItemId = req.body.todoItemId;
    const name = req.body.name;
    const priority = req.body.priority;
    const completed = req.body.completed;
    let found = false;

    for(let i = 0; i < mockData.length; i++) {
        if(mockData[i].todoItemId == todoItemId) {
            mockData[i].todoItemId = todoItemId;
            mockData[i].name = name;
            mockData[i].priority = priority;
            mockData[i].completed = completed;
            found = true;
            res.status(201).send(mockData[i]);
        }
    }

    if(!found) {
        mockData.push({
            todoItemId: todoItemId,
            name: name,
            priority: priority,
            completed: completed
        });
        res.status(201).send(mockData[mockData.length - 1]);
    }
});

app.delete('/api/TodoItems/:number', (req, res) => {
    let found = false;

    for(let i = 0; i< mockData.length; i++) {
        if(mockData[i].todoItemId == req.params.number) {
            res.status(200).send(mockData[i]);
            mockData.splice(i, i + 1);
            found = true;
        }
    }

    if(!found) {
        res.status(404).send('item not found');
    }
});



module.exports = app;
