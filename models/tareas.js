const Tarea = require('./tarea')

class Tareas {

    _listado = {};

    get listadoArray() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);

        });

        return listado;
    }

    constructor() {

        this._listado = {};
    }

    borrarTarea (id = '') {

        if (this._listado[id])
        {
            delete this._listado[id];
        }
    }


    cargarTareasFromArra(tareas = []) {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
        });
    }

    CrearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        this.listadoArray.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendinte'.red;

            console.log(`${idx} ${desc}:: ${estado}`);

        });
    }

    listarPendientesCompletadas(completadas = true) {

        this.listadoArray.forEach((tarea) => {

            let contador = 0;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendinte'.red;

            if (completadas) {

                if (completadoEn) {

                    contador += 1;
                    console.log(`${(contador + '.')} ${desc}:: ${completadoEn.green}`);

                }

            } else {

                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador} ${desc}:: ${estado}`);
                }
            }
        })
    }

}

module.exports = Tareas;