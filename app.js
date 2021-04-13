require('colors');

const { guardarDB,
    leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { //cargar tareas 

        tareas.cargarTareasFromArra(tareasDB);

    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opción
                const desc = await leerInput('Descripción:');
                tareas.CrearTarea(desc);
                break;

            case '2':
                // console.log(tareas.listadoArray);
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            // case '5':
            //     tareas.listarPendientesCompletadas(false);
            //     break;
            case '6': //Borrar tarea 
                const id =  listadoTareasBorrar(tareas.listadoArray);
                console.log( {id} );
                break;
        }

        guardarDB(tareas.listadoArray);

        await pausa();


    } while (opt !== '0');
}

main();