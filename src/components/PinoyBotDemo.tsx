import React, { useState } from 'react';
import { Terminal, Sparkles, CheckCircle, Info, ChevronDown } from 'lucide-react';

interface ExtractedFeatures {
  length: number;
  is_pure_punctuation: number;
  has_fil_prefix: string | null;
  has_fil_suffix: string | null;
  has_fil_infix: string | null;
  has_non_fil_letters: string[];
  has_eng_suffix: string | null;
  has_eng_cluster: string | null;
  has_reduplication: boolean;
  has_partial_reduplication: boolean;
  is_english_contraction: boolean;
  has_complex_consonants: boolean;
  is_fil_short: boolean;
  is_eng_short: boolean;
  is_hybrid: boolean;
}

interface TokenResult {
  token: string;
  label: 'FIL' | 'ENG' | 'HYBRID' | 'OTH';
  confidence: number;
  reason: string;
  features: ExtractedFeatures;
}

// Exact sets from Karl Divinagracia's `feature_utils.py` in lraaak/pinoybot
const ENGLISH_SUFFIXES = ['ing', 'ed', 'tion', 'sion', 'ly', 'ment', 'ness', 'able', 'ous', 'ive', 'less', 'ful', 'ize'];
const ENGLISH_CLUSTERS = ['th', 'sh', 'ch', 'ph', 'wh'];
const FILIPINO_PREFIXES = ['mag', 'nag', 'ni', 'ka', 'pa', 'pag', 'ma', 'man', 'na', 'pin'];
const FILIPINO_SUFFIXES = ['an', 'han', 'hin', 'in', 'on', 'ko', 'ta', 'ka', 'mo'];
const FILIPINO_INFIXES = ['um', 'in'];

const COMMON_EN_SHORTS = new Set([
  'i', 'a', 'an', 'am', 'is', 'in', 'it', 'of', 'on', 'at', 'to', 'we', 'he',
  'be', 'do', 'go', 'no', 'so', 'up', 'us', 'the', 'and', 'im', 'my', 'you',
]);

const COMMON_FIL_SHORTS = new Set([
  'si', 'sa', 'na', 'pa', 'po', 'ko', 'mo', 'ka', 'ba', 'ha', 'eh', 'ay', 'di', 'ng', 'at', 'o',
]);

const COMMON_ENG_WORDS = new Set([
  'happy', 'sad', 'love', 'study', 'project', 'graduation', 'after', 'before', 'and', 'today', 'soon',
  'presentation', 'dataset', 'email', 'asap', 'thanks', 'coffee', 'meeting', 'haircut', 'exam', 'class',
]);

const COMMON_FIL_WORDS = new Set([
  'grabe', 'sige', 'kasi', 'naman', 'ba', 'po', 'opo', 'tapos', 'ayan', 'ako', 'kami', 'kayo', 'pa', 'na',
  'kanina', 'ngayon', 'bukas', 'dito', 'doon', 'gusto', 'gustong-gusto', 'wala', 'meron', 'hindi', 'oo',
]);

const ENGLISH_STOPWORDS = new Set([
  'the', 'and', 'to', 'in', 'for', 'of', 'on', 'with', 'from', 'that', 'is', 'was', 'it', 'as', 'this',
  'by', 'at', 'or', 'be', 'an', 'are', 'if', 'we', 'they', 'have', 'has', 'had',
]);

