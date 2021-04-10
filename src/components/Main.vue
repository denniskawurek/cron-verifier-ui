<template>
  <div class="main">
    <h1>Cron verifier</h1>
    <p>
      Verify your crons and show next execution times over different timezones.
    </p>
  </div>

  <div>
    <p>
      <input
        :value="cronExpression"
        @input="calculate"
        v-bind:class="{ success: isValid, error: !isValid }"
      />
    </p>
    <div v-if="!isValid">
      <p>Invalid expression</p>
    </div>
    <div v-if="isValid && description != ''">
      <h3>Description:</h3>
      <p>{{ description }}</p>
    </div>
    <table v-if="isValid">
      <tr>
        <th>UTC</th>
        <th>Your time</th>
      </tr>
      <td v-for="times in nextExecutionTimes" v-bind:key="times.id">
        <ul>
          <li v-for="time in times" v-bind:key="time.id">{{ time }}</li>
        </ul>
      </td>
    </table>
  </div>
</template>

<script>
import { describe, nextExecutions } from "cron-verifier/dst/CronParser";

export default {
  name: "Main",
  data() {
    return {
      isValid: true,
      description: "",
      cronExpression: "",
      nextExecutionTimes: [],
    };
  },
  methods: {
    calculate(e) {
      this.cronExpression = e.target.value;
      try {
        this.description = describe(this.cronExpression);
        const res = nextExecutions(
          this.cronExpression,
          new Date(Date.now()),
          null,
          5
        );
        this.fillList(res);
      } catch (e) {
        console.error(e);
        this.isValid = false;
      }
    },
    fillList(executionTimes) {
      this.nextExecutionTimes = [];
      this.nextExecutionTimes.push(
        executionTimes.map((executionTime) => {
          return executionTime.toUTCString();
        })
      );
      this.nextExecutionTimes.push(
        executionTimes.map((executionTime) => {
          return executionTime.toString();
        })
      );
      this.isValid = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

input,
input:focus {
  font-size: 2.5em;
  text-align: center;
  border-style: solid;
  color: #000000;
}

input.success {
  border-color: #4bda99;
}
input.error {
  border-color: #da4b52;
}
</style>
