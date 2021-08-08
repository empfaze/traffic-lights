<template>
  <div class="color red" :class="{ flicker: isAnimated }">
    <span class="seconds">{{ getSeconds }}</span>
  </div>
  <div class="color yellow inactive"></div>
  <div class="color green inactive"></div>
</template>

<script>
export default {
  data() {
    return {
      initialNumberOfSeconds: 10,
      realNumberOfSeconds: null,
      interval: null,
      animated: false,
    };
  },

  computed: {
    getSeconds() {
      return this.realNumberOfSeconds;
    },
    isAnimated() {
      return this.animated;
    },
  },

  methods: {
    decSeconds() {
      if (this.getSeconds > 1) {
        this.realNumberOfSeconds--;
        if (this.getSeconds < 4) {
          this.animated = true;
          setTimeout(() => (this.animated = false), 300);
        }
        this.$store.dispatch("setRemainedSeconds", this.realNumberOfSeconds);
        console.log(
          this.$store.getters.getRemainedSeconds,
          this.realNumberOfSeconds
        );
      } else {
        this.clearInt();
        this.$store.dispatch("setRemainedSeconds", null);
        this.$router.push("/yellow");
      }
    },

    clearInt() {
      clearInterval(this.interval);
    },
  },

  mounted() {
    // need to determine where to move (red  or green)
    this.$store.dispatch("setCameFromValue", "red");
    this.$store.dispatch("setCurrentColor", "red");

    const seconds =
      this.$store.getters.getRemainedSeconds === null
        ? this.initialNumberOfSeconds
        : this.$store.getters.getRemainedSeconds;
    this.realNumberOfSeconds = seconds;

    this.$store.dispatch("setRemainedSeconds", this.realNumberOfSeconds);

    this.interval = setInterval(this.decSeconds, 1000);
  },
};
</script>

<style>
.red {
  background-color: red;
}
</style>
