import { writeFileSync } from 'fs';
import { PrismaClient } from '@prisma/client'
import { onPromiseHandleWrapperPreventError } from '../helpers/handle-errors'

const prisma = new PrismaClient()

async function handleUserDoesntHasGameAccounts() {
  const users = await prisma.user.findMany({
    include: {
      GameAccount: true
    },
  })
  console.log('--- users ---', users.length)
  const usersThatDoesntHasGameAccounts = users.filter(user => user.GameAccount.length === 0)
  console.log('--- users that doesnt has game accounts ---', usersThatDoesntHasGameAccounts.length)
  const usersThatDoesntHasGameAccountsIds = usersThatDoesntHasGameAccounts.map(user => user.id)
  console.log('--- users that doesnt has game accounts ids ---', usersThatDoesntHasGameAccountsIds.length)
  writeFileSync('users-that-doesnt-has-game-accounts-ids.json', JSON.stringify(usersThatDoesntHasGameAccountsIds))
  console.log('--- users that doesnt has game accounts ---')
}

export const handleUnusedEmail = () => {
  console.log('--- handling unused email ---')
  onPromiseHandleWrapperPreventError(handleUserDoesntHasGameAccounts)
}
