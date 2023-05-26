<template>
    <section class="warehouse">
     <div :class=" isShow ?  'warehouse__sidebar1':'warehouse__sidebar' ">
         <Sidebar :isShow="isShow" :isShowItem="isShowItem" :sidebarGlobal="sidebarGlobal" />
     </div>
     <div :class="isShow ? 'warehouse__main' :'warehouse__main1' ">
        <div class="warehouse-navbar">
           <Navbar/>
        </div>
        <router-view class="router"></router-view>
     </div>
    </section>
 </template>
 
 <script setup>
 import store from '@/store'
 import Sidebar from '@/components/layout/Sidebar.vue';
 import Navbar from '@/components/layout/Navbar.vue';
 import { ref , onMounted } from 'vue';
   const isShow = ref(false)
   const params = ref({
   page:1,
   per_page:10,
   last_page:null
 })
   onMounted(() => {
    store.dispatch('getMe' , )
    store.dispatch('getSuppliers')
    store.dispatch('getProducts')
    store.dispatch('getClient')
    store.dispatch('getGroups' ,params.value)
    store.dispatch('getBrand' , params.value)
   })
   const isShowItem =()=>{
     isShow.value = !isShow.value
   }
   const sidebarGlobal = ref([
     { path: '/clients-item', name: 'Clients', child: 'single_product', icon: 'fa-solid fa-coins' },
 ])
 </script>
 
 <style lang="scss" scoped>
  $bg-color:#F2F7FF;
  .warehouse{
     width: 100%;
     height: 100vh;
     display: flex;
     %warehouse__global{
         height: 100%;
         background-color: $bg-color;
         transition: all 0.4s linear;
     }
     .warehouse__main1{
         width: calc(100% - 300px); 
         @extend %warehouse__global
     }
     .warehouse__main{
         width: calc(100% - 53px);
         @extend %warehouse__global
     }
     .warehouse__sidebar1{
         width: 62px;
         transition: all 0.4s linear;
     }
     .warehouse__sidebar{
         width: 300px;
     }
     .warehouse-navbar{
         width: 100%;
         position: sticky;
         top: 0;
     }
     .router{
         padding: 10px;
         margin: 10px;
     }
  }
  @media screen and (max-width: 1024px){
     %warehouse__global2{
         height: 100%;
         background-color: $bg-color;
         transition: all 0.4s linear;
     }
     .warehouse__sidebar{
         width: 62px !important;
     }
     .warehouse__main1{
         width: calc(100% - 53px) !important;
         @extend %warehouse__global2
     }
  }
 </style>