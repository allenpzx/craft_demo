<template>
  <div class="info">
    <h1>{{ msg }}</h1>
    <h2>这里是test.vue页</h2>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      msg: '我是test.vue'
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
