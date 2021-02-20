<template>
  <div class="index" @click="notshow($event)">
    <lor-page v-show="showlor"></lor-page>
    <personal-inf v-show="showinf"></personal-inf>
    <el-container class="container">
      <el-header><top-nav @loginOrRegister="lor()" @getTypeArticle="getTypeArticle" @click.stop="notshow($event)"></top-nav></el-header>
      <el-container class="elcontainer" style="margin-top:100px;">
        <el-main class="elmain">
          <div class="elheader"><my-data></my-data></div>
          <router-view></router-view>
        </el-main>
        <el-aside class="elaside" width="350px">
          <my-data></my-data>
          <new-comment style="margin-top:20px"></new-comment>
        </el-aside>
      </el-container>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>  
</template>

<script>
import myData from './myData';
import newComment from './newComment';
import topNav from './topNav';
import lorPage from './lorPage';
import personalInf from './personalInf';
// const presonalInf = require('./personalInf')
export default {
  name: "index",
  data() {
    return {
      msg: "This is MyBlog",
      showlor: false,
      showinf: false
    };
  },
  components: {
    myData,
    newComment,
    topNav,
    lorPage,
    personalInf
  },
  methods: {
    lor() {
      this.showlor = true
    },
    notshow(e){
      if(e.target.innerHTML == "注册 / 登录"){
        return
      }
      this.showlor = false
    },
    getTypeArticle(t){
      this.$router.push({ path: `/index/${t}` })
    }
  }
};
</script>

<style scoped>
.container{
    width: 80%;
    margin: 0 auto;
}
.elmain{
    padding-right: 100px;
    padding-bottom:100px;
}
.elheader{
  display: none;
}
.elaside{
  display: block;
}
@media screen and (max-width: 1200px){
    .container{
        width: 100%;
    }
    .elmain{
      padding-right: 10px;
    }
}
@media screen and (max-width: 800px){
    .elaside{
      display: none;
    }
    .elheader{
      display: block;
    }
}
</style>