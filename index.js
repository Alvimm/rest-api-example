import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Serj Tankian', age: 54 },
    { id: 2, name: 'Daron Malakian', age: 46 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Working with Express server.</h1>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find((user) => {
        return user.id === Number(userId);
    });
    return response.send(user);
});

app.post('/users', (request, response) => {
    const newUser = request.body;
    users.push(newUser);
    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map((user) => {
        if (Number(userId) === user.id) return updatedUser;
        return user;
    });
    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});
