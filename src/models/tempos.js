export default class TemposModel {

    constructor() {
        this.tempos = [];
    }

    getTempos = async (id) => {
        const result = axios.get('http://localhost:3000/tempos/' + id)
            .then((response) => {
                this.tempos = response.data;
                return response.data;
            })

        return result;
    }

    saveTempo = (data) => {
        axios.post('http://localhost:3000/tempos', {
            titulo: data.titulo,
            table_id : data.id_table,
            tempo : data.tempo
        })
    }
}