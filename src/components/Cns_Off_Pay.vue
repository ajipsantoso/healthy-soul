<template>
    <div class="consul_pay">
        <div v-if="!expire">
            <div class="box" v-if="choose">
                <div class="box_title">
                    <span class="title">Total Payment</span>
                    <span class="title biaya">Rp {{biaya}}</span>
                </div>
                <div class="box_content">
                    <div class="form-group">
                        <div class="container">
                            <div class="box_data">
                                <label class="form-check-label time" for="gate1">
                                        <div class="label-desc">
                                            <h5>Alfamart</h5>
                                        </div>
                                        <input @change="paynow"
                                        class="form-check-input" v-model="gate_pay"
                                        type="radio" name="gridGate" id="gate1"
                                        value="Alfamart">
                                </label>
                            </div>
                            <div class="box_data">
                                <label class="form-check-label time" for="gate2">
                                        <div class="label-desc">
                                            <h5>Indomaret</h5>
                                        </div>
                                        <input @change="paynow"
                                        class="form-check-input" v-model="gate_pay"
                                        type="radio" name="gridGate" id="gate2"
                                        value="Indomaret">
                                </label>
                            </div>
                            <div class="box_data">
                                <label class="form-check-label time" for="gate3">
                                        <div class="label-desc">
                                            <h5>Mandiri</h5>
                                        </div>
                                        <input @change="paynow"
                                        class="form-check-input" v-model="gate_pay"
                                        type="radio" name="gridGate" id="gate3"
                                        value="Mandiri">
                                </label>
                            </div>
                            <div class="box_data">
                                <label class="form-check-label time" for="gate4">
                                        <div class="label-desc">
                                            <h5>BCA</h5>
                                        </div>
                                        <input @change="paynow"
                                        class="form-check-input"
                                        v-model="gate_pay"
                                        type="radio" name="gridGate" id="gate4"
                                        value="BCA">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box" v-else>
                <div class="box_title">
                    <span class="title">PAYMENT</span>
                    <span class="title">Pay exactly according to the following amount</span>
                    <span class="title biaya">Rp {{biaya}}</span>
                </div>
                <div class="box_content">
                    <div class="box_notif">
                        <div class="notif_icon">
                            <font-awesome-icon icon="exclamation-circle" size="2x"/>
                        </div>
                        <div class="notif_desc">
                            <span>IMPORTANT! Please transfer up to 3 last digits</span>
                            <span>so that your payment can be prosess</span>
                        </div>
                    </div>
                    <div class="box_content">
                        <span v-if="gate_pay=='Indomaret'
                        || gate_pay=='Alfamart'">Payment code :</span>
                        <span v-else>Please transfer to a/n <b>PT. Healthy Soul</b> :</span>
                        <h4 class="rekening">111 222 333 44455</h4>
                    </div>
                    <div class="box_footer">
                        <span>Pay before <b>{{`${tanggal} WIB`}}</b></span>
                        <span>or your order is automatically cancelled by the system</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box" v-else>
            <div class="box_title">
                <span v-if="noTransaction" class="title">No Transaction Found</span>
                <span v-else class="title">Transaction Expire</span>
            </div>
            <div class="box_content">
                <span v-if="noTransaction">There's no transaction found</span>
                <span v-else>Your last transaction was expire</span>
                <button @click="goConsul"
                class="btn btn-primary">New Transaction
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { auth, dbReal } from '../firebase/firebaseInit';

