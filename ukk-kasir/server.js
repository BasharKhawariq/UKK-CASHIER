/** load library express */
const express = require(`express`)
/** create object that instances of express */
const app = express()
/** define port of server */
const PORT = 8000
/** load library cors */
const cors = require(`cors`)
/** open CORS policy */
app.use(cors())
/** define all routes */
const userRoute = require(`./routes/user.route`)
const mejaRoute = require(`./routes/meja.route`)
const menuRoute = require(`./routes/menu.route`)
/** define prefix for each route */
app.use(`/user`, userRoute)
app.use(`/meja`, mejaRoute)
app.use(`/menu`, menuRoute)
/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of Bashar Cafe runs on port
    ${PORT}`)
    /** route to access uploaded file */
app.use(express.static(__dirname))

})
