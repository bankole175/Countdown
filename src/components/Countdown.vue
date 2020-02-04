<template>
  <div>
    <!-- the if statement helps to target when the countdown is over so it could show completed -->

    <div v-if="!testCompleted">
      <span>{{ remaining.hours() | leftPad }} Hours:</span>
      <span>{{ remaining.minutes() | leftPad }} Minutes:</span>
      <span>{{ remaining.seconds() | leftPad }} Seconds</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    until: null
  },

  data() {
    return { now: new Date() };
  },

  computed: {
    testCompleted() {
      return this.remaining <= 0;
    },

    remaining() {
      let remaining = moment.duration(Date.parse(this.until) - this.now);

      if (remaining <= 0) {
        this.$emit("completed");
      }

      return remaining;
    }
  },

  created() {
    let interval = setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.$on("testCompleted", () => clearInterval(interval));
  },
  filters: {
    leftPad(val) {
      return val <= 9 && val >= 0 ? `0${val}` : val;
    }
  }
};
</script>
