<template>
    <section>
        <section class="dashboard__head">
            <div class="dashboard__head-item">
                <h3>Current month profit</h3>
                <p>{{ dashboard.profit }}</p>
            </div>
            <div class="dashboard__head-item">
                <h3>Current month income</h3>
                <p>{{ dashboard.total_income }}</p>
            </div>
            <div class="dashboard__head-item">
                <h3>Current month expense</h3>
                <p>{{ dashboard.total_expense }}</p>
            </div>
        </section>
        <section>
            <BarChartDemo />
        </section>
        <section class="dashboard__table">
            <div>
                <h2>Top clients</h2>
                <AppTable :headers="headers" :body="top_clients">
                    <template #body_title="{ item }">
                        <span>{{ item.title }}</span>
                    </template>
                </AppTable>
                <div class="pagination">
                    <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF"
                        @update:model-value="getTopClients" />
                </div>
            </div>
            <div>
                <h2>Top products</h2>
                <AppTable :headers="headers2" :body="top_products">
                    <template #body_title="{ item }">
                        <span>{{ item.title }}</span>
                    </template>
                </AppTable>
                <div class="pagination">
                    <VPagination v-model="params2.page" :pages="params2.last_page" :range-size="1" active-color="#EAF5FF"
                        @update:model-value="getTopProducts" />
                </div>
            </div>
        </section>
    </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import VPagination from "@hennge/vue3-pagination"
import BarChartDemo from '@/components/layout/BarChartDemo.vue';
import AppTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';

const dashboard = ref({})
const top_clients = ref([])
const top_products = ref([])

const params = ref({
    page: 1,
    per_page: 10,
    last_page: null
})

const params2 = ref({
    page: 1,
    per_page: 10,
    last_page: null
})

const headers = ref([
    { title: "№", value: "index" },
    { title: "Client name", value: "title" },
    { title: "Phone number", value: "phone_number" },
    { title: "Total sale", value: "total_sales" },
])

const headers2 = ref([
    { title: "№", value: "index" },
    { title: "Product name", value: "title" },
    { title: "Code", value: "code" },
    { title: "Total sale", value: "total_sales" },
])

const getDashboard = () => {
    http.get("/api/dashboard/monthly-profit/").then(res => {
        dashboard.value = res.data
    })
}

const getTopClients = () => {
    http.get("/api/dashboard/top-clients/", {
        params: {
            per_page: params.value.per_page,
            page: params.value.page
        }
    }).then(response => {
        top_clients.value = response.data.results
        top_clients.value.forEach((item, index) => {
            item.index = params.value.page * params.value.per_page - (params.value.per_page - 1) + index
        })
        params.value.last_page = Math.ceil(response.data.count / params.value.per_page)
    })
}

const getTopProducts = () => {
    http.get("/api/dashboard/top-products/", {
        params: {
            per_page: params2.value.per_page,
            page: params2.value.page
        }
    }).then(response => {
        top_products.value = response.data.results
        top_products.value.forEach((item, index) => {
            item.index = params2.value.page * params2.value.per_page - (params2.value.per_page - 1) + index
        })
        params2.value.last_page = Math.ceil(response.data.count / params2.value.per_page)
    })
}

onMounted(() => {
    getDashboard()
    getTopClients()
    getTopProducts()
})

</script>
<style lang="scss" scoped>
$blue-color2: #57caeb;

.dashboard__head {
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .dashboard__head-item {
        padding: 12px 20px;
        background-color: $blue-color2;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
    }
}

.dashboard__table {
    padding: 50px 0;
    display: flex;
    justify-content: space-around;

    .pagination {
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 10px 0px;
    }
}
</style>