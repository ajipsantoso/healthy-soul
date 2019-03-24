<template>
    <div class="consulchat">
      <div v-if='!chooseDoctor'>
        <div class="container chat">
            <h3 class=" text-center">Messaging</h3>
            <div class="messaging">
                <div class="inbox_msg">
                    <div class="inbox_people">
                        <div class="headind_srch">
                            <div class="recent_heading">
                            <h4>Recent</h4>
                            </div>
                        </div>
                        <div class="inbox_chat">
                            <div v-for="(chat_person, idx_prsn) in sorted"
                            :key="idx_prsn"
                            class="chat_list"
                            :class="[chat_person.chatUser===selectedUser?'active_chat':'']"
                            @click="selectedUser=chat_person.chatUser"
                            >
                                <div class="chat_people">
                                    <div class="chat_img">
                                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                                    </div>
                                    <div class="chat_ib">
                                      <h5>{{chat_person.userName}}
                                      </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mesgs">
                        <div class="msg_history">
                          <div v-for="(user_message, idx_chat) in sorted"
                          :key="idx_chat">
                            <div v-if="selectedUser===user_message.chatUser">
                                <div
                                v-for="(message, idx_msg) in user_message.chat"
                                :key="idx_msg"
                                :class="[message.author===authUser.email?
                                'outgoing_msg':'incoming_msg']">
                                    <div v-if="message.author
                                    !==authUser.email" class="incoming_msg_img">
                                        <img src="https://ptetutorials.com/images/user-profile.png"
                                        alt="sunil">
                                    </div>
                                    <div :class="[message.author
                                    ===authUser.email?'sent_msg':'received_msg']">
                                        <div v-if="message.author!==authUser.email"
                                        class="received_withd_msg">
                                        <p>{{message.message}}</p>
                                        <span class="time_date"> {{authUser.email}}
                                                |    {{message.author}}</span></div>
                                        <div v-else>
                                        <p>{{message.message}}</p>
                                        <span class="time_date"> {{authUser.email}}
                                                |    {{message.author}}</span></div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="type_msg">
                            <div class="input_msg_write">
                            <input @keyup.enter="saveMessage" v-model="message"
                            type="text" class="write_msg"
                            placeholder="Type a message" :disabled="disableChat"/>
                            <button @click="saveMessage" class="msg_send_btn" type="button">
                                <font-awesome-icon icon="paper-plane"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="box" v-else>
        <div class="box_title">
          Who do you want to consult with?
        </div>
        <div class="box_content">
          <div @click="docUser('admin@admin.com')" class="form-check-label doctor">
            <div class="label-img">
                <img src="@/assets/Mask_Group_1.png" alt="">
            </div>
            <div class="label-desc">
                <h5>Jager Manjensen</h5>
                <p>Educational Psychology</p>
            </div>
          </div>
          <div @click="docUser('admin2@admin.com')" class="form-check-label doctor">
            <div class="label-img">
                <img src="@/assets/Mask_Group_1.png" alt="">
            </div>
            <div class="label-desc">
                <h5>John Doe</h5>
                <p>General Psychology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { auth, db, dbReal } from '@/firebase/firebaseInit';

