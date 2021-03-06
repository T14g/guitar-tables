export default class ModalView {

    constructor(rootElement) {
        this.app = this.getElement(rootElement);
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    showModal = () => {
        this.getElement('.custom-modal').style.display = 'block';
    }

    hideModal = () => {
        this.getElement('.custom-modal').style.display = 'none';
    }

    blockScroll = () => {
        this.getElement('body').style.overflow = 'hidden';
    }

    unlockScroll = () => {
        this.getElement('body').style.overflow = 'auto';
    }

    updateModal = (title, precontent, content) => {
        this.getElement('.custom-modal-title').innerHTML = title;
        this.getElement('.custom-modal-precontent').innerHTML = precontent;
        this.getElement('.custom-modal-content-inner').innerHTML = content;
    }

    modalHTML = () => {
        let html = ``;
        html += `
        <div class="custom-modal">
        <div class="custom-modal-inner">
        <div class="custom-modal-content">
            <h3 class="custom-modal-title"></h3>
            <p class="custom-modal-precontent"></p>
            <hr>
            <div class="custom-modal-content-inner"></div>
            <button class="btn btn-info custom-btn-detalhes">Detalhes</button>
            <button class="btn btn-success custom-btn-totals">Totals</button>
            <button class="btn btn-danger close-custom-modal">Fechar</button>
        </div></div></div>`;

        return html;
    }

    renderModal = () => {
        this.app.insertAdjacentHTML('afterend', this.modalHTML());
    }

}