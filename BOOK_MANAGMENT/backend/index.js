import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()


// database connection   routes also here!!!!
 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"201299",
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hellow this is the backend")
})


//for get

app.get("/book",(req , res)=>
{
    const q = " SELECT * FROM BOOK "
    db.query(q,(err,data)=>{
        if (err)return res.json(err)
        return res.json(data)
    })
})


//for insert
app.post("/book",(req,res )=>{
    const q = " INSERT INTO book (`name`,`desc`,`cover`,`author`,`price`,`type_book`,`gener_book`,`pages`,`publication`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.desc,
        req.body.cover,
        req.body.author,
        req.body.price,
        req.body.type_book,
        req.body.gener_book,
        req.body.pages,
        req.body.publication,
        


    ];
     
    db.query(q,[values],(err,data)=>{
        if (err)return res.json(err)
        return res.json(data)
    })
})

//for delete
app.delete("/book/:id",(req,res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id=?";

    db.query(q,[bookId],(err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been delete  successfully");
    })
})





    app.get("/userdetails/:id", (req, res) => {
        const id = req.params.id;
        db.query("SELECT * FROM book WHERE id = ?", id, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      });

      app.put("/userss/:id", (req, res) => {
        const userId = req.params.id;
        const q = "UPDATE book SET `name`= ?, `desc`= ?, `cover`= ?, `author`= ?, `price`= ?,`type_book`=?,`gener_book`=?,`pages`=?,`publication`=? WHERE id = ?";
        const values = [
            req.body.name,
            req.body.desc,
            req.body.cover,
            req.body.author,
            req.body.price,          
            req.body.type_book,
            req.body.gener_book,
            req.body.pages,
            req.body.publication,
        ];
    
        db.query(q, [...values, userId], (err, data) => {
            if (err) {
                console.error("Error updating book:", err);
                return res.status(500).json({ error: "Internal Server Error", details: err });
            }
    
            console.log("Update successful. Rows affected:", data.affectedRows);
            return res.json(data);
        });
    });
    
    

      
app.get("/view/:id", (req, res) => {
    const sql = "SELECT * FROM BOOK WHERE ID=?";
    const id = req.params.id;
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.json({ Message: "error inside server" });
      }
  
      if (result.length === 0) {
        return res.json({ Message: "No data found for the given ID" });
      }
  
      return res.json(result[0]); // Return the first row of the result
    });
  });


app.get("/user/:id",(req , res)=>
{
    const q = " SELECT * FROM user "
    db.query(q,(err,data)=>{
        if (err)return res.json(err)
        return res.json(data)
    })
})

app.post("/user", (req, res) => {
    const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES (?)";
    const values = [
    req.body.name,
    req.body.email,
    req.body.password
    ]
    db.query(sql, [values], (err, data) => {
    if(err) {
    return res.json("Error");
    }
    return res.json(data);
    })
    })

   
    


    app.post("/user", (req, res) => {
        const sql = "SELECT * FROM user WHERE `email`=? AND `password`= ?";
        db.query(sql, [req.body.email, req.body.password], (err, data) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
      
          if (data.length > 0) {
            return res.json("success");
          } else {
            return res.json("fail");
          }
        });
      });
      

// LOGIN & LOGOUT FUNCTION ....
        app.post('/users', (req, res) => {
          const { email, password } = req.body;
        
          db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (error, results) => {
            if (error) {
              console.error('Error executing MySQL query:', error);
              res.status(500).send('Internal Server Error');
            } else {
              if (results.length > 0) {
                res.json('success');
              } else {
                res.json('failure');
              }
            }
          });
        });



app.listen(8800,()=>{
    console.log("Connected to back end!")
})

