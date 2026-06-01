// build_ppt_gigang.js — 기강 Gigang Education Ver2
// 4brain-skills build_ppt_v2.js 기반, 기강 브랜드로 변환
// 사용: node build_ppt_gigang.js [chapter-key]
// 출력: output/gigang-v2/*.pptx

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ============================================================================
// 디자인 토큰
// ============================================================================
const C = {
  BLUE: "005CB9",
  NAVY: "003152",
  WHITE: "FFFFFF",
  ICE: "EEF4FB",
  INK: "1C2B3A",
  STEEL: "5A7184",
  PALE: "C8DCF0",
  SKY: "166FC0",
  TEAL: "00876C",
  AMBER: "D97706",
  BG_CARD: "F4F8FC",
};

const FONT = "Pretendard";
const SLIDE_W = 13.33;
const SLIDE_H = 7.5;
const cm = (x) => +(x * 0.3937).toFixed(3);

const L = {
  headerH: cm(1.4),
  marginX: cm(0.9),
  titleY: cm(1.7),
  subtitleY: cm(3.2),
  hrY: cm(4.0),
  contentY: cm(4.5),
  contentBottom: cm(16.5),
  footerY: cm(18.35),
  footerH: cm(0.7),
};
const CONTENT_W = SLIDE_W - 2 * L.marginX;

// ============================================================================
// Chrome helpers
// ============================================================================
function addChrome(slide, ctx) {
  slide.addShape("rect", {
    x: 0, y: 0, w: SLIDE_W, h: L.headerH,
    fill: { color: C.BLUE }, line: { color: C.BLUE },
  });
  slide.addText(ctx.chapterLabel, {
    x: cm(0.6), y: 0, w: 6, h: L.headerH,
    fontFace: FONT, fontSize: 10, bold: true, color: C.WHITE,
    charSpacing: 1.5, valign: "middle", align: "left",
  });
  slide.addText("기강", {
    x: SLIDE_W - 2.5, y: 0, w: 2.0, h: L.headerH,
    fontFace: FONT, fontSize: 14, bold: true, color: C.WHITE,
    charSpacing: 3, valign: "middle", align: "right",
  });
  slide.addText(ctx.title, {
    x: L.marginX, y: L.titleY, w: CONTENT_W, h: cm(1.3),
    fontFace: FONT, fontSize: ctx.titleSize || 32, bold: true,
    color: C.NAVY, valign: "top", align: "left",
  });
  if (ctx.subtitle) {
    slide.addText(ctx.subtitle, {
      x: L.marginX, y: L.subtitleY, w: CONTENT_W, h: cm(0.7),
      fontFace: FONT, fontSize: 18, color: C.STEEL,
      valign: "top", align: "left",
    });
  }
  slide.addShape("line", {
    x: L.marginX, y: L.hrY + cm(0.15), w: CONTENT_W, h: 0,
    line: { color: C.PALE, width: 1 },
  });
  slide.addShape("line", {
    x: 0, y: L.footerY, w: SLIDE_W, h: 0,
    line: { color: C.PALE, width: 1 },
  });
  slide.addText("기강 · Gigang Education Ver2", {
    x: L.marginX, y: L.footerY, w: 6, h: L.footerH,
    fontFace: FONT, fontSize: 9, color: C.STEEL,
    valign: "middle", align: "left",
  });
  slide.addText(`${String(ctx.idx).padStart(2,"0")} / ${String(ctx.total).padStart(2,"0")}`, {
    x: SLIDE_W - 2.5, y: L.footerY, w: 2.0, h: L.footerH,
    fontFace: FONT, fontSize: 9, color: C.STEEL,
    valign: "middle", align: "right",
  });
}

function chrome(slide, chapter, idx, total, title, subtitle, titleSize) {
  addChrome(slide, { chapterLabel: chapter.chapterLabel, idx, total, title, subtitle, titleSize });
}

function addKeyBar(slide, label, text) {
  const barH = cm(1.0);
  const y = L.footerY - barH;
  slide.addShape("rect", { x: 0, y, w: SLIDE_W, h: barH, fill: { color: C.NAVY }, line: { color: C.NAVY } });
  slide.addShape("rect", { x: 0, y, w: 0.18, h: barH, fill: { color: C.BLUE }, line: { color: C.BLUE } });
  slide.addText(label, {
    x: cm(0.7), y, w: 2.2, h: barH,
    fontFace: FONT, fontSize: 13, bold: true, color: C.PALE,
    valign: "middle", align: "left", charSpacing: 1.2,
  });
  slide.addShape("line", { x: 2.9, y: y + cm(0.2), w: 0, h: barH - cm(0.4), line: { color: C.PALE, width: 1 } });
  slide.addText(text, {
    x: 3.1, y, w: SLIDE_W - 3.1 - cm(0.5), h: barH,
    fontFace: FONT, fontSize: 13, color: C.WHITE,
    valign: "middle", align: "left",
  });
}

function addBullets(slide, items, opts = {}) {
  const x = opts.x ?? L.marginX;
  const y = opts.y ?? L.contentY;
  const w = opts.w ?? CONTENT_W;
  const fontSize = opts.fontSize ?? 14;
  const color = opts.color ?? C.INK;
  const lineGap = opts.lineGap ?? cm(0.95);
  items.forEach((item, i) => {
    const runs = [
      { text: "•  ", options: { bold: true, color: C.BLUE, fontFace: FONT, fontSize } },
      ...item.runs.map((r) => ({
        text: r.text,
        options: { bold: !!r.bold, color: r.color || color, fontFace: FONT, fontSize },
      })),
    ];
    slide.addText(runs, {
      x, y: y + i * lineGap, w, h: lineGap,
      valign: "top", align: "left", paraSpaceAfter: 0,
    });
  });
}

function addCode(slide, code, opts = {}) {
  const x = opts.x ?? L.marginX;
  const y = opts.y ?? L.contentY;
  const w = opts.w ?? CONTENT_W;
  const h = opts.h ?? cm(2.2);
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: "181715" }, line: { color: "252320", width: 1 },
  });
  slide.addText(code, {
    x: x + cm(0.4), y: y + cm(0.25), w: w - cm(0.8), h: h - cm(0.5),
    fontFace: "Consolas", fontSize: opts.fontSize ?? 13, color: "F4E0BC",
    valign: "top", align: "left",
  });
}

function addSimpleTable(slide, header, rows, opts = {}) {
  const x = opts.x ?? L.marginX;
  const y = opts.y ?? L.contentY;
  const w = opts.w ?? CONTENT_W;
  const colW = opts.colW;
  const headFontSize = opts.headFontSize ?? 13;
  const bodyFontSize = opts.bodyFontSize ?? 12;
  const headerRow = header.map((t) => ({
    text: t,
    options: { bold: true, color: C.WHITE, fill: { color: C.BLUE }, align: "left", valign: "middle", fontFace: FONT, fontSize: headFontSize, margin: 0.06 },
  }));
  const bodyRows = rows.map((r, ri) => r.map((cellRuns) => {
    const runs = Array.isArray(cellRuns)
      ? cellRuns.map((run) => ({ text: run.text, options: { bold: !!run.bold, color: run.color || C.INK, fontFace: FONT, fontSize: bodyFontSize } }))
      : [{ text: String(cellRuns), options: { fontFace: FONT, fontSize: bodyFontSize, color: C.INK } }];
    return { text: runs, options: { align: "left", valign: "middle", fill: { color: ri % 2 === 0 ? C.ICE : C.WHITE }, margin: 0.06 } };
  }));
  slide.addTable([headerRow, ...bodyRows], { x, y, w, colW, border: { type: "solid", color: C.PALE, pt: 0.5 }, fontFace: FONT });
}

function addCard(slide, x, y, w, h, headerText, bodyText, opts = {}) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: opts.bg || C.BG_CARD }, line: { color: opts.border || C.PALE, width: 1 } });
  slide.addShape("rect", { x, y, w: 0.1, h, fill: { color: opts.strip || C.BLUE }, line: { color: opts.strip || C.BLUE } });
  if (headerText) {
    slide.addText(headerText, { x: x + 0.2, y: y + 0.1, w: w - 0.3, h: 0.5, fontFace: FONT, fontSize: opts.headSize || 18, bold: true, color: opts.headColor || C.NAVY, valign: "top", align: "left" });
  }
  if (bodyText) {
    slide.addText(bodyText, { x: x + 0.2, y: y + 0.65, w: w - 0.3, h: h - 0.75, fontFace: FONT, fontSize: opts.bodySize || 13, color: opts.bodyColor || C.INK, valign: "top", align: "left" });
  }
}

