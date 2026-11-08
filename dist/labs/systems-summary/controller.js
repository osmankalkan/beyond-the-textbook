import {escapeHtml as esc} from '../../core/html.js';
import {
  CHALLENGE_CARDS,
  SYSTEMS_METHODS,
  COMPARISON_MATRIX,
  evaluateSystemsDiagnostic
} from '../../models/systems-summary.js';

export function mount(root, initial = {}) {
  let context = initial;
  let activeTab = 'challenge'; // 'challenge' | 'matrix'
  let currentCardIndex = 0;
  const userAnswers = {}; // cardId -> { selectedMethodId, isCorrect, feedback }
  const events = new AbortController();
  const { signal } = events;

  const tr = (trText, enText) => ((context.lang || 'tr') === 'en' ? enText : trText);

  function render() {
    const lang = context.lang || 'tr';
    const card = CHALLENGE_CARDS[currentCardIndex];
    const cardResult = userAnswers[card.id];
    const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;

    root.innerHTML = `
      <section class="sep-lab sum-workbench systems-summary-workbench">
        <header class="cx-header">
          <p class="eyebrow">${esc(tr('BÖLÜM 7 ÖZET VE KARAR MOTORU', 'CHAPTER 7 SUMMARY & DECISION ENGINE'))}</p>
          <h2>${esc(tr('§7.5 Doğrusal Sistemler Karar Matrisi ve Teşhis Laboratuvarı', '§7.5 Linear Systems Decision Matrix & Diagnostic Workbench'))}</h2>
          <p>${esc(tr(
            'Operatör, Laplace dönüşümü ve matris yöntemlerini 10 temsilci sınav kartı üzerinde karşılaştırın; 60 saniyede en kısa çözüm yolunu belirleyin.',
            'Compare Operator, Laplace transform, and Matrix methods across 10 representative exam cards; fix the optimal reduction path in 60 seconds.'
          ))}</p>
        </header>

        <div class="panel sep-experiment sum-panel">
          <div class="sep-toolbar sum-tabs">
            <div class="segmented">
              <button type="button" class="sum-tab ${activeTab === 'challenge' ? 'active' : ''}" data-tab="challenge">
                <span>🎯</span> ${esc(tr('Teşhis Kartları (10 Soru)', 'Diagnostic Cards (10 Problems)'))}
              </button>
              <button type="button" class="sum-tab ${activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">
                <span>🗺️</span> ${esc(tr('Üç Yöntem Karşılaştırma Matrisi', 'Three-Method Comparison Matrix'))}
              </button>
            </div>
            <div class="sum-score-pill">
              <strong>${totalCorrect} / ${CHALLENGE_CARDS.length}</strong>
              <small>${esc(tr('Başarı Skoru', 'Mastery Score'))}</small>
            </div>
          </div>

          ${activeTab === 'challenge' ? renderChallengeView(card, cardResult, lang) : renderMatrixView(lang)}
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(tr('Teşhis kartlarını tamamladıktan sonra 22 puanlık çözümlü sınav kliniğini inceleyin.', 'After finishing the diagnostic cards, review the 22-point scored exam clinic.'))}</p>
          <a class="button primary" href="#practice">${esc(tr('Sınav Kliniğine Git →', 'Go to Exam Clinic →'))}</a>
        </footer>
      </section>
    `;
  }

  function renderChallengeView(card, cardResult, lang) {
    return `
      <div class="sum-challenge-view">
        <div class="sum-nav-strip" role="tablist">
          ${CHALLENGE_CARDS.map((c, idx) => {
            const ans = userAnswers[c.id];
            let statusClass = 'pending';
            let icon = `${idx + 1}`;
            if (ans) {
              if (ans.isCorrect) {
                statusClass = 'correct';
                icon = '✓';
              } else {
                statusClass = 'wrong';
                icon = '✕';
              }
            }
            const isCurrent = idx === currentCardIndex;
            return `
              <button type="button" class="sum-card-chip ${statusClass} ${isCurrent ? 'current' : ''}" data-card-idx="${idx}">
                <span>${icon}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="sum-equation-hero">
          <div class="sum-hero-meta">
            <span class="chapter-pill">${esc(card.title[lang] || card.title.tr)}</span>
          </div>
          <div class="sum-eq-display">
            <code>${esc(card.equation || card.latex)}</code>
          </div>
          <p class="sum-prompt">${esc(card.description[lang] || card.description.tr)}</p>
          <p class="sum-subprompt"><strong>${esc(tr('Bu problem için en hızlı ve en güvenli yöntem hangisidir?', 'Which method provides the fastest and safest solution path?'))}</strong></p>
        </div>

        <div class="sum-method-grid" role="group">
          ${SYSTEMS_METHODS.map(m => {
            const isSelected = cardResult && cardResult.selectedMethodId === m.id;
            const isCorrect = cardResult && cardResult.isCorrect && isSelected;
            const isWrong = cardResult && !cardResult.isCorrect && isSelected;
            let btnClass = 'sum-method-btn';
            if (isCorrect) btnClass += ' is-correct';
            if (isWrong) btnClass += ' is-wrong';
            return `
              <button type="button" class="${btnClass}" data-method-id="${m.id}">
                <span class="sum-badge">${esc(m.badge)}</span>
                <strong>${esc(m.name[lang] || m.name.tr)}</strong>
                <small><code>${esc(m.formula)}</code></small>
              </button>
            `;
          }).join('')}
        </div>

        ${cardResult ? renderFeedback(card, cardResult, lang) : ''}

        <div class="sum-card-actions">
          <button type="button" class="button secondary" data-action="prev" ${currentCardIndex === 0 ? 'disabled' : ''}>
            ← ${esc(tr('Önceki Kart', 'Previous Card'))}
          </button>
          <button type="button" class="button primary" data-action="next" ${currentCardIndex === CHALLENGE_CARDS.length - 1 ? 'disabled' : ''}>
            ${esc(tr('Sonraki Kart', 'Next Card'))} →
          </button>
        </div>
      </div>
    `;
  }

  function renderFeedback(card, cardResult, lang) {
    const isSuccess = cardResult.isCorrect;
    const alertClass = isSuccess ? 'is-success' : 'is-warning';
    const titleText = isSuccess ? tr('Tebrikler! Doğru Teşhis', 'Congratulations! Correct Diagnosis') : tr('Yeniden Değerlendir', 'Re-evaluate Choice');

    return `
      <div class="sum-feedback-banner ${alertClass}">
        <h4>${esc(titleText)}</h4>
        <p>${esc(cardResult.feedback[lang] || cardResult.feedback.tr)}</p>
      </div>
    `;
  }

  function renderMatrixView(lang) {
    return `
      <div class="sum-matrix-view">
        <h3>${esc(tr('Bölüm 7 Yöntemleri Karşılaştırmalı Değerlendirme Tablosu', 'Chapter 7 Methods Comparative Evaluation Table'))}</h3>
        <p>${esc(tr(
          'Diferansiyel denklem sistemlerinde doğru yöntemi seçmek, çözüm süresini dakikalardan saniyelere indirebilir. Aşağıdaki kriterler bu seçimin pusulasıdır:',
          'Selecting the optimal method for differential systems reduces solution times from tens of minutes to seconds. Use the criteria below as your compass:'
        ))}</p>

        <div class="table-responsive">
          <table class="table-card">
            <thead>
              <tr>
                <th>${esc(tr('Kriter / Boyut', 'Criterion / Dimension'))}</th>
                <th>${esc(tr('§7.2 Operatör Yöntemi', '§7.2 Operator Method'))}</th>
                <th>${esc(tr('§7.3 Laplace Dönüşümü', '§7.3 Laplace Transform'))}</th>
                <th>${esc(tr('§7.4 Matris Yöntemi', '§7.4 Matrix Method'))}</th>
              </tr>
            </thead>
            <tbody>
              ${COMPARISON_MATRIX.map(row => `
                <tr>
                  <td><strong>${esc(row.dimension[lang] || row.dimension.tr)}</strong></td>
                  <td>${esc(row.operator[lang] || row.operator.tr)}</td>
                  <td>${esc(row.laplace[lang] || row.laplace.tr)}</td>
                  <td>${esc(row.matrix[lang] || row.matrix.tr)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  root.addEventListener('click', e => {
    const tabBtn = e.target.closest('[data-tab]');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tab;
      render();
      return;
    }

    const cardChip = e.target.closest('[data-card-idx]');
    if (cardChip) {
      currentCardIndex = parseInt(cardChip.dataset.cardIdx, 10);
      render();
      return;
    }

    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const act = actionBtn.dataset.action;
      if (act === 'prev' && currentCardIndex > 0) {
        currentCardIndex--;
        render();
      } else if (act === 'next' && currentCardIndex < CHALLENGE_CARDS.length - 1) {
        currentCardIndex++;
        render();
      }
      return;
    }

    const methodBtn = e.target.closest('[data-method-id]');
    if (methodBtn) {
      const methodId = methodBtn.dataset.methodId;
      const card = CHALLENGE_CARDS[currentCardIndex];
      const evaluation = evaluateSystemsDiagnostic(card.id, methodId);
      userAnswers[card.id] = {
        selectedMethodId: methodId,
        isCorrect: evaluation.isOptimal,
        feedback: evaluation.feedback
      };
      render();
    }
  }, { signal });

  render();

  return {
    update(nextContext = {}) {
      context = { ...context, ...nextContext };
      render();
    },
    destroy() {
      events.abort();
      root.innerHTML = '';
    }
  };
}
