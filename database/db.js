const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, 'root', '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then( () => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
}).catch( (err) => {
    console.log(`Erro Conexão: ${err}`);
})


module.exports = sequelize;
