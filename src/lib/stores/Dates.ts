import { derived } from 'svelte/store'
import storedWritable from '@efstajas/svelte-stored-writable'
import { z } from 'zod'
import { browser } from '$app/environment'

const DEFAULT_END_DATE = new Date('2023-11-03')
const DEFAULT_START_DATE = new Date('2023-01-16')

export const endDate = storedWritable('endDate', z.coerce.date(), DEFAULT_END_DATE, !browser)
export const startDate = storedWritable('startDate', z.coerce.date(), DEFAULT_START_DATE, !browser)

export const daysLeft = derived([endDate], ([$endDate]) => {
  const diff = $endDate.getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
})

export const daysPassed = derived([startDate], ([$startDate]) => {
  const diff = new Date().getTime() - $startDate.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
})

export const daysTotal = derived([startDate, endDate], ([$startDate, $endDate]) => {
  const diff = $endDate.getTime() - $startDate.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24)) + 1 // +1 because we count the start date
})