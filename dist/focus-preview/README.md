# Focus interface and design prototype

Open http://127.0.0.1:4317/focus-preview/index.html after running npm start. Use the port printed by the server if 4317 is busy.

study-tools.html is a seven-screen design prototype with independent browser storage under btt-focus-preview. The lesson is a compact §3.1 sample, not a replacement for the complete course. Existing course progress is not imported. Timer state lasts for the current page session; theme, language, reading completion and latest quiz answers persist when browser storage is available.

## Files in delivery order

1. tokens.css — exact requested palette, typography and accessible ink variants.
2. study-tools.html and styles.css — responsive shell, focus mode, reading progress, reusable visual components.
3. app.js — home(), lesson(), quiz(), timer(), progress(), flashcards(), settings().
4. content.js — stable quiz and flashcard content.
5. i18n.js — bilingual navigation and two-sentence design rationale for every screen.

KaTeX 0.16.11 and Source Sans 3 / Source Serif 4 load from CDNs, following the explicit typography request. A readable formula and system-font fallback remains available when network access is unavailable. This prototype therefore has an external rendering dependency, unlike the main course.

The original soft palette is preserved. Additional ink tokens are used for small text and feedback where the exact base swatch is too low-contrast. Main actions and progress use amber. Topic-review bars use teal, paired with explicit outcome text.

Each screen ends with an expandable two-sentence explanation in Turkish and English. These explanations are hidden during focus mode.

The 25/5 timer uses an absolute deadline to avoid background interval drift. It pauses at completion and waits for the learner to start the next phase. Sound is opt-in and can be affected by browser background audio policies.

## Default integrated interface

The preview entry now opens ../index.html?ui=focus&lesson=xie-2010%3A3.1#lab.
This uses the real course application, including its existing progress and note storage, lab controllers, cooling/building modes, A/B comparison, calibration, worked problems and exports.
The notebook presentation is now the default at the application root. Use ?ui=classic to inspect the previous interface. tokens.css is shared; lab-theme.css restyles the course shell and notebook-lab.css defines the approved notebook layout; lab-shell.js adds theme/focus/font controls and concise bilingual labels. work-clock.js provides the shared stopwatch and 25/5 timer, which survives in-page navigation and resets on a full reload. study-tools.html retains the earlier seven-screen independent prototype.
Desktop and 390px mobile cooling/building flows were inspected. Other lessons use the same application but have not all received a complete visual audit.
