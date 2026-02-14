(function () {
  var buffer = '';
  var trigger = 'sudo';
  var terminal = null;
  var input = null;
  var output = null;

  var ascii = [
    '  ██████   ██████  ██   ██ ██   ██ ██   ██ ',
    ' ██       ██  ████ ██  ██  ██  ██  ██  ██  ',
    ' ██   ███ ██ ██ ██ █████   █████   █████   ',
    ' ██    ██ ████  ██ ██  ██  ██  ██  ██  ██  ',
    '  ██████   ██████  ██   ██ ██   ██ ██   ██ ',
  ];

  var commands = {
    help: function () {
      return [
        'Available commands:',
        '  help       - Show this message',
        '  whoami     - Who am I?',
        '  skills     - Technical skills',
        '  flag       - Capture the flag',
        '  uname      - System info',
        '  ls         - List secrets',
        '  cat flag.txt - Read the flag',
        '  exit       - Close terminal',
      ].join('\n');
    },
    whoami: function () {
      return 'gokul — vulnerability researcher, ctf player, trail runner, photographer';
    },
    skills: function () {
      return [
        'Languages : C/C++, Python, Go, ARM Assembly, x86',
        'Security  : Fuzzing, SAST, DAST, Binary Analysis, Firmware RE',
        'Tools     : AFL++, angr, Ghidra, IDA Pro, Frida, QEMU',
        'Infra     : Kubernetes, CI/CD, Docker',
      ].join('\n');
    },
    flag: function () {
      return '🚩 CTF{w3lc0m3_t0_g0kkk_sh3ll}';
    },
    uname: function () {
      return 'g0kkkOS 1.0.0 — powered by curiosity and caffeine';
    },
    ls: function () {
      return 'flag.txt   .secrets   README.md   exploit.py';
    },
    'cat flag.txt': function () {
      return '🚩 CTF{y0u_r3ad_th3_f1le_n1c3}';
    },
    'cat .secrets': function () {
      return "You thought it'd be that easy? 😏";
    },
    'cat README.md': function () {
      return 'Thanks for visiting my blog! — Gokul';
    },
    'cat exploit.py': function () {
      return "#!/usr/bin/env python3\nprint('Nice try 😄')";
    },
    clear: function () {
      output.innerHTML = '';
      return '';
    },
    exit: function () {
      closeTerminal();
      return '';
    },
  };

  function createTerminal() {
    terminal = document.createElement('div');
    terminal.id = 'easter-terminal';
    terminal.innerHTML =
      '<div id="et-bar">' +
      '<span>g0kkk@blog:~$</span>' +
      '<span id="et-close">✕</span>' +
      '</div>' +
      '<div id="et-body">' +
      '<pre id="et-output"></pre>' +
      '<div id="et-input-line">' +
      '<span class="et-prompt">visitor@g0kkk:~$ </span>' +
      '<input type="text" id="et-input" autofocus spellcheck="false" autocomplete="off" />' +
      '</div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent =
      '#easter-terminal {' +
      '  position: fixed; bottom: 20px; right: 20px; width: 520px; max-width: 90vw;' +
      '  height: 370px; background: #1a1a2e; border-radius: 10px; z-index: 99999;' +
      '  font-family: "SF Mono", "Fira Code", "Consolas", monospace; font-size: 13px;' +
      '  box-shadow: 0 8px 32px rgba(0,0,0,0.5); display: flex; flex-direction: column;' +
      '  overflow: hidden; border: 1px solid #333;' +
      '}' +
      '#et-bar {' +
      '  background: #16213e; padding: 8px 14px; display: flex; justify-content: space-between;' +
      '  align-items: center; color: #0f3; font-size: 12px; cursor: grab;' +
      '}' +
      '#et-close { cursor: pointer; color: #e74c3c; font-size: 16px; }' +
      '#et-close:hover { color: #ff6b6b; }' +
      '#et-body {' +
      '  flex: 1; padding: 12px; overflow-y: auto; color: #0f3;' +
      '}' +
      '#et-output { margin: 0; white-space: pre-wrap; word-wrap: break-word; color: #0f3; font-size: 13px; }' +
      '#et-input-line { display: flex; align-items: center; margin-top: 4px; }' +
      '.et-prompt { color: #0ff; white-space: nowrap; }' +
      '#et-input {' +
      '  background: transparent; border: none; outline: none; color: #0f3;' +
      '  font-family: inherit; font-size: 13px; flex: 1; caret-color: #0f3;' +
      '}';

    document.head.appendChild(style);
    document.body.appendChild(terminal);

    output = document.getElementById('et-output');
    input = document.getElementById('et-input');

    // Welcome message
    output.textContent =
      ascii.join('\n') +
      '\n\nWelcome to g0kkk shell 🐚\nType "help" for available commands.\n\n';

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var cmd = input.value.trim();
        input.value = '';
        if (cmd) {
          output.textContent += 'visitor@g0kkk:~$ ' + cmd + '\n';
          if (commands[cmd]) {
            var result = commands[cmd]();
            if (result) output.textContent += result + '\n';
          } else {
            output.textContent += 'bash: ' + cmd + ': command not found\n';
          }
          output.textContent += '\n';
        }
        var body = document.getElementById('et-body');
        body.scrollTop = body.scrollHeight;
      }
    });

    document.getElementById('et-close').addEventListener('click', closeTerminal);
    input.focus();
  }

  function closeTerminal() {
    if (terminal) {
      terminal.remove();
      terminal = null;
      input = null;
      output = null;
    }
  }

  document.addEventListener('keydown', function (e) {
    if (terminal) return;
    buffer += e.key.toLowerCase();
    if (buffer.length > trigger.length) {
      buffer = buffer.slice(-trigger.length);
    }
    if (buffer === trigger) {
      buffer = '';
      createTerminal();
    }
  });
})();
