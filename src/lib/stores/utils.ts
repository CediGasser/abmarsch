export const shuffleArray = (array: any[]) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export const scrollIntoView = (element: HTMLElement, options?: ScrollIntoViewOptions) => {
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options,
    })
  }
}
