const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req,res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            { 
                email_address: email,
                status:  "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/6a04432913",
        method: "POST",
        headers: {
            "Authorization": "angela1 9ba4a99e032a9ceba5f3b2494e4a19f3-us4"
        },
        body: jsonData
    }
    
    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

});




app.listen(3000, () => {
    console.log('server is running on port 3000');
});

//Api Key
//9ba4a99e032a9ceba5f3b2494e4a19f3-us4

//list id
//6a04432913