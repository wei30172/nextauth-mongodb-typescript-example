import { getUserSession } from '@/lib/actions/auth.actions'

export default async function Dashboard() {
  const { session } = await getUserSession()
  // console.log(session)

  return (
    <h1>{`Hi, ${session?.user?.name}.`} Welcome to the Dashboard</h1>
  )
}