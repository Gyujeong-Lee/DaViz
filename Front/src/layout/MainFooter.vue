<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
              <h5> 이규정, 방지환, 정희진, 김윤서 </h5>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, made with 신한은행
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
