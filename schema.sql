
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    nivel VARCHAR(50),
    duracao VARCHAR(50),
    professor_id INT,
    preco DECIMAL(10,2),
    imagem VARCHAR(255),
    status VARCHAR(50),
    FOREIGN KEY (professor_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS aulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT,
    titulo VARCHAR(255),
    descricao TEXT,
    video_url VARCHAR(255),
    ordem INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE IF NOT EXISTS materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aula_id INT,
    titulo VARCHAR(255),
    descricao TEXT,
    arquivo_url VARCHAR(255),
    FOREIGN KEY (aula_id) REFERENCES aulas(id)
);

CREATE TABLE IF NOT EXISTS exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aula_id INT,
    pergunta TEXT,
    resposta_correta TEXT,
    FOREIGN KEY (aula_id) REFERENCES aulas(id)
);

CREATE TABLE IF NOT EXISTS resumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aula_id INT,
    conteudo TEXT,
    FOREIGN KEY (aula_id) REFERENCES aulas(id)
);
