import { getNewest, loadNewTable } from './treino.js';
import { loadTableList } from './table.js';
import { handlerModalClose } from './modal.js';

//Carrega a última tabela ao iniciar a aplicação
getNewest();

//Handler do fechamento da modal
handlerModalClose();

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

// getTempos("601624dedf11f42424c8df70");

