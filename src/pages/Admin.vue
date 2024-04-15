<template>
  <div>
      <div style="margin-top:30px">
            <el-input
            style="width:300px"
            v-model="search"
            size="mini"
            placeholder="输入管理姓名来搜索"/>
        </div>
        <div style="margin-top:10px">
            <el-button type="primary" @click="addAdminForm">添加管理员</el-button>
        </div>
          <el-table
            :data="adminDate.filter(data => !search || data.stuName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 1000px;font-weight: bold">
            
            <el-table-column
            prop="id"
            label="管理ID"
            width="150"
            >
            </el-table-column>

            <el-table-column
            prop="stuName"
            label="管理姓名"
            width="180"
            >
            </el-table-column>

            <el-table-column
            label="管理账号和密码"
            prop="stuCode">
            </el-table-column>

            <el-table-column
            label="创建时间"
            prop="createTime">
            </el-table-column>

            <el-table-column
            label="更新时间"
            prop="updateTime">
            </el-table-column>

            <el-table-column
            align="right"
            label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改管理员信息栏" :visible.sync="dialogFormVisible4UpdateAdmin" width="800px" >

            <el-form :model="UpdateData"  ref="UpdateData" label-width="100px" class="demo-ruleForm">

                <span style="font-size:20px">ID为:{{this.UpdateData.id}}</span>     

                <el-form-item  prop="stuName" label="姓名">
                    <el-input v-model="UpdateData.stuName" placeholder="请输入需修改的姓名"></el-input>
                </el-form-item>

                <el-form-item  prop="stuCode" label="账号密码">
                    <el-input v-model="UpdateData.stuCode" placeholder="请输入需修改的内容"></el-input>
                </el-form-item>

            </el-form>

            <el-row>
                    <el-button type="primary" @click="Update('UpdateData')">确定</el-button>
                    <el-button type="primary" @click="close()">取消</el-button>
            </el-row>

        </el-dialog>    

        <el-dialog title="添加管理信息栏" :visible.sync="dialogFormVisibleAddAdmin" width="800px" >

            <el-form :model="AddAdminData"  ref="UpdateData" label-width="100px" class="demo-ruleForm">

                <el-form-item  prop="stuName" label="姓名">
                    <el-input v-model="AddAdminData.stuName" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item  prop="stuCode" label="账号密码">
                    <el-input v-model="AddAdminData.stuCode" placeholder="请输入账号"></el-input>
                </el-form-item>

            </el-form>

            <el-row>
                    <el-button type="primary" @click="Add('AddAdminData')">确定</el-button>
                    <el-button type="primary" @click="close()">取消</el-button>
            </el-row>

        </el-dialog> 

  </div>
</template>

<script>
import axios from 'axios';
export default {



    data() {
        return {
            adminDate:[],
            UpdateData:{},
            AddAdminData:{},
            dialogFormVisible4UpdateAdmin:false,
            dialogFormVisibleAddAdmin:false,
            search:'',
        
        }
    },
    mounted(){
        this.getAllAdmin();
    },
    methods:{

   
        getAllAdmin(){
            axios.get("/admin").then((res)=>{
                this.adminDate = res.data.data
            })
        },

        getOneAdmin(id){
            axios.get("/admin/"+id).then((res)=>{
                this.UpdateData = res.data.data
            })
        },

        Update(){
            axios.put("/admin",this.UpdateData).then((res)=>{
                if(res.data.code === 202381){
                    this.$message.success(res.data.data)
                    this.getAllAdmin()
                    this.dialogFormVisible4UpdateAdmin = false
                }else if(res.data.code === 202380){
                    this.$message.error("姓名重复或者账号和其他管理员重复!")
                }else if(res.data.code === 0){
                    this.$message.warning(res.data.data);
                }
            })
        },

        handleEdit(row){
            this.getOneAdmin(row.id)
            this.dialogFormVisible4UpdateAdmin =true
        },

        handleDelete(row){
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete("/admin/"+row.id).then((res)=>{
                    this.$message.success(res.data.data)
                    this.getAllAdmin()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        },
        addAdminForm(){
            this.dialogFormVisibleAddAdmin = true
        },

        Add(){
            if(this.AddAdminData.stuCode.length >= 13){
                this.$message.warning("账号不得超过13个字符")
            }else{
                axios.post("/admin",this.AddAdminData).then((res)=>{
                    if(res.data.code === 202351){
                        this.dialogFormVisibleAddAdmin = false
                        this.getAllAdmin()
                        this.AddAdminData = {}
                    }else if(res.data.code === 202350){
                        this.$message.error(res.data.data)
                    }else{
                        this.$message.warning("姓名或者账号重复")
                    }
                })
            }
        },

        close(){
            this.dialogFormVisible4UpdateAdmin = false
        }
    }
}
</script>

<style>
    
</style>