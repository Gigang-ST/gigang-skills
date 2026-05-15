// build_02.js — 02-concepts.md → 02-concepts.pptx
const pptxgen = require("C:/Prog/4brain-skills/education/ppt/node_modules/pptxgenjs");

const C = {
  indigo:"4369E9", indigoDeep:"3254CC", indigoPale:"C7D2FE", coral:"F05A28",
  white:"FFFFFF", iceIndigo:"EEF2FF", darkSlate:"0F172A", slate800:"1E293B",
  inkDark:"0F172A", slate700:"334155", slate500:"64748B", slate300:"CBD5E1",
  slate200:"E2E8F0", slate100:"F1F5F9", slate50:"F8FAFC",
};
const FONT="Pretendard", SLIDE_W=13.33, SLIDE_H=7.5;
const L={headerH:0.551,titleY:0.72,subtitleY:1.32,dividerY:1.27,contentY:1.85,fillY:6.62,fillH:0.60,footerY:7.22,footerH:0.28,ml:0.354,mr:0.354};
const CW=SLIDE_W-L.ml-L.mr;
const C2W=(CW-0.3)/2;
const C2R=L.ml+C2W+0.3;

function header(s,p,ch){
  s.addShape(p.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
  s.addText(ch,{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",align:"left",charSpacing:1.5,margin:0});
  s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
}
function footer(s,p,doc,n,tot){
  s.addShape(p.shapes.LINE,{x:0,y:L.footerY,w:SLIDE_W,h:0,line:{color:C.slate200,width:0.75}});
  s.addText(doc,{x:L.ml,y:L.footerY,w:9,h:L.footerH,fontSize:8,color:C.slate500,fontFace:FONT,valign:"middle",align:"left",margin:0});
  s.addText(`${String(n).padStart(2,"0")} / ${String(tot).padStart(2,"0")}`,{x:11.0,y:L.footerY,w:2.1,h:L.footerH,fontSize:8,color:C.slate500,fontFace:FONT,align:"right",valign:"middle",margin:0});
}
function bfill(s,p,msg,label="핵심 메시지"){
  s.addShape(p.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
  s.addShape(p.shapes.RECTANGLE,{x:0,y:L.fillY,w:0.07,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
  s.addText(label,{x:0.15,y:L.fillY,w:1.5,h:L.fillH,fontSize:9,bold:true,color:C.indigoPale,fontFace:FONT,valign:"middle",align:"left",margin:0});
  s.addShape(p.shapes.LINE,{x:1.72,y:L.fillY+0.1,w:0,h:L.fillH-0.2,line:{color:C.indigoPale,width:0.75}});
  s.addText(msg,{x:1.88,y:L.fillY,w:SLIDE_W-1.88-0.2,h:L.fillH,fontSize:10,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
}
function tb(s,p,title,sub){
  s.addText(title,{x:L.ml,y:L.titleY,w:CW,h:0.58,fontSize:34,bold:true,color:C.inkDark,fontFace:FONT,valign:"top",align:"left",margin:0});
  s.addShape(p.shapes.LINE,{x:L.ml,y:L.dividerY,w:CW,h:0,line:{color:C.slate200,width:0.75}});
  if(sub) s.addText(sub,{x:L.ml,y:L.subtitleY+0.1,w:CW,h:0.38,fontSize:15,color:C.slate500,fontFace:FONT,valign:"top",align:"left",margin:0});
}
function colHdr(s,p,x,y,w,text,color){
  s.addShape(p.shapes.RECTANGLE,{x,y,w,h:0.4,fill:{color},line:{color}});
  s.addText(text,{x:x+0.15,y,w:w-0.3,h:0.4,fontSize:13,bold:true,color:C.white,fontFace:FONT,valign:"middle",margin:0});
}

async function build(){
  const pres=new pptxgen();
  pres.layout="LAYOUT_WIDE"; pres.title="핵심 용어와 개념"; pres.author="Team Gigang";
  const TOTAL=6, DOC="Gigang Skills — Agentic AI 교육  CH 02", CH="CH 02 — 핵심 용어와 개념";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("CHAPTER 02",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("02",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:220,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"핵심 용어와",options:{breakLine:true}},{text:"개념"}],{x:L.ml,y:1.6,w:7.0,h:3.0,fontSize:56,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("LLM · 프롬프트 · 토큰 · 컨텍스트 · Agentic AI · MCP",{x:L.ml,y:4.9,w:9.0,h:0.5,fontSize:16,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("Team Gigang  ·  2026",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:11,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: LLM & ChatGPT vs Claude ────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"대화 AI의 기본 구조","LLM이 무엇인지, ChatGPT와 Claude는 어떻게 다른지");
    const cy=L.contentY;

    // Left: LLM
    colHdr(s,pres,L.ml,cy,C2W,"LLM (Large Language Model)",C.slate700);
    s.addText("비유: 세상의 모든 책을 읽은 사람",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText([
      {text:"질문하면 읽은 내용 기반으로 답한다",options:{bullet:true,breakLine:true}},
      {text:"ChatGPT, Claude 모두 LLM이다",options:{bullet:true,breakLine:true}},
      {text:"스스로 파일 조작은 못 함 → Agentic AI 필요",options:{bullet:true}},
    ],{x:L.ml+0.15,y:cy+0.82,w:C2W-0.3,h:1.6,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",paraSpaceAfter:16});
    s.addText("ChatGPT vs Claude",{x:L.ml+0.15,y:cy+2.52,w:C2W-0.3,h:0.3,fontSize:11,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addTable([
      [{text:""},{text:"ChatGPT",options:{bold:true}},{text:"Claude",options:{bold:true}}],
      [{text:"강점"},{text:"이미지·범용"},{text:"긴 문서·코드·안전성"}],
      [{text:"컨텍스트"},{text:"~32K 토큰"},{text:"~200K 토큰"}],
    ],{x:L.ml,y:cy+2.85,w:C2W,fontSize:11,fontFace:FONT,border:{pt:0.5,color:C.slate200},fill:{color:C.white},color:C.slate700,rowH:0.45});

    // Right: 기강은 Claude
    colHdr(s,pres,C2R,cy,C2W,"기강 스킬과 Claude",C.indigo);
    s.addText("기강 스킬은 Claude를 씁니다",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.3,fontSize:13,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    const reasons=[
      {t:"긴 문서 처리",d:"보고서·회의록·데이터 파일 등 200K 토큰까지 한 번에 처리"},
      {t:"코드 & 자동화",d:"파일 읽기·쓰기·실행 등 실제 작업 수행"},
      {t:"안전성",d:"Anthropic Constitutional AI 원칙 — 민감 데이터 처리에 강함"},
    ];
    reasons.forEach((r,i)=>{
      const ry=cy+0.87+i*1.15;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:ry,w:C2W,h:1.05,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(r.t,{x:C2R+0.2,y:ry+0.08,w:C2W-0.4,h:0.30,fontSize:13,bold:true,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
      s.addText(r.d,{x:C2R+0.2,y:ry+0.40,w:C2W-0.4,h:0.58,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    });

    bfill(s,pres,"ChatGPT와 Claude 모두 LLM입니다. 기강 스킬은 긴 문서 처리와 코드 자동화가 강한 Claude를 사용합니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: 프롬프트 & 토큰 ────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"AI와 소통하는 핵심 단위","프롬프트와 토큰 이해하기");
    const cy=L.contentY;

    // Left: 프롬프트
    colHdr(s,pres,L.ml,cy,C2W,"프롬프트 (Prompt)",C.indigo);
    s.addText("비유: AI에게 내리는 업무 지시서",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.1,y:cy+0.85,w:C2W-0.2,h:0.85,fill:{color:"FFF1F0"},line:{color:"FCA5A5",width:0.75}});
    s.addText("❌  나쁜 프롬프트",{x:L.ml+0.25,y:cy+0.88,w:C2W-0.5,h:0.26,fontSize:10,bold:true,color:"DC2626",fontFace:FONT,valign:"middle",margin:0});
    s.addText('"보고서 써줘"',{x:L.ml+0.25,y:cy+1.16,w:C2W-0.5,h:0.45,fontSize:13,color:"DC2626",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.1,y:cy+1.78,w:C2W-0.2,h:1.35,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  좋은 프롬프트",{x:L.ml+0.25,y:cy+1.81,w:C2W-0.5,h:0.26,fontSize:10,bold:true,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    s.addText('"3월 활동 데이터를 항목별로 비교한\n1페이지 요약 보고서. 표 포함."',{x:L.ml+0.25,y:cy+2.1,w:C2W-0.5,h:0.95,fontSize:11.5,color:"16A34A",fontFace:"Consolas",valign:"top",margin:0});
    s.addText("잘 쓸수록 결과가 좋아집니다",{x:L.ml+0.15,y:cy+3.22,w:C2W-0.3,h:0.3,fontSize:12,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});

    // Right: 토큰
    colHdr(s,pres,C2R,cy,C2W,"토큰 (Token)",C.coral);
    s.addText("비유: AI가 쓰는 화폐",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.coral,fontFace:FONT,valign:"middle",margin:0});
    s.addText([
      {text:"AI가 읽고 쓰는 텍스트 단위",options:{bullet:true,breakLine:true}},
      {text:"요금이 토큰 수에 비례한다",options:{bullet:true,breakLine:true}},
      {text:"한글 1글자 ≈ 1~2토큰",options:{bullet:true}},
    ],{x:C2R+0.15,y:cy+0.82,w:C2W-0.3,h:1.5,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",paraSpaceAfter:16});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+2.45,w:C2W,h:0.5,fill:{color:C.white},line:{color:C.slate200,width:0.5}});
    s.addText('한글: "안녕" ≈ 4토큰  |  영어: "hello" = 1토큰  |  부호·공백도 토큰',{x:C2R+0.15,y:cy+2.45,w:C2W-0.3,h:0.5,fontSize:10.5,color:C.slate500,fontFace:FONT,valign:"middle",align:"center",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+3.05,w:C2W,h:1.15,fill:{color:C.iceIndigo},line:{color:C.indigo,width:0.75}});
    s.addText("토큰이 다 떨어지면?",{x:C2R+0.2,y:cy+3.1,w:C2W-0.4,h:0.32,fontSize:13,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText("잠깐 대기 → Claude Code 재실행 → /resume 으로 이어서 계속",{x:C2R+0.2,y:cy+3.46,w:C2W-0.4,h:0.65,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});

    bfill(s,pres,"프롬프트는 구체적일수록 결과가 좋습니다. 토큰이 다 떨어지면 /resume으로 이어서 작업하세요.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: 컨텍스트 윈도우 & Agentic AI ───────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"AI의 기억과 행동 방식","컨텍스트 윈도우와 Agentic AI");
    const cy=L.contentY;

    // Left: 컨텍스트 윈도우
    colHdr(s,pres,L.ml,cy,C2W,"컨텍스트 윈도우","0891B2");
    s.addText("비유: AI의 단기 기억",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:"0891B2",fontFace:FONT,valign:"middle",margin:0});
    s.addText([
      {text:"현재 대화창에서 AI가 기억하는 최대 분량",options:{bullet:true,breakLine:true}},
      {text:"창을 닫거나 /clear 하면 리셋된다",options:{bullet:true,breakLine:true}},
      {text:"꽉 차면 → /compact 로 압축",options:{bullet:true}},
    ],{x:L.ml+0.15,y:cy+0.82,w:C2W-0.3,h:1.5,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",paraSpaceAfter:16});
    // Flow: 입력 → 처리 → 출력
    const flowY=cy+2.45;
    const fw=1.8, fh=0.9;
    [["지시문+파일\n+이전 대화",C.iceIndigo,C.slate700],["컨텍스트\n윈도우","0891B2",C.white],["AI 응답","DCFCE7","16A34A"]].forEach(([t,bg,tc],i)=>{
      const fx=L.ml+i*(fw+0.22);
      s.addShape(pres.shapes.RECTANGLE,{x:fx,y:flowY,w:fw,h:fh,fill:{color:bg},line:{color:C.slate200,width:0.5}});
      s.addText(t,{x:fx,y:flowY,w:fw,h:fh,fontSize:10.5,color:tc,fontFace:FONT,align:"center",valign:"middle",margin:0});
      if(i<2) s.addText("→",{x:fx+fw,y:flowY,w:0.22,h:fh,fontSize:14,bold:true,color:C.slate500,fontFace:FONT,align:"center",valign:"middle",margin:0});
    });
    s.addText("/compact : 대화 압축  |  /clear : 기억 초기화  |  /context : 사용량 확인",{x:L.ml,y:cy+3.55,w:C2W,h:0.5,fontSize:10.5,color:C.slate500,fontFace:FONT,valign:"middle",align:"center",margin:0});

    // Right: Agentic AI
    colHdr(s,pres,C2R,cy,C2W,"Agentic AI",C.indigo);
    s.addText("비유: 심부름꾼",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText('"카페 가서 아메리카노 사와" →\n카페 찾고 · 주문하고 · 결제하고 · 가져오기\n모든 단계를 혼자 처리',{x:C2R+0.15,y:cy+0.82,w:C2W-0.3,h:0.9,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    [["1. 계획","할 일 목록 작성"],["2. 실행","파일 읽기·쓰기·검색"],["3. 확인","결과 검토·재시도"],["4. 보고","완료 결과 전달"]].forEach(([step,desc],i)=>{
      const sy=cy+1.85+i*0.97;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:sy,w:C2W,h:0.85,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addText(step,{x:C2R+0.15,y:sy,w:1.3,h:0.85,fontSize:13,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
      s.addText(desc,{x:C2R+1.55,y:sy,w:C2W-1.7,h:0.85,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"컨텍스트 윈도우가 클수록 긴 작업이 가능합니다. Agentic AI는 계획·실행·확인·보고 4단계를 혼자 처리합니다.");
    footer(s,pres,DOC,4,TOTAL);
  }

  // ── SLIDE 5: Claude Code & MCP ──────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"팀 도구 핵심 두 가지","Claude Code와 MCP");
    const cy=L.contentY;

    // Left: Claude Code
    colHdr(s,pres,L.ml,cy,C2W,"Claude Code",C.indigo);
    s.addText("비유: 직접 손발이 되어 일하는 AI 비서",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText([
      {text:"터미널에서 돌아가는 Agentic AI 도구",options:{bullet:true,breakLine:true}},
      {text:"파일을 읽고 · 쓰고 · 실행하고 · 검색한다",options:{bullet:true,breakLine:true}},
      {text:"말로 지시하면 여러 단계를 알아서 처리",options:{bullet:true}},
    ],{x:L.ml+0.15,y:cy+0.82,w:C2W-0.3,h:1.5,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",paraSpaceAfter:16});
    // Code block
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.45,w:C2W,h:1.75,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("$ claude",{x:L.ml+0.2,y:cy+2.52,w:C2W-0.4,h:0.32,fontSize:11,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText('> 지난 달 데이터 파일 읽어서\n  팀별 요약표 만들고\n  보고서 초안 작성해줘',{x:L.ml+0.2,y:cy+2.88,w:C2W-0.4,h:1.22,fontSize:10.5,color:"86EFAC",fontFace:"Consolas",valign:"top",margin:0});

    // Right: MCP
    colHdr(s,pres,C2R,cy,C2W,"MCP (Model Context Protocol)","0D9488");
    s.addText("비유: AI용 플러그인 규격",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:"0D9488",fontFace:FONT,valign:"middle",margin:0});
    s.addText("AI에게 외부 도구를 연결하는 표준 방법.",{x:C2R+0.15,y:cy+0.82,w:C2W-0.3,h:0.3,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    [
      {icon:"📊",name:"Google Sheets MCP",desc:"스프레드시트 읽기/쓰기 · 셀 수정 · 수식 실행"},
      {icon:"📝",name:"Notion MCP",desc:"Notion 문서 읽기/쓰기 · 페이지 생성"},
      {icon:"✉️",name:"Gmail MCP",desc:"메일 읽기/작성 · 자동 분류"},
    ].forEach((item,i)=>{
      const my=cy+1.20+i*1.05;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:my,w:C2W,h:0.98,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(item.icon,{x:C2R+0.1,y:my+0.08,w:0.65,h:0.88,fontSize:22,align:"center",valign:"middle",margin:0});
      s.addText(item.name,{x:C2R+0.85,y:my+0.1,w:C2W-1.05,h:0.35,fontSize:13,bold:true,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
      s.addText(item.desc,{x:C2R+0.85,y:my+0.48,w:C2W-1.05,h:0.48,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"Claude Code는 터미널에서 실제 파일을 조작하는 도구, MCP는 AI에 외부 서비스를 연결하는 플러그인 규격입니다.");
    footer(s,pres,DOC,5,TOTAL);
  }

  // ── SLIDE 6: 용어 퀴즈 ───────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.iceIndigo};
    header(s,pres,CH); tb(s,pres,"용어 퀴즈","맞히면서 정리해봅시다 — 5문항");
    const qW=(CW-0.3)/2;
    const quiz=[
      {q:"1. AI가 읽고 쓰는 텍스트 단위로, 요금이 비례하는 것은?",opts:"a) 프롬프트  b) 토큰  c) 컨텍스트  d) MCP"},
      {q:"2. AI의 단기 기억으로, 창을 닫으면 리셋되는 것은?",opts:"a) LLM  b) 토큰  c) 컨텍스트 윈도우  d) Agentic"},
      {q:"3. AI에게 외부 도구를 연결하는 플러그인 규격은?",opts:"a) Claude Code  b) MCP  c) 프롬프트  d) uv"},
      {q:"4. 명령 하나로 여러 단계를 스스로 실행하는 AI는?",opts:"a) ChatGPT  b) LLM  c) Agentic AI  d) 토큰"},
      {q:"5. 터미널에서 돌아가는 Anthropic의 Agentic AI 도구는?",opts:"a) ChatGPT Code  b) Claude Code  c) GitHub Copilot  d) MCP"},
    ];
    quiz.forEach((q,i)=>{
      // 0~3번: 2열 2행, 4번: 전체 너비 하단
      const isLast = i===4;
      const col=i%2, row=Math.floor(i/2);
      const qx = isLast ? L.ml : L.ml+col*(qW+0.3);
      const qy = isLast ? L.contentY+2*1.42 : L.contentY+row*1.42;
      const qWi = isLast ? CW : qW;
      s.addShape(pres.shapes.RECTANGLE,{x:qx,y:qy,w:qWi,h:1.32,fill:{color:C.white},line:{color:C.slate200,width:0.5}});
      s.addText(q.q,{x:qx+0.18,y:qy+0.1,w:qWi-0.36,h:0.48,fontSize:11.5,bold:true,color:C.inkDark,fontFace:FONT,valign:"top",margin:0});
      s.addText(q.opts,{x:qx+0.18,y:qy+0.62,w:qWi-0.36,h:0.58,fontSize:10.5,color:C.slate500,fontFace:FONT,valign:"top",margin:0});
    });
    bfill(s,pres,"정답: 1-b(토큰)  2-c(컨텍스트 윈도우)  3-b(MCP)  4-c(Agentic AI)  5-b(Claude Code)","정답");
    footer(s,pres,DOC,6,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/02-concepts.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
