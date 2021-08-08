<template>
  <div class="color red inactive"></div>
  <div class="color yellow" :class="{ flicker: isAnimated }">
    <span class="seconds">{{ getSeconds }}</span>
  </div>
  <div class="color green inactive"></div>
</template>

<script>
export default {
  data() {
    return {
      initialNumberOfSeconds: 3,
      realNumberOfSeconds: null,
      interval: null,
      animated: false,
    };
  },

  computed: {
    getSeconds() {
      return this.realNumberOfSeconds;
    },
    getCameFromValue() {
      return this.$store.getters.getCameFromValue;
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
        this.getCameFromValue === "red"
          ? this.$router.push("/green")
          : this.$router.push("/red");
      }
    },

    clearInt() {
      clearInterval(this.interval);
    },
  },

  mounted() {
    this.$store.dispatch("setCurrentColor", "yellow");

    const seconds =
      this.$store.getters.getRemainedSeconds === null
        ? this.initialNumberOfSeconds
        : this.$store.getters.getRemainedSeconds;
    this.realNumberOfSeconds = seconds;

    this.$store.dispatch("setRemainedSeconds", this.realNumberOfSeconds);

    this.animated = true;
    setTimeout(() => (this.animated = false), 300);

    this.interval = setInterval(this.decSeconds, 1000);
  },
};
</script>

<style>
.yellow {
  background-color: rgb(235, 213, 19);
}
</style>
