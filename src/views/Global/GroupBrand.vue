<template>
    <section class="groups_brands router" >
       <productModal ref="productmodal" />
       <productBrand ref="productbrand"/>
       <router-link v-if="role === 'director'" to="/products_d" class="btn"><i class="left fa-solid fa-left-long" ></i><span>Back</span></router-link>
       <router-link v-else to="/products" class="btn"><i class="left fa-solid fa-left-long" ></i><span>Back</span></router-link>
        <div class="groups_brands__item">
            <div class="groups_brands__item_el" >
                <p >Groups</p>
                <div class="groups_brands__table">
                 <appTable :headers="headers" :body="$store.state.brandGroups">
                    <template #body_action="{item}">
                       <button v-if="role !== 'director'" @click="deletGroup(item)" class="delete_btn">Delete</button>
                    </template>
                 </appTable>
                </div>
            <aside  v-if="role !== 'director'" class="groups_brands_act"><button @click="addGroup" >Create</button></aside>
        </div>
        <div class="groups_brands__item_el" >
            <p >Brands</p>
            <div class="groups_brands__table" >
                <appTable :headers="headers" :body="$store.state.brands">
                    <template #body_action="{item}">
                       <button  v-if="role !== 'director'" @click="deletBrand(item)" class="delete_btn">Delete</button>
                    </template>
                 </appTable>
            </div>
            <aside  v-if="role !== 'director'" class="groups_brands_act" ><button @click="addBrand" >Create</button></aside>
        </div>
    </div>
</section></template>


<script setup>
import { ref } from 'vue'
import appTable from '@/components/ui/app-table.vue';
import productBrand from '@/components/pages/product-brand.vue';
import productModal from '@/components/pages/product-modal.vue';
const role = sessionStorage.getItem('role')
const productmodal = ref()
const productbrand = ref()
const headers = ref([
    {title:"№" , value:'index'},
    {title :'Name' ,value:'title'},
    {title:'action' , value:'action'}
])
const deletGroup =(item)=>{
    productmodal.value.openDeletModal(item)
}
const deletBrand =(item)=>{
    productbrand.value.openDeletModal(item)
}
const addGroup =(item)=>{
    productmodal.value.openModal(item)
}
const addBrand =(item)=>{
    productbrand.value.openModal(item)
}

 
</script>

<style lang="scss" scoped>
.groups_brands {
    
    padding: 10px;
}
.btn {
    width: 100px;
    padding: 8px 5px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background-color: #435ebe;
}
.groups_brands__item {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .groups_brands_act {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        button{
            padding: 10px 20px;
            color: #fff;
            background-color: #57caeb;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
            letter-spacing: .8px;
        }
    }
}
.groups_brands__item_el {
    width: 50%;
    overflow-x: scroll;
    p {
        text-align: center;
        font-size: 23px;
        font-weight: 500;
    }
}
.delete_btn {
    padding: 4px 8px;
    border: none;
    border-radius: 3px;
    background-color: #ff7976;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}

</style>