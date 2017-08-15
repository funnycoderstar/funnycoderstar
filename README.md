> funnycoderstar的个人主页
```bash
#### hexo命令
hexo generate 一条命令生成静态站点
hexo g #生成
hexo g --watch 显示你修改的文件并且重新生成
hexo d #部署 # 可与hexo g合并为 hexo d -g
#### 部署到github上
hexo clean   (必须要，不然有时因为缓存问题，服务器更新不了主题)
hexo g -d or hexo d -g 生成后马上部署站点
#### 用hexo发表新文章
hexo n "文章标题"

#### 草稿
hexo new draft "new draft"   (会在source/_drafts目录下生成一个new-draft.md文件。但是这个文件不被显示在页面上，链接也访问不到。也就是说如果你想把某一篇文章移除显示，又不舍得删除，可以把它移动到_drafts目录之中。)

如果你希望强行预览草稿，更改配置文件：
render_drafts: true
或者，如下方式启动server：
hexo server --drafts

下面这条命令可以把草稿变成文章，或者页面：
hexo publish [layout] <filename>
```
