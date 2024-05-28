let listaDeCompras = []; // Iniciando o Array
let itemAEditar;

const form = document.getElementById('form-itens'); // Buscando o form
const itensInput = document.getElementById('receber-item'); // Buscando o input
const ulItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeCompras');

function atualizaLocalStorage() {
  localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
}
if (listaRecuperada) {
  debugger
  listaDeCompras = JSON.parse(listaRecuperada);
  mostrarItem()
} else {
  listaDeCompras = []
}
form.addEventListener('submit', (evento) => { // Criando um evento de submit do form
  evento.preventDefault(); // Criando uma prevenção de default para impedir o carregamento da página ao salvar o item
  salvarItens(); // Chamando a função de salvar item
  mostrarItem();
  itensInput.focus();
  itensInput.value = ''; // Limpando o input ao clicar no botão 

});

function salvarItens() { // Criando a função de salvar item
  const comprasItens = itensInput.value; // Criando uma constante e atribuindo a constante criada do input
  const checarDuplicado = listaDeCompras.some((elemento) => elemento.valor.toUpperCase() === comprasItens.toUpperCase()); // Criando uma comparação, para verificar a existência do item na lista
  if (checarDuplicado) { // Se já existir 
    alert('Item existente');
  } else { // Se não
    listaDeCompras.push({
      valor: comprasItens, // Atribuindo o valor do input no array em forma de objeto, com a propriedade valor.
      checar: false
    });

  }
}

function mostrarItem() {
  ulItens.innerHTML = '';
  ulItensComprados.innerHTML = '';
  listaDeCompras.forEach((elemento, index) => {
    if (elemento.checar) {
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>`;
    } else {
      ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disable': ''}></input>
          </div>
          <div>


          <div>
              ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
              <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>`;
    }
  });

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

  inputsCheck.forEach(i => {
    i.addEventListener('click', (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeCompras[valorDoElemento].checar = evento.target.checked;
      mostrarItem();
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");

  deletarObjetos.forEach((i, index) => {
    i.addEventListener('click', () => {
      listaDeCompras.splice(index, 1);
      mostrarItem();
    })
  })
  const editarItem = document.querySelectorAll('.editar');


  editarItem.forEach((i, index) => {
    i.addEventListener('click', () => {
      itemAEditar = index;
      mostrarItem();
    });
  });
  atualizaLocalStorage()
}

function salvarEdicao() {
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
  console.log(itemEditado.value);
  listaDeCompras[itemAEditar].valor = itemEditado.value;
  itemAEditar = -1;
  mostrarItem();
}