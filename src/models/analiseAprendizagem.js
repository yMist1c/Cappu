class AnaliseAprendizagem {
    constructor({
        COD_ANALISE,
        ID_USUARIO,
        RES_AUDITIVA,
        RES_VISUAL,
        RES_SINESTESICO,
        RES_LER_ESCR,
        DATA_ANALISE
    }) {
        this.COD_ANALISE = COD_ANALISE;
        this.ID_USUARIO = ID_USUARIO;
        this.RES_AUDITIVA = RES_AUDITIVA;
        this.RES_VISUAL = RES_VISUAL;
        this.RES_SINESTESICO = RES_SINESTESICO;
        this.RES_LER_ESCR = RES_LER_ESCR;
        this.DATA_ANALISE = DATA_ANALISE;
    }
}

module.exports = AnaliseAprendizagem;
