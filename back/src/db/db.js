
import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const mongo_uri = `mongodb+srv://mancillaandres7:4dPsn2zJdv1AHy4x@vela-novelas.icsaayy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongo_uri).then(() => {
    console.log('db is conecte');
}).catch((erro) => {
    console.error(erro)
})




