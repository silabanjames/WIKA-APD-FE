<template>
    <div class="row align-items-center">
       <div class="col-12 box-col-12 p-3">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Edit User </h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-7 order-md-0 order-1">
                            <form class="theme-form mega-form">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Name">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input class="form-control" type="text" placeholder="Email">
                                </div>
                              <div class="mb-5">
                                <router-link to="#">
                                    <p>Change Password</p>
                                </router-link>
                                </div>
                                  <!-- 
                                <div class="mb-3">
                                    <label class="form-label">Password Confirmation</label>
                                    <input class="form-control" type="password" placeholder="Password Confirmation">
                                </div>
                                -->
                                <div class="mt-5 mb-5 d-grid">
                                    <button class="btn btn-primary">Submit</button>
                                </div> 
                            </form>
                        </div>
                        <div class="col-md-5 text-center mb-3">
                            <div class="mb-3 border">
                                <img class="img-fluid" src="@/assets/images/ecommerce/card.png" alt="">
                            </div>
                            <div class="mt-3 mb-3">
                                    <input class="form-control w-100 d-flex justify-content-center" type="file">
                                </div>
                            <!-- <div class="mb-5 row">
                                <div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    