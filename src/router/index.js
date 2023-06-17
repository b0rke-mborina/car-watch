import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import VehicleNewView from '../views/VehicleNewView.vue'
import VehicleView from '../views/VehicleView.vue'
import OwnerView from '../views/OwnerView.vue'
import ManageAddressesView from '../views/ManageAddressesView.vue'
import { Auth } from "@/services"

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/vehicles',
		name: 'vehicles',
		component: VehiclesView
	},
	{
		path: '/vehicles/new',
		name: 'vehicleNew',
		component: VehicleNewView
	},
	{
		path: '/vehicle/:id',
		name: 'vehicle',
		component: VehicleView
	},
	{
		path: '/owner/:address',
		name: 'owner',
		component: OwnerView
	},
	{
		path: '/manage/addresses',
		name: 'manageAddresses',
		component: ManageAddressesView
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	const publicPages = ["home", "vehicles", "vehicleNew", "vehicle", "owner"];
	const ownerRequired = !publicPages.includes(to.name);
	const isOwner = Auth.state.isOwner;

	if (ownerRequired && !isOwner) {
		return next("/vehicles");
	}
	next();
});

export default router
