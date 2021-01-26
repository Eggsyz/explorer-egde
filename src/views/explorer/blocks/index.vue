<template>
  <d2-container>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //存放从后端传来的数据
      pageSize: 10, //    每页的数据
      currentPage: 1, //第几页
      total: 1, //总条数 这些数据虽然后面会赋值为后端返回的数，但是最好不要为空
    };
  },
  mounted() {
    this.fetchdata();
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchdata();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchdata();
    },
    async fetchdata() {
      try {
        const res = await this.$api.BLOCK_ALL_PAGE(
          this.currentPage,
          this.pageSize
        );
        this.tableData = res.data;
        this.total = res.total;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>