import { tick } from 'svelte'

export class LocalStorage<T> {
  #key: string
  #listeners = 0
  #value: T | undefined = $state()

  #handler = (e: StorageEvent) => {
    if (e.storageArea !== localStorage) return
    if (e.key !== this.#key) return

    const storedValue =
      typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem(this.#key) as any)
        : this.#value

    this.#value = storedValue
  }

  constructor(key: string, initial?: T) {
    this.#key = key

    this.#value =
      typeof localStorage !== 'undefined' && localStorage.getItem(this.#key)
        ? JSON.parse(localStorage.getItem(this.#key) as string)
        : initial
  }

  get current(): T {
    if ($effect.tracking()) {
      $effect(() => {
        if (this.#listeners === 0) {
          window.addEventListener('storage', this.#handler)
        }

        this.#listeners += 1

        return () => {
          tick().then(() => {
            this.#listeners -= 1
            if (this.#listeners === 0) {
              window.removeEventListener('storage', this.#handler)
            }
          })
        }
      })
    }

    $effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.#key, JSON.stringify(this.#value))
      }
    })

    return this.#value as T
  }

  set current(value) {
    console.log('setting value')
    this.#value = value
  }
}

export class LocalDateStorage extends LocalStorage<Date> {
  #value: Date = $derived(new Date(super.current))

  constructor(key: string, initial?: Date) {
    super(key, initial)
  }

  get current(): Date {
    return this.#value
  }

  set current(value: Date) {
    super.current = value
  }
}
