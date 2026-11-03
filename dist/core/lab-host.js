/** Small lifecycle boundary: labs own their DOM and subscriptions, not navigation. */
export function createLabHost(loaders) {
  let active = null;
  let generation = 0;
  let aborter = null;

  async function show(family, root, context) {
    if (!Object.hasOwn(loaders, family)) throw new Error(`Unknown lab family: ${family}`);
    if (active?.family === family && active.root === root) {
      active.instance.update(context);
      return;
    }
    const request = ++generation;
    aborter?.abort();
    active?.instance.destroy();
    active = null;
    const controller = new AbortController();
    aborter = controller;
    const module = await loaders[family]();
    if (request !== generation) return;
    const instance = await module.mount(root, {...context, signal: controller.signal});
    if (request !== generation) {
      instance?.destroy();
      return;
    }
    if (!instance || typeof instance.update !== 'function' || typeof instance.destroy !== 'function') {
      controller.abort();
      throw new Error(`Lab ${family} must implement update(context) and destroy()`);
    }
    active = {family, root, instance};
  }

  function destroy() {
    ++generation;
    aborter?.abort();
    active?.instance.destroy();
    active = null;
  }
  return {show, destroy};
}
