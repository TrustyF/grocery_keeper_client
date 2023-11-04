<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);

</script>

<template>
  <div>
    <form>
      <label for="i_name">Name</label><br>
      <input type="text" id="i_name" name="name"><br>

      <label for="i_weight">Weight (Kg/L)</label><br>
      <input type="number" step="0.01" id="i_weight" name="weight"><br>

      <label for="i_price">Price</label><br>
      <input type="number" step="0.01" id="i_price" name="price"><br>

      <label for="i_store">Store</label><br>
      <input type="text" id="i_store" name="store"><br>

      <label for="i_category">Category</label><br>
      <select id="i_category" name="category">
        <option value="grocery">grocery</option>
        <option value="dairy">dairy</option>
        <option value="meat">meat</option>
        <option value="produce">produce</option>
        <option value="bakery">bakery</option>
      </select><br>

      <label for="i_acquired_date">Date bought</label><br>
      <input type="date" id="i_acquired_date" name="acquired_date" :value="new Date().toISOString().substring(0,10)"><br>

    </form>
  </div>
</template>

<style scoped>

</style>