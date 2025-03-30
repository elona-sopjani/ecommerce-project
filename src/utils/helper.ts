export function getLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key)
}

export function formattedDate(value: string | Date) {
  const date = new Date(value)

  if (isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return date.toLocaleString('en-US', options)
}
