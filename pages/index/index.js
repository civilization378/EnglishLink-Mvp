Page({
  data: {
    total: 0,
    correct: 0
  },

  onShow() {
    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    this.setData({
      total: stats.total,
      correct: stats.correct
    })
  },

  goStudy() {
    wx.navigateTo({
      url: '/pages/study/study'
    })
  },

  goMy() {
    wx.navigateTo({
      url: '/pages/my/my'
    })
  }
})