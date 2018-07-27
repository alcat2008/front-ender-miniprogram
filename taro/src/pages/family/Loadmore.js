import Taro, { Component } from '@tarojs/taro'
// import { View, Text } from '@tarojs/components'
import './Loadmore.less'

export default class Loadmore extends Component {
  static defaultProps = {
    innerText: '正在加载'
  }

  render() {
    return (
      <view class="dx_loadmore dx_loadmore_line">
        <view class="dx_loadmore__tips dx_loadmore__tips_in-line">
          <view class="dx_loading"></view>
          { this.props.innerText }
        </view>
      </view>
    )
  }
}
