import express from 'express';
import { db, connectToDb } from './db.js'; 

const app = express();
app.use(express.json());

/* GET ARTICLE INFO */
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

/* ARTICLE UPVOTES */
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }
    });
    
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist.');
    }
});

/* ADD COMMENT */
app.post('/api/articles/:name/comment', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text }}
    });

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist.');
    }
});


connectToDb(() => {
    console.log('Successfully connected to the database');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
});