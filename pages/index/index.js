const { videos } = require('../../data/videos')

Page({
  data: {
    total: 0,
    correct: 0,
    accuracy: 0,
    todayVideo: {},
    recommendIndex: 0,
    recommendNumber: 1,
    totalVideos: 0,
    completedAll: false
  },

  onShow() {
    const stats = wx.getStorageSync('studyStats') || {
      total: 0,
      correct: 0
    }

    const progress = wx.getStorageSync('studyProgress') || {
      nextIndex: 0,
      completedAll: false
    }

    const totalVideos = videos.length
    const recommendIndex = progress.nextIndex || 0
    const todayVideo = videos[recommendIndex] || {}
    const accuracy = stats.total > 0
      ? Math.round((stats.correct / stats.total) * 100)
      : 0

    this.setData({
      total: stats.total,
      correct: stats.correct,
      accuracy,
      todayVideo,
      recommendIndex,
      recommendNumber: recommendIndex + 1,
      totalVideos,
      completedAll: progress.completedAll
    })
  },

  goStudy() {
    wx.setStorageSync('studyProgress', {
      nextIndex: this.data.recommendIndex,
      completedAll: false
    })

    wx.navigateTo({
      url: `/pages/study/study?index=${this.data.recommendIndex}`
    })
  },

  goMy() {
    wx.navigateTo({
      url: '/pages/my/my'
    })
  }
})