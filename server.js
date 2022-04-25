import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = path.dirname(__filename);

var app = express();
import { existsSync, readFileSync, writeFile } from 'fs';



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));


var exists = existsSync('public/UserFile.json');

/*#region user*/
function AllUser() {
    var exists = existsSync('/public/UserFile.json');
    if (exists) {
        var mydata = readFileSync('UserFile.json', 'utf8');
        userobj = JSON.parse(mydata);
    }
    return userobj;
}

function MaxUserID() {
    var userID = 0;
    var mydata = AllUser();
    userID = mydata.user[mydata.user.length - 1].UserId;
    return userID;
}

if (exists) {
    var mydata = readFileSync('public/UserFile.json', 'utf8');
    userobj = JSON.parse(mydata);
} else {
    console.log('Created new object')
    var userobj = { user: [] };
}

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/register.html'));
});

app.post('/register', NewUser);

function NewUser(req, res) {
    var reply;
    var response = {
        UserId: MaxUserID() + 1,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password,
        Role: req.body.UserRole
    }
    if (!response.FirstName || !response.LastName || !response.Phone || !response.Email ||
        !response.Username || !response.Password || !response.Role) {
        reply = {
            msg: "Please complete the form before you submit it"
        }
        res.send(reply);
        console.log(reply)

    } else {
        userobj.user.push({
            UserId: MaxUserID() + 1,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Username: req.body.Username,
            Password: req.body.Password,
            Role: req.body.UserRole
        });
        let data = JSON.stringify(userobj);
        writeFile('public/UserFile.json', data, finished);
        console.log('UserFile.JSON is updated')

        function finished(err) {
            reply = {
                UserId: MaxUserID(),
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Username: req.body.Username,
                Password: req.body.Password,
                Role: req.body.UserRole,
                status: "success",
                msg: "thank you"
            }
            res.sendFile(path.join(__dirname, '/signin.html'));
        }

    }

}

app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '/signin.html'));
});

var userloggedId = 0;
app.post('/signin', function(req, res) {
    var reply;
    var objectListUser = AllUser();
    let itemNumber = 0;
    for (let i = 0; i < objectListUser.user.length; i++) {
        if (objectListUser.user[i].Email == req.body.Email && objectListUser.user[i].Password == req.body.Password) {
            itemNumber = i;
            if (objectListUser.user[itemNumber].Role == "owner") {
                userloggedId = objectListUser.user[itemNumber].UserId;
                res.sendFile(path.join(__dirname, '/ownerList.html'));
                res.redirect('/ownerList?id=' + userloggedId + '');
            } else {
                res.sendFile(path.join(__dirname, '/userList.html'));
            }
        }
    }
});
/*#endregion*/


/*#region property*/
function AllProperty() {
    var exists = existsSync('/public/PropertyFile.json');
    if (exists) {

        console.log('loading property file');
        var mydata = readFileSync('PropertyFile.json', 'utf8');
        obj = JSON.parse(mydata);
    }
    return obj;
}

var exists = existsSync('public/PropertyFile.json');

if (exists) {

    console.log('loading property file');
    var mydata = readFileSync('public/PropertyFile.json', 'utf8');
    obj = JSON.parse(mydata);

} else {

    console.log('Created new object')
    var obj = { property: [] };
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/addproperty', function(req, res) {
    res.sendFile(path.join(__dirname, '/AddProperty.html'));
});

app.post('/addproperty', Newproperty);

function Newproperty(req, res) {
    var reply;
    var response = {
        Name: req.body.name,
        Type: req.body.PropertyType,
        AvaibilityDate: req.body.AvaibilityDate,
        Price: req.body.Price,
        Smoking: req.body.Smoking,
        PublicTransport: req.body.PublicTransport,
        Parking: req.body.Parking,
        TermLease: req.body.TermLease,
        Address: req.body.Address,
        Neighbourhood: req.body.Neighbourhood,
        NumberOfSeat: req.body.NumberOfSeat,
        SquareFeet: req.body.SquareFeet,
        UserId: req.body.UserId
    }
    if (!response.Name || !response.Type || !response.Price ||
        !response.Neighbourhood || !response.Address || !response.NumberOfSeat) {
        reply = {
            msg: "Please complete the form before you submit it"
        }
        res.send(reply);
        console.log(reply)
    } else {
        obj.property.push({
            Name: req.body.name,
            Type: req.body.PropertyType,
            AvaibilityDate: req.body.AvaibilityDate,
            Price: req.body.Price,
            Smoking: req.body.Smoking,
            PublicTransport: req.body.PublicTransport,
            Parking: req.body.Parking,
            TermLease: req.body.TermLease,
            Address: req.body.Address,
            Neighbourhood: req.body.Neighbourhood,
            NumberOfSeat: req.body.NumberOfSeat,
            SquareFeet: req.body.SquareFeet,
            UserId: req.body.UserId
        });
        let data = JSON.stringify(obj);
        writeFile('public/PropertyFile.json', data, finished);
        console.log('PropertyFile.JSON is updated')

        function finished(err) {
            reply = {
                Name: req.body.name,
                Type: req.body.PropertyType,
                AvaibilityDate: req.body.AvaibilityDate,
                Price: req.body.Price,
                Smoking: req.body.Smoking,
                PublicTransport: req.body.PublicTransport,
                Parking: req.body.Parking,
                TermLease: req.body.TermLease,
                Address: req.body.Address,
                Neighbourhood: req.body.Neighbourhood,
                NumberOfSeat: req.body.NumberOfSeat,
                SquareFeet: req.body.SquareFeet,
                UserId: req.body.UserId,
                status: "success",
                msg: "thank you"
            }

            res.redirect('/ownerList?id=' + req.body.UserId + '');
            console.log(reply);
        }
    }
}

