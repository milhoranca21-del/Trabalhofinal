import express from 'express';

import session from 'express-session';

const host = '0.0.0.0';

const porta = 3010;

const app = express();

var listalivros = [];
var listaleitores = []

app.use(express.urlencoded({ extended: true }));

app.use(session({

    secret: 'm1nh4ch4ve',
    resave: true,
    saveUninitialized: true,
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
    }
}));

app.get('/', Autenticado, (req, res) => {

    res.write(`
        <!doctype html>
        <html lang="pt-br">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Biblioteca - Início</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
              <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                  
                  <ul class="navbar-nav me-auto">

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        Livros
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/cadastro_livro">Cadastrar Livro</a></li>
                        <li><a class="dropdown-item" href="/lista_livros">Lista de Livros</a></li>
                      </ul>
                    </li>

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        Leitores
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/cadastro_leitor">Cadastrar Leitor</a></li>
                        <li><a class="dropdown-item" href="/lista_leitores">Lista de Leitores</a></li>
                      </ul>
                    </li>

                  </ul>

                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link text-danger" href="/logout">Logout</a>
                    </li>
                  </ul>

                </div>
              </div>
            </nav>

            <div class="container my-5">
              
              <div class="p-5 mb-4 bg-light rounded-3 border shadow-sm text-center">
                <div class="container-fluid py-5">
                  <h1 class="display-5 fw-bold text-dark">Bem-vindo à sua Biblioteca</h1>
                  <p class="fs-4 text-muted">
                    Aqui você pode organizar seus livros e acompanhar seus leitores de forma simples e prática.
                  </p>
                </div>
              </div>

              <div class="row g-4">
                
                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body p-4 bg-dark text-white rounded-3">
                      <h2 class="h3">Livros</h2>
                      <p>
                        Cadastre novos livros, atualize informações e acompanhe facilmente o status de cada exemplar.
                      </p>
                      <a href="/cadastro_livro" class="btn btn-outline-light mt-2">
                        Gerenciar Livros
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body p-4 bg-secondary text-white rounded-3">
                      <h2 class="h3">Leitores</h2>
                      <p>
                        Consulte os usuários cadastrados, adicione novos leitores e acompanhe o histórico de empréstimos.
                      </p>
                     <a href="/cadastro_leitor" class="btn btn-outline-light mt-2">
                        Gerenciar Leitores
                      </a>
                    </div>
                  </div>
                </div>

              </div> 
            </div> 

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>
    `);

    res.end();

});

app.get('/cadastro_livro', Autenticado, (req, res) => {

    res.write(`
        <!doctype html>
        <html lang="pt-br">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro de Livro</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>

            
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
              </div>
            </nav>

           
            <div class="container my-5">

              <div class="card shadow-sm">
                <div class="card-body p-4">
                  
                  <h2 class="mb-4">📘 Cadastro de Livro</h2>

                  <form method="POST" action="/cadastro_livro">

                    
                    <div class="mb-3">
                      <label class="form-label">Título do Livro</label>
                      <input type="text" name="titulo" id="titulo"class="form-control" >
                    </div>

                    
                    <div class="mb-3">
                      <label class="form-label">Nome do Autor</label>
                      <input type="text" name="autor" id="autor" class="form-control" >
                    </div>

                    
                    <div class="mb-3">
                      <label class="form-label">Código ISBN</label>
                      <input type="text" name="isbn" id="isbn" class="form-control" placeholder="Ex: 978-85-1234-567-8" >
                    </div>

                    <div class="d-flex justify-content-between">
                      <a href="/" class="btn btn-secondary">Voltar</a>
                      <button type="submit" class="btn btn-primary">
                        Cadastrar Livro
                      </button>
                    </div>

                  </form>

                </div>
              </div>

            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>
    `);

    res.end();

});

app.post('/cadastro_livro',  Autenticado, (req, res) => {

    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const isbn = req.body.isbn;

    if (!titulo || !autor || !isbn) {

        let html = `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro de Livro</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
              </div>
            </nav>

            <div class="container mt-5">
                <h2 class="mb-4">Cadastro de Livro</h2>

                <form action="/cadastro_livro" method="POST">

                    <div class="mb-3">
                        <label class="form-label">Título do Livro</label>
                        <input type="text" class="form-control" name="titulo" id="titulo"value="${titulo}">
                    </div>
        `;

        if (!titulo) {
            html += `<div class="alert alert-danger">Por favor informe o título do livro !!!</div>`;
        }

        html += `
                    <div class="mb-3">
                        <label class="form-label">Nome do Autor</label>
                        <input type="text" class="form-control" name="autor" id="autor" value="${autor}">
                    </div>
        `;
        if (!autor) {
            html += `<div class="alert alert-danger">Por favor informe o autor !!!</div>`;
        }

        html += `
                    <div class="mb-3">
                        <label class="form-label">Código ISBN</label>
                        <input type="text" class="form-control" name="isbn" id="isbn" value="${isbn}">
                    </div>
        `;
        if (!isbn) {
            html += `<div class="alert alert-danger">Por favor informe o ISBN !!!</div>`;
        }

        html += `
                    <button type="submit" class="btn btn-primary">Cadastrar Livro</button>
                </form>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `;

        res.write(html);
        res.end();

    } else {

        
        listalivros.push({
            titulo: titulo,
            autor: autor,
            isbn: isbn
        });

        res.redirect("/lista_livros");
    }

});

