import { parseISO, format } from 'date-fns'

const DateFormatter = ({ date }) => {
  return <time dateTime={date}>{format(parseISO(date), 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
