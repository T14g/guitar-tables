export default class CronometerController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderCronometer();
    }
}
