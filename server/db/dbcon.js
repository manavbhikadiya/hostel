const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hostel", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connection Successful..."))
    .catch((err) => console.log("bhai aa to error aape chhe " + err));
    