export default class TemposModel {

    constructor(treinoID) {
        this.treinoID = treinoID;
    }

    getTempos = async () => {
        const result = axios.get('http://localhost:3000/tempos/' + this.treinoID)
            .then((response) => {
                return response.data;

            })

        return result;
    }
}