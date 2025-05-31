// src/models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Ajuste o caminho se necessário

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Adicione se ID_USUARIO for AUTO_INCREMENT no seu BD
        field: 'ID_USUARIO'
    },
    dataCadastro: {
        type: DataTypes.DATE,
        field: 'DATA_CADASTRO'
    },
    tipo: { // O nome do atributo no JavaScript continua 'tipo'
        type: DataTypes.ENUM('aluno', 'professor', 'adm'),
        allowNull: false,
        field: 'TIPO_USUARIO' // Mapeia para a coluna TIPO_USUARIO no BD
    },
    endereco: {
        type: DataTypes.STRING,
        field: 'ENDERECO'
    },
    dtNasc: {
        type: DataTypes.DATEONLY, // Use DATEONLY para colunas DATE do SQL
        field: 'DT_NASC'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Para garantir que o email seja único
        field: 'EMAIL'
    },
    nomeUsu: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NOME_USU'
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'SENHA'
    },
    fotoPerfil: {
        type: DataTypes.BLOB('long'), // Para LONGBLOB
        field: 'FOTO_PERFIL'
    },
    telefone: {
        type: DataTypes.STRING(20),
        field: 'TELEFONE'
    },
    numIdentificacao: {
        type: DataTypes.STRING(50),
        field: 'NUM_IDENTIFICACAO'
    },
    idStatus: { // Assumindo que ID_STATUS é o nome da coluna para o status do usuário
        type: DataTypes.BOOLEAN,
        field: 'ID_STATUS'
    },
    corTela: {
        type: DataTypes.BOOLEAN,
        field: 'COR_TELA'
    }
}, {
    tableName: 'USUARIO', // Nome exato da tabela no banco de dados
    timestamps: false,    // Desabilita colunas createdAt e updatedAt, já que não existem no seu schema
    underscored: false    // Mantém false pois estamos usando 'field' para mapeamento explícito
});

module.exports = Usuario;