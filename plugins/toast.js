import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    singleton: true,
    iconPack: 'mdi',
    duration: 2000,
    action : {
        icon : 'mdi-close',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    theme: 'toasted-primary'
})