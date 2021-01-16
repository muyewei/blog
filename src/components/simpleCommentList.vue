<template>
    <div id="sal">
        <div class="list" v-for="(l, index) in list" :key="index">
            <div class="user">{{l.user}}</div>
            <div class="fun">
                <span @click="del(l.id)">删除</span>
            </div>
            <div class="comment">
                评论：  {{l.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'simpleCommentList',
    data() {
        return {
            list: [
                {
                    user: 'balabala',
                    id: '123',
                    comment: 'qwe'
                },
                {
                    user: 'balabala',
                    id: '123',
                    comment: 'qwe'
                },
                {
                    user: 'balabala',
                    id: '123',
                    comment: 'qwe'
                }
            ]
        }
    },
    methods: {
        del(id){
            console.log('删除文章：' + id)
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
    flex-wrap: wrap;
}
.fun span{
    margin: 0 5px;
}
.fun span:hover{
    cursor: pointer;
    color: rgb(83, 80, 230);
}
.comment{
    width: 100%;
}
</style>