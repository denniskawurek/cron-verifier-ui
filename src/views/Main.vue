<template>
  <div class="p-grid">
    <div class="p-col">
      <h1>Cron verifier</h1>
      <p>
        Verify your crons and show next execution times over different
        timezones.
      </p>
    </div>
  </div>

  <div class="p-fluid p-formgrid p-grid p-jc-center">
    <div class="p-field p-col-6">
      <InputText
        class="p-inputtext-lg p-text-center"
        v-model="cronExpression"
        v-on:input="calculate"
        v-bind:class="{ 'p-success': isValid, 'p-invalid': !isValid }"
      ></InputText>
      <small class="p-error" v-if="!isValid">Invalid expression.</small>
    </div>
    <div class="p-col-2">
      <Button
        type="button"
        label="History"
        ref="historyPanel"
        icon="pi pi-clock"
        class="p-button-lg"
        iconPos="left"
        :showCloseIcon="true"
        :dismissable="true"
        @click="toggleHistory"
      />
      <OverlayPanel ref="historyPanel">
        <Listbox
          v-model="selectedHistoryElement"
          :options="history"
          optionLabel="value"
        />
      </OverlayPanel>
    </div>
  </div>

  <div class="p-grid p-jc-center">
    <div class="p-col">
      <MultiSelect
        v-model="selectedTimeZones"
        :options="timezones"
        :filter="true"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Timezones"
        display="chip"
        v-on:change="calculate"
      />
    </div>
    <div class="p-col">
      <Calendar
        v-model="startValue"
        :showTime="true"
        hourFormat="24"
        icon="pi pi-calendar-times"
        :showIcon="true"
        placeholder="max"
        v-on:date-select="calculate"
      />
    </div>
    <div class="p-col">
      <Calendar
        v-model="endValue"
        :showTime="true"
        hourFormat="24"
        icon="pi pi-calendar-times"
        :showIcon="true"
        placeholder="max"
        v-on:date-select="calculate"
      />
    </div>
    <div class="p-col">
      <InputNumber
        id="minmax-buttons"
        v-model="numberOfCalculations"
        v-on:input="calculate"
        mode="decimal"
        showButtons
        :min="1"
        :max="30"
      />
    </div>
  </div>
  <div class="p-fluid p-grid p-jc-center">
    <div class="p-col">
      <div v-if="isValid && description != ''" class="p-text-bold">
        <p>{{ description }}</p>
      </div>
    </div>
  </div>

  <div v-if="nextExecutionTimes.length > 0">
    <DataTable stripedRows :value="nextExecutionTimes" :scrollable="true">
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
      selectedHistoryElement: "",
      timezones: json,
      columns: [{ field: "UTC", header: "UTC" }],
      history: [],
      startValue: new Date(),
      endValue: null,
    };
  },
  methods: {
    calculate() {
      //this.cronExpression = e.target.value;
      try {
        this.description = describe(this.cronExpression);
        const calculatedExecutions = nextExecutions(
          this.cronExpression,
          this.startValue,
          this.endValue,
          this.numberOfCalculations
        );
        this.fillList(calculatedExecutions);
        this.history.push({ value: this.cronExpression });
      } catch (e) {
        this.isValid = false;
      }
    },
    fillList(calculatedExecutions) {
      this.columns = [{ field: "UTC", header: "UTC" }];
      this.selectedTimeZones?.forEach((timezone) =>
        this.columns.push({ field: timezone, header: timezone })
      );
      this.nextExecutionTimes = [];
      this.nextExecutionTimes = calculatedExecutions.map((time) => {
        const converted = {};
        this.columns.forEach(
          (tz) =>
            (converted[tz.field] = time.toLocaleString("en-US", {
              timeZone: tz.field,
            }))
        );
        return converted;
      });
      this.isValid = true;
    },
    toggleHistory(e) {
      this.$refs.historyPanel.toggle(e);
    },
  },
};
</script>