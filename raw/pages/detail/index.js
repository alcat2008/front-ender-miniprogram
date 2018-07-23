Page({
  data: {
    goodsId: '',
    goodsName: '',
    banners: [],
    price: 0,
    sold: 0,
    specification: [],
    selectedSpec: '',
    showSpecs: false,
    images: [],
  },
  onLoad (option) {
    wx.showNavigationBarLoading()
    wx.request({
      url: 'https://capimall.jcease.com/api/shop/v7/mall/goods/detail',
      method: 'POST',
      data: { goodsId: option.id },
      // data: { goodsId: '77c5508e9a034a959fe58a9ccaa4266a' },
      success: ({ statusCode, data }) => {
        if (statusCode === 200 && data.code === 0) {
          const detail = data.data
          wx.setNavigationBarTitle({
            title: detail.goodsName
          })
          this.setData({
            goodsId: detail.goodsId,
            goodsName: detail.goodsName,
            banners: detail.banners,
            price: detail.price,
            sold: detail.alreadySale,
            specification: detail.specification,
            selectedSpec: detail.specification.map(spec => spec.propertyChildren[0].propertyName)[0] || '',
            images: detail.images,
          })
        }
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  },
  _toggleSpecPopup () {
    this.setData({
      showSpecs: !this.data.showSpecs
    });
  },
  _handleSpecTap () {
    this._toggleSpecPopup()
  },
  onShareAppMessage () {
    return {
      title: '前端行知录',
      path: '/page/user?id=123'
    }
  }
})