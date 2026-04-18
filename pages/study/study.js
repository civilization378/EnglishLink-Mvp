const { videos } = require('../../data/videos')

Page({
  data: {
    currentVideo: {},
    selectedIndex: -1,
    resultText: ''
  },

  onLoad() {
    this.setData({
      currentVideo: videos[0]
    })
  },

  chooseOption(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedIndex: index
    })
  },

  submitAnswer() {
    const { selectedIndex, currentVideo } = this.data

    if (selectedIndex === -1) {
      wx.showToast({
        title: '请先选择一个答案',
        icon: 'none'
      })
      return
    }

    const isCorrect = Number(selectedIndex) === currentVideo.answer

    this.setData({
      resultText: isCorrect ? '回答正确' : '回答错误'
    })

    // 1. 读取旧的学习记录
    const history = wx.getStorageSync('studyHistory') || []

    // 2. 新增一条记录
    const newRecord = {
      videoId: currentVideo.id,
      title: currentVideo.title,
      question: currentVideo.question,
      isCorrect: isCorrect,
      time: new Date().toLocaleString()
    }

    history.unshift(newRecord)

    // 3. 保存学习记录
    wx.setStorageSync('studyHistory', history)

    // 4. 读取旧的统计数据
    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    // 5. 更新统计数据
    stats.total += 1
    if (isCorrect) {
      stats.correct += 1
    }

    // 6. 保存统计数据
    wx.setStorageSync('studyStats', stats)

    // 7. 跳转到结果页
    wx.navigateTo({
      url: `/pages/result/result?isCorrect=${isCorrect}&question=${encodeURIComponent(currentVideo.question)}&explanation=${encodeURIComponent(currentVideo.explanation)}`
    })
  }
})