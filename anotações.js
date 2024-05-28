let dadosBancarios = [];

function adicionarDados(nome, cpf) {
  dadosBancarios.push({
    nome: nome.toUpperCase(),
    cpf: cpf.toUpperCase(),
  })
}

adicionarDados('Daniel', '09738491932')
dadosBancarios.forEach((elemento, indice, array) => {
  console.log(elemento.nome, indice, array)
})