const express = require('express');
var cors = require('cors');
const postgres = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

const AuthRoute = require('./routes/authRoute');


app.get('/', (req, res) => { res.json({ message: "welcome" }) })
app.use('/user', AuthRoute);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Sunucu port ${PORT} 'de çalışıyor.`);
    postgres.connect(err=>{
        if(err){
            console.log(err);
        }else{
            console.log("Postgresql'e başarıyla bağlanıldı.");
        }
    })
})