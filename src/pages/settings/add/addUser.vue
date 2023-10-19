<template>
    <div class="row align-items-center">
        <div class="col-12 box-col-12 p-15">
            <div class="card p-2">
                <div class="card-header py-3">
                    <h4>Add User</h4>
                </div>
                <div class="card-body">
                    <form class="theme-form mega-form">
                        <div class="row">
                            <div class="col-md-7 order-md-0 order-1 pe-5">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Name" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input class="form-control" type="text" placeholder="Email" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input class="form-control" type="password" placeholder="Password" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password Confirmation</label>
                                    <input class="form-control" type="password" placeholder="Password Confirmation" />
                                </div>
                                <div class="mb-3 d-grid">
                                    <button class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 text-center mb-3">
                            <div class="">
                                <div class="mb-3">
                                    <img class="img-fluid" :src="imageUrl" alt="Preview" v-if="imageUrl" />
                                    <input class="form-control-file d-flex m-10 text-center" type="file" @change="updateImage" />
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
            imageUrl: "../../assets/upload-image.png",
        };
    },
    methods: {
        updateImage(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        },
    },
};
</script>