export default {
  name: 'consulchat',
  components: {
  },
  data: () => ({
    message: null,
    messages: [],
    sorted: [],
    authUser: {},
    selectedUser: null,
    disableChat: false,
    chooseDoctor: true,
  }),
  methods: {
    docUser(selected) {
      this.chooseDoctor = false;
      this.selectedUser = selected;
      this.fetchMessage(selected);
    },
    async saveMessage() {
      let docName;
      await dbReal.ref('users/').orderByChild('email').equalTo(this.selectedUser).once('value')
        .then((s) => {
          s.forEach((data) => {
            docName = data.val().nama;
          });
        });
      db.collection('chat').add({
        message: this.message,
        time: new Date(),
        author: this.authUser.email,
        authorName: this.authUser.displayName,
        sendtoName: docName,
        sendto: this.selectedUser,
      });
      this.message = null;
    },
    sortMessage(msg, status) {
      this.sorted = [];
      for (let i = 0; i < msg.length; i += 1) {
        if (msg[i].author === this.authUser.email || msg[i].sendto === this.authUser.email) {
          let found = false;
          for (let j = 0; j < this.sorted.length; j += 1) {
            if ((this.sorted[j].chatUser === msg[i].author
            && msg[i].author !== this.authUser.email)
              || (this.sorted[j].chatUser === msg[i].sendto
              && msg[i].sendto !== this.authUser.email)) {
              this.sorted[j].chat.push(msg[i]);
              found = true;
            }
          }
          if (found === false) {
            if (msg[i].author !== this.authUser.email) {
              if (status === 'admin') {
                this.sorted.push({
                  userName: msg[i].authorName,
                  chatUser: msg[i].author,
                  chat: [msg[i]],
                });
              } else {
                this.sorted.push({
                  userName: msg[i].sendtoName,
                  chatUser: msg[i].sendto,
                  chat: [msg[i]],
                });
              }
            } else if (status === 'admin') {
              this.sorted.push({
                userName: msg[i].authorName,
                chatUser: msg[i].author,
                chat: [msg[i]],
              });
            } else {
              this.sorted.push({
                userName: msg[i].sendtoName,
                chatUser: msg[i].sendto,
                chat: [msg[i]],
              });
            }
          }
        }
      }
      if (this.selectedUser === null) {
        if (this.chooseDoctor === false) {
          if (this.sorted.length > 0) {
            this.disableChat = false;
            this.selectedUser = this.sorted[0].chatUser;
          } else {
            this.disableChat = true;
            this.sorted.push({ userName: 'No User Found', chatUser: 'nouser' });
          }
        }
      } else if (this.selectedUser && this.sorted.length === 0) {
        this.sorted.push({ userName: this.selectedUser === 'admin@admin.com' ? 'Jager Manjensen' : 'John Doe', chatUser: this.selectedUser });
      }
    },
    fetchMessageAdmin() {
      db.collection('chat').orderBy('time')
        .onSnapshot((querySanpshot) => {
          let allMessage = [];
          querySanpshot.forEach((doc) => {
            allMessage.push(doc.data());
          });
          this.messages = allMessage;
          this.sortMessage(allMessage, 'admin');
          allMessage = [];
        });
    },
    fetchMessage(user) {
      db.collection('chat').orderBy('time')
        .onSnapshot((querySanpshot) => {
          let allMessage = [];
          querySanpshot.forEach((doc) => {
            if ((doc.data().sendto === auth.currentUser.email && doc.data().author === user)
            || (doc.data().sendto === user && doc.data().author === auth.currentUser.email)) {
              allMessage.push(doc.data());
            }
          });
          this.messages = allMessage;
          this.sortMessage(allMessage, 'user');
          allMessage = [];
        });
    },
    async checkUser() {
      let stats = null;
      await dbReal.ref(`/users/${auth.currentUser.uid}`).once('value').then((s) => {
        stats = s.val().status;
      });
      if (stats === 'admin') {
        this.chooseDoctor = false;
        this.fetchMessageAdmin();
      } else {
        this.chooseDoctor = true;
      }
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.checkUser();
  },
};
</script>

<style scoped>
body,html{height:100%; width: 100%;}
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.box{
  margin-top:70px;
    color: #1a1a1a;
    display: flex;
    flex-direction:column;
}
.box_title{
    margin-bottom: 18px;
    text-align: center;
    font-size: 24px;
}
.box_content{
  display: flex;
  flex-direction: row;
}
.label-desc p{
  font-size: 13px;
}
.form-check-label{
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.form-check-label.doctor{
    min-width: 300px;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
  border-radius: 10px;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding: 5px;
}

.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{
  border:1px solid #cdcdcd;
  border-width:0 0 1px 0;
  width:80%;
  padding:2px 0 4px 6px;
  background:none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:18px; color:#464646; margin:0 0 0 0;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 15%;
}
.chat_ib {
  padding: 5px 0 5px 15px;
  text-align: left;
  width: 85%;
  display: flex;
  align-items: center;
}
.chat_people{
  overflow:auto; clear:both;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px;
}
.inbox_chat{ height: 550px; overflow-y: scroll;}
.active_chat{ background:#ebebeb;}
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 25px 25px 25px 0px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 25px 25px 0px 25px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>
