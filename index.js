const express = require('express');

const PORT= process.env.PORT || 3000;


// init app
const app = express();

// View engine
app.set('view engine', 'ejs');


// listen server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})