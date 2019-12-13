const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello there!!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      IP Address: ${req.ip}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name, dummy!');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
});
  
app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    let answer = parseFloat(a) + parseFloat(b);
    let response = `The sum of A and B is ${answer}`;
    res.status(200).send(response);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseFloat(req.query.shift);

    let cipher = text.split('');

    let newArr = cipher.map(char => {
        let current = char.charCodeAt(0);
        let updated = current + shift;
        return String.fromCharCode(updated);
    });

    res.status(200).send(newArr.join(''));
});

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;
    let winningNumbers = [];
    let score = 0;
    for (let i=0; i<6; i++) {
        let randomNumber = Math.ceil(Math.random()*20).toString();
        winningNumbers.push(randomNumber);
    }
    

    for (let i=0; i<6; i++) {
        if (winningNumbers.includes(numbers[i])) {
            score += 1;
        }
    }
    const feedback = [
        'Sorry, you lose',
        'Sorry, you lose',
        'Sorry, you lose',
        'Sorry, you lose',
        'Congratulations, you win a free ticket',
        'Congratulations! You win $100!',
        'Wow! Unbelievable! You could have won the mega millions!'
    ];
    console.log(numbers);
    console.log(winningNumbers);
    console.log(score);
    res.send(feedback[score]);
})