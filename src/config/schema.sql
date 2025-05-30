USE CAPPUENSINO;


CREATE TABLE USUARIO (
    ID_USUARIO INT PRIMARY KEY,
    DATA_CADASTRO DATETIME,
    TIPO_USUARIO VARCHAR(255),
    ENDERECO VARCHAR(255),
    DT_NASC DATE,
    EMAIL VARCHAR(255),
    NOME_USU VARCHAR(255),
    SENHA VARCHAR(255),
    FOTO_PERFIL LONGBLOB,
    TELEFONE VARCHAR(20),
    NUM_IDENTIFICACAO VARCHAR(50),
    ID_STATUS BOOLEAN,
    COR_TELA BOOLEAN
);

CREATE TABLE CATEGORIAS (
    ID_CATEGORIA INT PRIMARY KEY,
    DESCRICAO TEXT,
    NOME TEXT
);

CREATE TABLE CURSOS (
    ID_CURSO INT PRIMARY KEY,
    ID_CATEGORIA INT,
    ID_USUARIO INT,
    PRECO DECIMAL(10,2),
    DESCRICAO TEXT,
    TITULO VARCHAR(255),
    DATA_CRIACAO DATETIME,
    DURACAO_TOTAL TIME,
    OBJETIVOS TEXT,
    FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIAS(ID_CATEGORIA),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE MODULO (
    ID_MODULO INT PRIMARY KEY,
    ID_CURSO INT,
    DESCRICAO TEXT,
    TITULO VARCHAR(255),
    ORDEM INT,
    FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
);

CREATE TABLE AULA (
    ID_AULA INT PRIMARY KEY,
    ID_MODULO INT,
    NOME VARCHAR(255),
    DURACAO TIME,
    ORDEM INT,
    FOREIGN KEY (ID_MODULO) REFERENCES MODULO(ID_MODULO)
);

CREATE TABLE MATERIAL (
    ID_MATERIAL INT PRIMARY KEY,
    ID_AULA INT,
    DESCRICAO TEXT,
    URL LONGBLOB,
    DATA_UPLOAD DATETIME,
    TIPO VARCHAR(255),
    TITULO VARCHAR(255),
    FOREIGN KEY (ID_AULA) REFERENCES AULA(ID_AULA)
);

CREATE TABLE ATIVIDADES (
    ID_ATIVIDADE INT PRIMARY KEY,
    ID_MODULO INT,
    TITULO VARCHAR(255),
    DESCRICAO TEXT,
    DATA_CRIACAO DATETIME,
    DURACAO TIME,
    FOREIGN KEY (ID_MODULO) REFERENCES MODULO(ID_MODULO)
);

CREATE TABLE ATIVIDADES_QUESTOES (
    ID_QUESTAO INT PRIMARY KEY,
    ID_ATIVIDADE INT,
    ENUNCIADO TEXT,
    ALTERNATIVA_CORRETA BOOLEAN,
    URL_ARQUIVO LONGBLOB,
    ALTERNATIVA_1 TEXT,
    ALTERNATIVA_2 TEXT,
    ALTERNATIVA_3 TEXT,
    ALTERNATIVA_4 TEXT,
    ALTERNATIVA_5 TEXT,
    EXTENSAO_ARQUIVO VARCHAR(255),
    FOREIGN KEY (ID_ATIVIDADE) REFERENCES ATIVIDADES(ID_ATIVIDADE)
);

CREATE TABLE QUESTIONARIO (
    ID_QUEST INT PRIMARY KEY,
    TITULO VARCHAR(255),
    DATA_HORA_CRIACAO DATETIME
);

CREATE TABLE QUESTOES (
    COD_QUESTAO INT PRIMARY KEY,
    ID_QUEST INT,
    PERGUNTA VARCHAR(255),
    ORDEM INT,
    ALT_AUDITIVA INT,
    ALT_VISUAL INT,
    ALT_LER_ESCREVER INT,
    ALT_SINESTESICO INT,
    FOREIGN KEY (ID_QUEST) REFERENCES QUESTIONARIO(ID_QUEST)
);

CREATE TABLE ANALISE_APRENDIZAGEM (
    COD_ANALISE INT,
    ID_USUARIO INT,
    RES_AUDITIVA INT,
    RES_VISUAL INT,
    RES_SINESTESICO INT,
    RES_LER_ESCR INT,
    DATA_ANALISE DATETIME,
    PRIMARY KEY(COD_ANALISE, ID_USUARIO),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE QUEST_ANALISE (
    COD_QUESTAO INT,
    COD_ANALISE INT,
    ID_USUARIO INT,
    RESPOSTA INT,
    PRIMARY KEY(COD_QUESTAO, COD_ANALISE),
    FOREIGN KEY (COD_QUESTAO) REFERENCES QUESTOES(COD_QUESTAO),
    FOREIGN KEY (COD_ANALISE, ID_USUARIO) REFERENCES ANALISE_APRENDIZAGEM(COD_ANALISE, ID_USUARIO)
);

CREATE TABLE PROGRESSO_AULA (
    ID_PROGRESSO INT PRIMARY KEY,
    ID_USUARIO INT,
    ID_AULA INT,
    STATUS BOOLEAN,
    VL_PROGRESSO DECIMAL(10,2),
    DATA_CONCLUSAO DATETIME,
    DATA_INICIO DATETIME,
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO),
    FOREIGN KEY (ID_AULA) REFERENCES AULA(ID_AULA)
);

CREATE TABLE AVALIACAO_CURSO (
    ID_AVALIACAO INT PRIMARY KEY,
    ID_CURSO INT,
    ID_USUARIO INT,
    NOTA INT,
    JUSTIFICATIVA TEXT,
    FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE SUPORTE (
    ID_MSG INT PRIMARY KEY,
    ID_USUARIO INT,
    NOME VARCHAR(255),
    MENSAGEM TEXT,
    EMAIL VARCHAR(255),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE CONFIG_PROF (
    ID_CONFIG_PROF INT,
    ID_USUARIO INT,
    LINK VARCHAR(255),
    ID_NOTIFICACAO BOOLEAN,
    BIOGRAFIA TEXT,
    CONTA_PAG TEXT,
    AGENCIA_PAG VARCHAR(255),
    CHAVE_PIX VARCHAR(255),
    BANCO_PAG VARCHAR(255),
    PRIMARY KEY(ID_CONFIG_PROF, ID_USUARIO),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE RESUMOS (
    COD_RESUMO INT,
    ID_USUARIO INT,
    DATA_RESUMO DATETIME,
    TEXTO_RESUMO TEXT,
    PRIMARY KEY(COD_RESUMO, ID_USUARIO),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE PLANOS (
    ID_PLANO INT PRIMARY KEY,
    DESCRICAO TEXT,
    DURACAO TIME,
    PRECO DECIMAL(10,2),
    NOME_PLANO VARCHAR(255)
);

CREATE TABLE COMPRA (
    ID_COMPRA INT PRIMARY KEY,
    ID_USUARIO INT,
    FORMA_PAGAMENTO VARCHAR(255),
    DATA_COMPRA DATETIME,
    STATUS BOOLEAN,
    VALOR DECIMAL(10,2),
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE CURSOS_COMPRA (
    ID_COMPRA INT,
    ID_CURSO INT,
    FOREIGN KEY (ID_COMPRA) REFERENCES COMPRA(ID_COMPRA),
    FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
);

CREATE TABLE COMPRA_PLANOS (
    ID_COMPRA INT,
    ID_PLANO INT,
    DATA_FIM DATETIME,
    DATA_INICIO DATETIME,
    PRIMARY KEY(ID_COMPRA, ID_PLANO),
    FOREIGN KEY (ID_COMPRA) REFERENCES COMPRA(ID_COMPRA),
    FOREIGN KEY (ID_PLANO) REFERENCES PLANOS(ID_PLANO)
);

CREATE TABLE ESTILO_APRENDIZAGEM (
    COD_ESTILO INT PRIMARY KEY,
    NOME_ESTILO VARCHAR(255),
    DESC_ESTILO TEXT,
    TIPO_METODO CHAR(9)
);

CREATE TABLE FUNCIONALIDADE (
    COD_FUNCIONALIDADE INT PRIMARY KEY,
    COD_ESTILO INT,
    NOME_FUNCIONALIDADE VARCHAR(255),
    DESC_FUNCIONALIDADE TEXT,
    FOREIGN KEY (COD_ESTILO) REFERENCES ESTILO_APRENDIZAGEM(COD_ESTILO)
);

SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'CAPPUENSINO' AND REFERENCED_TABLE_NAME IS NOT NULL;
-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE quest/analise (
cod_questao Int,
cod_analise Int,
resposta Int,
PRIMARY KEY(cod_questao,cod_analise)
)

CREATE TABLE Analise_Aprendizagem (
cod_analise Int,
id_usuario Int,
res_auditiva Int,
res_visual Int,
res_sinestesico Int,
res_ler_escr Int,
data_analise datetime,
PRIMARY KEY(cod_analise,id_usuario)
)

CREATE TABLE Suporte (
id_msg Int PRIMARY KEY,
id_usuario Int,
nome varchar,
mensagem Text,
email varchar
)

CREATE TABLE questionario (
id_quest Int PRIMARY KEY,
titulo varchar,
data_hora_criacao datetime
)

CREATE TABLE config_prof (
id_config_prof Int,
id_usuario Int,
link varchar,
id_notificacao boolean,
biografia Text,
conta_pag Text,
agencia_pag varchar,
chave_pix varchar,
banco_pag varchar,
PRIMARY KEY(id_config_prof,id_usuario)
)

CREATE TABLE Progresso_Aula (
id_progresso Int PRIMARY KEY,
id_usuario Int,
id_aula Int,
status boolean,
vl_progresso decimal,
data_conclusao datetime,
data_inicio datetime
)

CREATE TABLE Questoes (
cod_questao Int PRIMARY KEY,
id_quest Int,
pergunta varchar,
ordem Int,
alt_auditiva Int,
alt_visual Int,
alt_ler_escrever Int,
alt_sinestesico Int,
FOREIGN KEY(id_quest) REFERENCES questionario (id_quest)
)

-- Erro: Nome de tabela duplicado (este erro compromete a integridade referencial)!
CREATE TABLE questoes (
id_questao Int PRIMARY KEY,
id_atividade Int,
enunciado Text,
alternativa_correta boolean,
url_arquivo binar,
alternativa 5 Text,
alternativa 1 Text,
alternativa 2 Text,
alternativa 4 Text,
alternativa 3 Text,
extensao_arquivo varchar
)

CREATE TABLE atividades (
id_atividade Int PRIMARY KEY,
id_modulo Int,
titulo varchar,
descricao Text,
data_criacao datetime,
duracao datetime
)

CREATE TABLE aula (
id_aula Int PRIMARY KEY,
id_modulo Int,
nome varchar,
duracao datetime,
ordem Int
)

CREATE TABLE categorias (
id_categoria Int PRIMARY KEY,
descricao Text,
nome Text
)

CREATE TABLE Avaliacao_curso (
id_avaliacao Int PRIMARY KEY,
id_curso Int,
id_usuario Int,
nota Int,
justificativa Text
)

CREATE TABLE cursos (
id_curso Int PRIMARY KEY,
id_categoria Int,
id_usuario Int,
preco Int,
descricao Text,
titulo varchar,
data_criacao datetime,
duracao_total datetime,
objetivos Text,
FOREIGN KEY(id_categoria) REFERENCES categorias (id_categoria)
)

CREATE TABLE modulo (
id_modulo Int PRIMARY KEY,
id_curso Int,
descricao Text,
titulo varchar,
ordem Int,
FOREIGN KEY(id_curso) REFERENCES cursos (id_curso)
)

CREATE TABLE material (
id_material Int PRIMARY KEY,
id_aula Int,
descricao Text,
url binar,
data_upload datetime,
tipo varchar,
titulo varchar,
FOREIGN KEY(id_aula) REFERENCES aula (id_aula)
)

CREATE TABLE usuario (
id_usuario Int PRIMARY KEY,
data_cadastro datetime,
tipo_usuario varchar,
endereco varchar,
dt_nasc Int,
email varchar,
nome_usu varchar,
senha varchar,
foto_perfil binar,
telefone Int,
num_identificacao Int,
id_status boolean,
cor_tela boolean
)

CREATE TABLE resumos (
cod_resumo Int,
id_usuario Int,
data_resumo datetime,
texto_resumo Text,
PRIMARY KEY(cod_resumo,id_usuario),
FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
)

CREATE TABLE cursos/compra (
id_compra Int,
id_curso Int,
FOREIGN KEY(id_curso) REFERENCES cursos (id_curso)
)

CREATE TABLE compra/planos (
id_compra Int,
id_plano Int,
data_fim datetime,
data_inicio datetime,
PRIMARY KEY(id_compra,id_plano)
)

CREATE TABLE planos (
id_plano Int PRIMARY KEY,
descricao Text,
duracao datetime,
preco real,
nome_plano varchar
)

CREATE TABLE funcionalidade (
cod_funcionalidade Int PRIMARY KEY,
cod_estilo Int,
nome_funcionalidade  varchar,
desc_funcionalidade Text
)

CREATE TABLE Estilo_aprendizagem (
cod_estilo Int PRIMARY KEY,
nome_estilo varchar,
desc_estilo Text,
tipo_metodo char(9)
)

CREATE TABLE compra (
id_compra Int PRIMARY KEY,
id_usuario Int,
forma_pagamento varchar,
data_compra datetime,
status boolean,
valor real,
FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
)

ALTER TABLE quest/analise ADD FOREIGN KEY(cod_questao) REFERENCES Questoes (cod_questao)
ALTER TABLE quest/analise ADD FOREIGN KEY(/*erro: ??*/) REFERENCES Analise_Aprendizagem (cod_analise,id_usuario)
ALTER TABLE Analise_Aprendizagem ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE Suporte ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE config_prof ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE Progresso_Aula ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE Progresso_Aula ADD FOREIGN KEY(id_aula) REFERENCES aula (id_aula)
ALTER TABLE questoes ADD FOREIGN KEY(id_atividade) REFERENCES atividades (id_atividade)
ALTER TABLE atividades ADD FOREIGN KEY(id_modulo) REFERENCES modulo (id_modulo)
ALTER TABLE aula ADD FOREIGN KEY(id_modulo) REFERENCES modulo (id_modulo)
ALTER TABLE Avaliacao_curso ADD FOREIGN KEY(id_curso) REFERENCES cursos (id_curso)
ALTER TABLE Avaliacao_curso ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE cursos ADD FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario)
ALTER TABLE cursos/compra ADD FOREIGN KEY(id_compra) REFERENCES compra (id_compra)
ALTER TABLE compra/planos ADD FOREIGN KEY(id_compra) REFERENCES compra (id_compra)
ALTER TABLE compra/planos ADD FOREIGN KEY(id_plano) REFERENCES planos (id_plano)
CREATE DATABASE BDCAPPU;
USE BDCAPPU;

CREATE TABLE USUARIO (
    ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
    NOME_USU VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    SENHA VARCHAR(255) NOT NULL,
    TELEFONE VARCHAR(15),
    ENDERECO TEXT,
    DT_NASC DATE,
    DATA_CADASTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TIPO_USUARIO ENUM('ADMIN', 'CLIENTE', 'FUNCIONARIO') NOT NULL,
    NUM_IDENTIFICACAO VARCHAR(20) UNIQUE,
    FOTO_PERFIL BLOB,  -- PODE SER UTILIZADO PARA ARMAZENAR A IMAGEM, CASO NECESSARIO
    ID_STATUS INT,
    COR_TELA VARCHAR(2)
);

CREATE TABLE QUESTIONARIO (
    ID_QUEST INT AUTO_INCREMENT PRIMARY KEY,
    RESULTADO VARCHAR(255),
    VISUAL INT,  -- Aqui, assumindo que você quer armazenar um valor numérico (por exemplo, 1 ou 0)
    SINESTESICO INT,  -- Também como um valor numérico
    AUDITIVO INT,  -- Outro valor numérico
    PERGUNTAS TEXT,  -- Para armazenar o texto das perguntas, caso seja um campo longo
    LER_ESCREVER INT  -- Mais um valor numérico
);

CREATE TABLE RESUMOS (
    ID_RESUMOS INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    TEXTO TEXT NOT NULL
);

CREATE TABLE CAT_RESUMOS (
    ID_CAT_RESUMOS INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL
);

CREATE TABLE MNEMONICA (
    ID_MNEMONICA INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    TEXTO TEXT NOT NULL,
    IMAGEM BLOB  -- Caso você queira armazenar uma imagem no banco de dados
);

CREATE TABLE CAT_MNEMONICA (
    ID_CAT_MNEMONICA INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL
);

CREATE TABLE FEYNMAN (
    ID_FEYNMAN INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    RESUMO TEXT NOT NULL
);

CREATE TABLE CAT_FEYNMAN (
    ID_CAT_FEYNMAN INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL
);

CREATE TABLE POMODORO (
    ID_POMODORO INT AUTO_INCREMENT PRIMARY KEY,
    TEMPO_FOCO INT NOT NULL,  -- Em minutos, por exemplo
    TEMPO_DESCANSO INT NOT NULL,  -- Em minutos, por exemplo
    QTD_CICLOS INT NOT NULL  -- Quantidade de ciclos de foco
);

CREATE TABLE CAT_POMODORO (
    ID_CAT_POMODORO INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL
);

CREATE TABLE AVALIAR_CURSO (
    ID_AVALIACAO INT AUTO_INCREMENT PRIMARY KEY,
    JUSTIFICATIVA TEXT,  -- Armazenando a justificativa (pode ser um texto longo)
    NOTA DECIMAL(3,2) NOT NULL  -- Nota com até 3 dígitos, sendo 2 após a vírgula (ex: 8.75)
);

CREATE TABLE CURSO (
    ID_CURSO INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    PRECO DECIMAL(10,2) NOT NULL,  -- Para armazenar preços com até 2 casas decimais
    DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Para armazenar a data e hora de criação
);

CREATE TABLE CERTIFICADO (
    ID_CERTIFICADO INT AUTO_INCREMENT PRIMARY KEY,
    URL_CERTIFICADO VARCHAR(255) NOT NULL,  -- Para armazenar o link ou caminho do certificado
    DATA_EMISSAO DATE NOT NULL  -- Data em que o certificado foi emitido
);

CREATE TABLE CATEGORIAS (
    ID_CATEGORIA INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,
    DESCRICAO TEXT
);

CREATE TABLE MODULO (
    ID_MODULO INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    ORDEM INT NOT NULL
);

CREATE TABLE AULA (
    ID_AULA INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,
    DURACAO INT NOT NULL,  -- Duração em minutos
    ORDEM INT NOT NULL
);

CREATE TABLE MATE_AULA (
    ID_MATERIAL INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    URL VARCHAR(255),
    TIPO ENUM('PDF', 'VIDEO', 'IMAGEM', 'OUTRO') NOT NULL,  -- Exemplo de tipos de material
    DATA_UPLOAD TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PROGRESSO (
    ID_PROGRESSO INT AUTO_INCREMENT PRIMARY KEY,
    DATA_INICIO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data de início, com valor padrão de CURRENT_TIMESTAMP
    STATUS ENUM('EM ANDAMENTO', 'CONCLUÍDO', 'PENDENTE') NOT NULL,  -- Status do progresso
    DATA_CONCLUSAO TIMESTAMP  -- Data de conclusão, caso aplicável
);

CREATE TABLE PLANOS (
    ID_PLANO INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    BENEFICIOS TEXT,
    PERIODO ENUM('MENSAL', 'ANUAL', 'SEMANAL') NOT NULL,  -- Pode ser ajustado conforme o tipo de período
    PRECO DECIMAL(10,2) NOT NULL  -- Para armazenar o preço com até 2 casas decimais
);

CREATE TABLE COMPRA (
    ID_COMPRA INT AUTO_INCREMENT PRIMARY KEY,
    FORMA_PAGAMENTO ENUM('CARTÃO', 'BOLETO', 'TRANSFERÊNCIA', 'PIX') NOT NULL,  -- Tipos de pagamento (pode ser ajustado conforme necessário)
    DATA_COMPRA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data da compra, com valor padrão de CURRENT_TIMESTAMP
    STATUS ENUM('PENDENTE', 'CONCLUÍDO', 'CANCELADO') NOT NULL,  -- Status da compra
    VALOR DECIMAL(10,2) NOT NULL  -- Valor da compra com até 2 casas decimais
);

CREATE TABLE ATIVIDADES (
    ID_ATIVIDADE INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data de criação, com valor padrão de CURRENT_TIMESTAMP
    DURACAO INT NOT NULL  -- Duração em minutos
);

CREATE TABLE QUESTOES (
    ID_QUESTAO INT AUTO_INCREMENT PRIMARY KEY,
    ENUNCIADO TEXT NOT NULL,  -- Enunciado da questão
    ALTERNATIVA_1 VARCHAR(255) NOT NULL,  -- Alternativa 1
    ALTERNATIVA_2 VARCHAR(255) NOT NULL,  -- Alternativa 2
    ALTERNATIVA_3 VARCHAR(255) NOT NULL,  -- Alternativa 3
    ALTERNATIVA_4 VARCHAR(255) NOT NULL,  -- Alternativa 4
    ALTERNATIVA_5 VARCHAR(255),  -- Alternativa 5 (opcional, pode ser nula)
    ALTERNATIVA_CORRETA INT NOT NULL,  -- Índice da alternativa correta (1 a 5)
    EXTENSAO_ARQUIVO VARCHAR(10),  -- Extensão do arquivo (ex: .jpg, .pdf)
    URL_ARQUIVO VARCHAR(255)  -- URL para o arquivo relacionado
);

CREATE TABLE MSG_SUPORTE (
    ID_MSG INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,  -- Nome do usuário que enviou a mensagem
    EMAIL VARCHAR(255) NOT NULL,  -- E-mail do usuário que enviou a mensagem
    MENSAGEM TEXT NOT NULL  -- Conteúdo da mensagem enviada
);

CREATE TABLE CONFIG_PROF (
    ID_CONFIG_PROF INT AUTO_INCREMENT PRIMARY KEY,
    LINK VARCHAR(255),  -- Link de algum site ou página relacionada ao professor
    ID_TEMA_SITE INT,  -- ID do tema do site, provavelmente uma chave estrangeira
    ID_NOTIFICACAO INT,  -- ID da notificação, provavelmente uma chave estrangeira
    CHAVE_PIX VARCHAR(255),  -- Chave PIX do professor
    AGENCIA_PAG VARCHAR(10),  -- Número da agência bancária
    BANCO_PAG VARCHAR(255),  -- Nome do banco
    CONTA_PAG VARCHAR(50),  -- Número da conta bancária
    BIOGRAFIA TEXT  -- Biografia do professor
);
ALTER TABLE funcionalidade ADD FOREIGN KEY(cod_estilo) REFERENCES Estilo_aprendizagem (cod_estilo)