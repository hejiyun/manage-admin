import React, { Component } from 'react';
import { Tag } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setTagsData } from '@store/tagsView/actions'
import {MenuList} from '@router'

const { CheckableTag } = Tag;

class HotTags extends Component {
  state = {
    selectedTags: ['/Home'],
    tagsList: [],
    tagsData: [{
      path: '/Home',
      redirect: '/TradingPlatform/orderList',
      name: '主页',
    }]
  };

  // 由于此函数第一次初始化时， 不更新， 所以需要在组件创建完成前去将tagsList信息补全
  componentWillReceiveProps(nextProps) {
    const { tagsList, tagsData} = this.state
    // 拿到当前跳转的页面路径时, 先去菜单集合中, 查找是否有对应的菜单,
    // 没有的话, 就添加一个404的tags标签, 因为路径出错的话, router是已经设置了跳转到404页面的.
    // 有的话, 证明跳转的是现有的路径, 那么就判断当前tag是否已存在, 存在则跳转, 不存在则添加新标签并跳转
    const item = tagsList.filter(item => item.path === nextProps.location.pathname)
    let TargeArr
    if (item) {
      // 判断item 是否在tagsData中
      const hasTags = tagsData.filter(item => item.path === nextProps.location.pathname).length
      TargeArr = hasTags ? tagsData : [...tagsData, ...item]
    } else {
      // 判断tagsData中是否含有notFOund
      const hasTags = tagsData.filter(item => item.path === '/NotFound').length
      TargeArr = hasTags ? tagsData : [...tagsData, {
        path: '/NotFound',
        name: 'NotFound',
      }]
    }
    this.setState({
      tagsData: TargeArr,
      selectedTags: item[0] ? [item[0].path] : ['/NotFound']
    })
  }

  // 判断当前组件是否需要更新
  shouldComponentUpdate(nextProps, nextState) {
    // 只有当标签总数和选中标签同时不变时, 才不需要重新渲染
    console.log(nextState, nextProps)
    if ((nextState.tagsData.length === this.state.tagsData.length) && nextState.selectedTags[0] === this.state.selectedTags[0]) {
      return false
    }
    // 只要不符合不重渲染条件的, 都重新保存一下最终状态的tagsData
    this.props.setTagsData(nextState.tagsData)
    return true
  }
  componentWillMount() {
    // 在创建之前, 获取tags列表, 观察刷新前是否已有tags
    const TargsCurrent = this.props.TagsData.TagsData
    const arr = []
    MenuList.forEach(e => {
      this.getTarget(e, arr)
    })
    const {tagsData, selectedTags} = this.state
    const pathname = this.props.location.pathname
    let item = arr.filter(item => item.path === pathname)
    // 在组件渲染完成前, 先判断, 是否是新增tags, 及存储内是否有tags
    let TargeArr
    if (item.length) {
      // 如果是新增tags,并且存储内有, 则只需判断其中包不包含
      if (TargsCurrent) {
        const res = TargsCurrent.filter(e => e.path === item[0].path).length
        // 如果包含, 则不添加
        if (res) {
          TargeArr = TargsCurrent
        } else {
          // 如果不包含, 则添加
          TargeArr = [...TargsCurrent, ...item]
        }
      } else {
        // 如果存储内没有, 则为当前标签
        TargeArr = item
      }
    } else {
      // 如果都没有, 则为404标签
      if (TargsCurrent) {
        const res = TargsCurrent.filter(e => e.path === '/NotFound').length
        if (res) {
          TargeArr = TargsCurrent
        } else {
          TargeArr = [...TargsCurrent,{
            path: '/NotFound',
            name: 'NotFound',
          }]
        }
      } else {
        TargeArr = [...tagsData, {
          path: '/NotFound',
          name: 'NotFound',
        }]
      }
      item = [ {
        path: '/NotFound',
        name: 'NotFound',
      }]
    }
    this.setState({
      tagsList: arr,
      tagsData: TargeArr,
      selectedTags: item.length ? [item[0].path] : selectedTags
    })
  }
  // 递归获取所有菜单数组
  getTarget(item, arr) {
    // 如果内部还有children,那么反复递归当前函数, arr为存储所有符合条件值的数组
    if (item.children) {
      item.children.forEach(e => {
        this.getTarget(e, arr)
      })
    } else {
      arr.push(item)
    }
  }
  // 关闭tag时触发的函数
  onCloseTag (removeTags) {
    // 1. 被移除的tag是一定会存在于tagsData数组中的
    const {tagsData} = this.state
    const tags = tagsData.filter(tag => tag.path !== removeTags.path)
    // 所以, 可以直接先移除一个
    // 2. 当从数组中删除某一项后, 其后面的一项, 自动继承它的下标
    // 3. 如果后面没有, 那么取前面的一个
    let Tindex
    tagsData.forEach((e, index) => {
      if (e.path === removeTags.path) {
        Tindex = index
      }
    })
    // 复合函数中的异步使用
    this.setState({
      tagsData: tags
    }, () => {
      // 关闭的时候,重新保存一下tags
      this.props.setTagsData(this.state.tagsData)
      if (this.state.tagsData.length === 0) {
        this.props.history.push('/Home')
      } else {
        // 如果tagsData中还有多项的话, 那么判断点击的是否是当前项
        if (removeTags.path === this.state.selectedTags[0]) {
          if (Tindex >= this.state.tagsData.length) {
            this.setState({
              selectedTags: [this.state.tagsData[Tindex -1].path]
            })
            this.props.history.push(this.state.tagsData[Tindex -1].path)
          } else {
            this.setState({
              selectedTags: [this.state.tagsData[Tindex].path]
            })
            this.props.history.push(this.state.tagsData[Tindex].path)
          }
        }
      }
    })

  }

  handleChange(tag, checked) {
    // 改为单个选中的时候， 选择tags
    this.setState({ selectedTags: tag.path });
    // 然后， 把路由跳转到相应的地址上去
  }

  render() {
    const { selectedTags, tagsData } = this.state;
    return (
      <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
        {tagsData.map(tag => (
          <Tag  key={tag.path} closable onClose={() => this.onCloseTag(tag)}>
            <CheckableTag
              key={tag.path}
              checked={selectedTags.indexOf(tag.path) > -1}
              onChange={checked => this.handleChange(tag, checked)}
            >
            <Link to = {tag.path}>
              {tag.name}
              </Link>
            </CheckableTag>
          </Tag>
        ))}
      </div>
    );
  }
}
export default connect (state => (
  { TagsData: state.TagsData }
), {
  setTagsData
})(withRouter(HotTags))
