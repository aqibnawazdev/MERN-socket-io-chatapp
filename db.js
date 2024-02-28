const mongoose = require('mongoose')

const db_conn = async () => {

    try {
        const conn = await mongoose.connect(process.env.DB_CONN_STR)
        if (conn) {
            console.log("db connected...")
        }
    } catch (error) {
        console.log(error)

    }
}

module.exports = db_conn