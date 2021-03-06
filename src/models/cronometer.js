export default class CronometerModel {

    constructor() {
        this.time = '00:00:00';
        this.timeWorker = null;
    }

    createTimeWorker() {
        if (typeof(Worker)!=="undefined"){
            if (this.timeWorker==null) this.timeWorker = new Worker("src/services/timer.js");
        }
    }
          
}
