const BASE_UNITS = 24;
const OZOBOT_SCREEN_BLUE = "#0000FF";
const OZOBOT_SCREEN_RED = "#FF0000";
const OZOBOT_EVO_RED = OZOBOT_SCREEN_RED;
const STORAGE_KEY = "ozobot-fractions-progress";

const FRACTIONS = [
  { label: "1/2", numerator: 1, denominator: 2, units: 12, color: "#ef4444", textColor: "#b91c1c", name: "Half" },
  { label: "1/3", numerator: 1, denominator: 3, units: 8, color: "#f59e0b", textColor: "#b45309", name: "Third" },
  { label: "1/4", numerator: 1, denominator: 4, units: 6, color: "#10b981", textColor: "#047857", name: "Fourth" },
  { label: "1/6", numerator: 1, denominator: 6, units: 4, color: "#3b82f6", textColor: "#1d4ed8", name: "Sixth" },
  { label: "1/8", numerator: 1, denominator: 8, units: 3, color: "#8b5cf6", textColor: "#6d28d9", name: "Eighth" }
];

const ROBOT_PROFILES = {
  bit: {
    label: "Ozobot Bit",
    shortLabel: "Bit",
    codes: [
      { id: "spin", name: "Spin", colors: ["#00FF00", OZOBOT_SCREEN_RED, "#00FF00", OZOBOT_SCREEN_RED] },
      { id: "short_super_slow", name: "Super Slow", colors: [OZOBOT_SCREEN_RED, "#00FF00", OZOBOT_SCREEN_BLUE] },
      { id: "fast", name: "Fast", colors: [OZOBOT_SCREEN_BLUE, "#000000", OZOBOT_SCREEN_BLUE] },
      { id: "zigzag", name: "Zigzag", colors: [OZOBOT_SCREEN_BLUE, "#000000", "#00FF00", OZOBOT_EVO_RED] },
      { id: "tornado", name: "Tornado", colors: [OZOBOT_SCREEN_RED, "#00FF00", OZOBOT_SCREEN_RED, "#00FF00"] },
      { id: "nitro_boost", name: "Nitro Boost", colors: [OZOBOT_SCREEN_BLUE, "#00FF00", OZOBOT_SCREEN_RED] },
      { id: "play_again", name: "Play Again", colors: ["#00FF00", OZOBOT_SCREEN_BLUE] }
    ]
  },
  evo: {
    label: "Ozobot Evo",
    shortLabel: "Evo",
    codes: [
      { id: "spin", name: "Spin", colors: ["#00FF00", OZOBOT_EVO_RED, "#00FF00", OZOBOT_EVO_RED] },
      { id: "short_super_slow", name: "Super Slow", colors: [OZOBOT_EVO_RED, "#00FF00", OZOBOT_SCREEN_BLUE] },
      { id: "fast", name: "Fast", colors: [OZOBOT_SCREEN_BLUE, "#000000", OZOBOT_SCREEN_BLUE] },
      { id: "zigzag", name: "Zigzag", colors: [OZOBOT_SCREEN_BLUE, "#000000", "#00FF00", OZOBOT_SCREEN_RED] },
      { id: "tornado", name: "Tornado", colors: [OZOBOT_EVO_RED, "#00FF00", OZOBOT_EVO_RED, "#00FF00"] },
      { id: "backwalk", name: "Backwalk", colors: [OZOBOT_EVO_RED, "#00FF00", "#000000", OZOBOT_SCREEN_BLUE] },
      { id: "play_again", name: "Play Again", colors: ["#00FF00", OZOBOT_SCREEN_BLUE] }
    ]
  }
};
const MODAL_END_CODE = { id: "game_over", name: "Game Over", colors: ["#00FF00", OZOBOT_SCREEN_RED] };

const CODE_UNLOCK_COUNTS = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7];

const CHALLENGES = [
  {
    title: "Make 1 whole using halves. Put an action code block at 1/2.",
    requirements: { segments: { "1/2": 2 }, codes: [{ numerator: 1, denominator: 2 }] }
  },
  {
    title: "Make 1 whole using sixths. Put an action code block at 3/6.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [{ numerator: 3, denominator: 6 }]
    }
  },
  {
    title: "Make 1 whole using eighths. Put an action code block at 2/8 and another at 5/8.",
    requirements: {
      segments: { "1/8": 8 },
      codes: [
        { numerator: 2, denominator: 8 },
        { numerator: 5, denominator: 8 }
      ]
    }
  },
  {
    title: "Make 1 whole using thirds. Put an action code block at 1/3.",
    requirements: {
      segments: { "1/3": 3 },
      codes: [{ numerator: 1, denominator: 3 }]
    }
  },
  {
    title: "Make 1 whole using fourths. Put an action code block at 2/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [{ numerator: 2, denominator: 4 }]
    }
  },
  {
    title: "Make 1 whole using fourths. Put action code blocks at 1/4 and 2/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { numerator: 1, denominator: 4 },
        { numerator: 2, denominator: 4 }
      ]
    }
  },
  {
    title: "Make 1 whole using sixths. Put action code blocks at 1/6 and 4/6.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [
        { numerator: 1, denominator: 6 },
        { numerator: 4, denominator: 6 }
      ]
    }
  },
  {
    title: "Make 1 whole using eighths. Put action code blocks at 2/8 and 6/8.",
    requirements: {
      segments: { "1/8": 8 },
      codes: [
        { numerator: 2, denominator: 8 },
        { numerator: 6, denominator: 8 }
      ]
    }
  },
  {
    title: "Make 1 whole using thirds. Put action code blocks at 1/3 and 2/3.",
    requirements: {
      segments: { "1/3": 3 },
      codes: [
        { numerator: 1, denominator: 3 },
        { numerator: 2, denominator: 3 },
      ]
    }
  },
  {
    title: "Make 1 whole using fourths. Put action code blocks at 1/4, 2/4, and 3/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { numerator: 1, denominator: 4 },
        { numerator: 2, denominator: 4 },
        { numerator: 3, denominator: 4 },
      ]
    }
  }
];

const state = {
  currentProblemIdx: 0,
  mode: "mission",
  robotType: "bit",
  hasCompletedAllMissions: false,
  placedSegments: [],
  placedCodes: [],
  history: [],
  isCheckedCorrect: false,
  isMorphingTrack: false,
  celebrationTimer: null,
  cueTimer: null,
  showLineHints: false,
  hintStep: 0
};

const dragState = {
  code: null,
  moved: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  sourceCodeId: null,
  ghostEl: null,
  targetUnits: null
};
let suppressCodeClickId = null;

