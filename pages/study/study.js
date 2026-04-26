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
    isPlaying: true,
    isSwitching: false,
    switchDirection: '',
    switchPhase: '',
    slideAnimClass: ''
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

  onTouchStart(e) {
    this._touchStartY = e.touches[0].clientY
  },

  onTouchEnd(e) {
    if (this.data.showQuestionDrawer || this.data.glossaryVisible || this.data.isSwitching) return
    const diffY = e.changedTouches[0].clientY - this._touchStartY
    if (diffY < -80) {
      this.goNextVideo()
    } else if (diffY > 80) {
      this.goPrevVideo()
    }
  },

  _loadVideo(newIndex, direction) {
    const outClass = direction === 'next' ? 'switching-next-out' : 'switching-prev-out'
    const inClass  = direction === 'next' ? 'switching-next-in'  : 'switching-prev-in'

    // 第一阶段：淡出（200ms）
    this.setData({ isSwitching: true, slideAnimClass: outClass })

    setTimeout(() => {
      // 切换内容 + 开始淡入
      this.videoContext = null
      this.setData({
        currentIndex: newIndex,
        currentVideo: videos[newIndex],
        selectedIndex: -1,
        resultText: '',
        showChineseHint: false,
        videoEnded: false,
        showQuestionDrawer: false,
        subtitleVisible: false,
        glossaryVisible: false,
        isPlaying: true,
        slideAnimClass: inClass
      })

      // 播放新视频（等渲染稳定后）
      setTimeout(() => {
        try {
          const ctx = this.ensureVideoContext()
          if (ctx && typeof ctx.play === 'function') ctx.play()
        } catch (err) {
          // 静默处理
        }
      }, 80)

      // 淡入完成后清除动画状态（220ms 对应 CSS transition 时长）
      setTimeout(() => {
        this.setData({ isSwitching: false, slideAnimClass: '' })
      }, 240)
    }, 200)
  },

  goNextVideo() {
    const next = this.data.currentIndex + 1
    if (next >= videos.length) {
      wx.showToast({ title: '本轮学习已完成 🎉', icon: 'none', duration: 1500 })
      return
    }
    this._loadVideo(next, 'next')
  },

  goPrevVideo() {
    const prev = this.data.currentIndex - 1
    if (prev < 0) {
      wx.showToast({ title: '已经是第一条了', icon: 'none', duration: 1200 })
      return
    }
    this._loadVideo(prev, 'prev')
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
