import { registerAction, removeUserAction } from '@/lib/actions'
import { Spinner } from '@nextui-org/spinner'
import { db } from '@/lib/prisma'

export default async function Home () {
  const users = await db.user.findMany()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Hola!</h1>
      <Spinner color='danger' />
      <form action={() => registerAction}>
        <input type='email' name='email' required />
        <input type='text' name='name' />
        <button>Submit!</button>
      </form>
      <p>Users:</p>
      {users.map(({ id, email, name }) => (
        <form key={id} action={() => removeUserAction}>
          <p>{id}: {email} / {name}</p>
          <input type='hidden' name='id' defaultValue={id} />
          <button>Remove</button>
        </form>
      ))}
    </main>
  )
}