const el = {
  problemCounter: document.getElementById("problemCounter"),
  missionText: document.getElementById("missionText"),
  feedback: document.getElementById("feedback"),
  checkDetails: document.getElementById("checkDetails"),
  pieSlices: document.getElementById("pieSlices"),
  pieLabel: document.getElementById("pieLabel"),
  segmentOverlay: document.getElementById("segmentOverlay"),
  codesLayer: document.getElementById("codesLayer"),
  dragDropMarker: document.getElementById("dragDropMarker"),
  axis: document.getElementById("axis"),
  progressLabel: document.getElementById("progressLabel"),
  progressValue: document.getElementById("progressValue"),
  missionConfetti: document.getElementById("missionConfetti"),
  playgroundRunHint: document.getElementById("playgroundRunHint"),
  fractionButtons: document.getElementById("fractionButtons"),
  codeButtons: document.getElementById("codeButtons"),
  codePanelHeader: document.getElementById("codePanelHeader"),
  codePanelTitle: document.getElementById("codePanelTitle"),
  codeUnlockText: document.getElementById("codeUnlockText"),
  liveMarkers: document.getElementById("liveMarkers"),
  lineHintBanner: document.getElementById("lineHintBanner"),
  trackWrap: document.getElementById("trackWrap"),
  quickCue: document.getElementById("quickCue"),
  hintBtn: document.getElementById("hintBtn"),
  undoBtn: document.getElementById("undoBtn"),
  resetBtn: document.getElementById("resetBtn"),
  bitRobotBtn: document.getElementById("bitRobotBtn"),
  evoRobotBtn: document.getElementById("evoRobotBtn"),
  playgroundBtn: document.getElementById("playgroundBtn"),
  restartMissionsBtn: document.getElementById("restartMissionsBtn"),
  checkBtn: document.getElementById("checkBtn"),
  successModal: document.getElementById("successModal"),
  successModalText: document.getElementById("successModalText"),
  successModalSteps: document.getElementById("successModalSteps"),
  modalConfetti: document.getElementById("modalConfetti"),
  modalCelebrateText: document.getElementById("modalCelebrateText"),
  modalRunCodes: document.getElementById("modalRunCodes"),
  nextFromModalBtn: document.getElementById("nextFromModalBtn"),
  nextMissionBtn: document.getElementById("nextMissionBtn"),
  playgroundIntroModal: document.getElementById("playgroundIntroModal"),
  playgroundIntroConfetti: document.getElementById("playgroundIntroConfetti"),
  unlockModal: document.getElementById("unlockModal"),
  unlockConfetti: document.getElementById("unlockConfetti"),
  unlockMessage: document.getElementById("unlockMessage"),
  unlockCodePreview: document.getElementById("unlockCodePreview"),
  unlockCodeName: document.getElementById("unlockCodeName"),
  dismissUnlockBtn: document.getElementById("dismissUnlockBtn"),
  enterPlaygroundBtn: document.getElementById("enterPlaygroundBtn"),
  restartConfirmModal: document.getElementById("restartConfirmModal"),
  cancelRestartBtn: document.getElementById("cancelRestartBtn"),
  confirmRestartBtn: document.getElementById("confirmRestartBtn")
};

function isPlaygroundMode() {
  return state.mode === "playground";
}

function currentRobotProfile() {
  return ROBOT_PROFILES[state.robotType] || ROBOT_PROFILES.bit;
}

function currentRobotCodes() {
  return currentRobotProfile().codes;
}

function isEvoMode() {
  return state.robotType === "evo";
}

function saveProgress() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentProblemIdx: state.currentProblemIdx,
        mode: state.mode,
        robotType: state.robotType,
        hasCompletedAllMissions: state.hasCompletedAllMissions
      })
    );
  } catch {
    // Ignore localStorage failures and continue with in-memory progress.
  }
}

function clearSavedProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore localStorage failures and continue with in-memory progress.
  }
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.mode === "playground" || saved.mode === "mission") {
      state.mode = saved.mode;
    }
    if (saved.robotType === "bit" || saved.robotType === "evo") {
      state.robotType = saved.robotType;
    }
    if (Number.isInteger(saved.currentProblemIdx)) {
      state.currentProblemIdx = Math.max(0, Math.min(CHALLENGES.length - 1, saved.currentProblemIdx));
    }
    state.hasCompletedAllMissions = Boolean(saved.hasCompletedAllMissions);
  } catch {
    // Ignore corrupt storage and use default progress.
  }
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function currentProblem() {
  return CHALLENGES[state.currentProblemIdx];
}

function findCodeById(codeId) {
  return currentRobotCodes().find((code) => code.id === codeId);
}

function totalUnits() {
  return state.placedSegments.reduce((sum, s) => sum + s.units, 0);
}

function simplifyFraction(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function formatUnitsAsFraction(units) {
  if (units === BASE_UNITS) return "1 whole";
  const simplified = simplifyFraction(units, BASE_UNITS);
  return `${simplified.numerator}/${simplified.denominator}`;
}

function getPrimarySegmentDenominator() {
  if (state.placedSegments.length > 0) {
    const firstDenominator = state.placedSegments[0].denominator;
    const sameDenominator = state.placedSegments.every((s) => s.denominator === firstDenominator);
    if (sameDenominator) return firstDenominator;
  }

  if (isPlaygroundMode()) return null;

  const requiredSegments = Object.keys(currentProblem().requirements.segments);
  if (requiredSegments.length === 1) {
    const parts = requiredSegments[0].split("/");
    return Number(parts[1]);
  }

  return null;
}

function formatAxisLabel(units, denominatorHint) {
  if (units === 0) return "0";
  if (denominatorHint && BASE_UNITS % denominatorHint === 0) {
    const unitsPerPart = BASE_UNITS / denominatorHint;
    if (units % unitsPerPart === 0) {
      const numerator = units / unitsPerPart;
      return `${numerator}/${denominatorHint}`;
    }
  }
  return formatUnitsAsFraction(units);
}

function reqToUnits(req) {
  return (req.numerator * BASE_UNITS) / req.denominator;
}

function codeStripesHTML(colors, stripeHeight = 18, stripeWidth = 10) {
  return colors
    .map(
      (color) =>
        `<span class="code-stripe" style="display:inline-block;background:${color};height:${stripeHeight}px;width:${stripeWidth}px;border-radius:0"></span>`
    )
    .join("");
}

function endCodeColors() {
  return MODAL_END_CODE.colors;
}

function modalCodeStripesHTML(colors) {
  const stripeSize = isEvoMode() ? 34 : 28;
  const leadInWidth = isEvoMode() ? 22 : 0;
  const leadIn = leadInWidth > 0
    ? `<span class="modal-run-stripe modal-run-lead" style="background:#000000;width:${leadInWidth}px;height:${stripeSize}px"></span>`
    : "";
  const stripes = colors
    .map((color) => `<span class="modal-run-stripe" style="background:${color};width:${stripeSize}px;height:${stripeSize}px"></span>`)
    .join("");
  return `${leadIn}${stripes}`;
}

function modalEndCodeColors() {
  return endCodeColors();
}

function setButtonLabel(button, icon, label) {
  button.innerHTML = `<span class="btn-icon" aria-hidden="true">${icon}</span><span class="btn-label">${label}</span>`;
}

function emphasizeFractions(text) {
  return text
    .replace(/(1 whole)/gi, '<span class="mission-whole">$1</span>')
    .replace(
      /(\d+\/\d+)/gi,
      '<span class="mission-number-fraction">$1</span>'
    )
    .replace(
      /(halves|thirds|fourths|sixths|eighths)/gi,
      '<span class="mission-fraction">$1</span>'
    );
}

function formatMissionText(text) {
  const lines = text
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));

  return lines
    .map((line, index) => {
      const className = index === 0 ? "mission-line mission-line-primary" : "mission-line mission-line-secondary";
      return `<span class="${className}">${emphasizeFractions(line)}</span>`;
    })
    .join("");
}

function setFeedback(type, message) {
  if (!message) {
    if (el.feedback) {
      el.feedback.className = "feedback hidden";
      el.feedback.textContent = "";
    }
    return;
  }

  if (type === "success") {
    showQuickCue("success", message);
    if (el.feedback) {
      el.feedback.className = "feedback hidden";
      el.feedback.textContent = "";
    }
    return;
  }
  showQuickCue("error", message);

  if (el.feedback) {
    el.feedback.className = `feedback ${type}`;
    el.feedback.textContent = message;
  }
}