function addCallout(slide, x, y, w, h, content, opts = {}) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: opts.bg || C.ICE }, line: { color: opts.border || C.PALE, width: 1 } });
  if (content) {
    slide.addText(content, { x: x + 0.3, y: y + 0.2, w: w - 0.6, h: h - 0.4, fontFace: FONT, fontSize: opts.fontSize || 14, color: opts.color || C.INK, valign: "top", align: opts.align || "left" });
  }
}

function addStat(slide, x, y, w, h, number, label, opts = {}) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: opts.bg || C.ICE }, line: { color: C.PALE, width: 1 },
  });
  slide.addText(number, {
    x, y: y + 0.15, w, h: h * 0.55,
    fontFace: FONT, fontSize: opts.numSize || 44, bold: true,
    color: opts.numColor || C.BLUE, valign: "middle", align: "center",
  });
  slide.addText(label, {
    x: x + 0.2, y: y + h * 0.65, w: w - 0.4, h: h * 0.3,
    fontFace: FONT, fontSize: opts.labelSize || 12,
    color: C.STEEL, valign: "top", align: "center",
  });
}

function addTitleSlide(pres, ctx) {
  const slide = pres.addSlide();
  slide.background = { color: C.NAVY };
  slide.addShape("rect", { x: 0, y: 0, w: SLIDE_W, h: L.headerH, fill: { color: C.BLUE }, line: { color: C.BLUE } });
  slide.addText(ctx.chapterLabel, { x: cm(0.6), y: 0, w: 6, h: L.headerH, fontFace: FONT, fontSize: 10, bold: true, color: C.WHITE, charSpacing: 1.5, valign: "middle", align: "left" });
  slide.addText("기강", { x: SLIDE_W - 2.5, y: 0, w: 2.0, h: L.headerH, fontFace: FONT, fontSize: 14, bold: true, color: C.WHITE, charSpacing: 3, valign: "middle", align: "right" });
  slide.addText(ctx.chapterNumber, { x: L.marginX, y: 1.6, w: CONTENT_W, h: 1.2, fontFace: FONT, fontSize: 22, bold: true, color: C.PALE, charSpacing: 4, valign: "top", align: "left" });
  slide.addText(ctx.title, { x: L.marginX, y: 2.5, w: CONTENT_W, h: 1.6, fontFace: FONT, fontSize: 48, bold: true, color: C.WHITE, valign: "top", align: "left" });
  if (ctx.titleSubtitle) {
    slide.addText(ctx.titleSubtitle, { x: L.marginX, y: 4.3, w: CONTENT_W, h: 0.7, fontFace: FONT, fontSize: 22, color: C.PALE, valign: "top", align: "left" });
  }
  slide.addShape("rect", { x: L.marginX, y: 5.4, w: 1.5, h: 0.08, fill: { color: C.BLUE }, line: { color: C.BLUE } });
  slide.addText("기강 · Gigang Education Ver2", { x: L.marginX, y: L.footerY, w: 6, h: L.footerH, fontFace: FONT, fontSize: 9, color: C.PALE, valign: "middle", align: "left" });
}

// ============================================================================
// CH 01 — GPT vs Claude Code (3 slides)
// ============================================================================
function build_01_gpt_vs_cc(pres, ch) {
  const TOTAL = 3;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "쓰던 ChatGPT랑 뭐가 다른가", "AI 쓰는 건 같은데 — 작동 방식이 근본적으로 다르다");
    addSimpleTable(s,
      ["비교", "ChatGPT (브라우저)", "Claude Code (Agentic)"],
      [
        ["역할", "대화 상대", [{ text: "일하는 에이전트", bold: true }]],
        ["내가 할 일", "질문 → 복사 → 붙여넣기 → 행동", [{ text: "명령만", bold: true }]],
        ["작업 단위", "1 문답", [{ text: "여러 단계 자동 진행", bold: true }]],
        ["파일 처리", "내가 직접 조작", [{ text: "AI가 생성·수정·저장", bold: true }]],
        ["기억", "창 닫으면 리셋", [{ text: "프로젝트 파일에 저장", bold: true }]],
      ],
      { y: L.contentY + 0.2, colW: [2.2, 4.5, 4.5], bodyFontSize: 13 }
    );
    addKeyBar(s, "핵심 차이", "ChatGPT: 내가 일하고 AI가 돕는 것 → Claude Code: AI가 일하고 내가 검토하는 것");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "같은 일을 시켜보면", "\"A~C 경쟁사 제품 라인업별 가격·판매전략 분석해줘\"");
    addCard(s, L.marginX, L.contentY + 0.2, 5.8, 3.5,
      "ChatGPT 방식",
      "나: 경쟁사 분석해줘\nAI: 데이터를 주시겠습니까?\n나: (직접 검색 → 엑셀 정리 → 첨부)\nAI: 만들어드렸습니다\n나: (복사 → 파일 재작성 → 보고 제출)",
      { strip: C.STEEL, headColor: C.STEEL, bodySize: 13 }
    );
    addCard(s, L.marginX + 6.1, L.contentY + 0.2, 6.7, 3.5,
      "Agentic AI 방식",
      "나: 경쟁사 분석해줘\nAI: 인터넷에서 검색합니다\nAI: A~C 외에 D·E·F도 있습니다. 함께 확인\nAI: Excel 파일을 만듭니다\nAI: 보고 초안을 작성합니다\nAI: 확인용 HTML 페이지 완성\n나: 확인 ✓",
      { strip: C.BLUE, bodySize: 13 }
    );
    addKeyBar(s, "흐름 비교",
      "ChatGPT: 명령 → 답변 → 검토(나) → 행동(나) | Agentic: 명령 → 플랜 → 실행(AI) → 검토(나) → 완료");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "왜 지금 써야 하나", "기강 목표 — 혼자서 4명 분량의 일을 처리");
    addBullets(s, [
      { runs: [{ text: "한 명이 여러 작업을 " }, { text: "병렬로 AI에게 위임", bold: true }, { text: " 할 수 있다" }] },
      { runs: [{ text: "내가 A를 검토하는 동안 " }, { text: "AI는 B·C·D를 진행", bold: true }] },
      { runs: [{ text: "반복·형식화된 작업을 AI에게 맡기는 것이 " }, { text: "첫 번째 미션", bold: true }] },
    ], { x: L.marginX, y: L.contentY + 0.2, w: 6.4, fontSize: 14, lineGap: cm(1.0) });

    const wx = 7.5; const wy = L.contentY + 0.2; const ww = 5.4; const wh = 3.6;
    addCallout(s, wx, wy, ww, wh, "");
    s.addText("내 업무 중 AI에게 맡기고 싶은 것", {
      x: wx + 0.35, y: wy + 0.2, w: ww - 0.7, h: 0.5,
      fontFace: FONT, fontSize: 16, bold: true, color: C.BLUE, valign: "top", align: "left",
    });
    for (let i = 1; i <= 3; i++) {
      const ly = wy + 0.85 + (i - 1) * 0.9;
      s.addText(`${i}.`, { x: wx + 0.5, y: ly, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: C.NAVY, valign: "middle", align: "left" });
      s.addShape("line", { x: wx + 1.0, y: ly + 0.45, w: ww - 1.4, h: 0, line: { color: C.STEEL, width: 1.2 } });
    }
    addKeyBar(s, "ACTION", "지금 적은 3가지 — 06 챕터 실습에서 직접 시도해본다");
  }
}

