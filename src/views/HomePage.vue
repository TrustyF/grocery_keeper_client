<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import ListGrocery from "../components/grocery/ListGrocery.vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");

</script>

<template>
  <div class="wrapper_home_page">
    <list-grocery></list-grocery>
  </div>
</template>

<style scoped>
.wrapper_home_page {
  display: flex;
  /*outline: 1px solid red;*/
  width: 95%;
  margin: auto;
}
</style>