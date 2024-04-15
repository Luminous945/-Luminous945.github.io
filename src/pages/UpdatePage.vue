<template>
  <div>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="140px"
    >
      <el-form-item label="前段格言" prop="firstSaying">
        <el-input v-model="dataForm.firstSaying" placeholder="请输入前段格言"></el-input>
      </el-form-item>
      <el-form-item label="后端格言" prop="endSaying">
        <el-input v-model="dataForm.endSaying" placeholder="请输入后端格言"></el-input>
      </el-form-item>
      <el-form-item label="展示" prop="showWhere">
        <el-select v-model="dataForm.showWhere" placeholder="请选择改变哪一个页面">
          <el-option label="登录页面" value="loginPage"></el-option>
          <el-option label="签到页面" value="signPage"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景地址" prop="picturePath">
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false">

            <el-button slot="trigger" size="small" type="primary" @click="select">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb 
            <span style="color:red">上传照片需要点击获取图片样式</span>  
          </div>
        </el-upload>
        <div v-if="this.imgUrl">
          <p style="font-size:20px">图片展示</p>
          <img v-if="this.imgUrl" :src="imgUrl" style="width:400px;height:200px">
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" style="margin-left:800px">
      <el-button type="primary" @click="dataFormSubmit('dataForm')">确定</el-button>
    </span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      imgUrl:"",
      visible: false,
      dataForm: {},
      fileList: [],
      photoName:"",
      dataRule: {
        firstSaying: [
          { required: true, message: "前段格言不能为空", trigger: "blur" }
        ],
        endSaying: [
          { required: true, message: "后段格言不能为空", trigger: "blur" }
        ],
        showWhere: [
            { required: true, message: '请选择所要展示到的页面', trigger: 'change' }
        ],
        
      }
    };
  },
  methods: {
    // 表单提交
    dataFormSubmit(dataForm) {
      this.$refs[dataForm].validate(valid => {
        if (valid) {
          if(this.imgUrl === ""){
            this.$message.warning("上传照片需要点击获取图片样式")
          }else{
            axios.post("/pageInf/updatePageInf",this.dataForm).then(res=>{
                if(res.data.code === 202351){
                  this.$message.success("修改页面成功!")
                  this.dataForm.firstSaying = ""
                  this.dataForm.endSaying = "" 
                  this.imgUrl = ""
                }else{
                  this.$message.error("修改页面失败!请联系李鑫启!(QAQ)")
                }
            })
          }
        }
      });
    },

    handlePreview(file) {
        console.log(file);
        this.dataForm.photoPath = file.name;
        this.imgUrl = URL.createObjectURL(file.raw);
    },

    handleRemove(file, fileList) {
        this.imgUrl = ""
        this.ShowStuInformationData = []
        console.log(file, fileList);
    },

    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    select(){
        this.buttonClicked = false
    },
  }
};
</script>
