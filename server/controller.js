
const houses = require('./db.json')
let globalId = 4;

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req,res) => {
        const {id} = req.params;
        let index = houses.findIndex((elem) => elem.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req,res) => {
        const {id, address, price, imageURL} = req.body;

        let newHouse = {
            address,
            price: +price,
            imageURL,
            id: globalId
        }
        houses.push(newHouse)
        globalId++;
        res.status(200).send(houses)
    },
    updateHouse: (req,res) => {
        const {type} = req.body;
        let index = houses.findIndex((elem) => elem.id === +req.params.id)
        if(type === 'minus'  &&  houses[index].price > 0){
            houses[index].price -= 10000;
            res.status(200).send(houses)
        } else if(type  === 'plus' ){
            houses[index].price += 10000;
            res.status(200).send(houses)
        } else {
            res.status(400).send('knock it off, youre too poor you cant afford this house')
        }
    }
}