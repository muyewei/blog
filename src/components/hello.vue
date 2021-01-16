<template>
  <div class='hello'>
    <router-link to="index">{{msg}}</router-link>
    <he></he>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to MyBlog',
      age: 80
    }
  },
  methods: {
    orz () {
      this.age --;
    }
  },
  components: {
    he: {
      template: `<P>oh my {{name}}</p>`,
      data () {
        return {
          name: 'dengdengdeng'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
