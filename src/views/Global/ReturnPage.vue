<template>
    <section class="warehouse__invoice" >
        <returnedModal  ref="dialog"/>
        <div class="warehouse__invoice-bar" >
            <button v-if="role !=='director' " @click="openModal" >Add returned invoice</button>
        </div>
        <div class="product__lists-table" >
            <appTable :headers="headers" :body="arrved">    
                <template #body_client="{item}">
                    <span>{{ item.client.title }} </span>
                 </template>
                <template #body_address="{item}">
                    <span>{{ item.client.address }} </span>
                 </template>
                <template #body_action="{item}">
                    <i @click="editModal(item)" v-if="item.status ==='new' && role !== 'director' " class="editbtn fa-solid fa-pen-to-square" ></i>
                    <i @click="deletItem(item)" v-if="item.status ==='new' && role !== 'director' " class="deletbtn fa-solid fa-trash-can" ></i>   
                     <router-link v-if="role ==='director' " :to="{name :'returned-item_d' , params:{id:item.id} }">
                        <i  class="nextbtn fa-solid fa-eye"></i>
                     </router-link>
                     <router-link v-else :to="{name :'returned-item' , params:{id:item.id} }">
                        <i  class="nextbtn fa-solid fa-eye"></i>
                     </router-link>
                 </template>
            </appTable>
            <div class="pagination">
                <VPagination v-model="params.page" 
                :pages="params.last_page"
                :range-size="1"
                active-color="#EAF5FF"
                @update:modelValue="getArrved"
                />
              </div> 
        </div>
</section>
</template>

<script setup>
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import { ref } from 'vue';
import VPagination from '@hennge/vue3-pagination';
import returnedModal from '@/components/pages/returned-modal.vue';
import AppModal from '@/components/ui/app-modal.vue';
import Notification from '@/plugins/Notification';
const role = sessionStorage.getItem('role')
const dialog = ref()
const arrved = ref([])
const params = ref({
  page:1,
  per_page:10,
  last_page:null
})
const headers = ref([
 {title:"№" , value:'index'},
  {title: 'Client', value:'client'},
  {title: 'Total sum', value:'total_sum'},
  {title: 'Address', value:'address'},
  {title: 'Status', value:'status'},
  {title: 'Description', value:'description'},
  {title: 'Action', value:'action'},
])
const getArrved =()=>{
    http.get('/api/warehouse/returned-invoice/' , {
        params:{
            per_page:params.value.per_page,
            page:params.value.page
        }
    }).then(res =>{
        console.log(res.data.results)
        arrved.value = res.data.results
        arrved.value.forEach((item , index)=>{
        item.index = params.value.page*params.value.per_page-(params.value.per_page -1)+index
       });
       params.value.last_page = Math.ceil(res.data.count /params.value.per_page)
    })
}
const openModal =()=>{
    dialog.value.openModal()
}
const editModal=(item)=>{
    dialog.value.openModal(item)
}
const deletItem =(item)=>{
    http.delete(`/api/warehouse/returned-invoice/${item.id}/`).then((res)=>{
        if(res.status ===204){
            location.reload()
            Notification({text:'Invoice item deleted !!!!'} , {type:'danger'})
        }
    }).catch((err)=>{
        Notification({text:'Error !!!'} , {type:'danger'})
    })
}

getArrved()
</script>

<style lang="scss" scoped>
.warehouse__invoice {
    padding: 15px;
    .warehouse__invoice-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
            border: none;
            border-radius: 5px;
            background-color: #435ebe;
            color: #fff;
            padding: 10px 15px;
            cursor: pointer;
            letter-spacing: .8px;
        }
    }
    .product__lists-table{
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: scroll;
    }
}
.pagination{
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 16px 0px;
  }
  .editbtn{
    color: #57caeb;
    font-size: 18px;
    cursor: pointer;
    margin: 0 5px;
  }
  .deletbtn{
    color: #ff7976;
    font-size: 18px;
    cursor: pointer;
    margin: 0 5px;
  }
  .nextbtn{
    color: #435ebe;
    font-size: 18px;
    cursor: pointer;
    margin: 3px 5px;
  }

</style>