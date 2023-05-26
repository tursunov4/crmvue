<template>
    <app-modal v-model="dialog"  :width="'40%'" >
        <div class="Password" >
            <div class="Password__change">
                <h1 >Change password</h1>
                 <Form @submit="updateUserPassword">
                    <label for="oldpassword">Old Password</label>
                    <Field rules="required" name="Old Password" :modelValue="form.password" v-slot="{errors}">
                        <div class="login__form-input">
                          <input :type="showPassword ? 'text' :'password' " id="oldpassword" v-model="form.password" placeholder="Old Password">
                          <img width="20" height="16" src="../../assets/Images/eye-regular.svg" @click="ChangePasswordEye" alt="eye" :class="showPassword ? 'Login__hide' :'Login__show' ">
                          <img width="20" height="16"  src="../../assets/Images/eye-slash-regular.svg" @click="ChangePasswordEye" alt="hide" :class="showPassword ? 'Login__show' :'Login__hide' ">
                        </div>
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                      </Field>
                    <label for="newpassword">New assword</label>
                    <Field rules="required" name="New Password" :modelValue="form.newpassword" v-slot="{errors}">
                        <div class="login__form-input">
                          <input :type="showPassword1 ? 'text' :'password' " id="newpassword" v-model="form.newpassword" placeholder="New Password">
                          <img width="20" height="16" src="../../assets/Images/eye-regular.svg" @click="ChangePasswordEye1" alt="eye" :class="showPassword1 ? 'Login__hide' :'Login__show' ">
                          <img width="20" height="16"  src="../../assets/Images/eye-slash-regular.svg" @click="ChangePasswordEye1" alt="hide" :class="showPassword1 ? 'Login__show' :'Login__hide' ">
                        </div>
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                      </Field>
                    <label for="conpassword"> Confirm new password</label>
                    <Field rules="required" name="Confirm new password" :modelValue="form.conpassword" v-slot="{errors}">
                        <div class="login__form-input">
                          <input :type="showPassword2 ? 'text' :'password' " id="conpassword" v-model="form.conpassword" placeholder="Confirm new password">
                          <img width="20" height="16" src="../../assets/Images/eye-regular.svg" @click="ChangePasswordEye2" alt="eye" :class="showPassword2 ? 'Login__hide' :'Login__show' ">
                          <img width="20" height="16"  src="../../assets/Images/eye-slash-regular.svg" @click="ChangePasswordEye2" alt="hide" :class="showPassword2 ? 'Login__show' :'Login__hide' ">
                        </div>
                        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                      </Field>
                   
                      <button  type="submit">Change password</button>
                 </Form>
            </div>
        </div>
    </app-modal>
</template>

<script setup>
import {ref} from 'vue'
import http from '@/plugins/axios';
import appModal from '../ui/app-modal.vue';
import Notification from '@/plugins/Notification';
import { Form, Field } from 'vee-validate';
 const form =ref({
    newpassword:'',
    conpassword:'',
    password:'',
});
const showPassword =ref(false)
 const showPassword1 =ref(false)
 const showPassword2 =ref(false)
const ChangePasswordEye=()=>{
    showPassword.value =!showPassword.value
 }
 const ChangePasswordEye1=()=>{
    showPassword1.value =!showPassword1.value
 }
 const ChangePasswordEye2=()=>{
    showPassword2.value =!showPassword2.value
 }

 const dialog = ref(false)
 const openModale = ()=>{
    dialog.value= !dialog.value
 }
 const updateUserPassword=()=>{
    http.post('/api/user/change-password/',{
        old_password:form.value.password,
        new_password:form.value.newpassword,
        new_password_confirm:form.value.conpassword
    }).then((res)=>{
        if(res.status===200){
            dialog.value=false
            Notification({text:'Everthing is Okey !!!'} , {type:'success'})
        }
    }).catch(err =>{
        if(err.status != 200){
            Notification({text:'Something is wrong !!!'} , {type:'danger'})           
        }
    })
}
 defineExpose({openModale})
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.Password{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .Password__change{
        width: 80%;
        background: #fff;
        border-radius: 8px;
        padding: 20px 0;
        h1{
            font-weight: 600;
            font-size: 30px;
            color: #272a2c;
            margin: 20px auto;
            text-align: center;
        }
        Form{
            width: 100%;
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
        img{
            width: 80px;
            height: 80px;
            -o-object-fit: cover;
            object-fit: cover;
            border-radius: 50%;
            position: relative;
        }
        .modal__form-change-img{
           
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
</style>