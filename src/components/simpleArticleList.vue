<template>
    <div id="sal">
        <div class="list" v-for="(l, index) in list" :key="index">
            <div class="title">{{l.title}}</div>
            <div class="fun">
                <span @click="change(l.id)">更改</span>
                <span> / </span>
                <span @click="check(l.id)">查看</span>
                <span> / </span>
                <span @click="del(l.id)">删除</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'simpleArticleList',
    data() {
        return {
            list: [
                {
                    title: 'balabala',
                    id: '123'
                },
                {
                    title: 'balabala',
                    id: '123'
                },
                {
                    title: 'balabala',
                    id: '123'
                }
            ]
        }
    },
    methods: {
        change(id){
            console.log('更改文章：' + id)
            this.$router.push({
               path: '/backstage/blog',
               query:{
                   id:id
               }
            })
        },
        check(id){
            console.log('查看文章：' + id)
            this.$router.push({
               path: `/index/article/${id}`
            })
        },
        del(id){
            console.log('删除文章：' + id)
            this.$router.push({
               path: '/backstage/blog',
               query:{
                   id:id
               }
            })
        }
    }
}
</script>

<style scoped>
.list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 30px;
}
.fun span{
    margin: 0 5px;
}
.fun span:hover{
    cursor: pointer;
    color: rgb(83, 80, 230);
}
</style>