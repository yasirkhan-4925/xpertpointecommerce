import mongoose from 'mongoose'


const connect = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
           
        })
        
        console.log(`MongoDb connected: ${conn.connection.host}`.blue.underline)

    }
    catch(err) {
        console.error(`Error: ${err.message}`.red.underline)
    }

}

export default connect;