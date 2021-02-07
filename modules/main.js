import { getNewest, loadNewTable } from './treino.js';
import { loadTableList } from './table.js';

//Carrega a última tabela ao iniciar a aplicação
getNewest();


//Event listeners dos botões da nav
document.querySelector('.load-home').addEventListener('click', function(event){
    event.preventDefault();
    getNewest();
})

document.querySelector('.botao-nova').addEventListener('click', function(event){
    event.preventDefault();
    loadNewTable();
})

document.querySelector('.botao-listar').addEventListener('click', function(event){
    event.preventDefault();
    loadTableList();
})