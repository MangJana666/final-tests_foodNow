<template>
  <div class="d-flex gap-2 col-3 justify-content-end">
    <a type="button" class="btn btn-login" style="color: white">Login</a>
    <button
      type="button"
      class="btn btn-register"
      style="border-radius: 20px; background-color: #e67e22"
    >
      Register
    </button>
  </div>
</template>

<style>
.btn-login {
  color: white;
}

.btn-login:hover {
  color: #e67e22 !important;
}
.btn-register:hover {
  background-color: rgb(185, 180, 180) !important;
}

.btn-register {
  color: white !important;
  width: 120px;
}
</style>
