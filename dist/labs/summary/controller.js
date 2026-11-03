import {escapeHtml as esc} from '../../core/html.js';
import {CHALLENGE_CARDS, evaluateDiagnostic, METHODS} from '../../models/summary.js';

export function mount(root, initial) {
  let context = initial;
  let activeTab = 'challenge'; // 'challenge' | 'matrix'
  let currentCardIndex = 0;
  const userAnswers = {}; // cardId -> { selectedMethodId, isCorrect }
  let activeCategory = 'all'; // 'all' | 'first-order' | 'special' | 'higher-order'
  const events = new AbortController();

  const tr = (trText, enText) => (context.lang === 'en' ? enText : trText);

  function getCategory(methodId) {
    if (['separable', 'linear', 'bernoulli', 'homogeneous'].includes(methodId)) return 'first-order';
    if (['exact', 'integrating-factor', 'solvable-x', 'clairaut'].includes(methodId)) return 'special';
    return 'higher-order';
  }

  function render() {
    const card = CHALLENGE_CARDS[currentCardIndex];
    const cardResult = userAnswers[card.id];
    const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;

    root.innerHTML = `
      <section class="sep-lab sum-workbench">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('sumEyebrow'))}</p>
          <h2>${esc(context.t('sumTitle'))}</h2>
          <p>${esc(context.t('sumSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment sum-panel">
          <div class="sep-toolbar sum-tabs">
            <div class="segmented">
              <button type="button" class="sum-tab ${activeTab === 'challenge' ? 'active' : ''}" data-tab="challenge">
                <span>🎯</span> ${esc(context.t('sumTabChallenge'))}
              </button>
              <button type="button" class="sum-tab ${activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">
                <span>🗺️</span> ${esc(context.t('sumTabMatrix'))}
              </button>
            </div>
            <div class="sum-score-pill">
              <strong>${totalCorrect} / ${CHALLENGE_CARDS.length}</strong>
              <small>${esc(context.t('sumMasteryProgress'))}</small>
            </div>
          </div>

          ${activeTab === 'challenge' ? renderChallengeView(card, cardResult) : renderMatrixView()}
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(context.t('sumFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('sumGoToExamClinic'))}</a>
        </footer>
      </section>
    `;
  }

  function renderChallengeView(card, cardResult) {
    return `
      <div class="sum-challenge-view">
        <!-- Card Navigation Strip -->
        <div class="sum-nav-strip" role="tablist" aria-label="${esc(context.t('sumSelectEquation'))}">
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
              <button type="button" class="sum-card-chip ${statusClass} ${isCurrent ? 'current' : ''}" data-card-idx="${idx}" title="${c.equation}">
                <span>${icon}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Active Equation Hero Card -->
        <div class="sum-equation-hero">
          <div class="sum-hero-meta">
            <span class="chapter-pill">${card.tag}</span>
            <small class="sum-order-badge">${tr('Mertebe', 'Order')} ${card.order} · ${card.isLinear ? tr('Doğrusal', 'Linear') : tr('Doğrusal Değil', 'Nonlinear')}</small>
          </div>
          <div class="sum-eq-display">
            <code>${esc(card.equation)}</code>
          </div>
          <p class="sum-prompt">${esc(context.t('sumChooseBestMethodPrompt'))}</p>
        </div>

        <!-- 10 Method Selection Grid -->
        <div class="sum-method-grid" role="group" aria-label="${esc(context.t('sumAvailableMethods'))}">
          ${METHODS.map(m => {
            const isSelected = cardResult && cardResult.selectedMethodId === m.id;
            const isCorrect = cardResult && cardResult.isCorrect && isSelected;
            const isWrong = cardResult && !cardResult.isCorrect && isSelected;
            let btnClass = 'sum-method-btn';
            if (isCorrect) btnClass += ' is-correct';
            if (isWrong) btnClass += ' is-wrong';
            return `
              <button type="button" class="${btnClass}" data-method-id="${m.id}">
                <span class="sum-badge">${m.badge}</span>
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
            ← ${esc(context.t('sumPrevCard'))}
          </button>
          <button type="button" class="button primary" data-action="next" ${currentCardIndex === CHALLENGE_CARDS.length - 1 ? 'disabled' : ''}>
            ${esc(context.t('sumNextCard'))} →
          </button>
        </div>
      </div>
    `;
  }

  function renderFeedback(card, result) {
    const evalData = evaluateDiagnostic(card.id, result.selectedMethodId);
    if (result.isCorrect) {
      return `
        <div class="sum-feedback correct" role="alert">
          <div class="sum-fb-header">
            <span class="sum-fb-icon">✓</span>
            <div>
              <h3>${esc(context.t('sumCorrectMethodTitle'))}: ${esc(tr(evalData.correctMethod.name.tr, evalData.correctMethod.name.en))}</h3>
              <p>${esc(tr(evalData.why.tr, evalData.why.en))}</p>
            </div>
          </div>
          <div class="sum-fb-details">
            <div class="sum-fb-step">
              <strong>1. ${esc(context.t('sumFirstMoveLabel'))}:</strong>
              <code>${esc(tr(evalData.firstMove.tr, evalData.firstMove.en))}</code>
            </div>
            <div class="sum-fb-step">
              <strong>2. ${esc(context.t('sumReducedFormLabel'))}:</strong>
              <code>${esc(tr(evalData.reducedForm.tr, evalData.reducedForm.en))}</code>
            </div>
            <div class="sum-fb-step trap">
              <strong>⚠️ ${esc(context.t('sumCriticalTrapLabel'))}:</strong>
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
              <h3>${esc(context.t('sumIncorrectMethodTitle'))}</h3>
              <p>${esc(context.t('sumIncorrectMethodTip'))}</p>
            </div>
          </div>
          <div class="sum-fb-details">
            <p>${esc(context.t('sumThinkAboutStructure'))} ${card.order > 1 ? esc(context.t('sumHigherOrderHint')) : esc(context.t('sumFirstOrderHint'))}</p>
            <button type="button" class="button secondary sum-retry-btn" data-action="retry">
              ${esc(context.t('sumTryAgain'))}
            </button>
          </div>
        </div>
      `;
    }
  }

  function renderMatrixView() {
    const filteredMethods = activeCategory === 'all'
      ? METHODS
      : METHODS.filter(m => getCategory(m.id) === activeCategory);

    return `
      <div class="sum-matrix-view">
        <div class="sum-filter-tabs">
          <button type="button" class="sum-filter-btn ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
            ${esc(context.t('sumCatAll'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'first-order' ? 'active' : ''}" data-cat="first-order">
            ${esc(context.t('sumCatFirstOrder'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'special' ? 'active' : ''}" data-cat="special">
            ${esc(context.t('sumCatSpecial'))}
          </button>
          <button type="button" class="sum-filter-btn ${activeCategory === 'higher-order' ? 'active' : ''}" data-cat="higher-order">
            ${esc(context.t('sumCatHigherOrder'))}
          </button>
        </div>

        <div class="sum-matrix-grid">
          ${filteredMethods.map(m => {
            const card = CHALLENGE_CARDS.find(c => c.correctMethod === m.id);
            return `
              <article class="sum-matrix-card">
                <header>
                  <span class="sum-badge">${m.badge}</span>
                  <h4>${esc(tr(m.name.tr, m.name.en))}</h4>
                </header>
                <div class="sum-card-body">
                  <div class="sum-row">
                    <span class="sum-meta-label">${esc(context.t('sumMatrixCanonicalForm'))}:</span>
                    <code>${esc(m.formula)}</code>
                  </div>
                  ${card ? `
                    <div class="sum-row">
                      <span class="sum-meta-label">${esc(context.t('sumFirstMoveLabel'))}:</span>
                      <span>${esc(tr(card.firstMove.tr, card.firstMove.en))}</span>
                    </div>
                    <div class="sum-row">
                      <span class="sum-meta-label">${esc(context.t('sumReducedFormLabel'))}:</span>
                      <code>${esc(tr(card.reducedForm.tr, card.reducedForm.en))}</code>
                    </div>
                    <div class="sum-row trap">
                      <span class="sum-meta-label">⚠️ ${esc(context.t('sumCriticalTrapLabel'))}:</span>
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
    // Tab switching
    const tabBtn = event.target.closest('[data-tab]');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tab;
      render();
      return;
    }

    // Category filter in matrix view
    const catBtn = event.target.closest('[data-cat]');
    if (catBtn) {
      activeCategory = catBtn.dataset.cat;
      render();
      return;
    }

    // Direct card selection
    const cardChip = event.target.closest('[data-card-idx]');
    if (cardChip) {
      currentCardIndex = +cardChip.dataset.cardIdx;
      render();
      return;
    }

    // Method selection button in challenge view
    const methodBtn = event.target.closest('[data-method-id]');
    if (methodBtn) {
      const selectedId = methodBtn.dataset.methodId;
      const currentCard = CHALLENGE_CARDS[currentCardIndex];
      const evalData = evaluateDiagnostic(currentCard.id, selectedId);
      userAnswers[currentCard.id] = {
        selectedMethodId: selectedId,
        isCorrect: evalData.isCorrect
      };
      render();
      return;
    }

    // Next / Prev actions
    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      if (action === 'prev' && currentCardIndex > 0) {
        currentCardIndex--;
        render();
      } else if (action === 'next' && currentCardIndex < CHALLENGE_CARDS.length - 1) {
        currentCardIndex++;
        render();
      } else if (action === 'retry') {
        const currentCard = CHALLENGE_CARDS[currentCardIndex];
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
