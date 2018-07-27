
import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
// import Index from './pages/index'
import Family from './pages/family'
import './app.less'

class App extends Component {
  config = {
    pages: [
      'pages/family/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Family />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
