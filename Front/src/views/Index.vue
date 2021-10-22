<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="logo" alt="shinhan_logo" class="shinhan_logo"/>
            <div class="brand">
              <h1>Daviz</h1>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      

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
            <div class="md-layout-item">
              <a href="#/profile" target="_blank">
                <img
                  :src="profile"
                  alt="Rounded Image"
                  class="img-raised rounded img-fluid"
                />
              </a>
              <md-button href="#/profile" class="md-simple md-success md-lg"
                >Data Regist</md-button
              >
            </div>
          </div>
        </div>
      </div>
   
    </div>
  </div>
</template>

<script>
 
export default {
  components: {
     
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

    };
  },
  methods: {
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
