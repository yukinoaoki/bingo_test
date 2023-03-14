import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userid: 1,
        Tops: null,
        Bottoms: null,
        All_in_one: null,
        bingo: [],
        cloth: [],
        user: [],
    },
    mutations: {
        setUser(state, val) {
            state.user = val.user;
            state.userid = val.userid;
        },
        setBingo(state, val) {
            state.bingo = val.bingo;
        },
        setCloth(state, val) {
            state.cloth = val.cloth;
        },
    },
    actions: {},
    modules: {},
});