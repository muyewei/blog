<template>
  <div id="topNav">
    <a id="logo" href="/index"><span>Deng's Blog</span></a>
    <ul id="nav">
      <li>
        <input
          class="topNavSearch"
          type="text"
          placeholder="search"
          @keyup.enter="say($event)"
        />
      </li>
      <li>
        <span>
            <!-- <a href="/#/index" style="font-size:14px;font-weight:400;">主页</a> -->
            <router-link to="/index" style="font-size:14px;font-weight:400;">主页</router-link>
        </span>
      </li>
      <li>
        <el-dropdown style="animation: none;" @command="getTypeArticle">
          <span class="el-dropdown-link">
            分类<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(t,index) in tags" v-bind:key="index" :command="t">{{t}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <span @click="logOrReg" style="cursor: pointer;" v-show="true">注册 / 登录</span>
        <img :src="picurl" v-show="isLogin" @click="toBack" style="cursor:pointer;"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "topNav",
  data() {
    return {
      tags: ["test", "JavaScript"],
      isLogin: false,
      picurl: "../assets/picture/face.jpg"
    };
  },
  mounted(){
    this.$axios.get('/user/checkLogin')
      .then(res => {
        if(res.data !== 'login'){
            this.isLogin = false
        }else{
          let url = 'http://localhost:1000/static/images/'
          let pic = document.cookie.split('; ')[1].toString().split("=")[1]
          if(pic){
            url += pic + '.jpg'
            // console.log(url)
            this.picurl = url
            this.isLogin = true
          }
        }
    })

  },
  methods: {
    say(e) {
      let url = 'https://www.baidu.com/s?wd=' + e.target.value
      window.open(url)
      e.target.value = ""
    },
    logOrReg(){
      this.$emit('loginOrRegister')
    },
    toBack(){
      if(this.$route.path !== '/backstage'){
        this.$router.push('/backstage')
      }
    },
    getTypeArticle(t){
      // console.log(t)
      if(window.location.href.indexOf(encodeURI(t)) != -1){
        this.$router.go(0); 
      }else{
        this.$emit('getTypeArticle',t)
      }
      
    }
  },
};
</script>

<style scoped>
#topNav {
  position: relative;
  height: 100px;
}
#logo {
  display: inline-block;
  width: 200px;
  line-height: 100px;
  font-size: 2em;
  text-decoration: none;
  color: black;
}
.topNavSearch {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid rgb(207, 212, 219);
}
#nav {
  position: absolute;
  right: 10px;
  top: 20px;
}
#nav li {
  display: inline-block;
  margin: 0 10px;
  margin-bottom: 15px;
}
#nav li img{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  vertical-align: middle;
}
@media screen and (max-width: 600px){
  .topNavSearch{
    display: none;
  }
}
</style>