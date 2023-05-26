<template>
    <div class="product__lists router" >
      <products ref="productss"/>
        <div class="product__lists-action">
            <router-link v-if="role === 'director'" to="/groups-brands_d" class="btn" >
                <span >Groups and Brands</span>
                <i class="right fa-solid fa-right-long" ></i>
            </router-link>
            <router-link v-else to="/groups-brands" class="btn" >
                <span >Groups and Brands</span>
                <i class="right fa-solid fa-right-long" ></i>
            </router-link>
            <button v-if="role !== 'director'" @click="addProduct" class="btn">Add Product</button>
        </div>
        <div class="product__lists-table" >
           <appTable :headers="headers" :body="productList">
               <template #body_group="{item}">
                <span>{{ item.group.title }} </span>
               </template>
               <template #body_brand="{item}">
                <span>{{ item.brand.title }} </span>
               </template>
               <template #body_title="{item}">
                 <span class="product__lists-table-text">{{ item.title}} </span>
               </template>
               <template #body_description="{item}">
                 <span class="product__lists-table-text">{{ item.description}} </span>
               </template>
               <template #body_action="{item}">
                <span>
                  <router-link v-if="role === 'director'" :to="{name:'singlepage_product_d' , params:{id:item.id} }" class="single__route-icon">
                    <i class="nextbtn fa-solid fa-eye"></i>
                  </router-link>
                  <router-link v-else  :to="{name:'singlepage_product' , params:{id:item.id} }" class="single__route-icon">
                    <i class="nextbtn fa-solid fa-eye"></i>
                  </router-link>
                </span>
               </template>
                
           </appTable>
        </div>  
        <div class="pagination">
          <VPagination v-model="params.page" 
          :pages="params.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getProducts"
          />
        </div> 
</div>
</template>

<script setup>
import {ref } from 'vue'
import appTable from '@/components/ui/app-table.vue';
import VPagination from '@hennge/vue3-pagination'
import http from '@/plugins/axios';
import products from '@/components/pages/products.vue';
import director from '@/router/director';
const role = sessionStorage.getItem('role')
const productss = ref()
const addProduct  = ()=>{
  productss.value.openModal()
}
const headers = ref([
 {title:"№" , value:'index'},
  {title: 'Name', value:'title'},
  {title: 'Code', value:'code'},
  {title: 'Brand', value:'brand'},
  {title: 'Group', value:'group'},
  {title: 'Arrival price', value:'current_arrival_price'},
  {title: 'Selling price', value:'current_selling_price'},
  {title: 'Description', value:'description'},
  {title: 'Action', value:'action'},
])
const params = ref({
  page:1,
  per_page:10,
  last_page:null
})
const productList = ref([])
  const getProducts =()=>{
    http.get('/api/warehouse/product/' ,{
      params:{
        per_page :params.value.per_page,
        page:params.value.page
      }
    }).then((res) =>{
       productList.value = res.data.results
       productList.value.forEach((item , index)=>{
        item.index = params.value.page*params.value.per_page-(params.value.per_page -1)+index
       });
       params.value.last_page = Math.ceil(res.data.count /params.value.per_page)
    })
  }
  getProducts()
</script>

<style lang="scss" scoped>
   .product__lists-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
}
   .product__lists-action{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    gap: 15px;
    .btn{
        padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #435ebe;
    color: #fff;
    cursor: pointer;
    display: flex;
    gap: 8px;
    align-items: center;
    }
  }
  .product__lists-table-text{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #000;
  }
  .single__route-icon{
    color: #435ebe;
  }
  .pagination{
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0px;
  }
  .nextbtn{
    color: #435ebe;
    font-size: 18px;
    cursor: pointer;
    margin: 3px 5px;
  }
</style>