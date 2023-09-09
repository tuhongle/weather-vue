<script setup lang="ts">
</script>

<template>
  <main class="bg-dark text-light">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a href="#" class="navbar-brand d-flex align-items-end">
          <img src="/logo-white.png" alt="logo" class="img-fluid" width="50">
          <span class="ms-2 h1 text-light fw-medium mb-0">firocther</span>
        </a>
        <div class="input-group">
          <label>
            <i class="bi bi-search"></i>
            <input type="text" class="form-control" placeholder="Search city...">
          </label>
        </div>
        <div>
          <button class="btn btn-primary rounded-pill">
            <i class="bi bi-geo-fill"></i>
            Current Location
          </button>
        </div>
      </div>
    </nav>
  </main>
</template>
