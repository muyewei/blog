<template>
    <div id="webdata">
        <p>今日访客人数：{{webdata.dVisitor}}</p>
        <p>今日评论数：{{webdata.dComment}}</p>
        <p>今日注册数：{{webdata.dLogin}}</p>
        <p>今日登录数：{{webdata.dRegister}}</p>
        <p>本周访客人数：{{webdata.wVisitor}}</p>
        <p>本周评论数：{{webdata.wComment}}</p>
        <p>本周注册数：{{webdata.wLogin}}</p>
        <p>本周登录数：{{webdata.wRegister}}</p>
        <p>本月访客人数：{{webdata.mVisitor}}</p>
        <p>本月评论数：{{webdata.mComment}}</p>
        <p>本月注册数：{{webdata.mLogin}}</p>
        <p>本月登录数：{{webdata.mRegister}}</p>
    </div>    
</template>

<script>
export default {
    name: 'webdata',
    data() {
        return{
            webdata:{
                dVisitor: 0,
                dComment: 0,
                dLogin: 0,
                dRegister: 0,
                wVisitor: 0,
                wComment: 0,
                wLogin: 0,
                wRegister: 0,
                mVisitor: 0,
                mComment: 0,
                mLogin: 0,
                mRegister: 0
            }
        }
    }
}
</script>

<style scoped>
#webdata{
    border: 1px solid black;
}
</style>