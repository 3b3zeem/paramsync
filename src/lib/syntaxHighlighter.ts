export interface CodeToken {
  text: string;
  type:
    | 'keyword'
    | 'control'
    | 'string'
    | 'comment'
    | 'function'
    | 'type'
    | 'number'
    | 'property'
    | 'jsxTag'
    | 'operator'
    | 'punctuation'
    | 'variable'
    | 'bashCommand'
    | 'bashSubcommand'
    | 'bashArg'
    | 'bashFlag'
    | 'bashPrompt'
    | 'plain';
}

export function getTokenClass(type: CodeToken['type']): string {
  switch (type) {
    case 'control':
      // Purple/magenta: import, export, from, return
      return 'text-[#af00db] dark:text-[#c586c0] font-medium';
    case 'keyword':
      // Blue: const, let, function, default, type
      return 'text-[#0000ff] dark:text-[#569cd6] font-medium';
    case 'type':
      // Teal: string, number, boolean, React
      return 'text-[#267f99] dark:text-[#4ec9b0] font-medium';
    case 'function':
      // Ochre/gold in light, soft yellow in dark: useQueryState, parseAsString
      return 'text-[#795e26] dark:text-[#dcdcaa] font-medium';
    case 'string':
      // Crimson in light, warm coral in dark
      return 'text-[#a31515] dark:text-[#ce9178]';
    case 'comment':
      // Forest green in light, sage in dark
      return 'text-[#008000] dark:text-[#6a9955] italic';
    case 'number':
      // Deep green in light, mint green in dark
      return 'text-[#098658] dark:text-[#b5cea8]';
    case 'property':
      // Navy in light, light blue in dark
      return 'text-[#001080] dark:text-[#9cdcfe]';
    case 'jsxTag':
      // Dark maroon in light, teal in dark
      return 'text-[#800000] dark:text-[#4ec9b0] font-medium';
    case 'operator':
      return 'text-[#0f172a] dark:text-[#d4d4d4]';
    case 'punctuation':
      return 'text-[#475569] dark:text-[#808080]';
    case 'variable':
      return 'text-[#001080] dark:text-[#9cdcfe]';
    case 'bashCommand':
      return 'text-[#0000ff] dark:text-[#569cd6] font-semibold';
    case 'bashSubcommand':
      return 'text-[#795e26] dark:text-[#dcdcaa] font-medium';
    case 'bashArg':
      return 'text-[#a31515] dark:text-[#ce9178]';
    case 'bashFlag':
      return 'text-[#001080] dark:text-[#9cdcfe]';
    case 'bashPrompt':
      return 'text-[#008000] dark:text-[#6a9955] font-semibold select-none';
    case 'plain':
    default:
      return 'text-[#0f172a] dark:text-[#d4d4d4]';
  }
}

function tokenizeBashLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // 1. Comment
    let match = remaining.match(/^#[^\n]*/);
    if (match) {
      tokens.push({ text: match[0], type: 'comment' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 2. Prompt $ or #
    match = remaining.match(/^[$#]\s*/);
    if (match) {
      tokens.push({ text: match[0], type: 'bashPrompt' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 3. Flags
    match = remaining.match(/^--?[a-zA-Z0-9-]+/);
    if (match) {
      tokens.push({ text: match[0], type: 'bashFlag' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 4. Command
    match = remaining.match(/^(?:npm|pnpm|yarn|bun|npx|node|git|cd|echo|curl|export|cat|deno)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'bashCommand' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 5. Subcommand
    match = remaining.match(/^(?:install|add|run|create|build|start|dev|test|commit|push|pull|clone|checkout|init)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'bashSubcommand' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 6. Strings
    match = remaining.match(/^'(?:\\.|[^\\'])*'|^"(?:\\.|[^\\"])*"/);
    if (match) {
      tokens.push({ text: match[0], type: 'string' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 7. Package names / words
    match = remaining.match(/^[a-zA-Z0-9@_./-]+/);
    if (match) {
      tokens.push({ text: match[0], type: 'bashArg' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 8. Whitespace
    match = remaining.match(/^\s+/);
    if (match) {
      tokens.push({ text: match[0], type: 'plain' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 9. Fallback
    tokens.push({ text: remaining[0], type: 'plain' });
    remaining = remaining.slice(1);
  }

  return tokens;
}

function tokenizeJsLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // 1. Single-line comment
    let match = remaining.match(/^\/\/[^\n]*/);
    if (match) {
      tokens.push({ text: match[0], type: 'comment' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 2. Multi-line comment (on single line)
    match = remaining.match(/^\/\*[\s\S]*?\*\//);
    if (match) {
      tokens.push({ text: match[0], type: 'comment' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 3. Strings: single quote, double quote, backtick
    match = remaining.match(/^'(?:\\.|[^\\'])*'|^"(?:\\.|[^\\"])*"|^`(?:\\.|[^\\`])*`/);
    if (match) {
      tokens.push({ text: match[0], type: 'string' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 4. Control keywords (Purple)
    match = remaining.match(/^(?:import|export|from|return|if|else|switch|case|break|continue|for|while|try|catch|finally|throw|yield|await|async)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'control' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 5. Declaration keywords (Blue)
    match = remaining.match(/^(?:const|let|var|function|type|interface|class|extends|implements|default|as|new|typeof|instanceof|void|in|of)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'keyword' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 6. Types & primitives (Teal)
    match = remaining.match(/^(?:string|number|boolean|any|unknown|never|void|null|undefined|true|false|Promise|React|Array|Record|Set|Map|Object|FC|Props|ReactNode)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'type' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 7. Library hooks and parsers (Yellow function/gold)
    match = remaining.match(/^(?:useQueryState|useBatchQueryParams|parseAsString|parseAsInteger|parseAsFloat|parseAsBoolean|parseAsArray|parseAsNumberRange|parseAsSort|createParser|withDefault|useState|useEffect|useMemo|useCallback|useRef|useRouter|useSearchParams|usePathname)\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'function' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 8. JSX tags (e.g. </div, <input, <CatalogFilters)
    match = remaining.match(/^<\/[a-zA-Z][a-zA-Z0-9_.-]*|^<[a-zA-Z][a-zA-Z0-9_.-]*/);
    if (match) {
      tokens.push({ text: match[0], type: 'jsxTag' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 9. JSX tag close
    match = remaining.match(/^\/?>/);
    if (match) {
      tokens.push({ text: match[0], type: 'jsxTag' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 10. Numbers
    match = remaining.match(/^\b\d+(?:\.\d+)?\b/);
    if (match) {
      tokens.push({ text: match[0], type: 'number' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 11. Function call: identifier followed by (
    match = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/);
    if (match) {
      tokens.push({ text: match[0], type: 'function' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 12. Property or attribute: identifier followed by : or =
    match = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*[:=])/);
    if (match) {
      tokens.push({ text: match[0], type: 'property' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 13. Multi-character operators
    match = remaining.match(/^(?:=>|===|!==|==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=|[-+*/%&|^!=<>?])/);
    if (match) {
      tokens.push({ text: match[0], type: 'operator' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 14. Punctuation
    match = remaining.match(/^[{}()[\];,.:]/);
    if (match) {
      tokens.push({ text: match[0], type: 'punctuation' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 15. General variables / identifiers
    match = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (match) {
      tokens.push({ text: match[0], type: 'variable' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 16. Whitespace
    match = remaining.match(/^\s+/);
    if (match) {
      tokens.push({ text: match[0], type: 'plain' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // 17. Fallback character
    tokens.push({ text: remaining[0], type: 'plain' });
    remaining = remaining.slice(1);
  }

  return tokens;
}

export function highlightCode(code: string, language: string = 'tsx'): CodeToken[][] {
  const isBash = ['bash', 'sh', 'shell', 'terminal', 'zsh'].includes(language.toLowerCase());
  const lines = code.split('\n');

  return lines.map((line) => {
    if (isBash) {
      return tokenizeBashLine(line);
    }
    return tokenizeJsLine(line);
  });
}
