//Exibe a modal
function showModal() {
    document.querySelector('.custom-modal').style.display = "block";
}

//Esconde a modal
function hideModal() {
    document.querySelector('.custom-modal').style.display = "none";
}

//Bloqueia o scroll no body
function blockScroll() {
    document.querySelector('body').style.overflow = "hidden";
}

//Desbloqueia o scroll no body
function unlockScroll() {
    document.querySelector('body').style.overflow = "auto";
}

//Adiciona o conteúdo da modal
function setModalContent(title, html) {

    document.querySelector('.custom-modal-title').innerHTML = title;
    document.querySelector('.custom-modal-content-inner').innerHTML = html;

}

//Limpa o conteúdo da modal
function clearModalContent() {

    document.querySelector('.custom-modal-title').innerHTML = "";
    document.querySelector('.custom-modal-content-inner').innerHTML = "";

}

//Handler do fechamento da modal
function handlerModalClose() {
    document.querySelector('.close-custom-modal').onclick = () =>{
        unlockScroll();
        hideModal();
        clearModalContent();
    }
}


export { blockScroll, showModal, setModalContent, handlerModalClose };