const express = require('express');
const app = express();


const cors = require('cors')();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const pbkdf2Password = require('pbkdf2-password');
const hasher = pbkdf2Password();

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
  console.log('디비 연결 성공.');
});

app.use(cors);
app.use(bodyParser.json());

app.listen(4000,()=>{
  console.log('4000포트로 웹서버가 실행되었습니다.');
});


//=========== 로그인, 회원가입, 전화번호부 =======================

/* login */
app.post('/login',(req, res)=>{
  //API 문서
  //response { success : 1} -> 성공
  //  { success : -1} -> 아이디가 없다
  //  { success : -2} -> 비밀번호가 틀렸다

  connection.query(`SELECT * FROM users WHERE username="${req.body.username}"`,
  (err,rows)=>{
    (err) && console.log(err);

    if( rows.length > 0){
      hasher({password: req.body.userpass, salt: rows[0].salt}, (err, pass, salt, hash)=>{
        if(hash == rows[0].userpass){
          res.json({success : 1 , result : rows[0]});
        } else {
          res.json({success : -2 });
        }
      });
    } else {
        res.json({success : -1 });
    }

  });

});

/* register */
app.post('/register',(req,res)=>{
  //API 문서
  //response { success : 1} -> 성공
  //  { success : -1} -> 아이디 입력 x
  //  { success : -2} -> 비밀번호가 입력 x
  //  { success : -3} -> 아이디 중복


  if(req.body.username.length > 0 ){
    connection.query("SELECT * FROM users",
    (err,rows)=>{
      (err) && console.log(err);

      for(let i=0 ; i < rows.length ; i++){
        if(req.body.username == rows[i].username){
          res.json({success : -3 });
        }
      }

        if(req.body.userpass.length > 0){
          hasher({password: req.body.userpass}, (err, pass, salt, hash)=>{
            result = {
              username : req.body.username,
              userpass : hash,
              salt : salt
            };
            connection.query('INSERT INTO users SET ?', result ,
            (err,rows)=>{
              (err) && console.log(err);

              res.json({success : 1 })

            });
          });
        }else{
          res.json({success : -2 });
        }

    });


  }else{
    res.json({success : -1 });
  }

});


/*phone*/

//회원정보에 따른 전화번호부 정보 가져오기
app.get('/phone/:id',(req,res)=>{
  const { id } = req.params;

  connection.query(`SELECT * FROM phone WHERE user_id=${id}`,(err,rows)=>{
    (err) && console.log(err);

    res.json({success : 1 , result : rows});

  });
});


// 전화번호부 저장
app.post('/phone', (req,res)=>{
  //API 문서
  //response { success : 1} -> 성공
  //  { success : -1} -> 아이디와 전화번호가 같을 때

 let {name, number, id } = req.body;

 connection.query(`SELECT * FROM phone WHERE user_id="${id}"`,
 (err,rows)=>{
   (err) && console.log(err);

   for(let i=0 ; i < rows.length ; i++ ){
     if(name === rows[i].name && number === rows[i].number){
       res.json({success : -1});
       return;
     }
   }
   connection.query(`INSERT INTO phone (name, number, user_id) VALUES
   ("${name}", "${number}",${id} )`,(err,rows)=>{
     (err) && console.log(err);
     res.json({success : 1 });
   });

 });
});

//전화번호부 수정
app.put('/phone', (req,res)=>{
  connection.query('UPDATE phone SET name = ?, number = ? WHERE phone_id = ?',
    [req.body.name, req.body.number, req.body.id],
    (err, rows )=>{
      (err) && console.log(err);
      res.json({ success : 1 });
  });
});

//전화번호부 삭제
app.delete('/phone/:phone_id', (req,res)=>{
  connection.query(`DELETE FROM phone WHERE
    phone_id ="${req.params.phone_id}"`, (err, rows )=>{
  (err) && console.log(err);
    res.json({ success : 1, msg : '성공' });
  });
});
