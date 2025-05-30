class CompraPlanos {
    constructor({
        ID_COMPRA,
        ID_PLANO,
        DATA_FIM,
        DATA_INICIO
    }) {
        this.ID_COMPRA = ID_COMPRA;
        this.ID_PLANO = ID_PLANO;
        this.DATA_FIM = DATA_FIM;
        this.DATA_INICIO = DATA_INICIO;
    }
}

module.exports = CompraPlanos;
