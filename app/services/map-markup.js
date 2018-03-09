import Service from '@ember/service';

export default Service.extend({
    init() {
        if (!this.get('mapMarkups')) {
            this.set('mapMarkup', []);
        }
        if (!this.get('drawingManager')) {
            this.set('drawingManager', null);
        }
    },
});
