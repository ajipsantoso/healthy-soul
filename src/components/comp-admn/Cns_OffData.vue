<template>
    <div class="consulOffData">
        <dir class="container">
            <!-- <button @click="test">awdwad</button> -->
            <div
            v-for="(arr,idx) in resvArr"
            :key="idx"
            class="box">
                <div class="box-img">
                    <img class="pic_img" src="@/assets/Mask_Group_1.png" alt="">
                </div>
                <div class="box-desc">
                    <div>
                        <h5>{{arr.nama}}</h5>
                        <span>{{arr.waktu}}</span>
                    </div>
                    <div class="alamat">
                        <b>Location:</b>
                        <span> Ruko A1 Lantai 1, Jl. Telekomunikasi,</span>
                        <span>Jl. Terusan Buah Batu No.01, Sukapura,</span>
                        <span>Dayeuhkolot, Bandung, Jawa Barat 40257</span>
                    </div>
                </div>                       
            </div>
        </dir>
    </div>
</template>

<script>
// @ is an alias to /src
import {auth, db_real} from '@/firebase/firebaseInit'
export default {
  name: 'consulOffData',
  data:()=>({
      resvArr:[],
  }),
  methods: {
      test(){
        let user = auth.currentUser;
        user.updateProfile({
                displayName: 'John Doe',
                })
            .catch((err) => {
                // eslint-disable-next-line
                alert('opps', err.message);
                return;
            });
      },
      async getData(){
        let arr=[];
        let user = auth.currentUser.displayName;
        await db_real.ref('reservasi/').once('value').then((s) => {
            //console.log(s.val())
            s.forEach(function(childS) {
                console.log(auth.currentUser.displayName)
                let data = childS.val();
                if (data.dokter === auth.currentUser.displayName){
                    arr.push(data);
                }
            })
        });
        console.log(arr);
        this.resvArr=arr;
        console.log(this.resvArr)
      }
  },
  created(){
      this.getData();
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
    flex-direction: row;
    align-items: center;
    min-width: 600px;
}
.box-img .pic_img{
    width: 90px;
}
.box-desc{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}
</style>
