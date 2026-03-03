const FRACTIONS = [
  { label: "1/2", value: 0.5, color: "#ef4444", name: "Half" },
  { label: "1/3", value: 1 / 3, color: "#f59e0b", name: "Third" },
  { label: "1/4", value: 0.25, color: "#10b981", name: "Fourth" },
  { label: "1/6", value: 1 / 6, color: "#3b82f6", name: "Sixth" },
  { label: "1/8", value: 0.125, color: "#8b5cf6", name: "Eighth" }
];

const OZOBOT_CODES = [
  { id: "spin", name: "Spin", colors: ["#00FF00", "#FF0000", "#00FF00", "#FF0000"] },
  { id: "zigzag", name: "Zigzag", colors: ["#0000FF", "#000000", "#00FF00", "#FF0000"] },
  { id: "fast", name: "Fast", colors: ["#0000FF", "#000000", "#0000FF"] },
  { id: "slow", name: "Slow", colors: ["#FF0000", "#000000", "#FF0000"] },
  { id: "play_again", name: "Play Again", colors: ["#00FF00", "#0000FF"] }
];

// NC.3.NF.2-aligned progression: unit fractions and non-unit fractions on a number line.
const CHALLENGES = [
  {
    title: "Length model: partition 1 whole into 4 equal parts (unit fraction 1/4). Show 2 copies of 1/4 by placing [spin] at 2/4 (1/2).",
    requirements: { segments: { "1/4": 4 }, codes: [{ codeId: "spin", position: 0.5 }] }
  },
  {
    title: "Length model: partition into 6 equal parts. Show 2 copies of 1/6 at 1/3 and 4 copies of 1/6 at 2/3.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [
        { codeId: "slow", position: 1 / 3 },
        { codeId: "fast", position: 2 / 3 }
      ]
    }
  },
  {
    title: "Length model: partition into 8 equal parts. Show numerator 3 by placing [zigzag] at 3/8.",
    requirements: { segments: { "1/8": 8 }, codes: [{ codeId: "zigzag", position: 3 / 8 }] }
  },
  {
    title: "Length model: with fourths, place [fast] at 1/4 and [slow] at 3/4 to show 1 and 3 copies of 1/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { codeId: "fast", position: 1 / 4 },
        { codeId: "slow", position: 3 / 4 }
      ]
    }
  },
  {
    title: "Length model: partition into thirds. Place [spin] at 1/3 and [play_again] at 3/3 (1 whole).",
    requirements: {
      segments: { "1/3": 3 },
      codes: [
        { codeId: "spin", position: 1 / 3 },
        { codeId: "play_again", position: 1 }
      ]
    }
  },
  {
    title: "Length model: partition into halves. Place [zigzag] at 1/2 and [play_again] at 2/2 (1 whole).",
    requirements: {
      segments: { "1/2": 2 },
      codes: [
        { codeId: "zigzag", position: 1 / 2 },
        { codeId: "play_again", position: 1 }
      ]
    }
  },
  {
    title: "Length model: with sixths, place [fast] at 1/6 and [slow] at 5/6. Explain: numerator is number of unit lengths from 0.",
    requirements: {
      segments: { "1/6": 6 },
      codes: [
        { codeId: "fast", position: 1 / 6 },
        { codeId: "slow", position: 5 / 6 }
      ]
    }
  },
  {
    title: "Garden task (from NC example): using eighths, mark [fast] at 1/8, [spin] at 3/8, and [zigzag] at 4/8.",
    requirements: {
      segments: { "1/8": 8 },
      codes: [
        { codeId: "fast", position: 1 / 8 },
        { codeId: "spin", position: 3 / 8 },
        { codeId: "zigzag", position: 4 / 8 }
      ]
    }
  },
  {
    title: "Road task (from NC example): partition into thirds and place [slow] at 2/3.",
    requirements: {
      segments: { "1/3": 3 },
      codes: [
        { codeId: "slow", position: 2 / 3 }
      ]
    }
  },
  {
    title: "Final mixed challenge: build 1 whole in fourths and place [fast] at 1/4, [zigzag] at 2/4, [slow] at 3/4, and [play_again] at 4/4.",
    requirements: {
      segments: { "1/4": 4 },
      codes: [
        { codeId: "fast", position: 1 / 4 },
        { codeId: "zigzag", position: 1 / 2 },
        { codeId: "slow", position: 3 / 4 },
        { codeId: "play_again", position: 1 }
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
  hasTriedOzobot: false
};

const el = {
  problemCounter: document.getElementById("problemCounter"),
  missionText: document.getElementById("missionText"),
  feedback: document.getElementById("feedback"),
  checkDetails: document.getElementById("checkDetails"),
  pieSlices: document.getElementById("pieSlices"),
  pieLabel: document.getElementById("pieLabel"),
  trackFill: document.getElementById("trackFill"),
  segmentOverlay: document.getElementById("segmentOverlay"),
  codesLayer: document.getElementById("codesLayer"),
  progressValue: document.getElementById("progressValue"),
  fractionButtons: document.getElementById("fractionButtons"),
  codeButtons: document.getElementById("codeButtons"),
  calibrateBtn: document.getElementById("calibrateBtn"),
  calibrationModal: document.getElementById("calibrationModal"),
  closeCalibrationBtn: document.getElementById("closeCalibrationBtn"),
  undoBtn: document.getElementById("undoBtn"),
  resetBtn: document.getElementById("resetBtn"),
  checkBtn: document.getElementById("checkBtn"),
  triedBtn: document.getElementById("triedBtn"),
  nextBtn: document.getElementById("nextBtn")
};

function totalLength() {
  return state.placedSegments.reduce((sum, s) => sum + s.value, 0);
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

function codeStripesHTML(colors, stripeHeight = 18, stripeWidth = 8) {
  return colors
    .map(
      (color) =>
        `<span class="code-stripe" style="display:inline-block;background:${color};height:${stripeHeight}px;width:${stripeWidth}px;border-radius:0"></span>`
    )
    .join("");
}

function codeBadgeHTML(codeId) {
  const code = findCodeById(codeId);
  if (!code) return `<span style="padding:0 4px;border:1px dashed #94a3b8;border-radius:4px;">${codeId}</span>`;
  return `<span class="inline-code-badge" aria-label="${code.name} action code" style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 3px;"><span class="inline-code-image" style="display:inline-flex;gap:0;">${codeStripesHTML(code.colors, 18, 9)}</span></span>`;
}

function missionHTML(title) {
  return title.replace(/\[([a-z_]+)\]/g, (_, codeId) => codeBadgeHTML(codeId));
}

function setFeedback(type, message) {
  if (!message) {
    el.feedback.className = "feedback hidden";
    el.feedback.textContent = "";
    return;
  }

  el.feedback.className = `feedback ${type}`;
  el.feedback.textContent = message;
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

function updateProgressControls() {
  const unlocked = state.isCheckedCorrect && state.hasTriedOzobot;
  el.nextBtn.disabled = !unlocked;
  el.triedBtn.classList.toggle("tried", state.hasTriedOzobot);
  el.triedBtn.textContent = state.hasTriedOzobot ? "Ozobot Tried ✓" : "I Tried Ozobot";
}

function clearCheckProgress() {
  state.isCheckedCorrect = false;
  state.hasTriedOzobot = false;
  updateProgressControls();
}

function resetBoard() {
  state.placedSegments = [];
  state.placedCodes = [];
  state.history = [];

  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function addSegment(fraction) {
  const currentTotal = totalLength();
  if (currentTotal + fraction.value > 1.001) return;

  state.placedSegments.push({ ...fraction, uid: makeId() });
  state.history.push("segment");
  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function addCode(code) {
  state.placedCodes.push({
    ...code,
    position: totalLength(),
    uid: makeId()
  });

  state.history.push("code");
  setFeedback(null, "");
  setCheckDetails([], false);
  clearCheckProgress();
  render();
}

function undo() {
  if (!state.history.length) return;
  const last = state.history.pop();
  if (last === "segment") state.placedSegments.pop();
  if (last === "code") state.placedCodes.pop();

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

  problem.requirements.codes.forEach((req) => {
    const match = state.placedCodes.find(
      (pc) => pc.id === req.codeId && Math.abs(pc.position - req.position) < 0.01
    );

    const code = findCodeById(req.codeId);
    const asFraction = FRACTIONS.find((f) => Math.abs(f.value - req.position) < 0.01);
    const label = asFraction ? asFraction.label : req.position.toFixed(2);

    if (!match) {
      errors.push(`Missing ${code ? code.name : "action code"} at ${label}.`);
      hints.push(`Try this: Place ${codeBadgeHTML(req.codeId)} at ${label}.`);
    } else {
      passes.push(`Action code ${codeBadgeHTML(req.codeId)} is in the right spot at ${label}.`);
    }
  });

  const requiredSegments = problem.requirements.segments;
  Object.entries(requiredSegments).forEach(([segmentLabel, needed]) => {
    const count = state.placedSegments.filter((s) => s.label === segmentLabel).length;
    if (count < needed) {
      errors.push(`Need ${needed} total ${segmentLabel} segments (currently ${count}).`);
      hints.push(`Try this: Add more ${segmentLabel} segments until you have ${needed}.`);
    } else {
      passes.push(`Great partitioning with ${segmentLabel} segments (${count}).`);
    }
  });

  if (totalLength() > 1.001) {
    errors.push("The line is longer than 1 whole.");
    hints.push("Try this: Remove one segment so your total is exactly 1 whole.");
  }

  return { passed: errors.length === 0, errors, passes, hints };
}

function checkAnswer() {
  const result = evaluateStudentWork();
  const successMessages = [
    "Awesome job! Math mission complete.",
    "Boom! You built that fraction path.",
    "You got it! Ozobot is ready to test."
  ];
  const tryAgainMessages = [
    "Nice try! You are super close.",
    "Keep going! Fix one clue at a time.",
    "Good effort! Let's tune it up."
  ];

  if (result.passed) {
    const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
    state.isCheckedCorrect = true;
    updateProgressControls();
    setFeedback("success", `${msg} Now run Ozobot, then tap 'I Tried Ozobot'.`);
    setCheckDetails(["Star work! Everything matches the mission.", ...result.passes], true);
  } else {
    const msg = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
    state.isCheckedCorrect = false;
    updateProgressControls();
    setFeedback("error", `${msg} ${result.errors[0]}`);
    setCheckDetails(["Mission hints:", ...result.hints], false);
  }
}

function confirmTriedOzobot() {
  if (!state.isCheckedCorrect) {
    setFeedback("error", "First tap 'Check Answer' and get a correct answer.");
    return;
  }

  state.hasTriedOzobot = true;
  updateProgressControls();
  setFeedback("success", "Great testing! Tap 'Next Problem' when you're ready.");
}

function nextProblem() {
  if (!(state.isCheckedCorrect && state.hasTriedOzobot)) {
    setFeedback("error", "Check the answer, then try Ozobot, then move to the next problem.");
    return;
  }

  if (state.currentProblemIdx < CHALLENGES.length - 1) {
    state.currentProblemIdx += 1;
    resetBoard();
    return;
  }

  state.currentProblemIdx = 0;
  resetBoard();
  setFeedback("success", "You finished all 10 problems. Amazing work! Starting again at Problem 1.");
}

function openCalibrationModal() {
  el.calibrationModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCalibrationModal() {
  el.calibrationModal.classList.add("hidden");
  document.body.style.overflow = "";
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
    const sliceAngle = segment.value * 360;
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

  el.pieLabel.textContent = `${totalLength().toFixed(2)} of 1.00`;
}

function renderFractionButtons() {
  el.fractionButtons.innerHTML = "";
  const currentTotal = totalLength();

  FRACTIONS.forEach((fraction) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.disabled = currentTotal + fraction.value > 1.001;
    btn.style.borderColor = `${fraction.color}66`;
    btn.innerHTML = `<div style="font-size:22px;color:${fraction.color}">${fraction.label}</div><div class="small">${fraction.name}</div>`;
    btn.addEventListener("click", () => addSegment(fraction));
    el.fractionButtons.appendChild(btn);
  });
}

function renderCodeButtons() {
  el.codeButtons.innerHTML = "";
  OZOBOT_CODES.forEach((code) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.innerHTML = `<div style="display:flex;gap:0;">${codeStripesHTML(code.colors)}</div><div class="small">${code.name}</div>`;
    btn.addEventListener("click", () => addCode(code));
    el.codeButtons.appendChild(btn);
  });
}

function renderTrack() {
  const length = totalLength();
  el.trackFill.style.transform = `translateY(-50%) scaleX(${Math.min(1, length)})`;

  el.segmentOverlay.innerHTML = "";
  state.placedSegments.forEach((segment) => {
    const part = document.createElement("div");
    part.className = "overlay-segment";
    part.style.width = `${segment.value * 100}%`;
    part.style.background = segment.color;
    el.segmentOverlay.appendChild(part);
  });

  el.codesLayer.innerHTML = "";
  state.placedCodes.forEach((placedCode) => {
    const chip = document.createElement("div");
    chip.className = "code-chip";
    chip.style.left = `${placedCode.position * 100}%`;
    chip.innerHTML = placedCode.colors
      .map((color) => `<span class="code-stripe" style="background:${color}"></span>`)
      .join("");

    el.codesLayer.appendChild(chip);
  });
}

function render() {
  const problem = currentProblem();
  el.problemCounter.textContent = `Problem ${state.currentProblemIdx + 1} of ${CHALLENGES.length}`;
  el.missionText.innerHTML = missionHTML(problem.title);
  el.progressValue.textContent = totalLength().toFixed(2);

  renderFractionButtons();
  renderCodeButtons();
  renderTrack();
  renderPieChart();
  updateProgressControls();
}

el.calibrateBtn.addEventListener("click", openCalibrationModal);
el.closeCalibrationBtn.addEventListener("click", closeCalibrationModal);
el.calibrationModal.addEventListener("click", (event) => {
  if (event.target === el.calibrationModal) closeCalibrationModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !el.calibrationModal.classList.contains("hidden")) {
    closeCalibrationModal();
  }
});
el.undoBtn.addEventListener("click", undo);
el.resetBtn.addEventListener("click", resetBoard);
el.checkBtn.addEventListener("click", checkAnswer);
el.triedBtn.addEventListener("click", confirmTriedOzobot);
el.nextBtn.addEventListener("click", nextProblem);

render();
