// pages/card/card/card.js
const app = getApp()
const AV = require('../../../libs/av-weapp-min')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_img: null,
    open: false,
    FontFamily: 'myfont',
    FontFace: null,
    go: true,
    path: null,
    text: '金风吹绿梢，玉露洗红箨',
    poem: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getFont()
    this.getPoem()
  },

  openPoem: function () {
    this.setData({
      open: !this.data.open
    })
  },

  skip: function () {
    let a = parseInt(6000 * Math.random())
    console.log(a)
    return a
  },

  rePeom: function () {
    this.getPoem()
    this.setData({
      open: false
    })
  },

  nameSlice: function (val) {
    if (val.length > 12) {
      return val.slice(0, 12) + '...'
    } else {
      return val
    }
  },

  getPoem: function () {
    wx.showLoading({
      title: '抽取中..',
    })
    new AV.Query('poet')
      .descending('createdAt')
      .limit(1)
      .skip(this.skip())
      .find()
      .then(val => this.setData({ poem: val[0] }))
      .then(() => { wx.hideLoading(); this.getUser() })
      .catch(console.error)
  },

  getUser: function () {
    var _this = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        _this.getImageInfo(userInfo.avatarUrl)
        _this.setData({
          nickName: nickName
        })
      }
    })
  },

  getImageInfo: function (url) {
    var _this = this  //  图片缓存本地的方法
    if (typeof url === 'string') {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          _this.setData({
            head_img: res.path
          })
          _this.drawImg()
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },

  drawImg: function () {
    var n = 2
    console.log(this.data.poem.attributes.title)
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage('../../../utils/img/sl.png', 50 * n, 110 * n, 280 * n, 280 * n)
    ctx.drawImage(this.data.head_img, 165 * n, 513 * n, 46 * n, 46 * n)
    ctx.drawImage('../../../utils/img/bac1.png', 0, 0, 375 * n, 667 * n)

    // ctx.setFontSize(24)
    ctx.font = 20 * n + "px HanWangKaiMediumChuIn"
    ctx.setFillStyle('#666666')
    ctx.shadowOffsetY = 5
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#999999";
    ctx.textAlign = 'center'
    ctx.fillText(this.nameSlice(this.data.poem.attributes.title), 187 * n, 440 * n)

    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#fff";
    ctx.setFillStyle('#b91511')
    ctx.fillRect(127 * n, 465 * n, 120 * n, 2)
    // ctx.fillText('早有蜻蜓立上头', 55 * n, 480 * n)

    ctx.setFillStyle('#999999')
    ctx.textAlign = 'center'
    ctx.setFontSize(15 * n)
    ctx.fillText(this.data.poem.attributes.author, 187 * n, 500 * n)

    // ctx.setFillStyle('#999999')
    // ctx.setFontSize(13)
    // ctx.fillText(this.data.nickName, 187 * n, 590 * n)


    ctx.draw()

    var _this = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375 * n,
        height: 667 * n,
        destWidth: 375 * n,
        destHeight: 667 * n,
        canvasId: 'myCanvas',
        success: function (res) {
          _this.setData({
            path: res.tempFilePath
          })
          console.log(res.tempFilePath)
        }
      })
    }, 300)
  },

  saveImg: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.path,
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail(res) {
        wx.showToast({
          title: '保存失败',
          duration: 1500
        })
      }
    })
  },

  getFont1: function (val) {
    val = '小荷才露尖尖角早有蜻蜓立上头'
    wx.showLoading({
      title: '加载数据中',
    })
    wx.request({
      url: 'https://zhide.leanapp.cn/index/font?font=' + val,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },

  getFont: function () {
    var _this = this
    var val = this.data.text
    wx.showLoading({
      title: '加载数据中',
    })
    wx.request({
      url: 'https://service.youziku.com/batchCustomWebFont/createBatchWoffWebFontAsync',
      method: 'POST',
      data: {
        ApiKey: '349c2aa312bf52a4c44f7bd38b3781ed',
        Datas: [{
          Content: val,
          Url: 'zhide/f',
          AccessKey: '9b6f24076d634b9e8ba3f6a64531928c'
        }]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        _this.setData({
          go: true
        })
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