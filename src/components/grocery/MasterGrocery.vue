<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import PercentCircle from "./sub-components/PercentCircle.vue";

let props = defineProps(["data"]);
const curr_api = inject("curr_api");
const update_item_id = inject("update_item_id");

let expiry_days_remaining = ref(0)

function calc_date_percentage() {
  let acquired_date = new Date(props['data']['acquired_date'])
  let expiry_date = new Date(props['data']['expiry_date'])
  let current_date = new Date()

  // console.log(acquired_date, expiry_date, current_date)
  // let percentage = ((current_date - acquired_date) / (expiry_date - acquired_date)) * 100

  expiry_days_remaining.value = Math.ceil((expiry_date - current_date) / (1000 * 60 * 60 * 24));
}

function delete_item() {
  const url = new URL(`${curr_api}/grocery/delete`)
  url.searchParams.set('id', props['data']['id'])

  fetch(url, {method: 'DELETE'})
      .then(response => response.json())
      .then(data => {
        update_item_id.value = props['data']['id']
        console.log(data);
      })
}

onMounted(() => {
  calc_date_percentage()
})
</script>

<template>
  <div class="wrapper_master_grocery">

    <button class="delete_button" @click="delete_item">x</button>
    <percent-circle class="percent_circle" :score="expiry_days_remaining"></percent-circle>
    <img class="preview" :src="data['preview_image']" alt="product_image">

    <div class="master_footer">
      <h1>{{ data['name'] }}</h1>
      <h2>{{ '$' + data['price'] }}</h2>
    </div>


  </div>
</template>

<style scoped>
.wrapper_master_grocery {
  /*outline: 1px solid greenyellow;*/
  position: relative;
  /*height: 250px;*/
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: black 2px 2px 2px;
  background-color: #282828;
}
h1 {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
h2 {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.master_footer {
  position: relative;
  /*outline: 1px solid red;*/
  /*height: 50px;*/
  padding: 0 8px 8px 8px;
}

.preview {
  width: 100%;
  object-fit: contain;
  /*background-color: white;*/
}

.percent_circle {
  position: absolute;
  height: 50px;
}

.delete_button {
  position: absolute;
  right: 0;
  padding: 2px 7px 2px 7px;
}
</style>