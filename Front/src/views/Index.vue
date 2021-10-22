<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item" >
          <!-- <div class="image-wrapper" style="display:flex;"> -->

            <div class="brand" style="display:flex;">
            <img :src="logo" alt="shinhan_logo" class="shinhan_logo" style="width:25%;height:25%">
            <h1 style="margin:auto">Daviz</h1>
            </div>
          <!-- </div> -->
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      


<br>
    <!-- Inputs --> 
        <div
          class="md-layout-item " style="margin:auto; width:60%"
        >
          <md-field>
            <label>찾고자 하는 데이터를 찾으세요 - 김예찬 배상- </label>
            <md-input v-model="floatingLabel" type="text" style="text-align:center;"></md-input>
          </md-field>
        </div>
    <!-- end inputs -->


      <!-- 여러분... 회원 로그인 양식 쓰고싶으시면 밑에꺼 풀고 쓰세요...! -김예찬 배상-   -->
      <!-- <div class="md-layout">
        <div class="md-layout-item text-center">
          <md-button href="#/login" class="md-simple md-success md-lg"
            >View Login Page</md-button
          >
        </div>
      </div> -->
      <div class="section section-examples">
        <div class="container-fluid text-center">
          <div class="md-layout">


            <!-- DataList Div 시작 -->
            <div class="md-layout-item">
              <a href="#/landing" target="_blank">
                <img
                  :src="landing"
                  alt="Rounded Image"
                  class="img-raised rounded img-fluid"
                />
              </a>
              <md-button href="#/landing" class="md-simple md-success md-lg"
                >Data LIST</md-button
              >
            </div>
            <!-- DataList Div 끝 -->

            <!-- Data Regist Div 시작 -->
            <div class="md-layout-item">
              <a  @click="classicModal = true" target="_blank">
                <img
                  :src="profile"
                  alt="Rounded Image"
                  class="img-raised rounded img-fluid"
                />
              </a>
              <md-button @click="classicModal = true" class="md-simple md-success md-lg"
                >Data Regist</md-button
              >
                          <div class="md-layout-item md-size-33">


              <modal v-if="classicModal" @close="classicModalHide">
                <template slot="header">
                  <h4 class="modal-title">Modal Title</h4>
                  <md-button
                    class="md-simple md-just-icon md-round modal-default-button"
                    @click="classicModalHide"
                  >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean. A small
                    river named Duden flows by their place and supplies it with
                    the necessary regelialia. It is a paradisematic country, in
                    which roasted parts of sentences fly into your mouth. Even
                    the all-powerful Pointing has no control about the blind
                    texts it is an almost unorthographic life One day however a
                    small line of blind text by the name of Lorem Ipsum decided
                    to leave for the far World of Grammar.
                  </p> 
                </template>

                <template slot="footer">
                  <md-button class="md-simple">Nice Button</md-button>
                  <md-button
                    class="md-danger md-simple"
                    @click="classicModalHide"
                    >Close</md-button
                  >
                </template>
              </modal>
            </div>

            <!-- DataRegist Div 끝  -->
            <!--  모달도 적용되어있는데 컴포넌트로 빼진 않았습니다 귀찮^^ - 김예찬 배상-  -->

            </div>
          </div>
 
        </div>
      </div>
   
    </div>
  </div>
</template>

<script>


import { Modal } from "@/components";
export default {
  components: {
     Modal
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/blue.png")
    },
 
    logo: {
      type: String,
      default: require("@/assets/img/shinhan_logo.png")
    },
    landing: {
      type: String,
      default: require("@/assets/img/blue.png")
    },
    profile: {
      type: String,
      default: require("@/assets/img/blue.png")
    }
  },
  data() {
    return {
  classicModal: false,
    };
  },
  methods: {
        classicModalHide() {
      this.classicModal = false;
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
 
  },
  mounted() {
  },
  beforeDestroy() {

  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
