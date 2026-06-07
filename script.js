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
        if (sel.value === 'No internet service') sel.value = 'No';
      }
    });
  }

  document.getElementById('churnForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Analyzing...';

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

      const isChurn = data.prediction === 1;
      const riskClass = `risk-${data.risk_level.toLowerCase()}`;
      const verdictClass = isChurn ? 'churn' : 'stay';
      const verdictText = isChurn ? '⚠ Likely to Churn' : '✓ Likely to Stay';

      resultDiv.className = 'visible';
      resultDiv.innerHTML = `
        <div class="result-header">
          <div>
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Prediction Result</div>
            <div class="result-verdict ${verdictClass}">${verdictText}</div>
          </div>
          <div class="risk-badge ${riskClass}">${data.risk_level} Risk</div>
        </div>

        <div class="prob-row">
          <div class="prob-label">Churn</div>
          <div class="prob-bar-wrap"><div class="prob-bar churn" id="churnBar"></div></div>
          <div class="prob-val churn">${data.churn_probability}%</div>
        </div>
        <div class="prob-row">
          <div class="prob-label">Stay</div>
          <div class="prob-bar-wrap"><div class="prob-bar stay" id="stayBar"></div></div>
          <div class="prob-val stay">${data.stay_probability}%</div>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-label">Churn Probability</div>
            <div class="stat-value" style="color:var(--danger)">${data.churn_probability}%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Retention Probability</div>
            <div class="stat-value" style="color:var(--success)">${data.stay_probability}%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Risk Level</div>
            <div class="stat-value" style="color:var(--accent)">${data.risk_level}</div>
          </div>
        </div>
      `;

      // Animate bars after render
      setTimeout(() => {
        document.getElementById('churnBar').style.width = data.churn_probability + '%';
        document.getElementById('stayBar').style.width = data.stay_probability + '%';
      }, 50);

      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      resultDiv.className = 'visible';
      resultDiv.innerHTML = `
        <div class="error-msg">
          ⚠ Could not connect to backend: <strong>${err.message}</strong><br>
          Make sure <code>python app.py</code> is running on port 5000.
        </div>
      `;
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Analyze Churn Risk →';
    }
  });