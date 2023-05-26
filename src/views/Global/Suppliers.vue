<template>

   <section class="groups__brands">
    <suppliers ref="supplier" />
    <div class="groups_brands__item">
        <div>
            <div class="groups_brands__table">
              <appTable :headers="headers" :body="$store?.state.suppliers">
                <template #body_action="{item}">
                 <span v-if="role !=='director' "  @click="editModal(item)" class="edit"><i class="fa-solid fa-pen-to-square"></i> </span>
                 <span v-if="role !=='director' " @click="deletSupplier(item)" class="delete"><i class="fa-solid fa-trash-can"></i> </span>
                </template>
              </appTable>
              <aside class="groups_brands_act">
                <button v-if="role !=='director' " @click="addSuppliers">Create</button>
              </aside>
            </div>
        </div>
    </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';
import suppliers from '@/components/pages/suppliers.vue';
 import appTable from '@/components/ui/app-table.vue';
 const role = sessionStorage.getItem('role')
 const headers = ref([
 {title:"№" , value:'id'},
  {title:'Name' , value:'title'},
  {title:'Address' , value:'address'},
  {title:'Credit' , value:'credit'},
  {title:'Action' , value:'action'}
  ])
  const supplier = ref()
  const editModal = (item)=>{
    supplier.value.openModal(item)
}
const deletSupplier = (item)=>{
    supplier.value.openDeletModal(item)
}
const addSuppliers =()=>{
    supplier.value.openModal()
}



</script>

<style lang="scss" scoped>
.groups_brands {
    width: 100%;
    padding: 10px;
    .groups_brands__item {
        width: 100%;
        margin-top: 20px;
      
    }
    
}
.groups_brands_act {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
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
.edit {
    color: #57caeb;
    font-size: 18px;
    cursor: pointer;
    margin: 0 5px;
}
.delete {
    color: #ff7976;
    font-size: 18px;
    cursor: pointer;
    margin: 0 5px;
}
.groups_brands__table {
    width: 100%;
    overflow-x: scroll;
}
</style>