app.get('/Mahya/:name', (req, res) => {

    var string = req.url.split(":");
    let itemName = string[1];
    var objectList = AllProperty();
    let itemNumber = 0;
    for (let i = 0; i < objectList.property.length; i++) {
        if (objectList.property[i].Name == itemName) {
            itemNumber = i;
        }
    }
    res.json({
        Name: objectList.property[itemNumber].Name,
        Type: objectList.property[itemNumber].Type,
        AvaibilityDate: objectList.property[itemNumber].AvaibilityDate,
        Price: objectList.property[itemNumber].Price,
        Smoking: objectList.property[itemNumber].Smoking,
        PublicTransport: objectList.property[itemNumber].PublicTransport,
        Parking: objectList.property[itemNumber].Parking,
        TermLease: objectList.property[itemNumber].TermLease,
        Address: objectList.property[itemNumber].Address,
        Neighbourhood: objectList.property[itemNumber].Neighbourhood,
        Seat: objectList.property[itemNumber].Seat,
        SquareFeet: objectList.property[itemNumber].SquareFeet,
        UserId: objectList.property[itemNumber].UserId,
    });

})

app.get('/OwnerList', (req, res) => {
    res.sendFile(path.join(__dirname, '/OwnerList.html'));
});


app.post("/:name", function(req, res) {
    res.sendFile(path.join(__dirname, '/OwnerPropertyDetail.html'));
})


app.get('/OwnerPropertyDetail/:name', (req, res) => {

    var string = req.url.split(":");
    let itemName = string[1];
    var objectList = AllProperty();
    let itemNumber = 0;
    for (let i = 0; i < objectList.property.length; i++) {
        if (objectList.property[i].Name == itemName) {
            itemNumber = i;
        }
    }

    res.json({
        Name: objectList.property[itemNumber].Name,
        Type: objectList.property[itemNumber].Type,
        AvaibilityDate: objectList.property[itemNumber].AvaibilityDate,
        Price: objectList.property[itemNumber].Price,
        Smoking: objectList.property[itemNumber].Smoking,
        PublicTransport: objectList.property[itemNumber].PublicTransport,
        Parking: objectList.property[itemNumber].Parking,
        TermLease: objectList.property[itemNumber].TermLease,
        Address: objectList.property[itemNumber].Address,
        Neighbourhood: objectList.property[itemNumber].Neighbourhood,
        NumberOfSeat: objectList.property[itemNumber].NumberOfSeat,
        SquareFeet: objectList.property[itemNumber].SquareFeet,
        Seat: objectList.property[itemNumber].Seat,
        UserId: objectList.property[itemNumber].UserId
    });

})


app.get('/userList', (req, res) => {
    res.sendFile(path.join(__dirname, '/userList.html'));
});


app.get("/:name", function(req, res) {
    res.sendFile(path.join(__dirname, '/propertyDetail.html'));
})


app.put('/OwnerPropertyDetail/:name', (req, res) => {
    var reply;
    var string = req.url.split(":");
    let itemName = string[1];
    var objectList1 = AllProperty();
    let itemNumber = 0;
    for (let i = 0; i < objectList1.property.length; i++) {
        if (objectList1.property[i].Name == itemName) {
            itemNumber = i;
        }
    }
    console.log(req.body);
    objectList1.property[itemNumber] = req.body;

    console.log("new" + objectList1.property[itemNumber]);
    res.json({ message: 'Updated ' });
    let data = JSON.stringify(objectList1);

    writeFile('public/PropertyFile.json', data, finished);
    console.log('PropertyFile.JSON is updated')

    function finished(err) {
        reply = {
            UserId: req.body.UserId,
            status: "success",
            msg: "thank you"
        }
        console.log(reply)
    }

})



app.delete('/OwnerPropertyDetail/:name', (req, res) => {
    var reply;
    var string = req.url.split(":");
    let itemName = string[1];
    var objectList1 = AllProperty();
    let itemNumber = 0;
    for (let i = 0; i < objectList1.property.length; i++) {
        if (objectList1.property[i].Name == itemName) {
            itemNumber = i;
        }
    }
    console.log(itemNumber);
    objectList1.property.splice(itemNumber, 1);
    // res.json(objectList1.property);

    res.json({ message: 'deleted ' });
    let data = JSON.stringify(objectList1);

    writeFile('public/PropertyFile.json', data, finished);
    console.log('PropertyFile.JSON is updated')

    function finished(err) {
        reply = {

            status: "success",
            msg: "thank you"
        }

        // res.send(reply);
        console.log(reply);
    }
    //res.sendFile(path.join(__dirname, '/OwnerList.html'));

})

app.use("/*", function(req, res) {
    res.send("404 page not found");
});

var server = app.listen(3004, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://localhost:3004")
})