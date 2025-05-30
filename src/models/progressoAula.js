class ProgressoAula {
    constructor({
        ID_PROGRESSO,
        ID_USUARIO,
        ID_AULA,
        STATUS,
        VL_PROGRESSO,
        DATA_CONCLUSAO,
        DATA_INICIO
    }) {
        this.ID_PROGRESSO = ID_PROGRESSO;
        this.ID_USUARIO = ID_USUARIO;
        this.ID_AULA = ID_AULA;
        this.STATUS = STATUS;
        this.VL_PROGRESSO = VL_PROGRESSO;
        this.DATA_CONCLUSAO = DATA_CONCLUSAO;
        this.DATA_INICIO = DATA_INICIO;
    }
}

module.exports = ProgressoAula;