const NON_FIL_LETTERS = ['c', 'f', 'j', 'q', 'v', 'x', 'z'];
const PUNCTUATION_REGEX = /^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
const ENGLISH_CONTRACTIONS_REGEX = /('m|'ll|'s|'re|'ve|'d|n't)$/i;

const PRESET_EXAMPLES = [
  "nag-coffee kami kanina sa Taft tapos nag-study para sa exam",
  "gustong-gusto ko maghaircut before the presentation lol",
  "pa-send ng dataset sa email ASAP thanks!",
  "the model evaluates 42,000 tokens using random forest",
];

export const PinoyBotDemo: React.FC = () => {
  const [inputText, setInputText] = useState(PRESET_EXAMPLES[0]);
  const [analyzedTokens, setAnalyzedTokens] = useState<TokenResult[]>(() => analyzeSentence(PRESET_EXAMPLES[0]));
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);

  // Exact port of extract_features_for_word + decision forest routing logic
  function extractFeatures(word: string, prevWord: string | null, prevPred: string | null): ExtractedFeatures {
    const cleanWord = word.trim();
    const lower = cleanWord.toLowerCase();
    const numChars = lower.length;

    const isPurePunctuation = PUNCTUATION_REGEX.test(cleanWord) ? 1 : 0;
    if (isPurePunctuation) {
      return {
        length: numChars,
        is_pure_punctuation: 1,
        has_fil_prefix: null,
        has_fil_suffix: null,
        has_fil_infix: null,
        has_non_fil_letters: [],
        has_eng_suffix: null,
        has_eng_cluster: null,
        has_reduplication: false,
        has_partial_reduplication: false,
        is_english_contraction: false,
        has_complex_consonants: false,
        is_fil_short: false,
        is_eng_short: false,
        is_hybrid: false,
      };
    }

    // Filipino Affixes
    let foundFilPrefix: string | null = null;
    for (const pre of FILIPINO_PREFIXES) {
      if (lower.startsWith(pre + '-') || lower.startsWith(pre)) {
        foundFilPrefix = pre;
        break;
      }
    }

    let foundFilSuffix: string | null = null;
    for (const suf of FILIPINO_SUFFIXES) {
      if (lower.endsWith(suf)) {
        foundFilSuffix = suf;
        break;
      }
    }

    let foundFilInfix: string | null = null;
    if (numChars >= 4) {
      for (const infix of FILIPINO_INFIXES) {
        if (lower.slice(1, -1).includes(infix)) {
          foundFilInfix = infix;
          break;
        }
      }
    }

    // Non-Filipino alphabet letters (c, f, j, q, v, x, z)
    const foundNonFil = NON_FIL_LETTERS.filter((ch) => lower.includes(ch));

    // English morphology
    let foundEngSuffix: string | null = null;
    for (const suf of ENGLISH_SUFFIXES) {
      if (lower.endsWith(suf)) {
        foundEngSuffix = suf;
        break;
      }
    }

    let foundEngCluster: string | null = null;
    for (const cl of ENGLISH_CLUSTERS) {
      if (lower.includes(cl)) {
        foundEngCluster = cl;
        break;
      }
    }

    // Reduplication rules: (.+)-\1 or sige-sige / haha
    const hasReduplication = /(.+)-\1/.test(lower) || /([a-z]{2,})\1/.test(lower);
    const hasPartialReduplication = numChars >= 4 && lower.slice(2).includes(lower.slice(0, 2));

    const isEngContraction = ENGLISH_CONTRACTIONS_REGEX.test(cleanWord);
    const hasComplexConsonants = /[bcdfghjklmnpqrstvwxyz]{3,}/i.test(lower);

    // Hybrid detection: Has Filipino verbal affix attached to English root or hyphenated loanword
    const isHyphenatedHybrid = lower.includes('-') && Boolean(foundFilPrefix);
    const isFusedHybrid = Boolean(foundFilPrefix && (foundNonFil.length > 0 || foundEngSuffix || COMMON_ENG_WORDS.has(lower.replace(/^(mag|nag|pa|pag|ma)/, ''))));
    const isHybrid = isHyphenatedHybrid || isFusedHybrid;

    return {
      length: numChars,
      is_pure_punctuation: 0,
      has_fil_prefix: foundFilPrefix,
      has_fil_suffix: foundFilSuffix,
      has_fil_infix: foundFilInfix,
      has_non_fil_letters: foundNonFil,
      has_eng_suffix: foundEngSuffix,
      has_eng_cluster: foundEngCluster,
      has_reduplication: hasReduplication,
      has_partial_reduplication: hasPartialReduplication,
      is_english_contraction: isEngContraction,
      has_complex_consonants: hasComplexConsonants,
      is_fil_short: COMMON_FIL_SHORTS.has(lower),
      is_eng_short: COMMON_EN_SHORTS.has(lower),
      is_hybrid: isHybrid,
    };
  }

  function classifyWord(word: string, feats: ExtractedFeatures, prevPred: string | null): TokenResult {
    const lower = word.toLowerCase().trim();

    // 1. Pure Punctuation & Symbolic
    if (feats.is_pure_punctuation) {
      return {
        token: word,
        label: 'OTH',
        confidence: 0.99,
        reason: 'feature_utils: is_pure_punctuation = 1',
        features: feats,
      };
    }

    // Slang / Emoticon
    if (['lol', 'lmao', 'haha', 'hahaha', 'omg', 'idk'].includes(lower)) {
      return {
        token: word,
        label: 'OTH',
        confidence: 0.96,
        reason: 'feature_utils: Discourse slang / conversational particle',
        features: feats,
      };
    }

    // 2. Hybrid Taglish words (e.g. "nag-coffee", "maghaircut", "pa-send")
    if (feats.is_hybrid) {
      return {
        token: word,
        label: 'HYBRID',
        confidence: 0.95,
        reason: `feature_utils: Filipino affix [${feats.has_fil_prefix}] attached to root with [${feats.has_non_fil_letters.join(',') || 'loanword'}]`,
        features: feats,
      };
    }

    // 3. Filipino Reduplication or Dictionary Stem
    if (feats.has_reduplication || COMMON_FIL_WORDS.has(lower) || feats.is_fil_short) {
      return {
        token: word,
        label: 'FIL',
        confidence: 0.96,
        reason: feats.has_reduplication
          ? 'feature_utils: has_reduplication = 1 (Tagalog morphophonemic rule)'
          : 'feature_utils: matches COMMON_FIL_WORDS / COMMON_FIL_SHORTS',
        features: feats,
      };
    }

    // 4. English Stopwords & Morphological Suffixes
    if (ENGLISH_STOPWORDS.has(lower) || feats.is_eng_short || feats.is_english_contraction || COMMON_ENG_WORDS.has(lower)) {
      return {
        token: word,
        label: 'ENG',
        confidence: 0.95,
        reason: feats.is_english_contraction
          ? 'feature_utils: is_english_contraction = 1'
          : 'feature_utils: matches ENGLISH_STOPWORDS / COMMON_EN_SHORTS',
        features: feats,
      };
    }

    // 5. Filipino Affixation (without English indicators)
    if (feats.has_fil_prefix && feats.has_non_fil_letters.length === 0 && !feats.has_eng_suffix) {
      return {
        token: word,
        label: 'FIL',
        confidence: 0.92,
        reason: `feature_utils: starts_${feats.has_fil_prefix} = 1 & zero foreign characters`,
        features: feats,
      };
    }

    if (feats.has_fil_suffix && feats.has_non_fil_letters.length === 0) {
      return {
        token: word,
        label: 'FIL',
        confidence: 0.91,
        reason: `feature_utils: ends_${feats.has_fil_suffix} = 1`,
        features: feats,
      };
    }

    // 6. English Orthography (foreign letters + complex clusters)
    if (feats.has_non_fil_letters.length > 0 || feats.has_eng_suffix || feats.has_eng_cluster || feats.has_complex_consonants) {
      return {
        token: word,
        label: 'ENG',
        confidence: 0.93,
        reason: `feature_utils: non-Filipino letters [${feats.has_non_fil_letters.join(',')}] or English suffix/cluster`,
        features: feats,
      };
    }

    // 7. Context-Aware Fallback (sequential context from prev_pred)
    const fallbackLabel = prevPred === 'FIL' ? 'FIL' : 'ENG';
    return {
      token: word,
      label: fallbackLabel,
      confidence: 0.81,
      reason: `feature_utils: contextual fallback based on prev_pred [${prevPred || 'NONE'}]`,
      features: feats,
    };
  }

  function analyzeSentence(text: string): TokenResult[] {
    const rawTokens = text.trim().split(/\s+/).filter(Boolean);
    let prevWord: string | null = null;
    let prevPred: string | null = null;

    return rawTokens.map((raw) => {
      const feats = extractFeatures(raw, prevWord, prevPred);
      const res = classifyWord(raw, feats, prevPred);
      prevWord = raw;
      prevPred = res.label;
      return res;
    });
  }

  const handleRun = () => {
    const results = analyzeSentence(inputText);
    setAnalyzedTokens(results);
    setSelectedTokenIndex(0);
  };

  const getBadgeStyle = (label: TokenResult['label']) => {
    switch (label) {
      case 'HYBRID':
        return 'bg-[#BFAC95]/25 text-[#D9C6B0] border-[#BFAC95]/70 font-semibold shadow-sm';
      case 'FIL':
        return 'bg-[#8C7764]/30 text-[#f5efe8] border-[#8C7764]/50';
      case 'ENG':
        return 'bg-[#3b3129]/50 text-[#D9CEC5] border-[#8C7764]/40';
      case 'OTH':
        return 'bg-[#261f1a]/60 text-[#a89a8c] border-[#8C7764]/30';
    }
  };

  const selectedToken = selectedTokenIndex !== null && analyzedTokens[selectedTokenIndex]
    ? analyzedTokens[selectedTokenIndex]
    : null;

  return (
    <div className="rounded-xl border border-[#8C7764]/35 bg-[#151210]/95 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#BFAC95]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Sandbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#8C7764]/25 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#BFAC95]/15 text-[#BFAC95]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-[#f5efe8] tracking-wide">
              PinoyBot Feature Extraction Sandbox
            </h4>
            <p className="font-mono text-xs text-[#BFAC95]/70">
              Direct Port of <code className="text-[#D9C6B0]">feature_utils.py</code> &bull; Word-Level Token Classifier
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#BFAC95]/15 text-[#D9C6B0] border border-[#BFAC95]/35">
            <CheckCircle className="w-3.5 h-3.5 text-[#86efac]" />
            Official Feature Pipeline
          </span>
        </div>
      </div>

      {/* Input controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-[#D9CEC5]/80 font-medium mb-2">
            Discourse Sentence (Filipino, English, or Code-Switched)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
              className="flex-1 bg-[#0e0c0b] border border-[#8C7764]/40 rounded-lg px-4 py-2.5 font-mono text-sm text-[#f5efe8] placeholder-[#BFAC95]/30 focus:outline-none focus:border-[#BFAC95] focus:ring-1 focus:ring-[#BFAC95]"
              placeholder="Type code-switched text here..."
            />
            <button
              onClick={handleRun}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#BFAC95] hover:bg-[#D9C6B0] text-[#0e0c0b] text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 active:scale-95 shrink-0 shadow-md shadow-[#BFAC95]/10"
            >
              <Sparkles className="w-4 h-4" />
              Classify Tokens
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-[#BFAC95]/60">Presets:</span>
          {PRESET_EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(ex);
                const res = analyzeSentence(ex);
                setAnalyzedTokens(res);
                setSelectedTokenIndex(0);
              }}
              className="text-[11px] font-mono text-[#D9C6B0] hover:text-[#f5efe8] underline underline-offset-2 transition-colors truncate max-w-[200px]"
            >
              &ldquo;{ex}&rdquo;
            </button>
          ))}
        </div>

        {/* Live Tokenizer Output */}
        <div className="mt-6 pt-5 border-t border-[#8C7764]/25">
          <div className="text-xs font-mono uppercase tracking-widest text-[#D9CEC5]/80 font-medium mb-3 flex items-center justify-between">
            <span>Inference Output ({analyzedTokens.length} tokens parsed &bull; click any token to inspect its feature vector)</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8C7764]" /> FIL</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#BFAC95]" /> HYBRID</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#52443a]" /> ENG</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#332b25]" /> OTH</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 p-4 rounded-lg bg-[#0e0c0b] border border-[#8C7764]/30 min-h-[90px] items-center">
            {analyzedTokens.map((item, idx) => {
              const isSelected = selectedTokenIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTokenIndex(idx)}
                  className={`group relative inline-flex flex-col items-center px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isSelected ? 'ring-2 ring-[#D9C6B0] scale-105' : 'hover:scale-105'
                  } ${getBadgeStyle(item.label)}`}
                >
                  <span className="font-semibold">{item.token}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-80">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feature Inspection Panel for Selected Token */}
          {selectedToken && (
            <div className="mt-4 p-4 rounded-lg bg-[#1c1815] border border-[#8C7764]/35 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#8C7764]/20">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#BFAC95]" />
                  <span className="text-sm font-bold text-[#f5efe8]">
                    Token: &ldquo;{selectedToken.token}&rdquo;
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${getBadgeStyle(selectedToken.label)}`}>
                    {selectedToken.label} &bull; {(selectedToken.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <span className="text-[10px] text-[#D9CEC5]/60">feature_utils inspector</span>
              </div>

              <div className="text-[#D9C6B0] font-sans text-xs">
                <strong>Decision Path:</strong> {selectedToken.reason}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-[#120f0d] border border-white/5">
                  <span className="text-[#D9CEC5]/50 block">Prefix (starts_):</span>
                  <span className="text-[#f5efe8] font-bold">{selectedToken.features.has_fil_prefix || 'None'}</span>
                </div>
                <div className="p-2 rounded bg-[#120f0d] border border-white/5">
                  <span className="text-[#D9CEC5]/50 block">Foreign letters:</span>
                  <span className="text-[#f5efe8] font-bold">
                    {selectedToken.features.has_non_fil_letters.length > 0 ? selectedToken.features.has_non_fil_letters.join(', ') : 'None (FIL)'}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#120f0d] border border-white/5">
                  <span className="text-[#D9CEC5]/50 block">Reduplication:</span>
                  <span className="text-[#f5efe8] font-bold">
                    {selectedToken.features.has_reduplication ? 'Yes (Full)' : selectedToken.features.has_partial_reduplication ? 'Yes (Partial)' : 'No'}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#120f0d] border border-white/5">
                  <span className="text-[#D9CEC5]/50 block">Hybrid Rule:</span>
                  <span className="text-[#f5efe8] font-bold">{selectedToken.features.is_hybrid ? 'True (Affix+Root)' : 'False'}</span>
                </div>
              </div>
            </div>
          )}

          <p className="mt-3 text-[11px] font-mono text-[#D9CEC5]/60 italic">
            * Direct implementation of <code className="text-[#D9C6B0]">feature_utils.py</code> (sub-word affixes, reduplication regex, English cluster checks, and sequential context). Evaluated on 42,000+ COHFIE tokens at AILRIC 2026.
          </p>
        </div>
      </div>
    </div>
  );
};
