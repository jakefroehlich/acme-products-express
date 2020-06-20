const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const writeFileP = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                return reject(err)
            }
            else {
                resolve();
            }
        })
    })
}

const readFileP = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err,data) => {
            if (err) {
                return reject(err)
            }
            else {
                let results;
                try {
                    results = JSON.parse(data.toString())
                }
                catch(ex){
                    return reject(ex);
                }
                resolve(results);
            }
        })
    })
}

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/api/products', (req, res) => {
    readFileP('./data.json')
        .then(data => {
            res.send(data)
        })
})

app.post('/api/products', async (req, res) => {

    readFileP('./data.json')
        .then(result => {
            result.push(req.body)
            console.log('stringify', JSON.stringify(result))
            fs.writeFile('./data.json', JSON.stringify(result), () => {})})
        .then(result => res.send(result))
        .catch((e) => console.log(e))
        
})

app.delete('/api/products/:id', (req, res) => {
    readFileP('./data.json')
        .then(result => {
            
        })
})

app.listen(PORT);