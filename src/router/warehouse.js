import Warehousman from '../views/Warehousman/Warehousman.vue'
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
export default {
    
        path:"/product-list",
        name:'product-list',
        component:Warehousman,
        children:[
          {
            path:'/warehouse_user',
            name:'warehouse_user',
            component:User
          },
          {
            path:'/invoise-item/:id',
            name:"invoise-item",
            meta :{
              child :'arrive'
             },
            component:InvoiseItem
          },
          {
            path:"/arrived-warhen",
            name :'arrived-warhen',
            component:Arrive
          }
          ,
          {
            path:"/returned-warhen",
            name :'returned-warhen',
            component:ReturnPage
          }
          ,
          {
            path:"/returned-item/:id",
            name :'returned-item',
            meta :{
              child :'return'
             },
            component:ReturenedPage
          }
          ,
          {
            path:"/delivered-warhen",
            name :'delivered-warhen',
            
            component:Delever
          }
          ,
          {
            path:"/delevered-item/:id",
            name :'delevered-item',
            meta :{
              child :'deliver'
             },
            component:DeleverItem
          }
          ,
          {
            path:'/products',
            name:'prodcuts',
            component:Products
          },
          {
            path:'/singlepage_product/:id',
            name:'singlepage_product',
            meta :{
             child :'single_product'
            },
            component:Singlepage
          },
          {
            path:'/suppliers',
            name:'suppliers',
            meta :{
              child :'supplier'
             },
            component:Suppliers
          },
          {
            path:'/groups-brands',
            name:'groups-brands',
            meta:{
              child:'single_product'
            }
            ,
            component :GroupBrand
          }
        ]
}