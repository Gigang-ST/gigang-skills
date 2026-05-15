// build_03.js — 03-setup.md → 03-setup.pptx
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
// Code block helper
function codeBlock(s,x,y,w,h,code){
  s.addShape(pres.shapes.RECTANGLE,{x,y,w,h,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
  s.addText(code,{x:x+0.18,y:y+0.05,w:w-0.36,h:h-0.1,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",valign:"top",margin:0});
}

let pres;

async function build(){
  pres=new pptxgen();
  pres.layout="LAYOUT_WIDE"; pres.title="설치 가이드"; pres.author="Team Gigang";
  const TOTAL=5, DOC="Gigang Skills — Agentic AI 교육  CH 03", CH="CH 03 — 설치 가이드";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("CHAPTER 03",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("03",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:220,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"설치",options:{breakLine:true}},{text:"가이드"}],{x:L.ml,y:1.6,w:7.0,h:3.0,fontSize:62,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("Claude Code와 gigang-skills를 처음부터 설치합니다",{x:L.ml,y:4.9,w:9.0,h:0.5,fontSize:16,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("Team Gigang  ·  2026",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:11,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: 설치 개요 + 터미널 ──────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"설치 개요","6단계 순서대로 진행 — 각 단계 완료 시 [OK] 체크");
    const cy=L.contentY;

    // Left: 6단계 목록
    colHdr(s,pres,L.ml,cy,C2W,"설치 순서",C.indigo);
    const steps=["Claude Code 설치","Git 설치","GitHub CLI 설치","GitHub 인증","gigang-skills 설치","/gigang-init 실행"];
    steps.forEach((step,i)=>{
      const sy=cy+0.47+i*0.65;
      s.addShape(pres.shapes.OVAL,{x:L.ml+0.12,y:sy+0.08,w:0.42,h:0.42,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(String(i+1),{x:L.ml+0.12,y:sy+0.08,w:0.42,h:0.42,fontSize:13,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.65,y:sy+0.05,w:C2W-0.75,h:0.48,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(step,{x:L.ml+0.82,y:sy+0.05,w:C2W-1.0,h:0.48,fontSize:13,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: 터미널 소개
    colHdr(s,pres,C2R,cy,C2W,"터미널이란?","0891B2");
    s.addText("비유: 컴퓨터에게 문자로 직접 명령하는 창",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,italic:true,color:"0891B2",fontFace:FONT,valign:"middle",margin:0});
    s.addText("마우스 클릭 대신 글자를 입력해서 컴퓨터를 조작합니다.\nWindows에서는 PowerShell 또는 Windows Terminal을 사용합니다.",{x:C2R+0.15,y:cy+0.82,w:C2W-0.3,h:0.75,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+1.68,w:C2W,h:0.8,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("Win + R  →  powershell  →  Enter",{x:C2R+0.2,y:cy+1.68,w:C2W-0.4,h:0.8,fontSize:12,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("PowerShell 창이 열리면 준비 완료!",{x:C2R+0.15,y:cy+2.58,w:C2W-0.3,h:0.3,fontSize:12,bold:true,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    // Tip box
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+3.0,w:C2W,h:1.15,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("💡  팁",{x:C2R+0.2,y:cy+3.05,w:C2W-0.4,h:0.3,fontSize:11,bold:true,color:"D97706",fontFace:FONT,valign:"middle",margin:0});
    s.addText("명령어를 직접 타이핑할 필요 없습니다.\n화면에 표시된 명령어를 복사(Ctrl+C) 후\nPowerShell에 붙여넣기(Ctrl+V) 하세요.",{x:C2R+0.2,y:cy+3.38,w:C2W-0.4,h:0.7,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    bfill(s,pres,"터미널은 마우스 대신 글자로 컴퓨터를 조작하는 창입니다. 복사·붙여넣기를 활용하면 됩니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: Step 1-2 ───────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"Step 1 · 2 — Claude Code & Git 설치",null);
    const cy=L.contentY;

    // Left: Step 1
    colHdr(s,pres,L.ml,cy,C2W,"Step 1 — Claude Code 설치",C.indigo);
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.48,w:C2W,h:0.65,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("winget install Anthropic.ClaudeCode",{x:L.ml+0.18,y:cy+0.48,w:C2W-0.36,h:0.65,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("완료 확인:",{x:L.ml+0.15,y:cy+1.22,w:C2W-0.3,h:0.28,fontSize:11,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.55,w:C2W,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("claude --version",{x:L.ml+0.18,y:cy+1.55,w:C2W-0.36,h:0.55,fontSize:10.5,color:"86EFAC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.2,w:C2W,h:0.45,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  버전 숫자가 나오면 OK  (예: claude 1.x.x)",{x:L.ml+0.18,y:cy+2.2,w:C2W-0.36,h:0.45,fontSize:11,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.75,w:C2W,h:0.45,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("※ '명령어를 찾을 수 없다' → PowerShell 창 닫고 새로 열기",{x:L.ml+0.18,y:cy+2.75,w:C2W-0.36,h:0.45,fontSize:10,color:"92400E",fontFace:FONT,valign:"middle",margin:0});

    // Right: Step 2
    colHdr(s,pres,C2R,cy,C2W,"Step 2 — Git 설치","0D9488");
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+0.48,w:C2W,h:0.65,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("winget install Git.Git",{x:C2R+0.18,y:cy+0.48,w:C2W-0.36,h:0.65,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("완료 확인:",{x:C2R+0.15,y:cy+1.22,w:C2W-0.3,h:0.28,fontSize:11,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+1.55,w:C2W,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("git --version",{x:C2R+0.18,y:cy+1.55,w:C2W-0.36,h:0.55,fontSize:10.5,color:"86EFAC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+2.2,w:C2W,h:0.45,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  git version 2.x.x 가 나오면 OK",{x:C2R+0.18,y:cy+2.2,w:C2W-0.36,h:0.45,fontSize:11,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    // Git 소개
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+2.75,w:C2W,h:1.45,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
    s.addText("Git이란?",{x:C2R+0.2,y:cy+2.82,w:C2W-0.4,h:0.3,fontSize:12,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText("파일 버전을 관리하는 도구.\ngigang-skills 설치 및 자동 업데이트에 사용됩니다.\n(부록 A에서 자세히 다룹니다)",{x:C2R+0.2,y:cy+3.15,w:C2W-0.4,h:0.95,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    bfill(s,pres,"Step 1-2 완료 후 claude --version, git --version 두 명령어 모두 버전 숫자가 나와야 다음으로 진행하세요.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: Step 3-4 ───────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"Step 3 · 4 — GitHub CLI & 인증",null);
    const cy=L.contentY;

    // Left: Step 3
    colHdr(s,pres,L.ml,cy,C2W,"Step 3 — GitHub CLI 설치",C.coral);
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.48,w:C2W,h:0.85,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("winget install -e --id GitHub.cli\n  --accept-package-agreements\n  --accept-source-agreements",{x:L.ml+0.18,y:cy+0.52,w:C2W-0.36,h:0.78,fontSize:9.5,color:"7DD3FC",fontFace:"Consolas",valign:"top",margin:0});
    s.addText("완료 확인:",{x:L.ml+0.15,y:cy+1.42,w:C2W-0.3,h:0.28,fontSize:11,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.75,w:C2W,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("gh --version",{x:L.ml+0.18,y:cy+1.75,w:C2W-0.36,h:0.55,fontSize:10.5,color:"86EFAC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.4,w:C2W,h:0.45,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  버전 숫자가 나오면 OK",{x:L.ml+0.18,y:cy+2.4,w:C2W-0.36,h:0.45,fontSize:11,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    // GH CLI 소개
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.98,w:C2W,h:1.22,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
    s.addText("GitHub CLI (gh) 란?",{x:L.ml+0.2,y:cy+3.05,w:C2W-0.4,h:0.3,fontSize:12,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText("터미널에서 GitHub를 조작하는 도구.\ngigang-skills 비공개 저장소를 내려받을 때 필요합니다.",{x:L.ml+0.2,y:cy+3.38,w:C2W-0.4,h:0.75,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    // Right: Step 4 인증
    colHdr(s,pres,C2R,cy,C2W,"Step 4 — GitHub 인증","D97706");
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+0.48,w:C2W,h:0.45,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText("⚠️  이 단계는 브라우저가 열립니다. 강사 안내에 따라 진행하세요.",{x:C2R+0.18,y:cy+0.48,w:C2W-0.36,h:0.45,fontSize:10,color:"92400E",fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+1.0,w:C2W,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("gh auth login",{x:C2R+0.18,y:cy+1.0,w:C2W-0.36,h:0.55,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    const authSteps=["GitHub.com 선택","HTTPS 선택","Login with a web browser 선택","브라우저에서 GitHub 로그인","PowerShell로 돌아와 완료 확인"];
    authSteps.forEach((st,i)=>{
      const ay=cy+1.55+i*0.58;
      s.addShape(pres.shapes.OVAL,{x:C2R+0.1,y:ay+0.08,w:0.35,h:0.35,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(String(i+1),{x:C2R+0.1,y:ay+0.08,w:0.35,h:0.35,fontSize:10,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addText(st,{x:C2R+0.55,y:ay+0.05,w:C2W-0.65,h:0.48,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"Step 4 인증 완료 후 gh auth status 명령에서 'Logged in to github.com'이 나오면 OK입니다.");
    footer(s,pres,DOC,4,TOTAL);
  }

  // ── SLIDE 5: Step 5-6 + 완료 ────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"Step 5 · 6 — gigang-skills 설치 & 초기 셋업",null);
    const cy=L.contentY;

    // Left: Step 5 & 6
    colHdr(s,pres,L.ml,cy,C2W,"Step 5 — gigang-skills 설치",C.indigo);
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.48,w:C2W,h:0.65,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("gh repo clone LHG4650/gigang-skills C:\\WORK\\gigang-skills",{x:L.ml+0.18,y:cy+0.48,w:C2W-0.36,h:0.65,fontSize:9.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.22,w:C2W,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText('& "C:\\WORK\\gigang-skills\\install.ps1"',{x:L.ml+0.18,y:cy+1.22,w:C2W-0.36,h:0.55,fontSize:10,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.85,w:C2W,h:0.38,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  설치 완료 메시지가 나오면 OK",{x:L.ml+0.18,y:cy+1.85,w:C2W-0.36,h:0.38,fontSize:10.5,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});

    colHdr(s,pres,L.ml,cy+2.4,C2W,"Step 6 — gigang-init 실행","0D9488");
    s.addText("새 PowerShell 창을 열고:",{x:L.ml+0.15,y:cy+2.88,w:C2W-0.3,h:0.28,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+3.22,w:C2W,h:0.82,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("claude",{x:L.ml+0.18,y:cy+3.26,w:C2W-0.36,h:0.32,fontSize:10.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("/gigang-init",{x:L.ml+0.18,y:cy+3.6,w:C2W-0.36,h:0.38,fontSize:10.5,color:"86EFAC",fontFace:"Consolas",valign:"middle",margin:0});

    // Right: 완료 체크리스트 + 트러블슈팅
    colHdr(s,pres,C2R,cy,C2W,"설치 완료 체크리스트",C.indigo);
    const checks=["claude --version → 버전 출력","git --version → 버전 출력","gh --version → 버전 출력","gh auth status → Logged in 확인","/gigang-init 완료 메시지"];
    checks.forEach((chk,i)=>{
      const cy2=cy+0.47+i*0.65;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.1,y:cy2+0.05,w:C2W-0.2,h:0.52,fill:{color:i<4?C.iceIndigo:"F0FDF4"},line:{color:i<4?C.slate200:"86EFAC",width:0.5}});
      s.addText((i<4?"□  ":"✅  ")+chk,{x:C2R+0.25,y:cy2+0.05,w:C2W-0.5,h:0.52,fontSize:11.5,color:i<4?C.slate700:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    });
    colHdr(s,pres,C2R,cy+3.72,C2W,"트러블슈팅","64748B");
    s.addText([
      {text:"winget 없음: ",options:{bold:true}},{text:"Windows Terminal 설치 후 재시도",options:{}},{text:"\n"},
      {text:"gh auth 실패: ",options:{bold:true}},{text:"브라우저 팝업 허용 후 재시도",options:{}},{text:"\n"},
      {text:"기타: ",options:{bold:true}},{text:"강사에게 문의",options:{}},
    ],{x:C2R+0.15,y:cy+4.12,w:C2W-0.3,h:0.88,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    bfill(s,pres,"모든 체크리스트 완료 후 /gigang-init까지 성공하면 설치 완료입니다. 자동 업데이트가 활성화됩니다.");
    footer(s,pres,DOC,5,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/03-setup.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
