<template>
    <div class="consul">
        <div class="box">
            <div class="box_title">
                Register Consultation
            </div>
            <div class="box_content">
                        <div class="form-group">
                            <div class="container">
                                <div class="row data-doctor">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="doctor"
                                        type="radio" name="gridDoctor" id="gridRadios1"
                                        value="doctor1">
                                        <label class="form-check-label doctor" for="gridRadios1">
                                                <div class="label-img">
                                                    <img src="@/assets/Mask_Group_1.png" alt="">
                                                </div>
                                                <div class="label-desc">
                                                    <h5>Jagar Manjensen</h5>
                                                    <p>Psikologi Pendidikan</p>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="doctor"
                                        type="radio" name="gridDoctor" id="gridRadios2"
                                        value="doctor2">
                                        <label class="form-check-label doctor" for="gridRadios2">
                                                <div class="label-img">
                                                    <img src="../assets/Mask_Group_1.png" alt="">
                                                </div>
                                                <div class="label-desc">
                                                    <h5>John Doe</h5>
                                                    <p>Psikiater Umum</p>
                                                </div>
                                        </label>
                                    </div>
                                </div>
                                <div class="row data-time">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime1"
                                        value="Senin - 16:00">
                                        <label class="form-check-label time" for="gridTime1">
                                                <div class="label-desc">
                                                    <h5>Senin - 16:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime2"
                                        value="Selasa - 16:00">
                                        <label class="form-check-label time" for="gridTime2">
                                                <div class="label-desc">
                                                    <h5>Selasa - 16:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime3"
                                        value="Rabu - 19:00">
                                        <label class="form-check-label time" for="gridTime3">
                                                <div class="label-desc">
                                                    <h5>Rabu - 19:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime4"
                                        value="Kamis - 16:00">
                                        <label class="form-check-label time" for="gridTime4">
                                                <div class="label-desc">
                                                    <h5>Kamis - 16:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime5"
                                        value="Jumat - 16:00">
                                        <label class="form-check-label time" for="gridTime5">
                                                <div class="label-desc">
                                                    <h5>Jumat - 16:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="time"
                                        type="radio" name="gridTime" id="gridTime6"
                                        value="Sabtu - 08:00">
                                        <label class="form-check-label time" for="gridTime6">
                                                <div class="label-desc">
                                                    <h5>Sabtu - 08:00</h5>
                                                </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="alamat">
                            <b>Tempat Pertemuan : </b>Ruko A1 Lantai 1, Jl. Telekomunikasi,
                            Jl. Terusan Buah Batu No.01, Sukapura, Dayeuhkolot, Bandung,
                            Jawa Barat 40257
                        </div>
                        <div class="biaya">
                            <b>BIAYA KONSULTASI : <span>Rp. 500.000</span></b>
                        </div>
                <div class="form-submit">
                    <button @click="onPayment" type="button" class="btn btn-primary">Payment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'consul-off',
  components: {
  },
  data: () => ({
    doctor: '',
    time: '',
  }),
  methods: {
      onPayment(){
          this.$router.push({ path: '/consul-off-bayar' });
      },
  },
};
</script>

<style scoped>
html,body{
    height: 100%;
    width: 100%;
}
input{
    visibility:hidden;
}
input:checked + .form-check-label{
    box-shadow: 0px 0px 10px rgba(13, 107, 170, 1);
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
    text-align: left;
    display: flex;
    flex-direction:column;
}
.box_title{
    margin-bottom: 18px;
    text-align: center;
    font-size: 24px;
}
.row{
    margin-bottom: 15px;
    min-width: 270px;
}
.form-group{
    margin-bottom: unset;
    display: flex;
}
.form-group .container{
    display: flex;
    align-items: center;
    flex-direction:column;
}
.form-check{
    margin-right: 10px;
    display: flex;
    align-items: center;
}
.form-check-label{
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: row;
    align-items: center;
}
.form-check-label.doctor{
    min-width: 300px;
}
.form-check-label div img{
    width: 70px;
    margin-right: 10px;
}
.row.data-doctor .form-check{
    flex: 1;
    flex-basis: 40%;
    margin: 10px 5px;
    justify-content: center;
}
.alamat{
    max-width: 700px;
}
.biaya{
    flex-wrap: unset;
}
.row.data-time{
    flex-wrap: wrap;
    max-width: 600px;
}
.row.data-time .form-check{
    flex: 1;
    flex-basis: 25%;
    margin: 15px 5px;
    align-items: center;
}
.form-submit{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
a{
    color: #1a1a1a;
}
.biaya span{
    color: red;
}
.submit-right{
    height: 30px;
}
</style>
