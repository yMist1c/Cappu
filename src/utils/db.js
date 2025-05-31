// src/utils/db.js
const { Sequelize } = require('sequelize');

// Configurações de conexão com o banco de dados MySQL
const sequelize = new Sequelize('CAPPUENSINO', 'root', 'PUC#Camp#2024', {
  host: 'localhost',
  dialect: 'mysql'
});

// Testa a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize; // CORRIGIDO: Exporta a instância configurada 'sequelize' (minúsculo)