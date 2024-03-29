const express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const PORT  = process.env.PORT || 80

const app = express();

app.use(express.static(path.resolve(__dirname, 'client')))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})


app.use(cors(
    {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  ));

//Mongoose.connect('mongodb://localhost:27017/dslist?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => console.log('Connected to DB...')).catch(err => console.error(err));
Mongoose.connect('mongodb+srv://denperek:yakvut7@cluster0-as9x9.mongodb.net/dslist?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => console.log('Connected to DB...')).catch(err => console.error(err));


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));



const PersonModel = Mongoose.model("person", {
    department: String,
    fio: String,
    storageType: String,
    expirationDate: String
	});

app.post("/person", async (request, response, next) => {
	try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
        
	} catch (error) {
    	response.status(500).send(error); 
	}
});

// app.get("/", async (request, response, next) => {
//     try {
        
//         response.send("It Works! Use API to get info.");
//     } catch (error) {
//     	response.status(500).send(error); 
// 	}
// });

app.get("/people", async (request, response, next) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
    	response.status(500).send(error); 
	}
});

app.get("/person/:id", async (request, response, next) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
    	response.status(500).send(error); 
	}
});

app.put("/person/:id", async (request, response, next) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response, next) => {
    try {
        var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(PORT, () => {
	console.log('Listening at :80...');
});

