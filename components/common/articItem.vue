<template functional>
  <div class="artic-item">
    <div class="artic-info">
      <ul class="artic-meta">
        <li class="meta-item post" v-if="props.item.type === 'post'">专栏</li>
        <li class="meta-item">{{ props.item.user.username }}</li>
        <li class="meta-item">{{ props.item.createdAt | formatTime }}</li>
        <li class="meta-item">
          <span v-for="(tag) in props.item.tags" :key="tag.id" class="label">{{ tag.title }}</span>
        </li>
      </ul>
      <nuxt-link class="artic-title" :to="{path: '/detail/'+props.item.originalUrl.split('/').pop()}" v-html="props.item.title"></nuxt-link>
      <p v-if="props.hasDesc" class="artic-desc" v-html="props.item.description || props.item.text"></p>
      <ul class="artic-action">
        <li class="action-item">
          <img class="icon" src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg">
          {{ props.item.likeCount }}
        </li>
        <li class="action-item">
          <img class="icon" src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg">
          {{ props.item.commentsCount }}
        </li>
      </ul>
    </div>
    <div v-if="props.item.screenshot" class="artic-cover" :style="'background-image: url('+props.item.screenshot+')'"></div>
  </div>
</template>

<style lang="scss" scoped>
.artic-item {
  display: flex;
  align-items: center;
  padding: 20px 25px;
}

.artic-info {
  flex: 1 1 auto;
}

.artic-cover {
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  margin-left: 30px;
  background-color: #f4f4f4;
  background-size: cover;
  border-radius: 2px;
}

.artic-meta {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b2bac2;

  .meta-item {
    &::after {
      content: "·";
      margin: 0 5px;
      color: #b2bac2;
    }

    &:last-child::after {
      content: "";
    }
  }

  .post {
    color: #b71ed7;
  }

  .label {
    &::after {
      content: " / ";
    }

    &:last-child::after {
      content: "";
    }
  }
}

.artic-title {
  display: block;
  margin: 10px 0 16px;
  line-height: 1.2;
  font-size: 16px;
  font-weight: 700;
  color: inherit;
  text-decoration: none;

  &:hover{
    text-decoration: underline;
  }

  /deep/ em{
    color: #e8001c;
  }
}

.artic-desc {
  width: 800px;
  margin-bottom: 14px;
  font-size: 14px;
  color: #909090;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  /deep/ em{
    color: #e8001c;
  }
}

.artic-action {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  color: #b2bac2;

  .action-item {
    display: flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border: 1px solid #edeeef;

    .icon{
      margin-right: 3px;
    }

    &:last-child {
      border-left: 0;
    }
  }
}
</style>