const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Conexion Exitosa!');

    }catch(error){
        console.log(error);
        trrow = new Error('Error a la hora de iniciar la base de datos');
    }

}


module.exports = {
    dbConnection
}