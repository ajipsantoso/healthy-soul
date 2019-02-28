<template>
    <div class="career">
        <div class="box">
            <div class="box_title">
                Find Your Career
            </div>
            <div class="box_content">
                <ol>
                    <li>
                        <div class="form-group">
                            <div class="container">
                                <div class="row">
                                    SKILLS: What are your personal strength?
                                </div>
                                <div class="row">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest1"
                                        type="radio" name="gridRadios1" id="gridRadios1" value="0">
                                        <label class="form-check-label" for="gridRadios1">
                                            Logic
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest1"
                                        type="radio" name="gridRadios1" id="gridRadios2" value="1">
                                        <label class="form-check-label" for="gridRadios2">
                                            Management
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest1"
                                        type="radio" name="gridRadios1" id="gridRadios3" value="2">
                                        <label class="form-check-label" for="gridRadios3">
                                            Thinking
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="form-group">
                            <div class="container">
                                <div class="row">
                                    INTERESTS: Where the place do you like to work?
                                </div>
                                <div class="row">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest2"
                                        type="radio" name="gridRadios2" id="gridRadios4" value="0">
                                        <label class="form-check-label" for="gridRadios4">
                                            Office
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest2"
                                        type="radio" name="gridRadios2" id="gridRadios5" value="1">
                                        <label class="form-check-label" for="gridRadios5">
                                            Outdoor
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="form-group">
                            <div class="container">
                                <div class="row">
                                    STYLE: What style of work environment are you looking for?
                                </div>
                                <div class="row">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest3"
                                        type="radio" name="gridRadios3" id="gridRadios6" value="0">
                                        <label class="form-check-label" for="gridRadios6">
                                            Attention to Detail
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest3"
                                        type="radio" name="gridRadios3" id="gridRadios7" value="1">
                                        <label class="form-check-label" for="gridRadios7">
                                            Integrity
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="quest3"
                                        type="radio" name="gridRadios3" id="gridRadios8" value="2">
                                        <label class="form-check-label" for="gridRadios8">
                                            Initiative
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
                <div class="form-answer">
                    <h3>{{ this.answer }}</h3>
                </div>
                <div class="form-submit">
                    <button @click="getAns()" type="button" class="btn btn-primary">Primary</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'career',
  components: {
  },
  data: () => ({
    answer: '',
    quest1: '',
    quest2: '',
    quest3: '',
    list_answer: [
      {
        first: [
          {
            second: [
              {
                value: 'Answer 1',
              },
              {
                value: 'Answer 2',
              },
              {
                value: 'Answer 3',
              },
            ],
          },
          {
            second: [
              {
                value: 'Answer 4',
              },
              {
                value: 'Answer 5',
              },
              {
                value: 'Answer 6',
              },
            ],
          },
        ],
      },
      {
        first: [
          {
            second: [
              {
                value: 'Answer 7',
              },
              {
                value: 'Answer 8',
              },
              {
                value: 'Answer 9',
              },
            ],
          },
          {
            second: [
              {
                value: 'Answer 10',
              },
              {
                value: 'Answer 11',
              },
              {
                value: 'Answer 12',
              },
            ],
          },
        ],
      },
      {
        first: [
          {
            second: [
              {
                value: 'Answer 13',
              },
              {
                value: 'Answer 14',
              },
              {
                value: 'Answer 15',
              },
            ],
          },
          {
            second: [
              {
                value: 'Answer 16',
              },
              {
                value: 'Answer 17',
              },
              {
                value: 'Answer 18',
              },
            ],
          },
        ],
      },
    ],
  }),
  methods: {
    getAns() {
      this.answer = this.list_answer[parseInt(this.quest1, 10)]
        .first[parseInt(this.quest2, 10)]
        .second[parseInt(this.quest3, 10)].value;
    },
  },
};
</script>

<style scoped>
html,body{
    height: 100%;
    width: 100%;
}
.career{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
ol li{
    height: 100%;
}
.box{
    color: #1a1a1a;
    width: 40%;
    height: 60%;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
}
.box_title{
    margin-bottom: 18px;
    font-size: 24px;
}
.box_content{
    width: 75%;
}
.row{
    margin-bottom: 15px;
}
.form-group{
    margin-bottom: unset;
    display: flex;
    flex-direction:row;
    align-items: center;
}
.form-answer{
    height: 50px;
}
.form-check{
    padding: none;
    margin-right: 10px;
}
.form-submit{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
a{
    color: #1a1a1a;
}
.submit-right{
    height: 30px;
}
</style>
