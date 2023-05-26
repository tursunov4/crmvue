<template>
    <app-modal v-model="dialog" :width="'40%'">
        <div class="Login__roles">
            <p>Select your role</p>
            <select v-model="role.selected_role">
                <option disabled selected hidden  value="">Selec your role</option>
                <option v-for="item in $store?.state?.me?.roles " :key="item.id" :value="item">
                    {{ item }}
                </option>                    
            </select>
            <div class="Login__roles-action">
                <button @click="changeRoleProfile">Save</button>
            </div>
        </div>
    </app-modal>
</template>

<script setup>
 import { ref } from 'vue';
 import http from '@/plugins/axios';
 import { useRouter } from 'vue-router';
 import appModal from '../ui/app-modal.vue';
 const router = useRouter()
 const role = ref({
   roles:[],
   selected_role :""
})
 const dialog = ref(false)
 const openChangeModal=()=>{
   dialog.value = !dialog.value
 }
 
 defineExpose({openChangeModal})
 const changeRoleProfile =()=>{
    http.post('/api/user/change-role/', {
        role : role.value.selected_role
    }).then(res => {
       if(res.status === 200){
        if(role.value.selected_role === 'warehouseman'){
        sessionStorage.removeItem('role')
        sessionStorage.setItem('role' , 'warehouseman')
        router.push({name:'warehouse_user'})
        }
         else if (role.value.selected_role === 'director'){
        sessionStorage.removeItem('role')
        sessionStorage.setItem('role' , 'director')
        router.push({name :'director_user'})
    }
          else if (role.value.selected_role === 'salesman'){
        sessionStorage.removeItem('role')
        sessionStorage.setItem('role' , 'salesman')
        router.push({name:'clients_user'})
    }
         else if (role.value.selected_role === 'financier'){
        sessionStorage.removeItem('role')
        sessionStorage.setItem('role' , 'financier')
        router.push({name :'financier_user'})
    }
    dialog.value = false
       }
    }).catch(err =>{
        console.log(err);
    })
}
</script>
<style lang="scss" scoped>
$blue-color :#435ebe;
.Login__roles{
    display: flex;
    flex-direction: column;
    align-items:center ;
    justify-content: center;
    padding: 10px;
    p{
        font-size: 30px;
        margin-bottom: 20px;
        word-spacing: 0.5px;
    }
    select{
       width: 100%;
       height: 35px;
       font-size: 16px;
       border-radius: 5px;
    }
    .Login__roles-action{
        width: 100%;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button{
            border: none;
            color: #fff;
            background-color: $blue-color;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>