const express = require('express');
const app = express();
const blogRoute = require('./routes/blog');
const sequelize = require('./utils/database');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.use('/blogs', blogRoute);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log("Listening on port 4000");
    });
}).catch(err => {
    console.log(err);
});
