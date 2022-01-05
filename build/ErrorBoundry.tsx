import React from 'react';

export class ErrorBoundry extends React.Component {
  state = {
    error: null,
    hasError: false
  };

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log('xx', error, info)
    this.setState({ error })
  }

  render() {
    if (this.state.hasError) {
      return <p>Something broke</p>;
    }
    return this.props.children;
  }
}

export class Child extends React.Component {
  render () {
    // throw new Error('我发生了错误') //报错信息

    // 无法捕获异步错误
    setTimeout(() => {
      throw new Error('我发生了错误')
    }, 1000)
    return <h1>111</h1>
  }
}