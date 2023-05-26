import Financier from '../views/Financier/Financier.vue'
import User from '../views/Global/User.vue'
import Income from '../views/Financier/Income.vue'
import Expence from '../views/Financier/Expence.vue'
export default {    
        path:'/financier',
        name:'financier',
        component:Financier , 
        children :[
          {
            path:'/financier_user',
            name :'financier_user',
            component:User
          },
          {
            path:'/financier_income',
            name :'financier_income',
            component:Income
          },
          {
            path:'/financier_expence',
            name :'financier_expence',
            component:Expence
          },
        ]
}