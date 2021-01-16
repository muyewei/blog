<template>
  <div id="information">
    <div style="font-size: 30px">个人信息</div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="changeHead('ruleForm')">更改头像</el-button>
    <br/>
    <label for="">旧密码：</label>
    <el-input type="password" v-model="oldpass" autocomplete="off"></el-input>
    <label for="">新密码：</label>
    <el-input type="password" v-model="newpass" autocomplete="off"></el-input>
    <label for="">重输密码：</label>
    <el-input type="password" v-model="renewpass" autocomplete="off"></el-input>
    <el-button @click="changePassword('password')" style="margin-top: 10px;">更改密码</el-button>
  </div>
</template>

<script>
export default {
  name: "personalInf",
  data() {
    return {
      oldpass: "",
      newpass: "",
      renewpass: "",
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeHead() {
        console.log('changeHead')
    },
    changePassword(){
        console.log('changePassword')
    }
  },
};
</script>

<style scoped>
#information {
  position: fixed;
  width: 300px;
  height: 600px;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 50px;
}
.avatar-uploader{
    margin: 10px 0;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  background-color: rgb(230, 230, 230);
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.avatar {
  width: 125px;
  height: 125px;
  display: block;
}
label{
    display: block;
    margin: 10px 0;
}
</style>