<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import MasterGrocery from "./MasterGrocery.vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const update_item_id = inject("update_item_id");

let groceries = ref([])

function get_groceries() {
  const url = new URL(`${curr_api}/grocery/get`)
  // url.searchParams.set('none','none')
  fetch(url)
      .then(response => response.json())
      .then(data => {
        groceries.value = data.sort((a,b) => new Date(a['expiry_date']) > new Date(b['expiry_date']))
        console.log(data);
      })
}

onMounted(() => {
  get_groceries()
})
watch(update_item_id,(oldV,newV) =>{
  get_groceries()
})
</script>

<template>
  <div class="wrapper_list_grocery">
    <master-grocery v-for="entry in groceries" :key="entry['id']" :data="entry"></master-grocery>
  </div>
</template>

<style scoped>
.wrapper_list_grocery {
  /*outline: 1px solid red;*/
  width: 100%;

  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  /*justify-items: center;*/
  /*display: grid;*/
  /*grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));*/

  gap: 15px;
}
</style>