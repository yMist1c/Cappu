class Material {
    constructor({
        ID_MATERIAL,
        ID_AULA,
        DESCRICAO,
        URL,
        DATA_UPLOAD,
        TIPO,
        TITULO
    }) {
        this.ID_MATERIAL = ID_MATERIAL;
        this.ID_AULA = ID_AULA;
        this.DESCRICAO = DESCRICAO;
        this.URL = URL;
        this.DATA_UPLOAD = DATA_UPLOAD;
        this.TIPO = TIPO;
        this.TITULO = TITULO;
    }
}

module.exports = Material;
