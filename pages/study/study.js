const { videos } = require('../../data/videos')

Page({
  data: {
    currentVideo: {},
    currentIndex: 0,
    selectedIndex: -1,
    resultText: '',
    showChineseHint: false
  },

  onLoad(options) {
    const index = Number(options.index || 0)

    this.setData({
      currentIndex: index,
      currentVideo: videos[index],
      selectedIndex: -1,
      resultText: '',
      showChineseHint: false
    })
  },

  toggleChineseHint() {
    this.setData({
      showChineseHint: !this.data.showChineseHint
    })
  },

  chooseOption(e) {
    const index = e.currentTarget.dataset.index

    this.setData({
      selectedIndex: index
    })
  },

  submitAnswer() {
    const { selectedIndex, currentVideo, currentIndex } = this.data

    if (selectedIndex === -1) {
      wx.showToast({
        title: '请先选择一个答案',
        icon: 'none'
      })
      return
    }

    const isCorrect = Number(selectedIndex) === currentVideo.question.answerIndex

    const history = wx.getStorageSync('studyHistory') || []

    const newRecord = {
      videoId: currentVideo.id,
      title: currentVideo.title,
      question: currentVideo.question,
      isCorrect: isCorrect,
      time: new Date().toLocaleString()
    }

    history.unshift(newRecord)
    wx.setStorageSync('studyHistory', history)

    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    stats.total += 1

    if (isCorrect) {
      stats.correct += 1
    }

    wx.setStorageSync('studyStats', stats)

    const nextIndex = currentIndex + 1
    const hasNext = nextIndex < videos.length

    wx.navigateTo({
  url: `/pages/result/result?isCorrect=${isCorrect}&question=${encodeURIComponent(currentVideo.question.text)}&explanation=${encodeURIComponent(currentVideo.question.explanation)}&nextIndex=${nextIndex}&hasNext=${hasNext}`
})
  }
})