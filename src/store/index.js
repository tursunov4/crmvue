import http from '@/plugins/axios'
import { createStore } from 'vuex'
export default createStore({
  state:{
   me:{},
   suppliers :[],
   brandGroups :[],
   brands:[],
   product :[],
   client:[]
  },
  getters:{

  },
  mutations:{
    getMe(state , data){
    state.me = data
    },
    getSuppliers(state, data){
      state.suppliers = data
    },
    getClient(state, data){
      state.client = data
    },
    getGroups(state , data){
     state.brandGroups = data
    },
    getBrand(state , data){
      state.brands = data
    },
    getProducts(data, state){
      state.product =data
    }
  },  
  actions:{
   getMe({commit}){
    http.get("/api/user/me").then(res=>{     
      commit("getMe" , res.data)
    })
   },
   getSuppliers({commit}){
    http.get("/api/warehouse/supplier/",).then((res)=>{
      commit('getSuppliers' , res.data.results)
    })
   },
   getClient({commit}){
    http.get("/api/sales/client/",).then((res)=>{
      commit('getClient' , res.data.results)
    })
   },
   getGroups({commit} , params){
    http.get('/api/warehouse/group/' ,{
      params:{
        per_page :params.per_page,
        page:params.page
      }
    }).then((res)=>{     
      commit('getGroups' , res.data.results)
      res.data.results.forEach((item , index) =>{
        item.index = params.page * params.per_page - (params.per_page -1) + index
      })
    
    })
   },
   getBrand({commit} , params){
    http.get('/api/warehouse/brand/' ,{
      params:{
        per_page :params.per_page,
        page:params.page
      }
    }).then(res =>{
      commit('getBrand' , res.data.results)
      res.data.results.forEach((item , index) =>{
        item.index = params.page * params.per_page - (params.per_page -1) + index
      })
    })
   },
   getProducts({commit}){
    http.get('/api/warehouse/product/').then(res=>{
      commit("getProducts" , res.data.results)
      console.log(res.data.results)
    })
  }
  },
  
   
  modules: {
  
  }
})
