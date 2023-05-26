<template>
    <appModal v-model="dialog">
        <div class="input_output">
            <h1 v-if="id" >Edit input invoice</h1>
            <h1 v-else>Add input invoice</h1>
               <Form >
                <label for="supplier"  v-if="!id">Select  supplier</label>
                        <select v-if="!id" v-model="forms.supplier" id="supplier">
                        <option selected disabled hidden >Select your supplier</option>
                        <option v-for="(item , index) in $store.state.suppliers" :value="item.id" >{{item.title}}</option>
                    </select>
                    <label for="description">Description</label>
                    <textarea v-model="forms.description" class="form__text" id="desc" placeholder="Description" ></textarea>
                    <button @click="send" v-if="id"> Edit input invoice </button>
                  <button @click="sendAdd" type="button" v-else > Add input invoice </button>
                </Form>
            </div>
    </appModal>
    <appModal v-model="dialog2">
        <div class="Password" >
            <div class="Password__change">
                <h1 >Add input invoce</h1>
                 <Form @submit="updateUserPassword">
                    <label  for="product">Select product</label>
                    <Field  rules="required" :modelValue="forms.product" v-slot="{ errors }" name="product">
                        <select v-model="forms.product">
                            <option disabled selected hidden value="">Select your product</option>
                            <option v-for="item in products" :key="item.id" :value="item.id">{{item.title}}</option>
                        </select>
                        <p class="login__input-error" v-if="errors && errors.length">
                            {{ errors[0] }}
                        </p>
                    </Field>
                    <label for="quantity">Quantity</label>
                    <Field rules="required" :modelValue="forms.quantity" v-slot="{ errors }" name="Quantity">
                        <input class="form__input" id="quantity" cols="10" rows="4" v-model="forms.quantity" placeholder="Quantity"/>
                        <p class="login__input-error" v-if="errors && errors.length">
                            {{ errors[0] }}
                        </p>
                    </Field>
                    <label for="price">Price</label>
                    <Field rules="required" :modelValue="forms.price" v-slot="{ errors }" name="Price">
                        <input class="form__input" id="price" cols="10" rows="4" v-model="forms.price" placeholder="Price"/>
                        <p class="login__input-error" v-if="errors && errors.length">
                            {{ errors[0] }}
                        </p>
                    </Field>
                    <button class="buttun__submit" >Add input invoce</button>
                 </Form>
            </div>
        </div>
    </appModal>
</template>

<script setup>
import appModal from '../ui/app-modal.vue';
import store from '@/store';
const url = window.location.href.split("/");
import { Form , Field } from 'vee-validate';
import { ref  , watch , onMounted} from 'vue';
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
import { useRouter } from 'vue-router';
const router = useRouter()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)
const products = ref([])
const forms = ref({
    supplier: 0,
  description: "",
  quantity:'',
  price:'',
  product:''
})
const openModal = (item) => {
    if(item && item.id){
        forms.value ={...item}
        id.value = item.id
    }
    dialog.value = true
}
 watch(dialog , (value) =>{
    if(!value){
        id.value = null
        forms.value.supplier = ''
        forms.value.description= ''
    }
  })
  const openModal2 =()=>{
    dialog2.value = true
  
  }

const send =()=>{
    if(id){
        http.put(`/api/warehouse/input-invoice/${id.value}/` ,{
            description :forms.value.description
        }).then(res =>{
          if(res.status === 200){
           location.reload()
          }
        }).catch(err =>{
            console.log(err)
        })  
    }    
}
const sendAdd =()=>{
    http.post('/api/warehouse/input-invoice/' ,{
        supplier: forms.value.supplier,
        description:forms.value.description
    } ).then((res)=>{
                if(res.status === 201){
                    router.push(`/invoise-item/${res.data.id}`)
                }
         })
}
const updateUserPassword =()=>{
    http.post(`/api/warehouse/input-invoice-item/`, {
                product:forms.value.product-0,
                quantity: forms.value.quantity-0,
                price: forms.value.price-0,
                invoice :url[4]
            }).then(res => {
                if (res.status === 201) {
                    location.reload()
                    Notification({ text: "Invoice item updated !!!" }, {type: "success"}
                    )}
                })
}
const getProducts =()=>{
    http.get('/api/warehouse/product/').then(res=>{
      products.value = [...res.data.results]
      console.log(res.data.results)
    })
}
getProducts()
defineExpose({ openModal   , openModal2})
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.input_output{
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
     h1 {
        text-align: center;
    }
    Form {
    width: 80%;
    display: flex;
    flex-direction: column;
    label {
        margin: 10px 0;
        font-weight: 500;
        font-size: 16px;
        color: #2c2728;
    }
    select{
        width: 100%;
        height: 35px;
        font-size: 16px;
        border-radius: 5px;
    }
    .form__text{
        padding: 10px;
        height: 70px;
        border: 1px solid #363636;
    }
    button {
        margin-top: 20px;
        padding: 10px 0;
        background-color: #435ebe;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
}
}
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
    display: block;
    margin: 10px 0;
    font-weight: 500;
    font-size: 16px;
    color: #2c2728;
}
button{
    width: 100%;
    margin-top: 40px;
    border: none;
    padding: 10px 0px;             
    color: #fff;
    font-size: 16px;
    background-color: $blue-color;
    border-radius: 5px;
    cursor: pointer;
}
select{
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

