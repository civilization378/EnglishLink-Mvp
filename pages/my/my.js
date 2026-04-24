Page({
  data: {
    total: 0,
    correct: 0,
    history: []
  },

  onShow() {
    this.loadStudyData()
  },

  loadStudyData() {
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
  },

  clearStudyData() {
    wx.showModal({
      title: '确认清空？',
      content: '清空后，学习次数、答对次数和历史记录都会被删除。',
      confirmText: '清空',
      confirmColor: '#e64340',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('studyStats')
          wx.removeStorageSync('studyHistory')
          wx.removeStorageSync('studyProgress')

          this.setData({
            total: 0,
            correct: 0,
            history: []
          })

          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  }
})