function quickCueText(type, message) {
  if (type === "success") {
    if (!message) return "Done.";
    if (message.startsWith("No more segment hints")) return "No more hints. Try Check Answer.";
    if (message.includes("unlocked")) return "New action code unlocked!";
    if (message.includes("finished all 10")) return "You finished all missions!";
    return message;
  }
  if (!message) return "Try again.";
  if (isPlaygroundMode()) {
    if (message.includes("Build a line first")) return "Build a line first.";
    return message;
  }
  if (message.startsWith("Hint")) return message;
  const codeTargets = currentProblem().requirements.codes
    .map((req) => `${req.numerator}/${req.denominator}`);
  const codeTargetCue =
    codeTargets.length === 1
      ? `Put the action code at ${codeTargets[0]}.`
      : `Put action codes at ${codeTargets.join(" and ")}.`;
  if (message.includes("not on a target location")) return codeTargetCue;
  if (message.includes("mission uses")) return codeTargetCue;
  if (message.includes("Check the answer first")) return "Tap Check Answer first.";
  if (message.includes("Need")) return "Add more fraction pieces.";
  if (message.includes("Too many")) return "Remove one piece.";
  if (message.includes("longer than 1 whole")) return "Stop at 1 whole.";
  return "Try one small fix.";
}

function showQuickCue(type, message) {
  if (state.cueTimer) {
    window.clearTimeout(state.cueTimer);
  }
  el.quickCue.classList.remove("error", "success", "show");
  el.quickCue.textContent = quickCueText(type, message);
  el.quickCue.classList.add(type === "success" ? "success" : "error");
  void el.quickCue.offsetWidth;
  el.quickCue.classList.add("show");
  state.cueTimer = window.setTimeout(() => {
    el.quickCue.classList.remove("show");
  }, 1350);
}

function setCheckDetails(lines, pass) {
  if (!lines.length) {
    el.checkDetails.className = "check-details hidden";
    el.checkDetails.textContent = "";
    return;
  }

  el.checkDetails.className = `check-details ${pass ? "pass" : "fail"}`;
  el.checkDetails.innerHTML = lines.map((line) => `<div>${line}</div>`).join("");
}

function unlockedCodeCount() {
  const codes = currentRobotCodes();
  if (isPlaygroundMode()) return codes.length;
  const scheduledCount = CODE_UNLOCK_COUNTS[state.currentProblemIdx] ?? codes.length;
  return Math.min(codes.length, scheduledCount);
}

function triggerUnlockCelebration(newlyUnlockedIndex) {
  el.codePanelHeader.classList.remove("unlock-pop");
  void el.codePanelHeader.offsetWidth;
  el.codePanelHeader.classList.add("unlock-pop");

  el.codeButtons.classList.remove("unlock-burst");
  void el.codeButtons.offsetWidth;
  el.codeButtons.classList.add("unlock-burst");

  const unlockedTile = el.codeButtons.querySelector(`.tile[data-code-idx="${newlyUnlockedIndex}"]`);
  if (unlockedTile) {
    unlockedTile.classList.remove("unlock-target");
    void unlockedTile.offsetWidth;
    unlockedTile.classList.add("unlock-target");
  }

  const burstColors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];
  const sparkCount = 16;
  const gridRect = el.codeButtons.getBoundingClientRect();
  const tileRect = unlockedTile ? unlockedTile.getBoundingClientRect() : null;
  const centerX = tileRect ? tileRect.left - gridRect.left + tileRect.width / 2 : gridRect.width / 2;
  const centerY = tileRect ? tileRect.top - gridRect.top + tileRect.height / 2 : gridRect.height / 2;
  for (let i = 0; i < sparkCount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "unlock-spark";
    spark.style.background = burstColors[i % burstColors.length];
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty("--dx", `${Math.random() * 170 - 85}px`);
    spark.style.setProperty("--dy", `${Math.random() * 110 - 55}px`);
    el.codeButtons.appendChild(spark);
    window.setTimeout(() => spark.remove(), 760);
  }
}

function clearCheckProgress() {
  state.isCheckedCorrect = false;
  state.isMorphingTrack = false;
  if (state.celebrationTimer) {
    window.clearTimeout(state.celebrationTimer);
    state.celebrationTimer = null;
  }
}

function triggerTrackMorphAnimation() {
  state.isMorphingTrack = false;
  if (state.celebrationTimer) {
    window.clearTimeout(state.celebrationTimer);
    state.celebrationTimer = null;
  }
  if (el.trackWrap) {
    el.trackWrap.classList.remove("mission-track-morphing");
    void el.trackWrap.offsetWidth;
  }
  state.isMorphingTrack = true;
  render();
  state.celebrationTimer = window.setTimeout(() => {
    state.isMorphingTrack = false;
    state.celebrationTimer = null;
    render();
  }, 1900);
}

function resetDragState() {
  dragState.code = null;
  dragState.moved = false;
  dragState.pointerId = null;
  dragState.startX = 0;
  dragState.startY = 0;
  dragState.sourceCodeId = null;
  dragState.targetUnits = null;
  if (dragState.ghostEl) {
    dragState.ghostEl.remove();
    dragState.ghostEl = null;
  }
  document.body.classList.remove("dragging-code");
  el.dragDropMarker.classList.add("hidden");
  el.dragDropMarker.style.removeProperty("--drop-left");
}

