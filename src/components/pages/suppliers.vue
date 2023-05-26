<template>
  <appModal v-model="dialog">
   <div class="modal">
    <h3 v-if="id">Edit Supplier</h3>
    <h3 v-else>Add Supplier</h3>
    <Form @submit="send" >
      <label for="product_name">Supplier Name</label>
      <Field rules="required"
       name="Supplier Name" 
      :modelValue="forms.title"
       v-slot="{errors}">
       <input class="form__input" id="product_name" type="text" placeholder="Supplier Name" v-model="forms.title">
       <p class="login__input-error" v-if="errors && errors.length">
        {{ errors[0] }}
       </p>
      </Field>
      <label for="address">Address</label>
      <Field rules="required"
       name="Address" 
      :modelValue="forms.address"
       v-slot="{errors}">
       <input class="form__input" id="address" type="text" placeholder="address" v-model="forms.address">
       <p class="login__input-error" v-if="errors && errors.length">
        {{ errors[0] }}
       </p>
    </Field>
     <button type="submit" v-if="id">Edit Supplier</button>
     <button type="submit" v-else>Add Supplier</button>
    </Form>
   </div>
  </appModal>
  <appModal v-model="dialog2">
     <div class="modal">
        <h3>Are you sure you want to deletes ?</h3>
        <div class="modal_act" >
            <button @click="deletCencel" class="btn1">cancel</button>
            <button @click="deletSupplier" class="btn2">delete</button>
        </div>
     </div>
  </appModal>
</template>

<script setup>
  import {ref , defineExpose , watch } from 'vue'
  import { Form,Field } from 'vee-validate';
  import appModal from '../ui/app-modal.vue';
  import Notification from '@/plugins/Notification';
  import http from '@/plugins/axios';
  import { useRouter } from 'vue-router';
  import store from '@/store';
  const router = useRouter()
  const  dialog = ref(false)
  const dialog2 = ref(false)
  const id = ref(null)
  const deletId = ref('')
  const forms = ref({
    title :'',
    address :'',
    credit:''
  })
  
  const openModal = (value) =>{
    if(value && value.id){
        forms.value = {...value}
        id.value = value.id
    }
    dialog.value = true
  }
  watch(dialog , (value) =>{
    if(!value){
        id.value = null
        forms.value.title = ''
        forms.value.address= ''
    }
  })
 async function send(event){
    try{
        if(!id.value){
            await http.post('/api/warehouse/supplier/' ,{
                title:forms.value.title,
                address :forms.value.address
            }).then((res)=>{
                if(res.status === 201){
                    location.reload()
                }
            })
            
        }
        else await http.put(`/api/warehouse/supplier/${id.value}/` ,{
            title :forms.value.title,
            address :forms.value.address
        }).then(res =>{

        })
        dialog.value = false
        if(!id.value){
            Notification({text:'Suppliers addedd !!!'} , {type :'success'})
        }else{
            Notification({text:'Suppliers updated'} , {type :'warning'})
        }
    }
    catch(err){
        console.log(err)
        Notification({text:'Somthing wrong'} , {type :'danger'})
    }
}
const openDeletModal = (item)=>{
  deletId.value = item.id
  dialog2.value = true
}
const deletCencel =()=>{
    dialog2.value = false
    deletId.value = ''
}
const deletSupplier  =()=>{
   http.delete(`/api/warehouse/supplier/${deletId.value}/`).then((res) =>{
    if(res.status === 204 ){
        location.reload()
    }
   }).catch((err)=>{
     Notification({text :'Something wrong'} , {type :'danger'})
   })
}
defineExpose({openModal , openDeletModal})
</script>

<style lang="scss" scoped>

$blue-color :#435ebe;
$input-bg:#edf2f7;
.modal {
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
   
    Form{
        width: 60%;
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        h3{
            margin: 10px 0;
            font-size: 25px;
            text-align: center;
        }
        .modal__form-img{
            width: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;
            .modal__form-change-img{
               display: none;
                label{
                    cursor: default;
                }
                input{
                    appearance: none;
                    background-color: initial;
                    cursor: default;
                    align-items: baseline;
                    color: inherit;
                    text-overflow: ellipsis;
                    white-space: pre;
                    text-align: start !important;
                    padding: initial;
                    border: initial;
                    overflow: hidden !important;
                }
            }
        }
    
        
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
</style>