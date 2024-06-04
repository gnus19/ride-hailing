const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const authEnpoints = require("./routes/auth");
const ridesEndpoints = require("./routes/rides");
const verifyToken = require('./middlewares/authMiddleware');


const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URL, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    authSource: process.env.MONGODB_AUTH_SOURCE,
})
  .then(() => console.log('Connected to DB!'))
  .catch((e) => {
    console.log('[ERROR]: Error connecting to DB', process.env.MONGODB_URL);
    console.log(e);
});

app.use(express.json());
app.use(cors());
app.use("/api/auth", authEnpoints);
app.use("/api/rides", verifyToken, ridesEndpoints);

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log(`Server is Successfully Running, and App is listening on port ${PORT}`); 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 