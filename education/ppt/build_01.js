// build_01.js — 01-why.md → 01-why.pptx (기강 디자인 시스템)
const pptxgen = require("C:/Prog/4brain-skills/education/ppt/node_modules/pptxgenjs");

// ─────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────
const C = {
  indigo:     "4369E9",
  indigoDeep: "3254CC",
  indigoPale: "C7D2FE",
  coral:      "F05A28",
  white:      "FFFFFF",
  iceIndigo:  "EEF2FF",
  darkSlate:  "0F172A",
  slate800:   "1E293B",
  inkDark:    "0F172A",
  slate700:   "334155",
  slate500:   "64748B",
  slate300:   "CBD5E1",
  slate200:   "E2E8F0",
  slate100:   "F1F5F9",
  slate50:    "F8FAFC",
};
const FONT  = "Pretendard";
const SLIDE_W = 13.33;
const SLIDE_H = 7.5;

// Layout (inches)
const L = {
  headerH:    0.551,  // 1.4 cm
  titleY:     0.72,
  subtitleY:  1.32,
  dividerY:   1.27,
  contentY:   1.85,
  fillY:      6.62,
  fillH:      0.60,
  footerY:    7.22,
  footerH:    0.28,
  ml:         0.354,  // left margin
  mr:         0.354,  // right margin
};
const CW = SLIDE_W - L.ml - L.mr;  // content width 12.622"

// ─────────────────────────────
// HELPERS
// ─────────────────────────────
function header(slide, pres, chapterLabel, dark = false) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SLIDE_W, h: L.headerH,
    fill: { color: C.indigo }, line: { color: C.indigo },
  });
  slide.addText(chapterLabel, {
    x: 0.25, y: 0, w: 10, h: L.headerH,
    fontSize: 9, bold: true, color: C.white, fontFace: FONT,
    valign: "middle", align: "left", charSpacing: 1.5, margin: 0,
  });
  slide.addImage({
    path: "C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",
    x: 12.77, y: 0.075, w: 0.4, h: 0.4,
  });
}

function footer(slide, pres, docTitle, num, total) {
  slide.addShape(pres.shapes.LINE, {
    x: 0, y: L.footerY, w: SLIDE_W, h: 0,
    line: { color: C.slate200, width: 0.75 },
  });
  slide.addText(docTitle, {
    x: L.ml, y: L.footerY, w: 9, h: L.footerH,
    fontSize: 8, color: C.slate500, fontFace: FONT,
    valign: "middle", align: "left", margin: 0,
  });
  slide.addText(
    `${String(num).padStart(2,"0")} / ${String(total).padStart(2,"0")}`,
    {
      x: 11.0, y: L.footerY, w: 2.1, h: L.footerH,
      fontSize: 8, color: C.slate500, fontFace: FONT,
      align: "right", valign: "middle", margin: 0,
    }
  );
}

function bottomFill(slide, pres, msg, label = "핵심 메시지") {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: L.fillY, w: SLIDE_W, h: L.fillH,
    fill: { color: C.darkSlate }, line: { color: C.darkSlate },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: L.fillY, w: 0.07, h: L.fillH,
    fill: { color: C.indigo }, line: { color: C.indigo },
  });
  slide.addText(label, {
    x: 0.15, y: L.fillY, w: 1.5, h: L.fillH,
    fontSize: 9, bold: true, color: C.indigoPale, fontFace: FONT,
    valign: "middle", align: "left", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: 1.72, y: L.fillY + 0.1, w: 0, h: L.fillH - 0.2,
    line: { color: C.indigoPale, width: 0.75 },
  });
  slide.addText(msg, {
    x: 1.88, y: L.fillY, w: SLIDE_W - 1.88 - 0.2, h: L.fillH,
    fontSize: 10, color: C.white, fontFace: FONT,
    valign: "middle", align: "left", margin: 0,
  });
}

function titleBlock(slide, pres, title, subtitle) {
  slide.addText(title, {
    x: L.ml, y: L.titleY, w: CW, h: 0.58,
    fontSize: 34, bold: true, color: C.inkDark, fontFace: FONT,
    valign: "top", align: "left", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: L.ml, y: L.dividerY, w: CW, h: 0,
    line: { color: C.slate200, width: 0.75 },
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: L.ml, y: L.subtitleY + 0.1, w: CW, h: 0.38,
      fontSize: 15, color: C.slate500, fontFace: FONT,
      valign: "top", align: "left", margin: 0,
    });
  }
}

