const express = require('express');
const app = express();
const port =3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended: false}));
let student_records = [
    {
    id:"1",
    Name:"Vineetha",
    Course:"Msc. Financial Technology",
    Joining_date:"2020-09-10",
    },
    {
    id:"2",
    Name:"Bolanle",
    Course:"Msc Financial Technology",
    Joining_date:"2020-09-15",
    },
];
//get the student list in the form of JSON
app.get("/student_record",(req,res)=>{
    res.json(student_records);
});

//add student record to the list
app.post("/student_record",(req,res)=>{
    const student_record =req.body;
    console.log(student_record);
    student_records.push(student_record) ;
    res.send("Student record is added to the list!");
});
        
//search for a student_record in the list
app.get("/student_record/:id",(req,res)=> {
    const id = req.params.id;

    for(let student_record of student_records){
        if(student_record.id === id){
            res.json(student_record);
            console.log(student_record);
            return;
        }
    }
res.status(404).send("Student_record not found");
});

//remove student_record from the list
app.delete("/student_record/:id",(req,res)=>{
    const id = req.params.id;

    student_records= student_records.filter((student_record) => {
        if (student_record.id !== id) {
            return true;
        }
        return false;
    });

    res.send("Student record is deleted");
});
//set the server to listen at port
app.listen(port, () => {
    console.log(`Server listening at port :${port}`)
  })