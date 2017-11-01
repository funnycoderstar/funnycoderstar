---
title: calendar
tags: vue
---
用js原生实现了一个日历的组件
<!--more-->

```js
function isYesterday(time1, time2) {
    const yesterday = new Date(time1);
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        yesterday.getFullYear() === time2.getFullYear() &&
        yesterday.getMonth() === time2.getMonth() &&
        yesterday.getDate() === time2.getDate()
    );
}
renderDate(value) {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if (value.toLocaleDateString() === today.toLocaleDateString()) {
            return format('hh:mm', value);
        } else if (value.toLocaleDateString() === yesterday.toLocaleDateString()) {
            return `昨天${format('hh:mm', value)}`;
        }
        return format('yyyy-MM-dd', value);
    },

```
[1,判断一个时间是今天,昨天,还是..](https://stackoverflow.com/questions/32199998/check-if-date-is-today-was-yesterday-or-was-in-the-last-7-days)
[2,判断一个时间是今天,昨天,还是..](https://stackoverflow.com/questions/29852408/check-if-a-date-is-tomorrow-or-the-day-after-tomorrow)