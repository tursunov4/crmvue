import Clients from '../views/Clients/Clients.vue'
import User from '../views/Global/User.vue';
import ClientsItem from '../views/Global/Clients.vue'
export default {
        path:'/clients',
        name:'clients',
        component:Clients ,
        children :[
          {
            path:'/clients_user',
            name :'clients_user',
            component :User
          },
          {
            path:'/clients-item',
            name :'clients-item',
            component :ClientsItem
          },
        ]
}