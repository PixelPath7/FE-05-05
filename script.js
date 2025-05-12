const students = []
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value.trim();

    if(!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date){
        alert("Error al ingresar Datos")
        return
    }

    const student = {name, lastName, grade, date}

    students.push(student);
    //console.log(students)
    addStudentToTable(student)
    calculateAverage()

    this.reset()

});

function calculateAverage(){
    let total_notas = 0
    let total_estudiantes = students.length

    for(i of students){
        console.log(i);
        total_notas = i.grade + total_notas
    }
    averageDiv.innerHTML = `Promedio General del Curso: ${total_notas/total_estudiantes}`
}

//function calcularPromedio(){
//    if(students.length===0){
//        averageDiv.textContent = "Promedio General del Curso: N/A"
//        return
//    }
//    const total=students.reduce((sum, student) => sum + student.grade, 0);
//    const prom = total/students.length;
//    averageDiv.textContent = "Promedio General del Curso: "+prom.toFixed(2);
//}

function addStudentToTable(student){
    const row = document.createElement("tr");
    row.innerHTML = `
        <td> ${student.name}</td>
        <td> ${student.lastName}</td>
        <td> ${student.grade}</td>
        <td> ${student.date}</td>`;
    tableBody.appendChild(row);
}