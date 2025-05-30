class Planos {
    constructor({
        ID_PLANO,
        DESCRICAO,
        DURACAO,
        PRECO,
        NOME_PLANO
    }) {
        this.ID_PLANO = ID_PLANO;
        this.DESCRICAO = DESCRICAO;
        this.DURACAO = DURACAO;
        this.PRECO = PRECO;
        this.NOME_PLANO = NOME_PLANO;
    }
}

module.exports = Planos;
