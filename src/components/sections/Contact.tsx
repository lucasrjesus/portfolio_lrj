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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3f592411-b39a-42db-bf5f-023d0d4d90b0',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Novo contato de ${form.name} via Portfólio`,
          from_name: 'Portfólio Lucas Jesus'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Serviço indisponível');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Não foi possível enviar a mensagem. Por favor, tente novamente mais tarde.');
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

            {/* Submit e LinkedIn */}
            <div className="flex items-center gap-8">
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

              <a
                href="https://www.linkedin.com/in/lucasrjesuss"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)] border-b border-transparent pb-1 hover:border-[var(--text-muted)] transition-all"
              >
                LinkedIn
                <ArrowRight
                  size={14}
                  className="-rotate-45"
                />
              </a>
            </div>
          </form>
        )}


      </div>
    </section>
  );
}
