import express from 'express';

const host = '0.0.0.0';

const porta = 3010;

const app = express();

var listalivros = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

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
                      <button class="btn btn-outline-light mt-2">
                        Gerenciar Leitores
                      </button>
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

app.get('/cadastro_livro', (req, res) => {

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

app.post('/cadastro_livro', (req, res) => {

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
                        <input type="text" class="form-control" name="titulo" id="titulo "value="${titulo}">
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

app.get("/lista_livros", (req, res) => {
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

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});