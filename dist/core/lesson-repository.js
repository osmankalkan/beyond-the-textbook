/** Asset loading is independent of DOM rendering, routing and lesson identity. */
export function createLessonRepository(fetcher = (...args) => fetch(...args)) {
  const pending = new Map();
  function get(path, type) {
    const key = `${type}:${path}`;
    if (!pending.has(key)) {
      const promise = Promise.resolve().then(() => fetcher(path)).then(response => {
        if (!response.ok) throw new Error(`Lesson asset unavailable: ${path}`);
        return type === 'json' ? response.json() : response.text();
      }).catch(error => {pending.delete(key); throw error;});
      pending.set(key, promise);
    }
    return pending.get(key);
  }
  return {
    loadMath: path => get(path, 'json'),
    async load(lesson) {
      const [markdown, formulas] = await Promise.all([get(lesson.lessonPath, 'text'), get(lesson.mathPath, 'json')]);
      for (const match of markdown.matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)) {
        if (!formulas[match[1].trim()]) throw new Error(`Missing reviewed formula: ${match[1].trim()}`);
      }
      return {markdown, formulas};
    }
  };
}
