const mongoose = require('mongoose')


mongoose.connect(process.env.BASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("______Mongodb Atlas Connected_____");
}).catch(() => {
    console.log("_____Mdb Atlas Not Connected______");
})