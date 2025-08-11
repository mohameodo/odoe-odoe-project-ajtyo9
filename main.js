document.addEventListener('DOMContentLoaded', () => {

    // --- DATA --- //
    const locations = [
        { name: 'Yosemite National Park', coords: [37.8651, -119.5383], description: 'A spectacular granite-cliffed valley in California.' },
        { name: 'Yellowstone National Park', coords: [44.4280, -110.5885], description: 'Home to geysers and abundant wildlife.' },
        { name: 'Grand Canyon National Park', coords: [36.1069, -112.1129], description: 'A mile-deep gorge carved by the Colorado River.' },
        { name: 'Zion National Park', coords: [37.2982, -113.0263], description: 'Utah\'s premier park with massive sandstone cliffs.' },
        { name: 'Banff National Park', coords: [51.4968, -115.9281], description: 'Canada\'s oldest national park, in the Rocky Mountains.' },
        { name: 'Torres del Paine', coords: [-50.9423, -72.9654], description: 'A stunning national park in Chilean Patagonia.' },
        { name: 'Fiordland National Park', coords: [-45.4145, 167.7155], description: 'Home to the dramatic Milford Sound in New Zealand.' }
    ];

    // --- MAP INITIALIZATION --- //
    const map = L.map('map').setView([40, -98], 4); // Centered on the US

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // --- UI ELEMENTS --- //
    const locationsList = document.getElementById('locations-list');
    const startPointSelect = document.getElementById('start-point');
    const endPointSelect = document.getElementById('end-point');
    const findRouteBtn = document.getElementById('find-route-btn');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    let routeControl = null;

    // --- FUNCTIONS --- //

    // Populate UI elements with location data
    const populateUI = () => {
        locations.forEach((location, index) => {
            // Populate sidebar list
            const locationEl = document.createElement('div');
            locationEl.innerHTML = `<i class="fas fa-map-marker-alt text-nature-green-light mr-2"></i> ${location.name}`;
            locationEl.className = 'p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors';
            locationEl.addEventListener('click', () => {
                map.flyTo(location.coords, 10);
                // Find the corresponding marker and open its popup
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker && layer.getLatLng().equals(L.latLng(location.coords))) {
                        layer.openPopup();
                    }
                });
            });
            locationsList.appendChild(locationEl);

            // Populate dropdowns
            const option = document.createElement('option');
            option.value = index;
            option.textContent = location.name;
            startPointSelect.appendChild(option.cloneNode(true));
            endPointSelect.appendChild(option.cloneNode(true));
        });
        endPointSelect.selectedIndex = 1; // Default to a different end point
    };

    // Add markers to the map
    const addMarkers = () => {
        locations.forEach(location => {
            const customIcon = L.divIcon({
                html: '<i class="fas fa-tree text-2xl text-nature-green"></i>',
                className: 'custom-map-icon',
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            });

            const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div class="location-popup">
                    <h3>${location.name}</h3>
                    <p>${location.description}</p>
                </div>
            `;
            marker.bindPopup(popupContent);
        });
    };

    // Find and display a route
    const findRoute = () => {
        if (routeControl) {
            map.removeControl(routeControl);
        }

        const startLocation = locations[startPointSelect.value];
        const endLocation = locations[endPointSelect.value];

        if (startLocation.name === endLocation.name) {
            alert('Please select two different locations for the route.');
            return;
        }

        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(startLocation.coords),
                L.latLng(endLocation.coords)
            ],
            routeWhileDragging: false,
            show: false, // Hides the default instructions panel
            addWaypoints: false,
            createMarker: () => null // Prevent default markers
        }).addTo(map);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    // --- EVENT LISTENERS --- //
    findRouteBtn.addEventListener('click', findRoute);
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    // --- INITIALIZATION CALLS --- //
    populateUI();
    addMarkers();
});