import mongoose from 'mongoose'


const connect = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
            
           
        })
        
        console.log(`MongoDb connected: ${conn.connection.host}`.blue.underline)

    }
    catch(err) {
        console.error(`Error: ${err.message}`.red.underline)
        process.exit(1);
    }

}

export default connect;