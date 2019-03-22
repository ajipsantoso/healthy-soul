<template>
  <div class="dashboard">
    <div class="container" v-if="on_user">
            <div class="row">
                    <div class="card-deck">
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_1.png" alt="Card image cap">
                                <div class="card-body">
                                <h4 class="card-title">Consultation</h4>
                                <p class="card-text">Consult your anxiety with the best experts here.</p>
                                <button @click="goConsul"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_2.png" alt="Card image cap">
                                <div class="card-body">
                                <h4 class="card-title">Find Your Career</h4>
                                <p class="card-text">Need to find your career path? 
                                  Try this for free now.</p>
                                <button @click="goCareer"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_3.png" alt="Card image cap">
                                <div class="card-body">
                                <h4 class="card-title">Find Your College Majors</h4>
                                <p class="card-text">After graduated from high school where are you going? 
                                  Find it here.
                                </p>
                                <button @click="goCollege"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_4.png" alt="Card image cap">
                                <div class="card-body">
                                <h4 class="card-title">Payment</h4>
                                <p class="card-text">Check your status payment here.</p>
                                <button @click="goPayment"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                    </div>
            </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db_real } from '../firebase/firebaseInit.js'
export default {
  name: 'dashboard',
  data: () =>({
    on_user: false,
  }),
  components: {
  },
  async created() {
    let status=null;
    await db_real.ref('/users/'+auth.currentUser.uid).once('value').then((s) =>{
        status = s.val().status;
    })
    if ( status === 'admin'){
      this.goAdmin();
    }
    else{
      this.on_user=true;
      if (this.$router.currentRoute.name === 'dashboard') {
        this.goDashboard();
      } else if (this.$router.currentRoute.name === 'consultation') {
        this.goConsul();
      } else if (this.$router.currentRoute.name === 'career') {
        this.goCareer();
      } else if (this.$router.currentRoute.name === 'career') {
        this.goCollege();
      }
    }
  },
  methods: {
    goAdmin() {
      this.$router.push({ path: 'dashboard-admn' });
    },
    goConsul() {
      this.$router.push({ path: '/consul' });
    },
    goCareer() {
      this.$router.push({ path: '/career' });
    },
    goCollege() {
      this.$router.push({ path: '/college' });
    },
    goDashboard() {
      this.$router.push({ path: '/dashboard' });
    },
    goConsulChat() {
      this.$router.push({ path: '/consulchat' });
    },
    goPayment() {
      this.$router.push({ name: 'consul-off-bayar' });
    },
  },
};
</script>

<style scoped>
body,html{height:100%; width: 100%;}
.home{
    height:100%;
}
.dashboard{
  height:100%;
  text-align: center;
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card .card-img-top{
    margin-top: 10px;
    width: 50%;
}
.card .card-title{
  min-height: 70px;
}
.card p{
  text-align: left;
  min-height: 100px;
}
.card-body{
  padding: 10px 15px;
}
</style>
