//-----------------------------------------------------------------------------------------------------------
// Função: validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto)
// Verifica se foram informados o nome e o código do produto
// Parâmetros:
// - idNomeProduto: id do campo que contém o nome do produto
// - idCodProduto: id do campo que contém o código do produto
// - idQtidadeProduto: id do campo que contém a quantidade do produto
// OBS: Se faltar alguma informação (nome ou código do produto) aparecerá uma mensagem de erro. Em caso de 
// sucesso (todas as informações preenchidas), chama a função cadastrarProduto(...)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, parseInt(qtidade));
}
//-----------------------------------------------------------------------------------------------------------
// Função: cadastrarProduto(produto, codig, qtidade)
// Cadastra um novo produto (nome, código e quantidade) no estoque
// Parâmetros:
// - produto: nome do produto a ser cadastrado no estoque (Ex: arroz)
// - codig: código do produto a ser cadastrado no estoque (Ex: a01)
// - qtidade: quantidade do produto a ser cadastrado no estoque (Ex: 7)
// OBS: Apos cadastrar o novo produto no estoque, atualiza a quantidade de itens no carrinho, ou seja, chama 
// a função atualizarTotalEstoque()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function cadastrarProduto(produto, codigo, qtidade) {
    let novoProduto = { nome: produto, codigo: codigo, quantidade: qtidade };

    if (typeof Storage !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos === null) produtos = [];
        else produtos = JSON.parse(produtos);

        // Verifique se o produto com o mesmo nome ou código já existe
        const produtoExistente = produtos.find(item => item.nome === produto || item.codigo === codigo);
        if (produtoExistente) {
            alert("Produto com o mesmo nome ou código já cadastrado!");
        } else {
            produtos.push(novoProduto);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            alert("Foram cadastradas com sucesso " + qtidade + " unidades do produto " + produto + "!");
            atualizarTotalEstoque("totalEstoque");
            location.reload();
        }
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os itens do estoque (nome, código e quantidade)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}


function validarFuncionario(idNomeFuncionario, idFuncaoFuncionario) {
    console.log("teste")
    let nome = document.getElementById(idNomeFuncionario).value;
    let funcao = document.getElementById(idFuncaoFuncionario).value;

    if (nome == "")
        alert("Nome do funcionário não pode estar em branco. Favor preenchê-lo!");
    else if (funcao == "")
        alert("Função do funcionário não pode estar em branco. Favor preenchê-la!");
    else cadastrarFuncionario(nome, funcao);
}

function cadastrarFuncionario(nome, funcao) {
    let novoFuncionario = { nome: nome, funcao: funcao };

    if (typeof Storage !== "undefined") {
        let funcionarios = localStorage.getItem("funcionarios");
        if (funcionarios === null) funcionarios = [];
        else funcionarios = JSON.parse(funcionarios);

        // Verifique se o funcionário com o mesmo nome já existe
        const funcionarioExistente = funcionarios.find(item => item.nome === nome);
        if (funcionarioExistente) {
            alert("Funcionário com o mesmo nome já cadastrado!");
        } else {
            funcionarios.push(novoFuncionario);
            localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
            alert("Funcionário cadastrado com sucesso: " + nome + " - Função: " + funcao);
            // Adicione qualquer outra lógica necessária aqui
        }
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
    }

    function listarFuncionarios() {
        if (typeof(Storage) !== "undefined") {
            let funcionarios = localStorage.getItem("funcionarios");
            document.write("<h1>Lista de Funcionários:</h1>");
            if (funcionarios == null)
                document.write("<h3>Ainda não há nenhum funcionário cadastrado</h3>");
            else {
                funcionarios = JSON.parse(funcionarios);
                funcionarios.forEach(funcionario => {
                    document.write("<ul>");
                    document.write("<li>Nome do funcionário: " + funcionario.nome + "</li>");
                    document.write("<li>Função do funcionário: " + funcionario.funcao + "</li>");
                    document.write("</ul>");
                });
            }
        } 
        else {
            alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar a lista de funcionários!");
        }
    }
    





