// const { inquirerMenu } = require('./helpers/inquirer');
require('colors');




console.clear();

const main = async () => {

    console.log('Hola mundo');

    let opt = '';

    
    do{
        opt = await menu
        console.log({opt});
        

    } while (opt !== '0' );
}



main();