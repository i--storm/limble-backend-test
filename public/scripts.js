fetch("http://127.0.0.1:3000/tasks/worker", {
    method: "POST",
    body: JSON.stringify({
        "is_complete": null,
        "location_ids": [],
        "worker_ids": []
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then((response) => response.json())
    .then((json) => {

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

        for(var i=0; i<json.tasks.length; i++){
            data.values.push(parseInt(json.tasks[i].cost));
            data.labels.push(json.tasks[i].username);
        }

        var layout = {

            width: "100%",
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false,
        };

        Plotly.newPlot('pie_workers', [data], layout);

    })
;

fetch("http://127.0.0.1:3000/tasks/location", {
    method: "POST",
    body: JSON.stringify({
        "is_complete": null,
        "location_ids": [],
        "worker_ids": []
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then((response) => response.json())
    .then((json) => {

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

        for(var i=0; i<json.tasks.length; i++){
            data.values.push(parseInt(json.tasks[i].cost));
            data.labels.push(json.tasks[i].name);
        }

        var layout = {
            width: "100%",
            margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: false,
        };

        Plotly.newPlot('pie_locations', [data], layout);

    })
;