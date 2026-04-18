Page({
  data: {
    total: 0,
    correct: 0,
    history: []
  },

  onShow() {
    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    const history = wx.getStorageSync('studyHistory') || []

    this.setData({
      total: stats.total,
      correct: stats.correct,
      history: history
    })
  }
})