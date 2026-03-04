const BASE_UNITS = 24;

const FRACTIONS = [
  { label: "1/2", numerator: 1, denominator: 2, units: 12, color: "#ef4444", name: "Half" },
  { label: "1/3", numerator: 1, denominator: 3, units: 8, color: "#f59e0b", name: "Third" },
  { label: "1/4", numerator: 1, denominator: 4, units: 6, color: "#10b981", name: "Fourth" },
  { label: "1/6", numerator: 1, denominator: 6, units: 4, color: "#3b82f6", name: "Sixth" },
  { label: "1/8", numerator: 1, denominator: 8, units: 3, color: "#8b5cf6", name: "Eighth" }
];

const OZOBOT_CODES = [
  { id: "spin", name: "Spin", colors: ["#00FF00", "#FF0000", "#00FF00", "#FF0000"] },
  { id: "slow", name: "Slow", colors: ["#FF0000", "#000000", "#FF0000"] },
  { id: "fast", name: "Fast", colors: ["#0000FF", "#000000", "#0000FF"] },
  { id: "zigzag", name: "Zigzag", colors: ["#0000FF", "#000000", "#00FF00", "#FF0000"] },
  { id: "play_again", name: "Play Again", colors: ["#00FF00", "#0000FF"] }
];

const CHALLENGES = [
  {
    title: "Make 1 whole with fourths. Put an action code block at 2/4.",
    requirements: { segments: { "1/4": 4 }, codes: [{ numerator: 2, denominator: 4 }] }
  },
  {
    title: "Make 1 whole with sixths. Put an action code block at 4/6.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [{ numerator: 4, denominator: 6 }]
    }
  },
  {
    title: "Make 1 whole with eighths. Put an action code block at 1/8 and another at 3/8.",
    requirements: {
      segments: { "1/8": 8 },
      codes: [
        { numerator: 1, denominator: 8 },
        { numerator: 3, denominator: 8 }
      ]
    }
  },
  {
    title: "Make 1 whole with thirds. Put an action code block at 2/3.",
    requirements: {
      segments: { "1/3": 3 },
      codes: [{ numerator: 2, denominator: 3 }]
    }
  },
  {
    title: "Make 1 whole with halves. Put an action code block at 1/2.",
    requirements: {
      segments: { "1/2": 2 },
      codes: [{ numerator: 1, denominator: 2 }]
    }
  },
  {
    title: "Make 1 whole with fourths. Put action code blocks at 1/4 and 3/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { numerator: 1, denominator: 4 },
        { numerator: 3, denominator: 4 }
      ]
    }
  },
  {
    title: "Make 1 whole with sixths. Put action code blocks at 1/6 and 5/6.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [
        { numerator: 1, denominator: 6 },
        { numerator: 5, denominator: 6 }
      ]
    }
  },
  {
    title: "Make 1 whole with eighths. Put action code blocks at 4/8 and 6/8.",
    requirements: {
      segments: { "1/8": 8 },
      codes: [
        { numerator: 4, denominator: 8 },
        { numerator: 6, denominator: 8 }
      ]
    }
  },
  {
    title: "Make 1 whole with thirds. Put action code blocks at 2/3 and 3/3.",
    requirements: {
      segments: { "1/3": 3 },
      codes: [
        { numerator: 2, denominator: 3 },
        { numerator: 3, denominator: 3 }
      ]
    }
  },
  {
    title: "Final mission: make 1 whole with fourths. Put action code blocks at 1/4, 2/4, 3/4, and 4/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { numerator: 1, denominator: 4 },
        { numerator: 2, denominator: 4 },
        { numerator: 3, denominator: 4 },
        { numerator: 4, denominator: 4 }
      ]
    }
  }
];

const state = {
  currentProblemIdx: 0,
  placedSegments: [],
  placedCodes: [],
  history: [],
  isCheckedCorrect: false,
  celebrationTimer: null,
  cueTimer: null,
  showLineHints: false
};

