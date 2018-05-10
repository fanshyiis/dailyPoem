// pages/zhide/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhideList: null
  },

  wait: function () {
    wx.showToast({
      title: '暂未开放,敬请期待',
    })
  },

  navigateToContent: function (event) {
    var id = event.currentTarget.dataset.zid
    console.log(id)
    wx.navigateTo({
      url: '../content/content?id=' + id
    })
  },

  goCard: function () {
    wx.navigateTo({
      url: '/pages/card/card/card',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZhideList()
  },

  getZhideList: function () {
    wx.showLoading({
      title: '加载数据中',
    })
    wx.request({
      url: 'https://zhide.leanapp.cn/index/getZhide',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        res.data.zhide.map(r => {
          r.moreContent = false
          let allRate = 0
          r.Rate.map(val => {
            allRate += Number(val)
          })
          r.RateNum = r.Rate.length
          r.Rate = (allRate / r.Rate.length).toFixed(1)
        })
        this.setData({
          zhideList: res.data.zhide
        })
         wx.hideLoading()
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})