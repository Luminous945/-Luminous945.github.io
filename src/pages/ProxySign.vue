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
            :data="ProxyData.filter(data => !search || data.stuName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 800px;font-weight: bold">

            <el-table-column
            label="签到时间"
            prop="sections">
                <template slot-scope="scope">
                    <span v-if="scope.row.sections === '1-2' ">7:40 - 8:00</span>
                    <span v-if="scope.row.sections === '3-4' ">9:40 - 10:00</span>
                    <span v-if="scope.row.sections === '5-6' ">13:10 - 13:30</span>
                    <span v-if="scope.row.sections === '7-8' ">14:40 - 15:00</span>
                    <span v-if="scope.row.sections === '9-10' ">16:40 - 17:00</span>
                </template>
            </el-table-column>

            <el-table-column
            prop="stuName"
            label="学生姓名"
            width="180"
            >
            </el-table-column>

            <el-table-column
            align="right"
            label="操作">
                <template slot-scope="scope">
                    <el-button
                    type="primary"
                    size="mini"
                    @click="handleEdit(scope.row)">代签</el-button>
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
            ProxyData:[],
            search:''
        }
    },
    mounted(){
        this.getProxyInf();
    },
    methods:{
        getProxyInf(){
            axios.get("/proxy").then((res)=>{
                if(res.data.data !== null){
                this.ProxyData = res.data.data
                }   
            })
        },
        handleEdit(row){
            
            var string = '此操作将对' + row.stuName + '的' + row.sections + '课' + '进行代签, 是否继续?'

            this.$confirm(string, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            axios.put("/proxy",row).then((res)=>{
                this.$message.success(res.data.data);
                this.getProxyInf();
            })
           }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消代签'
                });          
            })

        

        }
    }
}
</script>

<style>

</style>