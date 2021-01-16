<template>
  <div class="myData">
    <div class="demo-type">
      <el-avatar :size="60" src="https://empty" @error="errorHandler">
      <img src="http://localhost:1000/static/images/face.jpg">
        <!-- <img src="../assets/picture/face.jpg"/> -->
      </el-avatar>
    </div>
    <div class="demo-name">
      <ul>
        <li>邓炜标</li>
        <li>一个前端程序员</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myData',
  data () {
    return {
    }
  },
  methods:{
    errorHandler(){
      console.log('getImageError')
    }
  }
}
</script>

<style scoped>
.myData{
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 20px 50px;
}
.myData div{
    padding: 10px;
}
</style>