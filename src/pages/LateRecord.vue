<template>
  <div>
    <div style="margin-top:30px">
            <el-input
            style="width:300px"
            v-model="search"
            size="mini"
            placeholder="输入学生姓名来搜索"/>
        </div>

          <el-table
            :data="LateRecordData.filter(data => !search || data.stuName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 1000px;font-weight: bold">

            <el-table-column
            label="签到时间"
            prop="classToClass"
            width="200">
                <template slot-scope="scope">
                    <span v-if="scope.row.classToClass === '1-2' ">7:40 - 8:00</span>
                    <span v-if="scope.row.classToClass === '3-4' ">9:40 - 10:00</span>
                    <span v-if="scope.row.classToClass === '5-6' ">13:10 - 13:30</span>
                    <span v-if="scope.row.classToClass === '7-8' ">14:40 - 15:00</span>
                    <span v-if="scope.row.classToClass === '9-10' ">16:40 - 17:00</span>
                </template>
            </el-table-column>

            <el-table-column
            prop="stuCode"
            label="学生学号"
            width="200"
            >
            </el-table-column>

            <el-table-column
            prop="stuName"
            label="学生姓名"
            width="200"
            >
            </el-table-column>

            <el-table-column
            prop="conditions"
            label="学生情况"
            width="200"
            >
            </el-table-column>

            <el-table-column
            label="警告本人"
            width="200"
            >
            <template slot-scope="scope">
                <el-button type="danger"  @click="upLateRecord(scope.row)">上传</el-button>
            </template>
            </el-table-column>

        </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            LateRecordData:[],
            search:''
        }
    },
    mounted(){
        this.getLateRecord()
    },
    methods:{
        getLateRecord(){
            axios.get("/lateRecord").then((res)=>{
                if(res.data.code === 202391){
                    this.LateRecordData = res.data.data
                }else if(res.data.code === 202390){
                    this.$message.info("全部已签到!")
                    this.LateRecordData = res.data.data
                }
            })
        },
        
        upLateRecord(row){
            axios.post("/lateRecord",row).then((res)=>{
                if(res.data.code === 202351){
                    this.$message.warning(res.data.data);
                    this.getLateRecord()
                }else{
                    this.$message.error("上传失败!")
                }
            })
        }

    },
}
</script>

<style>

</style>