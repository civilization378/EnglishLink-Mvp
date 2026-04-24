Page({
  data: {
    isCorrect: false,
    question: '',
    explanation: '',
    nextIndex: 0,
    hasNext: false
    
  },

  onLoad(options) {
    this.setData({
      isCorrect: options.isCorrect === 'true',
      question: decodeURIComponent(options.question || ''),
      explanation: decodeURIComponent(options.explanation || ''),
      nextIndex: Number(options.nextIndex || 0),
      hasNext: options.hasNext === 'true'
    })
  },

  goBackHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

 goNext() {
  if (this.data.hasNext) {
    wx.redirectTo({
      url: `/pages/study/study?index=${this.data.nextIndex}`
    })
    return
  }

  const stats = wx.getStorageSync('studyStats') || {
    total: 0,
    correct: 0
  }

  const accuracy = stats.total > 0
    ? Math.round((stats.correct / stats.total) * 100)
    : 0

  wx.showModal({
    title: '本轮学习完成',
    content: `累计学习：${stats.total} 次\n累计答对：${stats.correct} 次\n正确率：${accuracy}%`,
    confirmText: '返回首页',
    showCancel: false,
    success: () => {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  })
}
})