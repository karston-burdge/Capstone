const games = require('./db.json')
let globalId = 12

module.exports = {
    getAllGamePosts: (req, res) => res.status(200).send(games),
    deleteGamePost: (req, res) => {
        let index = games.findIndex(elem => elem.id === +req.params.id)
        games.splice(index, 1)
        res.status(200).send(games)
    },
    createGamePost: (req, res) => {
        let { title, rating, review, imageURL } = req.body
        let newPost = {
            id: globalId,
            title, 
            rating,
            review,
            imageURL
        }
        games.push(newPost)
        res.status(200).send(post)
        globalId++
    },
    updateGamePost: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = games.findIndex(elem => +elem.id === +id)
        if (games[index].rating === 5 && type === 'plus') {
            console.log("here");
            res.status(400).send('cannot go above 5')
        } else if (games[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            games[index].rating++
            res.status(200).send(games)
        } else if (type === 'minus') {
            games[index].rating--
            res.status(200).send(games)
        } else {
            res.sendStatus(400)
        }
    }
}

console.log(module);