const el = {
  problemCounter: document.getElementById("problemCounter"),
  missionText: document.getElementById("missionText"),
  feedback: document.getElementById("feedback"),
  checkDetails: document.getElementById("checkDetails"),
  pieSlices: document.getElementById("pieSlices"),
  pieLabel: document.getElementById("pieLabel"),
  segmentOverlay: document.getElementById("segmentOverlay"),
  codesLayer: document.getElementById("codesLayer"),
  axis: document.getElementById("axis"),
  progressValue: document.getElementById("progressValue"),
  fractionButtons: document.getElementById("fractionButtons"),
  codeButtons: document.getElementById("codeButtons"),
  codePanelHeader: document.getElementById("codePanelHeader"),
  codeUnlockText: document.getElementById("codeUnlockText"),
  liveMarkers: document.getElementById("liveMarkers"),
  quickCue: document.getElementById("quickCue"),
  successToast: document.getElementById("successToast"),
  hintBtn: document.getElementById("hintBtn"),
  undoBtn: document.getElementById("undoBtn"),
  resetBtn: document.getElementById("resetBtn"),
  checkBtn: document.getElementById("checkBtn"),
  successModal: document.getElementById("successModal"),
  modalConfetti: document.getElementById("modalConfetti"),
  modalCelebrateText: document.getElementById("modalCelebrateText"),
  modalRunCodes: document.getElementById("modalRunCodes"),
  nextFromModalBtn: document.getElementById("nextFromModalBtn")
};

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
  return OZOBOT_CODES.find((code) => code.id === codeId);
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