function resetBoard() {
  resetDragState();
  state.placedSegments = [];
  state.placedCodes = [];
  state.history = [];
  state.showLineHints = false;
  state.hintStep = 0;

  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function addSegment(fraction) {
  const currentTotal = totalUnits();
  if (currentTotal + fraction.units > BASE_UNITS) return;

  state.placedSegments.push({ ...fraction, uid: makeId() });
  state.history.push("segment");
  state.showLineHints = false;
  state.hintStep = 0;
  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
  maybeAutoCheckAnswer();
}

function addCode(code) {
  return addCodeAtUnits(code, totalUnits());
}

function addCodeAtUnits(code, positionUnits) {
  if (isPlaygroundMode()) {
    const newCode = {
      ...code,
      positionUnits,
      uid: makeId()
    };
    state.placedCodes.push(newCode);
    state.history.push("code");
    state.showLineHints = false;
    state.hintStep = 0;
    setFeedback(null, "");
    setCheckDetails([], false);
    clearCheckProgress();
    render();
    return true;
  }

  const requiredCodeCount = currentProblem().requirements.codes.length;
  if (state.placedCodes.length >= requiredCodeCount) {
    const plural = requiredCodeCount === 1 ? "" : "s";
    setFeedback("error", `This mission uses ${requiredCodeCount} action code block${plural}.`);
    return false;
  }

  const requiredCounts = new Map();
  currentProblem().requirements.codes.forEach((req) => {
    const units = reqToUnits(req);
    requiredCounts.set(units, (requiredCounts.get(units) || 0) + 1);
  });
  const alreadyPlacedAtPosition = state.placedCodes.filter((c) => c.positionUnits === positionUnits).length;
  const allowedAtPosition = requiredCounts.get(positionUnits) || 0;

  const newCode = {
    ...code,
    positionUnits,
    uid: makeId()
  };
  state.placedCodes.push(newCode);

  state.history.push("code");
  state.showLineHints = false;
  state.hintStep = 0;
  if (allowedAtPosition === 0 || alreadyPlacedAtPosition >= allowedAtPosition) {
    setFeedback("error", "That action code block is not on a target location for this mission.");
    newCode.isWrongPlacement = true;
    const wrongUid = newCode.uid;
    window.setTimeout(() => {
      const idx = state.placedCodes.findIndex((c) => c.uid === wrongUid);
      if (idx === -1) return;
      state.placedCodes.splice(idx, 1);

      for (let i = state.history.length - 1; i >= 0; i -= 1) {
        if (state.history[i] === "code") {
          state.history.splice(i, 1);
          break;
        }
      }
      render();
    }, 620);
  } else {
    setFeedback(null, "");
  }
  setCheckDetails([], false);
  clearCheckProgress();
  render();
  maybeAutoCheckAnswer();
  return true;
}

function getCodePlacementUnits() {
  const units = [];
  const seen = new Set();
  let running = 0;
  state.placedSegments.forEach((segment) => {
    running += segment.units;
    if (running <= 0 || running > BASE_UNITS || seen.has(running)) return;
    seen.add(running);
    units.push(running);
  });
  return units;
}

function getTrackDropTarget(clientX, clientY) {
  const boundaryUnits = getCodePlacementUnits();
  if (!boundaryUnits.length) return null;

  const rect = el.codesLayer.getBoundingClientRect();
  const withinX = clientX >= rect.left - 20 && clientX <= rect.right + 20;
  const withinY = clientY >= rect.top - 48 && clientY <= rect.bottom + 48;
  if (!withinX || !withinY) return null;

  const rawRatio = (clientX - rect.left) / rect.width;
  const clampedRatio = Math.max(0, Math.min(1, rawRatio));
  const rawUnits = clampedRatio * BASE_UNITS;

  let nearestUnits = boundaryUnits[0];
  let nearestDistance = Math.abs(boundaryUnits[0] - rawUnits);
  boundaryUnits.forEach((units) => {
    const distance = Math.abs(units - rawUnits);
    if (distance < nearestDistance) {
      nearestUnits = units;
      nearestDistance = distance;
    }
  });

  return {
    units: nearestUnits,
    leftPercent: (nearestUnits / BASE_UNITS) * 100
  };
}

function createCodeDragGhost(code) {
  const ghost = document.createElement("div");
  ghost.className = "code-drag-ghost";
  ghost.innerHTML = `<div class="code-drag-ghost-stripes">${codeStripesHTML(code.colors, 20, 14)}</div><div class="code-drag-ghost-label">${code.name}</div>`;
  document.body.appendChild(ghost);
  return ghost;
}

function updateCodeDrag(clientX, clientY) {
  if (!dragState.code || !dragState.ghostEl) return;
  dragState.ghostEl.style.left = `${clientX}px`;
  dragState.ghostEl.style.top = `${clientY}px`;

  const target = getTrackDropTarget(clientX, clientY);
  dragState.targetUnits = target ? target.units : null;
  if (target) {
    el.dragDropMarker.classList.remove("hidden");
    el.dragDropMarker.style.setProperty("--drop-left", `${target.leftPercent}%`);
  } else {
    el.dragDropMarker.classList.add("hidden");
    el.dragDropMarker.style.removeProperty("--drop-left");
  }
}

function finishCodeDrag(clientX, clientY) {
  if (!dragState.code) return;
  const code = dragState.code;
  const wasDrag = dragState.moved;
  const sourceCodeId = dragState.sourceCodeId;
  const target = wasDrag ? getTrackDropTarget(clientX, clientY) : null;

  resetDragState();

  if (!wasDrag) return;

  if (!target) {
    if (state.placedSegments.length === 0) {
      setFeedback("error", "Build the fraction line first, then drag an action code to the line.");
    }
    return;
  }

  suppressCodeClickId = sourceCodeId;
  window.setTimeout(() => {
    if (suppressCodeClickId === sourceCodeId) suppressCodeClickId = null;
  }, 0);
  addCodeAtUnits(code, target.units);
}

function undo() {
  if (!state.history.length) return;
  const last = state.history.pop();
  if (last === "segment") state.placedSegments.pop();
  if (last === "code") state.placedCodes.pop();
  state.showLineHints = false;
  state.hintStep = 0;

  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function evaluateStudentWork() {
  const problem = currentProblem();
  const errors = [];
  const passes = [];
  const hints = [];
  const remainingCodeIndexes = new Set(state.placedCodes.map((_, idx) => idx));

  problem.requirements.codes.forEach((req) => {
    const reqUnits = reqToUnits(req);
    let matchedIndex = -1;
    for (const idx of remainingCodeIndexes) {
      const placed = state.placedCodes[idx];
      const positionMatches = placed.positionUnits === reqUnits;
      const typeMatches = !req.codeId || placed.id === req.codeId;
      if (positionMatches && typeMatches) {
        matchedIndex = idx;
        break;
      }
    }

    const label = `${req.numerator}/${req.denominator}`;

    if (matchedIndex === -1) {
      errors.push(`Missing an action code block at ${label}.`);
      hints.push(`Try placing an action code block at ${label}.`);
    } else {
      remainingCodeIndexes.delete(matchedIndex);
      passes.push(`An action code block is at ${label}.`);
    }
  });

  const requiredSegments = problem.requirements.segments;
  Object.entries(requiredSegments).forEach(([segmentLabel, needed]) => {
    const count = state.placedSegments.filter((s) => s.label === segmentLabel).length;
    if (count < needed) {
      errors.push(`Need ${needed} total ${segmentLabel} segments (now ${count}).`);
      hints.push(`Add ${segmentLabel} segments until you have ${needed}.`);
    } else if (count > needed) {
      errors.push(`Too many ${segmentLabel} segments (now ${count}, need ${needed}).`);
      hints.push(`Remove extra ${segmentLabel} segments.`);
    } else {
      passes.push(`Correct number of ${segmentLabel} segments.`);
    }
  });

  if (totalUnits() > BASE_UNITS) {
    errors.push("The line is longer than 1 whole.");
    hints.push("Remove one segment so the line ends at 1 whole.");
  }

  return { passed: errors.length === 0, errors, passes, hints };
}

function getSegmentProgress(problem) {
  const segmentRule = Object.entries(problem.requirements.segments)[0];
  if (!segmentRule) {
    return {
      requiredLabel: "unit",
      needed: 0,
      matchedBoundaryIndexes: new Set(),
      wrongEndpoints: [],
      pendingBoundaries: []
    };
  }

  const requiredLabel = segmentRule[0];
  const needed = segmentRule[1];
  const unitsPerPart = BASE_UNITS / needed;
  const matchedBoundaryIndexes = new Set();
  const wrongEndpoints = [];
  let running = 0;
  let prefixStillValid = true;

  state.placedSegments.forEach((segment, idx) => {
    running += segment.units;
    const boundaryIndex = idx + 1;
    const segmentMatchesRule = segment.label === requiredLabel;
    const boundaryMatchesRule =
      prefixStillValid &&
      segmentMatchesRule &&
      boundaryIndex <= needed &&
      running === boundaryIndex * unitsPerPart;

    if (boundaryMatchesRule) {
      matchedBoundaryIndexes.add(boundaryIndex);
    } else {
      prefixStillValid = false;
    }

    if (!segmentMatchesRule) {
      wrongEndpoints.push({ units: running, label: segment.label, uid: segment.uid });
    }
  });

  const pendingBoundaries = [];
  for (let i = 1; i <= needed; i += 1) {
    if (!matchedBoundaryIndexes.has(i)) {
      pendingBoundaries.push({ index: i, units: i * unitsPerPart, label: `${i}/${needed}` });
    }
  }

  return { requiredLabel, needed, matchedBoundaryIndexes, wrongEndpoints, pendingBoundaries };
}

function getCodeProgress(problem) {
  const availablePlacedCounts = new Map();
  state.placedCodes.forEach((code) => {
    availablePlacedCounts.set(code.positionUnits, (availablePlacedCounts.get(code.positionUnits) || 0) + 1);
  });

  const pendingTargets = [];
  problem.requirements.codes.forEach((req) => {
    const units = reqToUnits(req);
    const available = availablePlacedCounts.get(units) || 0;
    if (available > 0) {
      availablePlacedCounts.set(units, available - 1);
    } else {
      pendingTargets.push({ units, label: `${req.numerator}/${req.denominator}` });
    }
  });

  return { pendingTargets };
}

function showHint() {
  if (isPlaygroundMode()) {
    setFeedback("success", "Playground mode: build any 1 whole line you want, then tap Run Line.");
    setCheckDetails([], false);
    render();
    return;
  }

  state.showLineHints = true;
  state.hintStep += 1;
  const problem = currentProblem();
  const segmentProgress = getSegmentProgress(problem);
  const codeProgress = getCodeProgress(problem);
  const matchingCount = state.placedSegments.filter((s) => s.label === segmentProgress.requiredLabel).length;
  const wrongCount = state.placedSegments.filter((s) => s.label !== segmentProgress.requiredLabel).length;
  const segmentMarkerSteps = segmentProgress.pendingBoundaries.length;
  const codeIntroStep = 2 + segmentMarkerSteps;
  const codeMarkerStartStep = codeIntroStep + 1;

  if (state.hintStep === 1) {
    let hintLine = "";
    if (state.placedSegments.length === 0) {
      hintLine = `Start by adding ${segmentProgress.needed} pieces of ${segmentProgress.requiredLabel}.`;
    } else if (wrongCount > 0) {
      hintLine = `Use only ${segmentProgress.requiredLabel} pieces on this mission.`;
    } else if (matchingCount < segmentProgress.needed) {
      hintLine = `Add ${segmentProgress.requiredLabel} pieces until you have ${segmentProgress.needed} total.`;
    } else if (matchingCount > segmentProgress.needed) {
      hintLine = `Remove extra pieces. You need exactly ${segmentProgress.needed} ${segmentProgress.requiredLabel} pieces.`;
    } else if (totalUnits() > BASE_UNITS) {
      hintLine = "Remove one piece so the line ends at 1 whole.";
    } else {
      if (codeProgress.pendingTargets.length > 0) {
        const nextCodeTarget = codeProgress.pendingTargets[0].label;
        const readyMessage = `Hint 1: Your segments look good. Next, place an action code at ${nextCodeTarget}.`;
        setFeedback("error", readyMessage);
        setCheckDetails([readyMessage], false);
      } else {
        setFeedback("success", "Your fraction segments look good.");
        setCheckDetails(["Hint: Your fraction segments are right. Tap Check Answer."], false);
      }
      render();
      return;
    }

    const hintMessage = `Hint 1: ${hintLine}`;
    setFeedback("error", hintMessage);
    setCheckDetails([hintMessage], false);
    render();
    return;
  }

  if (state.hintStep >= 2 && state.hintStep <= 1 + segmentMarkerSteps) {
    const markerHintIndex = state.hintStep - 2;
    const nextHint = segmentProgress.pendingBoundaries[markerHintIndex];
    const markerMessage = `Hint ${state.hintStep}: Watch the glowing dot at ${nextHint.label}.`;
    setFeedback("error", markerMessage);
    setCheckDetails([markerMessage], false);
    render();
    return;
  }

  if (state.hintStep === codeIntroStep && codeProgress.pendingTargets.length > 0) {
    const introMessage = `Hint ${state.hintStep}: Great segments. Now add action codes at the target fractions.`;
    setFeedback("error", introMessage);
    setCheckDetails([introMessage], false);
    render();
    return;
  }

  const codeMarkerIdx = state.hintStep - codeMarkerStartStep;
  if (codeMarkerIdx >= 0 && codeMarkerIdx < codeProgress.pendingTargets.length) {
    const nextCodeHint = codeProgress.pendingTargets[codeMarkerIdx];
    const codeMarkerMessage = `Hint ${state.hintStep}: Watch the glowing code dot at ${nextCodeHint.label}.`;
    setFeedback("error", codeMarkerMessage);
    setCheckDetails([codeMarkerMessage], false);
    render();
    return;
  }

  const noMoreMessage = "No more hints left. Try Check Answer.";
  setFeedback("success", noMoreMessage);
  setCheckDetails([noMoreMessage], false);
  render();
}

function launchConfettiBurst(container, colors, count = 38) {
  container.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "modal-confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 260}ms`;
    container.appendChild(piece);
  }
}

function celebrateMissionReady() {
  launchConfettiBurst(el.missionConfetti, ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"], 30);
}

function openSuccessModal() {
  renderModalRunTrack();
  launchConfettiBurst(el.modalConfetti, ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"]);
  if (isPlaygroundMode()) {
    el.modalCelebrateText.textContent = "Ozobot Playground";
    document.getElementById("successTitle").textContent = "Run Your Line";
    el.successModalText.textContent = "Run your Ozobot on this line. When you are ready to keep building, choose Back to Playground.";
    el.successModalSteps.innerHTML = "<li>Place Ozobot at the start of your line.</li><li>Watch it read your color codes.</li><li>Choose Back to Playground when you want to edit or build another line.</li>";
    setButtonLabel(el.nextFromModalBtn, "↩", "Back to Playground");
  } else {
    const celebrates = [
      "Perfect build! You nailed it.",
      "Great job! You got it right.",
      "Excellent work! Ready for your Ozobot run."
    ];
    el.modalCelebrateText.textContent = celebrates[Math.floor(Math.random() * celebrates.length)];
    document.getElementById("successTitle").textContent = "Mission Complete";
    el.successModalText.textContent = "Great work. Run your Ozobot on your track now. When you are done, choose Next Problem.";
    el.successModalSteps.innerHTML = "<li>Place Ozobot at the start of your line.</li><li>Watch it read your color codes.</li><li>When finished, move to the next challenge.</li>";
    setButtonLabel(el.nextFromModalBtn, "▶", "Run Complete - Next Problem");
  }
  el.successModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
}

function openUnlockModal(code) {
  launchConfettiBurst(el.unlockConfetti, ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"], 28);
  el.unlockMessage.textContent = `You unlocked ${code.name} for ${currentRobotProfile().shortLabel}. This action code is now ready to use in your next challenge.`;
  el.unlockCodeName.textContent = code.name;
  el.unlockCodePreview.innerHTML = code.colors
    .map((color) => `<span class="unlock-preview-stripe" style="background:${color}"></span>`)
    .join("");
  el.unlockModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
}

function openPlaygroundIntroModal() {
  launchConfettiBurst(el.playgroundIntroConfetti, ["#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#facc15"], 44);
  el.playgroundIntroModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
}

function closeSuccessModalAndAdvance() {
  el.successModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  if (isPlaygroundMode()) return;
  if (state.currentProblemIdx >= CHALLENGES.length - 1) {
    state.hasCompletedAllMissions = true;
    saveProgress();
    openPlaygroundIntroModal();
    return;
  }
  nextProblem(true);
}

function closeUnlockModal() {
  el.unlockModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
}

function goToPlayground() {
  state.mode = "playground";
  saveProgress();
  resetBoard();
  setFeedback("success", "Ozobot Playground is open. Build and run as many lines as you want.");
}

function returnToMissions() {
  state.mode = "mission";
  saveProgress();
  resetBoard();
  setFeedback("success", "Mission mode is open.");
}

function enterPlaygroundMode() {
  el.playgroundIntroModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  goToPlayground();
}

function openRestartConfirmModal() {
  el.restartConfirmModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
}

function closeRestartConfirmModal() {
  el.restartConfirmModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
}

function restartMissions() {
  closeRestartConfirmModal();
  clearSavedProgress();
  state.mode = "mission";
  state.currentProblemIdx = 0;
  state.hasCompletedAllMissions = false;
  saveProgress();
  resetBoard();
  setButtonLabel(el.playgroundBtn, "🎮", "Go to Playground");
  el.playgroundBtn.classList.add("hidden");
  setFeedback("success", "Missions restarted at Problem 1.");
}

function closeAllModals() {
  el.successModal.classList.add("hidden");
  el.unlockModal.classList.add("hidden");
  el.playgroundIntroModal.classList.add("hidden");
  el.restartConfirmModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
}

function setRobotType(robotType) {
  if (!ROBOT_PROFILES[robotType] || robotType === state.robotType) return;
  state.robotType = robotType;
  saveProgress();
  closeAllModals();
  resetBoard();
  setFeedback("success", `${currentRobotProfile().label} mode is on. Action codes were updated for that robot.`);
}

function bindRobotToggle(button, robotType) {
  const activate = (event) => {
    event.preventDefault();
    setRobotType(robotType);
  };

  button.addEventListener("click", activate);
  button.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activate(event);
  });
}

function renderModalRunTrack() {
  el.modalRunCodes.innerHTML = "";
  const modalTrack = document.getElementById("modalRunTrack");
  if (modalTrack) {
    modalTrack.classList.toggle("evo-modal-track", isEvoMode());
    modalTrack.style.setProperty("--modal-run-center", isEvoMode() ? "60%" : "58%");
  }

  state.placedCodes.forEach((placedCode) => {
    const chip = document.createElement("div");
    chip.className = "modal-run-code";
    if (isEvoMode()) chip.classList.add("evo-modal-run-code");

    const ratio = placedCode.positionUnits / BASE_UNITS;
    chip.style.left = `${ratio * 100}%`;
    if (placedCode.positionUnits === 0) {
      chip.style.transform = isEvoMode() ? "translate(0, -50%)" : "translateX(0)";
    } else if (placedCode.positionUnits === BASE_UNITS) {
      chip.style.transform = isEvoMode() ? "translate(-100%, -50%)" : "translateX(-100%)";
    } else if (isEvoMode()) {
      chip.style.transform = "translate(-50%, -50%)";
    }

    chip.innerHTML = modalCodeStripesHTML(placedCode.colors);

    el.modalRunCodes.appendChild(chip);
  });
}

function handlePassedCheck() {
  const successMessages = [
    "Awesome job. Math mission complete.",
    "Great work. Your fraction track is correct.",
    "You got it. Your Ozobot path is ready."
  ];
  const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
  state.isCheckedCorrect = true;
  setFeedback("success", msg);
  if (isPlaygroundMode()) {
    setCheckDetails([], true);
    openSuccessModal();
    return;
  }
  setCheckDetails([], false);
  celebrateMissionReady();
  triggerTrackMorphAnimation();
}

function maybeAutoCheckAnswer() {
  if (isPlaygroundMode()) return;
  if (state.isCheckedCorrect) return;
  if (!el.successModal.classList.contains("hidden")) return;
  if (!el.unlockModal.classList.contains("hidden")) return;

  const result = evaluateStudentWork();
  if (result.passed) {
    handlePassedCheck();
  }
}

function checkAnswer() {
  if (isPlaygroundMode()) {
    if (state.placedSegments.length === 0) {
      setFeedback("error", "Build a line first.");
      return;
    }
    openSuccessModal();
    return;
  }

  if (state.isCheckedCorrect) {
    triggerTrackMorphAnimation();
    setFeedback("success", "Run your Ozobot on the line, then tap Next Mission.");
    return;
  }
  setFeedback("error", "Finish building the correct whole line first.");
}

function nextProblem(fromModal = false) {
  if (isPlaygroundMode()) return;
  if (!fromModal && !state.isCheckedCorrect) {
    setFeedback("error", "Check the answer first.");
    return;
  }

  if (state.currentProblemIdx < CHALLENGES.length - 1) {
    const codes = currentRobotCodes();
    const priorUnlockCount = unlockedCodeCount();
    state.currentProblemIdx += 1;
    saveProgress();
    resetBoard();
    const newUnlockCount = unlockedCodeCount();
    if (newUnlockCount > priorUnlockCount) {
      triggerUnlockCelebration(newUnlockCount - 1);
      setFeedback("success", `You unlocked a new action code block. ${newUnlockCount} of ${codes.length} codes unlocked.`);
      openUnlockModal(codes[newUnlockCount - 1]);
    }
    return;
  }

  state.hasCompletedAllMissions = true;
  saveProgress();
}

function polarPoint(cx, cy, r, degrees) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians)
  };
}

