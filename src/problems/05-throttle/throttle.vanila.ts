// bun test src/problems/05-throttle/test/throttle.test.ts

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastTime: number = 0

  return function (this: unknown, ...args: any[]) {
    if (Date.now() >= lastTime + delay) {
      fn.apply(this, args)
      lastTime = Date.now()
    }
  }
}
// --- Examples ---
// Uncomment to test your implementation:

const log = throttle((msg: string) => console.log(msg), 300)
log('a') // fires immediately → "a"
log('b') // ignored (within 300ms)
log('c') // ignored (within 300ms)
setTimeout(() => log('d'), 400) // fires → "d" (300ms passed)
