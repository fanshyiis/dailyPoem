// pages/zhide/content/content.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zid: null,
    zhide: null,
    zhideContent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      zid: options.id
    })
    this.getZhideContent(options.id)
    // this.getZhideContent(options.id)
    wx.request({
      url: 'https://zhide.leanapp.cn/index/getwxacode?token=' + app.globalData.access_token,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
      }
    })
  },

  zhideContentLint: function (text) {
    text = text.replace(/<div class="main_first">/g, '--')
    text = text.replace(/<\/div>/g, '--')
    text = text.replace(/<div style="width:100%"><img src="/g, '--')
    text = text.replace(/">/g, '--')
    // console.log(text)
    var list = text.split('--')
    var content = []
    list.map(val => {
      if (val.indexOf("http") > -1) {
        content.push({
          type: 'image',
          url: val
        })
      } else if (val){
        content.push({
          type: 'text',
          url: val
        })
      }
    })
    this.setData({
      zhideContent: content
    })
    console.log(content)
  },

  testItem: function (event) {
    var item = event.currentTarget.dataset.item
    console.log('2222',item)
  },

  getZhideContent: function (id) {
    wx.request({
      url: 'https://zhide.leanapp.cn/index/zhideContent',
      method: 'POST',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var r = res.data.zhide
        r.moreContent = false
        let allRate = 0
        r.Rate.map(val => {
          allRate += Number(val)
        })
        r.RateNum = r.Rate.length
        r.Rate = (allRate / r.Rate.length).toFixed(1)
        this.setData({
          zhide: res.data.zhide,
          zhideContent: res.data.zhide.ZD_content
        })
        this.zhideContentLint(res.data.zhide.ZD_content)
        console.log(this.data.zhide)
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