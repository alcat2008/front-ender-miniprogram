import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this._timer = setInterval(
      () => this.setState({
        date: new Date()
      }),
      1000
    )
  }

  componentWillUnmount () {
    this._timer && clearInterval(this._timer)
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Text>当前时间： {this.state.date}</Text>
      </View>
    )
  }
}

