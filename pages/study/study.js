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
    slideAnimClass: '',
    isVideoLoading: false,
    videoVisible: true,
    videoRenderKey: 0,
    switchMaskVisible: false,
    switchMaskFading: false
  },

  onLoad(options) {
    const index = Number(options.index || 0)
    const rawVideo = videos[index]

    // 先用原始数据渲染，保证 UI 立即可见（遮罩默认关闭，视频直接可见）
    this.setData({
      currentIndex: index,
      currentVideo: rawVideo,
      selectedIndex: -1,
      resultText: '',
      showChineseHint: false,
      videoEnded: false,
      showQuestionDrawer: false,
      subtitleVisible: false,
      glossaryVisible: false,
      isPlaying: true,
      switchMaskVisible: false
    })

    // 一次性批量解析所有云端 URL，完成后更新当前视频
    this.resolveAllVideoUrls(() => {
      const resolvedVideo = this._resolvedVideos[index]
      console.log('[EnglishLink] switching to index:', index,
        'videoUrl:', resolvedVideo.videoUrl,
        'orientation:', resolvedVideo.videoOrientation)
      this.setData({ currentVideo: resolvedVideo })
    })
  },

  // 一次性批量解析所有有 videoFileID 的视频，结果缓存到 this._resolvedVideos
  resolveAllVideoUrls(callback) {
    const fileIDs = videos
      .filter(v => v.videoFileID)
      .map(v => v.videoFileID)

    if (fileIDs.length === 0) {
      this._resolvedVideos = videos.slice()
      callback()
      return
    }

    wx.cloud.getTempFileURL({
      fileList: fileIDs,
      success: res => {
        // fileID -> tempFileURL 映射
        const urlMap = {}
        if (res.fileList) {
          res.fileList.forEach(item => {
            if (item.tempFileURL) urlMap[item.fileID] = item.tempFileURL
          })
        }

        // 把解析结果写入对应视频，没解析到的保留原 videoUrl
        this._resolvedVideos = videos.map(v => {
          if (v.videoFileID && urlMap[v.videoFileID]) {
            return { ...v, videoUrl: urlMap[v.videoFileID] }
          }
          return v
        })

        console.log('[EnglishLink] resolved videos:', this._resolvedVideos.map(v => ({
          title: v.title,
          videoUrl: v.videoUrl ? v.videoUrl.substring(0, 60) + '...' : 'none'
        })))
        callback()
      },
      fail: err => {
        console.log('[EnglishLink] resolveAllVideoUrls fail, fallback to original URLs:', err)
        this._resolvedVideos = videos.slice()
        callback()
      }
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

  onVideoPlay() {
    // 视频开始播放：启动遮罩淡出（CSS 180ms 过渡）
    this.setData({ isVideoLoading: false, switchMaskFading: false, switchMaskVisible: false })
  },

  onVideoCanPlay() {
    this.setData({ isVideoLoading: false, switchMaskFading: false, switchMaskVisible: false })
  },

  onVideoLoaded() {
    this.setData({ isVideoLoading: false, switchMaskFading: false, switchMaskVisible: false })
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
    this.setData({ glossaryVisible: true })
  },

  closeGlossary() {
    this.setData({ glossaryVisible: false })
  },

  openQuestionDrawer() {
    if (this.data.showQuestionDrawer) return
    this.pauseVideoSafely()
    this.setData({
      videoEnded: true,
      showQuestionDrawer: true,
      glossaryVisible: false,
      isPlaying: false
    })
  },

  closeQuestionDrawer() {
    this.setData({ showQuestionDrawer: false })
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

    // 切换前先暂停当前视频，避免两条视频同时出声
    this.pauseVideoSafely()

    // 第一阶段：淡出（200ms）
    this.setData({ isSwitching: true, slideAnimClass: outClass })

    setTimeout(() => {
      // 第二阶段：销毁旧 video，遮罩保持透明（背景黑色填充）
      this.videoContext = null
      this.setData({
        videoVisible: false,
        switchMaskVisible: true,
        switchMaskFading: false  // 先保持 opacity:0，下一帧再触发渐入
      })

      // 20ms 后：触发遮罩渐入（CSS 180ms ease：0 → 0.65）
      setTimeout(() => {
        this.setData({ switchMaskFading: true })
      }, 20)

      // 30ms 后：更新数据 + 重建新 video 组件
      setTimeout(() => {
        const newVideo = (this._resolvedVideos && this._resolvedVideos[newIndex])
          || videos[newIndex]

        console.log('[EnglishLink] switching to index:', newIndex,
          'videoUrl:', newVideo.videoUrl,
          'orientation:', newVideo.videoOrientation)

        // 所有字段同时写入，title / url / orientation 不可能错位
        this.setData({
          currentIndex: newIndex,
          currentVideo: newVideo,
          selectedIndex: -1,
          resultText: '',
          showChineseHint: false,
          videoEnded: false,
          showQuestionDrawer: false,
          subtitleVisible: false,
          glossaryVisible: false,
          isPlaying: true,
          videoRenderKey: this.data.videoRenderKey + 1,
          videoVisible: true,
          slideAnimClass: inClass
        })

        // 80ms 后：新 video 组件稳定，创建 context 并播放
        setTimeout(() => {
          try {
            const ctx = this.ensureVideoContext()
            if (ctx && typeof ctx.play === 'function') ctx.play()
          } catch (err) {
            // 静默处理
          }
        }, 80)

        // 淡入动画完成后清除切换状态
        setTimeout(() => {
          this.setData({ isSwitching: false, slideAnimClass: '' })
        }, 240)

        // 兜底 260ms：无论事件是否触发，强制启动遮罩淡出
        setTimeout(() => {
          this.setData({ switchMaskFading: false, switchMaskVisible: false })
        }, 260)
      }, 30)
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
    this.setData({ selectedIndex: index })
  },

  submitAnswer() {
    const { selectedIndex, currentVideo, currentIndex } = this.data

    if (selectedIndex === -1) {
      wx.showToast({ title: '请先选择一个答案', icon: 'none' })
      return
    }

    const isCorrect = Number(selectedIndex) === currentVideo.question.answerIndex

    const history = wx.getStorageSync('studyHistory') || []
    history.unshift({
      videoId: currentVideo.id,
      title: currentVideo.title,
      question: currentVideo.question,
      isCorrect: isCorrect,
      time: new Date().toLocaleString()
    })
    wx.setStorageSync('studyHistory', history)

    const stats = wx.getStorageSync('studyStats') || { total: 0, correct: 0 }
    stats.total += 1
    if (isCorrect) stats.correct += 1
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