function createSlicePath(cx, cy, r, startDeg, endDeg) {
  const start = polarPoint(cx, cy, r, startDeg);
  const end = polarPoint(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function renderPieChart() {
  el.pieSlices.innerHTML = "";
  let currentAngle = 0;

  state.placedSegments.forEach((segment) => {
    const sliceAngle = (segment.units / BASE_UNITS) * 360;
    if (sliceAngle <= 0) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", createSlicePath(70, 70, 64, currentAngle, currentAngle + sliceAngle));
    path.setAttribute("fill", segment.color);
    path.setAttribute("stroke", "#ffffff");
    path.setAttribute("stroke-width", "1.5");
    el.pieSlices.appendChild(path);

    if (sliceAngle > 20) {
      const mid = currentAngle + sliceAngle / 2;
      const labelPoint = polarPoint(70, 70, 38, mid);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", labelPoint.x);
      text.setAttribute("y", labelPoint.y);
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("font-size", "10");
      text.setAttribute("font-weight", "900");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.textContent = segment.label;
      el.pieSlices.appendChild(text);
    }

    currentAngle += sliceAngle;
  });

  el.pieLabel.textContent = `${formatUnitsAsFraction(totalUnits())} of 1 whole`;
}

function renderFractionButtons() {
  el.fractionButtons.innerHTML = "";
  const currentTotal = totalUnits();

  FRACTIONS.forEach((fraction) => {
    const btn = document.createElement("button");
    btn.className = "tile fraction-tile";
    btn.disabled = currentTotal + fraction.units > BASE_UNITS;
    btn.style.setProperty("--fraction-accent", `${fraction.color}66`);
    btn.style.setProperty("--fraction-fill", `${fraction.color}1a`);
    const labelColor = isPlaygroundMode() ? "#f8fafc" : fraction.textColor;
    const sublabelColor = isPlaygroundMode() ? "#e2e8f0" : "#475569";
    btn.innerHTML = `<div style="font-size:22px;color:${labelColor}">${fraction.label}</div><div class="small" style="color:${sublabelColor}">${fraction.name}</div>`;
    btn.addEventListener("click", () => addSegment(fraction));
    el.fractionButtons.appendChild(btn);
  });
}

function renderCodeButtons() {
  el.codeButtons.innerHTML = "";
  const codes = currentRobotCodes();
  const visibleCodes = codes.slice(0, unlockedCodeCount());
  const lockedCount = codes.length - visibleCodes.length;

  el.codePanelTitle.textContent = `Action Codes for ${currentRobotProfile().shortLabel}`;
  el.codeUnlockText.textContent = isPlaygroundMode()
    ? `All ${codes.length} ${currentRobotProfile().shortLabel} codes ready`
    : `${visibleCodes.length} of ${codes.length} ${currentRobotProfile().shortLabel} codes unlocked`;

  visibleCodes.forEach((code) => {
    const btn = document.createElement("button");
    btn.className = "tile code-draggable";
    btn.dataset.codeIdx = String(codes.findIndex((c) => c.id === code.id));
    btn.dataset.codeId = code.id;
    btn.innerHTML = `<div style="display:flex;gap:0;">${codeStripesHTML(code.colors)}</div><div class="small">${code.name}</div>`;
    btn.addEventListener("click", () => {
      if (suppressCodeClickId === code.id) {
        suppressCodeClickId = null;
        return;
      }
      addCode(code);
    });
    btn.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || btn.disabled) return;
      dragState.code = code;
      dragState.pointerId = event.pointerId;
      dragState.startX = event.clientX;
      dragState.startY = event.clientY;
      dragState.moved = false;
      dragState.sourceCodeId = code.id;
      dragState.targetUnits = null;
      dragState.ghostEl = null;
    });
    el.codeButtons.appendChild(btn);
  });

  for (let i = 0; i < lockedCount; i += 1) {
    const locked = document.createElement("button");
    locked.className = "tile tile-locked";
    locked.disabled = true;
    locked.innerHTML = `<div style="font-size:20px;">?</div><div class="small">???</div>`;
    el.codeButtons.appendChild(locked);
  }
}

