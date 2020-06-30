import React, { Component } from 'react';
import ContentMain from '@router/contentMain'
import Header from '@components/Header'

// 这里几个页面级组件的结构都一样,改类名就行
class home extends Component {
    render () {
        return (
            <div>
                zheshiyigedanzi
                <Header/>
                <ContentMain/>
                主页, 里面是很多内容
            </div>
        )
    }
}

export default home