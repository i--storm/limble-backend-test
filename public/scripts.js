const { createApp, ref } = Vue

createApp({
    data() {
        return {
            workers: [],
            locations: []
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
            this.workers = workers;

        },
        async getLocations() {
            let res = await axios.get('/get/locations');
            this.locations = res.data;
        },
        async getWorkersPie(){
            let res = await axios.post('/tasks/worker',{
                "is_complete": null,
                "location_ids": [],
                "worker_ids": []
            });

            var data = {
                values: [],
                labels: [],
                type: 'pie',
                title: "Workers",
                textinfo: "label+percent",
                textposition: "outside",
                automargin: true,
                hole: .4,
            };

            for(var i=0; i<res.data.tasks.length; i++){
                data.values.push(parseInt(res.data.tasks[i].cost));
                data.labels.push(res.data.tasks[i].username);
            }

            var layout = {

                width: "100%",
                margin: {"t": 0, "b": 0, "l": 0, "r": 0},
                showlegend: false,
            };

            Plotly.newPlot('pie_workers', [data], layout);
        },

        async getLocationsPie(){
            let res = await axios.post('/tasks/location',{
                "is_complete": null,
                "location_ids": [],
                "worker_ids": []
            });

            var data = {
                values: [],
                labels: [],
                type: 'pie',
                title: "Locations",
                textinfo: "label+percent",
                textposition: "outside",
                automargin: true,
                hole: .4,
            };

            for(var i=0; i<res.data.tasks.length; i++){
                data.values.push(parseInt(res.data.tasks[i].cost));
                data.labels.push(res.data.tasks[i].name);
            }

            var layout = {
                width: "100%",
                margin: {"t": 0, "b": 0, "l": 0, "r": 0},
                showlegend: false,
            };

            Plotly.newPlot('pie_locations', [data], layout);
        }

    }
}).mount('#app')