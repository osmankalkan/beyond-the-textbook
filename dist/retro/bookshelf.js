import { localizeBook, countLessonProgress } from '../content.js';
import { escapeHtml as escape } from '../core/html.js';

export function createBookshelf(dialog, onOpenLesson, onOpenMap) {
  const title = dialog.querySelector('h2');
  const body = dialog.querySelector('.shelf-dialog-body');
  const back = dialog.querySelector('[data-shelf-back]');
  const close = dialog.querySelector('[data-shelf-close]');
  let books, progress, translate, language, book, selected, opener;

  function showBook() {
    body.innerHTML = `<article class="shelf-preview">
      <p class="eyebrow">${escape(book.author)} · ${escape(book.publisher)} · ${escape(book.year)}</p>
      <h3>${escape(book.title)}</h3>
      <p>${escape(book.summary)}</p>
      <p class="shelf-book-count">${escape(translate('retroBookCoverage', book.chapters.length, book.lessons.length))}</p>
      <div class="shelf-book-actions">
        <button type="button" class="button primary" data-shelf-contents>${escape(translate('retroShowContents'))} →</button>
        <button type="button" class="button secondary" data-shelf-map>${escape(translate('navMap'))}</button>
      </div>
    </article>`;
    back.hidden = true;
    dialog.scrollTop = 0;
  }

  function showContents(activeLesson) {
    const groups = new Map();
    for (const lesson of book.lessons) {
      if (!groups.has(lesson.chapterNumber)) groups.set(lesson.chapterNumber, []);
      groups.get(lesson.chapterNumber).push(lesson);
    }
    body.innerHTML = `<div class="shelf-chapters">${[...groups].map(([number, lessons]) =>
      `<details class="shelf-chapter" ${activeLesson?.chapterNumber === number ? 'open' : ''}>
        <summary><span class="shelf-chapter-number">${escape(number)}</span><span><strong>${escape(lessons[0].chapterTitle)}</strong><small>${escape(translate('retroReadyLessons', lessons.length))}</small></span><span class="shelf-chapter-disclosure" aria-hidden="true"></span></summary>
        <ul class="shelf-contents">${lessons.map(lesson =>
          `<li><button type="button" data-preview-lesson="${escape(lesson.id)}"><span>§${escape(lesson.section)}</span><strong>${escape(lesson.title)}</strong><span aria-hidden="true">→</span></button></li>`
        ).join('')}</ul>
      </details>`
    ).join('')}</div>`;
    selected = null;
    back.textContent = translate('retroBackToBook');
    back.hidden = false;
    dialog.scrollTop = 0;
  }

  function showPreview(lesson) {
    selected = lesson;
    title.textContent = book.shortTitle || book.title;
    const stats = countLessonProgress(progress[lesson.id], lesson);
    const highlights = lesson.highlights || [];
    body.innerHTML = `<article class="shelf-preview">
      <p class="eyebrow">§${escape(lesson.section)} · ${escape(translate('progressPill', stats.completed, stats.total))}</p>
      <h3>${escape(lesson.title)}</h3>
      <p>${escape(lesson.subtitle)}</p>
      ${highlights.length ? `<ul>${highlights.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}
      <button type="button" class="button primary" data-shelf-start>${escape(translate('retroStartLesson'))} →</button>
    </article>`;
    back.textContent = translate('retroBackToContents');
    back.hidden = false;
    dialog.scrollTop = 0;
    body.querySelector('[data-shelf-start]').focus({ preventScroll: true });
  }

  back.addEventListener('click', () => {
    if (!selected) {
      showBook();
      body.querySelector('[data-shelf-contents]').focus();
      return;
    }
    const lesson = selected;
    showContents(lesson);
    [...body.querySelectorAll('[data-preview-lesson]')].find(button => button.dataset.previewLesson === lesson.id)?.focus();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  body.addEventListener('click', event => {
    if (event.target.closest('[data-shelf-contents]')) {
      showContents();
      body.querySelector('summary')?.focus();
    }
    const preview = event.target.closest('[data-preview-lesson]');
    if (preview) showPreview(book.lessons.find(lesson => lesson.id === preview.dataset.previewLesson));
    if (event.target.closest('[data-shelf-start]')) {
      dialog.close();
      onOpenLesson(selected.id, 'lesson');
    }
    if (event.target.closest('[data-shelf-map]')) {
      dialog.close();
      onOpenMap(book.id);
    }
  });

  return {
    render(root, catalog, lang, store, t) {
      language = lang;
      books = catalog;
      progress = store;
      translate = t;
      close.textContent = t('retroClose');
      root.innerHTML = catalog.map(raw => {
        const item = localizeBook(raw, lang);
        const icon = item.id === 'kurose-ross-8e' ? 'network' : 'books';
        return `<button type="button" class="shelf-book" data-toggle-book="${escape(item.id)}" aria-haspopup="dialog">
          <img src="retro/${icon}.png" alt="">
          <span><strong>${escape(item.shortTitle || item.title)}</strong><small>${escape(item.author)} · ${escape(t('retroReadyLessons', item.lessons.length))}</small></span>
          <span aria-hidden="true">↗</span>
        </button>`;
      }).join('');
    },
    open(id, trigger) {
      book = localizeBook(books.find(item => item.id === id), language);
      opener = trigger;
      title.textContent = book.shortTitle || book.title;
      selected = null;
      showBook();
      dialog.showModal();
    }
  };
}
