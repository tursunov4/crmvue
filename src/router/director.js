import Director from '../views/Director/Director.vue'
import User from '../views/Global/User.vue'
import Products from '../views/Global/Products.vue'
import Singlepage from '../views/Global/Singlepage.vue'
import Suppliers from '../views/Global/Suppliers.vue'
import GroupBrand from '../views/Global/GroupBrand.vue'
import Arrive from "../views/Global/Arrive.vue"
import InvoiseItem from '../views/Global/InvoiseItem.vue'
import ReturnPage from '../views/Global/ReturnPage.vue'
import ReturenedPage from '../views/Global/ReturenedItem.vue'
import Delever from '../views/Global/Delever.vue'
import DeleverItem from '../views/Global/DeleverItem.vue'
import Income from '../views/Financier/Income.vue'
import Expence from '../views/Financier/Expence.vue'
import ClientsItem from '../views/Global/Clients.vue'
import Dashboard from '../views/Director/Dashboard.vue'
import DashboardDemo from '../views/Director/DashboardDemo.vue'
export default {
    
        path:'/director',
        name:'director',
        component:Director ,
        children :[
          {
            path:'/director_user',
            name:'director_user',
            component:User
          },
          {
            path:'/dashboard',
            name:'dashboard',
            component:Dashboard
          },
          {
            path:'/dashboard-demo',
            name:'dashboard-demo',
            component:DashboardDemo
          },
          {
            path:'/invoise-item_d/:id',
            name:"invoise-item_d",
            meta :{
              child :'arrive_d'
             },
            component:InvoiseItem
          },
          {
            path:"/arrived-warhen_d",
            name :'arrived-warhen_d',
            component:Arrive
          }
          ,
          {
            path:"/returned-warhen_d",
            name :'returned-warhen_d',
            component:ReturnPage
          }
          ,
          {
            path:"/returned-item_d/:id",
            name :'returned-item_d',
            meta :{
              child :'return_d'
             },
            component:ReturenedPage
          }
          ,
          {
            path:"/delivered-warhen_d",
            name :'delivered-warhen_d',
            
            component:Delever
          }
          ,
          {
            path:"/delevered-item_d/:id",
            name :'delevered-item_d',
            meta :{
              child :'deliver_d'
             },
            component:DeleverItem
          }
          ,
          {
            path:'/products_d',
            name:'prodcuts_d',
            component:Products
          },
          {
            path:'/singlepage_product_d/:id',
            name:'singlepage_product_d',
            meta :{
             child :'single_product_d'
            },
            component:Singlepage
          },
          {
            path:'/suppliers_d',
            name:'suppliers_d',
            meta :{
              child :'supplier_d'
             },
            component:Suppliers
          },
          {
            path:'/groups-brands_d',
            name:'groups-brands_d',
            meta:{
              child:'single_product_d'
            }
            ,
            component :GroupBrand
          },
          {
            path:'/financier_income_d',
            name :'financier_income_d',
            component:Income
          },
          {
            path:'/financier_expence_d',
            name :'financier_expence_d',
            component:Expence
          },
          {
            path:'/clients-item_d',
            name :'clients-item_d',
            component :ClientsItem
          },

        ]
}