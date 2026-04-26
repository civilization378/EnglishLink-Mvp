const { videos } = require('../../data/videos')

Page({
  data: {
    currentVideo: {},
    currentIndex: 0,
    totalVideos: videos.length,
    selectedIndex: -1,
    resultText: '',
    showChineseHint: false,
    videoEnded: false,
    showQuestionDrawer: false,
    subtitleVisible: false,
    glossaryVisible: false,
    isPlaying: true
  },

  onLoad(options) {
    const index = Number(options.index || 0)

    this.setData({
      currentIndex: index,
      currentVideo: videos[index],
      selectedIndex: -1,
      resultText: '',
      showChineseHint: false,
      videoEnded: false,
      showQuestionDrawer: false,
      subtitleVisible: false,
      glossaryVisible: false,
      isPlaying: true
    })
  },

  onReady() {
    this.ensureVideoContext()
    this.tryAutoPlay()
  },

  onShow() {
    this.tryAutoPlay()
  },

  ensureVideoContext() {
    if (!this.videoContext) {
      try {
        this.videoContext = wx.createVideoContext('mainVideo', this)
      } catch (err) {
        // 创建失败时静默处理
      }
    }
    return this.videoContext
  },

  tryAutoPlay() {
    setTimeout(() => {
      try {
        const ctx = this.ensureVideoContext()
        if (ctx && typeof ctx.play === 'function') {
          ctx.play()
          this.setData({ isPlaying: true })
        }
      } catch (err) {
        // 自动播放失败时静默处理，用户仍可手动点击播放
      }
    }, 300)
  },

  toggleVideoPlay() {
    try {
      const ctx = this.ensureVideoContext()
      if (this.data.isPlaying) {
        if (ctx && typeof ctx.pause === 'function') ctx.pause()
        this.setData({ isPlaying: false })
      } else {
        if (ctx && typeof ctx.play === 'function') ctx.play()
        this.setData({ isPlaying: true })
      }
    } catch (err) {
      // 静默处理
    }
  },

  pauseVideoSafely() {
    try {
      const ctx = this.ensureVideoContext()
      if (ctx && typeof ctx.pause === 'function') {
        ctx.pause()
      }
    } catch (err) {
      // 忽略暂停异常
    }
  },

  onVideoEnded() {
    this.setData({ videoEnded: true })

    if (!this.data.showQuestionDrawer) {
      setTimeout(() => {
        try {
          const ctx = this.ensureVideoContext()
          if (ctx && typeof ctx.seek === 'function') {
            ctx.seek(0)
          }
          if (ctx && typeof ctx.play === 'function') {
            ctx.play()
          }
        } catch (err) {
          // 循环播放失败时静默处理
        }
      }, 80)
    }
  },

  toggleChineseHint() {
    this.setData({
      showChineseHint: !this.data.showChineseHint
    })
  },

  toggleSubtitle() {
    this.setData({
      subtitleVisible: !this.data.subtitleVisible
    })
  },

  openGlossary() {
    this.setData({
      glossaryVisible: true
    })
  },

  closeGlossary() {
    this.setData({
      glossaryVisible: false
    })
  },

  openQuestionDrawer() {
    if (this.data.showQuestionDrawer) {
      return
    }
    this.pauseVideoSafely()
    this.setData({
      videoEnded: true,
      showQuestionDrawer: true,
      glossaryVisible: false,
      isPlaying: false
    })
  },

  closeQuestionDrawer() {
    this.setData({
      showQuestionDrawer: false
    })
  },

  replayVideo() {
    this.setData({
      showQuestionDrawer: false,
      glossaryVisible: false,
      isPlaying: true
    })

    setTimeout(() => {
      try {
        const ctx = this.ensureVideoContext()
        if (ctx && typeof ctx.seek === 'function') {
          ctx.seek(0)
        }
        if (ctx && typeof ctx.play === 'function') {
          ctx.play()
        }
      } catch (err) {
        // 重播失败时静默处理
      }
    }, 80)
  },

  goBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.redirectTo({ url: '/pages/index/index' })
      }
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

    wx.setStorageSync('studyProgress', {
      nextIndex: hasNext ? nextIndex : 0,
      completedAll: !hasNext
    })

    wx.navigateTo({
      url: `/pages/result/result?isCorrect=${isCorrect}&question=${encodeURIComponent(currentVideo.question.text)}&explanation=${encodeURIComponent(currentVideo.question.explanation)}&nextIndex=${nextIndex}&hasNext=${hasNext}`
    })
  }
})