// ─────────────────────────────
// BUILD
// ─────────────────────────────
async function build() {
  const pres  = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title  = "왜 Agentic AI인가";
  pres.author = "Team Gigang";
  const TOTAL = 5;
  const DOC   = "Gigang Skills — Agentic AI 교육  CH 01";
  const CH    = "CH 01 — 왜 AGENTIC AI인가";

  // ── SLIDE 1: Title (TYPE A) ───────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkSlate };

    // Header
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: SLIDE_W, h: L.headerH,
      fill: { color: C.indigo }, line: { color: C.indigo },
    });
    s.addText("CHAPTER 01", {
      x: 0.25, y: 0, w: 10, h: L.headerH,
      fontSize: 9, bold: true, color: C.white, fontFace: FONT,
      valign: "middle", charSpacing: 1.5, margin: 0,
    });
    s.addImage({
      path: "C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",
      x: 12.77, y: 0.075, w: 0.4, h: 0.4,
    });

    // Ghost number
    s.addText("01", {
      x: 7.0, y: 0.5, w: 6.0, h: 5.5,
      fontSize: 220, bold: true, color: "1A2E6B",
      fontFace: FONT, align: "center", valign: "middle", margin: 0,
    });

    // Main title
    s.addText([
      { text: "왜", options: { breakLine: true } },
      { text: "Agentic", options: { breakLine: true } },
      { text: "AI인가" },
    ], {
      x: L.ml, y: 1.6, w: 7.0, h: 3.5,
      fontSize: 60, bold: true, color: C.white, fontFace: FONT,
      align: "left", valign: "middle", margin: 0,
    });

    // Subtitle line
    s.addText("ChatGPT와 무엇이 다른지, 그리고 왜 지금인지", {
      x: L.ml, y: 5.3, w: 8.5, h: 0.5,
      fontSize: 17, color: C.slate300, fontFace: FONT,
      align: "left", valign: "middle", margin: 0,
    });

    // Bottom
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: L.fillY, w: SLIDE_W, h: L.fillH,
      fill: { color: C.indigo }, line: { color: C.indigo },
    });
    s.addText("Team Gigang  ·  2026", {
      x: L.ml, y: L.fillY, w: CW, h: L.fillH,
      fontSize: 11, color: C.white, fontFace: FONT,
      valign: "middle", align: "left", margin: 0,
    });

    footer(s, pres, DOC, 1, TOTAL);
  }

  // ── SLIDE 2: ChatGPT vs Agentic AI ────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    header(s, pres, CH);
    titleBlock(s, pres, "대화 도구 vs 행동 도구", null);

    const CW2   = (CW - 0.55) / 2;   // card width ~6.04"
    const cardY = 1.95;
    const cardH = 4.40;
    const leftX = L.ml;
    const rightX = L.ml + CW2 + 0.55;

    // ── Left card (ChatGPT)
    s.addShape(pres.shapes.RECTANGLE, {
      x: leftX, y: cardY, w: CW2, h: cardH,
      fill: { color: C.slate100 }, line: { color: C.slate200, width: 0.75 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: leftX, y: cardY, w: CW2, h: 0.48,
      fill: { color: "64748B" }, line: { color: "64748B" },
    });
    s.addText("ChatGPT 브라우저", {
      x: leftX + 0.18, y: cardY, w: CW2 - 0.36, h: 0.48,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT,
      valign: "middle", margin: 0,
    });
    s.addText("대화 도구", {
      x: leftX + 0.18, y: cardY + 0.6, w: 2, h: 0.3,
      fontSize: 10, bold: true, color: "94A3B8", fontFace: FONT,
      valign: "middle", margin: 0, charSpacing: 0.5,
    });
    s.addText([
      { text: "질문하면 텍스트로 답변만 한다", options: { bullet: true, breakLine: true } },
      { text: "내가 직접 복사·붙여넣기해야 한다", options: { bullet: true, breakLine: true } },
      { text: "1문답 단위로 동작한다", options: { bullet: true, breakLine: true } },
      { text: "창을 닫으면 기억이 리셋된다", options: { bullet: true } },
    ], {
      x: leftX + 0.18, y: cardY + 1.0, w: CW2 - 0.36, h: 3.0,
      fontSize: 13.5, color: C.slate700, fontFace: FONT,
      valign: "top", paraSpaceAfter: 22,
    });

    // ── Right card (Agentic AI)
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: cardY, w: CW2, h: cardH,
      fill: { color: C.iceIndigo }, line: { color: C.indigo, width: 1.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: cardY, w: CW2, h: 0.48,
      fill: { color: C.indigo }, line: { color: C.indigo },
    });
    s.addText("Agentic AI (Claude Code)", {
      x: rightX + 0.18, y: cardY, w: CW2 - 0.36, h: 0.48,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT,
      valign: "middle", margin: 0,
    });
    s.addText("행동 도구", {
      x: rightX + 0.18, y: cardY + 0.6, w: 2, h: 0.3,
      fontSize: 10, bold: true, color: C.indigo, fontFace: FONT,
      valign: "middle", margin: 0, charSpacing: 0.5,
    });
    s.addText([
      { text: "파일을 직접 생성·수정·실행한다", options: { bullet: true, breakLine: true } },
      { text: "지시만 하면 알아서 처리해준다", options: { bullet: true, breakLine: true } },
      { text: "여러 단계를 자동으로 진행한다", options: { bullet: true, breakLine: true } },
      { text: "프로젝트 파일에 결과를 저장한다", options: { bullet: true } },
    ], {
      x: rightX + 0.18, y: cardY + 1.0, w: CW2 - 0.36, h: 3.0,
      fontSize: 13.5, color: C.slate700, fontFace: FONT,
      valign: "top", paraSpaceAfter: 22,
    });

    // ── VS badge
    const vsX = L.ml + CW2 + (0.55 - 0.38) / 2;
    s.addShape(pres.shapes.OVAL, {
      x: vsX, y: cardY + 1.85, w: 0.38, h: 0.38,
      fill: { color: C.coral }, line: { color: C.coral },
    });
    s.addText("VS", {
      x: vsX, y: cardY + 1.85, w: 0.38, h: 0.38,
      fontSize: 10, bold: true, color: C.white, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });

    bottomFill(s, pres, "Agentic AI는 '답변'이 아닌 '실행'을 합니다. 내 손발이 되어 파일을 열고, 만들고, 저장하기까지 직접 처리합니다.");
    footer(s, pres, DOC, 2, TOTAL);
  }

  // ── SLIDE 3: 실제 업무 예시 ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    header(s, pres, CH);
    titleBlock(s, pres, "실제로 어떻게 쓰는가", "사무직 업무 3가지 예시");

    const cardW  = (CW - 0.3) / 3;  // ~4.1"
    const cardY  = 1.95;
    const cardH  = 4.40;

    const cards = [
      {
        icon: "📄", color: C.indigo,
        title: "보고서 작성",
        prompt: '"지난 달 데이터 파일 읽어서\n팀별 요약표 만들고\n보고서 초안 작성해줘"',
        result: "파일 열기 → 데이터 분석\n→ 표 생성 → 문서 저장",
      },
      {
        icon: "✉️", color: "0891B2",
        title: "메일 정리",
        prompt: '"이 메일 목록에서\n긴급한 것만 골라서\n회신 초안 각각 써줘"',
        result: "메일 분류 →\n회신 초안 파일 자동 생성",
      },
      {
        icon: "🔁", color: "0D9488",
        title: "반복 작업",
        prompt: '"매주 월요일\n회의록 형식으로\n할 일 목록 정리해줘"',
        result: "한 번 설정 →\n매주 자동 실행",
      },
    ];

    cards.forEach((card, i) => {
      const x = L.ml + i * (cardW + 0.15);

      // Card frame
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.slate200, width: 0.75 },
      });
      // Top accent
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: 0.06,
        fill: { color: card.color }, line: { color: card.color },
      });

      // Icon circle
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.2, y: cardY + 0.18, w: 0.52, h: 0.52,
        fill: { color: C.iceIndigo }, line: { color: C.slate200, width: 0.5 },
      });
      s.addText(card.icon, {
        x: x + 0.2, y: cardY + 0.18, w: 0.52, h: 0.52,
        fontSize: 18, align: "center", valign: "middle", margin: 0,
      });

      // Card title
      s.addText(card.title, {
        x: x + 0.85, y: cardY + 0.2, w: cardW - 1.0, h: 0.5,
        fontSize: 15, bold: true, color: C.inkDark, fontFace: FONT,
        valign: "middle", margin: 0,
      });

      // Divider
      s.addShape(pres.shapes.LINE, {
        x: x + 0.15, y: cardY + 0.82, w: cardW - 0.3, h: 0,
        line: { color: C.slate200, width: 0.75 },
      });

      // PROMPT label
      s.addText("프롬프트", {
        x: x + 0.15, y: cardY + 0.92, w: cardW - 0.3, h: 0.28,
        fontSize: 9, bold: true, color: card.color, fontFace: FONT,
        valign: "middle", charSpacing: 0.5, margin: 0,
      });
      // Prompt code block
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.1, y: cardY + 1.25, w: cardW - 0.2, h: 1.3,
        fill: { color: C.slate50 }, line: { color: C.slate200, width: 0.5 },
      });
      s.addText(card.prompt, {
        x: x + 0.22, y: cardY + 1.32, w: cardW - 0.44, h: 1.18,
        fontSize: 10.5, color: C.slate700, fontFace: FONT,
        valign: "top", margin: 0,
      });

      // AI 결과 label
      s.addText("AI가 하는 일", {
        x: x + 0.15, y: cardY + 2.65, w: cardW - 0.3, h: 0.28,
        fontSize: 9, bold: true, color: C.coral, fontFace: FONT,
        valign: "middle", charSpacing: 0.5, margin: 0,
      });
      // Arrow
      s.addShape(pres.shapes.LINE, {
        x: x + 0.15, y: cardY + 3.05, w: cardW - 0.3, h: 0,
        line: { color: C.slate200, width: 0.5 },
      });
      s.addText(card.result, {
        x: x + 0.15, y: cardY + 3.12, w: cardW - 0.3, h: 1.0,
        fontSize: 12, color: C.slate700, fontFace: FONT,
        valign: "top", margin: 0,
      });
    });

    bottomFill(s, pres, "지시 하나로 AI가 파일을 열고 · 읽고 · 표를 만들고 · 저장하기까지 모든 단계를 스스로 처리합니다.");
    footer(s, pres, DOC, 3, TOTAL);
  }

  // ── SLIDE 4: 4배 생산성 (TYPE C) ─────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.iceIndigo };
    header(s, pres, CH);
    titleBlock(s, pres, "4배 생산성이란", "동시에 여러 작업을 AI에게 병렬로 맡긴다");

    // ── Left: Big stat
    s.addText("4x", {
      x: L.ml, y: 1.9, w: 3.8, h: 2.8,
      fontSize: 130, bold: true, color: C.indigo, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("혼자서 4명 분량의 일을\n처리하는 것이 목표", {
      x: L.ml, y: 4.8, w: 3.8, h: 0.9,
      fontSize: 13, color: C.slate700, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });

    // ── Right: Parallel table
    const tX  = 4.5;
    const tY  = 1.95;
    const col1W = 4.1;
    const col2W = 4.4;
    const rowH  = 1.05;

    // Header row
    s.addShape(pres.shapes.RECTANGLE, {
      x: tX, y: tY, w: col1W, h: rowH,
      fill: { color: C.slate700 }, line: { color: C.slate700 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: tX + col1W + 0.12, y: tY, w: col2W, h: rowH,
      fill: { color: C.indigo }, line: { color: C.indigo },
    });
    s.addText("내가 하는 일", {
      x: tX, y: tY, w: col1W, h: rowH,
      fontSize: 13, bold: true, color: C.white, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("AI에게 맡긴 일", {
      x: tX + col1W + 0.12, y: tY, w: col2W, h: rowH,
      fontSize: 13, bold: true, color: C.white, fontFace: FONT,
      align: "center", valign: "middle", margin: 0,
    });

    // Data rows
    const rows = [
      ["작업 A 검토 중…", "작업 B 진행 중"],
      ["",               "작업 C 진행 중"],
      ["",               "작업 D 진행 중"],
    ];
    rows.forEach((row, i) => {
      const ry  = tY + rowH + i * rowH;
      const bg  = i % 2 === 0 ? C.white : "F0F4FF";
      s.addShape(pres.shapes.RECTANGLE, {
        x: tX, y: ry, w: col1W, h: rowH,
        fill: { color: bg }, line: { color: C.slate200, width: 0.5 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: tX + col1W + 0.12, y: ry, w: col2W, h: rowH,
        fill: { color: bg }, line: { color: C.slate200, width: 0.5 },
      });
      if (row[0]) {
        s.addText(row[0], {
          x: tX + 0.2, y: ry, w: col1W - 0.4, h: rowH,
          fontSize: 13, color: C.slate700, fontFace: FONT,
          valign: "middle", margin: 0,
        });
      }
      // Running dot
      s.addShape(pres.shapes.OVAL, {
        x: tX + col1W + 0.24, y: ry + (rowH - 0.22) / 2, w: 0.22, h: 0.22,
        fill: { color: C.indigo }, line: { color: C.indigo },
      });
      s.addText(row[1], {
        x: tX + col1W + 0.55, y: ry, w: col2W - 0.55, h: rowH,
        fontSize: 13, color: C.slate700, fontFace: FONT,
        valign: "middle", margin: 0,
      });
    });

    bottomFill(s, pres, "내가 A를 검토하는 동안 AI는 B · C · D를 동시 진행합니다. 병렬 실행이 생산성 4배의 핵심입니다.");
    footer(s, pres, DOC, 4, TOTAL);
  }

  // ── SLIDE 5: 실습 과제 (TYPE B) ───────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    header(s, pres, CH);
    titleBlock(s, pres, "실습 과제", "지금 내 업무에서 AI에게 맡기고 싶은 것 3가지를 적어보세요");

    // Description
    s.addText("아래 칸에 직접 적어보세요.", {
      x: L.ml, y: 1.82, w: CW, h: 0.32,
      fontSize: 12, color: C.slate500, fontFace: FONT,
      valign: "top", margin: 0,
    });

    const boxY = [2.2, 3.4, 4.6];
    const labels = ["첫 번째", "두 번째", "세 번째"];

    boxY.forEach((by, i) => {
      // Number circle
      s.addShape(pres.shapes.OVAL, {
        x: L.ml, y: by + 0.13, w: 0.56, h: 0.56,
        fill: { color: C.indigo }, line: { color: C.indigo },
      });
      s.addText(String(i + 1), {
        x: L.ml, y: by + 0.13, w: 0.56, h: 0.56,
        fontSize: 18, bold: true, color: C.white, fontFace: FONT,
        align: "center", valign: "middle", margin: 0,
      });
      // Input box
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.ml + 0.72, y: by + 0.05, w: CW - 0.72, h: 0.73,
        fill: { color: C.slate50 }, line: { color: C.slate200, width: 0.75 },
      });
      s.addText(labels[i] + " 업무를 입력하세요…", {
        x: L.ml + 0.88, y: by + 0.05, w: CW - 1.0, h: 0.73,
        fontSize: 12, color: C.slate200, fontFace: FONT,
        italic: true, valign: "middle", margin: 0,
      });
    });

    // Tip box
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.ml, y: 5.85, w: CW, h: 0.48,
      fill: { color: C.iceIndigo }, line: { color: C.slate200, width: 0.5 },
    });
    s.addText("💡  다음 시간에 실제로 시도해봅니다. 지금 떠오르는 것부터 적으면 됩니다.", {
      x: L.ml + 0.2, y: 5.85, w: CW - 0.4, h: 0.48,
      fontSize: 12, color: C.slate700, fontFace: FONT,
      valign: "middle", margin: 0,
    });

    bottomFill(s, pres, "AI에게 맡길 업무를 적는 것 자체가 업무 흐름을 정리하는 첫 걸음입니다.");
    footer(s, pres, DOC, 5, TOTAL);
  }

  // ── WRITE ──────────────────────────────────────────────────────────
  const outPath = "C:/Prog/PRIVATE/gigang_skills/education/ppt/output/01-why.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("✅  " + outPath);
}

build().catch(err => { console.error(err); process.exit(1); });
