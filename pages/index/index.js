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
    const rawNextIndex = Number(progress.nextIndex) || 0

    // 防御：旧版本视频数变化后，缓存的 nextIndex 可能超过当前 totalVideos，
    // 会出现「进度 8 / 5」这种错误。这里 clamp 到合法范围。
    const isOutOfRange = rawNextIndex < 0 || rawNextIndex >= totalVideos
    const completedAll = !!progress.completedAll || isOutOfRange

    const safeIndex = totalVideos > 0
      ? Math.min(Math.max(rawNextIndex, 0), totalVideos - 1)
      : 0

    // 推荐学习的索引：通关后从 0 开始重练，否则用 clamp 后的索引。
    const recommendIndex = completedAll ? 0 : safeIndex
    const todayVideo = videos[recommendIndex] || {}

    // 如果检测到缓存与当前视频库不一致，顺手把缓存修正回干净状态。
    if (isOutOfRange) {
      wx.setStorageSync('studyProgress', {
        nextIndex: 0,
        completedAll: true
      })
    }

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
      completedAll
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