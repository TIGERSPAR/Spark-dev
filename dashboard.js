/* DASHBOARD JS */
document.addEventListener('DOMContentLoaded', async () => {

  // ── Auth guard ──────────────────────────────
  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }

  const user = session.user;
  const meta = user.user_metadata;

  // ── Populate user info ──────────────────────
  const name  = meta?.full_name || user.email.split('@')[0];
  const initials = name.charAt(0).toUpperCase();

  document.getElementById('dashAvatar').textContent    = initials;
  document.getElementById('dashUsername').textContent  = name;
  document.getElementById('dashEmail').textContent     = user.email;
  document.getElementById('profileAvatarLg').textContent = initials;
  document.getElementById('profileName').textContent   = name;
  document.getElementById('profileEmail').textContent  = user.email;
  document.getElementById('profilePhone').textContent  = meta?.phone || '—';
  document.getElementById('profileSince').textContent  =
    new Date(user.created_at).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' });

  // ── Tab navigation ──────────────────────────
  const navLinks = document.querySelectorAll('.dash-nav-link');
  const tabs     = document.querySelectorAll('.dash-tab');

  function switchTab(tabId) {
    navLinks.forEach(l => l.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
    document.getElementById(`tab-${tabId}`)?.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.getAttribute('data-tab'));
    });
  });

  // New Order buttons
  document.getElementById('newOrderBtn')?.addEventListener('click', () => switchTab('new-order'));
  document.getElementById('emptyNewOrderBtn')?.addEventListener('click', () => switchTab('new-order'));

  // ── Logout ──────────────────────────────────
  const logoutHandler = async () => {
    await _supabase.auth.signOut();
    window.location.href = 'login.html';
  };
  document.getElementById('logoutBtn')?.addEventListener('click', logoutHandler);
  document.getElementById('sidebarLogout')?.addEventListener('click', logoutHandler);

  // ── Load Orders ─────────────────────────────
  async function loadOrders() {
    const loading = document.getElementById('ordersLoading');
    const empty   = document.getElementById('ordersEmpty');
    const list    = document.getElementById('ordersList');

    loading.style.display = 'flex';
    empty.style.display   = 'none';
    list.style.display    = 'none';

    const { data: orders, error } = await _supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    loading.style.display = 'none';

    if (error || !orders || orders.length === 0) {
      empty.style.display = 'flex'; return;
    }

    list.style.display = 'flex';
    list.innerHTML = orders.map(order => {
      const date   = new Date(order.created_at).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' });
      const status = order.status || 'pending';
      const statusLabel = {
        pending:   'Pending Review',
        progress:  'In Progress',
        review:    'Under Review',
        completed: 'Completed'
      }[status] || status;

      return `
        <div class="order-card">
          <div>
            <div class="order-service">${order.service}</div>
            <div class="order-details">${order.details}</div>
            <div class="order-meta">
              <span class="order-date">📅 ${date}</span>
              ${order.budget ? `<span class="order-budget">💰 ${order.budget}</span>` : ''}
            </div>
          </div>
          <span class="order-status status-${status}">${statusLabel}</span>
        </div>
      `;
    }).join('');
  }

  loadOrders();

  // ── Submit Order ────────────────────────────
  const orderForm  = document.getElementById('orderForm');
  const orderAlert = document.getElementById('orderAlert');
  const submitBtn  = document.getElementById('submitOrderBtn');

  function showOrderAlert(msg, type = 'error') {
    orderAlert.textContent = msg;
    orderAlert.className   = `auth-alert show ${type}`;
    orderAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  orderForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const service = document.getElementById('orderService').value;
    const details = document.getElementById('orderDetails').value.trim();
    const budget  = document.getElementById('orderBudget').value;

    if (!service || !details) {
      showOrderAlert('Please fill in the required fields.'); return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Submitting...';

    const { error } = await _supabase.from('orders').insert({
      user_id:    user.id,
      service:    service,
      details:    details,
      budget:     budget || null,
      status:     'pending'
    });

    if (error) {
      showOrderAlert('Failed to submit order. Please try again.');
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Submit Order';
      return;
    }

    showOrderAlert('✓ Order submitted! I will review it shortly and reach out via WhatsApp.', 'success');
    orderForm.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Submit Order';

    // Reload orders and switch to orders tab after 2s
    setTimeout(() => {
      loadOrders();
      switchTab('orders');
    }, 2500);
  });
});
