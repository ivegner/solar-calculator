import Controller from '@ember/controller';

export default Controller.extend({
    coords: {
        lat: 51.507568,
        lng: -0.127762
      },
    address: 'London, UK',
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
        }
      }
});
