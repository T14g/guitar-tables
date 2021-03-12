export default class CronometerModel {

    constructor() {
        this.timeWorker = null;
    }

    createTimeWorker() {
        if (typeof (Worker) !== "undefined") {
            if (this.timeWorker == null) this.timeWorker = new Worker("src/services/timer.js");
        }
    }

    destroyTimeWorker() {
        if (this.timeWorker) {
            this.timeWorker.terminate();
            this.timeWorker = null;
        }
    }

    saveTempo = async (data) => {
        return await axios.post('http://localhost:3000/tempos', {
            titulo: data.titulo,
            table_id: data.id_table,
            tempo: data.tempo
        }).then((response) => {
            return response;
        })
    }
}
