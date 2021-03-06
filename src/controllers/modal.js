export default class ModalController{

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderModal();
    }

    updateHandlers = () => {
        this.view.showModal();
    }

    onShowModal = (e) => {
        console.log(e);
        // this.view.updateModal()
    }

}