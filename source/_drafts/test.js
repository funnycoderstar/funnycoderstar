import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    componentWillReceiveProps(nextProps) {
        // this.setState({})
        // 
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        // return true
        // shouldComponentUpdate是一个特别的方法,他接受需要更新的props和state,让开发者增加必要的条件判断,让其在需要时更新.因此,当方法返回false的时候,组件不再向下执行生命周期方法
        // 本质是用来进行正确的组件渲染(也是性能优化的手段之一):
        // 当父节点props改变的时候,在理想情况下,只渲染在一条链路省有相关props改变的节点即可,但是默认情况下,React会渲染所有的节点,因为shouldComponentUpdate默认返回true
        // 值得注意的是,无状态组件是没有生命周期方法的,这也意味着它没有shouldComponentUpdate,渲染到该类组件时,每次都会重新渲染,不少开发者在使用无状态组件开发的时候都会纠结这一点,为了更方心得使用,我们可以选择用Recompose库的pure方法;
        const optionmizeComponent = pure(ExpensiveComponent)
        // pure方法做的事情就是将无状态组件转换成class语法加上PureRender后的组件
    }
    componentWillUpdate(nextProps, nextState) {
        // 需要提供更新的props和state
        // 这里不能执行setState
    }
    componentDidUpdate(prevProps, prevState) {
        // 提供更新前的props和state
    }
    // 1,如果组件自身的state更新了,那么会依次执行shouldComponentUpdate,componentWillUpdate,render, componentDidUpdate.
    // 如果组件是由父组件更新props而更新的,那么在shouldComponentUpdate之前会先执行componentWillReceiveProps方法,此方法可以作为React在props传入后,渲染之前setState的机会,在此方法中调用setState是不会二次渲染的
    render() {
        return (
            <div>
               
                
            </div>
        );
    }
}

export default App;