import axios from "axios";

export default class Tables {

    constructor() {
        this.tableList = [];
        this.lasTable = [];
    }

    getAllTables = () => {
        axios.get('http://localhost:3000/treinos')
        .then((response)=>{
            this.tableList = response.data;
        })
    }
}