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
                        <label for="inp-username">Username</label>
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
                        <label for="inp-email">Email</label>
                        <input v-model="email"
                        type="email"
                        class="form-control"
                        id="inp-email"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Email.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inp-nama">Nama</label>
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
                        <label for="inp-hp">Nomor Hp</label>
                        <input v-model="hp"
                        type="number"
                        class="form-control"
                        id="inp-hp"
                        required>
                        <div class="invalid-feedback">
                            Please provide a valid Phone Number.
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Tempat, Tanggal Lahir</label>
                        <div class="form-row">
                            <input v-model="tempat"
                            type="text"
                            class="form-control tempat"
                            id="inp-tmp"
                            >
                            <span class="slash"></span>
                        </div>
                    </div>
                    <div class="form-submit">
                        <button @click="next($event)" class="btn btn-primary">
                            Next
                        </button>
                    </div>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="inp-wal">Nama Wali (Optional)</label>
                        <input v-model="hp"
                        type="number"
                        class="form-control"
                        id="inp-hp"
                        >
                    </div>
                    <div class="form-group">
                        <label for="customFile">Upload foto 3x4 (minimal 3 bulan terakhir)</label>
                        <div class="custom-file">
                            <input type="file" class="form-control" id="customFile" name="filename"
                            @change="onFileChange" required
                            accept="image/x-png,image/jpeg"
                            >
                            <label class="custom-file-label" for="customFile">
                                <span v-if="!file">
                                    Choose file
                                </span>
                                <span v-else>
                                    <!-- {{ file[0].name }} -->
                                </span>
                            </label>
                            <div class="invalid-feedback">
                                Please provide a valid File.
                            </div>
                        </div>
                    </div>
                </div>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import { auth } from '../firebase/firebaseInit';

export default {
  data: () => ({
    page: false,
    username: '',
    email: '',
    nama: '',
    hp: '',
    file: null,
    tempat: '',
  }),
  methods: {
    nextpage(event) {
      event.preventDefault();
      event.target.classList.add('was-validated')
    },
    next(event){
        if(document.querySelectorAll('.form-control:invalid').length == 0){
            this.page=true;
        }
    },
    onFileChange(e){
      this.file = null,
      this.file = e.target.files || e.dataTransfer.files;
    }   
  },
};
</script>

<style scoped>
html,body{
  height: 100%;
  width: 100%;
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
a{
    color: #1a1a1a;
}
  .slash {
    height:2px;
    width: 40px;
    background: black;
    margin: auto;
    transform: rotate(-45deg)
  }
</style>
