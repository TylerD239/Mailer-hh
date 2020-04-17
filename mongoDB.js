const mongoose = require('mongoose')

async function start() {
    try {
        await mongoose.connect(config.get('db_uri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })



    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}