// ============================================================================
// CH 02 — 설치하기 (3 slides)
// ============================================================================
function build_02_setup(pres, ch) {
  const TOTAL = 3;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "설치 순서 3단계", "백문이 불여일견, 백각이 불여일행");
    const steps = [
      { num: "1", title: "Claude Code 설치", desc: "Anthropic 공식 사이트에서 설치\nclaude --version 으로 확인" },
      { num: "2", title: "GitHub 가입", desc: "github.com 에서 계정 생성\n이메일 인증 완료" },
      { num: "3", title: "gigang-skills 설치", desc: "claude --dangerously-skip-permissions\n→ /gigang-init 실행" },
    ];
    const sw = 3.9; const sy = L.contentY + 0.3;
    steps.forEach((st, i) => {
      const sx = L.marginX + i * (sw + 0.35);
      s.addShape("roundRect", { x: sx, y: sy, w: sw, h: 3.2, rectRadius: 0.1, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("rect", { x: sx, y: sy, w: 0.12, h: 3.2, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addShape("roundRect", { x: sx + 0.25, y: sy + 0.2, w: 0.6, h: 0.6, rectRadius: 0.3, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(st.num, { x: sx + 0.25, y: sy + 0.2, w: 0.6, h: 0.6, fontFace: FONT, fontSize: 18, bold: true, color: C.WHITE, valign: "middle", align: "center" });
      s.addText(st.title, { x: sx + 0.25, y: sy + 0.95, w: sw - 0.4, h: 0.6, fontFace: FONT, fontSize: 16, bold: true, color: C.NAVY, valign: "top", align: "left" });
      s.addText(st.desc, { x: sx + 0.25, y: sy + 1.65, w: sw - 0.4, h: 1.4, fontFace: FONT, fontSize: 13, color: C.INK, valign: "top", align: "left" });
    });
    addKeyBar(s, "순서", "Claude Code → GitHub → gigang-skills  |  순서 바꾸지 말 것");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "gigang-init 완료 확인", "아래 3가지가 모두 될 때까지 /gigang-init 반복 실행");
    const checks = [
      { num: "1", text: "Win+X → A 로 열린 터미널이 PowerShell 7 이어야 함", sub: "터미널 탭에 PowerShell 7 아이콘이 표시됨" },
      { num: "2", text: "터미널 시작 경로가 C:\\WORK 인지 확인", sub: "열자마자 C:\\WORK> 가 보이면 OK" },
      { num: "3", text: "cc 를 입력하면 Claude Code 가 켜지는지 확인", sub: "claude --dangerously-skip-permissions 의 단축어" },
    ];
    const cy = L.contentY + 0.3;
    checks.forEach((c, i) => {
      const iy = cy + i * 1.1;
      s.addShape("roundRect", { x: L.marginX, y: iy, w: CONTENT_W, h: 0.9, rectRadius: 0.07, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("roundRect", { x: L.marginX + 0.15, y: iy + 0.15, w: 0.6, h: 0.6, rectRadius: 0.07, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(c.num, { x: L.marginX + 0.15, y: iy + 0.15, w: 0.6, h: 0.6, fontFace: FONT, fontSize: 18, bold: true, color: C.WHITE, valign: "middle", align: "center" });
      s.addText(c.text, { x: L.marginX + 0.9, y: iy + 0.08, w: CONTENT_W - 1.1, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: C.NAVY, valign: "top", align: "left" });
      s.addText(c.sub, { x: L.marginX + 0.9, y: iy + 0.5, w: CONTENT_W - 1.1, h: 0.35, fontFace: FONT, fontSize: 12, color: C.STEEL, valign: "top", align: "left" });
    });
    const wy = cy + 3.5;
    s.addShape("roundRect", { x: L.marginX, y: wy, w: CONTENT_W, h: 0.75, rectRadius: 0.07, fill: { color: "FFF7ED" }, line: { color: "FDBA74", width: 1.5 } });
    s.addText("⚠  하나라도 안 되면 바로:", { x: L.marginX + 0.2, y: wy + 0.05, w: 3.5, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: "9A3412", valign: "top" });
    s.addText("claude --dangerously-skip-permissions", { x: L.marginX + 0.2, y: wy + 0.35, w: CONTENT_W - 0.4, h: 0.3, fontFace: "Consolas", fontSize: 13, color: "9A3412", valign: "top" });
    addKeyBar(s, "WHY", "3가지 모두 완료돼야 이후 cc 단축어·자동시작·Sonnet 기본값이 모두 작동함");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "설치 완료 확인", "터미널에서 바로 확인해보기");
    s.addText("터미널을 새로 열고 cc 입력", {
      x: L.marginX, y: L.contentY + 0.2, w: CONTENT_W, h: 0.4,
      fontFace: FONT, fontSize: 14, color: C.STEEL, valign: "top",
    });
    addCode(s, "cc", { y: L.contentY + 0.75, h: 0.7 });
    s.addText("→ Claude Code 가 열리면 설치 완료", {
      x: L.marginX, y: L.contentY + 1.6, w: CONTENT_W, h: 0.4,
      fontFace: FONT, fontSize: 14, bold: true, color: C.TEAL, valign: "top",
    });
    s.addText("Claude Code 안에서 스킬 목록 확인", {
      x: L.marginX, y: L.contentY + 2.2, w: CONTENT_W, h: 0.4,
      fontFace: FONT, fontSize: 14, color: C.STEEL, valign: "top",
    });
    addCode(s, "/gigang-help", { y: L.contentY + 2.75, h: 0.7 });
    s.addText("→ 사용 가능한 스킬 목록이 출력되면 모든 설치 완료", {
      x: L.marginX, y: L.contentY + 3.6, w: CONTENT_W, h: 0.4,
      fontFace: FONT, fontSize: 14, bold: true, color: C.TEAL, valign: "top",
    });
    addKeyBar(s, "DONE", "cc → Claude Code 진입, /gigang-help → 스킬 목록 확인. 이 두 가지가 되면 준비 완료");
  }
}

// ============================================================================
// CH 03 — 초기준비 (4 slides)
// ============================================================================
function build_03_init(pres, ch) {
  const TOTAL = 4;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "작업 폴더 — C:\\WORK", "업무별 폴더를 나눠야 AI가 헤매지 않는다");
    addBullets(s, [
      { runs: [{ text: "회사 업무 A·B·C 가 있으면 " }, { text: "C:\\WORK\\A, B, C", bold: true, color: C.BLUE }, { text: " 로 분리" }] },
      { runs: [{ text: "같은 폴더에서 여러 업무 섞으면 " }, { text: "AI가 엉뚱한 파일 수정", bold: true }, { text: " 가능" }] },
      { runs: [{ text: "다른 폴더 자료 참조 시 → 파일을 옮기지 말고 " }, { text: "경로를 알려줘라", bold: true }] },
    ], { x: L.marginX, y: L.contentY + 0.2, w: 6.5, fontSize: 14, lineGap: cm(1.0) });

    const fx = 7.5; const fy = L.contentY + 0.2; const fw = 5.4; const fh = 3.5;
    addCallout(s, fx, fy, fw, fh, "");
    s.addText("C:\\WORK\\", { x: fx + 0.3, y: fy + 0.25, w: fw - 0.6, h: 0.4, fontFace: "Consolas", fontSize: 15, bold: true, color: C.NAVY, valign: "top" });
    const folders = ["A_경쟁사분석\\", "B_제품제안\\", "C_주간보고\\"];
    folders.forEach((f, i) => {
      s.addShape("rect", { x: fx + 0.5, y: fy + 0.85 + i * 0.75, w: fw - 1.0, h: 0.55, fill: { color: C.ICE }, line: { color: C.PALE, width: 1 } });
      s.addText(`  📁  ${f}`, { x: fx + 0.5, y: fy + 0.85 + i * 0.75, w: fw - 1.0, h: 0.55, fontFace: "Consolas", fontSize: 14, color: C.INK, valign: "middle" });
    });
    s.addText("각 폴더 = 독립 업무 공간", { x: fx + 0.3, y: fy + 3.1, w: fw - 0.6, h: 0.3, fontFace: FONT, fontSize: 12, color: C.STEEL, valign: "top", align: "center" });
    addKeyBar(s, "원칙", "업무별 폴더 = 한 업무의 모든 자료·결과물·스크립트가 한 곳에");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "유용한 도구들", "gigang-init 이 설치하는 7가지 도구");
    const tools = [
      { name: "git", desc: "버전관리 — 파일 변경 이력 추적" },
      { name: "GitHub", desc: "오픈소스 허브 — gigang-skills 여기서 받음" },
      { name: "npm", desc: "Claude Code 플러그인 설치 도구" },
      { name: "bun", desc: "npm과 유사 — gstack과 함께 필요" },
      { name: "uv", desc: "Python 가상환경 관리 도구" },
      { name: "PowerShell 7", desc: "터미널 최신 버전 — 내장 PS보다 강력" },
      { name: "rtk", desc: "긴 출력 축약 — 토큰 절약 도구" },
    ];
    const tw = (CONTENT_W - 0.4) / 4;
    const th = 1.2;
    tools.forEach((t, i) => {
      const tx = L.marginX + (i % 4) * (tw + 0.12);
      const ty = L.contentY + 0.2 + Math.floor(i / 4) * (th + 0.2);
      s.addShape("roundRect", { x: tx, y: ty, w: tw, h: th, rectRadius: 0.08, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("rect", { x: tx, y: ty, w: 0.08, h: th, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(t.name, { x: tx + 0.2, y: ty + 0.1, w: tw - 0.3, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: C.BLUE, valign: "top" });
      s.addText(t.desc, { x: tx + 0.2, y: ty + 0.55, w: tw - 0.3, h: 0.55, fontFace: FONT, fontSize: 12, color: C.INK, valign: "top" });
    });
    addKeyBar(s, "사용 빈도", "git·npm·uv — 주 1회 이상 | bun·rtk — 자동 실행 | PowerShell 7 — 매일");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "설정 — 매번 치기 귀찮은 것들", "cc 단축어 · 시작 경로 · 기본 모델 · CLAUDE.md");
    addSimpleTable(s,
      ["설정 항목", "내용", "효과"],
      [
        [[{ text: "cc 단축어", bold: true }], "claude --dangerously-skip-permissions → cc", "타이핑 70% 감소"],
        [[{ text: "시작 경로", bold: true }], "터미널 열면 자동으로 C:\\WORK", "폴더 이동 불필요"],
        [[{ text: "기본 모델", bold: true }], "Sonnet 으로 고정", "토큰 절약 · 빠른 응답"],
        [[{ text: "CLAUDE.md", bold: true }], "Python → uv 사용 지시 자동 추가", "매번 설명 불필요"],
        [[{ text: "프롬프트 로그", bold: true }], ".claude/logs/prompts 에 자동 기록", "업무 이력 자동 축적"],
      ],
      { y: L.contentY + 0.2, colW: [2.5, 5.5, CONTENT_W - 8.0], bodyFontSize: 13 }
    );
    addKeyBar(s, "TIP", "프롬프트 로그 경로를 Claude에게 참조시키면 이전 업무 맥락을 즉시 파악할 수 있다");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 4, TOTAL, "플러그인 — superpowers & gstack", "계획하는 도구 + 실행하는 도구");
    addCard(s, L.marginX, L.contentY + 0.2, 5.9, 3.4,
      "superpowers",
      "구체적인 계획을 세우고 명확하게 작업하기 위한 도구\n\n• /brainstorming — 막연한 목표를 사양서+계획서로\n• 사양서 → 계획서 → 실행 순서로 진행\n• docs/superpowers/specs·plans 에 결과 저장",
      { strip: C.BLUE, bodySize: 13 }
    );
    addCard(s, L.marginX + 6.2, L.contentY + 0.2, 6.6, 3.4,
      "gstack",
      "고수가 만든 실무 스킬 모음\n\n• /office-hours — 방향 안 잡힌 일 구상할 때\n• /browse — 인터넷 검색 (백그라운드 작동)\n• /codex — 다른 모델로 한 번 더 리뷰 (개발자용)",
      { strip: C.SKY, bodySize: 13 }
    );
    addKeyBar(s, "사용 흐름", "막연한 목표 → /office-hours → /brainstorming → 실행  |  모르는 것 → /browse");
  }
}

// ============================================================================
// CH 04 — 기본 명령어 (3 slides)
// ============================================================================
function build_04_commands(pres, ch) {
  const TOTAL = 3;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "터미널 명령어", "어려운 게 아니다, 익숙치 않은 거다");
    addSimpleTable(s,
      ["명령어", "의미", "예시"],
      [
        [[{ text: "cd", bold: true, color: C.BLUE }], "폴더 이동 (더블클릭과 같음)", "cd 프로젝트명 / cd .. (이전으로)"],
        [[{ text: "mkdir", bold: true, color: C.BLUE }], "새 폴더 만들기", "mkdir 새폴더명"],
        [[{ text: "dir", bold: true, color: C.BLUE }], "파일 목록 확인", "dir"],
        [[{ text: "Ctrl+C", bold: true, color: C.BLUE }], "취소 / 중단", "실행 중인 작업 강제 종료"],
        [[{ text: "Tab / →", bold: true, color: C.BLUE }], "자동완성", "앞글자 치고 Tab → 파일명 완성"],
      ],
      { y: L.contentY + 0.2, colW: [2.2, 4.2, CONTENT_W - 6.4], bodyFontSize: 13 }
    );
    addKeyBar(s, "TIP", "폴더 이름 다 치지 말고 앞 2~3글자 치고 Tab — 자동완성이 된다");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "Claude Code 명령어", "/ 로 시작하는 명령어 — 6개만 외우면 충분");
    addSimpleTable(s,
      ["명령어", "용도", "언제 쓰나"],
      [
        [[{ text: "/resume", bold: true, color: C.BLUE }], "지난 세션 열기", "어제 하던 작업 이어서 할 때"],
        [[{ text: "/context", bold: true, color: C.BLUE }], "컨텍스트 윈도우 확인", "얼마나 썼는지 볼 때"],
        [[{ text: "/compact", bold: true, color: C.BLUE }], "대화 메시지 압축", "대화가 길어져서 정리할 때"],
        [[{ text: "/clear", bold: true, color: C.BLUE }], "컨텍스트 초기화", "완전히 새로 시작할 때"],
        [[{ text: "/model", bold: true, color: C.BLUE }], "모델 변경", "Sonnet ↔ Opus 전환할 때"],
        [[{ text: "/usage", bold: true, color: C.BLUE }], "사용량 확인", "토큰 얼마나 썼는지 볼 때"],
      ],
      { y: L.contentY + 0.2, colW: [2.2, 3.5, CONTENT_W - 5.7], bodyFontSize: 13 }
    );
    addKeyBar(s, "가장 자주 쓰는 것", "/context 와 /usage — 꽉 차기 전에 /compact 또는 /clear");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "자주 쓰는 흐름", "상황별 명령어 조합");
    const flows = [
      { title: "작업 시작할 때", code: "cd C:\\WORK\\내업무폴더\ncc\n/resume" },
      { title: "대화가 너무 길어졌을 때", code: "/compact    # 압축 후 계속\n/clear      # 완전히 새로 시작" },
      { title: "복잡한 작업 전후", code: "/model      # opus 선택\n(작업 완료)\n/model      # sonnet 으로 복귀" },
    ];
    const fw = (CONTENT_W - 0.4) / 3;
    flows.forEach((f, i) => {
      const fx = L.marginX + i * (fw + 0.2);
      const fy = L.contentY + 0.2;
      s.addShape("roundRect", { x: fx, y: fy, w: fw, h: 3.5, rectRadius: 0.08, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("rect", { x: fx, y: fy, w: 0.1, h: 3.5, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(f.title, { x: fx + 0.2, y: fy + 0.15, w: fw - 0.3, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.NAVY, valign: "top" });
      s.addShape("roundRect", { x: fx + 0.15, y: fy + 0.75, w: fw - 0.3, h: 2.5, rectRadius: 0.05, fill: { color: "181715" }, line: { color: "252320", width: 1 } });
      s.addText(f.code, { x: fx + 0.3, y: fy + 0.9, w: fw - 0.55, h: 2.2, fontFace: "Consolas", fontSize: 12, color: "F4E0BC", valign: "top" });
    });
    addKeyBar(s, "참고", "이 명령어들은 외울 필요 없다 — 막히면 Claude에게 '어떤 명령어 써야 해?' 라고 물어봐라");
  }
}

// ============================================================================
// CH 05 — 토큰 & 파일관리 (4 slides)
// ============================================================================
function build_05_token(pres, ch) {
  const TOTAL = 4;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "토큰과 컨텍스트 윈도우", "200 MAX 를 팀이 함께 쓴다면 꼭 알아야 할 개념");
    addCard(s, L.marginX, L.contentY + 0.2, 6.0, 3.3,
      "토큰 (Token)",
      "AI 가 글자를 처리하는 단위\n• 한국어 1글자 ≈ 1~2 토큰\n• 영어 단어 1개 ≈ 1 토큰\n• 한 달 사용 한도가 있음\n• 파일을 많이 읽힐수록 빠르게 소진",
      { bodySize: 13 }
    );
    addCard(s, L.marginX + 6.3, L.contentY + 0.2, 6.4, 3.3,
      "컨텍스트 윈도우",
      "AI 가 한 번에 기억할 수 있는 대화 분량\n• 단기 기억: 현재 대화 내용\n• 길어지면 앞부분이 밀려나간다\n• /context 로 현황 확인\n• /compact 로 압축해서 공간 확보",
      { bodySize: 13 }
    );
    addKeyBar(s, "장기 기억 vs 단기 기억", "CLAUDE.md · 파일 = 장기 기억(매번 로드) | 대화 내용 = 단기 기억(압축 필요)");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "모델별 가이드", "Opus · Sonnet · Haiku — 용도에 맞게 쓰자");
    addSimpleTable(s,
      ["모델", "특징", "토큰 소모", "언제 쓰나"],
      [
        [[{ text: "Opus", bold: true, color: C.BLUE }], "가장 강력한 성능", "많음 (5×)", "복잡한 설계·분석·전략 수립"],
        [[{ text: "Sonnet", bold: true, color: C.TEAL }], "균형잡힌 성능·속도", "보통 (1×)", [{ text: "대부분의 일상 업무 (기본값)", bold: true }]],
        [[{ text: "Haiku", bold: true, color: C.STEEL }], "빠르고 저렴", "적음 (0.2×)", "정리·요약·단순 변환"],
      ],
      { y: L.contentY + 0.3, colW: [1.8, 3.5, 2.2, CONTENT_W - 7.5], bodyFontSize: 13 }
    );
    addBullets(s, [
      { runs: [{ text: "기본값은 Sonnet — 99% 의 일상 업무는 Sonnet 으로 충분" }] },
      { runs: [{ text: "복잡한 작업에서 막히면 그때 " }, { text: "/model opus", bold: true, color: C.BLUE }, { text: " 로 전환" }] },
    ], { y: L.contentY + 2.7, fontSize: 13, lineGap: cm(0.8) });
    addKeyBar(s, "RULE", "Sonnet 으로 시작 — 막혀야 Opus. 처음부터 Opus 는 낭비");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "지식관리 핵심 파일", "AI 가 매번 같은 실수를 반복하지 않게 하는 방법");
    addSimpleTable(s,
      ["파일·폴더", "역할", "주의사항"],
      [
        [[{ text: "CLAUDE.md", bold: true, color: C.BLUE }], "명령할 때마다 포함되는 영구 지시서", "너무 길면 토큰 소모 증가"],
        [[{ text: "TODO.md", bold: true, color: C.BLUE }], "다음에 할 일을 적어놓는 곳", "—"],
        [[{ text: "docs/", bold: true, color: C.BLUE }], "참조 문서 보관소 — 필요할 때 참고시킴", "뭐가 있는지 직접 알고 있어야 함"],
        [[{ text: "docs/manual/", bold: true }], "제품 매뉴얼 모아두는 곳", "—"],
        [[{ text: "docs/report/", bold: true }], "기존 보고서 모아두는 곳", "—"],
      ],
      { y: L.contentY + 0.2, colW: [2.5, 5.0, CONTENT_W - 7.5], bodyFontSize: 13 }
    );
    addKeyBar(s, "중요", "docs 폴더에 뭐가 들었는지는 직접 알고 있어야 함 — AI에게 '뭐가 있어?' 물어보는 것도 방법");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 4, TOTAL, "프로젝트 폴더 구조", "한 번 정해두면 AI와 함께 일이 훨씬 빨라진다");
    const folders = [
      { name: "docs/", color: C.BLUE, desc: "참조 문서, 매뉴얼, 기존 보고서 등\nAI에게 참고시킬 자료 보관소" },
      { name: "script/", color: C.SKY, desc: "단발성 코드들\nClaude가 주로 작성" },
      { name: "output/", color: C.TEAL, desc: "결과물이 나오는 곳\n보고서, 프로그램, HTML 등" },
      { name: "test/", color: C.AMBER, desc: "테스트용 자료\n결과물은 output으로 이동" },
    ];
    const fw = (CONTENT_W - 0.6) / 4;
    folders.forEach((f, i) => {
      const fx = L.marginX + i * (fw + 0.2);
      const fy = L.contentY + 0.3;
      s.addShape("roundRect", { x: fx, y: fy, w: fw, h: 3.2, rectRadius: 0.1, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("rect", { x: fx, y: fy, w: fw, h: 0.55, fill: { color: f.color }, line: { color: f.color } });
      s.addText(f.name, { x: fx + 0.15, y: fy, w: fw - 0.3, h: 0.55, fontFace: "Consolas", fontSize: 16, bold: true, color: C.WHITE, valign: "middle" });
      s.addText(f.desc, { x: fx + 0.15, y: fy + 0.7, w: fw - 0.3, h: 2.3, fontFace: FONT, fontSize: 13, color: C.INK, valign: "top" });
    });
    addKeyBar(s, "구조 원칙", "폴더 구조가 명확하면 AI가 어디에 뭘 만들지 스스로 판단 — 지시 횟수가 줄어든다");
  }
}

// ============================================================================
// CH 06 — 직접 써보자 (4 slides)
// ============================================================================
function build_06_practice(pres, ch) {
  const TOTAL = 4;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "기본 흐름 — 4단계", "자기가 하고 싶은 일을 해보자 — 너무 어려운 건 나중에");
    const steps = [
      { num: "1", title: "폴더 만들기", desc: "mkdir C:\\WORK\\내업무명\ncd C:\\WORK\\내업무명" },
      { num: "2", title: "자료 넣기", desc: "관련 파일 모두 폴더에\n엑셀·PDF·Word 뭐든 OK" },
      { num: "3", title: "폴더 정리", desc: "/gigang-folder-guide\n나는 ~~ 일을 하려고 함" },
      { num: "4", title: "가볍게 시작", desc: "각 자료 어디 있는지 알려줘\n파일들 요약해줘" },
    ];
    const sw = (CONTENT_W - 0.6) / 4;
    steps.forEach((st, i) => {
      const sx = L.marginX + i * (sw + 0.2);
      const sy = L.contentY + 0.3;
      s.addShape("roundRect", { x: sx, y: sy, w: sw, h: 3.2, rectRadius: 0.1, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("roundRect", { x: sx + (sw - 0.6) / 2, y: sy + 0.15, w: 0.6, h: 0.6, rectRadius: 0.3, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(st.num, { x: sx + (sw - 0.6) / 2, y: sy + 0.15, w: 0.6, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: C.WHITE, valign: "middle", align: "center" });
      s.addText(st.title, { x: sx + 0.15, y: sy + 0.9, w: sw - 0.3, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: C.NAVY, valign: "top", align: "center" });
      s.addShape("roundRect", { x: sx + 0.1, y: sy + 1.5, w: sw - 0.2, h: 1.5, rectRadius: 0.05, fill: { color: "181715" }, line: { color: "252320", width: 1 } });
      s.addText(st.desc, { x: sx + 0.2, y: sy + 1.6, w: sw - 0.4, h: 1.3, fontFace: "Consolas", fontSize: 11, color: "F4E0BC", valign: "top" });
    });
    addKeyBar(s, "시작하는 법", "일단 폴더 만들고 파일 넣어라 — 그다음은 Claude 가 알아서");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "목표가 막연할 때", "방향을 잡아주는 /office-hours & /brainstorming");
    addCard(s, L.marginX, L.contentY + 0.2, 6.0, 3.4,
      "/office-hours",
      "방향이 안 잡힌 일을 구상할 때\n\n• 구조화된 대화로 방향을 잡아줌\n• \"신제품 자료 만들어\" 같이 막연한 목표\n  (누구를 위해? 왜? 무슨 내용?)\n• 사용 예: /office-hours",
      { strip: C.SKY, bodySize: 13 }
    );
    addCard(s, L.marginX + 6.3, L.contentY + 0.2, 6.4, 3.4,
      "/brainstorming",
      "목표는 정확한데 방법을 모를 때\n\n• 사양서(Spec) + 계획서(Plan) 생성\n• 서브에이전트가 계획을 실행\n• 결과물 저장 경로:\n  docs/superpowers/specs/\n  docs/superpowers/plans/",
      { strip: C.BLUE, bodySize: 13 }
    );
    addKeyBar(s, "흐름", "막연한 목표 → /office-hours 로 방향 → /brainstorming 으로 계획서 → 실행");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "반복 작업 자동화 — dev-loop 패턴", "스킬을 만들어 반복 작업을 명령어 하나로");
    s.addText("스킬 제작 프롬프트 패턴 (실무에서 쓰는 방식)", {
      x: L.marginX, y: L.contentY + 0.1, w: CONTENT_W, h: 0.35,
      fontFace: FONT, fontSize: 13, color: C.STEEL, valign: "top",
    });
    addCode(s,
      "개발할 때 쓰는 스킬 만들거야.\n- 내가 테스트해야 할 최소 항목만 마지막에 알려줘 (중간에 멈추지 마)\n- 끝날 때 지식·함정 문서화하고, 스킬 문서 자체도 개선해\n- 토큰 아껴 — 작업 난이도에 맞는 서브에이전트 모델 사용\n- 작업 전 필요한 기능은 인터넷에서 먼저 검색해\n- 코드 품질 / 보안 / UX 관점으로 검토해\n이름은 dev-loop 로 해줘",
      { y: L.contentY + 0.55, h: 2.5, fontSize: 11.5 }
    );
    s.addText("사용 예: /dev-loop tcp가 안 붙는다. 192.168.250.1에 PLC 연결해놨으니 고쳐줘", {
      x: L.marginX, y: L.contentY + 3.2, w: CONTENT_W, h: 0.35,
      fontFace: FONT, fontSize: 13, bold: true, color: C.BLUE, valign: "top",
    });
    addKeyBar(s, "핵심 원칙", "끝나면 한 번에 알려줘 | 스킬 자체도 계속 개선 | 토큰 아껴");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 4, TOTAL, "지금 바로 해보기", "오늘 교육이 끝나면 바로 시작하는 체크리스트");
    const items = [
      "C:\\WORK\\{내업무} 폴더 만들기",
      "관련 파일 모두 폴더에 넣기",
      "cc 로 Claude Code 열기",
      "/gigang-folder-guide 로 폴더 정리",
      "\"파일 목록 요약해줘\" 시켜보기",
      "내가 원하는 업무 하나 직접 시켜보기",
    ];
    const cy0 = L.contentY + 0.2;
    items.forEach((item, i) => {
      const iy = cy0 + i * 0.75;
      s.addShape("roundRect", { x: L.marginX, y: iy, w: CONTENT_W, h: 0.62, rectRadius: 0.06, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("roundRect", { x: L.marginX + 0.15, y: iy + 0.1, w: 0.42, h: 0.42, rectRadius: 0.06, fill: { color: C.WHITE }, line: { color: C.PALE, width: 1.5 } });
      s.addText(item, { x: L.marginX + 0.75, y: iy + 0.09, w: CONTENT_W - 0.9, h: 0.44, fontFace: FONT, fontSize: 14, color: C.INK, valign: "middle" });
    });
    addKeyBar(s, "막히면", "/gigang-help 로 스킬 목록 확인 | 기강 단톡방에 물어보기");
  }
}

// ============================================================================
// CH 07 — 기강 활동 & 스킬 (5 slides, /4brain-log 제외)
// ============================================================================
function build_07_gigang(pres, ch) {
  const TOTAL = 5;

  // S1 — 기강 이란
  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "기강 이란?", "Agentic AI 스터디 모임");
    addBullets(s, [
      { runs: [{ text: "Agentic AI " }, { text: "스터디 모임", bold: true }] },
      { runs: [{ text: "각자 업무에 AI 를 활용 → " }, { text: "배운 것을 공유", bold: true }] },
      { runs: [{ text: "목표: 혼자서 " }, { text: "4명 분량의 일", bold: true }, { text: "을 처리하는 생산성" }] },
      { runs: [{ text: "공유 스킬로 " }, { text: "팀 전체가 같은 환경", bold: true }, { text: "에서 일한다" }] },
    ], { y: L.contentY + 0.3, fontSize: 14.5, lineGap: cm(1.0), w: 7.0 });

    addStat(s, 8.0, L.contentY + 0.3, 2.3, 1.7, "4×", "한 사람 분량 → 4명 분량");
    addStat(s, 10.6, L.contentY + 0.3, 2.3, 1.7, "0", "필요한 코딩 경험");
    addStat(s, 8.0, L.contentY + 2.2, 2.3, 1.7, "1×", "주 1회 모임 권장");
    addStat(s, 10.6, L.contentY + 2.2, 2.3, 1.7, "즉시", "배운 스킬 공유");

    addKeyBar(s, "운영", "모임 운영 방식·정기 미팅 일정은 모임장이 별도 안내");
  }

  // S2 — 기강 스킬 묶음
  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "기강 스킬 묶음", "install.ps1 한 번으로 모두에게 동일 환경");
    addBullets(s, [
      { runs: [{ text: "install.ps1 실행 시 " }, { text: "자동 등록되는 Claude Code 커스텀 명령어 모음", bold: true }] },
      { runs: [{ text: "모임 전체가 공유 → 누군가 만든 스킬을 모두가 바로 사용" }] },
    ], { y: L.contentY + 0.2, fontSize: 13.5, lineGap: cm(0.85), h: 1.4 });

    const y0 = L.contentY + 1.6;
    const skills = [
      { c: "/gigang-folder-guide", t: "폴더 가이드", d: "새 프로젝트 구조" },
      { c: "/gigang-report", t: "이슈 제출", d: "버그·개선 → GitHub" },
      { c: "/gigang-help", t: "도움말", d: "전체 스킬 목록" },
      { c: "gigang-뭐했더라", t: "과거 조회", d: "어제 뭐했더라" },
    ];
    skills.forEach((sk, i) => {
      const x = L.marginX + (i % 4) * 3.05;
      const y = y0;
      s.addShape("roundRect", { x, y, w: 2.9, h: 2.0, rectRadius: 0.1, fill: { color: C.BG_CARD }, line: { color: C.PALE, width: 1 } });
      s.addShape("rect", { x, y, w: 0.1, h: 2.0, fill: { color: C.BLUE }, line: { color: C.BLUE } });
      s.addText(sk.c, { x: x + 0.2, y: y + 0.15, w: 2.6, h: 0.5, fontFace: FONT, fontSize: 13, bold: true, color: C.BLUE });
      s.addText(sk.t, { x: x + 0.2, y: y + 0.7, w: 2.6, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: C.NAVY });
      s.addText(sk.d, { x: x + 0.2, y: y + 1.25, w: 2.6, h: 0.6, fontFace: FONT, fontSize: 12, color: C.STEEL });
    });

    addKeyBar(s, "기여", "새 스킬은 PR 통해 추가 — github.com/Gigang-ST/gigang-skills");
  }

  // S3 — /gigang-folder-guide
  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "/gigang-folder-guide — 폴더 가이드", "새 프로젝트 시작의 필수 1단계");
    addBullets(s, [
      { runs: [{ text: "새 프로젝트 시작 시 " }, { text: "폴더 구조 + CLAUDE.md 초안 자동 생성", bold: true }] },
      { runs: [{ text: "한 줄 설명만 주면 알맞은 " }, { text: "docs / refs / data / output", bold: true }, { text: " 구성" }] },
      { runs: [{ text: "이미 있는 폴더에 실행하면 → " }, { text: "재구성 안", bold: true }, { text: "을 제안" }] },
    ], { y: L.contentY + 0.3, fontSize: 14, lineGap: cm(1.0) });
    addCode(s, `/gigang-folder-guide`, { y: L.contentY + 3.2, h: 0.7 });
    addKeyBar(s, "습관", "새 프로젝트 첫 시작에 무조건 호출");
  }

  // S4 — /gigang-report
  {
    const s = pres.addSlide();
    chrome(s, ch, 4, TOTAL, "/gigang-report — 문제·개선 GitHub Issue 제출", "스킬 오동작 · 개선 아이디어 → GitHub 로");
    addBullets(s, [
      { runs: [{ text: "스킬·커맨드가 " }, { text: "오동작하거나 에러", bold: true }, { text: "가 났을 때 바로 이슈 제출" }] },
      { runs: [{ text: "버그 · 개선 제안 · 기능 요청 · 기타 4종류 선택 후 자동으로 이슈 작성" }] },
      { runs: [{ text: "gh CLI 로 " }, { text: "Gigang-ST/gigang-skills", bold: true, color: C.BLUE }, { text: " 에 직접 올라감" }] },
      { runs: [{ text: "\"리포트 올려줘\" · \"버그 보고해줘\" · \"이슈 올려줘\" 등으로도 발동" }] },
    ], { y: L.contentY + 0.3, fontSize: 13.5, lineGap: cm(0.95) });
    addCode(s, `/gigang-report`, { y: L.contentY + 3.3, h: 0.7 });
    addKeyBar(s, "목적", "팀 전체가 쓰는 스킬 — 발견한 문제는 즉시 공유해야 모두가 혜택");
  }

  // S5 — /gigang-help
  {
    const s = pres.addSlide();
    chrome(s, ch, 5, TOTAL, "모르면 /gigang-help", "전체 스킬 목록 + 예시");
    addBullets(s, [
      { runs: [{ text: "모든 기강 스킬 목록 + 사용 예시 출력" }] },
      { runs: [{ text: "새 스킬이 추가되면 " }, { text: "여기 자동 노출", bold: true }] },
      { runs: [{ text: '"이런 거 없나?" 싶을 때 ' }, { text: "가장 먼저 시도", bold: true }, { text: "할 명령" }] },
    ], { y: L.contentY + 0.3, fontSize: 14.5, lineGap: cm(1.0) });
    addCode(s, `/gigang-help`, { y: L.contentY + 3.2, h: 0.7 });
    addKeyBar(s, "신규 가입자에게", "첫 명령으로 권장 — 전체 그림 한눈에");
  }
}

