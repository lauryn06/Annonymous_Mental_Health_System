// stress.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('stress-form');
  const resultEl = document.getElementById('result');
  const clearBtn = document.getElementById('clear-btn');

  function getScore() {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      const radios = document.getElementsByName('q' + i);
      for (const r of radios) {
        if (r.checked) {
          total += parseInt(r.value, 10);
          break;
        }
      }
    }
    return total;
  }

  function interpret(score, suicidalValue) {
    // For first 9 items, PHQ-like mapping using total minus q10 if needed.
    // We'll use the full 10-item total for a rough guide but explain it's screening only.
    let severity = '';
    // Use a 0-27 PHQ-9-like scale mapping based on score excluding last question:
    // Build approximate mapping for 0-27 (first 9 items only) and interpret with note.
    // But because we included 10th (suicidal), we show urgent advice separately.
    const first9 = score - suicidalValue;
    if (first9 <= 4) severity = 'Minimal or none';
    else if (first9 <= 9) severity = 'Mild';
    else if (first9 <= 14) severity = 'Moderate';
    else if (first9 <= 19) severity = 'Moderately severe';
    else severity = 'Severe';

    return severity;
  }

  function showResult(score, suicidalValue) {
    const severity = interpret(score, suicidalValue);
    resultEl.classList.remove('hidden');
    resultEl.classList.remove('urgent');

    // Basic message
    resultEl.innerHTML = `
      <h2>Results</h2>
      <p><strong>Total score (first 9 items):</strong> ${score - suicidalValue} / 27</p>
      <p><strong>Severity (screening):</strong> ${interpret(score, suicidalValue)}</p>
    `;

    // If suicidal ideation reported at all, show urgent message
    if (suicidalValue > 0) {
      resultEl.classList.add('urgent');
      resultEl.innerHTML += `
        <p style="font-weight:700; color:#7a1f1f;">
          You indicated some thoughts of harming yourself or thinking you'd be better off dead.
          If you feel you may be in danger or are thinking about hurting yourself <strong>right now</strong>, please seek immediate help.
        </p>
        <ul>
          <li>If you're in imminent danger, call your local emergency number.</li>
          <li>If you are in Malawi, contact local emergency services or reach out to nearby hospitals/clinics. If you know a crisis hotline, please call it now.</li>
          <li>If you can, please contact a trusted person and let them know how you're feeling.</li>
        </ul>
      `;
    } else {
      // non-urgent guidance
      resultEl.innerHTML += `
        <p>Recommendations:</p>
        <ul>
          <li>If your score is Moderate or higher, consider contacting a mental health professional or counselor.</li>
          <li>Try small steps: talk to someone you trust, practice grounding/breathing exercises, keep a sleep and activity routine.</li>
          <li>This screening is not a diagnosis. If you're concerned, please seek professional support.</li>
        </ul>
      `;
    }

    // Offer to save anonymously in localStorage (no personal data)
    resultEl.innerHTML += `
      <div style="margin-top:10px;">
        <button id="save-result" class="btn primary">Save anonymous entry</button>
        <button id="share-copy" class="btn ghost">Copy summary</button>
      </div>
    `;

    // attach handlers
    document.getElementById('save-result').addEventListener('click', () => {
      const saved = JSON.parse(localStorage.getItem('thandizo_entries') || '[]');
      saved.push({
        date: new Date().toISOString(),
        score_first9: score - suicidalValue,
        suicidal_value: suicidalValue
      });
      localStorage.setItem('thandizo_entries', JSON.stringify(saved));
      alert('Saved anonymously in your browser. Only you can see this on this device.');
    });

    document.getElementById('share-copy').addEventListener('click', async () => {
      const text = `Thandizo screening - ${new Date().toLocaleString()}\nScore (first 9): ${score - suicidalValue}\nSeverity: ${severity}${suicidalValue > 0 ? '\nSuicidal thoughts reported: yes' : ''}\n(Anonymous self-screening)`;
      try {
        await navigator.clipboard.writeText(text);
        alert('Summary copied to clipboard. You can paste it to share with someone you trust.');
      } catch (e) {
        alert('Could not copy automatically. You can manually select the text above to copy.');
      }
    });
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const total = getScore();
    // suicidal value is q10
    const suicidalRadios = document.getElementsByName('q10');
    let suicidalValue = 0;
    for (const r of suicidalRadios) if (r.checked) suicidalValue = parseInt(r.value, 10);

    showResult(total, suicidalValue);
    // smooth scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    // default radio states: set all q1..q10 first radio to checked
    for (let i = 1; i <= 10; i++) {
      const radios = document.getElementsByName('q' + i);
      if (radios.length) radios[0].checked = true;
    }
    resultEl.classList.add('hidden');
    resultEl.classList.remove('urgent');
  });

  // set defaults on load
  clearBtn.click();
});
