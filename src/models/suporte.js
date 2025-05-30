class Suporte {
    constructor({
        ID_MSG,
        ID_USUARIO,
        NOME,
        MENSAGEM,
        EMAIL
    }) {
        this.ID_MSG = ID_MSG;
        this.ID_USUARIO = ID_USUARIO;
        this.NOME = NOME;
        this.MENSAGEM = MENSAGEM;
        this.EMAIL = EMAIL;
    }
}

module.exports = Suporte;
