<script setup lang="ts">
import AuthButton from "./AuthButton.vue";
import NavbarLink from "./NavbarLink.vue";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container mt-3">
        <div class="col-3">
          <a href=""> <img src="/src/assets/logo/logo.svg" alt="" /></a>
        </div>
        <NavbarLink />
        <AuthButton />
      </div>
    </nav>
    <h1
      class="text-center align-items-center"
      style="margin-top: 150px; color: #e67e22; font-size: 80px"
    >
      Pizza Order
    </h1>
  </header>
</template>
