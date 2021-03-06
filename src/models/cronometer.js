export default class CronometerModel {

    constructor() {
        this.timeWorker = null;
    }

    createTimeWorker() {
        if (typeof(Worker)!=="undefined"){
            if (this.timeWorker==null) this.timeWorker = new Worker("src/services/timer.js");
        }
    }

    destroyTimeWorker() {
        if(this.timeWorker){
            this.timeWorker.terminate();
            this.timeWorker = null;
        }
    }       
}