app.get("/lista_livros",  Autenticado, (req, res) => {
    res.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lista de Livros</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
        </div>
    </nav>


        <div class="container my-5">
            <h2 class="mb-4">Lista de Livros</h2>

            <table class="table table-striped table-bordered">
                <thead class="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody class="text-center">
    `);

    
    for (let i = 0; i < listalivros.length; i++) {
        res.write(`
            <tr>
                <td>${i + 1}</td>
                <td>${listalivros[i].titulo}</td>
                <td>${listalivros[i].autor}</td>
                <td>${listalivros[i].isbn}</td>
            </tr>
        `);
    }

    res.write(`
                </tbody>
            </table>

            <a href="/cadastro_livro" class="btn btn-primary mt-3">Cadastrar Novo Livro</a>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `);

    res.end();
});

app.get('/cadastro_leitor', Autenticado, (req, res) => {

    let html = `
        <!doctype html>
        <html lang="pt-br">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro de Leitor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
              </div>
            </nav>

            <div class="container my-5">
              <div class="card shadow-sm">
                <div class="card-body p-4">
                  
                  <h2 class="mb-4">📖 Cadastro de Leitor</h2>

                  <form method="POST" action="/cadastro_leitor">

                    <div class="mb-3">
                      <label class="form-label">Nome do Leitor</label>
                      <input type="text" name="nome" class="form-control">
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Livro Emprestado</label>
                      <select name="livro" class="form-select">
                        <option value="">Selecione um livro</option>
    `;

    
    for (let i = 0; i < listalivros.length; i++) {
        html += `
            <option value="${listalivros[i].titulo}">
                ${listalivros[i].titulo}
            </option>
        `;
    }

    html += `
                      </select>
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Data de Empréstimo</label>
                      <input type="date" name="data" class="form-control">
                    </div>

                    <div class="d-flex justify-content-between">
                      <a href="/" class="btn btn-secondary">Voltar</a>
                      <button type="submit" class="btn btn-primary">
                        Salvar Leitor
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>
    `;

    res.write(html);
    res.end();

});

app.post('/cadastro_leitor', Autenticado, (req, res) => {

    const nome = req.body.nome;
    const livro = req.body.livro;
    const data = req.body.data;

    if (!nome || !livro || !data) {

        let html = `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro de Leitor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
              </div>
            </nav>

            <div class="container mt-5">
                <h2 class="mb-4">Cadastro de Leitor</h2>

                <form action="/cadastro_leitor" method="POST">

                    <div class="mb-3">
                        <label class="form-label">Nome do Leitor</label>
                        <input type="text" class="form-control" name="nome" value="${nome || ''}">
                    </div>
        `;

        if (!nome) {
            html += `<div class="alert alert-danger">Por favor informe o nome !!!</div>`;
        }

        html += `
            <div class="mb-3">
                <label class="form-label">Livro Emprestado</label>
                <select name="livro" class="form-select">
                    <option value="">Selecione um livro</option>
        `;

        if (listalivros.length === 0) {
            html += `<option disabled>Nenhum livro cadastrado</option>`;
        }

        for (let i = 0; i < listalivros.length; i++) {
            html += `
                <option value="${listalivros[i].titulo}" ${livro == listalivros[i].titulo ? 'selected' : ''}>
                    ${listalivros[i].titulo}
                </option>
            `;
        }

        html += `
                </select>
            </div>
        `;

        if (!livro) {
            html += `<div class="alert alert-danger">Por favor informe o livro !!!</div>`;
        }

        html += `
            <div class="mb-3">
                <label class="form-label">Data de Empréstimo</label>
                <input type="date" class="form-control" name="data" value="${data || ''}">
            </div>
        `;

        if (!data) {
            html += `<div class="alert alert-danger">Por favor informe a data !!!</div>`;
        }

        html += `
            <button type="submit" class="btn btn-primary">Cadastrar Leitor</button>
            </form>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `;

        res.write(html);
        res.end();

    } else {

        listaleitores.push({
            nome: nome,
            livro: livro,
            data: data
        });

        res.redirect("/lista_leitores");
    }

});

app.get("/lista_leitores", Autenticado, (req, res) => {
    res.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Lista de Leitores</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
            </div>
        </nav>

        <div class="container my-5">
            <h2 class="mb-4">Lista de Leitores</h2>

            <table class="table table-striped table-bordered">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Nome</th>
                        <th>Livro Emprestado</th>
                        <th>Data de Empréstimo</th>
                    </tr>
                </thead>
                <tbody class="text-center">
    `);

    for (let i = 0; i < listaleitores.length; i++) {
        res.write(`
            <tr>
                <td>${listaleitores[i].nome}</td>
                <td>${listaleitores[i].livro}</td>
                <td>${listaleitores[i].data}</td>
            </tr>
        `);
    }

    res.write(`
                </tbody>
            </table>

            <a href="/cadastro_leitor" class="btn btn-primary mt-3">
                Cadastrar Novo Leitor
            </a>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `);

    res.end();
});

app.get('/login', (req, res) => {

    res.write(`

        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="/">📚 Biblioteca</a>
                </div>
            </nav>

            <div class="container my-5">
                <h2 class="mb-4">Login</h2>

                <form action="/login" method="POST">

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="text" class="form-control" placeholder="Digite o usuário" name="email" id="email">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Senha</label>
                        <input type="password" class="form-control" placeholder="Digite a senha" name="senha" id="senha">
                    </div>

                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                        <a href="/" class="btn btn-secondary">Voltar</a>
                    </div>

                </form>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>

    `);

    res.end();

});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if(email === 'admin@teste.com.br' && senha === 'admin'){
        req.session.logado = true;
        res.redirect('/'); 
    } else {
        res.redirect('/login');
    }
});

function Autenticado(req,res,proximo){

    if(req.session?.logado){
        proximo();

    }else{
        res.redirect("/login");
    }
}

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login");
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});