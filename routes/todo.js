var express = require('express'),
  router = express.Router(),
  mysql = require('mysql');
  let con = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'sujit@577',
    database: 'users',
    insecureAuth : true
});

con.connect((err) => {
    if(err){
      console.log('Error connecting to Db',err);
      con.end((err) => {
    
        console.log("connection with mysql has been closed..")
      });
    }
    console.log('Connection established');
  });

  
  

/* GET todo page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'todo' });
});

/* Inserting the user records  */

router.post('/insertUser', function (req, res) {

    const author = { first_name: req.body.fname, last_name: req.body.lname };
    con.query('INSERT INTO authors SET ?', author, (err, result) => {
      if(err){
          res.send({sucess:0,message:err});
      }
      else{
        console.log('Last insert ID:', result.insertId);
        res.send({sucess:1,message:"user inserted sucessfully",id: result.insertId})
      }
    
      
    });
  


})


/*get Users */
router.get('/userRecords', function (req, res) {

    con.query('SELECT * FROM authors', (err,rows) => {
        if(err) 
        {
            res.send({success:0,message:err})
        }
        else
        {
        console.log(rows);
         res.send({success:1,data:rows,message:"Data received from Db:"})
        }
      
        
      });

})

/* update User Records*/
// router.get('/userRecords', function (req, res) {

//     res.send("getting the  user records");
  
//   })
// /* delete User Records*/
// router.get('/userRecords', function (req, res) {

//     res.send("getting the  user records");
  
//   })


module.exports = router;
