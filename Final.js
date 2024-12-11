const map = L.map('map').setView([12.9716, 77.5946], 13); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = [
            [12.9716, 77.5946], 
            [12.9668, 77.5950], 
            [12.9724, 77.6091], 
            [12.9344, 77.6101], 
            [12.9141, 77.6142], 
            [12.9719, 77.6412 ] 
        ];

        // Simulated database with AQI and traffic data
        const data = {
            "0-1": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "0-2": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "0-3": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "0-4": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "0-5": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "1-2": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "1-3": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "1-4": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "1-5": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "2-3": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "2-4": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "2-5": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "3-4": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "3-5": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
            "4-5": { AQI: Math.floor(Math.random() * (500 - 10 + 1)) + 10, Traffic: Math.floor(Math.random() * 5) + 1 },
        };

        points.forEach((point, index) => {
            L.marker(point).addTo(map).bindPopup(`Point ${index + 1}`).openPopup();
        });

        // Create a routing control but do not display it initially
        let routingControl = L.Routing.control({
            waypoints: [], // Start with no waypoints
            createMarker: function() { return null; }, // Hide default route markers
            routeWhileDragging: true
        }).addTo(map);

        // Hide the routing layer initially
        routingControl.getPlan().setWaypoints([]);

        // Function to route from selected Point A to Point B
        document.getElementById('routeAB').addEventListener('click', () => {
            const pointAIndex = parseInt(document.getElementById('pointB').value, 10) - 1;
            const pointBIndex = parseInt(document.getElementById('pointA').value, 10) - 1;

            if (pointAIndex >= 0 && pointAIndex < points.length && pointBIndex >= 0 && pointBIndex < points.length) {
                routingControl.setWaypoints([
                    L.latLng(points[pointAIndex]),
                    L.latLng(points[pointBIndex])
                ]);
            } else {
                alert('Please enter valid points between 1 and 6.');
            }
        });

        // Function to reroute and find an alternate path from Point A to Point B
        document.getElementById('reroute').addEventListener('click', () => {
    const pointAIndex = parseInt(document.getElementById('pointA').value, 10) - 1;
    const pointBIndex = parseInt(document.getElementById('pointB').value, 10) - 1;

    if (pointAIndex >= 0 && pointAIndex < points.length && pointBIndex >= 0 && pointBIndex < points.length) {
        let bestRoute = { average: Infinity, points: null };

        // Iterate over all possible routes to find the best alternative
        for (const key in data) {
            const indices = key.split('-').map(Number);
            // Match routes directly connecting Point A and Point B
            if (
                (indices[0] === pointAIndex && indices[1] === pointBIndex) ||
                (indices[1] === pointAIndex && indices[0] === pointBIndex)
            ) {
                const aqi = data[key].AQI;
                const traffic = data[key].Traffic;
                const average = (aqi / 500 + traffic / 5) / 2;

                // Update best route if current route has a lower average value
                if (average < bestRoute.average) {
                    bestRoute = {
                        average,
                        points: [
                            L.latLng(points[indices[0]]),
                            L.latLng(points[indices[1]])
                        ]
                    };
                }
            }
        }

        if (bestRoute.points) {
            routingControl.setWaypoints(bestRoute.points);
            alert(`Rerouted with average AQI-Traffic value: ${bestRoute.average.toFixed(2)}`);
        } else {
            alert('No alternate route found.');
        }
    } else {
        alert('Please enter valid points between 1 and 6.');
    }
});
