/*import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
    host: "localhost", user: "root", password: "", database: "datamanagementproject"
});

//connection testing//
database.connect((err)=>{
    if(err) throw err;
    console.log("database connected successfully");
});

//fetch courses//
app.get("/api/courses",(request,result) =>{
    database.query("select * from course", (err,results) =>{
        if(err) return result.status(500).json(err);
        result.json(results);
    });
});

app.get("/api/course_work/:course_id", (request,result)=>{
    const courseID = request.params.course_id;
    //mysql query//
    const query = 
    `select cw.cw_title, cw.due_date, cw.grade
    from course_work cw, course c
    where cw.course_id = c.course_id and cw.cw_type = "assignment";
    `;
    database.query(query,[courseID],(err,results) =>{
        if(err) return result.status(500).json(err);
        result.json(results);
    });
});

//starting server//
app.listen(3000, ()=>{
    console.log("started running server on http://localhost:3000")
});*/
