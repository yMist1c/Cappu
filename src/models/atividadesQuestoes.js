class AtividadesQuestoes {
    constructor({
        ID_QUESTAO,
        ID_ATIVIDADE,
        ENUNCIADO,
        ALTERNATIVA_CORRETA,
        URL_ARQUIVO,
        ALTERNATIVA_1,
        ALTERNATIVA_2,
        ALTERNATIVA_3,
        ALTERNATIVA_4,
        ALTERNATIVA_5,
        EXTENSAO_ARQUIVO
    }) {
        this.ID_QUESTAO = ID_QUESTAO;
        this.ID_ATIVIDADE = ID_ATIVIDADE;
        this.ENUNCIADO = ENUNCIADO;
        this.ALTERNATIVA_CORRETA = ALTERNATIVA_CORRETA;
        this.URL_ARQUIVO = URL_ARQUIVO;
        this.ALTERNATIVA_1 = ALTERNATIVA_1;
        this.ALTERNATIVA_2 = ALTERNATIVA_2;
        this.ALTERNATIVA_3 = ALTERNATIVA_3;
        this.ALTERNATIVA_4 = ALTERNATIVA_4;
        this.ALTERNATIVA_5 = ALTERNATIVA_5;
        this.EXTENSAO_ARQUIVO = EXTENSAO_ARQUIVO;
    }
}

module.exports = AtividadesQuestoes;