export default {
  name: 'consul-off-pay',
  props: ['consul'],
  components: {
  },
  data: () => ({
    biaya: '',
    gate_pay: '',
    choose: true,
    tanggal: '',
    expire: false,
    noTransaction: false,
  }),
  methods: {
    goConsul() {
      this.$router.push({ path: '/consul-off' });
    },
    setTanggal() {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const result = new Date();
      result.setDate(result.getDate() + 2);
      const hasil = `${result.getDate()} ${monthNames[result.getMonth()]} ${result.getFullYear()} ${result.getHours()}:${result.getMinutes()}`;
      return hasil;
    },
    async paynow() {
      this.choose = false;
      let count = null;
      await dbReal.ref(`/users/${auth.currentUser.uid}`).once('value').then((s) => {
        count = s.val().reservasi;
      });
      await dbReal.ref('reservasi/').push().set({
        uid: auth.currentUser.uid,
        dokter: this.consul.doctor,
        waktu: this.consul.time,
        biaya: this.biaya,
        nama: auth.currentUser.displayName,
        date: this.tanggal,
        timespan: new Date().getTime(),
        gateway: this.gate_pay,
        status: 'wait',
      }).catch((err) => {
        // eslint-disable-next-line
        alert('opps', err.message);
        return null;
      });
      await dbReal.ref(`users/${auth.currentUser.uid}`).update({
        reservasi: count + 1,
      }).catch((err) => {
        // eslint-disable-next-line
        alert('opps', err.message);
        return null;
      });
    },
    async expireT() {
      await dbReal.ref('reservasi/').orderByChild('uid').equalTo(auth.currentUser.uid).limitToLast(1)
        .once('value')
        .then((s) => {
          s.forEach(async (childSnapshot) => {
            await dbReal.ref(`reservasi/${childSnapshot.key}`).update({
              status: 'expire',
            }).catch((err) => {
              // eslint-disable-next-line
              alert('opps', err.message);
              return null;
            });
          });
        });
    },
    async checkStatus() {
      let dataTrans;
      await dbReal.ref('reservasi/').orderByChild('uid').equalTo(auth.currentUser.uid).limitToLast(1)
        .once('value')
        .then((s) => {
          s.forEach(async (childSnapshot) => {
            const child = childSnapshot.val();
            if (child.status === 'wait') {
              dataTrans = child;
            } else if (child.status === 'accept') {
              dataTrans = 'accept';
            } else {
              dataTrans = 'expire';
            }
          });
        });
      if (dataTrans === 'expire') {
        this.choose = false;
        this.expire = true;
      } else if (dataTrans === 'accept') {
        this.choose = false;
        this.expire = true;
        this.noTransaction = true;
      } else {
        this.choose = false;
        this.biaya = dataTrans.biaya;
        this.gate_pay = dataTrans.gate;
        this.tanggal = dataTrans.tanggal;
      }
    },
  },
  created() {
    // if (localStorage.transaksi){
    //     let data = JSON.parse(localStorage.getItem('transaksi'));
    //     let dateNow = new Date();
    //     let date = new Date(data.tanggal);
    //     if (date < dateNow) {
    //         this.choose=false;
    //         this.expire=true;
    //         localStorage.clear();
    //         localStorage.setItem('expire', true);
    //     }else{
    //         this.choose = false;
    //         this.biaya = data.biaya;
    //         this.gate_pay = data.gate;
    //         this.tanggal = data.tanggal;
    //     }
    // }else{
    if (this.consul) {
      this.tanggal = this.setTanggal();
      const satuan = Math.floor(Math.random() * 10);
      const puluh = Math.floor(Math.random() * 10) * 10;
      const ratus = Math.floor(Math.random() * 10) * 100;
      this.biaya = (500000 + ratus + puluh + satuan).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } else {
      this.checkStatus();
    }
    // }
  },
};
</script>

<style scoped>
html,body{
    height: 100%;
    width: 100%;
}

input{
    margin-top:0;
    display: inline-flex;
}
.form-check-input{
    position: relative;
}
.form-check-label{
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.consul{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box{
    color: #1a1a1a;
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction:column;
}
.box_data{
    min-width: 400px;
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
}
span.title{
    font-size: 30px;
}
.title.biaya{
    font-weight: bold;
}
.box_title, .box_content{
    text-align: center;
    display: flex;
    flex-direction:column;
}
.box_content{
    margin-top: 30px;
}
.box_footer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
}
.box_notif{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction:row;
    padding: 30px 0 30px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
.notif_icon{
    padding: 0 25px;
}
.notif_desc{
    display: flex;
    flex-direction:column;
    align-items: flex-start;
}
.rekening{
    margin: 25px 0;
}
</style>
