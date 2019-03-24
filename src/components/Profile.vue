<template>
    <div class="profile">
        <div class="box">
            <div class="box-title">
                <div class="box-img">
                    <img v-bind:src="user.picUrl" class="pic_img rounded-circle" alt="profpict">
                </div>
                <div class="box-desc">
                    <div>
                        <h5>{{user.nama}}</h5>
                        <span>{{`${user.tmpt}, ${user.tgl}`}}</span>
                    </div>
                </div>
            </div>
            <div class="box-desc">
                <div class="box-data">
                    <div class="title">Email</div>
                    <div>: {{user.email}}</div>
                </div>
                <div class="box-data">
                    <div class="title">No Hp</div>
                    <div>: {{user.hp}}</div>
                </div>
                <div class="box-data">
                    <div class="title">Pendidikan</div>
                    <div>: {{user.pddk}}</div>
                </div>
                <div class="box-data">
                    <div class="title">Wali</div>
                    <div>: {{user.wali}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import { auth, dbReal } from '@/firebase/firebaseInit';

export default {
  name: 'profile',
  data: () => ({
    user: '',
  }),
  methods: {
    async getUserData() {
      let userData;
      await dbReal.ref(`users/${auth.currentUser.uid}`).once('value').then((snap) => {
        userData = snap.val();
      })
        .catch((err) => {
          // eslint-disable-next-line
          alert(`opps ${err.message}`);
          return null;
        });
      this.user = userData;
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style scoped>
body,html{height:100%; width: 100%;}
.alamat{
    margin: 5px 0 0;
    display: flex;
    flex-direction: column;
}
.box{
    color: #1a1a1a;
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 600px;
}
.box-img .pic_img{
    width: 90px;
    height: 90px;
}
.box-title{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.box-desc{
    display: flex;
    flex-direction: column;
}
.box-data{
    display: flex;
    flex-direction: row;
}
div.title{
    min-width: 100px;
}
</style>
