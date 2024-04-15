<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-select
          v-model="selectedClass"
          placeholder="请选择星期╭∩╮༼◕ل͜◕༽╭∩╮"
          @change="handleTimeChange"
          style="margin-top: 20px"
        >
          <el-option
            v-for="time in times"
            :key="time[1]"
            :label="time[0]"
            :value="time[1]"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="font-weight: bold">
        <el-table :data="loginTable" style="width: 1200px">
          <el-table-column label="序号">
            <template slot-scope="scope">
              {{ isDataEmpty(scope.row) ? "" : scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column prop="stuName" label="姓名"></el-table-column>
          <el-table-column prop="stuCode" label="学号"></el-table-column>
          <el-table-column prop="dayOfWeek" label="星期"></el-table-column>
          <el-table-column prop="createTime" label="登录时间"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination
      background
      :page-size="15"
      :page.sync="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @prev-click="handPrevPage"
      @next-click="handNextPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      search: "",
      selectedClass: "",
      currentPage: 1,
      total: 0,
      times: [
        ["༄周一࿐ེ", "1"],
        ["༄周二࿐ེ", "2"],
        ["༄周三࿐ེ", "3"],
        ["༄周四࿐ེ", "4"],
        ["༄周五࿐ེ", "5"],
      ],
      loginTable: [],
    };
  },
  mounted(){
    this.getLogInfo()
  },
  methods: {
    isDataEmpty(data) {
      // 判断对象的所有属性是否都为空
      return Object.values(data).every((value) => value === "");
    },
    getLogInfo() {
      let id = this.selectedClass;
      if (id === "") {
        id = "0";
      }
      axios.get(`/logInfo/get/${this.currentPage}/${id}`).then((res) => {
        if (res.data.code === 202391) {
          console.log(res.data.data.records,6666666)
          this.loginTable = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.$message({
            type: "info",
            message: "暂无登录记录!",
          });
        }
      });
    },
    handleTimeChange() {
      this.getLogInfo();
    },
    handPrevPage() {
      this.getLogInfo();

    },
    handNextPage() {
      this.getLogInfo();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getLogInfo();
    },
  }
};
</script>
<style scoped></style>
