save = ()=>{
let date = document.getElementById("date").value;
let time = document.getElementById("time").value;
let task = document.getElementById("task").value;
let divmessage = document.getElementById("divmessage");
divmessage.innerHTML = "";
if(date == "")
{
    divmessage.innerHTML = '<div class="alert alert-danger"><strong>Alert!</strong> Please select date'; 
    document.getElementById("date").focus();
    return;
}
if(time == "")
{
    divmessage.innerHTML = '<div class="alert alert-danger"><strong>Alert!</strong> Please select time'; 
    document.getElementById("time").focus();
    return;
}
if(task == "")
{
    divmessage.innerHTML = '<div class="alert alert-danger"><strong>Alert!</strong> Please enter task'; 
    document.getElementById("task").focus();
    return;
}

let tasks = new Array();
if(localStorage.getItem("tasks") != null)
{
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
let id = Number(document.getElementById("id").value);
if(id == 0)
{
//let mytask = {id :id, date:date, time:time, task:task};
//console.log(mytask);
//tasks.push(mytask);
tasks.forEach(task=>{
    if(task.id > id)
    id = task.id;
});
id = id + 1;
let mytask = {id :id, date:date, time:time, task:task};
tasks.push(mytask);
}
else
{
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == id)
        {
            tasks[i].date = date;
            tasks[i].time = time;
            tasks[i].task = task;
        }
    }
}
localStorage.setItem("tasks", JSON.stringify(tasks));
list();
//console.log(tasks);

}

list = ()=>{
    document.getElementById("id").value = "0";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("task").value = "";
    let mytable = document.getElementById("mytable");
    while(mytable.rows.length > 1)
    {
        mytable.deleteRow(1);
    }
    
    if(localStorage.getItem("tasks") != null)
    {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
   
    let count = 1;
    tasks.forEach(task => {
        let str ="<tr>";
        str += "<td>" + count + "</td>";
        str += "<td>" + task.date + "</td>";
        str += "<td>" + task.time + "</td>";
        str += "<td>" + task.task + "</td>";
        str += "<td><button onclick='edittask("+ task.id +")' class='btn btn-outline-primary'>Edit</button> ";
        str += "<button onclick='deletetask(" + task.id + ")' class='btn btn-outline-danger'>Delete</button></td>";
        str += "</tr>";
        mytable.innerHTML += str;
        count++;
    });
}
}
deletetask = (id)=>{
    if(confirm("Sure to delete?"))
    {
        let tasks = JSON.parse(localStorage.getItem("tasks"))
        let newarray = new Array();
        tasks.forEach(task =>{
            if(task.id != id)
            {
                newarray.push(task);
            }
    
        });
        localStorage.setItem("tasks", JSON.stringify(newarray));
        list();
    }
}
edittask = (id)=>{
    document.getElementById("id").value = id;
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task =>{
        if(task.id == id)
        {
            document.getElementById("date").value = task.date;
            document.getElementById("time").value = task.time;
            document.getElementById("task").value =  task.task;
        }

    });
    
}