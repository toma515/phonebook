const express = require('express');
const app = express();


const cors = require('cors')();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host : '####',
  port : '####',
  user : '####',
  password : '####',
  database : '####'
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


//=========== 로그인, 회원가입, 전화번호부 =======================

app.post('/login',(req, res)=>{
  // console.log(req.body);
  //API 문서
  //response { success : 1} -> 성공
  //  { success : -1} -> 아이디가 없다
  //  { success : -2} -> 비밀번호가 틀렸다

  connection.query(`SELECT * FROM users WHERE username="${req.body.username}"`,
  (err,rows)=>{
    if(err){
      console.log(err);
      return;
    }

    if( rows.length > 0){
      if(req.body.userpass == rows[0].userpass){
        res.json({success : 1 })
      } else {
        res.json({success : -2 })
      }
    } else {
        res.json({success : -1 })
    }
    console.log(rows);
  });

  // res.json({success : 1 });
});

app.post('/register',(req,res)=>{

    connection.query('INSERT INTO users SET ?', req.body ,
    (err,rows)=>{
      if(err){
        console.log(err);
        return;
      }

      res.json({success : 1 })


      console.log(rows);

    });
});

app.post('/save', (req,res)=>{
  // console.log(req.body);

  let name = req.body.phoneName;
  let number = req.body.phoneNumber;

  connection.query(`INSERT INTO phone (name, number) VALUES
  ("${name}", "${number}" )`,(err,rows)=>{
    (err) && console.log(err);
  });

  res.json({success : 1 });

});

app.post('/modify', (req,res)=>{
  console.log(req.body);

  connection.query('UPDATE phone SET name = ?, number = ? WHERE phone_id = ?',
    [req.body.name, req.body.number, req.body.phone_id],
    (err, rows )=>{
      (err) && console.log(err);
  });
  res.json({ data : req.body.name})

});

app.post('/delete', (req,res)=>{
  console.log(req.body);

  connection.query(`DELETE FROM phone WHERE
    phone_id ="${req.body.id}"`, (err, rows )=>{
  (err) && console.log(err);
  });

  res.json({ name : req.body.data});
});


app.get('/phone',(req,res)=>{

  connection.query("SELECT * FROM phone",(err,rows)=>{
    (err) && console.log(err);

    console.log(rows);
    res.json({success : 1 , result : rows});

  });
});
