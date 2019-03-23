<template>
  <div class="login">
      <div class="box">
          <div class="box_title">
            <span>LOGIN USER</span>
            <span><b>HEALTHY SOUL</b></span>
          </div>
          <div class="box_content">
              <div class="form-group">
                  <input @keyup.enter="signIn()" v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="username"
                  required>
              </div>
              <div class="form-group">
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
                      <router-link to="/register"><span style="margin-left:10px;font-size:15px">REGISTER</span></router-link>
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
    async getPayment(){
      let data = '';
      await db_real.ref('reservasi/').orderByChild('uid').equalTo(auth.currentUser.uid).limitToLast(1).once('value').then((s) => {
            s.forEach(async function(childSnapshot) {
            let childData = childSnapshot.val();
            let id=childData.id;
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
    async signIn() {
      let status=null;
      await auth.signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          // eslint-disable-next-line
          alert(`Opps. ${err.message}`);
          return;
        });
        await db_real.ref('/users/'+auth.currentUser.uid).once('value').then((s) =>{
            status = s.val().status;
        });
        if ( status === 'user'){
          this.getPayment();
          alert(`You are logged in as ${this.email}`);
          this.$router.push('/');
        }else{
          await auth.signOut().then(() => {
              this.$router.push('/login');
              alert('User Not Found');
          });
        }
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
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.box_content{
    width: 75%;
}
.form-control{
    background-color: #c7c7c7;
}
.form-group{
    margin: 20px 0;
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
