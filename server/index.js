const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.static('client'))
app.use(express.json());
app.use(cors());

const {
    getAllGamePosts,
    deleteGamePost, 
    createGamePost, 
    updateGamePost
} = require('./controller');

app.get(`/api/games`, getAllGamePosts)
app.delete(`/api/games/:id`, deleteGamePost)
app.post(`/api/games`, createGamePost)
app.put(`/api/games/:id`, updateGamePost)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})
app.get('/js', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/main.js'))
})
app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})

app.listen(5001, () => console.log(`running on 5001 `))