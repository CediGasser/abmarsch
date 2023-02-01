<script lang="ts">
  import { daysTotal, daysPassed, start } from "$lib/classes/Dates";

  type day = {
    passed: boolean;
    date: Date;
  }

  let daysArray: day[] = [];
  for (let i = 0; i <= daysTotal(); i++) {
    daysArray = [...daysArray, {
      passed: i < daysPassed(),
      date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000)
    }];
  }

  let months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ];
</script>

<div class="calendar-grid">
  <span class="day-label">Mo</span>
  <span class="day-label">Di</span>
  <span class="day-label">Mi</span>
  <span class="day-label">Do</span>
  <span class="day-label">Fr</span>
  <span class="day-label">Sa</span>
  <span class="day-label">So</span>

  {#each daysArray as day}
    <span 
      class="grid-item" 
      class:passed={day.passed} 
      data-month={months[day.date.getMonth()]} 
      class:first-of-month={day.date.getDate() === 1}>

      {day.date.getDate()}
    </span>
  {/each}
</div>

<style>
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-gap: 0.5rem;
    padding: 0.5rem;
    overflow: scroll;
  }

  .day-label {
    font-weight: 800;
    font-size: 0.75rem;
    text-align: center;
  }

  .grid-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .passed {
    background-color: var(--color-primary);
    --color-text: var(--color-primary-contrast);
    color: var(--color-text);
  }

  .first-of-month {
    font-weight: 800;
  }

  .first-of-month::after {
    content: attr(data-month);
    font-size: 0.5rem;
    font-weight: 400;
    color: var(--color-text);
    position: relative;
    display: flex;
    top: -0.5rem;
    left: 0.5rem;
  }
</style>