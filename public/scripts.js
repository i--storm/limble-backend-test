const { createApp, ref } = Vue

createApp({
    data() {
        return {
            w_workers: [],
            w_locations: [],
            w_is_complete: "",
            l_workers: [],
            l_locations: [],
            l_is_complete: "",
        }
    },
    beforeMount() {
        this.getWorkers();
        this.getLocations();
        this.getWorkersPie();
        this.getLocationsPie();
    },
    setup() {
        //this.data.workers = []
        /*return {
            workers
        }*/
    },
    methods: {
        async getWorkers() {
            let res = await axios.get('/get/workers');
            let workers = res.data;
            for(let i=0; i<workers.length; i++){
                workers[i]['is_checked'] = false;
            }
            this.w_workers = JSON.parse(JSON.stringify(workers));
            this.l_workers = JSON.parse(JSON.stringify(workers));
        },
        async getLocations() {
            let res = await axios.get('/get/locations');
            let locations = res.data;
            for(let i=0; i<locations.length; i++){
                locations[i]['is_checked'] = false;
            }
            this.w_locations = JSON.parse(JSON.stringify(locations));
            this.l_locations = JSON.parse(JSON.stringify(locations));
        },
        async getWorkersPie(){
            console.log("getWorkersPie")

            let worker_ids = [];
            let location_ids = [];
            let is_complete = null;

            for(let i=0; i<this.w_workers.length; i++){
                if(this.w_workers[i].is_checked === true) {
                    worker_ids.push(this.w_workers[i].id);
                }
            }

            for(let i=0; i<this.w_locations.length; i++){
                if(this.w_locations[i].is_checked === true) {
                    location_ids.push(this.w_locations[i].id);
                }
            }

            if(this.w_is_complete === "0"){
                is_complete = false;
            }else if(this.w_is_complete === "1"){
                is_complete = true;
            }

            let res = await axios.post('/tasks/worker',{
                "is_complete": is_complete,
                "location_ids": location_ids,
                "worker_ids": worker_ids
            });

            var data = {
                values: [],
                labels: [],
                type: 'pie',
                title: "Workers",
                textinfo: "label+value+percent",
                textposition: "outside",
                automargin: true,
                hole: .4,
            };

            let summ = 0;
            for(var i=0; i<res.data.tasks.length; i++){
                data.values.push(parseInt(res.data.tasks[i].cost));
                data.labels.push(res.data.tasks[i].username);
                summ += parseInt(res.data.tasks[i].cost);
            }

            data.title = data.title +" "+ summ;

            var layout = {

                width: "100%",
                margin: {"t": 0, "b": 0, "l": 0, "r": 0},
                showlegend: false,
            };

            Plotly.newPlot('pie_workers', [data], layout);
        },

        async getLocationsPie(){

            let worker_ids = [];
            let location_ids = [];
            let is_complete = null;

            for(let i=0; i<this.l_workers.length; i++){
                if(this.l_workers[i].is_checked === true) {
                    worker_ids.push(this.l_workers[i].id);
                }
            }

            for(let i=0; i<this.l_locations.length; i++){
                if(this.l_locations[i].is_checked === true) {
                    location_ids.push(this.l_locations[i].id);
                }
            }

            if(this.l_is_complete === "0"){
                is_complete = false;
            }else if(this.l_is_complete === "1"){
                is_complete = true;
            }

            let res = await axios.post('/tasks/location',{
                "is_complete": is_complete,
                "location_ids": location_ids,
                "worker_ids": worker_ids
            });

            var data = {
                values: [],
                labels: [],
                type: 'pie',
                title: "Locations",
                textinfo: "label+value+percent",
                textposition: "outside",
                automargin: true,
                hole: .4,
            };

            let summ = 0;
            for(var i=0; i<res.data.tasks.length; i++){
                data.values.push(parseInt(res.data.tasks[i].cost));
                data.labels.push(res.data.tasks[i].name);
                summ += parseInt(res.data.tasks[i].cost);
            }

            data.title = data.title +" "+ summ;

            var layout = {
                width: "100%",
                margin: {"t": 0, "b": 0, "l": 0, "r": 0},
                showlegend: false,
            };

            Plotly.newPlot('pie_locations', [data], layout);
        }

    }
}).mount('#app')