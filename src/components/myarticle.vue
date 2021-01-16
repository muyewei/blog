<template>
  <div id="myarticle">
    <div id="main">
      <div id="basicInf">
        <p>{{article.title}}</p>
        <p>Published: {{article.wdate}} By {{article.writer}}</p>
        <p>转载请注明出处：<a :href="thisUrl">{{thisUrl}}</a></p>
      </div>
      <div id="detail">
        <mavon-editor class="mavon" v-model="article.main" :editable="false" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" previewBackground="white" boxShadowStyle="none"/>
      </div>
      <div id="secInf">
        <p>tags: <a v-for="t in article.tags.toString().split('\\')" v-bind:key="t" href="/index"> {{ t }} / </a></p>
      </div>
    </div>
    <div id="comments">
      <div class="commentsList" v-for="(cl, index) in commentsList" :key="index">
        <div class="header">
          <div class="demo-type">
            <el-avatar :size="60" src="https://empty">
              <img :src="cl.img" />
            </el-avatar>
          </div>
          <div class="demo-name">
            <ul>
              <li><a href="cl.blog">{{cl.user}}</a></li>
              <li>{{cl.cdate}}</li>
            </ul>
          </div>
          <div class="demo-reply" @click="reply(index)">回复</div>
        </div>
        <div class="quote" v-html="cl.quote" v-show="cl.quote !== ''">{{cl.quote}}</div>
        <div class="footer" v-html="cl.comment">
          <p>{{cl.comment}}</p>
        </div>
      </div>
    </div>
    <div id="speak">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="评论">
          <el-input
            type="textarea"
            v-model="form.comment"
            placeholder="your comment"
            class="fComment"
          ></el-input>
        </el-form-item>
        <el-form-item label="你的名字*">
          <a href=""></a><el-input v-model="form.user" placeholder="your name"></el-input>
        </el-form-item>
        <el-form-item label="你的邮件*">
          <el-input v-model="form.email" placeholder="your email"></el-input>
        </el-form-item>
        <el-form-item label="你的博客">
          <el-input v-model="form.blog" placeholder="your blog"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="uploadComment" :disabled="able">submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "myarticle",
  data() {
    return {
      article:{
        title: "try",
        wdate: "20201212",
        writer: "dwb",
        tags: ['as','qw'],
        main: "<p>balbala</p>"
      },
      form: {
        comment: "",
        user: "",
        email: "",
        blog: ""
      },
      commentsList: [
        {
          img: 'http://localhost:1000/static/images/face.jpg',
          user: "邓炜标",
          cdate: "2020/10/10",
          quote: "<pre>回复 奥斯卡 的发言：</pre><br/> <p>bilibalabil<br>ibala</p>",
          comment: "oh my ~",
          blog: ""
        },
        {
          img: 'http://localhost:1000/static/images/face.jpg',
          user: "邓炜标",
          cdate: "2020/10/10",
          quote: "<pre>回复 四密码 的发言：</pre><br/> <p>bilibalabil<br>ibala</p>",
          comment: "oh my ~",
          blog: ""
        },
        {
          img: 'http://localhost:1000/static/images/face.jpg',
          user: "邓炜标",
          cdate: "2020/10/10",
          quote: "",
          comment: "oh my ~",
          blog: ""
        }
      ],
      thisUrl: "",
      able: false
    };
  },
  created(){
    // console.log(this.$route.params.id)
    this.getMyArticle()
    this.getComment()
    this.thisUrl = window.location.href
  },
  methods: {
    reply(i) {
      let r = document.querySelectorAll('.footer')[i].innerHTML
      this.form.comment = "~*" + r + "*~\n" + this.form.comment
    },
    getMyArticle(){
      this.$axios.get('index/getMyArticle',{
        params:{
          articleId: this.$route.params.id
        }
      }).then(res => {
        this.article = res.data[0]
      }).catch(err => {
        console.log('getarticledeatilError: ', err)
      })
    },
    getComment(){
      this.$axios.get('index/getCommentList',{
        params:{
          articleId: this.$route.params.id
        }
      }).then(res => {
        this.commentsList = res.data
      }).catch(err => {
        console.log('getarticledeatilError: ', err)
      })
    },
    uploadComment(){
      this.able = true
      this.$axios.get('index/uploadComment',{
        params:{
          articleId: this.$route.params.id,
          commentdetail: this.form
        }
      }).then(res => {
        this.able = false
        window.location.reload()
        console.log('uploadcomment: ', res)
      }).catch(err => {
        console.log('uploadarticledeatilError: ', err)
      })
    }
  }
};
</script>

<style scoped>
#main {
  border: 1px solid black;
  padding: 50px 80px 20px 80px;
  border-radius: 3px;
  margin: 20px 0;
}
#speak {
  margin-top: 50px;
  width: 400px;
  border: 1px solid black;
  padding: 50px 80px 20px 10px;
  border-radius: 3px;
}
#basicInf p:nth-child(1) {
  font-size: 50px;
}
#basicInf p:nth-child(2),
#basicInf p:nth-child(3) {
  font-size: 14px;
}
#detail {
  padding: 50px 0;
  word-wrap: break-word;
}
.commentsList{
  border: 1px solid black;
  padding: 20px 80px 20px 80px;
  border-radius: 3px;
  margin: 10px 0;
  position: relative;
}
.header {
  display: flex;
  flex-direction: row;
}
textarea{
  min-height: 100px;
}
.demo-name{
  padding-left: 30px;
  line-height: 20px;
}
.demo-reply{
  position: absolute;
  right: 20px;
  top: 20px;
}
.quote{
  margin: 10px 0px 10px 20px;
  padding: 20px;
  background-color: rgb(221, 221, 221);
}
.mavon >>> div{
  padding-left: 0px!important;
}
.footer{
  margin-top: 20px;
}
</style>