/* ═══════════════════════════════════════════════
   AUTH GUARD — js/auth-guard.js
   Protects all pages — redirects to login if not signed in
═══════════════════════════════════════════════ */

(async () => {
  const publicPages = ['login.html', 'register.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (publicPages.includes(currentPage)) return;

  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) window.location.href = 'login.html';
})();