// ============================================================================
// APPENDIX
// ============================================================================
function build_appendix(pres, ch) {
  const TOTAL = 8;

  {
    const s = pres.addSlide();
    chrome(s, ch, 1, TOTAL, "부록 1. Git — pull · push · commit", "변경 이력 관리의 기본기");
    addBullets(s, [
      { runs: [{ text: "Git", bold: true, color: C.BLUE }, { text: " = 파일 변경 이력을 기록·관리하는 도구 (Word \"변경 내용 추적\" 의 강력 버전)" }] },
      { runs: [{ text: "모든 변경에 " }, { text: "스냅샷", bold: true }, { text: "을 찍어두고 언제든 과거로 복귀" }] },
      { runs: [{ text: 'Claude 에게 "버전 관리 해줘" 라고 부탁하면 ' }, { text: "알아서 commit", bold: true }] },
    ], { y: L.contentY + 0.2, fontSize: 13, lineGap: cm(0.9), h: 1.7 });
    addSimpleTable(s,
      ["용어", "한 줄"],
      [
        [[{ text: "commit", bold: true, color: C.BLUE }], "현재 상태를 스냅샷으로 저장"],
        [[{ text: "pull", bold: true, color: C.BLUE }], "원격에서 최신 변경 받아오기"],
        [[{ text: "push", bold: true, color: C.BLUE }], "내 변경을 원격에 올리기"],
      ],
      { y: L.contentY + 2.1, colW: [2.5, CONTENT_W - 2.5], bodyFontSize: 12.5 }
    );
    addKeyBar(s, "주의", "PPT · 엑셀 \"내용\" 변경은 못 봄 — 파일 변경 자체는 추적");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 2, TOTAL, "부록 2. GitHub — 원격 저장소", "Git 저장소를 클라우드에 두고 팀 공유");
    addSimpleTable(s,
      ["용어", "의미"],
      [
        [[{ text: "Repository (repo)", bold: true, color: C.BLUE }], "프로젝트 = 폴더 + 변경 이력"],
        [[{ text: "Clone", bold: true, color: C.BLUE }], "원격 저장소를 내 PC 로 복사"],
        [[{ text: "Push", bold: true, color: C.BLUE }], "내 변경을 원격에 올림"],
        [[{ text: "Pull", bold: true, color: C.BLUE }], "원격 최신 변경을 받아옴"],
        [[{ text: "PR (Pull Request)", bold: true, color: C.BLUE }], '"내 변경을 본 가지에 합쳐주세요" 요청'],
      ],
      { y: L.contentY + 0.3, colW: [3.2, CONTENT_W - 3.2], bodyFontSize: 13 }
    );
    addKeyBar(s, "본 교육 적용", "gigang-skills 자체가 Gigang-ST/gigang-skills repo");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 3, TOTAL, "부록 3. 유용한 MCP — Notion · Mail · KakaoTalk", "필요한 도구만 골라 붙이기");
    addSimpleTable(s,
      ["MCP", "누구에게 유용"],
      [
        [[{ text: "Notion", bold: true, color: C.BLUE }], "노션을 업무 노트로 쓰는 사람"],
        [[{ text: "Gmail / Outlook", bold: true, color: C.BLUE }], "메일 업무가 많은 사람"],
        [[{ text: "KakaoTalk", bold: true, color: C.BLUE }], "고객 소통이 카톡에 몰리는 사람"],
        [[{ text: "Playwright", bold: true, color: C.BLUE }], "웹 자동화가 필요한 사람"],
      ],
      { y: L.contentY + 0.2, colW: [3.5, CONTENT_W - 3.5], bodyFontSize: 12.5 }
    );
    addCallout(s, L.marginX, L.contentY + 2.6, CONTENT_W, 1.4, "", { bg: "FFF7E6", border: C.AMBER });
    s.addText("⚠  너무 많이 깔면 컨텍스트가 MCP 정의로 가득 차 토큰 부족.\n안 쓰는 MCP 는 과감히 제거. MCP 4~5 개 이상이면 토큰 누수 시작.", {
      x: L.marginX + 0.3, y: L.contentY + 2.75, w: CONTENT_W - 0.6, h: 1.2,
      fontFace: FONT, fontSize: 13, color: C.INK, valign: "top",
    });
    addKeyBar(s, "운영", "각 MCP 가 모든 기능을 제공하진 않음 — 설치 후 유용한지 직접 판단");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 4, TOTAL, "부록 4. CLAUDE.md — 똑똑한 Claude 의 핵심", "프로젝트별 \"신입 매뉴얼\"");
    addBullets(s, [
      { runs: [{ text: "CLAUDE.md", bold: true, color: C.BLUE }, { text: " = Claude 가 매번 자동으로 읽는 업무 지침서" }] },
      { runs: [{ text: "너무 길어지면 오히려 토큰 낭비 → " }, { text: "간결하게", bold: true }] },
      { runs: [{ text: "참고할 자료가 있으면 " }, { text: "경로만 적어둠", bold: true }, { text: " — 필요할 때 Claude 가 읽음" }] },
    ], { y: L.contentY + 0.2, fontSize: 13, lineGap: cm(0.85), h: 1.7 });
    addCode(s,
`# 프로젝트 규칙

- 한국어로 답변
- 결론 먼저, 근거 나중

## 참고 자료
- 제품 매뉴얼: C:\\manuals\\통신메뉴얼.PDF
- 업무 규정: C:\\WORK\\공통\\policy.md`,
      { y: L.contentY + 2.05, h: 2.0, fontSize: 11.5 });
    addKeyBar(s, "위치", "~/.claude/CLAUDE.md (전역) · 프로젝트/CLAUDE.md (해당 프로젝트만)");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 5, TOTAL, "부록 5. KNOWLEDGE — 알게 된 것을 .md 로 남기자", "단기 기억 → 영구 기록");
    addBullets(s, [
      { runs: [{ text: "Claude 와 검색·실험으로 알게 된 지식 = " }, { text: "세션 끝나면 사라짐", bold: true, color: C.AMBER }] },
      { runs: [{ text: "대화 중간에 한 줄로 부탁:" }] },
    ], { y: L.contentY + 0.2, fontSize: 13, lineGap: cm(0.85), h: 1.2 });
    addCode(s,
`지금까지 알게 된 내용 docs/knowledge.md 에 정리해줘
회의에서 결정된 사항 docs/decisions.md 에 추가해줘`,
      { y: L.contentY + 1.6, h: 1.4, fontSize: 12.5 });
    addBullets(s, [
      { runs: [{ text: "다음 작업에서 그 파일을 다시 읽으면 → " }, { text: "기억 복구", bold: true }, { text: " + 검색 반복 안 함" }] },
      { runs: [{ text: "잘 관리된 knowledge 파일 = " }, { text: "토큰 절약 + 똑똑한 Claude", bold: true }] },
    ], { y: L.contentY + 3.15, fontSize: 13, h: 1.2 });
    addKeyBar(s, "효과", "1주일만 습관 들이면 docs/ 가 본인 전용 위키처럼 쌓인다");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 6, TOTAL, "부록 6-1. 작업 시작은 항상 WORK 폴더 안에서", "기본 시작 지점 C:\\WORK");
    addBullets(s, [
      { runs: [{ text: "기본 시작 지점은 " }, { text: "C:\\WORK", bold: true, color: C.BLUE }] },
      { runs: [{ text: "작업할 프로젝트로 " }, { text: "cd 들어간 다음", bold: true }, { text: " Claude 실행" }] },
      { runs: [{ text: "기본 경로 (사용자 홈) 에서 Claude 시작하면 → " }, { text: "멍청하고 토큰만 많이 먹는", bold: true, color: C.AMBER }, { text: " Claude 등장" }] },
    ], { y: L.contentY + 0.3, fontSize: 14, lineGap: cm(1.0) });
    addCode(s, `cd C:\\WORK\\월간보고서\ncc`, { y: L.contentY + 3.0, h: 1.1 });
    addKeyBar(s, "RULE", "Claude 를 시작하는 위치가 곧 그 세션의 시야 — 좁고 명확하게");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 7, TOTAL, "부록 6-2. 흔히 쓰는 폴더명", "/gigang-folder-guide 가 알아서 만들어 준다");
    addSimpleTable(s,
      ["폴더명", "역할", "예시"],
      [
        [[{ text: "docs/", bold: true, color: C.BLUE }], "문서 · 설명자료", "매뉴얼, 회의록"],
        [[{ text: "refs/", bold: true, color: C.BLUE }], "외부 참고자료", "경쟁사 자료, 시장 데이터"],
        [[{ text: "output/", bold: true, color: C.BLUE }], "결과물", "완성된 보고서"],
        [[{ text: "data/", bold: true, color: C.BLUE }], "원본 데이터", "xlsx, csv"],
        [[{ text: "plans/", bold: true, color: C.BLUE }], "계획서", "프로젝트 일정"],
        [[{ text: "templates/", bold: true, color: C.BLUE }], "양식 · 템플릿", "보고서 · 메일 템플릿"],
      ],
      { y: L.contentY + 0.3, colW: [2.5, 4.0, CONTENT_W - 6.5], bodyFontSize: 12.5 }
    );
    addKeyBar(s, "실전", "실제로는 /gigang-folder-guide 호출로 자동 구성");
  }

  {
    const s = pres.addSlide();
    chrome(s, ch, 8, TOTAL, "부록 6-3. 파일 이름 관리 — 이렇게는 하지 말자", "파일명-누더기 안티패턴");
    addCallout(s, L.marginX, L.contentY + 0.3, CONTENT_W, 1.6, "", { bg: "FFF7E6", border: C.AMBER });
    s.addText("5.11 업무자료.xlsx\n5.11 업무자료-수식추가.xlsx\n5.11 업무자료-수식추가-서식변경.xlsx", {
      x: L.marginX + 0.3, y: L.contentY + 0.45, w: CONTENT_W - 0.6, h: 1.3,
      fontFace: "Consolas", fontSize: 14, color: C.AMBER, valign: "top",
    });
    addBullets(s, [
      { runs: [{ text: "며칠만 지나면 " }, { text: "무엇이 최종인지 본인도 못 알아봄", bold: true }] },
      { runs: [{ text: "권장: " }, { text: "Git 으로 버전 관리 + 파일은 하나로 유지", bold: true }] },
      { runs: [{ text: "또는 " }, { text: "명확한 의미", bold: true }, { text: '가 담긴 이름 ("5.11-제안서-고객전달본.xlsx")' }] },
    ], { y: L.contentY + 2.15, fontSize: 13.5, lineGap: cm(0.9) });
    addKeyBar(s, "ROOT CAUSE", "파일 폭증 = 컨텍스트 폭증 → AI 품질 저하의 1순위 원인");
  }
}

