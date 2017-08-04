
import store from 'flux'
import types from 'flux/types'
import CachePosition from 'utils/help/cacheposition';
 let bindScroll = function(){

    function scroll(fn) {
        window.addEventListener('scroll', () => {
            fn();
        }, false);
    }
    scroll(() => {
        let scrollTop = document.body.scrollTop;
        store.commit(types.APP.UPDATE_SCROLL_TOP,scrollTop);
        if(window.routerLoaded){

            CachePosition.set(store.state.route.path,scrollTop)


        }


    });
}



export  default {
     bindScroll
}