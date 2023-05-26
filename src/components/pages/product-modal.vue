<template>
     <appModal v-model="dialog">
        <section class="group_brand" >
            <h2>Groups</h2>
            <Form @submit="Login">
                <label for="login">Group Name</label>
                <Field 
                 rules="required" name="Group Name" :modelValue="form.name" v-slot="{errors}" >
                <input type="text" v-model="form.name" id="login" placeholder="Group Name">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <button  type="submit">Add groups</button>
            </Form>
        </section>
    
     </appModal>
     <appModal v-model="dialog2">
        <div class="modal">
           <h3>Are you sure you want to deletes ?</h3>
           <div class="modal_act" >
               <button @click="deletCencel" class="btn1">cancel</button>
               <button @click="deletGroup" class="btn2">delete</button>
           </div>
        </div>
     </appModal>
</template>

<script setup>
 import {ref , defineExpose} from 'vue'
 import appModal from '../ui/app-modal.vue';
 import { Form , Field } from 'vee-validate';
 import Notification from '@/plugins/Notification';
 import http from '@/plugins/axios';
 const dialog2 = ref(false)
 const dialog = ref(false)
 const deletId = ref('')
 const form = ref({
    name :''
 })
 const openDeletModal = (item)=>{
    dialog2.value = true
   deletId.value = item.id
 }
 const deletCencel = ()=>{
    dialog2.value= false
    deletId.value = ''
 }
 const deletGroup =()=>{
    http.delete(`/api/warehouse/group/${deletId.value}`).then((res)=>{
        if(res.status ===204){
            Notification({text :'Delete Group'} , {type :'success'})
            location.reload()
        }
    }).catch(err=>{
        Notification({text:'Something wrong'} , {type :'danger'})
    })
    dialog2.value = false
 }
 const openModal =()=>{
    dialog.value = true
 }
 const Login =()=>{
    http.post('/api/warehouse/group/' , {
        title :form.value.name
    }).then(res=>{
        if(res.status ===201){
            Notification({text:'Add Group'} , {type :'success'})
            location.reload()
        }
    })
 }
 defineExpose({openDeletModal ,openModal})
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.modal {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
        text-align: center;
        margin: 10px 0;
        font-size: 25px;
    }
    .modal_act{
        margin-top: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        button{
            padding: 15px 50px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            color: #fff;
            cursor: pointer;
        }
        .btn1 {
            background-color: #57caeb;
        }
        .btn2 {
            background-color: #ff7976;
        }
    }
}
.group_brand {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h2{
        font-size: 20px;
        letter-spacing: .8px;
        margin-bottom: 10px;
    }
    Form{
        width: 60%;
        margin: 50px 0px;
        display: flex;
        flex-direction: column;
      
        .login__form-input{
            width: 100%;
            display: flex;
            align-items: center;
            border-radius: 5px;
            padding-right: 20px;
            background-color: $input-bg;
            %input_act{
                cursor: pointer;
                background-color: transparent;
              
            }
            .Login__show{
                @extend %input_act;
                display: block;
            }
            .Login__hide{
                @extend %input_act;
                display: none;
            }
      
        }
        input{
            width: 100%;
            font-weight: 400;
            font-size: 14px;
            height: 45px;
            padding-left: 15px;
            color: #272a2c;
            background: $input-bg;
            border-radius: 5px;
            outline: none;
            margin-right: 5px;
            border: none;
        }
        .login__input-error{
            margin-top: 5px;
            color: red;
            font-size: 15px;
            font-weight: 500;
        }
        label{
            margin: 10px 0;
            font-weight: 500;
            font-size: 16px;
            color: #2c2728;
        }
        button{
            margin-top: 40px;
            border: none;
            padding: 10px 0px;             
            color: #fff;
            font-size: 16px;
            background-color: $blue-color;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>