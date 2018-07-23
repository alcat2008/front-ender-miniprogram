Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    // 是否有遮罩层
    overlay: {
      type: Boolean,
      value: true
    },
    // 遮罩层是否会显示
    showOverlay: {
      type: Boolean,
      value: true
    },
    // 遮罩层点击时，是否触发关闭事件
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    // 内容从哪个方向出，可选 center top bottom left right
    type: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    _handleOverlayClick: function _handleOverlayClick() {
      this.triggerEvent('click-overlay', {});

      if (!this.data.closeOnClickOverlay) {
        return;
      }
      this.triggerEvent('close', {});
    }
  }
});