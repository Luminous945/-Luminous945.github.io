<template>
  <div>
    <div style="margin-top: 30px">
      <el-input
        style="width: 300px"
        v-model="search"
        size="mini"
        placeholder="输入学生姓名来搜索"
      />
    </div>

    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.stuName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 1200px;font-weight: bold"
    >
      <el-table-column prop="id" label="学生ID" width="80"> </el-table-column>

      <el-table-column prop="stuName" label="学生姓名" width="100">
      </el-table-column>

      <el-table-column label="学生学号" prop="stuCode" width="135">
      </el-table-column>

      <el-table-column label="迟到和未签次数" prop="lateTime" width="140">
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime" width="200">
      </el-table-column>

      <el-table-column label="更新时间" prop="updateTime" width="180">
      </el-table-column>

      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="info"
            @click="handleShowTableTime(scope.row)"
            >查看今天课表</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="search === ''"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page.sync="currentPage"
      :page-size="15"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="修改学生信息栏"
      :visible.sync="dialogFormVisible4UpdateStu"
      width="800px"
    >
      <el-form
        :model="UpdateData"
        :rules="rules"
        ref="UpdateData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <span style="font-size: 20px">ID为:{{ this.UpdateData.id }}</span>

        <el-table :data="ShowStuTableInfData" style="width: 100%">
          <el-table-column prop="classToClass" label="节次/星期" width="110">
          </el-table-column>

          <el-table-column prop="monday" label="星期一" width="130">
          </el-table-column>

          <el-table-column prop="tuesday" label="星期二" width="130">
          </el-table-column>

          <el-table-column prop="wednesday" label="星期三" width="130">
          </el-table-column>

          <el-table-column prop="thursday" label="星期四" width="130">
          </el-table-column>

          <el-table-column prop="friday" label="星期五" width="130">
          </el-table-column>
        </el-table>

        <el-form-item style="margin-top: 10px" prop="stuName" label="姓名">
          <el-input
            v-model="UpdateData.stuName"
            placeholder="请输入需修改的学生姓名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="stuCode" label="学号">
          <el-input
            v-model="UpdateData.stuCode"
            placeholder="请输入需修改的学生学号"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          @click="needChangeTimeTable"
          v-if="!this.needForm"
          style="margin-bottom: 10px"
          >点击需要修改课表信息</el-button
        >

        <div v-if="needForm">
          <el-form-item prop="dayWeek" label="周">
            <el-input
              v-model="UpdateData.dayWeek"
              placeholder="请输入需修改的周数"
            />
          </el-form-item>

          <el-form-item prop="classToClass" label="节次">
            <el-input
              v-model="UpdateData.classToClass"
              placeholder="请输入需修改的节次"
            />
          </el-form-item>

          <el-form-item prop="startWeek" label="开始周">
            <el-input
              v-model="UpdateData.startWeek"
              placeholder="请输入修改开始周"
            />
          </el-form-item>

          <el-form-item prop="endWeek" label="结束周">
            <el-input
              v-model="UpdateData.endWeek"
              placeholder="请输入修改结束周"
            />
          </el-form-item>

          <el-form-item prop="isSingle" label="单双全">
            <el-input
              v-model="UpdateData.isSingle"
              placeholder="请输入修改单双全"
            />
          </el-form-item>
        </div>

        <el-row>
          <el-button type="primary" @click="Update('UpdateData')"
            >确定</el-button
          >
          <el-button type="primary" @click="close()">取消</el-button>
        </el-row>
      </el-form>

      <p style="color: red">注意如果修改课表信息,之前记录将会被删除!!</p>
      <p>修改周数的例如:周一、周二.....</p>
      <p>修改节次:1-2、3-4、5-6、7-8、9-10</p>
      <p>修改单双的值为:单、双、全</p>
    </el-dialog>

    <el-dialog
      title="今天课表展示"
      :visible.sync="dialogFormVisibleTableStu"
      width="1120px"
    >
      <el-table :data="ShowTimeTableData" style="width: 100%">
        <el-table-column prop="stuName" label="姓名" width="180">
        </el-table-column>

        <el-table-column prop="dayWeek" label="周" width="180">
        </el-table-column>

        <el-table-column prop="classToClass" label="节次" width="180">
        </el-table-column>

        <el-table-column prop="isSingle" label="单双全" width="180">
        </el-table-column>

        <el-table-column prop="startWeek" label="开始周" width="180">
        </el-table-column>

        <el-table-column prop="endWeek" label="结束周" width="180">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      ShowTimeTableData: [],
      ShowStuTableInfData: [],
      search: "",
      total: 0,
      dialogFormVisible4UpdateStu: false,
      dialogFormVisibleTableStu: false,
      needForm: false,
      currentPage: 1,
      UpdateData: {},

      rules: {
        stuName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在2到4个字符", trigger: "blur" },
        ],
        stuCode: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 3, max: 50, message: "长度在3到50个字符", trigger: "blur" },
        ],
        dayWeek: [
          { required: true, message: "请输入周数", trigger: "blur" },
          { min: 2, max: 2, message: "长度为2个字符", trigger: "blur" },
        ],
        classToClass: [
          { required: true, message: "请输入节次", trigger: "blur" },
          { min: 3, max: 4, message: "长度为3-4字符", trigger: "blur" },
        ],
        startWeek: [
          { required: true, message: "请输入开始周", trigger: "blur" },
          { min: 1, max: 2, message: "长度在1到2个字符", trigger: "blur" },
        ],
        endWeek: [
          { required: true, message: "请输入结束周", trigger: "blur" },
          { min: 1, max: 2, message: "长度在1到2个字符", trigger: "blur" },
        ],
        isSingle: [
          { required: true, message: "请输入是否单双", trigger: "blur" },
          { min: 1, max: 1, message: "长度为1个字符", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.showStuList();
  },

  methods: {
    //获取学生信息
    getInf(stuCode) {
      axios.get("/stuInf/getOne/" + stuCode).then((res) => {
        this.UpdateData = res.data.data;
      });
    },

    getTableInf(stuCode) {
      axios.get("/stuInf/getTable/" + stuCode).then((res) => {
        this.ShowStuTableInfData = res.data.data;
      });
    },

    //编辑信息
    handleEdit(row) {
      this.needForm = false;
      this.getInf(row.stuCode);
      this.getTableInf(row.stuCode);
      this.dialogFormVisible4UpdateStu = true;
    },

    //删除学生
    handleDelete(row) {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete("/stuInf/delStu/" + row.id).then((res) => {
            if (res.data.code === 202371) {
              this.$message.success(res.data.data);
              this.handleCurrentChange(this.currentPage);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //得到第一页的数据
    showStuList() {
      axios.get("/stuInf/1").then((res) => {
        if (res.data.code === 202391) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.currentPage = 1;
          
        } else {
          this.$message.error("暂无学生!");
        }
      });
    },

    //当页数发生改变时
    handleCurrentChange(val) {
      axios.get("/stuInf/" + val).then((res) => {
        if (res.data.code === 202391) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.currentPage = val;
        } else {
          this.$message.error("暂无学生!");
        }
      });
    },

    handleSizeChange() {},

    Update(UpdateData) {
      this.$refs[UpdateData].validate((valid) => {
        if (valid) {
          console.log(this.UpdateData);
          axios.put("/stuInf/updateStuInf", this.UpdateData).then((res) => {
            if (res.data.code === 202381) {
              this.$message.success(res.data.data);
              this.dialogFormVisible4UpdateStu = false;
              this.handleCurrentChange(this.currentPage);
            } else if (res.data.code === 202380) {
              this.$message.error(res.data.data);
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        }
      });
    },
    //展示当天课表
    handleShowTableTime(row) {
      this.dialogFormVisibleTableStu = true;
      axios.get("/stuInf/getOneTableTime/" + row.id).then((res) => {
        if (res.data.code === 202391) {
          this.ShowTimeTableData = res.data.data;
        } else {
          this.$message.warning("还未生成课表");
        }
      });
    },

    needChangeTimeTable() {
      this.needForm = true;
    },

    close() {
      this.dialogFormVisible4UpdateStu = false;
    },
  },
};
</script>

<style>
.timeTable {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
