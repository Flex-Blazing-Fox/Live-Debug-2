<template>
  <div>
    <div class="back">
        <i @click="toHome" class="fas fa-caret-square-left"></i>
    </div>
    <div class="detail">
      <div class="detail-banner">
        <div class="banner">
          <h1>Give {{ postAuthor }} a Good Advice</h1>
        </div>
      </div>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="hacktiv8">
      <h2>Hackvice</h2>
    </div>
    <div class="detail-container">
      <div class="main-container">
        <div style="margin:2rem 0"></div>
        <div class="card">
          <div class="card-corner">
            <img src="../assets/logo.png" alt="hacktiv8">
          </div>
          <div class="card-avatar">
            <img :src="`https://avatars.dicebear.com/api/avataaars/${post.author}.svg?style=circle`" alt="avatar">
            <p>{{ post.author }}</p>
          </div>
          <div class="card-body-detail">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </div>
        </div>
        <!-- comment -->
        <div class="comment-section">
            <h3>Advice for {{ postAuthor }}</h3>
        </div>
        <div class="comment-form">
            <form @submit.prevent="comment">
                <textarea v-model="text" :placeholder="`advice for ${postAuthor} ...`"></textarea>
                <div class="send-btn">
                    <input v-model="senderName" type="text" placeholder="your name">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
        <div class="comment-list">
            <div v-for="(comment,index) in post.comments" :key="index" class="card-comment">
                <div class="card-comment-img">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${comment.name}.svg?style=circle`" alt="avatar">
                    <p>{{ comment.name }}</p>
                </div>
                <div class="card-comment-desc">
                    <p>{{ comment.text }}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      postAuthor: '',
      post: {},
      text: '',
      senderName: ''
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    comment () {
      const payload = {
        id: this.$route.params.id,
        comments: this.post.comments
      }

      payload.comments.push({
        name: this.senderName,
        text: this.text
      })
      this.$store.dispatch('ADD_COMMENT', payload)
        .then(({ data }) => {
          this.senderName = ''
          this.text = ''
        })
        .catch(err => {
          console.log(err, 'errorr')
          console.log(err.response, 'errrrrrrrrrr')
        })
    }
  },
  created () {
    this.postAuthor = this.$route.params.author
    this.$store.dispatch('FETCH_DETAIL', this.$route.params.id)
      .then(({ data }) => {
        this.post = data
      })
      .catch(err => {
        console.log(err, 'errror')
      })
  }
}
</script>

<style>

</style>
