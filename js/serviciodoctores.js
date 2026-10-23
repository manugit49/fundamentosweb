function mostrarAlerta(){
    alert("Soy tu alerta de viernes!!!");
}

let url = "https://apicruddoctores.azurewebsites.net/";

async function insertarDoctores() {
    let request = `${url}api/doctores`;
    //Buscamos la caja de id doctor
    let cajaiddoctor = parseInt(document.getElementById("cajaiddoctor"));
    //Buscamos la caja del id hospital
    let cajaidhospital = document.getElementById("cajaidhospital");
    //Buscamos la caja del apellido
    let cajaapellido = document.getElementById("cajaapellido");
    //Buscamos la caja de la especialidad
    let cajaespecialidad = document.getElementById("cajaespecialidad");
    //Buscamos la caja del salario
    let cajasalario = document.getElementById("cajasalario");
    //Necesitamos enviar un objeto con nuevo doctor
    //Creamos un objeto con la información
    let doctor = {
        "idDoctor": cajaiddoctor.value,
        "idHospital": parseInt(cajaidhospital.value),
        "apellido": cajaapellido.value,
        "especialidad": cajaespecialidad.value,
        "salario": parseInt(cajasalario.value)
    }
    console.log(doctor);
    //Para eviar la informacion al servcio he de convertir los datos a json con stringify
    let data = JSON.stringify(doctor);
    console.log(request);
    //Llamamos a nuestro servicio usando POST
    let response = await fetch(request, {
        method: "POST",
        "body": data,
        headers: {
            "Content-Type": "application/json"
        }
    })
    cargarDoctores();
}


async function cargarDoctores() {
    //Construimos la petición
    let request = `${url}api/doctores`;
    //Realizamos la petición al servicio
    let response = await fetch(request);
    //Convertimos los datos a json
    let datos = await response.json();
    //Creamos variable filas para dibujar en ella las filas con los datos
    let filas = "";
    //Recorremos los datos de los doctores
    for(let doctor of datos){
        filas += `
            <tr>
                <td>${doctor.idDoctor}</td>
                <td>${doctor.idHospital}</td>
                <td>${doctor.apellido}</td>
                <td>${doctor.especialidad}</td>
                <td>${doctor.salario}</td>
            </tr>
        `
    }
    //Recupero el elemento table del html
    let tabla = document.getElementById("tabladoctores");
    //Pintamos las filas en la tabla
    tabla.innerHTML = filas;
}

async function modificarDoctores(){
    //Construimos la petición al servicio api
    let request = `${url}api/doctores`;
    //Buscamos la caja del id de doctor
    let cajaiddoctor = document.getElementById("cajaiddoctor");
    //Buscamos la caja del id de hospital
    let cajaidhospital = document.getElementById("cajaidhospital");
    //Buscamos la caja del apellido
    let cajaapellido = document.getElementById("cajaapellido");
    //Buscamos la caja de la especialidad
    let cajaespecialidad = document.getElementById("cajaespecialidad");
    //Buscamos la caja del salario
    let cajasalario = document.getElementById("cajasalario");

    let editado = {
        "idDoctor": parseInt(cajaiddoctor.value),
        "idHospital": parseInt(cajaidhospital.value),
        "apellido": cajaapellido.value,
        "especialidad": cajaespecialidad.value,
        "salario": parseInt(cajasalario.value)
    }
    //Para enviar la información al servicio
    //necesito convertir el objeto a JSON usando el metodo stringify
    let data = JSON.stringify(editado);
    //Llamamos a nuestro servicio con PUT e incluimos los datos a modifica del objeto json
    let response = await fetch(request, {
        "method": "PUT",
        "body": data,
        "headers": {
            "Content-Type": "application/json"
        }           
    })
    cargarDoctores();
}

async function eliminarDoctores() {
    //Buscamos la caja del id de doctor
    let cajaiddoctor = document.getElementById("cajaiddoctor");

    //Cogemos el valor introducido en la caja input de idDoctor del dibujo html
    let id = parseInt(cajaiddoctor.value);
    
    //Construimos la petición al servicio api
    let request = `${url}api/doctores/${id}`;

    //Realizamos la petición al servicio
    let response = await fetch(request, {
        method: "DELETE"
    });
    cargarDoctores();
}