if(!process.env.NODE_ENV) {
  require('dotenv').config({path: ['.env']})
}
const express = require("express");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000
const RouteIndex = require('./src/routes/index')
const MiddlewareError = require('./src/middlewares/error')

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json({limit: "100mb"}))
app.get("/check-health", (_, res) => {
  res.status(200).json({ message: 'connect' });
});
app.use(RouteIndex)
app.use(MiddlewareError.error);

// Middleware 404 untuk semua route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).send('maintenance');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
