import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { definePopupClass, polygonArea, popupPlacement } from '../utils/polygon-funcs'

export default Controller.extend({
    coords: {
        lat: 40.7127753,
        lng: -74.0059728
      },
    address: 'New York, NY, USA',
    mapMarkup: service(),
    actions: {
        onMapLoad({ map, /*publicAPI*/ }) {
            // Fires once the Google Map is loaded
            // map is instance of the Google Map
            this.get('mapMarkup').set('map', map);  // To service to be accessible in map-markup

            // Sets up drawing tools. They are attached to the map in the map-markup component
            var drawingManager = new window.google.maps.drawing.DrawingManager({
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                drawingControl: false,
            });

            // To be attached and detached in map-markup component
            this.get('mapMarkup').set('dm', drawingManager);

            // Class for making area and power popups
            var Popup = definePopupClass();

            // Listens for completed polygons for further processing
            window.google.maps.event.addListener(this.get('mapMarkup').get('dm'), 'polygoncomplete', function(polygon) {
                var area = polygonArea(polygon);
                var placement = popupPlacement(polygon);

                // Nominal Power (kWh/day) = AREA * EFFICIENCY * AVERAGE INSOLATION
                // Assumptions: EFFICIENCY = avg(top 5 panel efficiencies) = (20.58+20.3+19+18.28+17.71)/5 = 19.17% = 0.1917
                //              AVERAGE INSOLATION = STC (Standard Testing Conditions) = 1000 W/m2 = 1 kW/m2
                // Source for efficiencies: https://tinyurl.com/ybj43pk5
                const EFFICIENCY = 0.1917, INSOLATION = 1;
                var nomPower = area * EFFICIENCY * INSOLATION;

                var popupText = "Area: " + area.toFixed(2) + " m&#178;<br/>" + "Power: " + nomPower.toFixed(2) + " kWh/day";
                var popup = new Popup(placement, popupText);
                popup.setMap(map);
                console.log("area: " + area + " power: " + nomPower);
            });

        },
        onPlaceChanged(place) {
            // Address changed
            this.set('coords', {
                lat: place['geometry']['location'].lat(),
                lng: place['geometry']['location'].lng()
            });
            this.set('address', place['formatted_address']);
            this.get('mapMarkup').get('map').panTo(this.get('coords'))
        }
      }
});
