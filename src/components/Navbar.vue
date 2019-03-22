<template>
<div class="navbarr">
  <nav class="navbar navbar-expand-md navbar-dark navibar" :class="dynamicNav">
    <router-link to="/" class="navbar-brand">
      <div class="logo">
        <div class="logo_l">
        </div>
        <div class="logo_r">
          <div class="logo_txt">
            Healty Soul
          </div>
        </div>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" @click="navcolaps_js()"
    data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent" >
      <div class="mr-auto"> </div>
      <ul class="navbar-nav">
        <li class="nav-item">
            <div class="user">
                <img v-bind:src="authUser.photoURL" alt="profpict" class="rounded-circle" style="width: 50px; height: 50px;">
                <span>{{authUser.email}}</span>
            </div>
        </li>
        <li class="nav-item">
          <button @click="logout()" type="button" class="btn btn-light">LOGOUT</button>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>

import { auth, db } from '@/firebase/firebaseInit';

export default {
  data: () => ({
    dynamicNav: {
      shrink: false,
      navcolaps: false,
    },
    authUser: null,
  }),
  methods: {
    navset() {
      this.dynamicNav.shrink = window.scrollY > 20;
    },
    navcolaps_js() {
      this.dynamicNav.navcolaps = !this.dynamicNav.navcolaps;
    },
    logout() {
      localStorage.clear();
      auth.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    getEmail() {
      this.authUser = auth.currentUser;
    },
  },
  created() {
    this.getEmail();
    window.addEventListener('scroll', this.navset);
  },
  destroyed() {
    window.removeEventListener('scroll', this.navset);
  },
};
</script>

<style scoped>
.navibar.navcolaps{
  background-color: rgb(11, 177, 253);
}
.nav-item .nav-link{
  color: #ffff;
}
ul li{
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul li span{
  margin-left: 10px;
}
/* a{
  color: #fff;
} */

.navibar {
  min-height: 50px;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 99999;
  transition: all ease .5s;
  background-color: rgb(11, 177, 253);
}
.logo {
  font-size: 26px;
  margin-left: 10px;
  width: 300px;
  height: 60px;
  position: relative;
  transition: all ease .5s;
}

.logo_l{
  height: 100%;
  width: 20%;
  float: left;
  position: relative;
}
.logo_r{
  height: 100%;
  width: 80%;
  float: right;
  position: relative;
}
.logo_l img{
  width: auto;
  margin: auto;
  height: 70%;
  top: 0;
  right:10%;
  bottom: 0;
  left: unset;
  position: absolute;
}

.logo_txt{
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
}
.navibar.shrink .logo_l img {
  height: 70%;
  margin: auto;
  top: 0;
  right:10%;
  bottom: 0;
  left: unset;
  position: absolute;
}
.navibar.shrink {
  background-color: rgb(11, 177, 253);
  min-height: 20px;
  transition: all ease .5s;
}
.navibar.shrink .logo {
  font-size: 18px;
  height: 20px;
  transition: all ease .5s;
}
.navibar.shrink .logo_l{
  width: 20%
}
.navibar.shrink .logo_r{
  width: 80%
}

@media (max-width: 575.98px) {
  .navibar {
    min-height: 60px;
  }
  .logo {
    font-size: 20px;
    margin-left: unset;
    width: 200px;
    height: 40px;
    position: relative;
    transition: all ease .5s;
  }
  ul {
    margin-left: 20px;
  }
}
@media (min-width: 576px) and (max-width: 823.98px) {
  .logo {
    font-size: 20px;
    margin-left: unset;
    width: 300px;
    height: 40px;
    position: relative;
    transition: all ease .5s;
  }
  ul {
    margin-left: 20px;
  }
}
/* @media (max-width: 350px) {
  .logo_r .logo_txt {
    display: none;
  }
} */
</style>
