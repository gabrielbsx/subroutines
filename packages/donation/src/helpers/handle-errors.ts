export async function onPromiseHandleWrapperPreventError(func: Function) {
  try {
    await func()
  } catch (error) {
    console.error(error)
  }
}