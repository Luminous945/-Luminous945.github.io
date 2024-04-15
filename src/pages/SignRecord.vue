<template>
  <div>
    <el-table
      :data="SignRecordData"
      style="width: 100%;font-weight: bold">

      <el-table-column
        prop="stuName"
        label="姓名"
        width="330">
      </el-table-column>

      <el-table-column
        prop="signTime"
        label="签到时间"
        width="350">
      </el-table-column>

      <el-table-column
        prop="signTime"
        label="签到节次"
        width="350">
            <template slot-scope="scope">
                    <div v-if="scope.row.signTime.substring(11,13).includes('07')" style="font-size:20px">7:40-8:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('08')" style="font-size:20px">7:40-8:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('09')" style="font-size:20px">9:40-10:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('10')" style="font-size:20px">9:40-10:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('13')" style="font-size:20px">13:10-13:30</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('14')" style="font-size:20px">14:40-15:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('15')" style="font-size:20px">14:40-15:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('16')" style="font-size:20px">16:40-17:00</div>
                    <div v-else-if="scope.row.signTime.substring(11,13).includes('17')" style="font-size:20px">16:40-17:00</div>
            </template>
      </el-table-column>

    </el-table>
    <div style="float:right;margin-top:10px">
      <el-button type="danger" @click="delSignRecord">删除所有签到日志</el-button>
    </div>
      
    <div style="margin-top:20px">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page.sync="currentPage"
              :page-size="15"
              layout="total, prev, pager, next, jumper"
              :total="total"
              >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            SignRecordData:[],
            currentPage:0,
            total:0
        }
    },
    mounted(){
        this.getSignInf()
    },
    methods:{
        getSignInf(){
            axios.get("/signRecord/getInf/"+1).then((res)=>{
                if(res.data.code === 202391){
                this.SignRecordData = res.data.data.records
              
                this.total = res.data.data.total
                this.currentPage = 1
                }else{
                    this.$message.info("暂无人员")
                }
            })
        },
        handleCurrentChange(val){
            axios.get("/signRecord/getInf/"+val).then((res)=>{   
                this.SignRecordData = res.data.data.records
                this.total = res.data.data.total
                this.currentPage = val
            })
        },
        handleSizeChange(){

        },
        delSignRecord(){

            this.$confirm('此操作将永久删除所有签到日志, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              axios.delete("/signRecord/deleted").then((res)=>{
                if(res.data.code === 202370){
                  this.$message.warning("还没有人登录呢")
                  
                }else{
                  this.$message.success("删除成功!")
                  this.getSignInf()
                }
              })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        }
    }
}
</script>

<style>

</style>