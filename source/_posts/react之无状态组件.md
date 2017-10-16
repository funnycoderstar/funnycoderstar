---
title: react之无状态组件
date: 2017-10-16 21:45:30
tags:
---
[官方文档部分](https://reactjs.org/docs/context.html#referencing-context-in-stateless-functional-components)
- 1,没有state,即stateless
- 2,没有生命周期
```js
import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ icon, size }) {
    return (
        <i className={`iconfont ${icon}`} style={{ fontSize: size }} />
    );
}
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};
```