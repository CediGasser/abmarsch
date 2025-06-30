import { browser } from '$app/environment'

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

declare global {
  interface Window {
    umami: any
  }
}

export const trackEvent = (name: string, props?: object) => {
  if (!browser) return
  if (!window) return
  if (!window.umami) return

  if (props) {
    window.umami.track(name, props)
  } else {
    window.umami.track(name)
  }
}
