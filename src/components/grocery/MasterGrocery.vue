<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import PercentCircle from "./sub-components/PercentCircle.vue";
import {useConfirm} from "primevue/useconfirm";

let props = defineProps(["data"]);

const confirm = useConfirm();
const openDialog = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    accept: () => {
      // isVisible.value = true;
      delete_item()
    },
    reject: () => {
      // isVisible.value = false;
      console.log('false')
    }
  });
};

const curr_api = inject("curr_api");
const update_item_id = inject("update_item_id");
const selected_item = inject("selected_item");

let expiry_days_remaining = ref(0)

function calc_date_percentage() {
  let acquired_date = new Date(props['data']['acquired_date'])
  let expiry_date = new Date(props['data']['expiry_date'])
  let current_date = new Date()

  // console.log(acquired_date, expiry_date, current_date)
  // let percentage = ((current_date - acquired_date) / (expiry_date - acquired_date)) * 100

  expiry_days_remaining.value = Math.ceil((expiry_date - current_date) / (1000 * 60 * 60 * 24));
}

function mark_outdated(){
  if (expiry_days_remaining.value <= 0){
    let element = document.getElementById(`wrapper_master_grocery${props['data']['id']}`)
    element.classList.add('orange_glow')

    if (expiry_days_remaining.value <= -3){
      element.classList.add('red_glow')
    }
  }
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
  mark_outdated()
})
</script>

<template>
  <div class="wrapper_master_grocery" :id="`wrapper_master_grocery${data['id']}`" @click="selected_item=data">

    <img src="/ui/xbutton_87873.png" @click="openDialog()" class="delete_button" alt="delete_button">

    <percent-circle class="percent_circle" :score="expiry_days_remaining"></percent-circle>

    <img class="preview" :src="data['preview_image']" alt="product_image">

    <div class="master_footer">
      <h1>{{ data['name'] }}</h1>
      <h3>{{ new Date(data['expiry_date']).toLocaleDateString() }}</h3>
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

.orange_glow {
  box-shadow: orange 0 0 5px, #5e3e00 0 0 30px;
}
.red_glow {
  box-shadow: red 0 0 5px, #a40404 0 0 30px;
}
h1 {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  font-size: 1em;
}

h3 {
  font-size: 0.7em;
}


.master_footer {
  position: relative;
  /*outline: 1px solid red;*/
  /*height: 50px;*/
  padding: 0 8px 8px 8px;
}

.preview {
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-color: white;
}

.percent_circle {
  position: absolute;
  height: 50px;
}

.delete_button {
  position: absolute;
  right: 0;
  /*bottom: 0;*/
  width: 20px;
  height: 20px;
  filter: opacity(50%);
  margin: 3px;
}
</style>