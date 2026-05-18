/* REGISTER JS */
document.addEventListener('DOMContentLoaded', async () => {

  // Redirect if already logged in
  const { data: { session } } = await _supabase.auth.getSession();
  if (session) window.location.href = 'dashboard.html';

  const form      = document.getElementById('registerForm');
  const btn       = document.getElementById('registerBtn');
  const alert     = document.getElementById('authAlert');
  const togglePw  = document.getElementById('togglePw');
  const pwInput   = document.getElementById('password'); 

  // Toggle password visibility
  togglePw?.addEventListener('click', () => {
    const type = pwInput.type === 'password' ? 'text' : 'password';
    pwInput.type = type;
  });

  function showAlert(msg, type = 'error') {
    alert.textContent = msg;
    alert.className = `auth-alert show ${type}`;
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullname  = document.getElementById('fullname').value.trim();
    const email     = document.getElementById('email').value.trim();
    const phone     = document.getElementById('phone').value.trim();
    const password  = document.getElementById('password').value;
    const confirmPw = document.getElementById('confirmPw').value;

    // Validation
    if (password !== confirmPw) {
      showAlert('Passwords do not match. Please try again.'); return;
    }
    if (password.length < 6) {
      showAlert('Password must be at least 6 characters.'); return;
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Creating account...';

    const { data, error } = await _supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullname, phone: phone }
      }
    });

    if (error) {
      showAlert(error.message);
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Create Account';
      return;
    }

    // Save extra profile data to profiles table
    if (data.user) {
      await _supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullname,
        phone: phone,
        email: email
      });
    }

    showAlert('✓ Account created! Redirecting to your dashboard...', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 2000);
  });
});