function renderLiveMarkers() {
  el.lineHintBanner.innerHTML = "";
  el.liveMarkers.innerHTML = "";
  if (!isPlaygroundMode() && state.isCheckedCorrect) return;
  const removeSegmentByUid = (segmentUid) => {
    const idx = state.placedSegments.findIndex((seg) => seg.uid === segmentUid);
    if (idx === -1) return;
    state.placedSegments.splice(idx, 1);
    state.history = [];
    state.showLineHints = false;
    state.hintStep = 0;
    const undoMessages = [
      "Nice fix! 😊",
      "Great catch! ⭐",
      "Smart undo! 👍",
      "You got this! 🚀"
    ];
    const msg = undoMessages[Math.floor(Math.random() * undoMessages.length)];
    showQuickCue("success", msg);
    setCheckDetails([], false);
    clearCheckProgress();
    render();
  };
  const setMarkerLeft = (marker, units) => {
    marker.style.left = `${(units / BASE_UNITS) * 100}%`;
    if (units === 0) {
      marker.style.transform = "translateX(0)";
    } else if (units === BASE_UNITS) {
      marker.style.transform = "translateX(-100%)";
    }
  };

  if (isPlaygroundMode()) return;

  const problem = currentProblem();
  const progress = getSegmentProgress(problem);
  const codeProgress = getCodeProgress(problem);
  const segmentMarkerSteps = progress.pendingBoundaries.length;
  const codeMarkerStartStep = 3 + segmentMarkerSteps;
  const focusedSegmentHintIdx =
    state.showLineHints && state.hintStep >= 2 && state.hintStep <= 1 + segmentMarkerSteps
      ? state.hintStep - 2
      : -1;
  const focusedCodeHintIdx =
    state.showLineHints && state.hintStep >= codeMarkerStartStep
      ? state.hintStep - codeMarkerStartStep
      : -1;

  if (state.placedSegments.length === 0 && state.showLineHints && state.hintStep === 1) {
    const hintA = document.createElement("div");
    hintA.className = "live-hint";
    hintA.textContent = `Hint 1: Start by adding ${progress.needed} pieces of ${progress.requiredLabel}.`;
    el.liveMarkers.appendChild(hintA);
    return;
  }
  if (state.placedSegments.length === 0 && !state.showLineHints) return;

  if (progress.needed > 0) {
    for (let i = 1; i <= progress.needed; i += 1) {
      const units = (i * BASE_UNITS) / progress.needed;
      const matched = progress.matchedBoundaryIndexes.has(i);
      const marker = document.createElement("div");

      if (matched) {
        marker.className = "live-marker boundary matched";
        marker.textContent = "✓";
      } else if (focusedSegmentHintIdx >= 0) {
        if (
          progress.pendingBoundaries[focusedSegmentHintIdx] &&
          progress.pendingBoundaries[focusedSegmentHintIdx].index === i
        ) {
          marker.className = "live-marker boundary pending hint-focus";
          marker.textContent = "💡";
        } else {
          continue;
        }
      } else {
        continue;
      }

      setMarkerLeft(marker, units);
      marker.title = `${i}/${progress.needed}`;
      el.liveMarkers.appendChild(marker);
    }

    progress.wrongEndpoints.forEach((wrong) => {
      const marker = document.createElement("div");
      marker.className = "live-marker boundary wrong";
      setMarkerLeft(marker, wrong.units);
      marker.textContent = "↺";
      const tooltipText = `${wrong.label} is not needed here. Use ${progress.requiredLabel}.`;
      marker.title = tooltipText;
      marker.dataset.tooltip = tooltipText;
      marker.classList.add("has-tooltip");
      marker.addEventListener("click", () => removeSegmentByUid(wrong.uid));
      el.liveMarkers.appendChild(marker);
    });

    if (progress.wrongEndpoints.length > 0) {
      const warning = document.createElement("div");
      warning.className = "live-hint warning";
      warning.textContent = `Try using only ${progress.requiredLabel} segments for this mission.`;
      el.lineHintBanner.appendChild(warning);
    }
  }

  const requiredCodeCounts = new Map();
  problem.requirements.codes.forEach((req) => {
    const units = reqToUnits(req);
    requiredCodeCounts.set(units, (requiredCodeCounts.get(units) || 0) + 1);
  });

  const availablePlacedCounts = new Map();
  state.placedCodes.forEach((code) => {
    availablePlacedCounts.set(code.positionUnits, (availablePlacedCounts.get(code.positionUnits) || 0) + 1);
  });

  problem.requirements.codes.forEach((req) => {
    const units = reqToUnits(req);
    const available = availablePlacedCounts.get(units) || 0;
    const matched = available > 0;
    if (matched) availablePlacedCounts.set(units, available - 1);
    if (!matched) return;
    const marker = document.createElement("div");
    marker.className = "live-marker code matched";
    setMarkerLeft(marker, units);
    marker.textContent = "✓";
    marker.title = `Action code at ${req.numerator}/${req.denominator}`;
    el.liveMarkers.appendChild(marker);
  });

  if (focusedCodeHintIdx >= 0 && codeProgress.pendingTargets[focusedCodeHintIdx]) {
    const pendingCode = codeProgress.pendingTargets[focusedCodeHintIdx];
    const marker = document.createElement("div");
    marker.className = "live-marker code pending hint-focus";
    setMarkerLeft(marker, pendingCode.units);
    marker.textContent = "💡";
    marker.title = `Action code target at ${pendingCode.label}`;
    el.liveMarkers.appendChild(marker);
  }

  const requiredLeftByPosition = new Map(requiredCodeCounts);
  const wrongCodePlacements = [];
  state.placedCodes.forEach((code) => {
    const neededLeft = requiredLeftByPosition.get(code.positionUnits) || 0;
    if (neededLeft > 0) {
      requiredLeftByPosition.set(code.positionUnits, neededLeft - 1);
    } else {
      wrongCodePlacements.push(code.positionUnits);
    }
  });

  wrongCodePlacements.forEach((units) => {
    const marker = document.createElement("div");
    marker.className = "live-marker code wrong";
    setMarkerLeft(marker, units);
    marker.textContent = "!";
    marker.title = "This action code block is not at a target location.";
    el.liveMarkers.appendChild(marker);
  });

  if (wrongCodePlacements.length > 0) {
    const requiredTargets = problem.requirements.codes
      .map((req) => `${req.numerator}/${req.denominator}`)
      .join(", ");
    const warning = document.createElement("div");
    warning.className = "live-hint warning";
    warning.textContent = `Move action code blocks to: ${requiredTargets}.`;
    el.lineHintBanner.appendChild(warning);
  }
}

