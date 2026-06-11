// Handle Internet Service dependencies
function updateInternetDeps() {
  const val = document.getElementById('internetService').value;
  const deps = document.querySelectorAll('.internet-dep');
  
  deps.forEach(sel => {
    if (val === 'No') {
      sel.value = 'No internet service';
      sel.disabled = true;
      sel.style.opacity = '0.4';
    } else {
      sel.disabled = false;
      sel.style.opacity = '1';
      if (sel.value === 'No internet service') {
        sel.value = 'No';
      }
    }
  });
}

// Ensure initial state is correct on load
document.addEventListener('DOMContentLoaded', () => {
  updateInternetDeps();
});

// Handle form submission
document.getElementById('churnForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = document.getElementById('submitBtn');
  const btnText = btn.querySelector('.btn-text');
  const btnIcon = btn.querySelector('.btn-icon');
  
  const emptyState = document.getElementById('emptyState');
  const resultsData = document.getElementById('resultsData');
  
  // Loading state
  btn.disabled = true;
  btnText.textContent = 'Processing...';
  btnIcon.innerHTML = `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="31.4 31.4" class="spinner-icon"></circle>`;

  const formData = new FormData(e.target);
  const payload = {};
  formData.forEach((val, key) => { payload[key] = val; });

  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    // Hide empty state, show results
    emptyState.style.display = 'none';
    resultsData.style.display = 'block';

    const isChurn = data.prediction === 1;
    
    // Update Banner
    const verdictBanner = document.getElementById('verdictBanner');
    const verdictIcon = document.getElementById('verdictIcon');
    const verdictText = document.getElementById('verdictText');
    
    if (isChurn) {
      verdictBanner.className = 'verdict-banner danger-mode';
      verdictIcon.textContent = '⚠️';
      verdictText.textContent = 'High Churn Risk';
    } else {
      verdictBanner.className = 'verdict-banner success-mode';
      verdictIcon.textContent = '✅';
      verdictText.textContent = 'Likely to Stay';
    }

    // Update Metrics
    document.getElementById('valChurn').textContent = `${data.churn_probability}%`;
    document.getElementById('valStay').textContent = `${data.stay_probability}%`;
    
    const riskPill = document.getElementById('valRisk');
    riskPill.textContent = data.risk_level;
    riskPill.setAttribute('data-risk', data.risk_level);

    // Update Progress Bars
    document.getElementById('labelChurn').textContent = `${data.churn_probability}%`;
    document.getElementById('labelStay').textContent = `${data.stay_probability}%`;
    
    // Slight delay for animation
    setTimeout(() => {
      document.getElementById('barChurn').style.width = `${data.churn_probability}%`;
      document.getElementById('barStay').style.width = `${data.stay_probability}%`;
    }, 50);

  } catch (err) {
    emptyState.style.display = 'flex';
    resultsData.style.display = 'none';
    emptyState.innerHTML = `
      <div style="color: var(--danger); text-align: center; background: var(--danger-bg); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.2);">
        ⚠️ Backend Connection Failed <br> <span style="font-size: 13px; color: var(--text-muted);">${err.message}</span>
      </div>
    `;
  } finally {
    // Reset button
    btn.disabled = false;
    btnText.textContent = 'Run Inference Engine';
    btnIcon.innerHTML = `<path d="M5 12h14M12 5l7 7-7 7"/>`;
  }
});
