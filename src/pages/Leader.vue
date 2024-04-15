<template>
    <div>
        <div>
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="true"><i class="el-icon-s-fold"/></el-radio-button>
            <el-radio-button :label="false"><i class="el-icon-s-unfold"/></el-radio-button>
            </el-radio-group>
            
            <el-button round @click="exit" style="float:right;margin-top:20px;margin-right:50px">退出</el-button>
        </div>

        <div>
          <span style="font-size:30px">Administrators</span> 
        </div>
        
        <div class="show">
          <el-menu style="padding:0;margin:0;list-style-type: style none;" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              
          <el-menu-item index="1" @click="addStu"  class="menu-item">
              <i class="el-icon-circle-plus-outline"></i>
              <span>成员新增</span>
          </el-menu-item>

          <el-menu-item index="2" @click="stuList"  class="menu-item">
              <i class="el-icon-user"></i>
              <span>成员列表</span>
          </el-menu-item>

          <el-menu-item index="3" @click="proxySign"  class="menu-item">
              <i class="el-icon-edit-outline"></i>
              <span>代签管理</span>
          </el-menu-item>

          <el-menu-item index="4" @click="lateRecord" class="menu-item">
              <i class="el-icon-tickets"></i>
              <span>迟到或未签记录</span>
          </el-menu-item>   

          <el-menu-item index="5" @click="SignRecord" class="menu-item">
              <i class="el-icon-date"></i>
              <span>签到日志</span>
          </el-menu-item>  

          <el-menu-item index="6" @click="LogInfo" class="menu-item">
              <i class="el-icon-date"></i>
              <span>登录日志</span>
          </el-menu-item>  

          <el-menu-item index="7" @click="ManagerInf" class="menu-item">
              <i class="el-icon-user-solid"></i>
              <span>管理员信息</span>
          </el-menu-item> 

          <el-menu-item index="8" @click="updateTime"  class="menu-item">
              <i class="el-icon-timer"></i>
              <span>修改时间</span>
          </el-menu-item>

          </el-menu>
        </div>

        <keep-alive>
            <div class="show" style="margin-left:30px">
              <div style="font-size:30px">
                {{this.showManager}}
              </div>
                <router-view></router-view>
            </div>
        </keep-alive>
    </div>
</template>

<script>

export default {
    data() {
        return {
          isCollapse: false,
          showManager:''
        }
    },
    methods: {

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        addStu(){
          if(this.$route.path !== '/AddStu'){
            this.showManager = "成员新增"
            this.$router.push({
              name:'addstu'
            })
          }
        },

        stuList(){
          if(this.$route.path !== '/StuList'){
            this.showManager = "成员列表",
            this.$router.push({
              name:'stulist'
            })
          }
        },

        updateTime(){
          if(this.$route.path !== '/UpdateTime'){
            this.showManager = "修改时间"
            this.$router.push({
              name:'updatetime'
            })
          }
        },

        proxySign(){
          if(this.$route.path !== '/ProxySign'){
            this.showManager = "代理签到"
            this.$router.push({
              name:'proxysign'
            })
          }
        },

        lateRecord(){
          if(this.$route.path !== '/LateRecord'){
            this.showManager = "迟到记录"
            this.$router.push({
              name:'laterecord'
            })
          }
        },

        SignRecord(){
          if(this.$route.path !== '/SignRecord'){
            this.showManager = "本周签到日志"
            this.$router.push({
              name:'signRecord'
            })
          }
        },
        LogInfo(){
          if(this.$route.path !== '/LogInfo'){
            this.showManager = "本周登录日志"
            this.$router.push({
              name:'logInfo'
            })
          }
        },
        ManagerInf(){
          if(this.$route.path !== '/Admin'){
            this.showManager = "管理员信息"
            this.$router.push({
              name:'admin'
            })
          }
        },

        exit(){
          this.$show = true
          this.$message.info("退出成功!")   
          
          setTimeout(() => {
            window.localStorage.removeItem("stuCode");
            window.localStorage.removeItem("stuName");
          }, 400);

          setTimeout(() => {
            window.location.reload();
          },500)
        }

    }   
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }

  .show{
    float: left;
    margin-left: -30px;
  }
  .menu-item {
    border-bottom: 1px solid #ccc;
  }

</style>