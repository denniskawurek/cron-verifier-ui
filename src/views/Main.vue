<template>
  <div class="p-grid">
    <div class="p-col">
      <h1>Cron verifier</h1>
      <p>
        Verify your crons and show next execution times over different
        timezones.
      </p>
      <Message severity="warn">
        This is an early beta stage. So if you find any issues, please contact
        me or hand over an issue.
      </Message>
    </div>
  </div>

  <div class="p-fluid p-formgrid p-grid p-jc-center">
    <div class="p-field p-col-6">
      <InputText
        class="p-inputtext-lg p-text-center"
        :value="cronExpression"
        @input="calculate"
        v-bind:class="{ 'p-success': isValid, 'p-invalid': !isValid }"
      ></InputText>
      <small class="p-error" v-if="!isValid">Invalid expression.</small>
      <div v-if="isValid && description != ''" class="p-text-bold">
        <p>{{ description }}</p>
      </div>
    </div>
  </div>

  <div class="p-grid p-jc-center">
    <div class="p-col-6">
      <MultiSelect
        v-model="selectedTimeZones"
        :options="timezones"
        :filter="true"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Timezones"
        display="chip"
      />
    </div>
    <div class="p-col-6">
      <InputNumber
        id="minmax-buttons"
        v-model="numberOfCalculations"
        mode="decimal"
        showButtons
        :min="1"
        :max="30"
      />
    </div>
  </div>

  <div v-if="nextExecutionTimes.length > 0">
    <DataTable :value="nextExecutionTimes">
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { describe, nextExecutions } from "cron-verifier/dst/CronParser";
import json from "../json/timezones.json";
export default {
  name: "Main",
  data() {
    return {
      selectedTimeZones: null,
      isValid: true,
      description: "",
      cronExpression: "",
      nextExecutionTimes: [],
      numberOfCalculations: 5,
      timezones: json,
      columns: [{ field: "UTC", header: "UTC" }],
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
          this.numberOfCalculations
        );
        this.fillList(res);
      } catch (e) {
        this.isValid = false;
      }
    },
    fillList(executionTimes) {
      this.selectedTimeZones?.forEach(timezone => this.columns.push({field: timezone, header: timezone}))
      this.nextExecutionTimes = executionTimes.map((time) => {
        const converted = {};
        this.columns.forEach(
          (tz) =>
            (converted[tz.field] = time.toLocaleString("en-US", {
              timeZone: tz.field,
            }))
        );
        console.log(converted)
        return converted;
      });
      this.isValid = true;
    },
  },
};
</script>