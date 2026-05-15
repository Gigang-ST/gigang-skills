// build_04.js — 04-usage.md → 04-usage.pptx
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
  pres.layout="LAYOUT_WIDE"; pres.title="기본 사용법 & 단축키"; pres.author="Team Gigang";
  const TOTAL=5, DOC="Gigang Skills — Agentic AI 교육  CH 04", CH="CH 04 — 기본 사용법 & 단축키";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("CHAPTER 04",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("04",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:220,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"기본 사용법",options:{breakLine:true}},{text:"& 단축키"}],{x:L.ml,y:1.6,w:7.0,h:3.0,fontSize:52,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("Claude Code 실행 · 명령 입력 · 단축키 · 토큰 관리",{x:L.ml,y:4.9,w:9.0,h:0.5,fontSize:16,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("Team Gigang  ·  2026",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:11,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: 실행 & 명령 입력 ───────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"Claude Code 실행과 명령 입력","PowerShell을 열고 claude 입력 — 그 다음은 자연어로 지시");
    const cy=L.contentY;

    // Left: 실행 방법
    colHdr(s,pres,L.ml,cy,C2W,"Claude Code 실행",C.indigo);
    s.addText("PowerShell을 열고:",{x:L.ml+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.82,w:C2W,h:0.62,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("claude",{x:L.ml+0.2,y:cy+0.82,w:C2W-0.4,h:0.62,fontSize:18,bold:true,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+1.55,w:C2W,h:0.55,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("✅  > 프롬프트가 나타나면 준비 완료",{x:L.ml+0.18,y:cy+1.55,w:C2W-0.36,h:0.55,fontSize:11.5,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    s.addText("종료 방법:",{x:L.ml+0.15,y:cy+2.22,w:C2W-0.3,h:0.28,fontSize:11,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.58,w:C2W,h:0.52,fill:{color:C.slate100},line:{color:C.slate200,width:0.5}});
    s.addText("Ctrl+C 두 번  또는  exit 입력",{x:L.ml+0.18,y:cy+2.58,w:C2W-0.36,h:0.52,fontSize:11,color:C.slate700,fontFace:"Consolas",valign:"middle",margin:0});
    // Tip
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+3.22,w:C2W,h:1.0,fill:{color:C.iceIndigo},line:{color:C.indigo,width:0.75}});
    s.addText("cc 단축 별칭 사용 가능",{x:L.ml+0.2,y:cy+3.28,w:C2W-0.4,h:0.28,fontSize:12,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    s.addText("gigang-init 설치 후 cc 명령으로 claude를 더 빠르게 실행할 수 있습니다.",{x:L.ml+0.2,y:cy+3.6,w:C2W-0.4,h:0.55,fontSize:11,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    // Right: 명령 입력
    colHdr(s,pres,C2R,cy,C2W,"자연어로 지시하기",C.coral);
    s.addText("완벽한 문장이 아니어도 됩니다. 말하듯 지시하세요.",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.3,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const cmds=[
      {cmd:"보고서 초안 작성해줘",icon:"📄"},
      {cmd:"이 파일 읽고 요약해줘",icon:"📋"},
      {cmd:"오타 찾아서 고쳐줘",icon:"✏️"},
    ];
    cmds.forEach((c,i)=>{
      const cy2=cy+0.82+i*1.08;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy2,w:C2W,h:1.00,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(c.icon,{x:C2R+0.12,y:cy2+0.08,w:0.55,h:0.45,fontSize:20,align:"center",valign:"middle",margin:0});
      s.addText(`> ${c.cmd}`,{x:C2R+0.75,y:cy2+0.10,w:C2W-0.9,h:0.38,fontSize:12,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
      s.addShape(pres.shapes.LINE,{x:C2R+0.15,y:cy2+0.55,w:C2W-0.3,h:0,line:{color:C.slate700,width:0.5}});
      s.addText("AI가 자동으로 처리 →  결과를 파일로 저장",{x:C2R+0.15,y:cy2+0.62,w:C2W-0.3,h:0.34,fontSize:10.5,color:"86EFAC",fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"PowerShell에서 claude 입력 후 자연어로 지시하면 됩니다. 완벽한 문장이 아니어도 AI가 이해합니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: 단축키 + 컨텍스트 명령어 ─────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"필수 단축키와 컨텍스트 명령어","알아두면 작업이 훨씬 편해집니다");
    const cy=L.contentY;

    // Left: 단축키
    colHdr(s,pres,L.ml,cy,C2W,"필수 단축키",C.indigo);
    const hotkeys=[
      {key:"Ctrl+C",desc:"실행 중인 작업 취소/중단","bg":"FFF1F0","bc":"FCA5A5","tc":"DC2626"},
      {key:"Ctrl+V",desc:"붙여넣기 (터미널 내)",bg:C.iceIndigo,bc:C.slate200,tc:C.slate700},
      {key:"↑ 화살표",desc:"이전 명령어 불러오기",bg:C.iceIndigo,bc:C.slate200,tc:C.slate700},
    ];
    hotkeys.forEach((hk,i)=>{
      const hy=cy+0.47+i*1.42;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:hy,w:C2W,h:1.28,fill:{color:hk.bg},line:{color:hk.bc,width:0.75}});
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml+0.15,y:hy+0.2,w:2.5,h:0.52,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(hk.key,{x:L.ml+0.15,y:hy+0.2,w:2.5,h:0.52,fontSize:14,bold:true,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(hk.desc,{x:L.ml+0.15,y:hy+0.82,w:C2W-0.3,h:0.38,fontSize:12,color:hk.tc,fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: 컨텍스트 명령어
    colHdr(s,pres,C2R,cy,C2W,"컨텍스트 관리 명령어",C.coral);
    s.addText("Claude Code 안에서 / 로 시작하는 명령어:",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const cmds2=[
      {cmd:"/clear",when:"새 작업 시작 (기억 초기화)"},
      {cmd:"/compact",when:"대화가 길어져 느려질 때"},
      {cmd:"/context",when:"현재 사용량 확인"},
      {cmd:"/usage",when:"토큰 사용량 확인"},
      {cmd:"/resume",when:"토큰 충전 후 이어서"},
    ];
    cmds2.forEach((c,i)=>{
      const cy2=cy+0.82+i*0.76;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy2,w:C2W,h:0.68,fill:{color:i%2===0?C.iceIndigo:C.white},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.1,y:cy2+0.13,w:1.65,h:0.42,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
      s.addText(c.cmd,{x:C2R+0.1,y:cy2+0.13,w:1.65,h:0.42,fontSize:11,bold:true,color:"7DD3FC",fontFace:"Consolas",align:"center",valign:"middle",margin:0});
      s.addText(c.when,{x:C2R+1.85,y:cy2,w:C2W-1.95,h:0.68,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"Ctrl+C로 작업을 중단하고, /clear로 새 작업을 시작하며, /compact로 긴 대화를 압축하세요.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: 토큰 관리 ─────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.iceIndigo};
    header(s,pres,CH); tb(s,pres,"토큰이 다 떨어지면?","당황하지 말고 3단계를 따르세요");
    const cy=L.contentY;

    // 3-step flow
    const steps=[
      {n:"1",title:"잠깐 대기",desc:"AI가 '토큰 한도에 도달했습니다'\n메시지를 보냅니다.\n충전 시점은 플랜에 따라 다름 —\n팀 관리자에게 문의",icon:"⏳",color:C.slate700},
      {n:"2",title:"Claude Code 재실행",desc:"PowerShell을 닫고\n새로 열어서\nclaude 입력",icon:"🔄",color:"0891B2"},
      {n:"3",title:"/resume 으로 이어서",desc:"Claude Code 안에서\n/resume 입력\n이전 작업을\n자동으로 이어서 진행",icon:"▶️",color:"0D9488"},
    ];
    const sw=(CW-0.6)/3;
    steps.forEach((st,i)=>{
      const sx=L.ml+i*(sw+0.3);
      s.addShape(pres.shapes.RECTANGLE,{x:sx,y:cy,w:sw,h:3.85,fill:{color:C.white},line:{color:C.slate200,width:0.75}});
      s.addShape(pres.shapes.RECTANGLE,{x:sx,y:cy,w:sw,h:0.06,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addShape(pres.shapes.OVAL,{x:sx+sw/2-0.42,y:cy+0.22,w:0.84,h:0.84,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(st.n,{x:sx+sw/2-0.42,y:cy+0.22,w:0.84,h:0.84,fontSize:22,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addText(st.icon,{x:sx,y:cy+1.08,w:sw,h:0.60,fontSize:26,align:"center",valign:"middle",margin:0});
      s.addText(st.title,{x:sx+0.15,y:cy+1.75,w:sw-0.3,h:0.45,fontSize:14,bold:true,color:C.inkDark,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addText(st.desc,{x:sx+0.15,y:cy+2.28,w:sw-0.3,h:1.48,fontSize:11.5,color:C.slate700,fontFace:FONT,align:"center",valign:"top",margin:0});
      if(i<2) s.addText("→",{x:sx+sw,y:cy+1.65,w:0.3,h:0.7,fontSize:20,bold:true,color:C.slate500,fontFace:FONT,align:"center",valign:"middle",margin:0});
    });

    // Tip
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+3.98,w:CW,h:0.40,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
    s.addText('💡  중요한 작업은 중간중간 "지금까지 한 것 파일로 저장해줘"라고 요청하는 습관을 들이세요.',{x:L.ml+0.2,y:cy+3.98,w:CW-0.4,h:0.40,fontSize:11,color:"92400E",fontFace:FONT,valign:"middle",margin:0});

    bfill(s,pres,"토큰 한도는 계획된 제한입니다. /resume 으로 이어서 작업하면 되니 당황하지 마세요.");
    footer(s,pres,DOC,4,TOTAL);
  }

  // ── SLIDE 5: 실습 과제 ──────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"실습 과제","Claude Code를 직접 실행하고 명령을 입력해보세요");
    const cy=L.contentY;

    s.addText("아래 명령을 그대로 입력해보세요:",{x:L.ml,y:cy,w:CW,h:0.32,fontSize:13,color:C.slate700,fontFace:FONT,valign:"top",margin:0});

    // Main practice command
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.4,w:CW,h:1.85,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("$ claude",{x:L.ml+0.25,y:cy+0.48,w:CW-0.5,h:0.32,fontSize:12,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText('> 안녕, 나는 기강 러닝팀 멤버야.\n  오늘 처음 Claude Code를 시작했어.\n  내 이름과 팀명으로 자기소개 문장 3개 만들어줘.',{x:L.ml+0.25,y:cy+0.85,w:CW-0.5,h:1.3,fontSize:12,color:"86EFAC",fontFace:"Consolas",valign:"top",margin:0});

    // Usage check
    s.addText("결과를 확인한 후, 토큰 사용량도 확인해보세요:",{x:L.ml,y:cy+2.38,w:CW,h:0.3,fontSize:12,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.75,w:CW/2-0.15,h:0.62,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("/usage",{x:L.ml+0.25,y:cy+2.75,w:CW/2-0.5,h:0.62,fontSize:12,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});

    // 3 boxes what to notice
    const boxes=[
      {n:"1",text:"AI가 생성한 자기소개 문장 3개 읽기"},
      {n:"2",text:"/usage 결과에서 토큰 사용량 숫자 확인"},
      {n:"3",text:"/clear 후 새 지시 하나 더 해보기"},
    ];
    boxes.forEach((b,i)=>{
      const bx=L.ml+i*(CW/3+0.15/3);
      const bw=CW/3-0.15;
      const by=cy+3.55;
      s.addShape(pres.shapes.RECTANGLE,{x:bx,y:by,w:bw,h:0.88,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addShape(pres.shapes.OVAL,{x:bx+0.15,y:by+0.2,w:0.48,h:0.48,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(b.n,{x:bx+0.15,y:by+0.2,w:0.48,h:0.48,fontSize:14,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addText(b.text,{x:bx+0.72,y:by,w:bw-0.85,h:0.88,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"첫 번째 Claude Code 실습 완료! 다음 시간에는 실제 업무에 적용해봅니다.");
    footer(s,pres,DOC,5,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/04-usage.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
