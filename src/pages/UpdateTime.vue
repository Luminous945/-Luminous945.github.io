<template>

<div>
        <el-table
        :data="ShowTimeData"
        style="width: 100%;font-weight: bold">

            <el-table-column
                prop="sections"
                label="节次"
                width="100">
            </el-table-column>

            <el-table-column
                prop="startTime"
                label="开始签到时间"
                width="200">
            </el-table-column>

            <el-table-column
                prop="lastTime"
                label="签到结束时间"
                width="200">
            </el-table-column>

            <el-table-column
                prop="lateTime"
                label="迟到结束时间"
                width="200">
            </el-table-column>

            <el-table-column
                label="修改"
                width="200">

                <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">编辑</el-button>
                </template>
                
            </el-table-column>
            
        </el-table>

        <el-table
        :data="ShowTimeWeek"
        style="width: 100%;font-weight: bold">
            <el-table-column
                prop="week"
                label="当前周"
                width="200">
            </el-table-column>

            <el-table-column
                prop="originalTime"
                label="之前时间"
                width="200">
            </el-table-column>

            <el-table-column
                prop="changeTime"
                label="当前时间"
                width="200">
            </el-table-column>

            <el-table-column
                label="修改"
                width="300">
                <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="handleWeekEdit(scope.row)">编辑周</el-button>
                <el-button
                size="mini"
                type="primary"
                :disabled="buttonClicked"
                @click="handleDateEdit()">将时间修改为现在时间</el-button>
                </template>
            </el-table-column>
            
        </el-table>


         <el-dialog title="修改时间信息栏" :visible.sync="updateTimeForm" width="500px" >

            <el-form :model="OneTimeDate"  ref="OneTimeDate" label-width="100px" class="demo-ruleForm">
                
                <div>
                    <span style="font-size:20px">节次为:{{this.OneTimeDate.sections}}</span>   
                </div>

                <el-form-item label="签到时间">
                    <el-input v-model="OneTimeDate.startTime" ></el-input>
                </el-form-item>

                <el-form-item label="签到结束时间">
                    <el-input v-model="OneTimeDate.lastTime" ></el-input>
                </el-form-item>

                <el-form-item label="迟到时间">
                    <el-input v-model="OneTimeDate.lateTime" ></el-input>
                </el-form-item>

                <el-row>
                    <el-button type="primary" @click="updateTime()">确定</el-button>
                    <el-button type="primary" @click="close()">取消</el-button>
                </el-row>
            </el-form>
              <span style="color:red;margin-top:30px">注意保持形式!例如:00:00:00</span>
        </el-dialog>



        <el-dialog title="修改周" :visible.sync="updateWeek" width="300px" >
            <el-form :model="upweekInf"  ref="OneTimeDate" label-width="100px" class="demo-ruleForm">

                <el-form-item label="周">
                    <el-input v-model.number="upweekInf.week" ></el-input>
                </el-form-item>

                <el-row>
                    <el-button type="primary" @click="changeWeek()">确定</el-button>
                    <el-button type="primary" @click="closeWeek()">取消</el-button>
                </el-row>
            </el-form>
        </el-dialog>

</div>
  
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            ShowTimeData:[],
            updateTimeForm:false,
            ShowTimeWeek:[],
            OneTimeDate:{
                sections:'',
                startTime:'',
                lastTime:'',
                lateTime:'',
            },
            upweekInf:{},
            buttonClicked:false,
            updateWeek:false
        }
    },
    mounted(){
        this.getSchedule(),
        this.getWeek()
    },
    methods:{
        //获取所有时间点
        getSchedule(){
            axios.get("/schedule/getSchedule").then((res)=>{
                this.ShowTimeData = res.data.data
            })
        },
        //获取周
        getWeek(){
            axios.get("/schedule/getWeek").then((res)=>{
                this.ShowTimeWeek = res.data.data;
            })
        },

        //获取一个时间点
        getOneTime(sections){
            axios.get("/schedule/getOneTime/"+sections).then((res)=>{
                this.OneTimeDate = res.data.data
            })
        },
        //打开编辑表
        handleEdit(row){
            this.getOneTime(row.sections)
            this.updateTimeForm = true
        },
        //更新时间
        updateTime(){
            console.log(this.OneTimeDate);
            axios.put("/schedule/updateTime",this.OneTimeDate).then((res)=>{
                if(res.data.code === 202381){
                    this.getSchedule()
                    this.$message.success(res.data.data)
                    this.updateTimeForm = false
                }else if(res.data.code === 202380){
                    this.$message.error("没有修改时间呢!")
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        //修改周
        handleWeekEdit(){
            this.updateWeek = true;
            axios.get("/schedule/getWeek").then((res)=>{
                this.upweekInf = res.data.data[0];
            })
        },
        //修改之前时间
        handleDateEdit(){
            this.buttonClicked = true;
            axios.put("/schedule/updateOriginalTime").then((res)=>{
                this.$message.success(res.data.data)
                this.getWeek()
            })
        },
        //修改周
        changeWeek(){
            axios.put("/schedule/updateWeek/"+this.upweekInf.week).then((res)=>{
                if(res.data.code === 202381){
                    this.$message.success(res.data.data)
                    this.updateWeek = false
                    this.getWeek()
                    this.upweekInf = {}
                }else if(res.data.code === 202380){
                    this.$message.error(res.data.data)
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        close(){
            this.updateTimeForm = false
            this.OneTimeDate = {}
        },
        closeWeek(){
            this.updateWeek = false
            this.upweekInf = {}
        },
        closeUpdateTable(){
            this.updateTimeForm = false
        }
    }
}
</script>

<style>

</style>