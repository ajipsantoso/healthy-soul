<template>
  <div class="home">
    <Navbar/>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  methods: {
  },
};
</script>

<style scoped>
body,html{height:100%; width: 100%;}
.home{
    height:100%;
}
.content{
  height:100%;
  text-align: center;
  margin: 0 auto;
  padding-top:80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card .card-img-top{
    margin-top: 10px;
    width: 50%;
}
.card .card-title{
    height: 50px;
}
router-view{
  margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
