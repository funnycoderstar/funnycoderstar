---
title: 2017-06-23-vue中scroll的用法
date: 2017-06-23 13:36:13
tags: vue
categories: vue
type: "tags"
description: [vue中scroll的用法]
---
```js
data () {
  return {
    scrolled: false
  };
},
methods: {
  handleScroll () {
    this.scrolled = window.scrollY > 0;
  }
},
created () {
  window.addEventListener('scroll', this.handleScroll);
},
destroyed () {
  window.removeEventListener('scroll', this.handleScroll);
}

```
