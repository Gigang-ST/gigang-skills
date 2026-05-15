// build_06.js — 06-gigang.md → 06-gigang.pptx
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

async function build(){
  const pres=new pptxgen();
  pres.layout="LAYOUT_WIDE"; pres.title="기강 스킬 활용"; pres.author="Team Gigang";
  const TOTAL=5, DOC="Gigang Skills — Agentic AI 교육  CH 06", CH="CH 06 — 기강 스킬 활용";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("CHAPTER 06",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("06",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:220,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"기강 스킬",options:{breakLine:true}},{text:"활용"}],{x:L.ml,y:1.6,w:7.0,h:3.0,fontSize:60,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("gigang-skills · 자동 로그 · 어제 뭐했더라 · 자동 업데이트",{x:L.ml,y:4.9,w:9.5,h:0.5,fontSize:15,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("Team Gigang  ·  2026",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:11,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: gigang-skills 명령어 ────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"gigang-skills란?","기강 러닝팀 멤버들이 함께 만들고 공유하는 Claude Code 확장 도구 모음");
    const cy=L.contentY;

    const cmds=[
      {cmd:"/gigang-init",desc:"신규 멤버 환경 초기 셋업 — 폰트·별칭·훅 자동 설치",icon:"🚀",color:C.indigo},
      {cmd:"/gigang-help",desc:"사용법 안내 — 이 화면과 같은 내용을 언제든 다시 확인",icon:"📖",color:"0891B2"},
      {cmd:"/gigang-version",desc:"설치된 버전 및 최신 여부 확인",icon:"🔢","0D9488":"0D9488",color:"0D9488"},
      {cmd:"/gigang-folder-guide",desc:"대화형 폴더 구조 가이드 — 프로젝트 유형별 맞춤 제안",icon:"📁",color:C.coral},
      {cmd:"/gigang-report",desc:"버그·개선 아이디어를 GitHub Issue로 제출",icon:"🐛",color:"D97706"},
    ];
    cmds.forEach((c,i)=>{
      const cy2=cy+i*0.95;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy2,w:CW,h:0.85,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.OVAL,{x:L.ml+0.1,y:cy2+0.17,w:0.52,h:0.52,fill:{color:c.color},line:{color:c.color}});
      s.addText(c.icon,{x:L.ml+0.1,y:cy2+0.17,w:0.52,h:0.52,fontSize:18,align:"center",valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.72,y:cy2+0.15,w:2.8,h:0.55,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(c.cmd,{x:L.ml+0.72,y:cy2+0.15,w:2.8,h:0.55,fontSize:12,bold:true,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(c.desc,{x:L.ml+3.65,y:cy2,w:CW-3.75,h:0.85,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"/gigang-init 하나로 모든 설정이 완료됩니다. 이후 자동 업데이트로 새 기능이 추가되면 바로 사용 가능합니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: 자동 로그 & 어제 뭐했더라 ──────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"자동 로그와 작업 내역 조회","세션이 자동으로 기록되고, 자연어로 조회할 수 있습니다");
    const cy=L.contentY;

    // Left: 자동 로그
    colHdr(s,pres,L.ml,cy,C2W,"자동 로그 기록",C.indigo);
    s.addText("Claude Code를 쓰면 자동으로 세션 기록이 저장됩니다.\n별도 명령이 필요 없습니다.",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.6,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.15,w:C2W,h:0.58,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("~/.claude/logs/prompts/<프로젝트>/\nYYYY-MM-DD.md",{x:L.ml+0.18,y:cy+1.17,w:C2W-0.36,h:0.54,fontSize:9.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("이 로그 덕분에:",{x:L.ml+0.15,y:cy+1.85,w:C2W-0.3,h:0.28,fontSize:12,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const benefits=[
      {icon:"📅",text:"지난주에 뭘 했는지 언제든 조회 가능"},
      {icon:"📊",text:"팀 활동 통계 파악 가능"},
      {icon:"🔍",text:"어떤 작업에 AI를 활용했는지 되돌아볼 수 있음"},
    ];
    benefits.forEach((b,i)=>{
      const by=cy+2.22+i*0.85;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:by,w:C2W,h:0.75,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(b.icon,{x:L.ml+0.1,y:by,w:0.55,h:0.75,fontSize:20,align:"center",valign:"middle",margin:0});
      s.addText(b.text,{x:L.ml+0.72,y:by,w:C2W-0.85,h:0.75,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: 어제 뭐했더라
    colHdr(s,pres,C2R,cy,C2W,"어제 뭐했더라?",C.coral);
    s.addText("Claude Code에서 자연어로 물어보면 됩니다:",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.3,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const queries=[
      {q:"어제 뭐했더라",range:"어제 하루"},
      {q:"지난주에 뭐했지",range:"지난 주 전체"},
      {q:"5/13에 뭐했더라",range:"5월 13일"},
      {q:"전체 어제 뭐했더라",range:"모든 프로젝트의 어제"},
    ];
    queries.forEach((q,i)=>{
      const qy=cy+0.87+i*0.88;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:qy,w:C2W,h:0.80,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText('> "'+q.q+'"',{x:C2R+0.18,y:qy+0.05,w:C2W-0.36,h:0.32,fontSize:11,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
      s.addShape(pres.shapes.LINE,{x:C2R+0.15,y:qy+0.41,w:C2W-0.3,h:0,line:{color:C.slate700,width:0.5}});
      s.addText("→ 조회 범위: "+q.range,{x:C2R+0.18,y:qy+0.45,w:C2W-0.36,h:0.30,fontSize:10.5,color:"86EFAC",fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"자동 로그가 쌓이면 \"어제 뭐했더라\"로 언제든 과거 작업을 자연어로 조회할 수 있습니다.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: 자동 업데이트 + 개선 제안 ─────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"자동 업데이트와 개선 제안","설치 후에는 별도 관리 없이 항상 최신 상태");
    const cy=L.contentY;

    // Left: 자동 업데이트
    colHdr(s,pres,L.ml,cy,C2W,"자동 업데이트","0D9488");
    s.addText("Claude Code 세션을 시작할 때마다 gigang-skills가 자동으로 업데이트됩니다.",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.6,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    // Auto-update flow
    const flowItems=[
      {t:"세션 시작",icon:"▶️",color:C.indigo},
      {t:"git pull 실행",icon:"⬇️",color:"0891B2"},
      {t:"install.ps1 재실행",icon:"⚙️",color:"0D9488"},
      {t:"새 기능 즉시 사용",icon:"✅",color:"16A34A"},
    ];
    flowItems.forEach((f,i)=>{
      const fy=cy+1.08+i*0.88;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:fy,w:C2W,h:0.76,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.OVAL,{x:L.ml+0.1,y:fy+0.16,w:0.43,h:0.43,fill:{color:f.color},line:{color:f.color}});
      s.addText(f.icon,{x:L.ml+0.1,y:fy+0.16,w:0.43,h:0.43,fontSize:13,align:"center",valign:"middle",margin:0});
      s.addText(f.t,{x:L.ml+0.63,y:fy,w:C2W-0.73,h:0.76,fontSize:13,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
      if(i<3) s.addText("↓",{x:L.ml,y:fy+0.76,w:C2W,h:0.12,fontSize:10,color:C.slate500,fontFace:FONT,align:"center",valign:"middle",margin:0});
    });

    // Right: 개선 제안
    colHdr(s,pres,C2R,cy,C2W,"개선 제안 & 버그 제보",C.coral);
    s.addText("쓰다가 불편한 점이나 아이디어가 생기면:",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.3,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+0.85,w:C2W,h:0.62,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("/gigang-report",{x:C2R+0.18,y:cy+0.85,w:C2W-0.36,h:0.62,fontSize:14,bold:true,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    const reportSteps=[
      "대화형으로 내용을 입력",
      "GitHub Issue 자동 생성",
      "팀 전체에 공유",
      "함께 개선",
    ];
    reportSteps.forEach((r,i)=>{
      const ry=cy+1.45+i*0.77;
      s.addShape(pres.shapes.OVAL,{x:C2R+0.1,y:ry+0.12,w:0.42,h:0.42,fill:{color:C.coral},line:{color:C.coral}});
      s.addText(String(i+1),{x:C2R+0.1,y:ry+0.12,w:0.42,h:0.42,fontSize:12,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.62,y:ry+0.08,w:C2W-0.72,h:0.58,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addText(r,{x:C2R+0.78,y:ry+0.08,w:C2W-0.95,h:0.58,fontSize:13,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"세션을 시작할 때마다 자동 업데이트됩니다. 불편한 점은 /gigang-report로 팀과 함께 개선하세요.");
    footer(s,pres,DOC,4,TOTAL);
  }

  // ── SLIDE 5: 실습 과제 ──────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"실습 과제","gigang-skills를 직접 사용해봅시다");
    const cy=L.contentY;

    s.addText("Claude Code에서 아래를 순서대로 해보세요:",{x:L.ml,y:cy,w:CW,h:0.32,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    const tasks=[
      {n:"1",title:"로그 확인",cmd:"어제 뭐했더라",note:"아직 로그가 없으면 \"기록 없음\"으로 나옵니다 — 정상입니다"},
      {n:"2",title:"버전 확인",cmd:"/gigang-version",note:"설치된 버전과 최신 여부를 확인합니다"},
      {n:"3",title:"폴더 구조 체험",cmd:"/gigang-folder-guide",note:"대화형으로 프로젝트 폴더를 구성해봅니다"},
    ];
    tasks.forEach((t,i)=>{
      const ty=cy+0.42+i*1.42;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:ty,w:CW,h:1.32,fill:{color:C.white},line:{color:C.slate200,width:0.75}});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:ty,w:CW,h:0.06,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addShape(pres.shapes.OVAL,{x:L.ml+0.15,y:ty+0.18,w:0.48,h:0.48,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(t.n,{x:L.ml+0.15,y:ty+0.18,w:0.48,h:0.48,fontSize:15,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addText(t.title,{x:L.ml+0.78,y:ty+0.16,w:3.5,h:0.52,fontSize:15,bold:true,color:C.inkDark,fontFace:FONT,valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+4.4,y:ty+0.18,w:CW-4.5,h:0.46,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText('> "'+t.cmd+'"',{x:L.ml+4.55,y:ty+0.18,w:CW-4.75,h:0.46,fontSize:12,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
      s.addShape(pres.shapes.LINE,{x:L.ml+0.15,y:ty+0.74,w:CW-0.3,h:0,line:{color:C.slate200,width:0.5}});
      s.addText("💡  "+t.note,{x:L.ml+0.18,y:ty+0.80,w:CW-0.36,h:0.46,fontSize:11,color:C.slate500,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"오늘 설치한 gigang-skills를 직접 체험해봤습니다. 이제 일상 업무에 Claude Code를 활용해보세요!");
    footer(s,pres,DOC,5,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/06-gigang.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
