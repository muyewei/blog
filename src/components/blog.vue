<template>
  <div id="blog">
    <el-form ref="blog" :model="blog" label-width="80px">
      <el-form-item>
        <p>TITLE</p>
        <el-input v-model="blog.title"></el-input>
      </el-form-item>
      <el-form-item>
        <p>PRECONTENT</p>
        <el-input v-model="blog.precontent" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <p>TAGS</p>
        <el-select
          v-model="blog.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <p class="elContent">MAIN</p>
        <mavon-editor v-model="blog.main" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
      </el-form-item>
      <el-form-item>
        <el-row class="elRow">
          <el-button type="primary" @click="upload('upblog')" plain>提交</el-button>
          <el-button @click="upload('savedraft')" plain>保存</el-button>
          <el-button @click="uploadimg" plain>上传图片</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "blog",
  created(){
      // console.log(this.$route.query.id)
  },
  data() {
    return {
      blog: {
        title: "",
        tags: [],
        precontent: "",
        main: ""
      },
      options: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      img_file: {}
    };
  },
  methods:{
    upload(type){
      let upblog = JSON.parse(JSON.stringify(this.blog));
      upblog.type = type
      upblog.tags = upblog.tags.join('/')
      // console.log(upblog)
      if(type == 'upblog'){
        this.$axios.post('/blog/uploadArticle',{
          blog: upblog
        },{
          headers:{'Content-Type':'application/json'}
        }).then(res => {
          if(res.data == 'upblogsuccess'){
            console.log('提交成功')
          }
        }).catch(err => {
          console.log('err')
        }).finally(()=>{
          console.log('finally')
        })
      }else if(type == 'savedraft'){
        this.$axios.post('/blog/uploadDraft',{
          blog: upblog
        },{
          headers:{'Content-Type':'application/json'}
        }).then(res => {
          if(res.data == 'savedraftsuccess'){
            console.log('保存成功')
          }
        }).catch(err => {
          console.log('err')
        }).finally(()=>{
          console.log('finally')
        })
      }
    },
     $imgAdd(pos, $file){
            // 缓存图片信息
            this.img_file[pos] = $file;
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            this.$axios({
                url: '/blog/uploadimages',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                 let d = res.data
                for (var img in d) {
                    this.$refs.md.$img2Url(d[img][0], d[img][1]);
                }
            })
        },
  }
};
</script>

<style scoped>
#blog {
  font-size: 14px;
  line-height: 40px;
}
.el-form-item >>> .el-form-item__content {
  margin-left: 0px !important;
}
.elRow {
  margin-top: 20px;
}
</style>