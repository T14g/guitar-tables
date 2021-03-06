export default class ModalView {

    constructor(rootElement) {
        this.app = this.getElement(rootElement);
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    showModal = (e) => {
        this.getElement('.custom-modal').style.display = 'block';
    }

    updateModal = (data) => {
        this.getElement('.custom-modal-title').innerHTML = data.title;
        this.getElement('.custom-modal-precontent').innerHTML = data.precontent;
        this.getElement('.ccustom-modal-content-inner').innerHTML = data.content;
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