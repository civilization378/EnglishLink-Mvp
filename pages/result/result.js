Page({
  data: {
    isCorrect: false,
    question: '',
    explanation: ''
  },

  onLoad(options) {
    this.setData({
      isCorrect: options.isCorrect === 'true',
      question: decodeURIComponent(options.question || ''),
      explanation: decodeURIComponent(options.explanation || '')
    })
  },

  goBackHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  goNext() {
    wx.navigateBack()
  }
})