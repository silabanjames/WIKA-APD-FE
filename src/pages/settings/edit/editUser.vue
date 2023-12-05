<template>
    <div class="row align-items-center">
        <div class="col-12 box-col-12 p-3">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Edit User </h5>
                </div>
                <div class="card-body">
                    <form class="theme-form mega-form" @submit.prevent="submitForm(id)">
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
                                <div class="preview-container">
                                    <img :src="image ? image : this.user_details.profilePicture" alt="Profile Image" class="preview-image rounded">
                                    <input type="file" class="d-block text-center mx-auto" @change="updateImage">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <span>{{ id }}</span>
    <span>{{ user_id }}</span>
</template>

<style>
.preview-image{
    margin: 0 auto;
    margin-bottom: 40px;
    max-width: 200px;
    width: 100%;
}

input::file-selector-button{
    background-color: rgb(59 130 246);
    color: whitesmoke;
    border-style: none;
    border-radius: 6px;
    padding: 4px 8px;
}

input::file-selector-button:hover{
    cursor: pointer;
    background-color: rgb(96 165 250);
}

.preview-container{
    margin-top: auto;
    margin-bottom: auto;
    border-width: 4px;
    border-style: dashed;
    padding-top: 16px;
    padding-bottom: 8px;
    border-color: rgb(179, 166, 233);
    background-color: rgb(196, 181, 253, 0.1)
}

</style>

<script>
export default {
    data() {
        return {
            file: '',
            image: null,
            name: "",
            email: "",
        }
    },
    props: ['id'],
    computed: {
        user_details: {
            get(){
                return this.$store.state.settings.user
            }
        }
    },
    methods: {
        submitForm(){
            const formData = new FormData();
            if(this.file) formData.append('profilePicture', this.file)
            if(this.name !== this.user_details.name) formData.append('name', this.name)
            if(this.email !== this.user_details.email) formData.append('email', this.email)
            this.$store.dispatch('settings/handleEditUser', {id: this.id, formData})
        },        
        updateImage(event){
            this.file = event.target.files[0]
            if(this.file){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = e.target.result
                }
                reader.readAsDataURL(this.file)
            }
        }
    },
    async beforeMount(){
        await this.$store.dispatch("settings/searchDetailUser", {id: this.id})
        this.name = this.user_details.name
        this.email = this.user_details.email
    }
}
</script>