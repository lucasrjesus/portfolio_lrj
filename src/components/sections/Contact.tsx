// src/components/sections/Contact.tsx
// Formulário minimalista com inputs de linha simples e validação em tempo real
import { useState, useRef, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Nome é obrigatório';
  if (!form.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'E-mail inválido';
  }
  if (!form.message.trim()) errors.message = 'Mensagem é obrigatória';
  else if (form.message.trim().length < 10) errors.message = 'Mensagem muito curta';
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    // Validação em tempo real após primeiro erro
    if (errors[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Shake no botão
      gsap.fromTo(btnRef.current, { x: -6 }, { x: 0, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    
    setLoading(true);
    
    try {
      // O serviço formsubmit.co está fora do ar, usando fallback para mailto
      const subject = encodeURIComponent(`Contato de ${form.name} pelo Portfólio`);
      const body = encodeURIComponent(`Nome: ${form.name}\nEmail: ${form.email}\n\nMensagem:\n${form.message}`);
      window.location.href = `mailto:lrj.lucasribeiro@gmail.com?subject=${subject}&body=${body}`;
      
      // Simula um pequeno tempo de carregamento para a UI
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao abrir cliente de email:', error);
      alert('Não foi possível abrir seu cliente de e-mail. Por favor, me chame no LinkedIn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 px-6"
      aria-labelledby="contact-title"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase">
            05 / Contato
          </span>
          <h2
            id="contact-title"
            className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mt-4 tracking-tighter"
          >
            Vamos conversar
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed">
            Aberto a oportunidades, colaborações e conversas interessantes.
            <br />
            Respondo em até 24 horas.
          </p>
        </div>

        {submitted ? (
          // Estado de sucesso
          <div className="flex flex-col items-start gap-4 py-16 border-t border-[var(--border)]">
            <div className="w-10 h-10 rounded-full border border-emerald-400 flex items-center justify-center">
              <Check size={16} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-[var(--text-primary)]">Mensagem enviada!</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Obrigado pelo contato. Retorno em breve.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-10 border-t border-[var(--border)] pt-10"
          >
            {/* Nome */}
            <div className="relative">
              <label
                htmlFor="contact-name"
                className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest"
              >
                Nome
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Lucas Jesus"
                className={`input-line ${errors.name ? 'error' : ''}`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" role="alert" className="text-xs text-red-400 mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            {/* E-mail */}
            <div className="relative">
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest"
              >
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="seu@email.com"
                className={`input-line ${errors.email ? 'error' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" role="alert" className="text-xs text-red-400 mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Mensagem */}
            <div className="relative">
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest"
              >
                Mensagem
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={update('message')}
                placeholder="Olá, Lucas! Gostaria de conversar sobre..."
                rows={4}
                className={`input-line resize-none ${errors.message ? 'error' : ''}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" role="alert" className="text-xs text-red-400 mt-1 block">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              ref={btnRef}
              type="submit"
              id="contact-submit"
              disabled={loading}
              className="flex items-center gap-3 text-sm font-mono text-[var(--text-primary)] border-b border-[var(--border)] pb-1 hover:border-[var(--text-primary)] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        )}

        {/* Links diretos com Ícones */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap gap-4">
          <a
            href="https://github.com/lucasrjesus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 border border-[var(--border)] rounded-full text-base font-medium text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lucasrjesuss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 border border-[var(--border)] rounded-full text-base font-medium text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
