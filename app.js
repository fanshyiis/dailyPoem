//app.js
const AV = require('./libs/av-weapp-min.js');

AV.init({
  appId: 'XF1dachQC2zx1HKB5y4qAPnl-gzGzoHsz',
  appKey: 'WBl5N6YwuyS3VoVRVKlge6a6',
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://zhide.leanapp.cn/index/testWX?code=' + res.code,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            console.log(res.data)
            this.globalData.session_key = res.data.session_key
            this.globalData.openid = res.data.openid
          }
        })
        wx.request({
          url: 'https://zhide.leanapp.cn/index/codeWX',
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            console.log(res.data.access_token)
            this.globalData.access_token = res.data.access_token
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {   
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    access_token: '7_iB-yVvYpff_mIMQtxhguiqQJEiM7wTHEJuI3CXTj4saWmBqgYQpNWPCv7mEsJyTONQembGvjp6mxK9T-zSA_edRPXs2RAFGaclCNQ306qTKwlmJ5DUcZIuaVfDx58iWOOv7IjcXsTGuGqvaIFSIfAEABOE',
    userInfo: null,
    session_key: null,
    openid: null
  }
})