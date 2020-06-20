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
            console.log(data)
        })
})

app.listen(PORT);