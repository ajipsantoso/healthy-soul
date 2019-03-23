<template>
    <div class="consulOffData">
        <dir class="container">
            <div
            v-for="(arr,idx) in resvArr"
            :key="idx"
            class="box">
                <div class="box-img">
                    <img v-bind:src="resvArr[idx].url" class="pic_img rounded-circle" alt="profpict">
                </div>
                <div class="box-desc">
                    <div>
                        <h5>{{arr.data.nama}}</h5>
                        <span>{{arr.data.waktu}}</span>
                    </div>
                    <div class="alamat">
                        <b>Location:</b>
                        <span> Ruko A1 Lantai 1, Jl. Telekomunikasi,</span>
                        <span>Jl. Terusan Buah Batu No.01, Sukapura,</span>
                        <span>Dayeuhkolot, Bandung, Jawa Barat 40257</span>
                    </div>
                </div>
                <div v-if="arr.data.status === 'wait'" class="box-validation">
                    <span>Status:</span>
                    <span>{{arr.data.status}}</span>
                    <button @click="changeStatus(arr)" class="btn btn-primary">Verify</button>
                </div>
                <div v-else-if="arr.data.status === 'accept'" class="box-validation">
                    <span>Status:</span>
                    <button @click="changeStatus(arr)" class="btn btn-success" disabled>Accept</button>
                </div>
                <div v-else class="box-validation">
                    <span>Status:</span>
                    <button @click="changeStatus(arr)" class="btn btn-danger" disabled>Expire</button>
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
      async changeStatus(arr){
          arr.data.status = "accept";
          await db_real.ref('reservasi/'+arr.key).update({
                        status : 'accept',
                    }).catch((err) => {
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
            s.forEach((childS) => {
                let dataa = childS.val();
                let imgurl;
                // await db_real.ref('users/'+dataa.uid).once('value').then((snap) => {
                //     imgurl = snap.val().picUrl;
                // });
                if (dataa.dokter === auth.currentUser.displayName){
                    arr.push({data: dataa,key: childS.key});
                }
            })
        });
        for (let i = 0; i<arr.length; i++){
            let imgurl
            await db_real.ref('users/'+arr[i].data.uid).once('value').then((snap) => {
                imgurl = snap.val().picUrl;
            });
            arr[i].url = imgurl;
        }
        this.resvArr=arr;
        this.resvArr=this.resvArr.reverse();
        this.checkExpire();
      },
      async checkExpire(){
          let arr = this.resvArr;
          let dateNow = new Date();
          arr.forEach(async (dataArr)=>{
              let dateTrans = new Date(dataArr.data.date)
              if (dataArr.data.status === 'wait'){
                if (dateTrans <= dateNow){
                    dataArr.data.status = 'expire';
                        await db_real.ref('reservasi/'+dataArr.key).update({
                            status : 'expire',
                        }).catch((err) => {
                            // eslint-disable-next-line
                            alert('opps', err.message);
                            return;
                        });
                }
              }
          });
          this.resvArr = arr;
          
      },
      async getUserImg(){
          let arr = this.resvArr;
          arr.forEach(async (dataArr)=>{
              let imgurl
              await db_real.ref('users/'+dataArr.data.uid).once('value').then((snap) => {
                    imgurl = snap.val().picUrl;
                });
              dataArr.url = imgurl;
          });
          this.resvArr = arr;
          this.checkExpire();
      },
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
    justify-content: space-between;
    min-width: 600px;
}
.box-img .pic_img{
    width: 90px;
    height: 90px;
}
.box-desc{

    display: flex;
    flex-direction: column;
}
.box-validation{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
