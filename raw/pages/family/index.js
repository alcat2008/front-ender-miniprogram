Page({
  data: {
    isLoading: true,
    currentPage: 1,
    totalPage: 1,
    pageSize: 6,
    activities: [],
  },
  _fetch (cb) {
    wx.showNavigationBarLoading()
    const { currentPage, pageSize, activities } = this.data
    wx.request({
      url: 'http://localhost:3003/api/family/activities',
      method: 'POST',
      data: {
        currentPage,
        pageSize
      },
      success: ({ statusCode, data }) => {
        if (statusCode === 200 && data.code === 0) {
          this.setData({
            isLoading: false,
            currentPage: data.data.page.currentPage,
            totalPage: data.data.page.totalPage,
            activities: (currentPage === 1 ? data.data.data : activities.concat(data.data.data))
              .map(a => Object.assign({}, a, { url: encodeURIComponent(a.url) }))
          })
        }
      },
      complete: () => {
        wx.hideNavigationBarLoading()
        cb && cb()
      }
    })
  },
  _encode (str) {
    return encodeURI(str)
  },
  onLoad () {
    this._fetch()
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