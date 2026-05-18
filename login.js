/* LOGIN JS */
document.addEventListener('DOMContentLoaded', async () => {

  // Redirect if already logged in
  const { data: { session } } = await _supabase.auth.getSession();
  if (session) window.location.href = 'dashboard.html';

  const form     = document.getElementById('loginForm');
  const btn      = document.getElementById('loginBtn');
  const alert    = document.getElementById('authAlert');
  const togglePw = document.getElementById('togglePw');
  const pwInput  = document.getElementById('password');

  togglePw?.addEventListener('click', () => {
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  });

  function showAlert(msg, type = 'error') {
    alert.textContent = msg;
    alert.className = `auth-alert show ${type}`;
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Signing in...';

    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showAlert('Incorrect email or password. Please try again.');
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Sign In';
      return;
    }

    showAlert('✓ Welcome back! Redirecting...', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  });
});
