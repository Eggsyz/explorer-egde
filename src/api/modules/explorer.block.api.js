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
  * @description 区块列表分页查询
  * @description http://127.0.0.1:8090/page?pageNum=1&pageSize=5
  */
  BLOCK_ALL_PAGE(pageNum,pageSize) {
    return request({
      url: '/page?pageNum='+pageNum+'&pageSize='+pageSize,
      method: 'get'
    })
  },
 /**
  * @description 区块详情查询
  * @description http://127.0.0.1:8090/info/1
  */
  BLOCK_INFO(id) {
    return request({
      url: '/info/'+id,
      method: 'get'
    })
  },
})