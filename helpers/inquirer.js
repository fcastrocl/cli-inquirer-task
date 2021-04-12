const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: ['opt1','opt2','opt3']
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const  opcion  = await inquirer.prompt(preguntas);

    return opcion;
}