import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Loadmore from './Loadmore'
import './index.less'

export default class Family extends Component {
  config = {
    navigationBarTitleText: '亲子活动'
  }

  state = {
    isLoading: true,
    currentPage: 1,
    totalPage: 1,
    pageSize: 6,
    activities: []
  }

  render() {
    const { activities, isLoading } = this.state
    return (
      <view className="activities_container">
        <block wx:key="index" wx:for={ activities } wx:for-item="activity">
          <navigator className="wrapper" url={'/pages/preview?url=' + activity.url}>
            <image className="img" lazy-load={ true } src={ activity.thumbnail } mode="widthFix" />
            <text className="title">{ activity.name }</text>
            <text className="brief">{ activity.brief }</text>
            {/* <!-- <text className="price">¥ { activity.price }</text> --> */}
          </navigator>
        </block>
        <view className="loadmore" style={ isLoading ? { display: 'block' } : { display: 'none' } }>
          <Loadmore />
        </view>
      </view>
    )
  }
}
