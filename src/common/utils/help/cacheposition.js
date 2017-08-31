

window.routerPositionCache = {};




export default {


    set(routerKey,scrollTop){
        window.routerPositionCache[routerKey] = scrollTop;
    },
    get(routerKey){
        return window.routerPositionCache[routerKey] || 0;

    }


}