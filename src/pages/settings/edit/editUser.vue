<template>
    <div class="row align-items-center">
        <div class="col-12 box-col-12 p-3">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Edit User </h5>
                </div>
                <div class="card-body">
                    <form class="theme-form mega-form" @submit.prevent="submitForm">
                        <div class="row">
                            <div class="col-md-7 order-md-0 order-1">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Name" v-model="name">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input class="form-control" type="text" placeholder="Email" v-model="email">
                                </div>
                                <div class="mb-5">
                                    <router-link to="#">
                                        <p>Change Password</p>
                                    </router-link>
                                </div>
                                <div class="mt-5 mb-5 d-grid">
                                    <button class="btn btn-primary">Submit</button>
                                </div> 
                            </div>

                            <div class="col-md-5 text-center mb-3">
                                <div class="dz-message needsclick">
                                    <DropZone class="position-relative" ref="dropzone" :maxFileSize="Number(60000000)" url="http://127.0.0.1:3000/upload" :uploadOnDrop="false" @addedFile="uploaded" :maxFiles="1" :files="[file]"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: "",
            image: null
        }
    },
    props: ['id'],
    computed: {
        name: {
            set(value){ this.$store.commit('editUser/editName', value) },
            get(){ return this.$store.state.editUser.name }
        },
        email: {
            set(value){ this.$store.commit('editUser/editEmail', value) },
            get(){ return this.$store.state.editUser.email }
        }
    },
    methods: {
        async uploaded(event){
            this.file = event.file
        },
        submiteForm(){
            const formData = new FormData();
            formData.append('file', this.file)
            formData.append('name', this.name)
            formData.append('email', this.email)
            this.$store.dispatch('editUser/handleEditUser', formData)
            this.$router.push('/settings')
        },
        addFile() {
            // Add a file to the Dropzone
            this.$refs.dropzone.addFile(this.file);
        },

    },
    mounted(){
        this.$store.commit('editUser/editId', this.id)
        // console.log(this.$store.state.editUser.id)
        
        // const file = { size: 123, name: "Icon", type: "image/png" }
        // const file = new File("../../../assets/logo.png", "image/jpeg")
        // this.file = file
        // console.log(this.$refs.dropzone.manuallyAddFile(file, url))

        // this.$refs.dropzone.files = file
        console.log(this.$refs.dropzone)
    }
}
</script>