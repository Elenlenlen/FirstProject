var a = { "ime" : "Elena" };
var b = { "age" : "2" };
var niz = [ a, b ];
var niz2 = [ {"c" : { prop1 : 1 }} , { drugi : 2 } ];

function Person(firstName, lastName, gender){
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    Person.staticVariable = "static";
    Person.staticFunction = function(){
        console.log("static function");
    };
};

Person.prototype.greeting = function(){
    console.log("Hi my name is: " + this.firstName + " " + this.lastName);
};

var elena = Person("Elena", "Roncevic", "f");

function Student( firstName, lastName, gender, faculty){
    Person.call( this, firstName, lastName, gender);
    this.faculty = faculty;
};

Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student.prototype, 'constructor', { 
    value: Student, 
    enumerable: false, 
    writable: true });

Student.prototype.greeting = function(){
    console.log("Hi I'm student! My name is: " + this.firstName);
};

var elenaStud = Student("Elena", "Roncevic", "f", "FTN");