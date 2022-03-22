export const dateToSting= (date: Date) => {
  return new Date(date).toISOString().replace(/T.*/, '').split('-').reverse().join('.')
}