// src/components/terminal/Terminal.tsx
// Terminal Interativo da Hero Section com comandos e easter eggs
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { COMMANDS, WELCOME_LINES } from './commands';
import type { CommandResult } from '../../types';

interface HistoryEntry {
  type: 'input' | 'output';
  content: string;
  style?: CommandResult['type'];
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>(
    WELCOME_LINES.map(l => ({ type: 'output', content: l, style: 'text' }))
  );
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ao fundo quando o histórico muda
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Adiciona o input ao histórico
    setHistory(prev => [...prev, { type: 'input', content: trimmed }]);
    setCmdHistory(prev => [trimmed, ...prev]);
    setCmdIndex(-1);
    setInput('');

    const handler = COMMANDS[trimmed];
    if (!handler) {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          content: `  zsh: command not found: ${trimmed}. Digite "help".`,
          style: 'error',
        },
      ]);
      return;
    }

    const result = handler();

    if (result.lines[0] === '__CLEAR__') {
      setHistory(WELCOME_LINES.map(l => ({ type: 'output', content: l, style: 'text' })));
      return;
    }

    const newLines: HistoryEntry[] = result.lines.map(line => ({
      type: 'output',
      content: line,
      style: result.type,
    }));

    setHistory(prev => [...prev, ...newLines, { type: 'output', content: '', style: 'text' }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(newIndex);
      setInput(cmdHistory[newIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(cmdIndex - 1, -1);
      setCmdIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    }
  };

  const lineColor = (style?: string) => {
    switch (style) {
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-red-400';
      case 'audio': return 'text-amber-300';
      default: return 'text-[var(--text-muted)]';
    }
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm overflow-hidden"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Terminal interativo"
    >
      {/* Barra de título minimalista */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-auto text-[10px] font-mono text-[var(--text-muted)]">
          ~/portfolio — bash
        </span>
      </div>

      {/* Área de output */}
      <div ref={outputRef} className="h-64 overflow-y-auto px-4 py-3 space-y-0.5" aria-live="polite">
        {history.map((entry, i) => (
          <div
            key={i}
            className={`text-xs font-mono leading-relaxed whitespace-pre ${
              entry.type === 'input'
                ? 'text-[var(--text-primary)]'
                : lineColor(entry.style)
            }`}
          >
            {entry.type === 'input' ? (
              <span>
                <span className="text-[var(--text-muted)]">~/portfolio $</span>{' '}
                {entry.content}
              </span>
            ) : (
              entry.content
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[var(--border)]">
        <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">~/portfolio $</span>
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-xs font-mono text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]/40"
          placeholder="help"
          autoComplete="off"
          spellCheck={false}
          aria-label="Entrada do terminal"
        />
        {/* Cursor piscante */}
        <span className="w-1.5 h-3.5 bg-[var(--text-primary)] animate-pulse opacity-70 shrink-0" />
      </div>
    </div>
  );
}
