<template>
  <div class="newComment">
    <div class="cTitle">最新评论</div>
    <div class="cData">
      <ul>
        <li v-for="(c,index) in comments" v-bind:key="index">
          <a :href="'http://localhost:8080/#/index/article/' + c.articleId"  :alt="c.user"  style="cursor:pointer;">{{c.user}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newComment',
  data () {
    return {
      comments: [
        {
          user: 'leo',
          articleId: 'urlToArticle',
        },
        {
          user: 'leo',
          articleId: 'urlToArticle',
        },
        {
          user: 'leo',
          articleId: 'urlToArticle',
        }
      ]
    }
  },
  created(){
    this.$axios.get('/index/getLatestComment')
    .then(res => {
      this.comments = res.data
    })
  }
}
</script>

<style scoped>
.newComment{
    border: 2px solid black;
    border-radius: 5px;
    padding: 20px 50px;
}
.cTitle, .cData{
    padding: 10px;
}
ul{
    padding: 0;
}
li{
    text-align: start;
    padding: 10px 0;

}
</style>