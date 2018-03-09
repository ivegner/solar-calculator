export function polygonArea(polygon) {
    /* Compute polygon area */
    const computeArea = window.google.maps.geometry.spherical.computeArea
    var path = polygon.getPath();

    return computeArea(path);
}

export function popupPlacement(polygon) {
    /*
    Computes aesthetically pleasing popup placement
    If there is one clearly more Northern vertex, place popup there
    If there are 2 almost-same-latitude vertices, place popup at their midpoint
    */
    var northernmost;
    var secondNorthernmost;
    const computeHeading = window.google.maps.geometry.spherical.computeHeading;

    var isAlmostSameLat = function(start, end) {
        var heading = computeHeading(start, end);
        return Math.abs(heading) > 70;
    };

    polygon.getPath().forEach(function(element) {
        // If they're the first element checked, they are the most northern so far
        if (northernmost == null) {
            northernmost = element;
        }
        // More north than the current most northern
        else if (element.lat() > northernmost.lat()){
            // If the current most northern fits the secondNorthern criteria
            secondNorthernmost = isAlmostSameLat(northernmost, element) ? northernmost : secondNorthernmost;
            northernmost = element;
        }
        else {
            // If secondNorth isn't assigned and element is almost horizontal,
            // or if it is assigned and element is more horizontal than the current secondNorth
            if ((secondNorthernmost == null && isAlmostSameLat(element, northernmost)) ||
                (secondNorthernmost != null && element.lat() > secondNorthernmost.lat())){
                    secondNorthernmost = element;
                 }
        }
    });

    if (secondNorthernmost != null) {
        return window.google.maps.geometry.spherical.interpolate(northernmost, secondNorthernmost, 1/2)
    }
    else {
        return northernmost;
    }
    // /* Compute the placement of a popup by its bounding rectangle */
    // var bounds = new window.google.maps.LatLngBounds();

    // // Build bounding rectangle
    // polygon.getPath().forEach(function(element,index) {
    //     bounds.extend(element)
    //   });

    // // Find center of bounding rectangle
    // var center = bounds.getCenter();
    // var ne = bounds.getNorthEast();

    // var placement = {
    //     lat: ne.lat,
    //     lng: center.lng
    // }
    // return placement;
}


export function definePopupClass() {
    // Taken from https://developers.google.com/maps/documentation/javascript/examples/overlay-popup
    class Popup extends window.google.maps.OverlayView{
        constructor(position, text) {
            super(position, {});
            this.position = position;

            var content = document.createElement('div');
            content.innerHTML = text;
            content.classList.add('popup-bubble-content');
            document.getElementById('mapContainer').appendChild(content);

            var pixelOffset = document.createElement('div');
            pixelOffset.classList.add('popup-bubble-anchor');
            pixelOffset.appendChild(content);

            this.anchor = document.createElement('div');
            this.anchor.classList.add('popup-tip-anchor');
            this.anchor.appendChild(pixelOffset);
        }

        /** Called when the popup is added to the map. */
        onAdd() {
            this.getPanes().floatPane.appendChild(this.anchor);
        }

        onRemove () {
            if (this.anchor.parentElement) {
                this.anchor.parentElement.removeChild(this.anchor);
            }
        }

        /** Called when the popup needs to draw itself. */
        draw () {
            var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
            // Hide the popup when it is far out of view.
            var display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

            if (display === 'block') {
                this.anchor.style.left = divPosition.x + 'px';
                this.anchor.style.top = divPosition.y + 'px';
            }
            if (this.anchor.style.display !== display) {
                this.anchor.style.display = display;
            }
        }
    }

    return Popup;
}