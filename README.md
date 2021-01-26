## 基于d2-admin开发浏览器前端步骤
### 1.1 参考d2-admin介绍完成相应软件安装及启动d2-admin
```
https://d2.pub/zh/doc/d2-admin/
```
### 1.2 浏览器自定义开发
#### 1.2.1 分页查询列表
- 1) 进入文件夹src/modules/创建xxx.js,这里以explorer.block.api.js为例，完成前后端接口定义
```
  export default ({ request }) => ({
  /**
   * @description 区块列表
   * @description http://127.0.0.1:8090/list
   */
  BLOCK_ALL(query = {}) {
    return request({
      url: '/list',
      method: 'get',
      data: query
    })
  },
  /**
* @description 区块列表分页查询, post请求测试
* @description http://127.0.0.1:8090/page1
*/
  BLOCK_ALL_PAGE(data) {
    return request({
      url: '/page1',
      method: 'post',
      data
    })
  },
  /**
* @description 区块列表分页查询，get请求测试
* @description http://127.0.0.1:8090/page?pageNum=1&pageSize=5
*/
  BLOCK_ALL_PAGE1(pageNum,pageSize) {
    return request({
      url: '/page?pageNum='+pageNum+'&pageSize='+pageSize,
      method: 'get'
    })
  },

  BLOCK_INFO(id) {
    return request({
      url: '/info/'+id,
      method: 'get'
    })
  },
})
```
- 2) 进入src/menu,新增一个左侧菜单栏，例如区块列表，直接新增即可
```
export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/blocklist', title: '区块列表', icon: 'home' }, // 新增
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  }
])
```
- 3) 进入src/view目录构建对应的前端页面，例如区块列表，新增表格
```
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
    // TODO post请求
    // async fetchdata() {
    //   let data = {
    //     pageSize: this.pageSize,
    //     pageNum: this.currentPage,
    //   };
    //   try {
    //     const res = await this.$api.BLOCK_ALL_PAGE(data);
    //     this.tableData = res.data;
    //     this.total = res.total;
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // TODO get请求
    async fetchdata() {
      try {
        const res = await this.$api.BLOCK_ALL_PAGE1(
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
```