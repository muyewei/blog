<template>
  <div id="mainData">
    <div class="articles" v-for="(a, index) in articles" v-bind:key="index">
      <div class="head">
        <p>
          <router-link :to="'/index/article/' + a._id">{{
            a.title
          }}</router-link>
        </p>
        <p>Published: {{ a.predate }} By: {{ a.writer }}</p>
      </div>
      <div class="content">
        <p>{{ a.precontent }}</p>
      </div>
      <div class="foot">
        <p>
          tags:
          <a
            v-for="t in a.tags.toString().split('\\')"
            v-bind:key="t"
            href="/index"
          >
            {{ t }} /
          </a>
          comments: {{ a.totalComments }}
        </p>
      </div>
    </div>
    <div class="ll">
      <el-pagination
        class="msg-pagination-container"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        :current-page="pageNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//展示博客列表
export default {
  name: "mainData",
  data() {
    return {
      articles: [
        {
          title: "try",
          predate: "2021/1/11",
          writer: "邓炜标",
          precontent: "this is my first writer",
          tags: ["vue", "javascript"],
          totalComments: "0",
          id: "123",
        },
        {
          title: "try",
          predate: "2021/1/11",
          writer: "邓炜标",
          precontent: "this is my first writer",
          tags: ["vue", "javascript"],
          totalComments: "0",
          id: "456",
        },
      ],
      totalNum: 100,
      pageNum: 1,
      pageSize: 10,
    };
  },
  created() {
    // console.log("thispagea", this.$route.params);
    let type = this.$route.params.type || "";
    // console.log("createtype: ", type);
    this.$axios
      .get("index/getArticleList", {
        params: {
          limit: this.pageSize,
          page: this.pageNum,
          type: type,
        },
      })
      .then((res) => {
        // console.log(res)
        this.totalNum = res.data.totalNum;
        this.articles = res.data.articles;
      });
  },
  watch: {
    $route: function (to, from) {
      let type = to.params.type || "";
      // console.log("updatetype: ", type);
      this.$axios
        .get("index/getArticleList", {
          params: {
            limit: this.pageSize,
            page: this.pageNum,
            type: type,
          },
        })
        .then((res) => {
          // console.log(res)
          this.totalNum = res.data.totalNum;
          this.articles = res.data.articles;
        });
    },
  },
};
</script>

<style scoped>
.articles {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 2px solid black;
  padding: 10px 30px;
  margin: 30px 0;
  border-radius: 5px;
  box-shadow: 3px 3px 2px 1px #dddada;
}
.head p:nth-child(1) {
  font-size: 30px;
}
.head p:nth-child(2) {
  font-size: 12px;
}
.foot {
  font-size: 14px;
}
</style>