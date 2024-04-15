<template>
  <div>

    <div v-if="this.$show">
      <h1 style="margin-top:180px;margin-left:590px">管理员登录</h1>
      
      <el-form :model="ruleForm" :rules="rules" style="margin-top:20px;width:500px;margin-left:400px">

        <el-form-item prop="stuCode">
          <el-input v-model="ruleForm.stuCode"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="login('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div v-if="!this.$show">
      <router-view></router-view>
    </div>

  </div>
</template>


<script>

import axios from "axios";
import UAParser from 'ua-parser-js'


export default {
  name: "Login",
  data() {
    return {
      ruleForm: {},
      rules: {
        stuCode: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      browser: "",
      buttonClicked: false,
    };
  },

  mounted() {

    if (window.localStorage.getItem("stuName") === null) {
      if (this.$route.path !== "/") {
        this.$router.push({
          name: "Login",
        });
      }
    } else 
    if (window.localStorage.getItem("stuCode").length < 13) {
      if (this.$route.path !== "/Leader") {
        this.$router.push({
          name: "leader",
        });
      }
    } else if (window.localStorage.getItem("stuCode").length >= 13) {
      this.$show = false;
      if (this.$route.path !== "/Sign") {
        this.$router.push({
          name: "sign",
        });
      }
    }

    this.getIp();
    this.checkIsMobile();
  },


  methods: {

    checkIsMobile() {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        this.$message.warning("禁止使用手机端登录!!");
        this.buttonClicked = true;
        // 是手机设备
        // 在这里执行您希望在手机设备上执行的逻辑
      } else {
      }
    },

    getIp() {
      axios.post("/ip").then((res) => {
        if (res.data.code === 202390) {
          this.$message.error(res.data.data);
          this.buttonClicked = true;
        } else {
        }
      });
    },

    login() {
        console.log(this.ruleForm.password,this.ruleForm.stuCode);
        this.buttonClicked = true;

          const parser = new UAParser();

          // 解析浏览器信息
          const browserInfo = parser.getBrowser();
          const browserName = browserInfo.name;

          console.log(browserName);

          if (browserName === "Edge") {
            this.browser = "Edge";
          } else if (browserName === "Firefox") {
            this.browser = "Firefox";
          } else if (browserName === "Google") {
            this.browser = "Google";
          } else {
            this.browser = "1";
          }

          if (this.browser !== 1) {
            axios.post("/stuLogin/" + this.browser,this.ruleForm).then((res) => {
                if (res.data.code === 202391) {
                  this.$show = false;
                  setTimeout(() => {
                    this.browser = "";
                    window.localStorage.setItem(
                      "stuName",
                      res.data.data.stuName
                    ),
                    window.localStorage.setItem(
                      "stuCode",
                      res.data.data.stuCode
                    ),
                    window.localStorage.setItem("ComProof", "1")

                    if (res.data.data.isExist === 2) {
                      if (this.$route.path !== "/Leader") {
                        this.$router.push({
                          name: "leader",
                        });
                      }
                        window.location.reload();
                      
                    }else {
                      if (this.$route.path !== "/Sign") {
                        this.$router.push({
                          name: "sign",
                        });
                      }
                      window.location.reload();
                    }
                  }, 400);
                } else if (res.data.code === 202390) {
                  this.$message.error("登录失败!学号或者密码错误!");
                  setTimeout(() => {
                    this.buttonClicked = false;
                  }, 200);
                } else if (res.data.code === 202366) {
                  this.$message.warning(res.data.data);
                  setTimeout(() => {
                    this.buttonClicked = false;
                  }, 200);
                }
              });
          } else {
            this.$message.error("请使用要求的浏览器登录!");
          }
          
        
      
      this.buttonClicked = false;
    },


  },
  

};


</script>


 <style>




</style>