function renderAxis() {
  el.axis.innerHTML = "";
  const denominatorHint = getPrimarySegmentDenominator();

  const points = [{ units: 0 }];
  let running = 0;
  state.placedSegments.forEach((segment) => {
    running += segment.units;
    points.push({ units: running });
  });

  if (!points.some((p) => p.units === BASE_UNITS)) {
    points.push({ units: BASE_UNITS });
  }

  const unique = [];
  const seen = new Set();
  points.forEach((point) => {
    if (point.units < 0 || point.units > BASE_UNITS) return;
    if (seen.has(point.units)) return;
    seen.add(point.units);
    unique.push(point);
  });

  unique.forEach((point) => {
    const label = document.createElement("span");
    label.className = "axis-label";
    label.style.left = `${(point.units / BASE_UNITS) * 100}%`;
    label.textContent = formatAxisLabel(point.units, denominatorHint);
    el.axis.appendChild(label);
  });
}

function renderTrack() {
  el.segmentOverlay.innerHTML = "";
  let startUnits = 0;

  state.placedSegments.forEach((segment) => {
    const block = document.createElement("div");
    block.className = "overlay-segment";
    if (isPlaygroundMode()) block.classList.add("playground-segment");
    block.style.left = `${(startUnits / BASE_UNITS) * 100}%`;
    block.style.width = `${(segment.units / BASE_UNITS) * 100}%`;
    block.style.borderColor = `${segment.color}99`;
    block.style.background = isPlaygroundMode() ? `${segment.color}55` : `${segment.color}3d`;
    if (isPlaygroundMode()) {
      block.style.boxShadow = `0 0 14px ${segment.color}66, inset 0 0 18px ${segment.color}55`;
    } else {
      block.style.boxShadow = `inset 0 0 0 1px ${segment.color}55, inset 0 8px 10px rgba(255,255,255,0.22)`;
    }

    const segLabel = document.createElement("span");
    segLabel.className = "overlay-segment-label";
    segLabel.textContent = segment.label;
    block.appendChild(segLabel);

    el.segmentOverlay.appendChild(block);
    startUnits += segment.units;
  });

  el.codesLayer.innerHTML = "";
  state.placedCodes.forEach((placedCode) => {
    const chip = document.createElement("div");
    chip.className = "code-chip";
    if (placedCode.isWrongPlacement) chip.classList.add("code-chip-wrong");
    chip.style.left = `${(placedCode.positionUnits / BASE_UNITS) * 100}%`;
    chip.innerHTML = placedCode.colors
      .map(
        (color) =>
          `<span class="code-stripe" style="background:${color};width:22px;height:22px;border-radius:0"></span>`
      )
      .join("");

    el.codesLayer.appendChild(chip);
  });

  if (!isPlaygroundMode() && state.isCheckedCorrect && state.placedSegments.length > 0) {
    const endChip = document.createElement("div");
    endChip.className = "code-chip code-chip-end";
    endChip.style.left = "100%";
    endChip.innerHTML = endCodeColors()
      .map(
        (color) =>
          `<span class="code-stripe" style="background:${color};width:22px;height:22px;border-radius:0"></span>`
      )
      .join("");
    el.codesLayer.appendChild(endChip);
  }

  renderAxis();
  renderLiveMarkers();
}

