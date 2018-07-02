Component({
  properties: {
    // 定义 innerText 属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: '正在加载',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})