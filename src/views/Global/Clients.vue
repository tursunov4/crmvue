<template>
    <div class="product__lists" >
         <clientsModal ref="dialog"/>
        <div class="product__lists-action">
            <button v-if="role !== 'director' " @click="openModal" >Add client</button>
        </div>
        <div class="product__lists-table">
        <appTable  :headers="headers" :body="clients" >
            <template #body_action="{item}">
                <i  v-if="role !== 'director' " @click="editModal(item)"  class="editbtn fa-solid fa-pen-to-square" ></i>
                <i   v-if="role !== 'director' " @click="deletItem(item)"  class="deletbtn fa-solid fa-trash-can" ></i>   
             </template>
        </appTable>
        <div class="pagination">
            <VPagination v-model="params.page" 
            :pages="params.last_page"
            :range-size="1"
            active-color="#EAF5FF"
            @update:modelValue="getClient"
            />
          </div> 
      </div>
  
</div>
</template>

<script  setup>
import appTable from '@/components/ui/app-table.vue';
import clientsModal from '@/components/pages/clients-modal.vue';
import http from '@/plugins/axios';
import VPagination from '@hennge/vue3-pagination'
import Notification from '@/plugins/Notification';
const role = sessionStorage.getItem('role')
import {ref , onMounted} from 'vue'
const  dialog = ref()
const headers = ref([
  {title:"№" , value:'index'},
  {title: 'Name', value:'title'},
  {title :'Phone Number' , value:'phone_number'},
  {title:'Address' , value:'address'} ,
  {title:'Action' , value:'action'}
])
const params = ref({
  page:1,
  per_page:10,
  last_page:null
})
const clients = ref([])
const getClient =() =>{
    http.get('/api/sales/client/' ,{
      params:{
        per_page :params.value.per_page,
        page:params.value.page
      }}
    ).then((res) =>{
        clients.value =res.data.results
        clients.value.forEach((item , index)=>{
        item.index = params.value.page*params.value.per_page-(params.value.per_page -1)+index
       });
       params.value.last_page = Math.ceil(res.data.count /params.value.per_page)
    })
}
const openModal =()=>{
    dialog.value.openModal()
}
const editModal =(item) =>{
   dialog.value.openModal(item)
}
const deletItem =(item) =>{
    http.delete(`/api/sales/client/${item.id}/`).then(res=>{
        if(res.status === 204){
            location.reload()
            Notification({text:'Delet client'} , {type :'warning'})
        }
    }).catch(err =>{
        Notification({text :'Something is wrong'} , {type :'danger'})
    })
}
onMounted(()=>{
    getClient()
})
</script>

<style lang="scss" scoped>
.product__lists-action {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    button {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        background-color: #435ebe;
        color: #fff;
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
.pagination{
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0px;
  }
</style>