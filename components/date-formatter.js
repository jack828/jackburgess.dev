import { parseISO, format } from 'date-fns'

export default function DateFormatter({ date }) {
  return (
    <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
  )
}
