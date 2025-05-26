const students = []
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");
const tStudents=document.getElementById("total_students");
const tAprobados=document.getElementById("total_aprobados");
const tDesaprobados=document.getElementById("total_desaprobados");

document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    
    const rawDate = document.getElementById("date").value.trim();
    const date = new Date(rawDate).toLocaleDateString("es-CL");

    if(!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date){
        alert("Error al ingresar Datos")
        return
    }

    const student = {name, lastName, grade, date}

    students.push(student);
    //console.log(students)
    addStudentToTable(student)
    calculateAverage()
    aprobados_desaprobados()

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

function deleteEstudiante(student, row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index, 1);
        calculateAverage();
        row.remove();
        aprobados_desaprobados();
    }
}

function editEstudiante(student, row){
    const index = students.indexOf(student);
    if (index === -1) return;

    while (true) {

        const newName = prompt("Editar nombre:", student.name)?.trim();
        if (newName === null) return;

        const newLastName = prompt("Editar apellido:", student.lastName)?.trim();
        if (newLastName === null) return;

        const newGradeInput = prompt("Editar nota (1 a 7):", student.grade);
        if (newGradeInput === null) return;

        const newDate = prompt("Editar fecha:", student.date)?.trim();
        if (newDate === null) return;

        const newGrade = parseFloat(newGradeInput);
        const errors = [];

        if (!newName) errors.push("El nombre no puede estar vacío.");
        if (!newLastName) errors.push("El apellido no puede estar vacío.");
        if (isNaN(newGrade) || newGrade < 1 || newGrade > 7) errors.push("La nota debe ser un número entre 1 y 7.");
        if (!newDate) errors.push("La fecha no puede estar vacía.");

        if (errors.length === 0) {

            student.name = newName;
            student.lastName = newLastName;
            student.grade = newGrade;
            student.date = newDate;

            row.cells[0].textContent = newName;
            row.cells[1].textContent = newLastName;
            row.cells[2].textContent = newGrade;
            row.cells[3].textContent = newDate;

            calculateAverage();
            break;

        } else {
            alert("Errores:\n" + errors.join("\n"));
        }
    }
}

function aprobados_desaprobados() {
    let total_students = 0;
    let total_aprobados = 0;
    let total_desaprobados = 0;

    for (let elem of students) {
        total_students++;

        if (elem.grade >= 4) {
            total_aprobados++;
        } else {
            total_desaprobados++;
        }
    }

    document.getElementById("total_students").innerHTML = `Total Estudiantes: ${total_students}`;
    document.getElementById("total_aprobados").innerHTML = `Total Estudiantes Aprobados: ${total_aprobados}`;
    document.getElementById("total_desaprobados").innerHTML = `Total Estudiantes Desaprobados: ${total_desaprobados}`;
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
        <td> ${student.date}</td>
        <td> 
            <button class="delete-btn ${student.actions}">Eliminar</button>
            <button class="edit-btn ${student.actions}">Editar</button>
        </td>`;
        row.querySelector(".delete-btn").addEventListener("click", function(){
            deleteEstudiante(student, row);
        })
        row.querySelector(".edit-btn").addEventListener("click", function(){
            editEstudiante(student, row);
        })
    tableBody.appendChild(row);
}