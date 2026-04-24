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
    } else {
      wx.showToast({
        title: '已经学完全部内容',
        icon: 'none'
      })

      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  }
})