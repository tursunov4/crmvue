export default {
    
        path: '/login',
        name: 'login',
        component: ()=>{
            return import('@/views/Auth/Login')
        }
}