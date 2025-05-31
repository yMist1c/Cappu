// src/models/suporte.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Ajuste o caminho se necessário

const Suporte = sequelize.define('Suporte', {
    idMsg: { // Atributo no modelo JS
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID_MSG' // Coluna no BD
    },
    idUsuario: { // Atributo no modelo JS (FK para USUARIO.ID_USUARIO)
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ID_USUARIO' // Coluna no BD
        // A referência à tabela Usuario pode ser definida nas associações em models/index.js
    },
    nome: { // Atributo no modelo JS
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NOME' // Coluna no BD
    },
    mensagem: { // Atributo no modelo JS
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'MENSAGEM' // Coluna no BD
    },
    email: { // Atributo no modelo JS
        type: DataTypes.STRING,
        allowNull: false,
        field: 'EMAIL' // Coluna no BD
    }
    // dataEnvio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'DATA_ENVIO' } // Opcional
}, {
    tableName: 'SUPORTE',
    timestamps: false // Defina como true se você tiver colunas createdAt e updatedAt
});

module.exports = Suporte;