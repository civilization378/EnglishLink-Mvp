const { videos } = require('../../data/videos')

Page({
  data: {
    total: 0,
    correct: 0,
    todayVideo: {}
  },

  onShow() {
    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    this.setData({
      total: stats.total,
      correct: stats.correct,
      todayVideo: videos[0]
    })
  },

  goStudy() {
    wx.navigateTo({
      url: '/pages/study/study?index=0'
    })
  },

  goMy() {
    wx.navigateTo({
      url: '/pages/my/my'
    })
  }
})