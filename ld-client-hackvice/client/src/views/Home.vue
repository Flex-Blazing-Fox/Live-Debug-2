<template>
  <div>
    <div class="home">
      <div class="home-banner">
        <div class="banner">
          <h1>What can we help you with ?</h1>
          <form>
            <input v-model="title" type="text" placeholder="Search Help">
            <div class="search-btn">
              <i class="fas fa-search"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="hacktiv8">
      <h2>Hackvice</h2>
    </div>
    <div class="home-container">
      <div class="main-container">
        <div style="margin:2rem 0"></div>
        <div class="card" v-for="post in filteredPost" :key="post.id">
          <div class="card-corner">
            <img src="../assets/logo.png" alt="hacktiv8">
          </div>
          <div class="card-avatar">
            <img :src="`https://avatars.dicebear.com/api/avataaars/${post.author}.svg?style=circle`" alt="avatar">
            <p>{{ post.author }}</p>
          </div>
          <div class="card-body">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
            <div class="detail-btn-container">
              <p @click.prevent="toDetail(post)" class="detail-btn">View Detail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      title: ''
    }
  },
  components: {

  },
  computed: {
    ...mapState(['posts']),
    filteredPost () {
      return this.posts.filter(filterPost => filterPost.title.toLowerCase().includes(this.title))
    }
  },
  methods: {
    toDetail (data) {
      this.$router.push(`/detail/${data.id}/${data.author}`)
    }
  },
  created () {
    this.$store.dispatch('FETCH_POSTS')
  }
}
</script>