// ============================================================================
// CHAPTERS 정의
// ============================================================================
const CHAPTERS = {
  "01-gpt-vs-cc": {
    title: "GPT vs Claude Code",
    chapterLabel: "CH 01 — GPT VS CLAUDE CODE",
    chapterNumber: "CHAPTER 01",
    titleSubtitle: "Agentic AI 가 뭐가 다른가",
    build: build_01_gpt_vs_cc,
  },
  "02-setup": {
    title: "설치하기",
    chapterLabel: "CH 02 — SETUP",
    chapterNumber: "CHAPTER 02",
    titleSubtitle: "백문이 불여일견, 백각이 불여일행",
    build: build_02_setup,
  },
  "03-init": {
    title: "초기준비 — 무엇을 했나",
    chapterLabel: "CH 03 — INITIAL SETUP",
    chapterNumber: "CHAPTER 03",
    titleSubtitle: "gigang-skills 가 무엇을 설치했는가",
    build: build_03_init,
  },
  "04-commands": {
    title: "기본 명령어",
    chapterLabel: "CH 04 — COMMANDS",
    chapterNumber: "CHAPTER 04",
    titleSubtitle: "어려운 게 아니다, 익숙치 않은 거다",
    build: build_04_commands,
  },
  "05-token": {
    title: "토큰 & 파일관리",
    chapterLabel: "CH 05 — TOKEN & FILES",
    chapterNumber: "CHAPTER 05",
    titleSubtitle: "팀이 함께 쓴다면 꼭 알아야 할 것",
    build: build_05_token,
  },
  "06-practice": {
    title: "직접 써보자",
    chapterLabel: "CH 06 — PRACTICE",
    chapterNumber: "CHAPTER 06",
    titleSubtitle: "자기가 하고 싶은 일부터 해보자",
    build: build_06_practice,
  },
  "07-gigang": {
    title: "기강 활동 & 스킬",
    chapterLabel: "CH 07 — GIGANG",
    chapterNumber: "CHAPTER 07",
    titleSubtitle: "모임 · 공유 스킬",
    build: build_07_gigang,
  },
  "appendix": {
    title: "부록",
    chapterLabel: "APPENDIX",
    chapterNumber: "APPENDIX",
    titleSubtitle: "Git · GitHub · MCP · CLAUDE.md · 지식관리 · 폴더관리",
    build: build_appendix,
  },
};

// ============================================================================
// 빌드 실행
// ============================================================================
function newPres() {
  const p = new pptxgen();
  p.defineLayout({ name: "WIDE16x9", width: SLIDE_W, height: SLIDE_H });
  p.layout = "WIDE16x9";
  return p;
}

const OUT_DIR = path.join(__dirname, "output", "gigang-v2");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const target = process.argv[2];
const keys = target ? [target] : Object.keys(CHAPTERS);

(async () => {
  for (const key of keys) {
    const ch = CHAPTERS[key];
    if (!ch) { console.error(`Unknown chapter: ${key}`); continue; }

    const pres = newPres();
    addTitleSlide(pres, ch);
    ch.build(pres, ch);

    const outPath = path.join(OUT_DIR, `${key}.pptx`);
    await pres.writeFile({ fileName: outPath });
    console.log(`✓ ${key}.pptx`);
  }
  console.log(`\nDone → ${OUT_DIR}`);
})();
