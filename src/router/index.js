import { createRouter, createWebHistory } from 'vue-router'
import financier from './financier'
import clients from './clients'
import director from './director'
import warehouse from './warehouse'
import auth from './auth'
const routes = [
    auth,
    warehouse,
    director,
    clients,
    financier
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from , next) =>{
  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role')
  const name = to.name === 'login'
  if(!token && !name){
    return next({name:'login'})
  }else{
    if(token && name){
      if(role === 'warehouseman'){
        return next({name:"product-list"})
      }
      else if(role === 'salesman'){
        return next({name:"clients"})
      }
      else if(role === 'director'){
        return next({name:"director"})
      }
      else if(role === 'financier'){
        return next({name:'financier'})
      }
    }
    else{
      next()
    }
  }
})
export default router
