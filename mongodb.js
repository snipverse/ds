use Institution



// STAFF

db.createCollection("Staff")

db.Staff.insertMany([
{empid:1, empname:"Amit", salary:40000, designation:"Clerk"},
{empid:2, empname:"Ravi", salary:60000, designation:"Manager"},
{empid:3, empname:"Sita", salary:45000, designation:"Accountant"},
{empid:4, empname:"Neha", salary:70000, designation:"Manager"},
{empid:5, empname:"Raj", salary:30000, designation:"Clerk"},
{empid:6, empname:"Priya", salary:50000, designation:"Accountant"},
{empid:7, empname:"Karan", salary:120000, designation:"CEO"},
{empid:8, empname:"Anil", salary:55000, designation:"Manager"},
{empid:9, empname:"Pooja", salary:38000, designation:"Clerk"},
{empid:10, empname:"Vikas", salary:48000, designation:"Accountant"}
])

db.Staff.find()

db.Staff.find({}, {empid:1, designation:1, _id:0})

db.Staff.find().sort({salary:-1})

db.Staff.find({
$or:[
{designation:"Manager"},
{salary:{$gt:50000}}
]
})

db.Staff.updateMany(
{designation:"Accountant"},
{$set:{salary:45000}}
)

db.Staff.deleteMany({salary:{$gt:100000}})



// STUDENT

db.createCollection("Student")

db.Student.insertMany([
{RollNo:1, Name:"Amit", Class:"BSc", TotalMarks:350},
{RollNo:2, Name:"Ravi", Class:"MSc", TotalMarks:420},
{RollNo:3, Name:"Sita", Class:"BSc", TotalMarks:180},
{RollNo:4, Name:"Neha", Class:"MSc", TotalMarks:460},
{RollNo:5, Name:"Raj", Class:"BSc", TotalMarks:210},
{RollNo:6, Name:"Priya", Class:"MSc", TotalMarks:390},
{RollNo:7, Name:"Karan", Class:"BSc", TotalMarks:150},
{RollNo:8, Name:"Anil", Class:"MSc", TotalMarks:480},
{RollNo:9, Name:"Pooja", Class:"BSc", TotalMarks:300},
{RollNo:10, Name:"Vikas", Class:"MSc", TotalMarks:410}
])

db.Student.find()

db.Student.find().sort({TotalMarks:-1})

db.Student.find({
$or:[
{Class:"MSc"},
{TotalMarks:{$gt:400}}
]
})

db.Student.deleteMany({TotalMarks:{$lt:200}})


// MAP REDUCE

db.sales.insertMany([
{_id:1, product:"apple", amount:100},
{_id:2, product:"banana", amount:150},
{_id:3, product:"apple", amount:200},
{_id:4, product:"oranges", amount:100},
{_id:5, product:"banana", amount:350},
{_id:6, product:"oranges", amount:200}
])

var mapFunction = function() {
emit(this.product, this.amount);
};

var reduceFunction = function(key, values) {
return Array.sum(values);
};

db.sales.mapReduce(
mapFunction,
reduceFunction,
{ out: "total_sales" }
)

db.total_sales.find()
