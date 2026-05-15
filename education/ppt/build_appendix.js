// build_appendix.js — 부록 (Appendix) → appendix.pptx
const pptxgen = require("C:/Prog/4brain-skills/education/ppt/node_modules/pptxgenjs");

const C = {
  indigo:"4369E9", indigoDeep:"3254CC", indigoPale:"C7D2FE", coral:"F05A28",
  white:"FFFFFF", iceIndigo:"EEF2FF", darkSlate:"0F172A", slate800:"1E293B",
  inkDark:"0F172A", slate700:"334155", slate500:"64748B", slate300:"CBD5E1",
  slate200:"E2E8F0", slate100:"F1F5F9", slate50:"F8FAFC",
};
const FONT="Pretendard", SLIDE_W=13.33;
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
function codeBox(s,x,y,w,h,code){
  s.addShape(pres.shapes.RECTANGLE,{x,y,w,h,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
  s.addText(code,{x:x+0.18,y:y+0.05,w:w-0.36,h:h-0.1,fontSize:10,color:"7DD3FC",fontFace:"Consolas",valign:"top",margin:0});
}

let pres;

async function build(){
  pres=new pptxgen();
  pres.layout="LAYOUT_WIDE"; pres.title="부록"; pres.author="Team Gigang";
  const TOTAL=9, DOC="Gigang Skills — Agentic AI 교육  부록", CH="부록 (Appendix)";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("APPENDIX",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("부록",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:180,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"부록",options:{breakLine:true}},{text:"Appendix"}],{x:L.ml,y:1.6,w:7.0,h:2.5,fontSize:60,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("A: Git 기초  ·  B: GitHub 가입  ·  C: PowerShell 기초  ·  D: 토큰 요금  ·  E: Playwright MCP  ·  F: 용어 정리  ·  G: superpowers & gstack  ·  H: gigang-init 설치 목록  ·  I: gigang 스킬 목록",{x:L.ml,y:4.4,w:12.5,h:0.55,fontSize:11,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("Team Gigang  ·  2026",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:11,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: A. Git 기초 ─────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"A. Git 기초","버전 관리 — 파일의 변경 이력을 기록하고 되돌리는 도구");
    const cy=L.contentY;

    colHdr(s,pres,L.ml,cy,C2W,"Git이 하는 일",C.slate700);
    s.addText("비유: 파일의 타임머신",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const gitConcepts=[
      {term:"저장소 (Repository)",desc:"파일과 변경 이력이 담긴 폴더"},
      {term:"커밋 (Commit)",desc:"\"지금 이 상태를 저장\"하는 행위"},
      {term:"브랜치 (Branch)",desc:"독립적인 작업 공간 — 실험할 때 사용"},
      {term:"풀 (Pull)",desc:"원격 저장소에서 최신 내용 내려받기"},
    ];
    gitConcepts.forEach((g,i)=>{
      const gy=cy+0.85+i*0.95;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:gy,w:C2W,h:0.85,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addText(g.term,{x:L.ml+0.18,y:gy+0.08,w:C2W-0.36,h:0.30,fontSize:13,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
      s.addText(g.desc,{x:L.ml+0.18,y:gy+0.42,w:C2W-0.36,h:0.36,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    colHdr(s,pres,C2R,cy,C2W,"gigang-skills에서 Git 사용법","0D9488");
    s.addText("gigang-skills는 Git으로 배포되어 자동 업데이트됩니다. 직접 git 명령어를 쓸 일은 거의 없습니다.",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.65,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    const gitCmds=[
      {cmd:"git --version",desc:"Git 설치 확인"},
      {cmd:"git pull",desc:"최신 버전 내려받기 (자동 실행됨)"},
      {cmd:"git log --oneline",desc:"변경 이력 한 줄씩 보기"},
    ];
    gitCmds.forEach((g,i)=>{
      const gy=cy+1.25+i*1.10;
      codeBox(s,C2R,gy,C2W,0.50,g.cmd);
      s.addText(g.desc,{x:C2R+0.18,y:gy+0.55,w:C2W-0.36,h:0.45,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+4.38,w:C2W,h:0.32,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("💡  세션 시작 시 gigang-skills가 자동으로 git pull을 실행하므로 수동으로 할 필요가 없습니다.",{x:C2R+0.18,y:cy+4.38,w:C2W-0.36,h:0.32,fontSize:10.5,color:"92400E",fontFace:FONT,valign:"middle",margin:0});

    bfill(s,pres,"Git은 파일 버전 관리 도구입니다. gigang-skills 업데이트는 세션 시작 시 자동으로 실행됩니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: B. GitHub 가입 + C. PowerShell ─────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"B. GitHub 가입  ·  C. PowerShell 기초",null);
    const cy=L.contentY;

    // Left: GitHub 가입
    colHdr(s,pres,L.ml,cy,C2W,"B. GitHub 계정 만들기",C.indigo);
    s.addText("github.com 에서 무료로 가입합니다.",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const ghSteps=["github.com 접속","Sign up 클릭","이메일·비밀번호 입력","이메일 인증 완료","가입 완료 — gh auth login 으로 연결"];
    ghSteps.forEach((st,i)=>{
      const sy=cy+0.85+i*0.72;
      s.addShape(pres.shapes.OVAL,{x:L.ml+0.12,y:sy+0.10,w:0.38,h:0.38,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(String(i+1),{x:L.ml+0.12,y:sy+0.10,w:0.38,h:0.38,fontSize:11,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.62,y:sy+0.08,w:C2W-0.72,h:0.46,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(st,{x:L.ml+0.78,y:sy+0.08,w:C2W-0.92,h:0.46,fontSize:12,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
    });
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+4.28,w:C2W,h:0.32,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("💡  업무용 GitHub 계정이 이미 있다면 그대로 사용 가능합니다.",{x:L.ml+0.18,y:cy+4.28,w:C2W-0.36,h:0.32,fontSize:10.5,color:"92400E",fontFace:FONT,valign:"middle",margin:0});

    // Right: PowerShell
    colHdr(s,pres,C2R,cy,C2W,"C. PowerShell 기초 명령어","0891B2");
    s.addText("비유: 컴퓨터에게 문자로 직접 지시하는 창",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:"0891B2",fontFace:FONT,valign:"middle",margin:0});
    const psCmds=[
      {cmd:"cd C:\\WORK",desc:"폴더 이동"},
      {cmd:"ls",desc:"현재 폴더 파일 목록 보기"},
      {cmd:"pwd",desc:"현재 위치(경로) 확인"},
      {cmd:"cls",desc:"화면 지우기"},
      {cmd:"Ctrl + C",desc:"실행 중인 명령 강제 종료"},
    ];
    psCmds.forEach((p2,i)=>{
      const py=cy+0.85+i*0.75;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:py,w:C2W,h:0.66,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.1,y:py+0.12,w:2.4,h:0.40,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(p2.cmd,{x:C2R+0.1,y:py+0.12,w:2.4,h:0.40,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(p2.desc,{x:C2R+2.62,y:py,w:C2W-2.72,h:0.66,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"GitHub는 무료로 가입합니다. PowerShell은 Windows에 기본 포함된 명령줄 도구입니다.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: D. 토큰 요금 안내 ─────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"D. 토큰 요금 안내","Claude Code 사용 비용 이해하기");
    const cy=L.contentY;

    // Left: 플랜 설명
    colHdr(s,pres,L.ml,cy,C2W,"Claude Code 플랜",C.indigo);
    const plans=[
      {name:"Pro",price:"$20/월",token:"사용량 한도 있음",color:C.indigo},
      {name:"Max",price:"$100~200/월",token:"5~20× 더 많은 사용량",color:C.coral},
    ];
    plans.forEach((pl,i)=>{
      const py=cy+0.50+i*2.00;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:py,w:C2W,h:1.80,fill:{color:i===0?C.iceIndigo:"FFF7ED"},line:{color:i===0?C.indigo:C.coral,width:1.0}});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:py,w:C2W,h:0.40,fill:{color:pl.color},line:{color:pl.color}});
      s.addText(pl.name,{x:L.ml+0.18,y:py,w:C2W-0.36,h:0.40,fontSize:14,bold:true,color:C.white,fontFace:FONT,valign:"middle",margin:0});
      s.addText(pl.price,{x:L.ml+0.18,y:py+0.48,w:C2W-0.36,h:0.40,fontSize:18,bold:true,color:pl.color,fontFace:FONT,valign:"middle",margin:0});
      s.addText(pl.token,{x:L.ml+0.18,y:py+0.95,w:C2W-0.36,h:0.72,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: 절약 팁
    colHdr(s,pres,C2R,cy,C2W,"토큰 절약 팁","0D9488");
    const tips=[
      {icon:"📋",tip:"/compact 활용",desc:"대화가 길어지면 주기적으로 /compact로 압축"},
      {icon:"🎯",tip:"명확한 지시",desc:"모호한 질문은 AI가 여러 번 시도 → 토큰 낭비"},
      {icon:"📁",tip:"필요한 파일만 참조",desc:"관련 파일만 열어두기 — 불필요한 파일은 닫기"},
      {icon:"⏸️",tip:"중간 저장 습관",desc:"\"지금까지 파일로 저장해줘\" 자주 요청"},
    ];
    tips.forEach((t,i)=>{
      const ty=cy+0.50+i*1.02;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:ty,w:C2W,h:0.92,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(t.icon,{x:C2R+0.1,y:ty+0.08,w:0.60,h:0.76,fontSize:20,align:"center",valign:"middle",margin:0});
      s.addText(t.tip,{x:C2R+0.82,y:ty+0.08,w:C2W-1.0,h:0.28,fontSize:12,bold:true,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
      s.addText(t.desc,{x:C2R+0.82,y:ty+0.40,w:C2W-1.0,h:0.46,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"Pro 플랜으로 시작하고, 작업량이 많아지면 Max를 고려하세요. /compact로 토큰을 절약할 수 있습니다.");
    footer(s,pres,DOC,4,TOTAL);
  }

  // ── SLIDE 5: E. Playwright MCP ──────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"E. Playwright MCP 설치","브라우저 자동화 플러그인 — 로그인 사이트 작업에 필요");
    const cy=L.contentY;

    // Left: 설치 방법
    colHdr(s,pres,L.ml,cy,C2W,"설치 절차",C.indigo);
    s.addText("Claude Code 안에서 아래 순서로 진행합니다:",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    codeBox(s,L.ml,cy+0.85,C2W,0.68,"/mcp add playwright\n  --name playwright");
    s.addText("또는 Claude Code 설정에서 직접 추가:",{x:L.ml+0.15,y:cy+1.62,w:C2W-0.3,h:0.28,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    codeBox(s,L.ml,cy+2.00,C2W,1.05,
      "{\n  \"mcpServers\": {\n    \"playwright\": {\n      \"command\": \"npx\",\n      \"args\": [\"@playwright/mcp\"]\n    }\n  }\n}"
    );
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+3.15,w:C2W,h:0.45,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  설치 후 Claude Code 재시작 → /mcp list 에서 playwright 확인",{x:L.ml+0.18,y:cy+3.15,w:C2W-0.36,h:0.45,fontSize:11,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});

    // Right: 사용 예시
    colHdr(s,pres,C2R,cy,C2W,"활용 예시",C.coral);
    s.addText("로그인이 필요한 사이트에서 데이터를 가져올 때:",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const exCmds=[
      {label:"브라우저 열기",cmd:'브라우저 열어줘. 네이버에 접속해',color:C.indigo},
      {label:"내가 직접 로그인",cmd:"(사용자가 직접 로그인)",color:C.slate500},
      {label:"이후 AI가 처리",cmd:'로그인 됐으면 알림 목록 스크린샷 찍어줘',color:"16A34A"},
    ];
    exCmds.forEach((ex,i)=>{
      const ey=cy+0.88+i*1.25;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:ey,w:C2W,h:1.15,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(ex.label,{x:C2R+0.18,y:ey+0.08,w:C2W-0.36,h:0.26,fontSize:10,bold:true,color:C.slate300,fontFace:FONT,valign:"middle",margin:0});
      s.addText('> "'+ex.cmd+'"',{x:C2R+0.18,y:ey+0.40,w:C2W-0.36,h:0.65,fontSize:10.5,color:ex.color==="16A34A"?"86EFAC":ex.color===C.slate500?"94A3B8":"7DD3FC",fontFace:"Consolas",valign:"top",margin:0});
    });

    bfill(s,pres,"Playwright MCP로 브라우저를 열고, 내가 직접 로그인한 후 AI에게 이어서 처리를 맡기세요.");
    footer(s,pres,DOC,5,TOTAL);
  }

  // ── SLIDE 6: F. 용어 정리 ───────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.iceIndigo};
    header(s,pres,CH); tb(s,pres,"F. 용어 정리 (Glossary)","교육 전체에서 사용된 핵심 용어 모음");
    const cy=L.contentY;

    const terms=[
      {t:"LLM",d:"Large Language Model — 대규모 언어 모델. ChatGPT·Claude 등이 이에 해당"},
      {t:"프롬프트",d:"AI에게 내리는 지시문. 구체적일수록 결과가 좋아짐"},
      {t:"토큰",d:"AI가 읽고 쓰는 텍스트 단위. 요금이 토큰 수에 비례"},
      {t:"컨텍스트 윈도우",d:"AI가 한 번에 기억할 수 있는 대화 분량. /compact 로 압축 가능"},
      {t:"Agentic AI",d:"사람 대신 계획·실행·확인·보고를 자동 처리하는 AI"},
      {t:"MCP",d:"Model Context Protocol — AI에 외부 도구를 연결하는 표준 플러그인 규격"},
      {t:"Claude Code",d:"터미널에서 실행하는 Anthropic의 Agentic AI 도구"},
      {t:"gigang-skills",d:"기강 러닝팀이 함께 만든 Claude Code 확장 도구 모음"},
    ];
    const tW=(CW-0.3)/2;
    terms.forEach((term,i)=>{
      const col=i%2, row=Math.floor(i/2);
      const tx=L.ml+col*(tW+0.3), ty=cy+row*1.12;
      s.addShape(pres.shapes.RECTANGLE,{x:tx,y:ty,w:tW,h:1.02,fill:{color:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:tx,y:ty,w:tW,h:0.05,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(term.t,{x:tx+0.15,y:ty+0.10,w:tW-0.3,h:0.30,fontSize:13,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
      s.addText(term.d,{x:tx+0.15,y:ty+0.44,w:tW-0.3,h:0.52,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    });

    bfill(s,pres,"모든 용어는 Claude Code와 함께 사용하면서 자연스럽게 익혀집니다.");
    footer(s,pres,DOC,6,TOTAL);
  }

  // ── SLIDE 7: G. superpowers & gstack ────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"G. superpowers & gstack","Claude Code를 팀 수준 도구로 확장하는 두 가지 플러그인");
    const cy=L.contentY;

    // Left: superpowers
    colHdr(s,pres,L.ml,cy,C2W,"superpowers — Claude Code 플러그인",C.indigo);
    s.addText("gigang-init 이 자동으로 설치합니다.",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.26,fontSize:12,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    codeBox(s,L.ml,cy+0.82,C2W,0.52,"claude plugin install superpowers@claude-plugins-official");
    const spFeatures=[
      {icon:"🛠️",text:"Skill 도구 — /슬래시 명령어 시스템 제공"},
      {icon:"🤖",text:"Agent 도구 — 서브에이전트 병렬 실행"},
      {icon:"📋",text:"Task 도구 — 작업 목록 추적 및 관리"},
      {icon:"🔍",text:"WebSearch · WebFetch — 웹 검색·조회"},
    ];
    spFeatures.forEach((f,i)=>{
      const fy=cy+1.45+i*0.74;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:fy,w:C2W,h:0.68,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addText(f.icon,{x:L.ml+0.10,y:fy,w:0.55,h:0.68,fontSize:18,align:"center",valign:"middle",margin:0});
      s.addText(f.text,{x:L.ml+0.70,y:fy,w:C2W-0.80,h:0.68,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+4.38,w:C2W,h:0.30,fill:{color:C.iceIndigo},line:{color:C.indigo,width:0.75}});
    s.addText("gigang-skills의 /슬래시 명령어들이 superpowers Skill 도구를 통해 동작합니다.",{x:L.ml+0.15,y:cy+4.38,w:C2W-0.3,h:0.30,fontSize:10,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});

    // Right: gstack
    colHdr(s,pres,C2R,cy,C2W,"gstack — 개발 워크플로 스킬 모음",C.coral);
    s.addText("Garry Tan (Y Combinator CEO) 이 공개한 오픈소스 Claude Code 확장 도구.",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.45,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    codeBox(s,C2R,cy+1.00,C2W,0.64,
      "git clone --single-branch --depth 1\n  https://github.com/garrytan/gstack.git\n  ~/.claude/skills/gstack"
    );
    s.addText("주요 스킬:",{x:C2R+0.15,y:cy+1.73,w:C2W-0.3,h:0.24,fontSize:12,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const gsCmds=[
      {cmd:"/browse",desc:"헤드리스 브라우저 — URL 열기·스크린샷·검증"},
      {cmd:"/review",desc:"코드 리뷰 — 버그·복잡도·보안 점검"},
      {cmd:"/ship",desc:"목표 기반 기능 구현 + 테스트 + PR"},
      {cmd:"/qa",desc:"QA 자동화 — 실제 브라우저로 사용자 흐름 검증"},
    ];
    gsCmds.forEach((g,i)=>{
      const gy=cy+2.04+i*0.68;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:gy,w:C2W,h:0.60,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.1,y:gy+0.09,w:1.40,h:0.40,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(g.cmd,{x:C2R+0.1,y:gy+0.09,w:1.40,h:0.40,fontSize:10.5,bold:true,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(g.desc,{x:C2R+1.60,y:gy,w:C2W-1.70,h:0.60,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"superpowers는 gigang-init이 설치. gstack은 /browse로 웹 자동화, /review로 코드 품질 관리에 씁니다.");
    footer(s,pres,DOC,7,TOTAL);
  }

  // ── SLIDE 8: H. gigang-init 설치 목록 ───────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"H. gigang-init 설치 항목","/gigang-init 한 번으로 설치·설정되는 전체 목록");
    const cy=L.contentY;

    const items=[
      {phase:"Phase 1",color:C.indigo,items:[
        {icon:"📦",name:"git",desc:"버전 관리 도구 (winget)"},
        {icon:"📦",name:"gh (GitHub CLI)",desc:"GitHub 연동 (winget)"},
        {icon:"📦",name:"PowerShell 7",desc:"최신 PowerShell (winget)"},
        {icon:"📦",name:"uv",desc:"Python 실행기 (winget)"},
      ]},
      {phase:"Phase 2",color:C.coral,items:[
        {icon:"⚙️",name:"cc alias",desc:"claude 단축 명령어 — $PROFILE 에 추가"},
        {icon:"⚙️",name:"CLAUDE.md",desc:"uv 사용 문구 + 기강 커뮤니티 안내 추가"},
        {icon:"⚙️",name:"superpowers",desc:"Claude Code 플러그인 — Skill·Agent·Task 도구"},
        {icon:"⚙️",name:"기본 모델",desc:"claude-sonnet-4-6 으로 설정"},
        {icon:"⚙️",name:"gstack",desc:"~/.claude/skills/gstack 클론 + CLAUDE.md 섹션"},
        {icon:"🔤",name:"D2Coding 폰트",desc:"Windows Terminal 글씨체 적용"},
      ]},
    ];

    const colW=(CW-0.3)/2;
    items.forEach((group,gi)=>{
      const gx=L.ml+gi*(colW+0.3);
      colHdr(s,pres,gx,cy,colW,group.phase,group.color);
      group.items.forEach((item,ii)=>{
        const iy=cy+0.48+ii*0.66;
        s.addShape(pres.shapes.RECTANGLE,{x:gx,y:iy,w:colW,h:0.58,fill:{color:ii%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
        s.addText(item.icon,{x:gx+0.08,y:iy,w:0.48,h:0.58,fontSize:14,align:"center",valign:"middle",margin:0});
        s.addText(item.name,{x:gx+0.58,y:iy+0.04,w:colW-0.65,h:0.24,fontSize:11,bold:true,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
        s.addText(item.desc,{x:gx+0.58,y:iy+0.30,w:colW-0.65,h:0.24,fontSize:9.5,color:C.slate500,fontFace:FONT,valign:"middle",margin:0});
      });
    });

    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+4.40,w:CW,h:0.28,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("💡  모든 단계는 멱등(idempotent) — 이미 설치된 항목은 자동으로 건너뜁니다. 언제든 다시 실행해도 안전합니다.",{x:L.ml+0.18,y:cy+4.40,w:CW-0.36,h:0.28,fontSize:10.5,color:"92400E",fontFace:FONT,valign:"middle",margin:0});

    bfill(s,pres,"/gigang-init 한 번이면 git·gh·uv·superpowers·gstack·D2Coding 폰트까지 모두 자동 설치됩니다.");
    footer(s,pres,DOC,8,TOTAL);
  }

  // ── SLIDE 9: I. gigang skills 목록 ──────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.iceIndigo};
    header(s,pres,CH); tb(s,pres,"I. gigang 스킬 & 명령어 목록","Claude Code에서 사용할 수 있는 모든 기강 스킬");
    const cy=L.contentY;

    // 슬래시 명령어
    colHdr(s,pres,L.ml,cy,C2W,"슬래시 명령어 (/)",C.indigo);
    const slashCmds=[
      {cmd:"/gigang-init",desc:"환경 초기 셋업 — 패키지·alias·플러그인 한 번에"},
      {cmd:"/gigang-help",desc:"사용법 문서 표시"},
      {cmd:"/gigang-version",desc:"설치 버전 및 최신 여부 확인"},
      {cmd:"/gigang-folder-guide",desc:"대화형 폴더 구조 가이드"},
      {cmd:"/gigang-report",desc:"버그·개선 아이디어를 GitHub Issue로 제출"},
    ];
    slashCmds.forEach((c,i)=>{
      const sy=cy+0.48+i*0.78;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:sy,w:C2W,h:0.68,fill:{color:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.1,y:sy+0.13,w:2.80,h:0.42,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(c.cmd,{x:L.ml+0.1,y:sy+0.13,w:2.80,h:0.42,fontSize:10,bold:true,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(c.desc,{x:L.ml+3.00,y:sy,w:C2W-3.10,h:0.68,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    // 자연어 스킬
    colHdr(s,pres,C2R,cy,C2W,"자연어 스킬 (말로 발동)",C.coral);
    const nlSkills=[
      {trigger:'"어제 뭐했더라"',skill:"gigang-뭐했더라",desc:"날짜 지정 가능 — 어제·지난주·전체 프로젝트"},
      {trigger:'"폴더 구조 잡아줘"',skill:"gigang-folder-guide",desc:"프로젝트 유형별 맞춤 폴더 구조 제안"},
      {trigger:'"버그 보고해줘"',skill:"gigang-report",desc:"GitHub Issue 자동 생성"},
    ];
    nlSkills.forEach((n,i)=>{
      const ny=cy+0.48+i*1.30;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:ny,w:C2W,h:1.20,fill:{color:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:ny,w:C2W,h:0.04,fill:{color:C.coral},line:{color:C.coral}});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.1,y:ny+0.10,w:C2W-0.2,h:0.36,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(n.trigger,{x:C2R+0.18,y:ny+0.10,w:C2W-0.36,h:0.36,fontSize:11,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
      s.addText("→ "+n.skill,{x:C2R+0.15,y:ny+0.52,w:C2W-0.3,h:0.24,fontSize:11,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
      s.addText(n.desc,{x:C2R+0.15,y:ny+0.78,w:C2W-0.3,h:0.36,fontSize:10.5,color:C.slate500,fontFace:FONT,valign:"middle",margin:0});
    });

    // 자동 로그
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+4.42,w:C2W,h:0.32,fill:{color:C.iceIndigo},line:{color:C.indigo,width:0.75}});
    s.addText("📁  자동 로그: ~/.claude/logs/prompts/<project>/YYYY-MM-DD.md — 매 세션 자동 저장",{x:C2R+0.15,y:cy+4.42,w:C2W-0.3,h:0.32,fontSize:10,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});

    bfill(s,pres,"모든 스킬은 자동 업데이트됩니다. 불편한 점은 /gigang-report로 팀에 공유하세요.");
    footer(s,pres,DOC,9,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/appendix.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
