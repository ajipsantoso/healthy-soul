<template>
  <div class="register">
      <div class="box">
          <div class="box_title">
            REGISTER USER
          </div>
          <div class="box_content">
              <form class="needs-validation" novalidate @submit="nextpage">
                <div v-if="page == false">
                    <div class="form-group">
                        <label for="inp-username">Username<sup>*</sup></label>
                        <input v-model="username"
                        type="text"
                        class="form-control"
                        id="inp-username"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Username.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inp-email">Email<sup>*</sup></label>
                        <input v-model="email"
                        type="email"
                        class="form-control"
                        id="inp-email"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Email.
                        </div>
                    </div><div class="form-group">
                        <label for="inp-password">Password<sup>*</sup></label>
                        <input v-model="pass"
                        type="password"
                        class="form-control"
                        id="inp-password"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Password.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inp-nama">Nama<sup>*</sup></label>
                        <input v-model="nama"
                        type="text"
                        class="form-control"
                        id="inp-nama"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Nama.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inp-hp">Nomor Hp<sup>*</sup></label>
                        <input v-model="hp"
                        type="number"
                        class="form-control"
                        id="inp-hp"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Phone Number.
                        </div>
                    </div>
                    <div class="form-submit">
                        <a @click="next($event)" class="btn btn-primary" role="button">
                            Next
                        </a>
                    </div>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="inp-wali">Nama Wali (Optional)</label>
                        <input v-model="wali"
                        type="text"
                        class="form-control"
                        id="inp-wali"
                        >
                    </div>
                    <div class="form-group">
                        <label>Tempat, Tanggal Lahir<sup>*</sup></label>
                        <div class="form-row">
                            <input v-model="tempat"
                            type="text"
                            class="form-control tempat"
                            id="inp-tmp"
                            required
                            >
                            <span class="slash">&#47;</span>
                            <div class="form-group date">
                                <select v-model="year" class="custom-select browser-default" required>
                                <option disabled value="">YY</option>
                                <option v-for="idx in 70" :key="idx">{{ idx+1939 }}</option>
                                </select>
                            </div>
                            <div class="form-group date">
                                <select v-model="month" class="custom-select browser-default"
                                 @change="day_change" required>
                                <option selected="selected" disabled value="">MM</option>
                                <option v-for="m in 12" :key="m">{{ m }}</option>
                                </select>
                            </div>    
                            <div class="form-group date">
                                <select v-model="day" class="custom-select browser-default" required>
                                <option selected="selected" disabled value="">DD</option>
                                <option v-for="(d, idx) in data_day" :key="idx">{{ d }}</option>
                                </select>
                            </div>                            
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="customFile">Upload photo 3x4 (minimal 3 bulan terakhir) max 100kb<sup>*</sup></label>
                        <div class="custom-file">
                            <input type="file" class="form-control" id="customFile" name="filename"
                            @change="onFileChange" @click="file[0].name=''" required
                            accept="image/x-png,image/jpeg"
                            >
                            <label class="custom-file-label" for="customFile">
                                <span v-if="!file">
                                    Choose file
                                </span>
                                <span v-else>
                                    {{ file[0].name }}
                                </span>
                            </label>
                            <div class="invalid-feedback">
                                Please provide a valid File.
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="jenjang">Jenjang Pendidikan<sup>*</sup></label>
                        <select v-model="pendidikan" class="custom-select browser-default" id="jenjang" required>
                            <option selected="selected" disabled value="">Pendidikan</option>
                            <option v-for="(study, idx) in data_study" :key="idx">{{ study }}</option>
                        </select>
                    </div>
                    <div class="form-submit">
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import {auth, storage, db_real, bucket} from '../firebase/firebaseInit';

export default {
  data: () => ({
    page: false,
    username: '',
    email: '',
    pass: '',
    cnf_pass: '',
    wali: '',
    nama: '',
    hp: '',
    file: [{name:'',}],
    tempat: '',
    day: '',
    month: '',
    year: '',   
    pendidikan: '',
    data_month: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    data_study: ['SD','SMP','SMA','S1','S2','S3'],
    data_day: [],
  }),
  methods: {
    async registerUser(){
      console.log(this.file);
      let storageRef = storage.ref('image/');
      let uploadImgref = storageRef.child(this.username+this.file[0].name);
      let imgurl = null
      await uploadImgref.put(this.file[0]).then((snapshot) =>{
        console.log(snapshot.ref.location);
        uploadImgref.getDownloadURL().then((url) => {
          imgurl= url;
        }).catch((err) => {
          // eslint-disable-next-line
          alert('opps', err.message);
          return;
        });
      }
      ).catch((err) => {
        // eslint-disable-next-line
        alert('opps', err.message);
        return;
      });
      await auth.createUserWithEmailAndPassword(this.email, this.pass)
      .then((snapshot) => {
        // eslint-disable-next-line
      })
      .catch((err) => {
        // eslint-disable-next-line
        alert('opps', err.message);
        return;
      });
      let uid = auth.currentUser.uid;
      let user= auth.currentUser;
      user.updateProfile({
              photoURL: imgurl,
              displayName: this.nama,
              })
          .catch((err) => {
              // eslint-disable-next-line
              alert('opps', err.message);
              return;
          });
      await db_real.ref('users/'+uid).set({
          picUrl: imgurl,
          email: this.email,
          nama: this.nama,
          hp: this.hp,
          wali: this.wali,
          tmpt: this.tempat,
          tgl: new Date(`${this.year}-${this.month}-${this.day}`),
          pddk: this.pendidikan,
          reservasi: 0,
          status: 'user',
      }).catch((err) => {
        // eslint-disable-next-line
        alert('opps', err.message);
        return null;
      });
      this.$router.push('/');
    },
    nextpage(event) {
      event.preventDefault();
      event.target.classList.add('was-validated');
      if (document.querySelectorAll('.form-control:invalid').length === 0) {
        this.registerUser();
      }
    },
    next() {
      document.querySelector('.needs-validation').classList.add('was-validated');
      if (document.querySelectorAll('.form-control:invalid').length === 0) {
        this.page = true;
      }
    },
    onFileChange(event) {
      this.file = null;
      this.file = event.target.files || event.dataTransfer.files;
    },
    day_change() {
      this.data_day = [];
      let max = 28;
      if (this.month === '2') {
        if (this.year % 4 === 0) {
          max = 29;
        }
        for (let i = 1; i <= max; i += 1) {
          this.data_day.push(i);
        }
      } else if (this.month === '1' || this.month === '3' || this.month === '5'
        || this.month === '7' || this.month === '8' || this.month === '10'
        || this.month === '12') {
        for (let i = 1; i <= 31; i += 1) {
          this.data_day.push(i);
        }
      } else {
        for (let i = 1; i <= 30; i += 1) {
          this.data_day.push(i);
        }
      }
    },
  },
};
</script>

<style scoped>
html,body{
  height: 100%;
  width: 100%;
}
sup{
    color: red;
}
.register{
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
.form-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.form-control.tempat{
    width: 20%;
}
.form-submit{
    display: flex;
    flex-direction:row-reverse;
}
.box{
    color: #1a1a1a;
    min-width: 35%;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
}
a.btn{
    color: #fff;
}
.form-control.tempat{
    width: 130px;
}
.date{
    width: 100px;
}
.slash {
    font-size: 30px;
}
.was-validated .form-control:valid {
  background-image: none;
}
.was-validated .form-control:invalid {
  background-image: none;
}
.was-validated .custom-select:valid {
  background-image: none;
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px;
}
.was-validated .custom-select:invalid {
  background-image: none;
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px;
}
</style>
