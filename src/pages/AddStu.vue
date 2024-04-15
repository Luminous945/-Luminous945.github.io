<template>
  <div>
    <div style="margin-top:30px">
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false">

            <el-button slot="trigger" size="small" type="primary" @click="select">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :disabled="buttonClicked">点击扫描课表</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb 
            <span style="color:red">上传照片需要点击获取图片样式</span>  
          </div>
        </el-upload>
        <div v-if="this.imgUrl">
          <p style="font-size:20px">图片展示</p>
          <img v-if="this.imgUrl" :src="imgUrl" style="width:1000px;height:500px">
        </div>
          


        <!-- 课表展示 -->
        <div v-if="this.ShowStuInformationData.length !== 0 && this.imgUrl !== '' " style="margin-top:15px">
          <span style="font-size:20px">课表展示</span>
          <el-table
          :data="ShowStuInformationData"
          style="width: 100%">

            <el-table-column
                  prop="stuName"
                  label="姓名"
                  width="100">
              </el-table-column>

              <el-table-column
                  prop="stuCode"
                  label="学号"
                  width="150">
              </el-table-column>

              <el-table-column
                  prop="classToClass"
                  label="节次/星期"
                  width="100">
              </el-table-column>

              <el-table-column
                  prop="monday"
                  label="星期一"
                  width="120">
              </el-table-column>

              <el-table-column
                  prop="tuesday"
                  label="星期二"
                  width="120">
              </el-table-column>

              <el-table-column
                  prop="wednesday"
                  label="星期三"
                  width="120">
              </el-table-column>

              <el-table-column
                  prop="thursday"
                  label="星期四"
                  width="120">
              </el-table-column>

              <el-table-column
                  prop="friday"
                  label="星期五"
                  width="120">
              </el-table-column>

              <el-table-column
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="changeTable(scope.row)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-button type="primary" round @click="submitTable">上传至服务端</el-button>
        </div>
    </div>

    <el-dialog title="修改学生信息栏" :visible.sync="FormUpdateStu">
      <el-form  :model="ChangeStuData" label-position="right"
                  label-width="78px" >

          <el-row>
              <el-col :span="12">
                  <el-form-item label="学生姓名">
                      <el-input v-model="ChangeStuData.stuName"/>
                  </el-form-item>
              </el-col>

              <el-col :span="12">
                  <el-form-item label="学生学号">
                      <el-input v-model="ChangeStuData.stuCode"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="周一">
                      <el-input v-model="ChangeStuData.monday"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="周二">
                      <el-input v-model="ChangeStuData.tuesday"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="周三">
                      <el-input v-model="ChangeStuData.wednesday"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="周四">
                      <el-input v-model="ChangeStuData.thursday"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="周五">
                      <el-input v-model="ChangeStuData.friday"/>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-button type="primary" round @click="submitInf">提交</el-button>
      </el-form>
      <div>
        <span style="color:red;font-size:20px">注意格式,例如:单/双/全(0-0)周一/二/三/四/五</span>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import axios from 'axios';

  export default {
    data() {
      return {
        fileList: [],
        imgUrl:"",
        name:"",
        ShowStuInformationData: [],
        ChangeStuData:{},
        FormUpdateStu:false,
        buttonClicked:false
      };
    },
    methods: {
      submitUpload() {  
        if(this.imgUrl !== ""){
            this.buttonClicked = true
            axios.post("/addStu/"+this.name+"g").then((res)=>{
              if(res.data.code === 202350){
                this.$message.warning(res.data.data)
                this.buttonClicked = false
              }else{
                this.$message.warning("请往下查看信息是否正确!")
                this.ShowStuInformationData = res.data.data
                console.log(this.ShowStuInformationData);
              }
          })
         
        }else{
          this.$message.warning("请点击上传图片以获取图片")
        }
      },
      select(){
        this.buttonClicked = false
      },
      handleRemove(file, fileList) {
        this.imgUrl = ""
        this.ShowStuInformationData = []
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        this.name = file.name;
        this.imgUrl = URL.createObjectURL(file.raw);
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      //修改信息
      changeTable(row){
        console.log(row),
        this.FormUpdateStu = true,
        axios.post("/addStu/change",row).then((res)=>{
            this.ChangeStuData = res.data.data
        })
      },
      //提交修改的信息
      submitInf(){
        if(this.ChangeStuData.monday.length <= 7 || this.ChangeStuData.tuesday.length <= 7 ||this.ChangeStuData.wednesday.length <= 7||this.ChangeStuData.thursday.length <= 7||this.ChangeStuData.friday.length <= 7){
          this.$message.warning("请提交正确格式信息!")
        }else{
          axios.put("/addStu/update",this.ChangeStuData).then((res)=>{
            if(res.data.code === 202381){
              this.ShowStuInformationData = res.data.data
              this.$message.success("修改成功!")
              this.FormUpdateStu = false
            }else if(res.data.code === 202380){
              this.$message.warning(res.data.data)
            }else{
              this.$message.warning("请提交正确格式信息!")
            }
          })
        }

      },
      
      //上传
      submitTable(){
        axios.post("/addStu",this.ShowStuInformationData).then((res)=>{
          if(res.data.code === 202351){
              this.$message.success(res.data.data)
              this.imgUrl = ""
              this.buttonClicked = false
          }else if(res.data.code === 202350){
            this.$message.error(res.data.data)
            this.imgUrl = ""
            this.buttonClicked = false
          }else{
              this.$message.error("填入格式有的不正确!")
          }
          
        })
      }

    }
  }
</script>

<style>
    
</style>