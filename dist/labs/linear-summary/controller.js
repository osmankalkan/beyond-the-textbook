import {escapeHtml as esc} from '../../core/html.js';
import {LINEAR_CHALLENGE_CARDS, evaluateLinearDiagnostic, LINEAR_METHODS} from '../../models/linear-summary.js';

export function mount(root, initial) {
  let context = initial;
  let activeTab = 'challenge'; // 'challenge' | 'matrix'
  let currentCardIndex = 0;
  const userAnswers = {}; // cardId -> { selectedMethodId, isCorrect }
  let activeCategory = 'all'; // 'all' | 'homogeneous' | 'operator' | 'general-euler'
  const events = new AbortController();

  const tr = (trText, enText) => (context.lang === 'en' ? enText : trText);

  function render() {
    const card = LINEAR_CHALLENGE_CARDS[currentCardIndex];
    const cardResult = userAnswers[card.id];
    const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;

    root.innerHTML = `
      <section class="sep-lab sum-workbench">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('lsumEyebrow'))}</p>
          <h2>${esc(context.t('lsumTitle'))}</h2>
          <p>${esc(context.t('lsumSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment sum-panel">
          <div class="sep-toolbar sum-tabs">
            <div class="segmented">
              <button type="button" class="sum-tab ${activeTab === 'challenge' ? 'active' : ''}" data-tab="challenge">
                <span>🎯</span> ${esc(context.t('lsumTabChallenge'))}
              </button>
              <button type="button" class="sum-tab ${activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">
                <span>🗺️</span> ${esc(context.t('lsumTabMatrix'))}
              </button>
            </div>
            <div class="sum-score-pill">
              <strong>${totalCorrect} / ${LINEAR_CHALLENGE_CARDS.length}</strong>
              <small>${esc(context.t('lsumMasteryProgress'))}</small>
            </div>
          </div>

          ${activeTab === 'challenge' ? renderChallengeView(card, cardResult) : renderMatrixView()}
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(context.t('lsumFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('lsumGoToExamClinic'))}</a>
        </footer>
      </section>
    `;
  }

  function renderChallengeView(card, cardResult) {
    return `
      <div class="sum-challenge-view">
        <!-- Card Navigation Strip -->
        <div class="sum-nav-strip" role="tablist" aria-label="${esc(context.t('lsumSelectEquation'))}">
          ${LINEAR_CHALLENGE_CARDS.map((c, idx) => {
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
              <button type="button" class="sum-card-chip ${statusClass} ${isCurrent ? 'current' : ''}" data-card-idx="${idx}" title="${esc(c.equation)}">
                <span>${icon}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Active Equation Hero Card -->
        <div class="sum-equation-hero">
          <div class="sum-hero-meta">
            <span class="chapter-pill">${esc(card.tag)}</span>
            <small class="sum-order-badge">${tr('Mertebe', 'Order')} ${card.order} · ${esc(tr(card.rhsType.tr, card.rhsType.en))}</small>
          </div>
          <div class="sum-eq-display">
            <code>${esc(card.equation)}</code>
          </div>
          <p class="sum-prompt">${esc(context.t('lsumChooseBestMethodPrompt'))}</p>
        </div>

        <!-- 10 Method Selection Grid -->
        <div class="sum-method-grid" role="group" aria-label="${esc(context.t('lsumAvailableMethods'))}">
          ${LINEAR_METHODS.map(m => {
            const isSelected = cardResult && cardResult.selectedMethodId === m.id;
            const isCorrect = cardResult && cardResult.isCorrect && isSelected;
            const isWrong = cardResult && !cardResult.isCorrect && isSelected;
            let btnClass = 'sum-method-btn';
            if (isCorrect) btnClass += ' is-correct';
            if (isWrong) btnClass += ' is-wrong';
            return `
              <button type="button" class="${btnClass}" data-method-id="${m.id}">
                <span class="sum-badge">${esc(m.badge)}</span>
                <strong>${esc(tr(m.name.tr, m.name.en))}</strong>
                <small><code>${esc(m.formula)}</code></small>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Pedagogical Feedback Container -->
        ${cardResult ? renderFeedback(card, cardResult) : ''}

        <!-- Next / Prev Controls -->
        <div class="sum-card-actions">
          <button type="button" class="button secondary" data-action="prev" ${currentCardIndex === 0 ? 'disabled' : ''}>
            ← ${esc(context.t('lsumPrevCard'))}
          </button>
          <button type="button" class="button primary" data-action="next" ${currentCardIndex === LINEAR_CHALLENGE_CARDS.length - 1 ? 'disabled' : ''}>
            ${esc(context.t('lsumNextCard'))} →
          </button>
        </div>
      </div>
    `;
  }

  function renderFeedback(card, result) {
    const evalData = evaluateLinearDiagnostic(card.id, result.selectedMethodId);
    if (result.isCorrect) {
      return `
        <div class="sum-feedback correct" role="alert">
          <div class="sum-fb-header">
            <span class="sum-fb-icon">✓</span>
            <div>
              <h3>${esc(context.t('lsumCorrectMethodTitle'))}: ${esc(tr(evalData.correctMethod.name.tr, evalData.correctMethod.name.en))}</h3>
              <p>${esc(tr(evalData.why.tr, evalData.why.en))}</p>
            </div>
          </div>
          <div class="sum-fb-details">
            <div class="sum-fb-step">
              <strong>1. ${esc(context.t('lsumFirstMoveLabel'))}:</strong>
              <code>${esc(tr(evalData.firstMove.tr, evalData.firstMove.en))}</code>
            </div>
            <div class="sum-fb-step">
              <strong>2. ${esc(context.t('lsumReducedFormLabel'))}:</strong>
              <code>${esc(tr(evalData.reducedForm.tr, evalData.reducedForm.en))}</code>
            </div>
            <div class="sum-fb-step trap">
              <strong>⚠️ ${esc(context.t('lsumCriticalTrapLabel'))}:</strong>
              <span>${esc(tr(evalData.trap.tr, evalData.trap.en))}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="sum-feedback wrong" role="alert">
          <div class="sum-fb-header">
            <span class="sum-fb-icon">✕</span>
            <div>
              <h3>${esc(context.t('lsumIncorrectMethodTitle'))}</h3>
              <p>${esc(context.t('lsumIncorrectMethodTip'))}</p>
            </div>
          </div>
          <div class="sum-fb-details">
            <p>${esc(context.t('lsumThinkAboutStructure'))}</p>
            <button type="button" class="button secondary sum-retry-btn" data-action="retry">
              ${esc(context.t('lsumTryAgain'))}
            </button>
          </div>
        </div>
      `;
    }
  }

  function renderMatrixView() {
    const filteredMethods = activeCategory === 'all'
      ? LINEAR_METHODS
      : LINEAR_METHODS.filter(m => m.category === activeCategory);

    return `
      <div class="sum-matrix-view">
        <div class="sum-filter-tabs">
          <button type="button" class="sum-filter-btn ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
            ${esc(context.t('lsumCatAll'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'homogeneous' ? 'active' : ''}" data-cat="homogeneous">
            ${esc(context.t('lsumCatHomogeneous'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'operator' ? 'active' : ''}" data-cat="operator">
            ${esc(context.t('lsumCatOperator'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'general-euler' ? 'active' : ''}" data-cat="general-euler">
            ${esc(context.t('lsumCatGeneralEuler'))}
          </button>
        </div>

        <div class="sum-matrix-grid">
          ${filteredMethods.map(m => {
            const card = LINEAR_CHALLENGE_CARDS.find(c => c.correctMethod === m.id);
            return `
              <article class="sum-matrix-card">
                <header>
                  <span class="sum-badge">${esc(m.badge)}</span>
                  <h4>${esc(tr(m.name.tr, m.name.en))}</h4>
                </header>
                <div class="sum-card-body">
                  <div class="sum-row">
                    <span class="sum-meta-label">${esc(context.t('lsumMatrixCanonicalForm'))}:</span>
                    <code>${esc(m.formula)}</code>
                  </div>
                  ${card ? `
                    <div class="sum-row">
                      <span class="sum-meta-label">${esc(context.t('lsumFirstMoveLabel'))}:</span>
                      <span>${esc(tr(card.firstMove.tr, card.firstMove.en))}</span>
                    </div>
                    <div class="sum-row">
                      <span class="sum-meta-label">${esc(context.t('lsumReducedFormLabel'))}:</span>
                      <code>${esc(tr(card.reducedForm.tr, card.reducedForm.en))}</code>
                    </div>
                    <div class="sum-row trap">
                      <span class="sum-meta-label">⚠️ ${esc(context.t('lsumCriticalTrapLabel'))}:</span>
                      <span>${esc(tr(card.trap.tr, card.trap.en))}</span>
                    </div>
                  ` : ''}
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  root.addEventListener('click', event => {
    const tabBtn = event.target.closest('[data-tab]');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tab;
      render();
      return;
    }

    const catBtn = event.target.closest('[data-cat]');
    if (catBtn) {
      activeCategory = catBtn.dataset.cat;
      render();
      return;
    }

    const cardChip = event.target.closest('[data-card-idx]');
    if (cardChip) {
      currentCardIndex = +cardChip.dataset.cardIdx;
      render();
      return;
    }

    const methodBtn = event.target.closest('[data-method-id]');
    if (methodBtn) {
      const selectedId = methodBtn.dataset.methodId;
      const currentCard = LINEAR_CHALLENGE_CARDS[currentCardIndex];
      const evalData = evaluateLinearDiagnostic(currentCard.id, selectedId);
      userAnswers[currentCard.id] = {
        selectedMethodId: selectedId,
        isCorrect: evalData.isCorrect
      };
      render();
      return;
    }

    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      if (action === 'prev' && currentCardIndex > 0) {
        currentCardIndex--;
        render();
      } else if (action === 'next' && currentCardIndex < LINEAR_CHALLENGE_CARDS.length - 1) {
        currentCardIndex++;
        render();
      } else if (action === 'retry') {
        const currentCard = LINEAR_CHALLENGE_CARDS[currentCardIndex];
        delete userAnswers[currentCard.id];
        render();
      }
    }
  }, {signal: events.signal});

  render();
  return {
    update(next) {
      context = next;
      render();
    },
    destroy() {
      events.abort();
      root.replaceChildren();
    }
  };
}
