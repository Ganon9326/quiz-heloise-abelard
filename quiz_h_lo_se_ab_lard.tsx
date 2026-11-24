import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Gem,
  Sparkles,
  Users,
  Play,
  ArrowRight,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Check,
  QrCode,
  RotateCcw,
  Crown,
  Medal,
  Award,
  Smartphone,
  Monitor,
  Loader2,
  AlertCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  UserPlus,
  Eye,
  BarChart3,
  Zap
} from 'lucide-react';

// ============================================================================
// 1. ALL 20 QUESTIONS FROM "KAHOOT HÉLOÏSE & ABÉLARD"
// ============================================================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qui est la fondatrice d'Héloïse & Abélard?",
    options: [
      "Héloïse Schapiro",
      "Jeanne Lanvin",
      "Coco Chanel",
      "Elsa Schiaparelli"
    ],
    correctAnswer1Based: 1,
    correctIndex: 0,
    duration: 20
  },
  {
    id: 2,
    question: "Quel est le principe central de la marque ?",
    options: [
      "Extraire toujours plus de diamants",
      "Recycler et transformer les matériaux",
      "Produire des bijoux fantaisie",
      "Importer des bijoux étrangers"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 3,
    question: "Quelle devise résume l'approche de la marque ?",
    options: [
      "Le luxe pour tous",
      "L'élégance avant tout",
      "Transformer plutôt qu'extraire",
      "Créer pour impressionner"
    ],
    correctAnswer1Based: 3,
    correctIndex: 2,
    duration: 20
  },
  {
    id: 4,
    question: "Quel savoir-faire est mis en avant par la marque ?",
    options: [
      "Une fabrication industrielle à grande échelle",
      "Un savoir-faire artisanal parisien",
      "Une production entièrement automatisée",
      "Une fabrication uniquement à l'étranger"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 5,
    question: "Quel délai de production est indiqué dans le dossier ?",
    options: [
      "48 heures",
      "Une semaine",
      "Trois semaines",
      "Trois mois"
    ],
    correctAnswer1Based: 3,
    correctIndex: 2,
    duration: 20
  },
  {
    id: 6,
    question: "Quelle part du marché français en valeur représentent les distributeurs spécialisés ?",
    options: [
      "30%",
      "50%",
      "Près de 70%",
      "90%"
    ],
    correctAnswer1Based: 3,
    correctIndex: 2,
    duration: 30
  },
  {
    id: 7,
    question: "Quel événement a fortement perturbé le marché en 2020?",
    options: [
      "La crise sanitaire",
      "La disparition de l'or",
      "La fin du commerce en ligne",
      "La suppression des bijoux de luxe"
    ],
    correctAnswer1Based: 1,
    correctIndex: 0,
    duration: 20
  },
  {
    id: 8,
    question: "Que signifie le « green gap » ?",
    options: [
      "Le manque de bijoux écologiques",
      "Le décalage entre intentions écologiques et achats réels",
      "La hausse du prix de l'or",
      "La disparition des commerces physiques"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 30
  },
  {
    id: 9,
    question: "Lequel de ces éléments peut servir à segmenter les consommateurs ?",
    options: [
      "L'âge",
      "Le pouvoir d'achat",
      "Les valeurs personnelles",
      "Toutes ces réponses"
    ],
    correctAnswer1Based: 4,
    correctIndex: 3,
    duration: 20
  },
  {
    id: 10,
    question: "Quel est un intérêt des bijoux de seconde main ou recyclés ?",
    options: [
      "Limiter le gaspillage de matières",
      "Supprimer le besoin de savoir-faire",
      "Rendre tous les bijoux gratuits",
      "Éviter toute personnalisation"
    ],
    correctAnswer1Based: 1,
    correctIndex: 0,
    duration: 20
  },
  {
    id: 11,
    question: "À quoi correspond la segmentation marketing?",
    options: [
      "Fixer les prix des produits",
      "Diviser un marché en groupes homogènes",
      "Faire uniquement de la publicité",
      "Choisir les fournisseurs"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 12,
    question: "Lequel est un critère de segmentation psychographique ?",
    options: [
      "L'âge",
      "Le revenu",
      "Le style de vie",
      "Le pays"
    ],
    correctAnswer1Based: 3,
    correctIndex: 2,
    duration: 20
  },
  {
    id: 13,
    question: "Quel est le positionnement d'Héloïse & Abelard ?",
    options: [
      "Bijouterie industrielle à bas prix",
      "Joaillerie éthique, romantique et circulaire",
      "Bijouterie fantaisie pour enfants",
      "Joaillerie traditionnelle de masse"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 30
  },
  {
    id: 14,
    question: "Que signifie USP en marketing ?",
    options: [
      "Unique Selling Proposition",
      "Universal Sales Product",
      "User Strategic Position",
      "United Selling Price"
    ],
    correctAnswer1Based: 1,
    correctIndex: 0,
    duration: 20
  },
  {
    id: 15,
    question: "Quels sont les 4 éléments du marketing mix traditionnel ?",
    options: [
      "Produit, Prix, Place, Promotion",
      "Produit, Public, Profit, Production",
      "Prix, Publicité, Personnel, Profit",
      "Produit, Positionnement, Profit, Public"
    ],
    correctAnswer1Based: 1,
    correctIndex: 0,
    duration: 20
  },
  {
    id: 16,
    question: "Quelles sont les trois dimensions du développement durable ?",
    options: [
      "Marketing, production, finance",
      "Économique, sociale, environnementale",
      "Politique, commerciale, culturelle",
      "Sociale, technologique, financière"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 17,
    question: "Quelle fonction de la marque permet de donner confiance au consommateur ?",
    options: [
      "Diriger",
      "Rassurer",
      "Produire",
      "Distribuer"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 18,
    question: "Qu'est-ce que l'upcycling?",
    options: [
      "Détruire des produits anciens",
      "Transformer des matériaux usagés en nouveaux produits de valeur",
      "Produire uniquement des bijoux neufs",
      "Importer des matières premières"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 30
  },
  {
    id: 19,
    question: "Quel outil analyse le macro-environnement d'une entreprise ?",
    options: [
      "Le SWOT",
      "Le PESTEL",
      "Les 4P",
      "Le questionnaire"
    ],
    correctAnswer1Based: 2,
    correctIndex: 1,
    duration: 20
  },
  {
    id: 20,
    question: "Quel est un avantage distinctif d'Héloïse & Abélard ?",
    options: [
      "La production en très grande quantité",
      "Les prix les plus bas du marché",
      "La personnalisation et la transformation de bijoux",
      "La vente exclusivement en grande surface"
    ],
    correctAnswer1Based: 3,
    correctIndex: 2,
    duration: 30
  }
];

const OPTION_STYLES = [
  {
    letter: 'A',
    number: 1,
    bg: 'bg-rose-600 hover:bg-rose-700',
    border: 'border-rose-700',
    badgeBg: 'bg-white text-rose-700'
  },
  {
    letter: 'B',
    number: 2,
    bg: 'bg-sky-600 hover:bg-sky-700',
    border: 'border-sky-700',
    badgeBg: 'bg-white text-sky-700'
  },
  {
    letter: 'C',
    number: 3,
    bg: 'bg-amber-500 hover:bg-amber-600',
    border: 'border-amber-600',
    badgeBg: 'bg-white text-amber-800'
  },
  {
    letter: 'D',
    number: 4,
    bg: 'bg-emerald-700 hover:bg-emerald-800',
    border: 'border-emerald-800',
    badgeBg: 'bg-white text-emerald-800'
  }
];

const AVATARS = ['💎', '🌿', '✨', '💍', '👑', '🌸', '🕊️', '🦋', '🍀', '🌟', '🎓', '💫'];

const STORAGE_PREFIX = 'ha_classe_quiz_v2_';
const CHANNEL_NAME = 'ha_classe_quiz_bc_v2';
const JSONBLOB_ENDPOINT = 'https://jsonblob.com/api/jsonBlob';

// ============================================================================
// 2. SPEED-BASED SCORING CALCULATOR
// Base 500 pts + up to 500 speed bonus proportional to remaining time (max 1000)
// ============================================================================
function calculateQuestionPoints(isCorrect, elapsedMs, durationSec) {
  if (!isCorrect) return 0;
  const totalMs = Math.max(1000, durationSec * 1000);
  const clampedElapsed = Math.max(0, Math.min(totalMs, elapsedMs));
  const remainingRatio = Math.max(0, 1 - clampedElapsed / totalMs);
  const speedBonus = Math.round(remainingRatio * 500);
  return 500 + speedBonus;
}

// ============================================================================
// 3. LOCAL + CLOUD (JSONBLOB) MULTI-DEVICE SYNC HELPERS
// ============================================================================
function getLocalRoomKey(roomCode) {
  return `${STORAGE_PREFIX}room_${roomCode}`;
}

function getBlobIdKey(roomCode) {
  return `${STORAGE_PREFIX}blob_${roomCode}`;
}

function getClientId() {
  try {
    let cid = sessionStorage.getItem(`${STORAGE_PREFIX}client_id`);
    if (!cid) {
      cid = 'stu_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);
      sessionStorage.setItem(`${STORAGE_PREFIX}client_id`, cid);
    }
    return cid;
  } catch {
    return 'stu_' + Math.random().toString(36).slice(2, 10);
  }
}

function readLocalRoomState(roomCode) {
  if (!roomCode) return null;
  try {
    const raw = localStorage.getItem(getLocalRoomKey(roomCode));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeLocalRoomState(roomCode, stateObj, bc) {
  if (!roomCode || !stateObj) return;
  try {
    localStorage.setItem(getLocalRoomKey(roomCode), JSON.stringify(stateObj));
    bc?.postMessage({
      type: 'ROOM_STATE_UPDATED',
      roomCode,
      state: stateObj,
      ts: Date.now()
    });
  } catch (err) {
    console.error('Local storage write failed:', err);
  }
}

function readStoredBlobId(roomCode) {
  if (!roomCode) return '';
  try {
    return localStorage.getItem(getBlobIdKey(roomCode)) || '';
  } catch {
    return '';
  }
}

function writeStoredBlobId(roomCode, blobId) {
  if (!roomCode || !blobId) return;
  try {
    localStorage.setItem(getBlobIdKey(roomCode), blobId);
  } catch {}
}

/**
 * Creates a cloud JSONBlob record for cross-device classroom syncing.
 * Returns { blobId, syncError } without throwing.
 */
async function createCloudRoomBlob(initialState) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(JSONBLOB_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(initialState),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return { blobId: '', syncError: `Cloud HTTP ${res.status}` };
    }

    const locationHeader = res.headers.get('Location') || res.headers.get('X-Jsonblob-Id') || '';
    let blobId = '';
    if (locationHeader) {
      const parts = locationHeader.trim().split('/');
      blobId = parts[parts.length - 1] || '';
    }
    if (!blobId) {
      try {
        const jsonBody = await res.json();
        if (jsonBody && jsonBody.id) blobId = String(jsonBody.id);
      } catch {}
    }

    if (!blobId) {
      return { blobId: '', syncError: 'ID cloud introuvable' };
    }
    return { blobId, syncError: '' };
  } catch (err) {
    return {
      blobId: '',
      syncError: err?.name === 'AbortError' ? 'Délai cloud dépassé' : 'Mode local actif'
    };
  }
}

/**
 * Fetches latest state from JSONBlob if blobId is known.
 */
async function fetchCloudRoomState(blobId) {
  if (!blobId) return null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(`${JSONBLOB_ENDPOINT}/${encodeURIComponent(blobId)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

/**
 * Pushes updated state to JSONBlob if blobId is known.
 */
async function pushCloudRoomState(blobId, stateObj) {
  if (!blobId || !stateObj) return false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(`${JSONBLOB_ENDPOINT}/${encodeURIComponent(blobId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(stateObj),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Merges two room snapshots cleanly so neither teacher updates nor student joins/answers are lost.
 */
function mergeRoomStates(localState, remoteState) {
  if (!localState) return remoteState;
  if (!remoteState) return localState;

  const localUpdated = localState.updatedAt || 0;
  const remoteUpdated = remoteState.updatedAt || 0;

  // Session control fields come from whichever state has the newer updatedAt
  const base = remoteUpdated > localUpdated ? { ...remoteState } : { ...localState };

  // Merge players by id, keeping the richest/most recent answers & score
  const playerMap = new Map();
  const ingestPlayer = (p) => {
    if (!p || !p.id) return;
    const prev = playerMap.get(p.id);
    if (!prev) {
      playerMap.set(p.id, { ...p, answers: { ...(p.answers || {}) } });
      return;
    }
    const mergedAnswers = { ...(prev.answers || {}), ...(p.answers || {}) };
    let correctCount = 0;
    let score = 0;
    let totalTimeMs = 0;
    Object.values(mergedAnswers).forEach((ans) => {
      if (ans && ans.isCorrect) {
        correctCount += 1;
        score += Number(ans.points || 0);
        totalTimeMs += Number(ans.timeMs || 0);
      }
    });
    playerMap.set(p.id, {
      ...prev,
      ...p,
      name: p.name || prev.name,
      avatar: p.avatar || prev.avatar,
      answers: mergedAnswers,
      correctCount,
      score,
      totalTimeMs
    });
  };

  (localState.players || []).forEach(ingestPlayer);
  (remoteState.players || []).forEach(ingestPlayer);

  return {
    ...base,
    blobId: remoteState.blobId || localState.blobId || base.blobId || '',
    players: Array.from(playerMap.values()),
    updatedAt: Math.max(localUpdated, remoteUpdated)
  };
}

// ============================================================================
// 4. PURE-JS QR CODE MATRIX GENERATOR (VERSION 4, 33x33, BYTE MODE + ECC-L)
// ============================================================================
function detectSandboxedEnvironment() {
  try {
    const href = window.location.href || '';
    const origin = window.location.origin || '';
    const hostname = window.location.hostname || '';
    if (
      !href ||
      !origin ||
      origin === 'null' ||
      href.startsWith('blob:') ||
      href.startsWith('data:') ||
      href.startsWith('about:') ||
      href.startsWith('file:') ||
      window.location.protocol === 'blob:' ||
      window.location.protocol === 'data:' ||
      window.location.protocol === 'file:' ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.local') ||
      hostname.includes('sandbox') ||
      hostname.includes('usercontent') ||
      hostname.includes('webcontainer')
    ) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

function buildStudentJoinUrl(roomCode, pin, customPublicUrl) {
  const params = new URLSearchParams();
  if (roomCode) params.set('room', roomCode);
  if (pin) params.set('pin', pin);
  params.set('role', 'player');

  const trimmed = (customPublicUrl || '').trim();
  if (trimmed) {
    try {
      const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const urlObj = new URL(normalized);
      params.forEach((v, k) => urlObj.searchParams.set(k, v));
      return urlObj.toString();
    } catch {
      const joiner = trimmed.includes('?') ? '&' : '?';
      return `${trimmed}${joiner}${params.toString()}`;
    }
  }

  try {
    const href = window.location.href || '';
    if (
      href &&
      !href.startsWith('blob:') &&
      !href.startsWith('data:') &&
      !href.startsWith('about:') &&
      !href.startsWith('file:')
    ) {
      const urlObj = new URL(href);
      if (urlObj.origin && urlObj.origin !== 'null') {
        const cleanPath = (urlObj.pathname || '/').replace(/blob:.*$/i, '');
        const base = new URL(`${urlObj.origin}${cleanPath || '/'}`);
        params.forEach((v, k) => base.searchParams.set(k, v));
        return base.toString();
      }
    }
  } catch {}

  return `https://heloise-abelard-quiz.app/?${params.toString()}`;
}

/**
 * Generates a QR Code Version 4 (33x33 modules, Byte mode, ECC Level L: 78 data codewords, 24 ECC codewords)
 * Handles URLs cleanly for smartphone camera scanners.
 */
function generateQrMatrixV4(rawPayload) {
  const SIZE = 33; // 4 * 4 + 17 = 33
  const matrix = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const reserved = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  const placeFinderPattern = (r0, c0) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r;
        const cc = c0 + c;
        if (rr < 0 || rr >= SIZE || cc < 0 || cc >= SIZE) continue;
        const border = r === -1 || r === 7 || c === -1 || c === 7;
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[rr][cc] = !border && (outer || inner);
        reserved[rr][cc] = true;
      }
    }
  };

  placeFinderPattern(0, 0);
  placeFinderPattern(0, SIZE - 7);
  placeFinderPattern(SIZE - 7, 0);

  // Version 4 alignment pattern centered at (26, 26)
  const alignCenter = 26;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const rr = alignCenter + r;
      const cc = alignCenter + c;
      matrix[rr][cc] = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
      reserved[rr][cc] = true;
    }
  }

  // Timing patterns on row 6 and col 6
  for (let i = 8; i < SIZE - 8; i++) {
    const bit = i % 2 === 0;
    if (!reserved[6][i]) {
      matrix[6][i] = bit;
      reserved[6][i] = true;
    }
    if (!reserved[i][6]) {
      matrix[i][6] = bit;
      reserved[i][6] = true;
    }
  }

  // Fixed dark module at (4 * V + 9, 8) = (25, 8)
  matrix[25][8] = true;
  reserved[25][8] = true;

  // Reserve format info cells
  for (let i = 0; i < 9; i++) {
    if (i < SIZE) {
      reserved[8][i] = true;
      reserved[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][SIZE - 1 - i] = true;
    reserved[SIZE - 1 - i][8] = true;
  }

  // QR Version 4-L specifications: 100 total codewords = 80 data + 20 ECC (1 block)
  const DATA_CW = 80;
  const ECC_CW = 20;
  const MAX_BYTES = DATA_CW - 3; // 4-bit mode + 8-bit count + payload

  const encoder = new TextEncoder();
  const payloadBytes = Array.from(encoder.encode(String(rawPayload || 'QUIZ'))).slice(0, MAX_BYTES);

  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) {
      bits.push(((val >> i) & 1) === 1);
    }
  };

  pushBits(0b0100, 4); // Byte mode indicator
  pushBits(payloadBytes.length, 8); // Character count (Version 1-9 byte mode = 8 bits)
  for (const b of payloadBytes) {
    pushBits(b, 8);
  }

  const totalDataBits = DATA_CW * 8;
  const termLen = Math.min(4, Math.max(0, totalDataBits - bits.length));
  pushBits(0, termLen);

  while (bits.length % 8 !== 0 && bits.length < totalDataBits) {
    bits.push(false);
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < totalDataBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // GF(256) arithmetic for Reed-Solomon ECC
  const gfExp = new Array(256);
  const gfLog = new Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    gfExp[i] = x;
    gfLog[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  gfExp[255] = gfExp[0];

  const gfMul = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return gfExp[(gfLog[a] + gfLog[b]) % 255];
  };

  let genPoly = [1];
  for (let i = 0; i < ECC_CW; i++) {
    const factorPoly = [1, gfExp[i]];
    const nextPoly = new Array(genPoly.length + factorPoly.length - 1).fill(0);
    for (let a = 0; a < genPoly.length; a++) {
      for (let b = 0; b < factorPoly.length; b++) {
        nextPoly[a + b] ^= gfMul(genPoly[a], factorPoly[b]);
      }
    }
    genPoly = nextPoly;
  }

  const dataWords = [];
  for (let i = 0; i < totalDataBits; i += 8) {
    let cw = 0;
    for (let b = 0; b < 8; b++) {
      if (bits[i + b]) cw |= 1 << (7 - b);
    }
    dataWords.push(cw);
  }

  const eccWords = new Array(ECC_CW).fill(0);
  for (const word of dataWords) {
    const lead = word ^ eccWords[0];
    for (let i = 0; i < ECC_CW - 1; i++) {
      eccWords[i] = eccWords[i + 1] ^ gfMul(genPoly[i + 1], lead);
    }
    eccWords[ECC_CW - 1] = gfMul(genPoly[ECC_CW], lead);
  }

  for (const ecc of eccWords) {
    pushBits(ecc, 8);
  }

  // Zigzag module placement from bottom-right
  let bitIndex = 0;
  let upward = true;
  for (let col = SIZE - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let step = 0; step < SIZE; step++) {
      const row = upward ? SIZE - 1 - step : step;
      for (let cOffset = 0; cOffset < 2; cOffset++) {
        const c = col - cOffset;
        if (!reserved[row][c]) {
          matrix[row][c] = bitIndex < bits.length ? bits[bitIndex] : false;
          bitIndex++;
        }
      }
    }
    upward = !upward;
  }

  // Apply Mask 0: (row + col) % 2 === 0
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!reserved[r][c] && (r + c) % 2 === 0) {
        matrix[r][c] = !matrix[r][c];
      }
    }
  }

  // Format information bits for ECC Level L (01) + Mask 0 (000) -> 0x77c0
  const fmtBits = 0x77c0;
  const getFmtBit = (i) => ((fmtBits >> (14 - i)) & 1) === 1;

  const fmtCoordsA = [
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
    [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]
  ];
  fmtCoordsA.forEach(([r, c], idx) => {
    matrix[r][c] = getFmtBit(idx);
  });

  for (let i = 0; i < 8; i++) {
    matrix[8][SIZE - 1 - i] = getFmtBit(i);
  }
  for (let i = 8; i < 15; i++) {
    matrix[SIZE - 15 + i][8] = getFmtBit(i);
  }

  return matrix;
}

function ClassroomQrCodeSvg({ urlValue, size = 210 }) {
  const matrix = useMemo(() => generateQrMatrixV4(urlValue), [urlValue]);
  const dim = matrix.length;

  return (
    <div
      className="bg-white p-3.5 rounded-2xl border-2 border-[#D4AF37] shadow-md flex items-center justify-center mx-auto"
      style={{ width: size + 28, height: size + 28 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${dim} ${dim}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={`QR Code de connexion au quiz : ${urlValue}`}
        className="block rounded"
      >
        <rect x="0" y="0" width={dim} height={dim} fill="#FFFFFF" />
        {matrix.map((row, rIdx) =>
          row.map((cellDark, cIdx) =>
            cellDark ? (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width="1"
                height="1"
                fill="#064E3B"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

function ConfettiCelebration() {
  const pieces = useMemo(() => {
    const colors = ['#D4AF37', '#064E3B', '#10B981', '#F59E0B', '#FDE68A', '#047857'];
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${(i * 2.05) % 100}%`,
      delay: `${(i % 10) * 0.22}s`,
      duration: `${3 + (i % 5) * 0.4}s`,
      color: colors[i % colors.length],
      size: `${7 + (i % 4) * 2}px`,
      shape: i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rotate-45' : 'rounded-sm'
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <style>{`
        @keyframes haConfettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 ${p.shape}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `haConfettiFall ${p.duration} linear ${p.delay} infinite`
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// 5. MAIN APPLICATION : QUIZ HÉLOÏSE & ABÉLARD (MODE PROF & MODE ÉTUDIANT)
// ============================================================================
export default function App() {
  const clientId = useMemo(() => getClientId(), []);
  const isSandboxedPreview = useMemo(() => detectSandboxedEnvironment(), []);

  // Navigation & role state: 'landing' | 'host' | 'player'
  const [role, setRole] = useState('landing');
  const [roomCode, setRoomCode] = useState('');
  const [pin, setPin] = useState('');
  const [blobId, setBlobId] = useState('');

  // Join inputs for students
  const [inputPin, setInputPin] = useState('');
  const [inputRoom, setInputRoom] = useState('');
  const [studentName, setStudentName] = useState('');

  // Teacher public URL input for QR code when hosted on a public HTTPS URL
  const [publicAppUrl, setPublicAppUrl] = useState('');

  // Room state & sync status
  const [roomState, setRoomState] = useState(null);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [syncStatusLabel, setSyncStatusLabel] = useState('Local + Multi-onglets');

  // UI feedback & timer
  const [errorMsg, setErrorMsg] = useState('');
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isJoiningSession, setIsJoiningSession] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const bcRef = useRef(null);
  const roomStateRef = useRef(null);
  roomStateRef.current = roomState;

  // BroadcastChannel setup for instant same-browser multi-tab sync
  useEffect(() => {
    let channel = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel(CHANNEL_NAME);
        bcRef.current = channel;
      }
    } catch {
      channel = null;
    }
    return () => {
      if (channel) {
        try {
          channel.close();
        } catch {}
      }
      bcRef.current = null;
    };
  }, []);

  // Parse URL query parameters (?room=XXXX&pin=YYYY&role=player) on initial load
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const qRoom = (sp.get('room') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
      const qPin = (sp.get('pin') || '').replace(/\D/g, '').slice(0, 4);
      const qRole = (sp.get('role') || sp.get('mode') || '').toLowerCase();

      if (qRoom) setInputRoom(qRoom);
      if (qPin) setInputPin(qPin);

      if (qRole === 'player' || qPin.length === 4 || qRoom.length >= 4) {
        const effectiveCode = qRoom || qPin;
        if (effectiveCode) {
          const localSnap = readLocalRoomState(effectiveCode);
          const storedBlob = readStoredBlobId(effectiveCode) || localSnap?.blobId || '';
          setRoomCode(effectiveCode);
          setPin(qPin || localSnap?.pin || effectiveCode);
          if (storedBlob) setBlobId(storedBlob);
          if (localSnap) {
            setRoomState(localSnap);
          }
        }
        setRole('player');
      }
    } catch (err) {
      console.error('Query param parse error:', err);
    }
  }, []);

  // Commit state both locally (instant) and to cloud JSONBlob (cross-device)
  const commitRoomState = useCallback(
    async (targetCode, nextState, explicitBlobId) => {
      if (!targetCode || !nextState) return;
      const activeBlob = explicitBlobId || nextState.blobId || blobId || readStoredBlobId(targetCode);
      const stamped = {
        ...nextState,
        roomCode: targetCode,
        blobId: activeBlob || nextState.blobId || '',
        updatedAt: Date.now()
      };

      setRoomState(stamped);
      roomStateRef.current = stamped;
      writeLocalRoomState(targetCode, stamped, bcRef.current);

      if (activeBlob) {
        const ok = await pushCloudRoomState(activeBlob, stamped);
        setCloudSynced(ok);
        setSyncStatusLabel(ok ? 'Cloud + Multi-appareils actif' : 'Mode local actif');
      }
    },
    [blobId]
  );

  // Continuous sync loop (BroadcastChannel + storage event + cloud/local polling)
  useEffect(() => {
    if (!roomCode) return;

    let cancelled = false;
    const activeBlob = blobId || readStoredBlobId(roomCode) || roomStateRef.current?.blobId || '';
    if (activeBlob && !blobId) {
      setBlobId(activeBlob);
    }

    const applyIncomingState = (incoming) => {
      if (!incoming || cancelled) return;
      const merged = mergeRoomStates(roomStateRef.current || readLocalRoomState(roomCode), incoming);
      if (merged) {
        setRoomState(merged);
        roomStateRef.current = merged;
        try {
          localStorage.setItem(getLocalRoomKey(roomCode), JSON.stringify(merged));
        } catch {}
        if (merged.blobId && !blobId) {
          setBlobId(merged.blobId);
          writeStoredBlobId(roomCode, merged.blobId);
        }
      }
    };

    // Immediate local hydration
    const localInit = readLocalRoomState(roomCode);
    if (localInit) {
      applyIncomingState(localInit);
    }

    const handleBc = (ev) => {
      const msg = ev?.data;
      if (!msg || msg.roomCode !== roomCode) return;
      if (msg.type === 'ROOM_STATE_UPDATED' && msg.state) {
        applyIncomingState(msg.state);
      } else if (msg.type === 'REQUEST_ROOM_STATE') {
        const current = roomStateRef.current || readLocalRoomState(roomCode);
        if (current) {
          bcRef.current?.postMessage({
            type: 'ROOM_STATE_UPDATED',
            roomCode,
            state: current,
            ts: Date.now()
          });
        }
      }
    };

    const handleStorage = (ev) => {
      if (!ev || ev.key !== getLocalRoomKey(roomCode) || !ev.newValue) return;
      try {
        const parsed = JSON.parse(ev.newValue);
        applyIncomingState(parsed);
      } catch {}
    };

    bcRef.current?.addEventListener('message', handleBc);
    window.addEventListener('storage', handleStorage);

    try {
      bcRef.current?.postMessage({ type: 'REQUEST_ROOM_STATE', roomCode, ts: Date.now() });
    } catch {}

    const pollSync = async () => {
      if (cancelled) return;
      const localLatest = readLocalRoomState(roomCode);
      if (localLatest) {
        applyIncomingState(localLatest);
      }
      const idToUse = blobId || readStoredBlobId(roomCode) || localLatest?.blobId || '';
      if (idToUse) {
        const remoteLatest = await fetchCloudRoomState(idToUse);
        if (remoteLatest && !cancelled) {
          setCloudSynced(true);
          setSyncStatusLabel('Cloud + Multi-appareils actif');
          applyIncomingState(remoteLatest);
        }
      }
    };

    pollSync();
    const intervalId = setInterval(pollSync, 1400);

    return () => {
      cancelled = true;
      bcRef.current?.removeEventListener('message', handleBc);
      window.removeEventListener('storage', handleStorage);
      clearInterval(intervalId);
    };
  }, [roomCode, blobId]);

  // Reveal current question answer (teacher action or timer expiry)
  const revealCurrentAnswer = useCallback(async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current || current.status !== 'question') return;
    const nextState = {
      ...current,
      status: 'reveal'
    };
    await commitRoomState(roomCode, nextState);
  }, [roomCode, commitRoomState]);

  // Question countdown timer synchronized with questionStartTime
  useEffect(() => {
    if (!roomState || roomState.status !== 'question') {
      return;
    }
    const q = QUIZ_QUESTIONS[roomState.currentQuestionIndex];
    if (!q) return;

    const updateTimer = () => {
      const startedAt = roomState.questionStartTime || Date.now();
      const elapsedSec = (Date.now() - startedAt) / 1000;
      const remaining = Math.max(0, Math.ceil(q.duration - elapsedSec));
      setTimeLeft(remaining);

      if (role === 'host' && remaining <= 0) {
        revealCurrentAnswer();
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 200);
    return () => clearInterval(timerId);
  }, [roomState, role, revealCurrentAnswer]);

  // --------------------------------------------------------------------------
  // TEACHER ACTIONS
  // --------------------------------------------------------------------------
  const handleCreateSession = async () => {
    setIsCreatingSession(true);
    setErrorMsg('');

    try {
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
      const generatedRoom = `HA${generatedPin}`;

      const initialState = {
        roomCode: generatedRoom,
        pin: generatedPin,
        blobId: '',
        hostId: clientId,
        status: 'lobby', // 'lobby' | 'question' | 'reveal' | 'finished'
        currentQuestionIndex: 0,
        questionStartTime: null,
        players: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      setRoomCode(generatedRoom);
      setPin(generatedPin);
      setInputRoom(generatedRoom);
      setInputPin(generatedPin);
      setRoomState(initialState);
      roomStateRef.current = initialState;
      writeLocalRoomState(generatedRoom, initialState, bcRef.current);
      setRole('host');

      const { blobId: createdBlobId, syncError } = await createCloudRoomBlob(initialState);
      if (createdBlobId) {
        writeStoredBlobId(generatedRoom, createdBlobId);
        setBlobId(createdBlobId);
        setCloudSynced(true);
        setSyncStatusLabel('Cloud + Multi-appareils actif');
        const withBlob = { ...initialState, blobId: createdBlobId, updatedAt: Date.now() };
        setRoomState(withBlob);
        roomStateRef.current = withBlob;
        writeLocalRoomState(generatedRoom, withBlob, bcRef.current);
        await pushCloudRoomState(createdBlobId, withBlob);
      } else {
        setCloudSynced(false);
        setSyncStatusLabel(syncError || 'Mode local actif');
      }
    } catch (err) {
      console.error('Error creating session:', err);
      setErrorMsg('Impossible de créer la session.');
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleStartQuiz = async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current) return;
    const startedState = {
      ...current,
      status: 'question',
      currentQuestionIndex: 0,
      questionStartTime: Date.now()
    };
    await commitRoomState(roomCode, startedState);
  };

  const handleNextQuestion = async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current) return;
    const nextIdx = (current.currentQuestionIndex || 0) + 1;
    const nextState =
      nextIdx >= QUIZ_QUESTIONS.length
        ? {
            ...current,
            status: 'finished'
          }
        : {
            ...current,
            status: 'question',
            currentQuestionIndex: nextIdx,
            questionStartTime: Date.now()
          };
    await commitRoomState(roomCode, nextState);
  };

  const handleReplaySameClass = async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current) return;
    const resetPlayers = (current.players || []).map((p) => ({
      ...p,
      score: 0,
      correctCount: 0,
      totalTimeMs: 0,
      answers: {}
    }));
    const resetState = {
      ...current,
      status: 'lobby',
      currentQuestionIndex: 0,
      questionStartTime: null,
      players: resetPlayers
    };
    await commitRoomState(roomCode, resetState);
  };

  const handleSimulateThreeStudents = async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current) return;

    const demoStudents = [
      { id: 'demo_camille', name: 'Camille', avatar: '💎' },
      { id: 'demo_lucas', name: 'Lucas', avatar: '🌿' },
      { id: 'demo_ines', name: 'Inès', avatar: '✨' }
    ];

    const existingPlayers = [...(current.players || [])];
    demoStudents.forEach((demo, idx) => {
      const foundIdx = existingPlayers.findIndex((p) => p.id === demo.id);
      if (foundIdx === -1) {
        existingPlayers.push({
          id: demo.id,
          name: demo.name,
          avatar: demo.avatar,
          score: 0,
          correctCount: 0,
          totalTimeMs: 0,
          answers: {},
          joinedAt: Date.now() + idx
        });
      }
    });

    const nextState = {
      ...current,
      players: existingPlayers
    };
    await commitRoomState(roomCode, nextState);
  };

  const handleOpenStudentSimulation = async () => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current) return;

    const existingPlayers = [...(current.players || [])];
    const simName = studentName.trim() || 'Élève Test';
    const foundIdx = existingPlayers.findIndex((p) => p.id === clientId);

    if (foundIdx === -1) {
      existingPlayers.push({
        id: clientId,
        name: simName,
        avatar: AVATARS[existingPlayers.length % AVATARS.length],
        score: 0,
        correctCount: 0,
        totalTimeMs: 0,
        answers: {},
        joinedAt: Date.now()
      });
    } else {
      existingPlayers[foundIdx] = {
        ...existingPlayers[foundIdx],
        name: simName
      };
    }

    setStudentName(simName);
    const nextState = { ...current, players: existingPlayers };
    await commitRoomState(roomCode, nextState);
    setRole('player');
  };

  const handleResetToLanding = () => {
    setRole('landing');
    setRoomCode('');
    setPin('');
    setBlobId('');
    setRoomState(null);
    setErrorMsg('');
    try {
      const cleanHref = `${window.location.origin}${window.location.pathname}`;
      window.history.replaceState({}, '', cleanHref);
    } catch {}
  };

  // --------------------------------------------------------------------------
  // STUDENT ACTIONS
  // --------------------------------------------------------------------------
  const handleJoinSession = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPin = inputPin.replace(/\D/g, '').slice(0, 4);
    const cleanRoom = (inputRoom || (cleanPin.length === 4 ? `HA${cleanPin}` : ''))
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6);
    const cleanName = studentName.trim();

    if (cleanPin.length !== 4 && cleanRoom.length < 4) {
      setErrorMsg('Veuillez saisir le code PIN à 4 chiffres affiché au tableau.');
      return;
    }
    if (!cleanName) {
      setErrorMsg('Veuillez saisir votre prénom.');
      return;
    }

    setIsJoiningSession(true);

    try {
      const targetCode = cleanRoom || `HA${cleanPin}`;
      const localSnap = readLocalRoomState(targetCode);
      const knownBlob = readStoredBlobId(targetCode) || localSnap?.blobId || '';

      let activeState = localSnap;
      if (knownBlob) {
        const remoteSnap = await fetchCloudRoomState(knownBlob);
        activeState = mergeRoomStates(localSnap, remoteSnap);
      }

      if (!activeState) {
        setErrorMsg(
          `Session introuvable (${targetCode}). Vérifiez que le professeur a bien créé la session et que l'URL ou le code est exact.`
        );
        setIsJoiningSession(false);
        return;
      }

      if (cleanPin.length === 4 && activeState.pin && activeState.pin !== cleanPin) {
        setErrorMsg(`Code PIN incorrect (${cleanPin}). Vérifiez le PIN au tableau.`);
        setIsJoiningSession(false);
        return;
      }

      const playersList = [...(activeState.players || [])];
      const idx = playersList.findIndex((p) => p.id === clientId);
      const avatar =
        idx >= 0 ? playersList[idx].avatar : AVATARS[playersList.length % AVATARS.length];

      const studentRecord = {
        ...(idx >= 0 ? playersList[idx] : {}),
        id: clientId,
        name: cleanName.slice(0, 24),
        avatar,
        score: idx >= 0 ? playersList[idx].score || 0 : 0,
        correctCount: idx >= 0 ? playersList[idx].correctCount || 0 : 0,
        totalTimeMs: idx >= 0 ? playersList[idx].totalTimeMs || 0 : 0,
        answers: idx >= 0 ? playersList[idx].answers || {} : {},
        joinedAt: idx >= 0 ? playersList[idx].joinedAt || Date.now() : Date.now()
      };

      if (idx >= 0) {
        playersList[idx] = studentRecord;
      } else {
        playersList.push(studentRecord);
      }

      const nextState = {
        ...activeState,
        roomCode: targetCode,
        blobId: knownBlob || activeState.blobId || '',
        players: playersList
      };

      if (nextState.blobId) {
        setBlobId(nextState.blobId);
        writeStoredBlobId(targetCode, nextState.blobId);
      }

      setRoomCode(targetCode);
      setPin(nextState.pin || cleanPin);
      await commitRoomState(targetCode, nextState, nextState.blobId);
      setRole('player');
    } catch (err) {
      console.error('Join error:', err);
      setErrorMsg('Erreur lors de la connexion à la session.');
    } finally {
      setIsJoiningSession(false);
    }
  };

  const handleStudentAnswer = async (optionIdx) => {
    const current = roomStateRef.current || readLocalRoomState(roomCode);
    if (!roomCode || !current || current.status !== 'question' || isSubmittingAnswer) {
      return;
    }

    const qIdx = current.currentQuestionIndex || 0;
    const qObj = QUIZ_QUESTIONS[qIdx];
    if (!qObj) return;

    const latestPlayers = [...(current.players || [])];
    const meIdx = latestPlayers.findIndex((p) => p.id === clientId);
    if (meIdx === -1) return;

    const me = latestPlayers[meIdx];
    if (me.answers && me.answers[qIdx] !== undefined) return;

    setIsSubmittingAnswer(true);

    try {
      const startedAt = current.questionStartTime || Date.now();
      const elapsedMs = Math.max(
        100,
        Math.min(qObj.duration * 1000, Date.now() - startedAt)
      );
      const isCorrect = optionIdx === qObj.correctIndex;
      const earnedPoints = calculateQuestionPoints(isCorrect, elapsedMs, qObj.duration);

      const nextAnswers = {
        ...(me.answers || {}),
        [qIdx]: {
          choice: optionIdx,
          choiceNumber: optionIdx + 1,
          isCorrect,
          points: earnedPoints,
          timeMs: elapsedMs
        }
      };

      let totalScore = 0;
      let totalCorrect = 0;
      let totalTime = 0;
      Object.values(nextAnswers).forEach((a) => {
        if (a && a.isCorrect) {
          totalScore += Number(a.points || 0);
          totalCorrect += 1;
          totalTime += Number(a.timeMs || 0);
        }
      });

      latestPlayers[meIdx] = {
        ...me,
        score: totalScore,
        correctCount: totalCorrect,
        totalTimeMs: totalTime,
        answers: nextAnswers
      };

      const nextState = {
        ...current,
        players: latestPlayers
      };

      await commitRoomState(roomCode, nextState);
    } catch (err) {
      console.error('Answer submit error:', err);
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  // --------------------------------------------------------------------------
  // DERIVED STATE : PLAYERS, LEADERBOARD, JOIN URL
  // --------------------------------------------------------------------------
  const players = useMemo(() => roomState?.players || [], [roomState]);

  // Sorted by speed-based points descending, then fewer correct-answer ms, then join order
  const leaderboard = useMemo(() => {
    return [...players].sort((a, b) => {
      const scoreDiff = (b.score || 0) - (a.score || 0);
      if (scoreDiff !== 0) return scoreDiff;
      const correctDiff = (b.correctCount || 0) - (a.correctCount || 0);
      if (correctDiff !== 0) return correctDiff;
      const timeDiff = (a.totalTimeMs || Number.MAX_SAFE_INTEGER) - (b.totalTimeMs || Number.MAX_SAFE_INTEGER);
      if (timeDiff !== 0) return timeDiff;
      return (a.joinedAt || 0) - (b.joinedAt || 0);
    });
  }, [players]);

  const joinUrl = useMemo(() => {
    if (!roomCode && !pin) return '';
    return buildStudentJoinUrl(roomCode, pin, publicAppUrl);
  }, [roomCode, pin, publicAppUrl]);

  const handleCopyJoinLink = () => {
    if (!joinUrl) return;
    try {
      navigator.clipboard?.writeText(joinUrl);
    } catch {}
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // ==========================================================================
  // VIEW 1 : LANDING / JOIN SCREEN
  // ==========================================================================
  if (role === 'landing' || (role === 'player' && !roomState)) {
    const isDirectStudentJoin = role === 'player';

    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col justify-between">
        <header className="w-full border-b border-[#D4AF37]/30 bg-white/90 backdrop-blur-sm py-4 px-5">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#064E3B] text-[#D4AF37] flex items-center justify-center shadow-sm">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#064E3B]">
                  Quiz Héloïse & Abélard
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs uppercase tracking-widest text-[#9A6B1E] font-semibold">
                  · 20 Questions · Classe en Direct
                </span>
              </div>
            </div>

            {isDirectStudentJoin && (
              <button
                onClick={handleResetToLanding}
                className="text-xs font-bold text-[#064E3B] hover:underline cursor-pointer"
              >
                Mode Prof / Accueil
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-5xl">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#9A6B1E] font-semibold mb-2">
                Transformer plutôt qu'extraire
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#064E3B] mb-3">
                Quiz Héloïse & Abélard
              </h1>
              <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
                Projetez au tableau en <strong>Mode Prof</strong> avec QR code et PIN à 4 chiffres, puis laissez les étudiants répondre en direct sur leur téléphone pour révéler le <strong>Top 3</strong>.
              </p>
            </div>

            {errorMsg && (
              <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <p className="font-bold">Impossible de rejoindre</p>
                  <p className="text-xs sm:text-sm mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            <div
              className={`grid grid-cols-1 ${
                isDirectStudentJoin ? 'max-w-md mx-auto' : 'lg:grid-cols-2'
              } gap-6`}
            >
              {/* Student Join Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/40">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#9A6B1E] text-xs font-bold mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mode Étudiant</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#064E3B] mb-2">
                  Rejoindre la session
                </h2>
                <p className="text-sm text-stone-500 mb-6">
                  Entrez le code PIN à 4 chiffres affiché au tableau et votre prénom.
                </p>

                <form onSubmit={handleJoinSession} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        PIN (4 chiffres)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="Ex: 4821"
                        value={inputPin}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setInputPin(digits);
                          if (digits.length === 4) {
                            setInputRoom(`HA${digits}`);
                          }
                        }}
                        className="w-full text-center text-2xl font-mono font-extrabold tracking-[0.25em] py-3 px-3 rounded-xl border-2 border-stone-200 focus:border-[#064E3B] focus:outline-none bg-[#FBF9F5] text-[#064E3B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        Code Salle (optionnel)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Ex: HA4821"
                        value={inputRoom}
                        onChange={(e) =>
                          setInputRoom(
                            e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
                          )
                        }
                        className="w-full text-center text-lg font-mono font-bold tracking-wider py-3.5 px-3 rounded-xl border-2 border-stone-200 focus:border-[#064E3B] focus:outline-none bg-[#FBF9F5] text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      Votre Prénom
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      placeholder="Ex: Camille"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full text-base font-medium py-3 px-4 rounded-xl border-2 border-stone-200 focus:border-[#064E3B] focus:outline-none bg-[#FBF9F5] text-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isJoiningSession}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-base shadow-lg shadow-[#064E3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isJoiningSession ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Connexion...</span>
                      </>
                    ) : (
                      <>
                        <span>Rejoindre le quiz</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Teacher Board Card */}
              {!isDirectStudentJoin && (
                <div className="bg-[#064E3B] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/40 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -right-14 -top-14 w-48 h-48 rounded-full bg-[#D4AF37]/10 pointer-events-none" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FDE68A] text-xs font-bold mb-4">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Mode Prof / Tableau</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                      Lancer une session de classe
                    </h2>
                    <p className="text-sm text-emerald-100/85 mb-6 leading-relaxed">
                      Générez instantanément un QR code SVG, un PIN à 4 chiffres et une salle synchronisée pour les 20 questions sur <strong>Héloïse & Abélard</strong>.
                    </p>

                    <ul className="space-y-3 text-sm text-emerald-50 mb-8">
                      <li className="flex items-center gap-2.5">
                        <QrCode className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>QR Code vectoriel + gestion URL publique / aperçu</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>Points basés sur la rapidité (500 pts + jusqu'à 500 pts bonus)</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Trophy className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>Révélation des réponses, statistiques & podium Top 3</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleCreateSession}
                    disabled={isCreatingSession}
                    className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#042F2E] font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isCreatingSession ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Création de la salle...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Créer une session (Mode Prof)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-stone-400">
          Héloïse & Abélard — Joaillerie Éthique, Romantique et Circulaire
        </footer>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 2 : TEACHER BOARD (MODE PROF / TABLEAU)
  // ==========================================================================
  if (role === 'host') {
    const status = roomState?.status || 'lobby';
    const qIdx = roomState?.currentQuestionIndex || 0;
    const currentQ = QUIZ_QUESTIONS[qIdx];

    const answeredPlayers = players.filter(
      (p) => p.answers && p.answers[qIdx] !== undefined
    );
    const distCounts = [0, 0, 0, 0];
    answeredPlayers.forEach((p) => {
      const ch = p.answers[qIdx]?.choice;
      if (typeof ch === 'number' && ch >= 0 && ch <= 3) {
        distCounts[ch]++;
      }
    });

    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
        {/* Top Teacher Bar */}
        <header className="bg-[#064E3B] text-white px-4 sm:px-6 py-3.5 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#042F2E] flex items-center justify-center font-bold">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-lg sm:text-xl font-bold">
                  Quiz Héloïse & Abélard
                </h1>
                <p className="text-xs text-emerald-200">Mode Prof / Tableau</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  cloudSynced
                    ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500/40'
                    : 'bg-white/10 text-emerald-100 border-white/20'
                }`}
              >
                {cloudSynced ? (
                  <Wifi className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5 text-[#FDE68A]" />
                )}
                <span>{syncStatusLabel}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40">
                <span className="text-xs uppercase tracking-wider text-emerald-200">PIN :</span>
                <span className="font-mono text-lg font-extrabold text-[#FDE68A] tracking-widest">
                  {pin}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-bold text-sm">{players.length}</span>
                <span className="hidden sm:inline text-xs text-emerald-100">
                  {players.length > 1 ? 'étudiants' : 'étudiant'}
                </span>
              </div>

              <button
                onClick={handleResetToLanding}
                title="Retour à l'accueil"
                className="p-2 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* --- PHASE A : CLASSROOM LOBBY --- */}
        {status === 'lobby' && (
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: QR Code, PIN, Public URL Box & Quick Simulation */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#D4AF37]/40 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-3">
                Scanner avec le téléphone
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] mb-2">
                Rejoindre la salle
              </h2>

              <ClassroomQrCodeSvg urlValue={joinUrl} size={204} />

              <div className="mt-4 pt-4 border-t border-stone-100">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-stone-400 font-bold">
                      Code PIN
                    </p>
                    <p className="font-mono text-3xl sm:text-4xl font-black text-[#064E3B] tracking-[0.2em]">
                      {pin}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-stone-200" />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-stone-400 font-bold">
                      Salle
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-extrabold text-[#9A6B1E]">
                      {roomCode}
                    </p>
                  </div>
                </div>

                {/* Public App URL Box + Sandbox Diagnostic */}
                <div className="text-left bg-[#FBF9F5] p-3.5 rounded-2xl border border-stone-200/90 mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#064E3B]">
                      URL publique de l'appli
                    </label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSandboxedPreview && !publicAppUrl.trim()
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {isSandboxedPreview && !publicAppUrl.trim()
                        ? 'Aperçu local / bac à sable'
                        : 'Lien prêt'}
                    </span>
                  </div>

                  <input
                    type="url"
                    placeholder="https://mon-quiz-heloise.vercel.app"
                    value={publicAppUrl}
                    onChange={(e) => setPublicAppUrl(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded-xl border border-stone-300 bg-white text-stone-800 focus:border-[#064E3B] focus:outline-none"
                  />

                  {isSandboxedPreview && !publicAppUrl.trim() ? (
                    <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 rounded-lg p-2 mt-2 leading-snug">
                      <strong>Aperçu isolé détecté :</strong> un téléphone extérieur ne peut pas ouvrir une adresse <code>blob:</code>, <code>localhost</code> ou bac à sable. Collez ici votre <strong>URL publique HTTPS</strong> (ou utilisez les boutons de simulation ci-dessous).
                    </p>
                  ) : (
                    <p className="text-[11px] text-stone-500 mt-1.5 break-all">
                      QR : <span className="font-mono text-stone-700">{joinUrl}</span>
                    </p>
                  )}
                </div>

                {/* Simulation & Share Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                  <button
                    onClick={handleOpenStudentSimulation}
                    className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#042F2E] font-extrabold text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span>Ouvrir vue étudiant (simulation)</span>
                  </button>

                  <button
                    onClick={handleSimulateThreeStudents}
                    className="py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                    <span>Simuler 3 étudiants</span>
                  </button>
                </div>

                <button
                  onClick={handleCopyJoinLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Lien étudiant copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#9A6B1E]" />
                      <span>Copier le lien d'invitation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Connected Students & Launch Quiz */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B]">
                      Étudiants connectés
                    </h3>
                    <p className="text-sm text-stone-500">
                      Les participants apparaissent en direct dès qu'ils rejoignent la session.
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-[#064E3B] text-white font-extrabold text-xl">
                    {players.length}
                  </div>
                </div>

                {players.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#FBF9F5] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <p className="text-stone-700 font-semibold text-base">
                      En attente des étudiants...
                    </p>
                    <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                      Les étudiants scannent le QR code ou saisissent le PIN <strong className="font-mono text-stone-600">{pin}</strong>, ou cliquez sur <strong>Simuler 3 étudiants</strong> pour tester.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
                    {players.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#D4AF37]/30 shadow-sm"
                      >
                        <span className="text-2xl">{p.avatar || '💎'}</span>
                        <span className="font-bold text-stone-800 truncate text-sm sm:text-base">
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs sm:text-sm text-stone-500 font-medium">
                  20 questions · 500 pts + jusqu'à 500 pts bonus rapidité
                </span>
                <button
                  onClick={handleStartQuiz}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white font-extrabold text-lg shadow-lg shadow-[#064E3B]/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Lancer le Quiz</span>
                </button>
              </div>
            </div>
          </main>
        )}

        {/* --- PHASE B : ACTIVE QUESTION & ANSWER REVEAL --- */}
        {(status === 'question' || status === 'reveal') && currentQ && (
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Question Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="px-4 py-1.5 rounded-full bg-[#064E3B]/10 text-[#064E3B] font-extrabold text-sm sm:text-base">
                  Question {qIdx + 1} / {QUIZ_QUESTIONS.length} · {currentQ.duration}s
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
                    <span className="font-extrabold text-stone-800 text-sm sm:text-base">
                      {answeredPlayers.length} / {players.length}
                    </span>
                    <span className="text-xs text-stone-500 hidden sm:inline">réponses</span>
                  </div>

                  {status === 'question' ? (
                    <div
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-black text-xl shadow-sm border ${
                        timeLeft <= 5
                          ? 'bg-red-600 text-white border-red-700 animate-pulse'
                          : 'bg-[#D4AF37] text-[#042F2E] border-[#B47E24]'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span>{timeLeft}s</span>
                    </div>
                  ) : (
                    <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 font-extrabold text-sm border border-emerald-300">
                      Bonne réponse : {OPTION_STYLES[currentQ.correctIndex].letter} ({currentQ.correctAnswer1Based})
                    </span>
                  )}
                </div>
              </div>

              {/* Countdown Progress Bar */}
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full transition-all duration-300 ${
                    status === 'reveal'
                      ? 'bg-emerald-600 w-full'
                      : timeLeft <= 5
                      ? 'bg-red-600'
                      : 'bg-[#064E3B]'
                  }`}
                  style={{
                    width:
                      status === 'reveal'
                        ? '100%'
                        : `${Math.max(0, (timeLeft / currentQ.duration) * 100)}%`
                  }}
                />
              </div>

              {/* Large Classroom Question Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-[#D4AF37]/40 text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#064E3B] leading-snug">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            {/* Answer Distribution & Top Scores on Reveal */}
            {status === 'reveal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
                <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-stone-200 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-400 mb-3">
                    <BarChart3 className="w-4 h-4 text-[#064E3B]" />
                    <span>Répartition des réponses ({answeredPlayers.length})</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 sm:gap-5 items-end h-28 pt-4">
                    {currentQ.options.map((_, idx) => {
                      const count = distCounts[idx];
                      const pct =
                        answeredPlayers.length > 0
                          ? Math.round((count / answeredPlayers.length) * 100)
                          : 0;
                      const isRight = idx === currentQ.correctIndex;
                      return (
                        <div key={idx} className="flex flex-col items-center h-full justify-end">
                          <span className="text-xs font-extrabold text-stone-700 mb-1">
                            {count} ({pct}%)
                          </span>
                          <div className="w-full bg-stone-100 rounded-t-lg h-16 flex items-end overflow-hidden">
                            <div
                              className={`w-full transition-all duration-500 rounded-t-lg ${
                                isRight ? 'bg-emerald-600' : 'bg-stone-300'
                              }`}
                              style={{ height: `${Math.max(8, pct)}%` }}
                            />
                          </div>
                          <span
                            className={`mt-1.5 text-xs font-extrabold px-2 py-0.5 rounded ${
                              isRight ? 'bg-emerald-100 text-emerald-900' : 'text-stone-500'
                            }`}
                          >
                            {OPTION_STYLES[idx].letter} {isRight ? '✓' : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200 shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#9A6B1E] mb-2.5">
                      Meilleurs scores actuels
                    </p>
                    {leaderboard.length === 0 ? (
                      <p className="text-xs text-stone-400 py-4">Aucun score enregistré.</p>
                    ) : (
                      <div className="space-y-2">
                        {leaderboard.slice(0, 4).map((p, idx) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between text-sm bg-[#FBF9F5] px-3 py-2 rounded-xl border border-stone-100"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono font-bold text-xs text-stone-500">
                                #{idx + 1}
                              </span>
                              <span>{p.avatar || '💎'}</span>
                              <span className="font-bold text-stone-800 truncate">{p.name}</span>
                            </div>
                            <span className="font-mono font-extrabold text-[#064E3B] shrink-0">
                              {p.score || 0} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4 Choices Grid (A, B, C, D) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQ.options.map((optText, idx) => {
                const style = OPTION_STYLES[idx];
                const isCorrect = idx === currentQ.correctIndex;
                const dimmed = status === 'reveal' && !isCorrect;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 sm:p-6 text-white shadow-lg transition-all flex items-center justify-between gap-4 border-2 ${
                      status === 'reveal'
                        ? isCorrect
                          ? 'bg-emerald-700 border-[#D4AF37] ring-4 ring-[#D4AF37]/40 scale-[1.01]'
                          : 'bg-stone-400/75 border-transparent opacity-55'
                        : `${style.bg} ${style.border}`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-sm ${
                          dimmed ? 'bg-white/40 text-stone-700' : style.badgeBg
                        }`}
                      >
                        {style.letter}
                      </span>
                      <span className="font-semibold text-lg sm:text-xl leading-snug">
                        {optText}
                      </span>
                    </div>

                    {status === 'reveal' && isCorrect && (
                      <CheckCircle2 className="w-8 h-8 text-[#FDE68A] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Teacher Navigation Buttons */}
            <div className="flex items-center justify-end gap-4">
              {status === 'question' ? (
                <button
                  onClick={revealCurrentAnswer}
                  className="px-7 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-5 h-5 text-[#D4AF37]" />
                  <span>Révéler la réponse</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-4 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white font-extrabold text-lg shadow-xl shadow-[#064E3B]/20 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>
                    {qIdx + 1 >= QUIZ_QUESTIONS.length
                      ? 'Voir le Podium Top 3'
                      : 'Question suivante'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </main>
        )}

        {/* --- PHASE C : FINAL TOP 3 PODIUM & FULL RANKING --- */}
        {status === 'finished' && (
          <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center">
            {leaderboard.length > 0 && <ConfettiCelebration />}

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#9A6B1E] text-xs font-extrabold uppercase tracking-widest mb-2">
                <Trophy className="w-4 h-4" />
                <span>Podium Top 3</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#064E3B]">
                Résultats Finaux de la Classe
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Classement selon le score total (500 pts + bonus rapidité jusqu'à 500 pts par bonne réponse)
              </p>
            </div>

            {leaderboard.length > 0 ? (
              <div className="w-full max-w-3xl grid grid-cols-3 gap-3 sm:gap-6 items-end mb-10 pt-6">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  {leaderboard[1] ? (
                    <>
                      <div className="text-4xl mb-2">{leaderboard[1].avatar || '🌿'}</div>
                      <p className="font-bold text-stone-800 text-sm sm:text-lg text-center truncate w-full px-1">
                        {leaderboard[1].name}
                      </p>
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-stone-700">
                        {leaderboard[1].score || 0} pts
                      </span>
                      <span className="text-[11px] text-stone-500 mb-2">
                        {leaderboard[1].correctCount || 0}/{QUIZ_QUESTIONS.length} bonnes rép.
                      </span>
                      <div className="w-full h-32 sm:h-40 rounded-t-3xl bg-gradient-to-b from-slate-200 to-slate-300 border-t-4 border-slate-400 shadow-lg flex flex-col items-center justify-center">
                        <Medal className="w-8 h-8 text-slate-600 mb-1" />
                        <span className="font-serif text-3xl font-black text-slate-700">2</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-24 rounded-t-3xl bg-stone-100" />
                  )}
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                  {leaderboard[0] && (
                    <>
                      <Crown className="w-9 h-9 text-[#D4AF37] mb-1 animate-bounce" />
                      <div className="text-5xl mb-2">{leaderboard[0].avatar || '💎'}</div>
                      <p className="font-extrabold text-[#064E3B] text-base sm:text-xl text-center truncate w-full px-1">
                        {leaderboard[0].name}
                      </p>
                      <span className="font-mono text-xs sm:text-base font-black text-[#9A6B1E]">
                        {leaderboard[0].score || 0} pts
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-stone-600 mb-2">
                        {leaderboard[0].correctCount || 0}/{QUIZ_QUESTIONS.length} bonnes rép.
                      </span>
                      <div className="w-full h-44 sm:h-52 rounded-t-3xl bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#B47E24] border-t-4 border-[#FFFBEB] shadow-2xl flex flex-col items-center justify-center text-[#042F2E]">
                        <Trophy className="w-10 h-10 mb-1" />
                        <span className="font-serif text-4xl font-black">1</span>
                      </div>
                    </>
                  )}
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                  {leaderboard[2] ? (
                    <>
                      <div className="text-4xl mb-2">{leaderboard[2].avatar || '✨'}</div>
                      <p className="font-bold text-stone-800 text-sm sm:text-lg text-center truncate w-full px-1">
                        {leaderboard[2].name}
                      </p>
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-stone-700">
                        {leaderboard[2].score || 0} pts
                      </span>
                      <span className="text-[11px] text-stone-500 mb-2">
                        {leaderboard[2].correctCount || 0}/{QUIZ_QUESTIONS.length} bonnes rép.
                      </span>
                      <div className="w-full h-24 sm:h-32 rounded-t-3xl bg-gradient-to-b from-amber-200 to-amber-400/80 border-t-4 border-amber-600 shadow-lg flex flex-col items-center justify-center text-amber-950">
                        <Award className="w-7 h-7 mb-1" />
                        <span className="font-serif text-2xl font-black">3</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-20 rounded-t-3xl bg-stone-100" />
                  )}
                </div>
              </div>
            ) : (
              <p className="text-stone-500 mb-8">Aucun étudiant n'a participé à cette session.</p>
            )}

            {/* Full Class Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden mb-8">
                <div className="px-6 py-4 bg-[#064E3B] text-white font-serif font-bold text-lg flex justify-between">
                  <span>Classement complet</span>
                  <span>Score & Précision</span>
                </div>
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                  {leaderboard.map((p, idx) => (
                    <div
                      key={p.id}
                      className="px-6 py-3.5 flex items-center justify-between hover:bg-[#FBF9F5]"
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0
                              ? 'bg-[#D4AF37] text-[#042F2E]'
                              : idx === 1
                              ? 'bg-slate-200 text-slate-800'
                              : idx === 2
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xl">{p.avatar || '💎'}</span>
                        <span className="font-semibold text-stone-800">{p.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-extrabold text-[#064E3B]">
                          {p.score || 0} pts
                        </span>
                        <span className="block text-[11px] text-stone-500">
                          {p.correctCount || 0}/{QUIZ_QUESTIONS.length} bonnes rép.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReplaySameClass}
                className="px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#042F2E] font-extrabold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Rejouer avec cette classe</span>
              </button>
              <button
                onClick={handleResetToLanding}
                className="px-6 py-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nouvelle session</span>
              </button>
            </div>
          </main>
        )}
      </div>
    );
  }

  // ==========================================================================
  // VIEW 3 : STUDENT SMARTPHONE VIEW (MODE ÉTUDIANT)
  // ==========================================================================
  const status = roomState?.status || 'lobby';
  const qIdx = roomState?.currentQuestionIndex || 0;
  const currentQ = QUIZ_QUESTIONS[qIdx];
  const me = players.find((p) => p.id === clientId);
  const myAnswer = me?.answers ? me.answers[qIdx] : undefined;
  const myScore = me?.score || 0;
  const myCorrectCount = me?.correctCount || 0;
  const myRank = leaderboard.findIndex((p) => p.id === clientId) + 1;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col justify-between select-none">
      {/* Top Student Bar */}
      <header className="bg-[#064E3B] text-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{me?.avatar || '💎'}</span>
          <span className="font-bold text-sm truncate">
            {me?.name || studentName || 'Étudiant'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setRole('host')}
            className="text-[11px] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer"
          >
            Mode Prof
          </button>
          <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full font-mono">
            PIN {pin}
          </span>
          <span className="text-xs bg-[#D4AF37] text-[#042F2E] font-mono font-extrabold px-2.5 py-1 rounded-full">
            {myScore} pts
          </span>
        </div>
      </header>

      {/* --- STUDENT PHASE A : WAITING IN LOBBY --- */}
      {status === 'lobby' && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-white shadow-xl border-2 border-[#D4AF37] flex items-center justify-center text-5xl mb-6 animate-bounce">
            {me?.avatar || '💎'}
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            Connecté · Salle {roomCode}
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#064E3B] mb-2">
            Bonjour, {me?.name || studentName} !
          </h1>
          <p className="text-stone-600 text-sm max-w-xs leading-relaxed mb-8">
            Vous êtes dans la salle. Le quiz commence dès que le professeur lance la 1re question.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#9A6B1E] font-semibold bg-white px-4 py-2.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>En attente du professeur...</span>
          </div>
        </main>
      )}

      {/* --- STUDENT PHASE B : ACTIVE QUESTION (4 LARGE TAP BUTTONS) --- */}
      {status === 'question' && currentQ && (
        <main className="flex-1 flex flex-col p-4 max-w-lg w-full mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#064E3B]/10 px-3 py-1 rounded-full">
              Question {qIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-sm ${
                timeLeft <= 5
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-[#D4AF37] text-[#042F2E]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-[#D4AF37]/30 mb-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#064E3B] leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {myAnswer !== undefined ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow-lg border border-emerald-200 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#064E3B] mb-1">
                Réponse enregistrée !
              </h3>
              <p className="text-sm text-stone-500 mb-4">
                Choix :{' '}
                <strong className="text-stone-800">
                  {OPTION_STYLES[myAnswer.choice]?.letter} ({myAnswer.choiceNumber})
                </strong>{' '}
                · {(myAnswer.timeMs / 1000).toFixed(1)}s
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                <span>En attente de la révélation...</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 gap-3">
              {currentQ.options.map((optText, idx) => {
                const style = OPTION_STYLES[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleStudentAnswer(idx)}
                    disabled={isSubmittingAnswer || timeLeft <= 0}
                    className={`w-full p-4 rounded-2xl text-white font-semibold text-left shadow-md active:scale-[0.98] transition-transform flex items-center gap-3.5 cursor-pointer disabled:opacity-50 ${style.bg}`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${style.badgeBg}`}
                    >
                      {style.letter}
                    </span>
                    <span className="text-base leading-snug">{optText}</span>
                  </button>
                );
              })}
            </div>
          )}
        </main>
      )}

      {/* --- STUDENT PHASE C : ANSWER FEEDBACK --- */}
      {status === 'reveal' && currentQ && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md w-full mx-auto">
          {myAnswer?.isCorrect ? (
            <div className="w-full bg-emerald-800 text-white rounded-3xl p-8 shadow-xl border-2 border-[#D4AF37]">
              <CheckCircle2 className="w-16 h-16 text-[#FDE68A] mx-auto mb-3" />
              <h2 className="font-serif text-3xl font-bold mb-1">Bonne réponse !</h2>
              <p className="font-mono text-2xl font-black text-[#FDE68A] mb-2">
                +{myAnswer.points || 0} pts
              </p>
              <p className="text-emerald-100 text-xs mb-4">
                Répondu en {(myAnswer.timeMs / 1000).toFixed(1)}s · Total : {myScore} pts
              </p>
            </div>
          ) : (
            <div className="w-full bg-white text-stone-800 rounded-3xl p-8 shadow-xl border border-red-200">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                {myAnswer === undefined ? 'Temps écoulé !' : 'Mauvaise réponse'}
              </h2>
              <p className="font-mono text-sm font-bold text-stone-500 mb-3">+0 pt</p>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold mt-3 mb-1">
                Bonne réponse :
              </p>
              <p className="font-bold text-[#064E3B] text-base bg-[#FBF9F5] p-3 rounded-xl border border-[#064E3B]/20">
                {OPTION_STYLES[currentQ.correctIndex].letter}. {currentQ.options[currentQ.correctIndex]}
              </p>
            </div>
          )}

          <p className="text-xs text-stone-400 mt-6 flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            <span>En attente de la question suivante...</span>
          </p>
        </main>
      )}

      {/* --- STUDENT PHASE D : FINAL SUMMARY --- */}
      {status === 'finished' && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md w-full mx-auto">
          {myRank > 0 && myRank <= 3 && <ConfettiCelebration />}

          <div className="w-full bg-white rounded-3xl p-8 shadow-xl border-2 border-[#D4AF37]/50">
            <div className="text-5xl mb-3">{me?.avatar || '💎'}</div>
            <h2 className="font-serif text-2xl font-bold text-[#064E3B] mb-1">
              Quiz terminé !
            </h2>
            <p className="text-sm text-stone-500 mb-6">
              Bravo {me?.name || studentName}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#D4AF37]/30">
                <span className="block text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">
                  Classement
                </span>
                <span className="font-serif text-3xl font-black text-[#9A6B1E]">
                  {myRank > 0 ? `${myRank}${myRank === 1 ? 'er' : 'e'}` : '-'}
                </span>
                <span className="block text-[11px] text-stone-400">
                  sur {players.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#064E3B] text-white">
                <span className="block text-xs uppercase tracking-wider text-emerald-200 font-bold mb-1">
                  Score Total
                </span>
                <span className="font-mono text-2xl font-black text-[#FDE68A]">
                  {myScore} pts
                </span>
                <span className="block text-[11px] text-emerald-200">
                  {myCorrectCount}/{QUIZ_QUESTIONS.length} bonnes rép.
                </span>
              </div>
            </div>

            {myRank > 0 && myRank <= 3 && (
              <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#9A6B1E] font-bold text-sm flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-5 h-5" />
                <span>Vous êtes sur le podium Top 3 !</span>
              </div>
            )}

            <button
              onClick={handleResetToLanding}
              className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              Retour à l'accueil
            </button>
          </div>
        </main>
      )}

      <footer className="py-2.5 text-center text-[11px] text-stone-400">
        Héloïse & Abélard · Quiz Classe en Direct
      </footer>
    </div>
  );
}