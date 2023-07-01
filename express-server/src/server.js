import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hey there!");
});

app.post('/hello', (req, res) => {
    console.log(req.body);
    res.send(`Hey ${req.body.name}!`);
});

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    console.log(name);
    res.send(`Hello ${name}!`);
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});