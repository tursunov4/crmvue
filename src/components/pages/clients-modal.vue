<template>
    <appModal v-model="dialog">
        <div class="modal" >
            <h3 v-if="id">Edit Client</h3>
            <h3 v-else>Add Client</h3>
            <Form @submit="send">
                <label for="login">Client Name</label>
                <Field 
                 rules="required" name="Client Name" :modelValue="form.title" v-slot="{errors}" >
                <input type="text" v-model="form.title" id="login" placeholder="Client Name">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <label for="login1">Address</label>
                <Field 
                 rules="required" name="Address" :modelValue="form.address" v-slot="{errors}" >
                <input type="text" v-model="form.address" id="login1" placeholder="Address">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <label for="login2">Phone Number</label>
                <Field 
                 rules="required" name="Phone Number" :modelValue="form.phone_number" v-slot="{errors}" >
                <input type="text" v-model="form.phone_number" id="login2" placeholder="Phone Number">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <button v-if="id" type="submit">Edit Client</button>
                <button v-else type="submit">Add Client</button>
            </Form>
        </div>
    </appModal>
</template>

<script setup>
import appModal from '../ui/app-modal.vue';
import { ref } from 'vue'
import { Form , Field } from 'vee-validate';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const id = ref(null)
const dialog = ref(false)
const openModal = (value) => {
    if(value && value.id){
        form.value = {...value}
        id.value = value.id
    }
    dialog.value = ref
}
const form =ref({
    title :'',
    address :'',
    phone_number :''
})
async function send(event){
    try{
       
        if(!id.value){
            await http.post('/api/sales/client/' ,{
                title :form.value.title ,
                phone_number :form.value.phone_number,
                address :form.value.address
            } ).then((res)=>{
                if(res.status === 201){
                    location.reload()
                    Notification({title :'Added cliet'} , {type:'success'})
                }
            })
            
        }
        else await http.put(`/api/sales/client/${id.value}/` ,{
            title :form.value.title ,
            phone_number :form.value.phone_number,
            address :form.value.address
        }).then(res =>{
        })
        dialog.value = false
        if(!id.value){
            location.reload()
            Notification({text:'Client addedd !!!'} , {type :'success'})
        }else{
            location.reload()
            Notification({text:'Client updated'} , {type :'warning'})
        }
    }
    catch(err){
        console.log(err)
        Notification({text:'Somthing wrong'} , {type :'danger'})
    }
}
defineExpose({ openModal })
</script>


<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
        text-align: center;
        margin: 10px 0;
        font-size: 25px;
    }
    Form{
        width: 60%;
        margin: 30px 0px;
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