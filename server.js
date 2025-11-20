const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World from Node.js, Docker, Jenkins & EC2!');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
