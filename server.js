var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db1 = mongojs('menuliststarters', ['menuliststarters']);
var db = mongojs('maincourse', ['maincourse']);
var dbsizzlers = mongojs('sizzlers', ['sizzlers']); 
var dbbread = mongojs('bread', ['bread']); 
var dbdrinks = mongojs('drinks', ['drinks']);
var dbdeserts = mongojs('deserts', ['deserts']);
var dbtable1 = mongojs('table1Order', ['table1Order']);
var dbtable2 = mongojs('table2Order', ['table2Order']);
var dbtable3 = mongojs('table3Order', ['table3Order']);
var dbtable4 = mongojs('table4Order', ['table4Order']);
var dbtable5 = mongojs('table5Order', ['table5Order']);
var dbtable6 = mongojs('table6Order', ['table6Order']);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded();
var ObjectId = mongojs.ObjectId;

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/css'));
app.use(bodyParser.json());
app.get('/menuitem', function(req, res){
   console.log("I receieved a request");
   
    db1.menuliststarters.find({}).toArray(function(err, docs){
     
        if(err){
            console.log('error from mongo', err);
            res.send('error retrieving data');
             }
            else{
                console.log('docs from mongodb', docs);
                res.json(docs); 
                console.log("returned data");
            }
       
    });
    
});
app.get('/maincourse', function(req, res){
   console.log("I receieved a request for maincourse");
   
    db.maincourse.find({}).toArray(function(err, docs){
     
        if(err){
            console.log('error from mongo', err);
            res.send('error retrieving data');
             }
            else{
                console.log('docs from mongodb', docs);
                res.json(docs); 
                console.log("returned data");
            }
       
    });
    
});
app.get('/sizzlers', function(req, res) {
    dbsizzlers.sizzlers.find({}).toArray(function(err, docs){
        if(err) {
            res.send('error retriving data');
        }else {
            res.json(docs);
        }
    });
})
app.get('/bread', function(req, res){
    dbbread.bread.find({}).toArray(function(err, docs){
        if(err){
            res.send('error retriving data');
        }else {
            res.json(docs);
        }
    });
})
app.get('/drinks', function(req, res){
   dbdrinks.drinks.find({}).toArray(function(err, docs){
        if(err){
            res.send('error retriving data');
        }else {
            res.json(docs);
        }
    });
})
app.get('/deserts', function(req, res){
   dbdeserts.deserts.find({}).toArray(function(err, docs){
        if(err){
            res.send('error retriving data');
        }else {
            res.json(docs);
        }
    });
})
app.get('/kitchen1', function(req, res){
   dbconfirmedorder.confirmedorder.find({}).toArray(function(err, docs){
        if(err) {
            res.send('error retriving data');
        } else {
       
    res.json(docs);
            }
    })
          
    });

app.post('/customerview/1',function(req, res){
    
   
    
  dbtable1.table1Order.insert(req.body, function(err, docs){

        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table1Order");
        }
  
})
});

// posting table 2 order to monog database
app.post('/customerview/2', function(req, res){
    dbtable2.table2Order.insert(req.body, function(err, docs){
        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table2Order");
        }
    })
});

// posting table 3 order to monog database
app.post('/customerview/table3', function(req, res){
    dbtable3.table3Order.insert(req.body, function(err, docs){
        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table3Order");
        }
    })
});

// posting table 4 order to monog database
app.post('/customerview/table4', function(req, res){
    dbtable4.table4Order.insert(req.body, function(err, docs){
        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table4Order");
        }
    })
});

// posting table 5 order to monog database
app.post('/customerview/table5', function(req, res){
    dbtable5.table5Order.insert(req.body, function(err, docs){
        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table5Order");
        }
    })
});

// posting table 6 order to monog database
app.post('/customerview/table6', function(req, res){
    dbtable6.table6Order.insert(req.body, function(err, docs){
        if(err) {
            console.log("Error posting data");
        } else {
            console.log(" I am posting to table6Order");
        }
    })
});
 
/*
// retrieving table 2 order to kitchen view
app.get('/kitchen/:tableName', function(req, res){
    var tableName = req.params.tableName;
    console.log("I am sending a request to table2")
    dbtable2[tableName + 'Order'].find({}).toArray(function(err, docs){
        if(err){
            console.log("Error retrieving data");
        } else {
            res.json(docs);
        }
    })
}); 
// retrieving table 3 order to kitchen view
app.get('/kitchen/:tableName', function(req, res){
    console.log("I am sending a request to table3")
    var tableName = req.params.tableName;
    dbtable3[tableName + 'Order'].find({}).toArray(function(err, docs){
        if(err){
            console.log("Error retrieving data");
        } else {
            res.json(docs);
        }
    })
}); */

app.get('/kitchenview/table1', function(req, res){
    dbtable1.table1Order.find({}).toArray(function(err, docs){
        if(err) {
            console.log("Error retrieving data");
        } else {
            res.json(docs);
        }
    })
})

app.listen(3000);
console.log("server running on port 3000");