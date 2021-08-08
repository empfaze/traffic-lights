<template>
  <div class="wrapper">
    <div class="traffic-light">
      <router-view> </router-view>
    </div>
  </div>
</template>

//
<script>
export default {
  methods: {
    setInformation() {
      const color = this.$store.getters.getCurrentColor;
      localStorage.setItem("currentColor", color);

      const cameFrom = this.$store.getters.getCameFromValue;
      localStorage.setItem("cameFrom", cameFrom);

      const secondsRemain = this.$store.getters.getRemainedSeconds;
      localStorage.setItem("secondsRemain", secondsRemain);
    },
  },

  mounted() {
    // setting info in local storage
    window.addEventListener("beforeunload", this.setInformation, {
      once: true,
    });

    // taking information from local storage
    const color = localStorage.getItem("currentColor");
    const cameFrom = localStorage.getItem("cameFrom");
    const secondsRemain = localStorage.getItem("secondsRemain");

    if (!color) this.$router.push("red");
    else {
      this.$store.dispatch("setCameFromValue", cameFrom);
      this.$store.dispatch("setRemainedSeconds", secondsRemain);

      switch (color) {
        case "red":
          this.$router.push("/red");
          break;
        case "yellow":
          this.$router.push("/yellow");
          break;
        case "green":
          this.$router.push("/green");
          break;
      }
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  font-family: "Lato", sans-serif;
  background-color: rgb(202, 202, 202);
}

body {
  box-sizing: border-box;
}

.wrapper {
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.traffic-light {
  background-color: rgb(53, 51, 51);
  height: 85vh;
  width: 40vh;
  padding: 3rem 0;
  border-radius: 8rem;
  overflow: hidden;
  box-shadow: 1rem 1.5rem 3rem rgba(0, 0, 0, 0.2);

  display: grid;
  justify-items: center;
  align-items: center;
}

.color {
  height: 22vh;
  width: 22vh;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.seconds {
  color: white;
  font-size: 7rem;
  text-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.inactive {
  opacity: 0.2;
}
.flicker {
  opacity: 0.7;
}
</style>
