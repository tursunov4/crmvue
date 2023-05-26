<template>
    <div>
        <div class="profile__items">
            <editprofileModal ref="profilemodal"/>
            <changeRole ref="changemodal"/>
            <changePassword ref="passwordchange"/>
            <div class="profile__item1">
                <div class="profile__item1-img">
                    <img :src="$store?.state?.me?.image"  alt="user__image">
                </div>
                <p>{{ $store?.state?.me?.first_name }} {{ $store?.state?.me?.last_name  }} </p>
                <button @click="editProfile($store?.state?.me)" class="profile__item1-edit">Edit profile</button>
            </div>
            <div class="profile__item2">
                <p><span>Phone number</span><i class="fa-solid fa-right-long"></i><span> {{  $store?.state?.me?.phone_number }} </span></p>
                <p><span>Email</span><i class="fa-solid fa-right-long"></i><span>{{  $store?.state?.me?.email }} </span></p>
                <p><span>Username</span><i class="fa-solid fa-right-long"></i><span> {{  $store?.state?.me?.username }} </span></p>
                <p><span>Roles</span><i class="fa-solid fa-right-long"></i><span v-for="(item , index) in  $store?.state?.me?.roles" :key="index">{{ item }} </span></p>
                <p><span>Current role</span><i class="fa-solid fa-right-long"></i><span>{{  $store?.state?.me?.current_role }} </span><button @click="changeRoleProfile" class="profile__item-change_role">change</button> </p>
                <button @click="ChangeUserPassword" class="profile__item2-change-p">Change password</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Notification from '@/plugins/Notification';
import appModal from '@/components/ui/app-modal.vue';
import changeRole from '@/components/pages/change-role.vue';
import changePassword from '@/components/pages/change-password.vue';
import editprofileModal from '@/components/pages/editprofile-modal.vue';
import http from '@/plugins/axios';
import { Form , Field } from 'vee-validate';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const profilemodal = ref()
const changemodal = ref()
const passwordchange = ref()
 const dialog = ref(false)
 const showPassword =ref(false)
 const showPassword1 =ref(false)
 const showPassword2 =ref(false)

 const EditDialog = ref(false)
 const form =ref({
    newpassword:'',
    conpassword:'',
    password:'',
    profile_image :{},
    first_name :'' ,
    last_name :'',
    email :'',
    phone_number :''
});

const router = useRouter()
 const ChangePasswordEye=()=>{
    showPassword.value =!showPassword.value
 }
 const ChangePasswordEye1=()=>{
    showPassword1.value =!showPassword1.value
 }
 const ChangePasswordEye2=()=>{
    showPassword2.value =!showPassword2.value
 }

 const changeRoleProfile =()=>{
   changemodal.value.openChangeModal()
 }

const editProfile = (item)=>{
    profilemodal.value.openModal(item)
}

const Login=()=>{
    const forme = new FormData()
    forme.append('email' , form.value.email)
    forme.append('first_name' , form.value.first_name)
    forme.append('last_name' , form.value.last_name)
    forme.append('image' , form.value.profile_image)
    forme.append('phone_number' , form.value.phone_number)
    http.put('/api/user/me/' , forme).then((res)=>{
        if(res.status ===200){
            location.reload()
        }
    })
}
const ChangeUserPassword=()=>{
    passwordchange.value.openModale()
}
const updateUserPassword=()=>{
    http.post('/api/user/change-password/',{
        old_password:form.value.password,
        new_password:form.value.newpassword,
        new_password_confirm:form.value.conpassword
    }).then((res)=>{
        if(res.status===200){
            changePassword.value=false
            Notification({text:'Everthing is Okey !!!'} , {type:'success'})
        }
    }).catch(err =>{
        if(err.status != 200){
            Notification({text:'Something is wrong !!!'} , {type:'danger'})           
        }
    })
}
</script>

<style lang="scss" scoped>
$blue-color :#435ebe;
$input-bg:#edf2f7;
.profile__items {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-top: 25px;
    border-radius: 10px;
    padding: 50px 15px;
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .Login__roles{
        display: flex;
        flex-direction: column;
        align-items:center ;
        justify-content: center;
        padding: 10px;
        p{
            font-size: 30px;
            margin-bottom: 20px;
            word-spacing: 0.5px;
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
    .profile__item1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        .profile__item1-img {
            width: 240px;
            height: 240px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        p {
            font-size: 22px;
            font-weight: 500;
        }

        .profile__item1-edit {
            width: 100%;
            padding: 10px 0;
            border: none;
            background-color: #435ebe;
            color: #fff;
            border-radius: 5px;
            font-size: 17px;
            cursor: pointer;
        }
    }
    .edit__wrapper{
        width: 100%;      
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
    .profile__item2 {
        p {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 18px;
            padding: 5px 0;
            font-weight: 500;
            i{
                font-size: 14px;
            }
            &:hover{
                i{
                    color: #435ebe;
                    transform: translateX(4px);
                    transition: all 0.2s linear;
                }
            }
            span {
                font-size: 18px;
                font-weight: 500;
            }
            .profile__item-change_role {
                margin-top: 0;
                padding: 5px 10px;
                border: none;
                background-color: #435ebe;
                color: #fff;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
            }
        }

        .profile__item2-change-p {
            margin-top: 20px;
            width: 100%;
            padding: 10px 0;
            background-color: #e7e732;
            color: #000;
            border-radius: 5px;
            border: none;
            font-size: 17px;
            cursor: pointer;
        }
    }

</style>