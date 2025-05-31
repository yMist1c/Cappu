// src/routes/index.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureNotAuthenticated } = require('../middleware/authe'); // Verifique o caminho
const Suporte = require('../models/suporte'); // Verifique o caminho para o modelo Suporte
// const Usuario = require('../models/usuario'); // Não precisa de Usuario aqui se req.user já tem o ID

// Welcome Page / Landing Page
router.get('/', ensureNotAuthenticated, (req, res) => res.render('home'));

// Rota Sobre
router.get('/sobre', (req, res) => {
    res.render('sobre', { currentUser: req.user || null });
});

// Rota Quem Somos
router.get('/quemsomos', (req, res) => {
    res.render('quemsomos', { currentUser: req.user || null });
});

// Rota Planos
router.get('/planos', (req, res) => {
    res.render('planos', { currentUser: req.user || null });
});

// Rota Suporte (GET)
router.get('/suporte', ensureAuthenticated, (req, res) => {
    res.render('suporte', { 
        currentUser: req.user || null,
        success_msg: req.flash('success_msg'), // Para exibir mensagens de sucesso
        error_msg: req.flash('error_msg')     // Para exibir mensagens de erro
    });
});

// Rota para processar o formulário de suporte (POST) - CORRIGIDO
router.post('/suporte', ensureAuthenticated, async (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // req.user deve ser populado pelo Passport e conter idUsuario (o nome do atributo no modelo JS)
    const idUsuarioLogado = req.user ? req.user.idUsuario : null; 

    if (!idUsuarioLogado) {
        req.flash('error_msg', 'Você precisa estar logado para enviar uma mensagem de suporte.');
        // Decide se redireciona para /suporte com a mensagem ou para /login
        return res.redirect('/login'); 
    }
    if (!nome || !email || !mensagem) {
        req.flash('error_msg', 'Por favor, preencha todos os campos.');
        return res.redirect('/suporte');
    }

    try {
        // Use os nomes dos ATRIBUTOS do modelo Sequelize (geralmente camelCase)
        // O modelo 'Suporte' deve ter os atributos: idUsuario, nome, email, mensagem
        // e usar `field:` para mapeá-los para as colunas do BD (ID_USUARIO, NOME, EMAIL, MENSAGEM)
        await Suporte.create({
            idUsuario: idUsuarioLogado, // Corresponde ao atributo 'idUsuario' no modelo Suporte
            nome: nome,                 // Corresponde ao atributo 'nome' no modelo Suporte
            email: email,               // Corresponde ao atributo 'email' no modelo Suporte
            mensagem: mensagem          // Corresponde ao atributo 'mensagem' no modelo Suporte
        });
        req.flash('success_msg', 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
        res.redirect('/suporte');
    } catch (error) {
        console.error('Erro ao tentar salvar mensagem de suporte no BD:', error);
        req.flash('error_msg', 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
        res.redirect('/suporte');
    }
});

module.exports = router;