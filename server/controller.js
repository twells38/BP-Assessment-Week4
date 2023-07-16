let fortuneDB = [{
    textId: 1,
    text:'A good time to finish up old tasks.'
}, {
    textId: 2,
    text:'A lifetime of happiness lies ahead of you.'
}, {
    textId: 3,
    text:'A pleasant surprise is waiting for you.'
}, {
    textId: 4,
    text:'A smile is your personal welcome mat.'
}, {
    textId: 5,
    text:'All your hard work will soon pay off.'
}
]
let textId = 6
module.exports = {
    
    getRandom: (req, res) => {
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortuneDB.length);
        let randomFortune = fortuneDB[randomIndex].text;
        res.status(200).send(randomFortune);
    },
    
    addFortune: (req, res) => {
        const { text } = req.body
        const newObj = {
            textId,
            text
        }
        fortuneDB.push(newObj)
        res.status(200).send(fortuneDB)
        textId++
    },
    getAllFortune: (req, res) => {
        res.status(200).send(fortuneDB)
    },
    updateFortune: (req, res) => {
        const { id } = req.params;
        const { newFortuneInput } = req.query
        const indexOftext = fortuneDB.findIndex(fortune => fortune.textId === +id)
        if (indexOftext === -1) {
            res.status(400).send('Fortune not found')
            return
        }
        fortuneDB[indexOftext].text = newFortuneInput;
        res.status(200).send(fortuneDB)
    },
    deleteFortune: (req, res) => {
        const { id } = req.params
        // use id to compare with textId in order to get index of object that want to delete
        const indexOftext = fortuneDB.findIndex(fortune => fortune.textId === +id)
        if (indexOftext === -1) {
            res.status(400).send('Fortune not found')
        }
        //detete index of that object
        fortuneDB.splice(indexOftext, 1)
        res.status(200).send(fortuneDB)
    }
    
        
    

}