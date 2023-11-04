<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import ListGrocery from "../components/grocery/ListGrocery.vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const update_item_id = inject("update_item_id");
const selected_item = inject("selected_item");

let image_preview = ref('')
let form_data = {}

function update_preview(content) {
  image_preview.value = content
}

function submit(event) {
  const formData = new FormData(event.target)

  formData.forEach((val, key) => {
    form_data[key] = val
  })
  console.log('form', form_data)
  add_product()
}

function add_product() {
  fetch(new URL(`${curr_api}/grocery/post`), {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(form_data)
  })
      .then(data => {
        console.log('ok');
        update_item_id.value += 1
      })
}

function fill_form_from_json() {
  let form = document.querySelectorAll('input')

  form.forEach((val, key) => {
    if (val.type !== 'date') {
      val.value = selected_item.value[val.name]
    }
  })

  update_preview(selected_item.value['preview_image'])
}

watch(selected_item, (oldV, newV) => {
  fill_form_from_json()
})
</script>

<template>
  <div class="wrapper_add_page">
    <form @submit.prevent="submit($event)" id="add_form">
      <label for="i_name">Name</label><br>
      <input type="text" id="i_name" name="name" @focus="$event.target.select()" required><br>

      <label for="i_weight">Weight (Kg/L)</label><br>
      <input type="number" step="0.01" id="i_weight" name="weight" @focus="$event.target.select()" required><br>

      <label for="i_quantity">Quantity</label><br>
      <input type="number" id="i_quantity" value="1" name="quantity" required><br>

      <label for="i_price">Price</label><br>
      <input type="number" step="0.01" id="i_price" name="price" @focus="$event.target.select()" required><br>

      <label for="i_store">Store</label><br>
      <select id="i_store" name="store">
        <option value="IGA">IGA</option>
        <option value="no_frills">no frills</option>
        <option value="nester's_market">nester's market</option>
      </select><br>

      <label for="i_category">Category</label><br>
      <select id="i_category" name="category">
        <option value="grocery">grocery</option>
        <option value="dairy">dairy</option>
        <option value="meat">meat</option>
        <option value="produce">produce</option>
        <option value="bakery">bakery</option>
      </select><br>

      <label for="i_acquired_date">Date bought</label><br>
      <input type="date" id="i_acquired_date" name="acquired_date"
             :value="new Date().toISOString().substring(0,10)"><br>

      <label for="i_expiry_date">Date expire</label><br>
      <input type="date" id="i_expiry_date" name="expiry_date"
             :value="new Date().toISOString().substring(0,10)" required><br>

      <label for="i_preview_image">Image</label><br>
      <input type="url" id="i_preview_image" name="preview_image" @focus="$event.target.select()"
             @input="event => update_preview(event.target.value)" required><br>
      <img class="preview_image" :src="image_preview" alt="image_preview"><br>

      <button type="submit">Submit</button>
    </form>
  </div>

  <div style="margin-top: 40px">
    <list-grocery></list-grocery>
  </div>
</template>

<style scoped>
.wrapper_add_page {
  display: flex;
  /*outline: 1px solid red;*/
  justify-items: center;
  justify-content: center;
}

.preview_image {
  width: 100px;
  height: 100px;
}
</style>