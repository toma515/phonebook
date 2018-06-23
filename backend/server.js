const express = require('express');
const app = express();


const cors = require('cors')();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : '3569rudtj',
  database : 'phonebook'
});

connection.connect((err)=>{
  if(err){
    console.log(err);
  }
  console.log('디비 연결이 잘 되었습니다.');
});

// connection.query("SELECT * FROM test",(err,rows)=>{
//   if(err){
//     console.log(err);
//   }
//   console.log(rows[0].number);
// });

app.use(cors);
app.use(bodyParser.json());

app.listen(4000,()=>{
  console.log('4000포트로 웹서버가 실행되었습니다.');
});

app.get('/test',(req,res)=>{
  // res.json({number : 10});
  // 디비 쿼리를 통해서 원하는 값을 보내준다.

  connection.query("SELECT * FROM test",(err,rows)=>{
    if(err){
      console.log(err);
    }
    // console.log(rows[0].number);
    console.log(rows);
    res.json({result : rows});

  });
});


app.post('/test',(req,res)=>{
  // console.log('a');
  // 데이터는 BODY를 통해서 넘어온다.
  console.log(req.body.num);

  // 디비에 insert 를 사용해서 데이터를 넣는다.
  /*connection.query('INSERT INTO test SET ?',{number : req.body.num},
  (err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log(rows);
  });*/

  connection.query('INSERT INTO test SET number="'+req.body.num +'"',
  (err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log(rows);
    connection.query("SELECT * FROM test",(err,rows)=>{
      if(err){
        console.log(err);
      }
      // console.log(rows[0].number);
      console.log(rows);
      res.json({message : '잘 받았어', result : rows});
    });
  });

  // res.json({message : '잘 받았어'});
});
