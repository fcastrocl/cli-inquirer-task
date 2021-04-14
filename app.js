require('colors');

const { guardarDB,
    leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
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

            case '2': // listar
                // console.log(tareas.listadoArray);
                tareas.listadoCompleto();
                break;

            case '3': // Listar completas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // Completado de pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;

            case '6': //Borrar tarea 
                const id = await listadoTareasBorrar(tareas.listadoArray);

                if (id !== '0') {
                    const ok = await confirmar('¿Estar seguro?');
                    if (ok) {

                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }

                }

                break;
        }

        guardarDB(tareas.listadoArray);

        await pausa();


    } while (opt !== '0');
}

main();