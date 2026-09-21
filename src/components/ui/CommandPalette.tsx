import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  X,
  Sun,
  Moon,
  CornerDownLeft,
} from 'lucide-react';
import { PERSONAL_INFO, FLAGSHIP_PROJECTS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'banner';
  cwd?: string;
  text: string;
}

const AVAILABLE_COMMANDS = [
  'help',
  'ls',
  'cd',
  'pwd',
  'cat',
  'open',
  'goto',
  'music',
  'theme',
  'pulse',
  'whoami',
  'neofetch',
  'date',
  'uname',
  'echo',
  'history',
  'clear',
  'exit',
  'sudo',
];

const DIRECTORIES = ['projects', 'skills', 'experience', 'proof'];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Initial welcome banner
  useEffect(() => {
    setTerminalLogs([
      {
        id: 'init-banner',
        type: 'banner',
        text: `   ___ _    _  __ ___ _____ _   _  ___  ___ 
  / __| |  | |/ // _|_   _/ | | | / _ \\/ __|
  \\__ \\ |/\\| | ' <|  _| | | | |_| | (_) \\__ \\
  |___/__/\\__|_|\\_\\_|   |_|  \\___/ \\___/|___/
  SwayamOS v2.6.0 (x86_64-portfolio-kernel) · Pune, IST
  Type "help" for short command manual, or "ls" to explore.`,
      },
    ]);
  }, []);

  // Auto-scroll terminal to bottom when new logs are added
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Focus input and lock background scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => terminalInputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleTriggerShockwave = () => {
    window.dispatchEvent(
      new CustomEvent('hero-shockwave', {
        detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      })
    );
  };

  const handleNavigate = (hash: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Autocomplete command when user presses Tab
  const handleTabComplete = (inputStr: string) => {
    const trimmed = inputStr.trimStart();
    const tokens = trimmed.split(/\s+/);

    if (tokens.length === 1) {
      const partial = tokens[0].toLowerCase();
      const matches = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(partial));
      if (matches.length === 1) {
        setTerminalInput(`${matches[0]} `);
      } else if (matches.length > 1) {
        setTerminalLogs((prev) => [
          ...prev,
          {
            id: `tab-${Date.now()}`,
            type: 'system',
            text: `Completions: ${matches.join('   ')}`,
          },
        ]);
      }
    } else if (tokens.length === 2 && (tokens[0] === 'cd' || tokens[0] === 'ls')) {
      const partial = tokens[1].toLowerCase();
      const matches = DIRECTORIES.filter((d) => d.startsWith(partial));
      if (matches.length === 1) {
        setTerminalInput(`${tokens[0]} ${matches[0]}`);
      }
    } else if (tokens.length === 2 && (tokens[0] === 'cat' || tokens[0] === 'open')) {
      const targets = [
        'resume',
        'about',
        'contact',
        'examsense',
        'campuscare',
        'taskly',
        'agritrade',
        'skills',
        'github',
        'linkedin',
      ];
      const partial = tokens[1].toLowerCase();
      const matches = targets.filter((t) => t.startsWith(partial));
      if (matches.length === 1) {
        setTerminalInput(`${tokens[0]} ${matches[0]}`);
      }
    }
  };

  // Main Terminal Command Runner
  const runTerminalCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Append command to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const userLog: TerminalLog = {
      id: `in-${Date.now()}`,
      type: 'input',
      cwd,
      text: trimmed,
    };

    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const arg = tokens.slice(1).join(' ').toLowerCase();

    let outputLog: TerminalLog;

    switch (cmd) {
      case 'help':
      case 'man':
      case '?':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `SWAYAMOS CORE COMMANDS CHEATSHEET:

  NAVIGATION:
    ls [-l]          · List files & directories in current path
    cd <dir>         · Change directory ("cd projects", "cd skills", "cd ..", "cd ~")
    pwd              · Print current working directory
    goto <section>   · Smooth scroll to section (about, journey, work, contact)

  INSPECTION & DATA:
    cat <file>       · Read file ("cat resume", "cat about", "cat contact", "cat examsense")
    open <target>    · Open project or external link ("open examsense", "open resume", "open github")
    whoami           · Display user credentials & engineering identity
    neofetch         · Display SwayamOS system banner, specs & hardware info

  CONTROLS & PHYSICS:
    music            · Toggle ambient music track ("Earrings" by Malcolm Todd)
    theme [dark|cream]· Toggle or select Dark Noir or Editorial Cream theme
    pulse / shockwave· Trigger 3D geodesic core shockwave across hero canvas

  SYSTEM & SHELL:
    date             · Display current Indian Standard Time (IST)
    uname -a         · Print OS kernel & architecture
    history          · View previous commands run in session
    echo <text>      · Print string to console
    clear            · Clear terminal screen
    exit / quit      · Close terminal modal`,
        };
        break;

      case 'pwd':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `/home/swayam/${cwd === '~' ? '' : cwd.replace('~/', '')}`,
        };
        break;

      case 'ls':
      case 'dir': {
        const isLong = arg.includes('-l');
        if (cwd === '~') {
          if (isLong) {
            outputLog = {
              id: `out-${Date.now()}`,
              type: 'output',
              text: `total 64
drwxr-xr-x  6 swayam swayam  4096 Sep 22 01:30 projects/
drwxr-xr-x  7 swayam swayam  4096 Sep 22 01:25 skills/
drwxr-xr-x  5 swayam swayam  4096 Sep 22 01:20 experience/
drwxr-xr-x  6 swayam swayam  4096 Sep 22 01:15 proof/
-rw-r--r--  1 swayam swayam 216K Sep 22 01:10 resume.pdf
-rw-r--r--  1 swayam swayam  1.4K Sep 22 01:05 about.txt
-rw-r--r--  1 swayam swayam   480 Sep 22 01:00 contact.txt
-rw-r--r--  1 swayam swayam  2.8K Sep 22 00:55 README.md`,
            };
          } else {
            outputLog = {
              id: `out-${Date.now()}`,
              type: 'output',
              text: `DIRECTORIES:
  📁 projects/     📁 skills/     📁 experience/     📁 proof/

FILES:
  📄 resume.pdf (216 KB)   📄 about.txt   📄 contact.txt   📄 README.md

Tip: Type "cd projects" or "cat resume" to view.`,
            };
          }
        } else if (cwd.includes('projects')) {
          const list = FLAGSHIP_PROJECTS.map(
            (p) =>
              `  [${p.number}] ${p.title.padEnd(20)} · ${p.subtitle}\n       Stack: ${p.category} | Live: ${p.liveUrl || 'GitHub'}`
          ).join('\n');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `FLAGSHIP PROJECTS (${FLAGSHIP_PROJECTS.length} builds):\n${list}\n\nTip: Type "cat examsense", "cat campuscare", or "open taskly" to view live.`,
          };
        } else if (cwd.includes('skills')) {
          const list = SKILL_CATEGORIES.map(
            (c) => `  [${c.label.toUpperCase()}]\n  ${c.skills.join(', ')}`
          ).join('\n\n');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `ENGINEERING CAPABILITIES:\n${list}`,
          };
        } else if (cwd.includes('experience')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `EXPERIENCE LOG:
  · Co-Treasurer @ PCCoE ACM Student Chapter (2024–Present)
    Redesigned chapter website; won Outstanding Website Award 2025 among 200+ chapters.
  · Data Analyst Intern @ Chinar Hospitality (June 2026–August 2026)
    Engineered AI-powered Power BI analytics and automated ETL inventory pipelines.
  · Published Researcher @ AICCoNS 2025 / Copyright Office of India (2025)
    Co-authored AgriTrade paper + Copyright Cert. LD-20250168587.`,
          };
        } else if (cwd.includes('proof')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `CREDENTIALS & PROOF:
  ★ Outstanding Website Award 2025 — ACM India Annual Event (200+ Chapters)
  ★ Copyright Registration LD-20250168587 — Agro Product App, Govt. of India
  ★ Published Research Paper — AICCoNS 2025 Springer/Conference Series
  ★ 1st Place Winner — Codigo 2025 & Tech Summit Best Paper Award`,
          };
        } else {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Empty directory.',
          };
        }
        break;
      }

      case 'cd':
        if (!arg || arg === '~' || arg === '..' || arg === '/') {
          setCwd('~');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Changed directory to ~ (home)',
          };
        } else if (arg.includes('project') || arg === 'work') {
          setCwd('~/projects');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `Changed directory to ~/projects\nType "ls" to view builds, or "cat examsense" for project specs.`,
          };
        } else if (arg.includes('skill') || arg === 'capabilities' || arg === 'tools') {
          setCwd('~/skills');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `Changed directory to ~/skills\nType "ls" to view all 5 domain stacks (Frontend, Backend, AI, Cloud, DB).`,
          };
        } else if (arg.includes('exp') || arg.includes('journey')) {
          setCwd('~/experience');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Changed directory to ~/experience\nType "ls" to view milestones (ACM Treasurer, Chinar Hospitality, AICCoNS Research).',
          };
        } else if (arg.includes('proof') || arg.includes('awards')) {
          setCwd('~/proof');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Changed directory to ~/proof\nType "ls" to view awards, statutory copyright IP, and research publications.',
          };
        } else {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: `cd: no such file or directory: ${arg}\nTry: "cd projects", "cd skills", "cd experience", "cd proof", or "cd .."`,
          };
        }
        break;

      case 'cat':
        if (!arg) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: 'cat: missing file operand. Usage: "cat resume", "cat about", "cat contact", or "cat examsense"',
          };
        } else if (arg.includes('resume')) {
          onClose();
          setTimeout(() => onOpenResume(), 120);
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Launching verified interactive in-browser PDF Resume Viewer (216 KB)...',
          };
        } else if (arg.includes('about') || arg.includes('bio')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[SWAYAM MANDHANI — BIO]
${PERSONAL_INFO.bio}

Batch: PCCoE Pune Computer Engineering '27
Specialization: Full-Stack Engineering, RAG Systems, Distributed Cloud Architectures
Philosophy: From whiteboard to production — zero fluff, verified impact.`,
          };
        } else if (arg.includes('contact')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[CONTACT INFO]
Email:    ${PERSONAL_INFO.email}
Phone:    ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
GitHub:   ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}`,
          };
        } else if (arg.includes('readme')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `# Swayam Mandhani Portfolio v2.6.0
Stack: React 18 + TypeScript + Vite + Tailwind CSS + Three.js + Framer Motion
Features:
  - In-Website Unix Terminal Shell with commands
  - Ambient Vinyl Music Player (Malcolm Todd — "Earrings")
  - Interactive 3D Geodesic Orb & Canvas Dot Grid with Shockwaves
  - Verified PDF Resume Viewer (216 KB)
  - Editorial Noir Dark & Warm Cream Theme Engine`,
          };
        } else if (arg.includes('exam')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[ExamSense AI — Flagship 01]
Category: Full-Stack Web App / AI
Live URL: https://examsense-ai-project.vercel.app/
Features: RAG-powered vector search, live exam simulation, intelligent answer scoring, Gemini API integration.`,
          };
        } else if (arg.includes('campus')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[CampusCare — Flagship 02]
Category: Full-Stack Web App
Live URL: http://34.93.174.126/
Features: Campus issue management with geo-tagged ticket workflows, role-based admin dashboards, automated SMS alerts.`,
          };
        } else if (arg.includes('taskly')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[Taskly — Flagship 03]
Category: Productivity & Systems
Live URL: https://taskly-swayam.vercel.app/
Features: Fast linear keyboard navigation, drag-and-drop Kanban, local-first syncing, dark/light theme engine.`,
          };
        } else if (arg.includes('agro') || arg.includes('agritrade')) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[Agro Product App / AgriTrade]
Status: Registered Intellectual Property (Govt. of India Cert. LD-20250168587) & AICCoNS 2025 Paper
Features: Agricultural e-commerce marketplace with real-time crop pricing, farmer weather forecasts, and price prediction engine.`,
          };
        } else if (arg.includes('skill')) {
          const list = SKILL_CATEGORIES.map(
            (c) => `  [${c.label.toUpperCase()}]: ${c.skills.join(', ')}`
          ).join('\n');
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `[SKILLS INVENTORY]\n${list}`,
          };
        } else {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: `cat: ${arg}: No such file. Try "cat resume", "cat about", "cat contact", or "cat examsense"`,
          };
        }
        break;

      case 'open':
      case 'view':
        if (!arg) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: 'open: specify target. e.g. "open resume", "open examsense", "open github", "open linkedin"',
          };
        } else if (arg.includes('resume')) {
          onClose();
          setTimeout(() => onOpenResume(), 120);
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: 'Opening verified PDF Resume modal...',
          };
        } else if (arg.includes('exam')) {
          window.open('https://examsense-ai-project.vercel.app/', '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened ExamSense AI in new tab.' };
        } else if (arg.includes('campus')) {
          window.open('http://34.93.174.126/', '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened CampusCare in new tab.' };
        } else if (arg.includes('taskly')) {
          window.open('https://taskly-swayam.vercel.app/', '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened Taskly in new tab.' };
        } else if (arg.includes('habit')) {
          window.open('https://habit-tracker-swayam.vercel.app/pin?from=%2F', '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened Habit Tracker in new tab.' };
        } else if (arg.includes('retail')) {
          window.open('https://retail-sales-intelligence-ten.vercel.app/', '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened Retail Sales BI in new tab.' };
        } else if (arg.includes('github')) {
          window.open(PERSONAL_INFO.github, '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened GitHub profile in new tab.' };
        } else if (arg.includes('linkedin')) {
          window.open(PERSONAL_INFO.linkedin, '_blank');
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Opened LinkedIn profile in new tab.' };
        } else {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: `open: unknown target "${arg}". Try "open resume", "open examsense", "open github", or "open linkedin"`,
          };
        }
        break;

      case 'goto':
      case 'nav':
        if (!arg) {
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'error',
            text: 'goto: specify section. e.g. "goto about", "goto journey", "goto work", "goto contact"',
          };
        } else {
          const target = arg.replace('#', '');
          handleNavigate(target);
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `Navigating to #${target}...`,
          };
        }
        break;

      case 'theme':
        if (arg === 'dark' || arg === 'noir') {
          if (theme !== 'dark') toggleTheme();
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Theme set to Noir Dark mode.' };
        } else if (arg === 'cream' || arg === 'light') {
          if (theme !== 'cream') toggleTheme();
          outputLog = { id: `out-${Date.now()}`, type: 'output', text: 'Theme set to Editorial Cream mode.' };
        } else {
          toggleTheme();
          outputLog = {
            id: `out-${Date.now()}`,
            type: 'output',
            text: `Toggled theme to ${theme === 'dark' ? 'Editorial Cream' : 'Noir Dark'} mode!`,
          };
        }
        break;

      case 'pulse':
      case 'shockwave':
        handleTriggerShockwave();
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: 'Dispatched radial 3D geodesic shockwave impulse across Hero dot-grid!',
        };
        break;

      case 'music':
      case 'play':
      case 'pause':
      case 'song':
        window.dispatchEvent(new CustomEvent('toggle-music'));
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: 'Toggled ambient music: "Earrings" by Malcolm Todd ♫',
        };
        break;

      case 'whoami':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `swayam mandhani
Computer Engineering '27 @ PCCoE Pune
Co-Treasurer @ PCCoE ACM · Published Researcher AICCoNS '25 · IP Holder LD-20250168587`,
        };
        break;

      case 'neofetch':
      case 'fastfetch':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `        /\\          swayam@portfolio
       /  \\         ----------------
      / /\\ \\        OS: SwayamOS 2.6.0 (x86_64)
     / /  \\ \\       Host: Portfolio Web Engine (React 18 + Vite)
    / / /\\ \\ \\      Kernel: 6.1.0-portfolio-kernel
   / / /  \\ \\ \\     Uptime: PCCoE Computer Engineering '27
  /_/_/    \\_\\_\\    Shell: swayam-bash 5.2.15
                    Theme: ${theme === 'dark' ? 'Noir Dark' : 'Editorial Cream'}
                    Audio: Malcolm Todd — "Earrings" (Local AAC)
                    CPU: Systems & Full-Stack AI Engineer
                    Memory: 35+ Public Repos / 1 IP Copyright / 1 ACM Award`,
        };
        break;

      case 'date': {
        const now = new Date();
        const dateStr = now.toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `${dateStr} IST (Pune, India)`,
        };
        break;
      }

      case 'uname':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: 'Linux swayam-portfolio 6.1.0-portfolio-kernel #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
        };
        break;

      case 'echo':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: tokens.slice(1).join(' '),
        };
        break;

      case 'history':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: history.map((item, idx) => `  ${String(idx + 1).padStart(3, ' ')}  ${item}`).join('\n') || 'No commands in history.',
        };
        break;

      case 'sudo':
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'error',
          text: 'swayam is not in the sudoers file. This incident will be reported to the ACM Student Chapter.',
        };
        break;

      case 'clear':
      case 'cls':
        setTerminalLogs([]);
        setTerminalInput('');
        return;

      case 'exit':
      case 'quit':
      case 'q':
        onClose();
        return;

      default:
        outputLog = {
          id: `out-${Date.now()}`,
          type: 'error',
          text: `command not found: "${cmd}". Type "help" for short manual, or "ls" to view files.`,
        };
        break;
    }

    setTerminalLogs((prev) => [...prev, userLog, outputLog]);
    setTerminalInput('');
  };

  // Keyboard handlers for history navigation and tab completion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runTerminalCommand(terminalInput);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabComplete(terminalInput);
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setTerminalInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setTerminalInput(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  // Click on quick suggestion chips
  const handleQuickCommand = (cmd: string) => {
    runTerminalCommand(cmd);
    terminalInputRef.current?.focus();
  };

  const isCream = theme === 'cream';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100001] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dedicated Terminal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className={`relative w-full max-w-3xl rounded-[28px] border shadow-2xl z-10 overflow-hidden flex flex-col max-h-[86vh] transition-colors duration-300 ${
              isCream
                ? 'bg-[#F7F5F0] border-[rgba(0,0,0,0.12)] text-[#121214] shadow-black/15'
                : 'bg-[#0E0E11] border-[rgba(255,255,255,0.12)] text-[#F2F0EC] shadow-black/60'
            }`}
          >
            {/* Top Accent Gradient Border */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
              }}
            />

            {/* macOS Style Window Header Bar */}
            <div
              className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b flex-shrink-0 transition-colors duration-300 ${
                isCream
                  ? 'bg-[#EFECE4] border-[rgba(0,0,0,0.08)]'
                  : 'bg-[#151518] border-[rgba(255,255,255,0.08)]'
              }`}
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close Terminal"
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity"
                />
                <button
                  onClick={() => setTerminalLogs([])}
                  title="Clear Output"
                  aria-label="Clear Output"
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity"
                />
                <button
                  onClick={toggleTheme}
                  title="Toggle Theme"
                  aria-label="Toggle Theme"
                  className="w-3 h-3 rounded-full bg-[#27C93F] hover:opacity-80 transition-opacity"
                />
                <div className="flex items-center gap-1.5 ml-2 text-xs font-mono font-semibold">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span className={isCream ? 'text-[#3E3C38]' : 'text-[#A1A1AA]'}>
                    swayam@portfolio:
                  </span>
                  <span className="text-[#38BDF8]">{cwd}</span>
                </div>
              </div>

              {/* Top Controls: Theme & Close */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle in Terminal Header */}
                <button
                  onClick={toggleTheme}
                  data-hoverable="true"
                  title={`Switch to ${isCream ? 'Noir Dark' : 'Editorial Cream'} Theme`}
                  aria-label="Toggle theme"
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border transition-all ${
                    isCream
                      ? 'bg-[#E4E0D7] border-[rgba(0,0,0,0.08)] text-[#5C5955] hover:text-[#121214]'
                      : 'bg-[#1F1F24] border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {isCream ? <Moon className="w-3 h-3 text-indigo-500" /> : <Sun className="w-3 h-3 text-amber-400" />}
                  <span className="hidden sm:inline uppercase">{theme}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  data-hoverable="true"
                  aria-label="Close"
                  className={`p-1 rounded-full transition-colors ${
                    isCream
                      ? 'text-[#5C5955] hover:text-[#121214] hover:bg-[#E4E0D7]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F24]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Suggestions Header Bar */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border-b overflow-x-auto scrollbar-none flex-shrink-0 touch-pan-x transition-colors duration-300 ${
                isCream
                  ? 'bg-[#F2EFE8] border-[rgba(0,0,0,0.06)]'
                  : 'bg-[#121215] border-[rgba(255,255,255,0.06)]'
              }`}
            >
              <span
                className={`text-[10px] uppercase font-mono font-bold flex-shrink-0 mr-1 ${
                  isCream ? 'text-[#8A8780]' : 'text-[#71717A]'
                }`}
              >
                QUICK:
              </span>
              {[
                'help',
                'ls -la',
                'cd projects',
                'cd skills',
                'cd ..',
                'cat resume',
                'neofetch',
                'music',
                'theme',
                'pulse',
                'clear',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickCommand(chip)}
                  data-hoverable="true"
                  className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono transition-all flex-shrink-0 whitespace-nowrap active:scale-95 ${
                    isCream
                      ? 'bg-[#EAE6DD] border-[rgba(0,0,0,0.08)] text-[#2B2927] hover:border-[#FF6B35] hover:text-[#FF6B35]'
                      : 'bg-[#1C1C21] border-[rgba(255,255,255,0.08)] text-[#D4D4D8] hover:border-[#FF6B35] hover:text-[#FF6B35]'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Terminal Logs Scroll View */}
            <div
              ref={terminalScrollRef}
              onClick={() => terminalInputRef.current?.focus()}
              className={`flex-1 p-4 sm:p-5 space-y-3.5 overflow-y-auto leading-relaxed font-mono text-xs sm:text-[13px] min-h-[260px] sm:min-h-[380px] scrollbar-thin transition-colors duration-300 ${
                isCream ? 'bg-[#F7F5F0] text-[#1E1E22]' : 'bg-[#0E0E11] text-[#E4E4E7]'
              }`}
            >
              {terminalLogs.map((log) => (
                <div key={log.id}>
                  {log.type === 'banner' ? (
                    <div
                      className={`font-mono text-[10px] sm:text-xs leading-tight whitespace-pre pb-2 border-b ${
                        isCream
                          ? 'text-[#C84B1A] border-[rgba(0,0,0,0.08)]'
                          : 'text-[#FF6B35] border-[rgba(255,255,255,0.08)]'
                      }`}
                    >
                      {log.text}
                    </div>
                  ) : log.type === 'input' ? (
                    <div className="flex items-center gap-1.5 font-semibold flex-wrap">
                      <span className="text-[#FF6B35]">swayam@portfolio</span>
                      <span className={isCream ? 'text-[#8A8780]' : 'text-[#71717A]'}>:</span>
                      <span className="text-[#38BDF8]">{log.cwd}</span>
                      <span className="text-[#22C55E]">$</span>
                      <span className={isCream ? 'text-[#121214] font-bold' : 'text-white font-bold'}>
                        {log.text}
                      </span>
                    </div>
                  ) : log.type === 'error' ? (
                    <div className="text-red-500 whitespace-pre-wrap pl-3 border-l-2 border-red-500/50">
                      {log.text}
                    </div>
                  ) : log.type === 'system' ? (
                    <div
                      className={`whitespace-pre-wrap pl-3 border-l-2 text-xs ${
                        isCream
                          ? 'text-[#6B6862] border-[rgba(0,0,0,0.15)]'
                          : 'text-[#A1A1AA] border-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      {log.text}
                    </div>
                  ) : (
                    <div
                      className={`whitespace-pre-wrap pl-3 border-l-2 ${
                        isCream
                          ? 'text-[#2D2B28] border-[#FF6B35]/40'
                          : 'text-[#E4E4E7] border-[#FF6B35]/40'
                      }`}
                    >
                      {log.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Prompt Input Line */}
            <div
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 border-t flex-shrink-0 transition-colors duration-300 ${
                isCream
                  ? 'bg-[#EFECE4] border-[rgba(0,0,0,0.08)]'
                  : 'bg-[#151518] border-[rgba(255,255,255,0.08)]'
              }`}
            >
              <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold select-none flex-shrink-0">
                <span className="text-[#FF6B35] hidden xs:inline">swayam@portfolio</span>
                <span className={`hidden xs:inline ${isCream ? 'text-[#8A8780]' : 'text-[#71717A]'}`}>
                  :
                </span>
                <span className="text-[#38BDF8]">{cwd}</span>
                <span className="text-[#22C55E]">$</span>
              </div>
              <input
                ref={terminalInputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'cd projects', 'ls', 'cat resume'..."
                className={`flex-1 bg-transparent focus:outline-none font-mono text-xs sm:text-sm transition-colors ${
                  isCream
                    ? 'text-[#121214] placeholder-[#8A8780]/70'
                    : 'text-white placeholder-[#71717A]/70'
                }`}
              />
              <button
                onClick={() => runTerminalCommand(terminalInput)}
                data-hoverable="true"
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 active:scale-95 transition-all text-[11px] font-mono font-semibold flex-shrink-0 shadow-sm"
              >
                <span>RUN</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>

            {/* Terminal Status Footer */}
            <div
              className={`flex items-center justify-between px-4 py-2 border-t text-[10px] font-mono flex-shrink-0 transition-colors duration-300 ${
                isCream
                  ? 'bg-[#E8E4DA] border-[rgba(0,0,0,0.06)] text-[#78756E]'
                  : 'bg-[#111114] border-[rgba(255,255,255,0.06)] text-[#71717A]'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span>↑↓ History</span>
                <span>·</span>
                <span>Tab Complete</span>
                <span>·</span>
                <span>"help" for manual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">BASH 5.2.15</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
