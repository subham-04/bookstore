import  Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express();

app.use(Express.json()) //it lets us use any json file to send over the internet
app.use(cors()); // it's let use the react app with the backend



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"subham",
    database:"testing"
})

app.get("/",(req,res)=>{
    res.json("hello")
})

app.get("/books",(req,res)=>{
    const q = "select * from books";
    db.query(q, (error, data)=>{
        if(error) throw error;
        console.log(data);
        res.json(data);
    })
})




app.post('/books' , (req , res)=>{

    const q = "insert into books (`title`, `desc`, `price`,`cover`) values (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values], (error, data)=>{
        if(error) throw error;
        res.json("book has been created successfully")
        console.log(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE from books where id = ?"

    db.query(q,[bookId],(error,data)=>{
        if(error) throw error;
        res.json("book has been deleted successfully")
        console.log(data);
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`=?, `price`=?, `cover` =? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[...values,bookId],(error,data)=>{
        if(error) throw error;
        res.json("book has been updated successfully")
        console.log(data);
    })
})

app.listen(8080, ()=>{
    console.log(`connected to backend on port 8080`);
})



