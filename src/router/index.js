import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Bingocard.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/bingocard",
		name: "Bingocard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Bingocard.vue"),
	},
	{
		path: "/closet",
		name: "Closet",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Closet.vue"),
	},
	{
		path: "/add",
		name: "Add",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Add.vue"),
	},
	// {
	//     path: "/test",
	//     name: "Test",
	//     // route level code-splitting
	//     // this generates a separate chunk (about.[hash].js) for this route
	//     // which is lazy-loaded when the route is visited.
	//     component: () =>
	//         import ( /* webpackChunkName: "about" */ "../views/Test.vue"),
	// },
];

const router = new VueRouter({
	routes,
});

export default router;
