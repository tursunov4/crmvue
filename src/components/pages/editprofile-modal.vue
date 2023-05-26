<template>
    <appModal v-model="dialog">
        <div class="edit__wrapper">
            <Form @submit="editProfile">
                <h3>Edit Profile</h3>
                <div class="modal__form-img" >
                    <img :src="$store?.state?.me?.image" alt="user" data-v-a5c35b98="">
                    <div class="modal__form-change-img">
                        <label for="file" >Change image</label>
                        <input @change="(e)=>imageChage(e)" type="file" id="file" >
                    </div>
                </div>
               <label for="firstname">First Name</label>
               <Field 
                rules="required" name="First Name" :modelValue="form.first_name" v-slot="{errors}" >
               <input  type="text" v-model="form.first_name" id="firstname" placeholder="First Name">
               <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
               </Field>
               <label for="lastname">Last Name</label>
               <Field 
                rules="required" name="Last Name" :modelValue="form.last_name" v-slot="{errors}" >
               <input type="text" v-model="form.last_name" id="lastname" placeholder="Last Name">
               <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
               </Field>
               <label for="email">Email</label>
               <Field 
                rules="required" name="Email" :modelValue="form.email" v-slot="{errors}" >
               <input type="email" v-model="form.email" id="email" placeholder="Email">
               <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
               </Field>
               <label for="phone">Phone Number</label>
               <Field 
                rules="required" name="Phone Number" :modelValue="form.phone_number" v-slot="{errors}" >
               <input type="text" v-model="form.phone_number" id="phone" placeholder="Phone Number">
               <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
               </Field>
             
               <button  type="submit">Edit Profile</button>
           </Form>
       
        </div>
    </appModal>
</template>

<script setup>
  import appModal from '../ui/app-modal.vue';
  import { ref } from 'vue';
  import { Form, Field } from 'vee-validate';
import { email } from '@vee-validate/rules';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
  const dialog = ref(false)
  const image = ref({})
  const form = ref({
    first_name :'',
    last_name:"",
    email:"",
    phone_number:''
  })
  const imageChage =(e)=>{
    image.value = e.target.files[0]
}
  const openModal =(item)=>{
    dialog.value = !dialog.value
    form.value.first_name = item.first_name
    form.value.last_name = item.last_name
    form.value.email = item.email
    form.value.phone_number = item.phone_number
  }
  defineExpose({openModal})
  const editProfile =()=>{
    const forms  = new FormData()
    forms.append("first_name" , form.value.first_name)
    forms.append("last_name" , form.value.last_name)
    forms.append("email" , form.value.email)
    forms.append('phone_number' , form.value.phone_number)
    forms.append("image" , image.value)
    
    http.put("/api/user/me/" , forms).then((res)=>{
        if(res.status === 200){
            location.reload()
            Notification({text :"dfdf"} , {type:'success'})
        }
    }).catch((err)=>{
        console.log(err)
    })
  }
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
Form{
    width: 60%;
    margin: 50px auto;
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
    &:hover .modal__form-change-img{
        display: block;
        position: absolute;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: rgba(240,241,245,0.7);
        border-radius: 50%;
        label{
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
        input{
            opacity: 0;
            cursor: pointer;
        }
    }
    img{
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
    }
    }
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

</style>