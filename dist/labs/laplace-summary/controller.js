import {escapeHtml as esc} from '../../core/html.js';
import {
  CHALLENGE_CARDS,
  LAPLACE_METHODS,
  evaluateLaplaceDiagnostic
} from '../../models/laplace-summary.js';

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
      <section class="sep-lab sum-workbench laplace-summary-workbench">
        <header class="cx-header">
          <p class="eyebrow">${esc(tr('BÖLÜM 6 ÖZET VE YÖNTEM REHBERİ', 'CHAPTER 6 SUMMARY & METHOD NAVIGATOR'))}</p>
          <h2>${esc(tr('§6.7 Laplace Dönüşümü Karar Matrisi ve Teşhis Laboratuvarı', '§6.7 Laplace Transform Decision Matrix & Diagnostic Workbench'))}</h2>
          <p>${esc(tr(
            'Frekans bölgesi teoremleri, ters dönüşüm teknikleri, süreksiz zorlamalar ve mühendislik titreşimlerini 10 sınav kartı ile test edin.',
            'Test frequency domain theorems, inversion techniques, discontinuous forcing, and engineering vibrations across 10 exam cards.'
          ))}</p>
        </header>

        <div class="panel sep-experiment sum-panel">
          <div class="sep-toolbar sum-tabs">
            <div class="segmented">
              <button type="button" class="sum-tab ${activeTab === 'challenge' ? 'active' : ''}" data-tab="challenge">
                <span>🎯</span> ${esc(tr('Teşhis Kartları (10 Soru)', 'Diagnostic Cards (10 Problems)'))}
              </button>
              <button type="button" class="sum-tab ${activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">
                <span>🗺️</span> ${esc(tr('Bölüm 6 Teorem ve Çiftler Matrisi', 'Chapter 6 Theorems & Pairs Matrix'))}
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
          <p>${esc(tr('Özet laboratuvarı tamamlandıktan sonra çözümlü sınav kliniği vakalarını inceleyin.', 'After finishing the summary lab, review the scored exam clinic cases.'))}</p>
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
            <code>${esc(card.latex)}</code>
          </div>
          <p class="sum-prompt">${esc(card.description[lang] || card.description.tr)}</p>
          <p class="sum-subprompt"><strong>${esc(tr('Bu problem için en uygun Laplace kuralı / yöntemi hangisidir?', 'Which Laplace rule / method is optimal for this problem?'))}</strong></p>
        </div>

        <div class="sum-method-grid" role="group">
          ${LAPLACE_METHODS.map(m => {
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
        <h3>${esc(tr('Bölüm 6 Laplace Yöntemleri ve Özellikleri Karar Tablosu', 'Chapter 6 Laplace Methods & Properties Decision Table'))}</h3>
        <p>${esc(tr(
          'Aşağıdaki matris, Laplace dönüşümünün temel özelliklerini ve hangi diferansiyel denklem veya sinyal türünde en hızlı çözümü sağladığını özetler.',
          'The matrix below outlines the fundamental properties of the Laplace transform and their optimal application domains.'
        ))}</p>

        <div class="table-responsive">
          <table class="table-card">
            <thead>
              <tr>
                <th>${esc(tr('Bölüm & Yöntem', 'Section & Method'))}</th>
                <th>${esc(tr('Frekans / Zaman Bağıntısı', 'Frequency / Time Formula'))}</th>
                <th>${esc(tr('En Uygun Olduğu Durum & Tipik Uygulama', 'Optimal Scenario & Key Application'))}</th>
              </tr>
            </thead>
            <tbody>
              ${LAPLACE_METHODS.map(m => `
                <tr>
                  <td>
                    <span class="sum-badge">${esc(m.badge)}</span>
                    <strong>${esc(m.name[lang] || m.name.tr)}</strong>
                  </td>
                  <td><code>${esc(m.formula)}</code></td>
                  <td>${esc(getMethodContext(m.id, lang))}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getMethodContext(methodId, lang) {
    const contexts = {
      'def-integral': {
        tr: 'Standart tablolarda bulunmayan veya parçalı tanımlı sinyallerin doğrudan tanım integraliyle dönüşümü.',
        en: 'Direct integration for piecewise functions or signals not listed in standard tables.'
      },
      'first-shifting': {
        tr: 'e^{at} ile çarpılmış sinüs, kosinüs veya polinomların frekans ekseninde (s − a) ötelenmesi.',
        en: 'Exponential modulation e^{at} shifting frequency coordinates to s − a.'
      },
      'second-shifting': {
        tr: 'Zaman ekseninde a kadar geciken sinyallerin s-bölgesinde e^{-as} çarpanı ile ötelenmesi.',
        en: 'Time delay by a resulting in e^{-as} attenuation factor in the s-domain.'
      },
      's-derivative': {
        tr: 't f(t) çarpımlarının frekans bölgesinde türeve (−dF/ds) dönüştürülerek rezonans terimleri üretilmesi.',
        en: 'Multiplying by t translates to frequency differentiation (−dF/ds), producing resonance.'
      },
      'dirac-delta': {
        tr: 'Anlık çekiç darbeleri, impuls zorlamaları ve başlangıç sıçramalarının s-bölgesine e^{-as} olarak aktarımı.',
        en: 'Instantaneous impacts and impulses transferred directly as e^{-as}.'
      },
      'partial-fractions': {
        tr: 'Ayrık gerçel, katlı ve indirgenemez kuadratik kutuplu rasyonel transfer fonksiyonlarının tersi.',
        en: 'Inversion of rational transfer functions with distinct, repeated, or complex poles.'
      },
      'convolution-theorem': {
        tr: 'İki transfer fonksiyonunun çarpımı veya sistemin Green impuls yanıtı ile zorlama konvolüsyonu.',
        en: 'Product of two transfer functions or convolving Green impulse response with inputs.'
      },
      'ivp-algebraic': {
        tr: 'Sabit katsayılı türevli diferansiyel denklemlerin ZIR ve ZSR ayrışımı ile doğrudan tek hamlede çözümü.',
        en: 'Unified algebraic solution of constant-coefficient IVPs with ZIR/ZSR decomposition.'
      },
      'delayed-polynomial': {
        tr: 'Gecikmeli polinom zorlamalarını t = (t − a) + a ile Taylor tabanına açarak 2. kaydırmaya uyarlama.',
        en: 'Expanding delayed polynomials around t = (t − a) + a for direct 2nd shifting.'
      },
      'periodic-transform': {
        tr: 'Kare, testere dişi ve periyodik darbe trenleriyle sürülen RLC devreleri ve yapılar.',
        en: 'Circuits and structures driven by square waves, sawtooth, or periodic pulse trains.'
      }
    };
    return contexts[methodId]?.[lang] || contexts[methodId]?.tr || '';
  }

  // Delegated events
  root.addEventListener('click', event => {
    // 1. Tab buttons
    const tabBtn = event.target.closest('.sum-tab');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tab;
      render();
      return;
    }

    // 2. Card chips
    const cardChip = event.target.closest('.sum-card-chip');
    if (cardChip) {
      currentCardIndex = parseInt(cardChip.dataset.cardIdx, 10);
      render();
      return;
    }

    // 3. Method selection buttons
    const methodBtn = event.target.closest('.sum-method-btn');
    if (methodBtn) {
      const methodId = methodBtn.dataset.methodId;
      const card = CHALLENGE_CARDS[currentCardIndex];
      const result = evaluateLaplaceDiagnostic(card.id, methodId);
      userAnswers[card.id] = {
        selectedMethodId: methodId,
        isCorrect: result.isOptimal,
        feedback: result.feedback
      };
      render();
      return;
    }

    // 4. Action buttons
    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      const act = actionBtn.dataset.action;
      if (act === 'prev' && currentCardIndex > 0) {
        currentCardIndex--;
        render();
      } else if (act === 'next' && currentCardIndex < CHALLENGE_CARDS.length - 1) {
        currentCardIndex++;
        render();
      }
    }
  }, { signal });

  render();

  return {
    update(next = {}) {
      context = next;
      render();
    },
    destroy() {
      events.abort();
      root.replaceChildren();
    }
  };
}
