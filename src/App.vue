<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {provide, ref} from "vue";

let update_item_id = ref(0)
let selected_item = ref({})

provide('update_item_id', update_item_id)
provide('selected_item', selected_item)

</script>

<template>

  <nav>
    <RouterLink to="/" class="link" active-class="active">Home</RouterLink>
    <RouterLink to="/add" class="link" active-class="active">Add</RouterLink>
  </nav>

  <RouterView/>

</template>

<style scoped>
nav {
  /*outline: 1px solid red;*/
  padding: 10px;
  display: flex;
  gap: 10px;
}
.link {
  color: white;
  text-decoration: none;
}
.active {
  text-decoration: underline;
}
</style>
