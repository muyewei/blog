<template>
  <div id="lorPage" @click.stop="">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="明文警告"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="登录可不用理会此栏"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="loginForm('ruleForm')"
          :disabled="able"
          >登录</el-button
        >
        <el-button @click="registerForm('ruleForm')" :disabled="able"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "lorPage",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        account: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
      },
      able: false,
    };
  },
  methods: {
    loginForm(formName) {
      this.able = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              "/user/login",
              {
                account: this.ruleForm.account,
                pass: this.ruleForm.pass,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              // console.log("post: ", res);
              if (res.data.isLoginSuccess == "no") {
                this.$refs[formName].fields[0].validateState = "error";
                this.$refs[formName].fields[0].validateMessage =
                  "账号或密码错误";
                this.$refs[formName].fields[1].validateState = "error";
              } else if (res.data.isLoginSuccess == "yes") {
                alert("登录成功");
                document.cookie =
                  "headUrl=" + res.data.headUrl + ";expires=" + 60 * 60 * 1000;
                this.$router.push("/tp");
              }
            })
            .finally(() => {
              this.able = false;
            });
          // location.reload();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    registerForm(formName) {
      this.able = true;
      this.$refs[formName].validate((valid) => {
        if (valid && this.ruleForm.checkPass !== "") {
          console.log("register");
          console.log(this.ruleForm);
          this.$axios
            .get("/user/register", {
              params: {
                account: this.ruleForm.account,
                pass: this.ruleForm.pass,
              },
            })
            .then((res) => {
              if (res.data == "账号已被注册") {
                this.$refs[formName].fields[0].validateState = "error";
                this.$refs[formName].fields[0].validateMessage = "账号重复";
              } else if (res.data == "注册成功") {
                alert("注册成功");
              }
            })
            .catch((err) => {
              console.log("register err: ", err);
            })
            .finally(() => {
              this.able = false;
            });
        } else {
          if (this.ruleForm.checkPass === "") {
            this.$refs[formName].fields[2].validateMessage = "注册密码不能为空";
            this.$refs[formName].fields[2].validateState = "error";
          }
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
#lorPage {
  position: fixed;
  width: 300px;
  height: 400px;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 5px;
  padding: 50px;
}
</style>