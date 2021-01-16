<template>
    <div id="backstage">
        <el-container class="container">
            <el-header><top-nav @loginOrRegister="lor()" @click.stop="notshow($event)"></top-nav></el-header>
            <el-container class="cel-container">
                <el-aside width="200px" id="cel-aside">
                    <ul>
                        <li class="cHeader">BackStage</li>
                        <li v-for="(c, index) in controlList" :key="index" @click="changeActive(c.name)" :class="['cMain', now == c.name ? 'cMainActive' : '']">
                            <span><router-link :to="'/backstage/' + c.to">{{c.name}}</router-link></span>
                        </li>
                    </ul>
                </el-aside>
                <el-main class="cel-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import topNav from './topNav';
export default {
    name: "backstage",
    beforeCreate(){
        this.$axios.get('/user/checkLogin')
        .then(res => {
            if(res.data !== 'login'){
                this.$router.push('/index')
            }else{
                console.log('login')
            }
        }).catch(err => {
            this.$router.push('/index')
        })
    },
    data() {
        return {
            controlList: [
                {
                    name: '网站数据',
                    to: 'webdata'
                },
                {
                    name: '文章列表',
                    to: 'articlelist'
                },
                {
                    name: '发表文章',
                    to: 'blog'
                },
                {
                    name: '留言列表',
                    to: 'commentlist'
                },
                {
                    name: '用户列表',
                    to: 'userlist'
                },
                {
                    name: '文章草稿',
                    to: 'articlelist'
                }
            ],
            now: '网站数据'
        }
    },
    components: {
        topNav
    },
    methods: {
        changeActive(c) {
            this.now = c
        }
    }
}
</script>

<style scoped>
#backstage{
    width: 80%;
    margin: 0 auto;
}
.cel-container{
    padding-top: 120px;
}
#cel-aside{
    text-align: center;
    font-size: 20px;
    font-weight: 200;
    background-color: rgb(235, 235, 235);
}
.cHeader{
    position: relative;
    padding: 10px;
}
.cHeader::after{
    content: "";
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    width: 80%;
    border-bottom: 1px solid #000;
}
.cMain{
    cursor: pointer;
    margin: 20px;
    height: 50px;
    line-height: 50px;
    transition: background 1s;
}
.cMain:hover{
    background-color: rgb(146, 146, 243);
    color: white;
}
.cMain a{
    display: block;
    width: 100%;
    height: 100%;
}
.cMain a:hover{
    color: white;
}
.cMainActive{
    background-color: rgb(146, 146, 243);
    color: white;
}
.cel-main{
    margin-left: 130px;
}
</style>