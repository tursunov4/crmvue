<template>
    <section class="single_product router" >  
        <products ref="productss"/>      
        <img alt="product"  :src="single_product.image">
        <div>
            <p class="single_product-name">{{single_product.title}}</p>
            <div class="single_product-features" >
                    <p ><span >Group: </span> <span >{{ single_product?.group?.title }} </span></p>
                    <p><span >Brand: </span><span >{{ single_product?.brand?.title }}</span></p>
                    <p><span >Price: </span><span >{{ single_product.current_selling_price }} </span></p>
                    <p><span >Code: </span><span >{{single_product.code}}</span></p>
                    <p><span >Description</span></p>
                    <h5>{{ single_product.description }} </h5>
                </div>
                <div class="single_product-act" >
                    <button  v-if="role !== 'director'" @click="editProdcut(single_product)" >Edit</button><button  v-if="role !== 'director'" @click="deleteProdcut(single_product)">Delete</button>
                </div>
            </div>
        </section>
</template>

<script setup>
import http from '@/plugins/axios';
import { ref , onMounted } from 'vue';
import products from '@/components/pages/products.vue';
const role = sessionStorage.getItem('role')
const url = window.location.href.split("/")
const single_product =ref({})
const productss = ref()
const getSingleProdcut = ()=>{
    http.get(`/api/warehouse/product/${url[4]}`).then((res)=>{
    console.log(res.data)
      single_product.value = res.data
    })
}
onMounted(()=>{
    getSingleProdcut()
})
const deleteProdcut =(item)=>{
    productss.value.openDeletModal(item)
}
const editProdcut =(item)=>{
   productss.value.openModal(item)
}
</script>

<style lang="scss" scoped>
.single_product {
    padding: 30px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 25px;
    img{
        width: 500px;
        height: 500px;
        border-radius: 15px;
        object-fit: cover;
    }
    .single_product-name {
        font-size: 30px;
        letter-spacing: 1px;
    }
    .single_product-features {
        margin-top: 30px;
         p {
            font-size: 18px;
            margin: 12px 0;
            span:first-child {
                color: #435ebe;
            }
            span:nth-child(2) {
                color: #4c4c4c;
            }
        }
        h5 {
            font-weight: 400;
            font-size: 15px;
            color: #656565;
            letter-spacing: .8px;
        }
    }
    .single_product-act {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 40px 40px;
        gap: 10px;
        margin-top: 60px;
        button:first-child {
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            letter-spacing: .8px;
            background-color: #435ebe;
        }
        button:nth-child(2) {
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            letter-spacing: .8px;
            background-color: #ff7976;
        }
    }
}

</style>