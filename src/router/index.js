import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import VehicleView from '../views/VehicleView.vue'

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
		path: '/vehicle/:id',
		name: 'vehicle',
		component: VehicleView
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
