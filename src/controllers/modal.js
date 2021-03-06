export default class ModalController{

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderModal();
        this.setEventHandlers();
    }

    setEventHandlers = () => {
        document.querySelector('.close-custom-modal').addEventListener('click', this.onCloseModal);
    }

    onShowModal = (data) => {
        this.view.updateModal(data.title, data.pre, data.html);
        this.view.blockScroll();
        this.view.showModal();
    }

    onCloseModal = () => {
        this.view.unlockScroll();
        this.view.hideModal();
    }

}