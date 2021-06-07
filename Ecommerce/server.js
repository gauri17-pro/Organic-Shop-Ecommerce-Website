const express = require('express');
const path = require('path');
const app = express();

const posts = require('./server/routes/posts');

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/posts', posts);

app.get('*', (req, res)=>{
    res.sendFile(process.cwd()+ '/dist/Ecommerce/index.html');
});

const port = process.env.PORT || 4600;

app.listen(4600, (req, res)=>{
    console.log(`RUNNING on port ${port}`);
});