function codeStripesHTML(colors, stripeHeight = 18, stripeWidth = 8) {
  return colors
    .map(
      (color) =>
        `<span class="code-stripe" style="display:inline-block;background:${color};height:${stripeHeight}px;width:${stripeWidth}px;border-radius:0"></span>`
    )
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
    showSuccessToast(message);
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

function showSuccessToast(message) {
  if (state.celebrationTimer) {
    window.clearTimeout(state.celebrationTimer);
  }
  el.successToast.textContent = message;
  el.successToast.classList.add("show");
  state.celebrationTimer = window.setTimeout(() => {
    el.successToast.classList.remove("show");
  }, 2200);
}

function quickCueText(type, message) {
  if (type === "success") return "Nice work!";
  if (!message) return "Try again.";
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
  return Math.min(OZOBOT_CODES.length, Math.floor(state.currentProblemIdx / 2) + 1);
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
}

function resetBoard() {
  state.placedSegments = [];
  state.placedCodes = [];
  state.history = [];
  state.showLineHints = false;

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
  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function addCode(code) {
  const requiredCodeCount = currentProblem().requirements.codes.length;
  if (state.placedCodes.length >= requiredCodeCount) {
    const plural = requiredCodeCount === 1 ? "" : "s";
    setFeedback("error", `This mission uses ${requiredCodeCount} action code block${plural}.`);
    return;
  }

  const positionUnits = totalUnits();
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
}

function undo() {
  if (!state.history.length) return;
  const last = state.history.pop();
  if (last === "segment") state.placedSegments.pop();
  if (last === "code") state.placedCodes.pop();
  state.showLineHints = false;

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

function showHint() {
  state.showLineHints = true;
  const result = evaluateStudentWork();
  if (result.passed) {
    setFeedback("success", "Everything looks correct. Check your answer.");
    setCheckDetails(["Hint: Your setup looks right. Tap Check Answer."], true);
    return;
  }

  const fallbackHint = "Build exactly one whole, then place each action code at the named fraction.";
  const hintLine = result.hints[0] || fallbackHint;
  setFeedback("error", "Use this hint and try one move.");
  setCheckDetails([`Hint: ${hintLine}`], false);
}

function launchConfettiBurst() {
  const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];
  el.modalConfetti.innerHTML = "";
  for (let i = 0; i < 38; i += 1) {
    const piece = document.createElement("span");
    piece.className = "modal-confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 260}ms`;
    el.modalConfetti.appendChild(piece);
  }
}

function openSuccessModal() {
  renderModalRunTrack();
  launchConfettiBurst();
  const celebrates = [
    "Perfect build! You nailed it.",
    "Great job! You got it right.",
    "Excellent work! Ready for your Ozobot run."
  ];
  el.modalCelebrateText.textContent = celebrates[Math.floor(Math.random() * celebrates.length)];
  el.successModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSuccessModalAndAdvance() {
  el.successModal.classList.add("hidden");
  document.body.style.overflow = "";
  nextProblem(true);
}

function renderModalRunTrack() {
  el.modalRunCodes.innerHTML = "";

  state.placedCodes.forEach((placedCode) => {
    const chip = document.createElement("div");
    chip.className = "modal-run-code";

    const ratio = placedCode.positionUnits / BASE_UNITS;
    chip.style.left = `${ratio * 100}%`;
    if (placedCode.positionUnits === 0) {
      chip.style.transform = "translateX(0)";
    } else if (placedCode.positionUnits === BASE_UNITS) {
      chip.style.transform = "translateX(-100%)";
    }

    chip.innerHTML = placedCode.colors
      .map((color) => `<span class="modal-run-stripe" style="background:${color}"></span>`)
      .join("");

    el.modalRunCodes.appendChild(chip);
  });
}

function checkAnswer() {
  const result = evaluateStudentWork();
  const successMessages = [
    "Awesome job. Math mission complete.",
    "Great work. Your fraction track is correct.",
    "You got it. Your Ozobot path is ready."
  ];
  const tryAgainMessages = [
    "Nice try. You are close.",
    "Keep going. Fix one clue at a time.",
    "Good effort. Tune one part and recheck."
  ];

  if (result.passed) {
    const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
    state.isCheckedCorrect = true;
    setFeedback("success", msg);
    setCheckDetails(["Everything matches the mission.", ...result.passes], true);
    openSuccessModal();
  } else {
    const msg = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
    state.isCheckedCorrect = false;
    setFeedback("error", `${msg} ${result.errors[0]}`);
    setCheckDetails(["Mission hints:", ...result.hints], false);
  }
}

function nextProblem(fromModal = false) {
  if (!fromModal && !state.isCheckedCorrect) {
    setFeedback("error", "Check the answer first.");
    return;
  }

  if (state.currentProblemIdx < CHALLENGES.length - 1) {
    const priorUnlockCount = unlockedCodeCount();
    state.currentProblemIdx += 1;
    resetBoard();
    const newUnlockCount = unlockedCodeCount();
    if (newUnlockCount > priorUnlockCount) {
      triggerUnlockCelebration(newUnlockCount - 1);
      setFeedback("success", `You unlocked a new action code block. ${newUnlockCount} of ${OZOBOT_CODES.length} codes unlocked.`);
    }
    return;
  }

  state.currentProblemIdx = 0;
  resetBoard();
  setFeedback("success", "You finished all 10 problems. Starting again at Problem 1.");
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
    btn.className = "tile";
    btn.disabled = currentTotal + fraction.units > BASE_UNITS;
    btn.style.borderColor = `${fraction.color}66`;
    btn.innerHTML = `<div style="font-size:22px;color:${fraction.color}">${fraction.label}</div><div class="small">${fraction.name}</div>`;
    btn.addEventListener("click", () => addSegment(fraction));
    el.fractionButtons.appendChild(btn);
  });
}

function renderCodeButtons() {
  el.codeButtons.innerHTML = "";
  const visibleCodes = OZOBOT_CODES.slice(0, unlockedCodeCount());
  const lockedCount = OZOBOT_CODES.length - visibleCodes.length;

  el.codeUnlockText.textContent = `${visibleCodes.length} of ${OZOBOT_CODES.length} codes unlocked`;

  visibleCodes.forEach((code) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.dataset.codeIdx = String(OZOBOT_CODES.findIndex((c) => c.id === code.id));
    btn.innerHTML = `<div style="display:flex;gap:0;">${codeStripesHTML(code.colors)}</div><div class="small">${code.name}</div>`;
    btn.addEventListener("click", () => addCode(code));
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
  el.liveMarkers.innerHTML = "";
  const setMarkerLeft = (marker, units) => {
    marker.style.left = `${(units / BASE_UNITS) * 100}%`;
    if (units === 0) {
      marker.style.transform = "translateX(0)";
    } else if (units === BASE_UNITS) {
      marker.style.transform = "translateX(-100%)";
    }
  };

  const problem = currentProblem();
  if (state.placedSegments.length === 0 && state.showLineHints) {
    const hintA = document.createElement("div");
    hintA.className = "live-hint";
    hintA.textContent = "Hint: Add fraction segments first.";
    el.liveMarkers.appendChild(hintA);

    if (problem.requirements.codes.length > 0) {
      const targets = problem.requirements.codes
        .map((req) => `${req.numerator}/${req.denominator}`)
        .join(", ");
      const hintB = document.createElement("div");
      hintB.className = "live-hint";
      hintB.textContent = `Then add action code blocks at ${targets}.`;
      el.liveMarkers.appendChild(hintB);
    }
    return;
  }
  if (state.placedSegments.length === 0 && !state.showLineHints) return;

  const segmentRule = Object.entries(problem.requirements.segments)[0];
  if (segmentRule) {
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
        wrongEndpoints.push({ units: running, label: segment.label });
      }
    });

    for (let i = 1; i <= needed; i += 1) {
      const units = (i * BASE_UNITS) / needed;
      const matched = matchedBoundaryIndexes.has(i);
      if (!matched && !state.showLineHints) continue;
      const marker = document.createElement("div");
      marker.className = `live-marker boundary ${matched ? "matched" : "pending"}`;
      setMarkerLeft(marker, units);
      marker.textContent = matched ? "✓" : "•";
      marker.title = `${i}/${needed}`;
      el.liveMarkers.appendChild(marker);
    }

    wrongEndpoints.forEach((wrong) => {
      const marker = document.createElement("div");
      marker.className = "live-marker boundary wrong";
      setMarkerLeft(marker, wrong.units);
      marker.textContent = "↺";
      marker.title = `${wrong.label} is not needed here. Use ${requiredLabel}.`;
      el.liveMarkers.appendChild(marker);
    });

    if (wrongEndpoints.length > 0) {
      const warning = document.createElement("div");
      warning.className = "live-hint warning";
      warning.textContent = `Try using only ${requiredLabel} segments for this mission.`;
      el.liveMarkers.appendChild(warning);
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
    if (!matched && !state.showLineHints) return;
    const marker = document.createElement("div");
    marker.className = `live-marker code ${matched ? "matched" : "pending"}`;
    setMarkerLeft(marker, units);
    marker.textContent = matched ? "✓" : "⭐";
    marker.title = `Action code at ${req.numerator}/${req.denominator}`;
    el.liveMarkers.appendChild(marker);
  });

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
    el.liveMarkers.appendChild(warning);
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
    block.style.left = `${(startUnits / BASE_UNITS) * 100}%`;
    block.style.width = `${(segment.units / BASE_UNITS) * 100}%`;
    block.style.borderColor = `${segment.color}99`;
    block.style.background = `${segment.color}22`;

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
          `<span class="code-stripe" style="background:${color};width:var(--ozobot-line-size);height:var(--ozobot-line-size);border-radius:0"></span>`
      )
      .join("");

    el.codesLayer.appendChild(chip);
  });

  renderAxis();
  renderLiveMarkers();
}

function render() {
  const problem = currentProblem();
  el.problemCounter.textContent = `Problem ${state.currentProblemIdx + 1} of ${CHALLENGES.length}`;
  el.missionText.textContent = problem.title;
  el.progressValue.textContent = formatUnitsAsFraction(totalUnits());

  renderFractionButtons();
  renderCodeButtons();
  renderTrack();
  renderPieChart();
}

el.hintBtn.addEventListener("click", showHint);
el.undoBtn.addEventListener("click", undo);
el.resetBtn.addEventListener("click", resetBoard);
el.checkBtn.addEventListener("click", checkAnswer);
el.nextFromModalBtn.addEventListener("click", closeSuccessModalAndAdvance);
el.successModal.addEventListener("click", (event) => {
  if (event.target === el.successModal) closeSuccessModalAndAdvance();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !el.successModal.classList.contains("hidden")) {
    closeSuccessModalAndAdvance();
  }
});

render();
