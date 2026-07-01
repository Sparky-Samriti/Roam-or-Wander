document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById('map');

    // 1. Extract the token and listing data from the HTML element
    const mapToken = mapElement.getAttribute('data-token');

    // Parse the JSON string back into a usable JavaScript object
    const listingData = JSON.parse(mapElement.getAttribute('data-listing'));

    // 1. SAFETY CHECK: Check if listing and coordinates actually exist
    if (!listingData || !listingData.geometry || !listingData.geometry.coordinates) {
        console.error("Map Error: Listing coordinates are missing entirely!");
        // Default fallback coordinates (e.g., center of the world [0, 0] or New York) so the page doesn't crash
        var coordinates = [0, 0];
    } else {
        var coordinates = listingData.geometry.coordinates;
    }

    // 2. Authenticate MapTiler
    maptilersdk.config.apiKey = mapToken;

    // 3. Initialize Map (Using hardcoded coordinates for now, or listingData.geometry.coordinates if you have geocoding set up)
    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: coordinates,
        zoom: 9
    });

    // After initializing your map : That's for calculating vw and % css values after every load.
    map.on('load', function () {
        map.resize();
    });

    // 4. Build the Popup HTML using the dynamic image URL
    const popupHtml = `
        <div style="padding: 5px; max-width: 200px;">
            <h4 style="margin: 0 0 5px 0; font-size: 14px;">${listingData.title}</h4>
            <p style="margin: 0 0 5px 0; color: #555; font-size: 12px;">${listingData.location}</p>
        </div>
    `;

    const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(popupHtml);

    // 5. Place the Marker
    new maptilersdk.Marker({ color: "#ff385c" })
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map);
});