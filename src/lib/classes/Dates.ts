export const end = new Date('2023-05-19')
export const start = new Date('2023-01-16')

export const daysLeft = () => {
  const diff = end.getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}

export const daysPassed = () => {
  const diff = new Date().getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}

export const daysTotal = () => {
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}