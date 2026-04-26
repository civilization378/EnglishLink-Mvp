Page({
  data: {
    total: 0,
    correct: 0,
    accuracy: 0,
    history: []
  },

  onShow() {
    this.loadStudyData()
  },

  loadStudyData() {
    const stats = wx.getStorageSync('studyStats') || { total: 0, correct: 0 }
    const history = wx.getStorageSync('studyHistory') || []
    const accuracy = stats.total > 0
      ? Math.round((stats.correct / stats.total) * 100)
      : 0

    this.setData({
      total: stats.total,
      correct: stats.correct,
      accuracy,
      history
    })
  },

  goBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.redirectTo({ url: '/pages/index/index' })
      }
    })
  },

  clearStudyData() {
    wx.showModal({
      title: '清空学习记录？',
      content: '清空后，已学习次数、答题记录和正确率会重置，且无法恢复。',
      confirmText: '仍然清空',
      confirmColor: '#D96C5F',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('studyStats')
          wx.removeStorageSync('studyHistory')
          wx.removeStorageSync('studyProgress')

          this.setData({ total: 0, correct: 0, accuracy: 0, history: [] })

          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  }
})
