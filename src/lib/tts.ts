export type TTSLang = 'en' | 'hi';

export function speak(text: string, lang: TTSLang) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(u);
  } catch {}
}

export function cancel() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try { window.speechSynthesis.cancel(); } catch {}
}

export function isSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}
