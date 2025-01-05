const express = require('express');
const app = express();
app.get('/ho', (req, res) => {
    res.send("<h1>HEy</h1>");
})
app.listen(7800, () => {
    console.log(`server is running.`);
})