import { LocalDateStorage } from './storage.svelte'

const DEFAULT_START_DATE = new Date('2025-06-30')
const DEFAULT_END_DATE = new Date('2025-10-31')

class Dates {
  #startDate = new LocalDateStorage('startDate', DEFAULT_START_DATE)
  #endDate = new LocalDateStorage('endDate', DEFAULT_END_DATE)
  daysLeft = $derived.by(() => {
    const diff = this.endDate.getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  })
  daysPassed = $derived.by(() => {
    const diff = new Date().getTime() - this.startDate.getTime()
    if (diff >= 0) {
      return Math.ceil(diff / (1000 * 3600 * 24))
    } else {
      return Math.floor(diff / (1000 * 3600 * 24))
    }
  })
  daysTotal = $derived.by(() => {
    const diff = this.endDate.getTime() - this.startDate.getTime()
    return Math.ceil(diff / (1000 * 3600 * 24)) + 1 // +1 because we count the start date
  })

  get startDate() {
    return this.#startDate.current
  }

  set startDate(value) {
    this.#startDate.current = value
  }

  get endDate() {
    return this.#endDate.current
  }

  set endDate(value) {
    this.#endDate.current = value
  }
}

export const getDates = () => {
  return new Dates()
}
