import PageTitle from '@/components/PageTitle'

export default function DraftHeader({ visible }) {
  if (!visible) return null
  return (
    <div className="my-12 text-center">
      <PageTitle>
        <span role="img" aria-label="roadwork sign">
          🚧
        </span>{' '}
        Under Construction{' '}
        <span role="img" aria-label="roadwork sign">
          🚧
        </span>
      </PageTitle>
    </div>
  )
}
