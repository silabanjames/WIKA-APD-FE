<template>
    <div class="row align-items-center">
        <div class="col-12 box-col-12">
            <div class="card">
                <div class="card-header py-4">
                    <h5>Add User </h5>
                </div>
                <div class="card-body">
                    <form class="theme-form mega-form">
                        <div class="row">
                            <div class="col-md-7 order-md-0 order-1 pe-5">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Name">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input class="form-control" type="text" placeholder="Email">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input class="form-control" type="password" placeholder="Password">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password Confirmation</label>
                                    <input class="form-control" type="password" placeholder="Password Confirmation">
                                </div>
                                
                                <div class="mb-3 d-grid">
                                    <button class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        
                            <div class="col-md-5 text-center">
                                <div class="d-flex flex-column align-items-center">
                                    <img class="img-fluid mb-2" src="@/assets/images/ecommerce/card.png" alt="">
                                    <input class="form-control w-100" type="file">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </template>
    