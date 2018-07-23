Page({
  data: {
    isLoading: true,
    categories: [],
    categoryId: '',
    currentPage: 1,
    totalPage: 1,
    pageSize: 6,
    goods: [],
  },
  _fetch (cb) {
    wx.showNavigationBarLoading()
    const { currentPage, pageSize, categoryId, goods } = this.data
    wx.request({
      url: 'https://capimall.jcease.com/api/shop/v6/mall/goods/list',
      method: 'POST',
      data: {
        currentPage,
        pageSize,
        categoryId
      },
      success: ({ statusCode, data }) => {
        if (statusCode === 200 && data.code === 0) {
          this.setData({
            isLoading: false,
            currentPage: data.data.page.currentPage,
            totalPage: data.data.page.totalPage,
            goods: currentPage ===1 ? data.data.result : goods.concat(data.data.result)
          })
        }
      },
      complete: () => {
        wx.hideNavigationBarLoading()
        cb && cb()
      }
    })
  },
  onLoad () {
    wx.request({
      url: 'https://capimall.jcease.com/api/shop/mall/category/shopList',
      method: 'POST',
      data: {},
      success: ({ statusCode, data }) => {
        if (statusCode === 200 && data.code === 0) {
          this.setData({
            categories: data.data,
            categoryId: data.data[0].categoryId
          }, () => {
            this._fetch()
          })
        }
      }
    })
  },
  onPullDownRefresh () {
    console.log('** onPullDownRefresh **')
    this.setData({
      currentPage: 1,
    }, () => {
      this._fetch(() => {
        wx.stopPullDownRefresh()
      })
    })
  },
  onReachBottom () {
    console.log('** onReachBottom **')
    const { currentPage, totalPage } = this.data
    if (currentPage < totalPage) {
      this.setData({
        isLoading: true,
        currentPage: currentPage + 1
      }, () => {
        this._fetch()
      })
    }
  }
})