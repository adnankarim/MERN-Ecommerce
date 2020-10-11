const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
// import routes
require("dotenv").config({path:'./config.env'});
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// app
const app = express();
// COnfiguring Dotenv
require("dotenv").config({path:'./config.env'});


const port = process.env.PORT || 8000;



// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// DB
const DB = process.env.DATABASE_LOCAL;

if (process.env.NODE_ENV == "production"){
 const DB = process.env.MONGO_URI.replace('<PASSWORD>',process.env.PASSWORD);

}

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