function render() {
  const missionRunReady = !isPlaygroundMode() && state.isCheckedCorrect;
  const isLastMission = state.currentProblemIdx >= CHALLENGES.length - 1;
  document.body.classList.toggle("playground-mode", isPlaygroundMode());
  el.bitRobotBtn.classList.toggle("active", state.robotType === "bit");
  el.evoRobotBtn.classList.toggle("active", state.robotType === "evo");
  el.bitRobotBtn.setAttribute("aria-pressed", String(state.robotType === "bit"));
  el.evoRobotBtn.setAttribute("aria-pressed", String(state.robotType === "evo"));
  el.trackWrap.classList.toggle("mission-track-ready", missionRunReady);
  el.trackWrap.classList.toggle("mission-track-morphing", missionRunReady && state.isMorphingTrack);
  if (isPlaygroundMode()) {
    el.problemCounter.textContent = "Ozobot Playground";
    el.missionText.innerHTML = `
      <span class="mission-line mission-line-primary">Build any <span class="mission-whole">1 whole</span> fraction line you want.</span>
      <span class="mission-line mission-line-secondary">Add any action codes you want, then run it as many times as you like.</span>
    `;
    el.progressLabel.textContent = "Line Length";
    el.progressValue.textContent = formatUnitsAsFraction(totalUnits());
    el.hintBtn.disabled = true;
    setButtonLabel(el.checkBtn, "▶", "Run Line");
    el.checkBtn.classList.add("playground-run-btn");
    el.checkBtn.classList.remove("mission-run-btn", "mission-run-btn-ready");
    el.checkBtn.classList.remove("hidden");
    el.nextMissionBtn.classList.add("hidden");
    el.playgroundRunHint.classList.remove("hidden");
    setButtonLabel(el.playgroundBtn, "↩", "Back to Missions");
    el.playgroundBtn.classList.remove("hidden");
  } else {
    const problem = currentProblem();
    el.problemCounter.textContent = `Problem ${state.currentProblemIdx + 1} of ${CHALLENGES.length}`;
    el.missionText.innerHTML = formatMissionText(problem.title);
    el.progressLabel.textContent = "Total Progress";
    el.progressValue.textContent = formatUnitsAsFraction(totalUnits());
    el.hintBtn.disabled = false;
    setButtonLabel(el.checkBtn, "▶", "Run Line");
    el.checkBtn.classList.add("playground-run-btn", "mission-run-btn");
    el.checkBtn.classList.toggle("mission-run-btn-ready", state.isCheckedCorrect);
    el.checkBtn.disabled = true;
    el.checkBtn.classList.add("hidden");
    el.nextMissionBtn.classList.toggle("hidden", !missionRunReady);
    el.playgroundRunHint.classList.add("hidden");
    el.nextMissionBtn.textContent = isLastMission ? "Run Complete - Finish Missions" : "Run Complete - Next Mission";
    setButtonLabel(el.playgroundBtn, "🎮", "Go to Playground");
    if (state.hasCompletedAllMissions) {
      el.playgroundBtn.classList.remove("hidden");
    } else {
      el.playgroundBtn.classList.add("hidden");
    }
  }

  if (isPlaygroundMode()) {
    el.checkBtn.disabled = false;
    el.checkBtn.classList.remove("mission-run-btn", "mission-run-btn-ready");
  }

  renderFractionButtons();
  renderCodeButtons();
  renderTrack();
  renderPieChart();
}

el.hintBtn.addEventListener("click", showHint);
el.undoBtn.addEventListener("click", undo);
el.resetBtn.addEventListener("click", resetBoard);
bindRobotToggle(el.bitRobotBtn, "bit");
bindRobotToggle(el.evoRobotBtn, "evo");
el.playgroundBtn.addEventListener("click", () => {
  if (isPlaygroundMode()) {
    returnToMissions();
    return;
  }
  goToPlayground();
});
el.restartMissionsBtn.addEventListener("click", openRestartConfirmModal);
el.checkBtn.addEventListener("click", checkAnswer);
el.nextFromModalBtn.addEventListener("click", closeSuccessModalAndAdvance);
el.nextMissionBtn.addEventListener("click", () => nextProblem(true));
el.dismissUnlockBtn.addEventListener("click", closeUnlockModal);
el.enterPlaygroundBtn.addEventListener("click", enterPlaygroundMode);
el.cancelRestartBtn.addEventListener("click", closeRestartConfirmModal);
el.confirmRestartBtn.addEventListener("click", restartMissions);
el.unlockModal.addEventListener("click", (event) => {
  if (event.target === el.unlockModal) closeUnlockModal();
});
el.restartConfirmModal.addEventListener("click", (event) => {
  if (event.target === el.restartConfirmModal) closeRestartConfirmModal();
});
document.addEventListener("pointermove", (event) => {
  if (!dragState.code || dragState.pointerId !== event.pointerId) return;
  const movedEnough =
    Math.abs(event.clientX - dragState.startX) > 8 ||
    Math.abs(event.clientY - dragState.startY) > 8;
  if (!dragState.moved && movedEnough) {
    dragState.moved = true;
    dragState.ghostEl = createCodeDragGhost(dragState.code);
    document.body.classList.add("dragging-code");
  }
  if (!dragState.moved) return;
  updateCodeDrag(event.clientX, event.clientY);
});
document.addEventListener("pointerup", (event) => {
  if (!dragState.code || dragState.pointerId !== event.pointerId) return;
  finishCodeDrag(event.clientX, event.clientY);
});
document.addEventListener("pointercancel", () => {
  if (!dragState.code) return;
  resetDragState();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !el.successModal.classList.contains("hidden")) {
    closeSuccessModalAndAdvance();
  }
  if (event.key === "Escape" && !el.unlockModal.classList.contains("hidden")) {
    closeUnlockModal();
  }
  if (event.key === "Escape" && !el.playgroundIntroModal.classList.contains("hidden")) {
    enterPlaygroundMode();
  }
  if (event.key === "Escape" && !el.restartConfirmModal.classList.contains("hidden")) {
    closeRestartConfirmModal();
  }
  if (event.key === "Escape" && dragState.code) {
    resetDragState();
  }
});

loadProgress();
render();
