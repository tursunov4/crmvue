<template>
    <appModal v-model="dialog">
        <div class="modal">
         <h3 v-if="id">Edit Product</h3>
         <h3 v-else>Add Product</h3>
         <Form @submit="send" >
            <div class="modal__form-img">
                <img :src="forms.image" alt="user">
                <div class="modal__form-change-img">
                    <label for="file">Select image</label>
                    <input @change="(e)=>handleChange(e)" type="file" ref="file" id="file">
                </div>
            </div>
           <label for="product_name">Product Name</label>
           <Field rules="required"
            name="Product Name" 
           :modelValue="forms.title"
            v-slot="{errors}">
            <input class="form__input" id="product_name" type="text" placeholder="Product Name" v-model="forms.title">
            <p class="login__input-error" v-if="errors && errors.length">
             {{ errors[0] }}
            </p>
           </Field>
           <label for="product_code">Product Code</label>
           <Field rules="required"
            name="Product Code" 
           :modelValue="forms.code"
            v-slot="{errors}">
            <input class="form__input" id="product_code" type="text" placeholder="Product Code" v-model="forms.code">
            <p class="login__input-error" v-if="errors && errors.length">
             {{ errors[0] }}
            </p>
           </Field>
           <label for="product_a">Arrival price</label>
           <Field rules="required"
            name="Arrival price" 
           :modelValue="forms.current_arrival_price"
            v-slot="{errors}">
            <input class="form__input" id="product_a" type="text" placeholder="Arrival price" v-model="forms.current_arrival_price">
            <p class="login__input-error" v-if="errors && errors.length">
             {{ errors[0] }}
            </p>
           </Field>
           <label for="product_b">Selling price</label>
           <Field rules="required"
            name="Selling price" 
           :modelValue="forms.current_selling_price"
            v-slot="{errors}">
            <input class="form__input" id="product_b" type="text" placeholder="Selling price" v-model="forms.current_selling_price">
            <p class="login__input-error" v-if="errors && errors.length">
             {{ errors[0] }}
            </p>
           </Field>
           <label for="group">Product Group</label>
           <Field
            rules="required"
            name="Product Group" 
            :modelValue="forms.group"
            v-slot="{errors}"
           >
            <select class="form__select" id="group" v-model="forms.group">
                <option disabled selected hidden value="">Select product group</option>
                <option :value="item.id" v-for="item in $store.state.brandGroups" :key="item.id">{{item.title }}</option>
            </select>
            <p class="login__input-error" v-if="errors && errors.length">
                {{ errors[0] }}
               </p>
           </Field>
           <label for="brand">Product Brand</label>
           <Field
            rules="required"
            name="Product Brand" 
            :modelValue="forms.brand"
            v-slot="{errors}"
           >
            <select class="form__select" id="brand" v-model="forms.brand">
                <option disabled selected hidden value="">Select product brand</option>
                <option :value="item.id" v-for="item in $store.state.brands" :key="item.id">{{item.title }}</option>
            </select>
            <p class="login__input-error" v-if="errors && errors.length">
                {{ errors[0] }}
               </p>
           </Field>
           <label for="description">Description</label>
           <Field 
           rules="required"
           name="Description" 
           :modelValue="forms.description"
           v-slot="{errors}"
           >
            <textarea v-model="forms.description" class="form__text" id="description" placeholder="Description..."></textarea>
            <p class="login__input-error" v-if="errors && errors.length">
                {{ errors[0] }}
            </p>
           </Field>          
          <button  type="submit" v-if="id">Edit Supplier</button>
          <button type="submit" v-else>Add Supplier</button>
         </Form>
        </div>
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
import { useRouter  } from 'vue-router';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
import { Form , Field } from 'vee-validate';
import { not_one_of } from '@vee-validate/rules';

const deletId = ref('')
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)
const forms = ref({
    title: "",
    code: "",
   current_arrival_price: "",
   current_selling_price: "",
   group: 0,
   brand: 0,
  description: "",
  image:{}
})
const openDeletModal = (item)=>{
   deletId.value = item.id
   dialog2.value= true
}
const router = useRouter()
const deletCencel =()=>{
    dialog2.value = false
    deletId.value = ''
}
const deletGroup =()=>{
    http.delete(`/api/warehouse/product/${deletId.value}`).then((res) =>{
        if(res.status ===204){
            router.push({name :'prodcuts'})
            Notification({text :'Delete product'} , {type :'warning'})
        }
        dialog2.value= false
    }).catch((err)=>{
        Notification({text:'Something wrong' }, {type :'wrong'})
    })
}
const openModal =(value) =>{
    if(value && value.id){
        forms.value = {...value}
        id.value = value.id
    }
    dialog.value = true
}
const handleChange =(e)=>{
  forms.value.image = e.target.files[0]
}

async function send(event){
    try{
        const form = new FormData()
        form.append('title' , forms.value.title)
        form.append('code' , forms.value.code)
    form.append('current_arrival_price' , forms.value.current_arrival_price)
    form.append('current_selling_price' , forms.value.current_selling_price)
    form.append('group' , forms.value.group)
    form.append('brand' , forms.value.brand)
    form.append('description' , forms.value.description)
    form.append('image' , forms.value.image)
        if(!id.value){
            await http.post('/api/warehouse/product/' ,form ).then((res)=>{
                if(res.status === 200){
                    location.reload()
                }
            })
            
        }
        else await http.put(`/api/warehouse/product/${id.value}/` ,form).then(res =>{
        })
        dialog.value = false
        if(!id.value){
            location.reload()
            Notification({text:'Product addedd !!!'} , {type :'success'})
        }else{
            location.reload()
            Notification({text:'Product updated'} , {type :'warning'})
        }
    }
    catch(err){
        console.log(err)
        Notification({text:'Somthing wrong'} , {type :'danger'})
    }
}


defineExpose({openDeletModal , openModal})
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
Form{
    width: 80%;
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    h3{
        margin: 10px 0;
        font-size: 25px;
        text-align: center;
    }
    .form__text {
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: #edf2f7;
        border-radius: 5px;
        outline: none;
        border: none;
    }
    .modal__form-img {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        img {
            width: 80px;
            height: 80px;
            -o-object-fit: cover;
            object-fit: cover;
            border-radius: 50%;
            position: relative;
        }
        .modal__form-change-img {
            display: block;
            position: absolute;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: rgba(240,241,245,.7);
            border-radius: 50%;
            label {
                text-align: center;
                font-size: 14px;
                cursor: pointer;
            }
            input {
                opacity: 0;
                cursor: pointer;
            }
        }
    }


    }
    .form__select {
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: #edf2f7;
        border-radius: 5px;
        outline: none;
        border: none;
    }
    
    
</style>