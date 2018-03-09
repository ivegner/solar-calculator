import Component from '@ember/component';
import {inject as service} from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
    mapMarkup: service(),
    map: alias('mapMarkup.map'),
    dm: alias('mapMarkup.dm'),

    didInsertElement() {
        // bug workaround in ember-radio-button
        this.$('#panButton').parent().addClass('active');
    },

    actions: {
        activateDraw(){
            console.log('activate draw');
            this.get('dm').set('map', this.get('map'));

            //ember-radio-button bug workaround, part 2
            this.$('#panButton').parent().removeClass('active');
        },
        deactivateDraw(){
            console.log('deactivate draw');
            this.get('dm').setMap(null);
        }
    }
});
