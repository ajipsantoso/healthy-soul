<template>
  <div class="login">
      <div class="box">
          <div class="box_title">
                  LOGIN USER
          </div>
          <div class="box_content">
              <div class="form-group">
                  <label for="exampleInputEmail1"></label>
                  <input @keyup.enter="signIn()" v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="username"
                  required>
              </div>
              <div class="form-group">
                  <label  for="exampleInputPassword1"></label>
                  <input @keyup.enter="signIn()" v-model="password"
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
import { auth, db_real } from '../firebase/firebaseInit';

export default {
  data: () => ({
    drawer: null,
    email: '',
    password: '',
  }),
  methods: {
    async makeunvalidate(key){
      console.log('masuk')
      
    },
    async getPayment(){
      let data = '';
      await db_real.ref('reservasi/').orderByChild('uid').equalTo(auth.currentUser.uid).limitToLast(1).once('value').then((s) => {
            s.forEach(async function(childSnapshot) {
            let childData = childSnapshot.val();
            let id=childData.id;
            console.log(childData);
            if (childData.status === 'wait'){
              let checkDate = new Date(childData.date);
              let today =  new Date();
              if (checkDate > today){
                localStorage.setItem('transaksi', JSON.stringify({biaya:childData.biaya, gate: childData.gateway, tanggal: childData.date}));
              }
              else{
                localStorage.setItem('expire', true);
                await db_real.ref('reservasi/'+childSnapshot.key).update({
                    status : 'expire',
                }).catch((err) => {
                    // eslint-disable-next-line
                    alert('opps', err.message);
                    return;
                });
              }
            }else if (childData.status === 'expire'){
              localStorage.setItem('expire', true);
            }
            });
      });
    },
    signIn() {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((snap) => {
          // eslint-disable-next-line
          console.log(snap.user.uid)
          this.getPayment();
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
