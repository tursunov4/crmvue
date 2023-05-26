<template>
    <section class="input_item ">
        <arrvedModal ref="dialog"/>
        <div class="input_item__bar">
            <div class="input_bar-info">
                <span>{{ copanyname.title }}</span>
                <span>{{ inputInvoice.total_sum }}</span>
            </div>
            <button v-if="role !== 'director'" @click="openModal" class="btn">Add product</button>
        </div>
        <div class="product__lists-table">
            <appTable :headers="headers" :body="invoice_item">
                <template #body_product="{ item }">
                    <span>{{ item.product.title }} </span>
                </template>
                <template #body_code="{ item }">
                    <span>{{ item.product.code }} </span>
                </template>
            </appTable>
            <div class="pagination__action">
                <div class="actions">
                    <router-link v-if="inputInvoice.status !== 'new' && role !=='director' " to="/arrived-warhen" class="btn1" >
                        <i class="left fa-solid fa-left-long"></i>
                        <span >Back</span>
                    </router-link>
                    <router-link v-if=" role ==='director' " to="/arrived-warhen_d" class="btn1" >
                        <i class="left fa-solid fa-left-long"></i>
                        <span >Back</span>
                    </router-link>
                    <router-link v-if="inputInvoice.status === 'new' && role !== 'director' " to="/arrived-warhen" class="btn">save</router-link>
                    <button @click="confirmInvoice"  v-if="inputInvoice.status === 'new' && role !== 'director' " class="btn">confirm</button>
                    <button @click="deletInvoiceItem" v-if="inputInvoice.status === 'new' && role !== 'director' " class="btn">delete</button>
                </div>
                <div class="pagination">
                    <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF"
                        @update:modelValue="getProducts" />
                </div>
            </div>
        </div>

    </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import arrvedModal from "@/components/pages/arrved-modal.vue";
import http from "@/plugins/axios";
import appTable from "@/components/ui/app-table.vue";
import VPagination from '@hennge/vue3-pagination'
import Notification from "@/plugins/Notification";
const role = sessionStorage.getItem('role')
const dialog = ref()
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})
const url = window.location.href.split("/");
const invoice_item = ref([])
const inputInvoice = ref({})
const copanyname = ref({})
const invoice_modal = ref()
const router = useRouter()
const openModal =()=>{
    dialog.value.openModal2()
}
const headers = ref([
    { title: "№", value: "index" },
    { title: "Product", value: "product" },
    { title: "Code", value: "code" },
    { title: "Price", value: "price" },
    { title: "Quantity", value: "quantity" },
    { title: "Invoice", value: "invoice" },
    { title: "Action", value: "action" }
])
const getInputInvoiceItem = () => {
    http.get(`/api/warehouse/input-invoice-item/`, {
        params: {
            invoice: url[4],
            per_page: params.value.per_page,
            page: params.value.page
        }
    }).then(res => {
        invoice_item.value = res.data.results
        invoice_item.value.forEach((item, index) => {
            item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    }).catch((err) => {
        console.log(err)
    })
}
const getInputItem = () => {
    http.get(`/api/warehouse/input-invoice/${url[4]}`).then((res) => {
        inputInvoice.value = res.data
        copanyname.value = res.data.supplier
        console.log(res.data, "inputInvoice")
    }).catch((err) => {
        console.log(err)
    })
}
const deletInvoiceItem =()=>{
    http.delete(`/api/warehouse/input-invoice/${url[4]}/`).then((res)=>{
        if(res.status ===204){
            router.push({name:'arrived-warhen'})
            Notification({text:'Invoice item deleted !!!!'} , {type:'danger'})
        }
    }).catch((err)=>{
        Notification({text:'Error !!!'} , {type:'danger'})
    })
}
const confirmInvoice =()=>{
    http.post(`/api/warehouse/input-invoice/${url[4]}/confirm/`).then((res)=>{
        if(res.status === 200){
            router.push({name:'arrived-warhen'})
            Notification({text:'Status confirmed !!!'} ,{type:'warning'})
        }
    }).catch((err)=>{
        Notification({text:'Error !!!'} , {type:'danger'})
    })
}
onMounted(() => {
    getInputInvoiceItem()
    getInputItem()
   
    
})

</script>
<style lang="scss">
.input_item {
    padding: 15px;

    .input_item__bar {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .input_bar-info {
            display: flex;
            gap: 20px;

            span {
                display: block;
                padding: 10px 15px;
                border: 3px solid rgba(180, 223, 233, .4);
                border-radius: 5px;
                color: #435ebe;
                font-size: 18px;
                letter-spacing: .7px;
            }
        }

        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #435ebe;
            color: #fff;
        }
    }

    .product__lists-table {

        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: scroll;

        .pagination__action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0;

            .actions {
                display: flex;
                align-items: center;
                gap: 10px;
                .btn1 {
                    width: 100px;
                    padding: 8px 5px;
                    border-radius: 5px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    background-color: #435ebe;
                    .left {
                        font-size: 14px;
                        transition: all .3s linear;
                    }
                }
                .btn:first-child {
                    background-color: #57caeb;
                    color: #fff;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .btn:nth-child(2) {
                    background-color: #435ebe;
                    color: #fff;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .btn:nth-child(3){
                    background-color: #ff7976;
                    color: #fff;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
    }
}

.pagination {
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0px;
}
</style>