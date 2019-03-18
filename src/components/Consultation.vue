<template>
  <div class="consul">
    <div class="container">
            <div class="row">
                    <div class="card-deck">
                            <div @click="goConsulChat('off')"
                            class="card bg-light text-white ">
                                    <img class="img-fluid card-img"
                                    src="@/assets/consul_1.png" alt="Card image">
                                    <div class="card-img-overlay">
                                        <h3 class="card-title">Register Consultation</h3>
                                    </div>
                            </div>
                            <div @click="goConsulChat('on')"
                            class="card bg-light text-white">
                                    <img class="img-fluid card-img"
                                    src="@/assets/consul_2.png" alt="Card image">
                                    <div class="card-img-overlay">
                                      <h3 class="card-title">Check The Diagnosis</h3>
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
  name: 'consul',
  components: {
  },
  methods: {
    goConsulChat(type) {
      if (type === 'on') {
        this.$router.push({ path: '/consulchat' });
      } else {
        this.$router.push({ path: '/consul-off' });
      }
    },
  },
};
</script>

<style scoped>
body,html{height:100%; width: 100%;}
.home{
    height:100%;
}
.card{
  border:unset;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
}
.card-img-overlay{
    background-image: linear-gradient( rgba(11, 177, 253, 0.6), rgba(11, 177, 253, 0.6) );
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
