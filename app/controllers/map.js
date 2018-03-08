import Controller from '@ember/controller';

export default Controller.extend({
    coords: {
        lat: 40.7127753,
        lng: -74.0059728
      },
    address: 'New York, NY, USA',
    map: null,
    actions: {
        onMapLoad({ map, /*publicAPI*/ }) {
            // map is instance of the Google Map
            // publicAPI contains polylines, markers, etc.
            this.set('map', map);
        },
        onPlaceChanged(place) {
            this.set('coords', {
                lat: place['geometry']['location'].lat(),
                lng: place['geometry']['location'].lng()
            });
            this.set('address', place['formatted_address']);
            this.map.panTo(this.get('coords'))
        },
        onClick(event) {
            var lat = event['event']['latLng']['lat']();
            var lng = event['event']['latLng']['lng']();
            console.log(lat, lng);
        }
      }
});
