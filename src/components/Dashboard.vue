<template>
  <div class="dashboard">
    <div class="container">
            <div class="row">
                    <div class="card-deck">
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_1.png" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">Consultation</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore facilis illo nulla temporibus
                                    impedit? Eaque asperiores quia veniam.</p>
                                <button @click="goConsul"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_2.png" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">Find Your Career</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore facilis illo nulla temporibus
                                    impedit? Eaque asperiores quia veniam.</p>
                                <button @click="goCareer"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_3.png" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">Find Your College Majors</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore facilis illo nulla temporibus
                                    impedit? Eaque asperiores quia veniam.</p>
                                <button @click="goCollege"
                                class="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                            <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top align-self-center"
                                src="@/assets/Mask_Group_4.png" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">Payment</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore facilis illo nulla temporibus
                                    impedit? Eaque asperiores quia veniam.</p>
                                <button
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

export default {
  name: 'dashboard',
  components: {
  },
  created() {
    if (this.$router.currentRoute.name === 'dashboard') {
      this.goDashboard();
    } else if (this.$router.currentRoute.name === 'consultation') {
      this.goConsul();
    } else if (this.$router.currentRoute.name === 'career') {
      this.goCareer();
    } else if (this.$router.currentRoute.name === 'career') {
      this.goCollege();
    }
  },
  methods: {
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
</style>
