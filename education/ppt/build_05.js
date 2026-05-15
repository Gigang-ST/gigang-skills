// build_05.js — 05-security.md → 05-security.pptx
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
  pres.layout="LAYOUT_WIDE"; pres.title="주의사항 & 보안"; pres.author="Team Gigang";
  const TOTAL=4, DOC="Gigang Skills — Agentic AI 교육  CH 05", CH="CH 05 — 주의사항 & 보안";

  // ── SLIDE 1: Title ───────────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.darkSlate};
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:SLIDE_W,h:L.headerH,fill:{color:C.indigo},line:{color:C.indigo}});
    s.addText("CHAPTER 05",{x:0.25,y:0,w:10,h:L.headerH,fontSize:9,bold:true,color:C.white,fontFace:FONT,valign:"middle",charSpacing:1.5,margin:0});
    s.addImage({path:"C:/Prog/PRIVATE/gigang-client/public/logo_white.webp",x:12.77,y:0.075,w:0.4,h:0.4});
    s.addText("05",{x:7.0,y:0.5,w:6.0,h:5.5,fontSize:220,bold:true,color:"1A2E6B",fontFace:FONT,align:"center",valign:"middle",margin:0});
    s.addText([{text:"주의사항",options:{breakLine:true}},{text:"& 보안"}],{x:L.ml,y:1.6,w:7.0,h:3.0,fontSize:58,bold:true,color:C.white,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addText("AI를 잘못 쓰면 보안 사고가 날 수 있습니다",{x:L.ml,y:4.9,w:9.0,h:0.5,fontSize:16,color:C.slate300,fontFace:FONT,align:"left",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:0,y:L.fillY,w:SLIDE_W,h:L.fillH,fill:{color:C.coral},line:{color:C.coral}});
    s.addText("보안은 선택이 아니라 필수입니다",{x:L.ml,y:L.fillY,w:CW,h:L.fillH,fontSize:12,bold:true,color:C.white,fontFace:FONT,valign:"middle",align:"left",margin:0});
    footer(s,pres,DOC,1,TOTAL);
  }

  // ── SLIDE 2: 로그인 사이트 주의 + Playwright 해결 ───────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"로그인이 필요한 사이트 — 주의","AI에게 직접 로그인 정보를 주지 마세요");
    const cy=L.contentY;

    // Left: 보안 위험
    colHdr(s,pres,L.ml,cy,C2W,"⚠️  직접 시키면 안 되는 것","DC2626");
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.48,w:C2W,h:0.62,fill:{color:"FFF1F0"},line:{color:"FCA5A5",width:0.75}});
    s.addText('"이 사이트에 로그인해서 데이터 가져와"',{x:L.ml+0.18,y:cy+0.48,w:C2W-0.36,h:0.62,fontSize:11,color:"DC2626",fontFace:"Consolas",valign:"middle",margin:0});
    s.addText("왜 위험한가?",{x:L.ml+0.15,y:cy+1.2,w:C2W-0.3,h:0.28,fontSize:12,bold:true,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    const dangers=[
      "계정 정보를 AI에게 직접 노출",
      "사이트 이용약관 위반 가능",
      "개인 계정 보안 위험",
    ];
    dangers.forEach((d,i)=>{
      const dy=cy+1.55+i*0.72;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:dy,w:C2W,h:0.62,fill:{color:"FFF1F0"},line:{color:"FCA5A5",width:0.5}});
      s.addText("❌  "+d,{x:L.ml+0.18,y:dy,w:C2W-0.36,h:0.62,fontSize:12,color:"DC2626",fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: Playwright 해결법
    colHdr(s,pres,C2R,cy,C2W,"✅  올바른 접근법: Playwright MCP",C.indigo);
    s.addText('비유: "내가 문 열어줄 테니 그 다음은 네가 해"',{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.28,fontSize:11.5,italic:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    const pwSteps=[
      "Playwright MCP 플러그인 설치 (강사 사전 설치 or 부록 E)",
      "Claude Code에 지시: \"브라우저 열어줘. 내가 로그인하면 그 다음에 데이터 가져와줘.\"",
      "브라우저가 열리면 내가 직접 로그인",
      "로그인 완료 → AI가 이어서 작업",
    ];
    pwSteps.forEach((st,i)=>{
      const sy=cy+0.85+i*0.88;
      s.addShape(pres.shapes.OVAL,{x:C2R+0.1,y:sy+0.1,w:0.42,h:0.42,fill:{color:C.indigo},line:{color:C.indigo}});
      s.addText(String(i+1),{x:C2R+0.1,y:sy+0.1,w:0.42,h:0.42,fontSize:12,bold:true,color:C.white,fontFace:FONT,align:"center",valign:"middle",margin:0});
      s.addShape(pres.shapes.RECTANGLE,{x:C2R+0.62,y:sy+0.05,w:C2W-0.72,h:0.70,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText(st,{x:C2R+0.78,y:sy+0.05,w:C2W-0.95,h:0.70,fontSize:11,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"내가 직접 로그인하고, AI는 로그인 이후 단계만 처리하도록 분리하면 안전합니다.");
    footer(s,pres,DOC,2,TOTAL);
  }

  // ── SLIDE 3: 개인정보 + 프롬프트 로그 ──────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"개인정보 & 프롬프트 로그 주의","AI에게 무엇을 줘도 되는지 확인하세요");
    const cy=L.contentY;

    // Left: 개인정보 금지/허용
    colHdr(s,pres,L.ml,cy,C2W,"개인정보 & 민감 데이터","DC2626");
    // 금지
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+0.48,w:C2W,h:0.32,fill:{color:"FFF1F0"},line:{color:"FCA5A5",width:0.75}});
    s.addText("AI에 입력하면 안 되는 것",{x:L.ml+0.18,y:cy+0.48,w:C2W-0.36,h:0.32,fontSize:11,bold:true,color:"DC2626",fontFace:FONT,valign:"middle",margin:0});
    const bads=["개인정보 (이름·연락처·주소)","내부 기밀 자료","비밀번호 · API 키 · 인증 토큰","미공개 계획이나 전략"];
    bads.forEach((b,i)=>{
      const by=cy+0.88+i*0.52;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:by,w:C2W,h:0.45,fill:{color:"FFF1F0"},line:{color:"FCA5A5",width:0.5}});
      s.addText("❌  "+b,{x:L.ml+0.18,y:by,w:C2W-0.36,h:0.45,fontSize:11.5,color:"DC2626",fontFace:FONT,valign:"middle",margin:0});
    });
    // 허용
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy+2.98,w:C2W,h:0.30,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.75}});
    s.addText("괜찮은 것",{x:L.ml+0.18,y:cy+2.98,w:C2W-0.36,h:0.30,fontSize:11,bold:true,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    const goods=["익명화된 데이터","이미 공개된 정보"];
    goods.forEach((g,i)=>{
      const gy=cy+3.28+i*0.50;
      s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:gy,w:C2W,h:0.44,fill:{color:"F0FDF4"},line:{color:"86EFAC",width:0.5}});
      s.addText("✅  "+g,{x:L.ml+0.18,y:gy,w:C2W-0.36,h:0.44,fontSize:11.5,color:"16A34A",fontFace:FONT,valign:"middle",margin:0});
    });

    // Right: 프롬프트 로그 주의
    colHdr(s,pres,C2R,cy,C2W,"프롬프트 로그 주의","D97706");
    s.addText("gigang-skills 설치 후 Claude Code 세션의 프롬프트·응답이 자동으로 저장됩니다.",{x:C2R+0.15,y:cy+0.47,w:C2W-0.3,h:0.6,fontSize:12,color:C.slate700,fontFace:FONT,valign:"top",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:cy+1.15,w:C2W,h:0.62,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addText("~/.claude/logs/prompts/<프로젝트>/YYYY-MM-DD.md",{x:C2R+0.18,y:cy+1.15,w:C2W-0.36,h:0.62,fontSize:9.5,color:"7DD3FC",fontFace:"Consolas",valign:"middle",margin:0});
    const logWarnings=[
      {icon:"⚠️",text:"로그 파일은 평문(텍스트)으로 저장됩니다"},
      {icon:"🔑",text:"비밀번호·API 키를 프롬프트에 직접 입력하지 마세요"},
      {icon:"👁️",text:"로그 파일이 유출되면 입력 내용이 노출됩니다"},
    ];
    logWarnings.forEach((w,i)=>{
      const wy=cy+1.83+i*0.85;
      s.addShape(pres.shapes.RECTANGLE,{x:C2R,y:wy,w:C2W,h:0.78,fill:{color:"FFFBEB"},line:{color:"FCD34D",width:0.75}});
      s.addText(w.icon,{x:C2R+0.1,y:wy+0.06,w:0.55,h:0.66,fontSize:18,align:"center",valign:"middle",margin:0});
      s.addText(w.text,{x:C2R+0.72,y:wy,w:C2W-0.85,h:0.78,fontSize:12,color:"92400E",fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"개인정보와 비밀번호는 절대 AI에게 주지 마세요. 로그 파일에도 그대로 저장됩니다.");
    footer(s,pres,DOC,3,TOTAL);
  }

  // ── SLIDE 4: 한 줄 원칙 ─────────────────────────────────────────────
  {
    const s=pres.addSlide(); s.background={color:C.white};
    header(s,pres,CH); tb(s,pres,"한 줄 원칙","판단이 어려울 때 이 질문 하나면 됩니다");
    const cy=L.contentY;

    // Big quote card
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy,w:CW,h:2.65,fill:{color:C.darkSlate},line:{color:C.darkSlate}});
    s.addShape(pres.shapes.RECTANGLE,{x:L.ml,y:cy,w:0.12,h:2.65,fill:{color:C.coral},line:{color:C.coral}});
    s.addText('"',{x:L.ml+0.25,y:cy+0.05,w:0.8,h:0.9,fontSize:60,bold:true,color:C.coral,fontFace:FONT,valign:"top",margin:0});
    s.addText("내가 이걸 인터넷에 올려도 괜찮나?",{x:L.ml+0.35,y:cy+0.75,w:CW-0.6,h:0.65,fontSize:22,bold:true,color:C.white,fontFace:FONT,valign:"middle",margin:0});
    s.addText("라고 생각해보고, 아니면 AI에게도 주지 말자.",{x:L.ml+0.35,y:cy+1.45,w:CW-0.6,h:0.55,fontSize:18,color:C.slate300,fontFace:FONT,valign:"middle",margin:0});
    s.addText('"',{x:CW-0.2,y:cy+1.55,w:0.8,h:0.9,fontSize:60,bold:true,color:C.coral,fontFace:FONT,valign:"top",align:"right",margin:0});

    // Summary checklist
    s.addText("보안 체크리스트",{x:L.ml,y:cy+2.82,w:CW,h:0.35,fontSize:14,bold:true,color:C.indigo,fontFace:FONT,valign:"middle",margin:0});
    const checks=[
      "로그인 정보를 AI에게 직접 주지 않는다",
      "개인정보·기밀 자료는 익명화 후 사용한다",
      "프롬프트에 비밀번호·API 키를 입력하지 않는다",
      "로그인이 필요하면 Playwright MCP를 활용한다",
    ];
    const chW=(CW-0.3)/2;
    checks.forEach((c,i)=>{
      const col=i%2, row=Math.floor(i/2);
      const cx=L.ml+col*(chW+0.3), cy2=cy+3.28+row*0.74;
      s.addShape(pres.shapes.RECTANGLE,{x:cx,y:cy2,w:chW,h:0.68,fill:{color:C.iceIndigo},line:{color:C.slate200,width:0.5}});
      s.addText("✅",{x:cx+0.1,y:cy2,w:0.55,h:0.68,fontSize:16,align:"center",valign:"middle",margin:0});
      s.addText(c,{x:cx+0.7,y:cy2,w:chW-0.82,h:0.68,fontSize:11.5,color:C.slate700,fontFace:FONT,valign:"middle",margin:0});
    });

    bfill(s,pres,"\"인터넷에 올려도 괜찮나?\" — 이 한 가지 기준으로 AI에게 줄 정보를 판단하세요.");
    footer(s,pres,DOC,4,TOTAL);
  }

  const outPath="C:/Prog/PRIVATE/gigang_skills/education/ppt/output/05-security.pptx";
  await pres.writeFile({fileName:outPath});
  console.log("✅  "+outPath);
}
build().catch(err=>{console.error(err);process.exit(1);});
