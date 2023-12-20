const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {
    const query = req.query;
    if('person' in query) {
        const results = quotes.filter( x => x.person.toLowerCase() === query.person.toLowerCase());
        res.send({'quotes': results});
    } else {
        res.send({ 'quotes': quotes});
    }
})
app.get('/api/quotes/random', (req, res, next) => {
    const randomIdx = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIdx];
    res.send({'quote': quote});
})

app.post('/api/quotes', (req, res, next) => {
    const query = req.query;
    if('quote' in query && 'person' in query) {
        const quote = {
          'quote': query.quote,
          'person': query.person
        };
        quotes.push(quote);
        res.send({
            'quote': quotes[quotes.length - 1]
        })
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));