<template>
    <div class="row align-items-center">
        <div class="col-12 box-col-12 p-15">
            <div class="card p-2">
                <div class="card-header py-3">
                    <h4>Add User</h4>
                </div>
                <div class="card-body">
                    <form class="theme-form mega-form" @submit.prevent="submitForm">
                        <div class="row">
                            <div class="col-md-7 order-md-0 order-1 pe-5">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Name" v-model="name"/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input class="form-control" type="text" placeholder="Email" v-model="email"/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input class="form-control" type="password" placeholder="Password" v-model="password"/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password Confirmation</label>
                                    <input class="form-control" type="password" placeholder="Password Confirmation" v-model="confirmPassword"/>
                                </div>
                                <div class="mb-3 d-block">
                                    <label class="form-label me-3"> Role </label>
                                    <select name="role" v-model="role">
                                        <option value="worker">worker</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <div class="mb-3 d-grid">
                                    <button class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                            
                            <div class="col-md-5 text-center mb-3">
                                <!-- Upload 1 -->
                                <!-- <div class="mb-3">
                                    <img class="img-fluid" :src="imageUrl" alt="Preview" v-if="imageUrl" />
                                    <input class="form-control-file d-flex m-10 text-center" type="file" @change="updateImage" />
                                </div> -->
                                <div class="dz-message needsclick">
                                    <DropZone class="dropzone_scope" :maxFileSize="Number(60000000)" ref="dropzone" url="http://127.0.0.1:3000/upload" :uploadOnDrop="false" :maxFiles="1" @addedFile="uploaded" options.removeLinks="true" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
img{
    max-width: 100%; 
    height: auto;
}

.dropzone__item{
    position: relative;
}

i.gg-close{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6%;
    height: 6%;
    cursor: pointer;
    position: absolute;
    background: rgba(255,255,255,0.8);
    border-radius: 45%;
    top: 5px;
    right: 5px;
}

i.gg-close:hover{
    background: rgba(255,255,255,0.6);
}

i.gg-close::after, i.gg-close::before{
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 80%;
    height: 10%;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    padding: .15rem;
}

i.gg-close::after{
    transform: rotate(-45deg);
}
</style>

<script>
import getImage from "@/mixins/getImage"
import Swal from 'sweetalert2'
export default {
    mixins: [getImage],
    data() {
        return {
            // imageUrl: "../../../assets/upload-image.png",
            // file: "",
            profilePicture: "",
            // id: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        };
    },
    methods: {
        /*
        * Fungsi Upload 1
        */
        // updateImage(event) {
        //     const file = event.target.files[0];
        //     console.log(file)

        //     if (file) {
        //         const reader = new FileReader();

        //         reader.onload = (e) => {
        //             this.imageUrl = e.target.result;
        //             console.log(e.target.result)
        //             console.log(e)
        //         };

        //         reader.readAsDataURL(file);
        //     }
        // },

        async uploaded(event){
            /*
            * Menyimpan file
            */
            // this.file = event.file
            this.profilePicture = event.file
            console.log(this.$refs.dropzone)
            console.log(this.$refs.dropzone.initialFiles)

        },
        submitForm(){
            const formData = new FormData();
            formData.append('file', this.file)
            formData.append('profilePicture', this.profilePicture)
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('confirmPassword', this.confirmPassword)
            formData.append('role', this.role)
            const handleAddUser = this.$store.dispatch('addUser/handleAddUser', {formData})
            
            Swal.fire({
                title: "User Created Successfully !",
                icon: "success"
            })
            this.$router.push('/settings')

            /*
            * Flash message
            */
            /*
            if(handleAddUser){
                // tambahkan flash message ketika sukses
                this.$router.push('/settings')
            }
            else{
                // tambahkan flash message ketika gagal
            }
            */
        },
    },
    mounted(){
    }
};
</script>
