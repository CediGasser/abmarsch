<script lang="ts">
  import { daysTotal, daysPassed, startDate } from "$lib/stores/Dates";

  type day = {
    isPassed: boolean;
    isToday: boolean;
    date: Date;
    text: string;
  }

  let daysArray: day[] = [];
  $: if ($daysTotal) {
    daysArray = Array($daysTotal + 1).fill('').map((_, i) => ({
      isPassed: i + 1 < $daysPassed,
      isToday: i + 1 === $daysPassed,
      date: new Date($startDate.getTime() + i * 24 * 60 * 60 * 1000),
      text: new Date($startDate.getTime() + i * 24 * 60 * 60 * 1000).getDate().toString()
    }));
    
    // fill up the first week with empty days
    let daysToAdd = daysArray[0].date.getDay() - 1;
    if (daysToAdd < 0) {
      daysToAdd = 6;
    }
    
    for (let i = 0; i < daysToAdd; i++) {
      daysArray.unshift({
        isPassed: false,
        isToday: false,
        date: new Date(daysArray[0].date.getTime() - 24 * 60 * 60 * 1000),
        text: ' '
      });
      daysArray = daysArray
    }
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

  {#each daysArray as day (day.date)}
    <span
      class="grid-item" 
      class:passed={day.isPassed} 
      class:today={day.isToday}
      class:first-of-month={day.date.getDate() === 1}
      data-month={months[day.date.getMonth()]} >

      {day.text}
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
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .day-label {
    font-weight: 800;
    font-size: 0.75rem;
    text-align: center;
  }

  .grid-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    height: 3rem;
    width: 2.5rem;
  }

  .passed {
    background-color: var(--color-primary);
    --color-text: var(--color-primary-contrast);
    color: var(--color-text);
  }

  .today {
    background-color: lightgrey;
    --color-text: var(--color-primary);
    color: var(--color-text);
    border: 1px solid var(--color-primary);
  }

  .grid-item:last-child {
    border: 1px solid var(--color-primary);
    box-shadow: 0 0 16px 8px gold;
  }

  .grid-item:last-child.today {
    border: 1px solid var(--color-primary);
    box-shadow: 0 0 16px 8px gold;
    background: linear-gradient(
      rgba(255,0,0,1) 0%, 
      rgba(255,154,0,1) 10%, 
      rgba(208,222,33,1) 20%, 
      rgba(79,220,74,1) 30%, 
      rgba(63,218,216,1) 40%, 
      rgba(47,201,226,1) 50%, 
      rgba(28,127,238,1) 60%, 
      rgba(95,21,242,1) 70%, 
      rgba(186,12,248,1) 80%, 
      rgba(251,7,217,1) 90%, 
      rgba(255,0,0,1) 100%) 0 0/100% 200%;
    animation: rainbow 5s linear infinite;
  }

  @keyframes rainbow {
    to {background-position:0 -200%}
  }

  .first-of-month {
    font-weight: 900;
  }

  .first-of-month::after {
    content: attr(data-month);
    font-size: 0.5rem;
    font-weight: 400;
    color: var(--color-text);
    display: block;
  }
</style>