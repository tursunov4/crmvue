<template>
   <appModal v-model="dialog" >
    <Form @submit="Login">
          <h2>Add expence</h2>
        <div v-if="invoiceitem"  class="Login__roles">
            <h6 class="p-text">Select invoice</h6>
            <select  @change="handlechange2"  v-model="form.invoice">
                <option disabled selected hidden  value="">Select invoice</option>
                <option v-for="item in invoice " :key="item.id" :value="item.id">
                    {{ item.supplier.title }}
                </option>                    
            </select>
        </div>
        <div v-if="returneditem" class="Login__roles">
            <h6 class="p-text">Select returned invoice</h6>
            <select @change="handlechange" v-model="form.return">
                <option disabled selected hidden  value="">Select returned invoice</option>
                <option v-for="item in returned" :key="item.id" :value="item.id">
                    {{ item.client.title }}
                </option>                    
            </select>
        </div>
        <label for="login">Amount</label>
        <Field 
         rules="required" name="Amount" :modelValue="form.amount" v-slot="{errors}" >
        <input type="text" v-model="form.amount" id="login" placeholder="Amount">
        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
        </Field>
        <label for="description">Description</label>
        <Field 
        rules="required"
        name="Description" 
        :modelValue="form.description"
        v-slot="{errors}"
        >
         <textarea v-model="form.description" class="form__text" id="description" placeholder="Description..."></textarea>
         <p class="login__input-error" v-if="errors && errors.length">
             {{ errors[0] }}
         </p>
        </Field>         
        <button  type="submit">Add expence</button>
    </Form>
   </appModal>
   <appModal v-model="dialog2" >
    <Form @submit="Login2">
           <h2>Add income</h2>
            <div  class="Login__roles">
            <h6 class="p-text">Select income type</h6>
            <select @change="handlechange3"   v-model="form2.type">
                <option disabled selected hidden  value="">Select income type</option>
                <option  value="from_outside">
                  From outside
                </option>                    
                <option  value="from_sales">
                  From sales
                </option>                    
            </select>
        </div>
            <div v-if="sales"  class="Login__roles">
            <h6 class="p-text">Select sales</h6>
            <select @change="handlechange3"   v-model="form2.sales">
                <option disabled selected hidden  value="">Select sales</option>
                <option v-for="item in saleslist" :key="item.id" :value="item.id">
                    {{ item.title }}
                </option>               
            </select>
        </div>
     
        <label for="login">Amount</label>
        <Field 
         rules="required" name="Amount" :modelValue="form2.amount" v-slot="{errors}" >
        <input type="text" v-model="form2.amount" id="login" placeholder="Amount">
        <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
        </Field>
             
        <button  type="submit">Add income</button>
    </Form>
   </appModal>
</template>

<script setup>
import { ref  , onMounted} from 'vue';
import { Form , Field } from 'vee-validate';
import appModal from '../ui/app-modal.vue';
import http from '@/plugins/axios';
const sales = ref(false)
const saleslist  = ref([])
const invoiceitem = ref(true)
const returneditem = ref(true)
const invoice = ref([])
const returned = ref([])
const dialog = ref(false)
const dialog2 = ref(false)
const openModal =()=>{
    dialog.value=true
}
const openModal2 =()=>{
    dialog2.value = true
}
const handlechange =()=>{
    invoiceitem.value = false
}
const handlechange2 =()=>{
    returneditem.value = false
}
const handlechange3 =(e)=>{
  if(e.target.value === 'from_sales'){
    sales.value = true
   console.log(sales.value)
  }
}
const form =ref({
    amount:'',
    invoice:'',
    return:'',
    description:''
})
const form2 =ref({
    amount :'',
    type:'',
    sales :''
})
const getInovice =()=>{
    http.get('/api/warehouse/input-invoice/').then(res =>{
        console.log(res.data.results)
     invoice.value = res.data.results
    })
}
const getReturn =()=>{
    http.get('/api/warehouse/returned-invoice/').then(res =>{
        console.log(res.data.results)
       returned.value = res.data.results
    })
}
const Login =()=>{
    if(returneditem.value){        
        http.post('/api/finance/expense/' ,{
        returned_invoice: form.value.return,
       amount: form.value.amount,
        description: form.value.description
        }).then(res=>{
            if(res.status ===201){
                location.reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    if(invoiceitem.value){        
        http.post('/api/finance/expense/' ,{
            invoice: form.value.invoice,
            amount: form.value.amount,
            description: form.value.description
        }).then(res=>{
            if(res.status ===201){
                location.reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}
const getSales = ()=>{
    http.get('/api/sales/client/').then(res=>{
        console.log(res.data.results)
        saleslist.value = res.data.results
    })
}
const Login2 = ()=>{
    if(sales){
        http.post('/api/finance/income/' ,{
            income_type: form2.value.type,
            invoice: form2.value.sales,            
            amount: form2.value.amount
        }).then(res=>{
            if(res.status == 201){
                location.reload()
            }
        })
    }
    else{
        http.post('/api/finance/income/' ,{
            income_type: form2.value.type,           
            amount: form2.value.amount
        }).then(res=>{
            if(res.status == 201){
                location.reload()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
onMounted(()=>{
    getInovice()
    getReturn()
    getSales()
})
defineExpose({openModal , openModal2})
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.Login__roles{
    display: flex;
    flex-direction: column;
 
  
   .p-text{
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
        margin: 15px auto;
        display: flex;
        flex-direction: column;
        h2{
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
    }
</style>