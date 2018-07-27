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

  async componentWillMount() {
    await this._fetch()
  }

  async _fetch () {
    Taro.showNavigationBarLoading()
    const { currentPage, pageSize, activities } = this.state

    try {
      const res = await Taro.request({
        url: 'https://front-ender.cn/api/family/activities',
        method: 'POST',
        data: {
          currentPage,
          pageSize
        }
      })
      const { statusCode, data } = res
      if (statusCode === 200 && data.code === 0) {
        this.setState({
          isLoading: false,
          currentPage: data.data.page.currentPage,
          totalPage: data.data.page.totalPage,
          activities: (currentPage === 1 ? data.data.data : activities.concat(data.data.data))
            .map(a => Object.assign({}, a, { url: encodeURIComponent(a.url) }))
        })
      }
    } finally {
      Taro.hideNavigationBarLoading()
      Taro.stopPullDownRefresh()
    }
  }

  onPullDownRefresh () {
    console.log('** onPullDownRefresh **')

    this.setState({
      currentPage: 1,
    }, () => {
      this._fetch()
    })
  }
  onReachBottom () {
    console.log('** onReachBottom **')
    const { currentPage, totalPage } = this.state
    if (currentPage < totalPage) {
      this.setState({
        isLoading: true,
        currentPage: currentPage + 1
      }, () => {
        this._fetch()
      })
    }
  }

  render() {
    const { activities, isLoading } = this.state
    return (
      <View className="activities_container">
        {
          activities.map(activity => (
            <navigator key={activity.url} id={activity.url} className="wrapper" url={'/pages/preview?url=' + activity.url}>
              <image className="img" lazy-load={ true } src={ activity.thumbnail } mode="widthFix" />
              <Text className="title">{ activity.name }</Text>
              <Text className="brief">{ activity.brief }</Text>
              {/* <!-- <text className="price">¥ { activity.price }</text> --> */}
            </navigator>
          ))
        }
        <View className="loadmore" style={ isLoading ? { display: 'block' } : { display: 'none' } }>
          <Loadmore />
        </View>
      </View>
    )
  }
}
