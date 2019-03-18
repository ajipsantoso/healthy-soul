<template>
  <div class="login">
      <div class="box">
          <div class="box_title">
                  LOGIN USER
          </div>
          <div class="box_content">
              <div class="form-group">
                  <label for="exampleInputEmail1"></label>
                  <input v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="username"
                  required>
              </div>
              <div class="form-group">
                  <label  for="exampleInputPassword1"></label>
                  <input v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="password"
                  required>
              </div>
              <div class="form-submit">
                  <div class="submit-left">
                      <button @click="signIn()" type="submit" class="btn btn-primary">
                        Login
                      </button>
                      <router-link to="/register"><span>REGISTER</span></router-link>
                  </div>
                  <div class="submit-right">
                      <a class="forgot" href="#"><span>Forget password?</span></a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { auth } from '../firebase/firebaseInit';

export default {
  data: () => ({
    drawer: null,
    email: '',
    password: '',
  }),
  methods: {
    signIn() {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // eslint-disable-next-line
          alert(`You are logged in as ${this.email}`);
          this.$router.push('/');
        })
        .catch((err) => {
          // eslint-disable-next-line
          alert('opps', err.message);
        });
    },
  },
  props: {
    source: String,
  },
};
</script>

<style scoped>
html,body{
  height: 100%;
  width: 100%;
}
.login{
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(11, 177, 253);
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
}
.box_title{
    margin-bottom: 18px;
    font-size: 24px;
}
.box_content{
    width: 75%;
}
.form-control{
    background-color: #c7c7c7;
}
.form-submit{
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
}
.box{
    color: #1a1a1a;
    width: 30%;
    height: 45%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
}
a{
    color: #1a1a1a;
}

a.forgot{
    text-decoration: underline;
    align-items: baseline;
    bottom:0;
}

.submit-right{
    height: 30px;
}
</style>
