# 기강 PPT 디자인 시스템

> 기강 러닝팀 브랜드 아이덴티티를 기반으로 한 프레젠테이션 디자인 가이드.

## Overview

기강의 비주얼 언어는 **역동적이고 절제된 스포츠 팀** 감성을 중심으로 한다.
로고의 강렬한 캘리그래피와 원형 배지 형태에서 착안해
**인디고 블루** 계열의 선명한 주색을 바탕으로, 깔끔한 흰색과 깊은 다크 슬레이트를 대비시킨다.

OMRON의 기업 체계와 달리, 기강 PPT는 **팀 커뮤니티 발표** (모임 소개, 활동 보고, 교육) 목적에 최적화되었다.

---

## Colors

### Brand & Accent

| Role | Name | Hex |
|------|------|-----|
| Primary Brand | Gigang Indigo | `#4369E9` |
| Indigo Active | Deep Indigo | `#3254CC` |
| Indigo Soft | Pale Indigo | `#C7D2FE` |
| Accent Energy | Vivid Coral | `#F05A28` |
| Accent Warm | Amber | `#D97706` |

### Surface

| Role | Name | Hex |
|------|------|-----|
| Default Background | Pure White | `#FFFFFF` |
| Light Tint | Ice Indigo | `#EEF2FF` |
| Dark Surface | Dark Slate | `#0F172A` |
| Dark Elevated | Slate 800 | `#1E293B` |
| Hairline | Border Soft | `#E2E8F0` |

### Text

| Role | Name | Hex |
|------|------|-----|
| Primary Text | Ink Dark | `#0F172A` |
| Body Text | Slate 700 | `#334155` |
| Secondary Text | Slate 500 | `#64748B` |
| On Dark | Off White | `#F8FAFC` |
| On Dark Soft | Slate 300 | `#CBD5E1` |

**Color usage rules:**
- Gigang Indigo (`#4369E9`) — 헤더 바, 키 UI 요소, 버튼, 강조 셰이프
- Dark Slate (`#0F172A`) — 타이틀 슬라이드, 섹션 구분, 풀 블리드 배경
- Ice Indigo (`#EEF2FF`) — 데이터 슬라이드, 카드 배경
- Vivid Coral (`#F05A28`) — 에너지 강조 (Bottom Fill Zone Key Takeaway 등)
- 슬라이드 배경은 White, Ice Indigo, Dark Slate 셋 중 하나. 웜 톤 베이지는 사용하지 않는다.

---

## Typography

### Font Stack
- **Primary font:** Pretendard (Korean/Latin 혼용 최적화)
- **Fallback:** Noto Sans KR → Calibri → Arial

### Type Scale

| Element | Weight | Size | Color |
|---------|--------|------|-------|
| Chapter label | Bold | 10pt | `#FFFFFF` on header bar |
| Slide title | Bold | 32-36pt | `#0F172A` (light) / `#F8FAFC` (dark) |
| Slide subtitle | Regular | 18-20pt | `#64748B` (light) / `#CBD5E1` (dark) |
| Section header | Bold | 16-18pt | `#4369E9` |
| Body text | Regular | 13-15pt | `#334155` |
| Stat number | Bold | 36-48pt | `#4369E9` |
| Stat label | Regular | 11pt | `#64748B` |
| Caption / footnote | Regular | 10pt | `#64748B` |
| Footer text | Regular | 9pt | `#64748B` |

### Typography rules
- 본문·불릿·캡션 모두 왼쪽 정렬
- 타이틀 슬라이드 헤드라인과 대형 숫자만 중앙 정렬
- 제목과 본문 크기 비율 최소 2:1 유지
- WordArt, 텍스트 그림자, 3D 효과 금지

---

## Fixed Layout Zones

```
+----------------------------------------------------------+  <- 0
|  HEADER BAR (Indigo #4369E9, H: 1.4cm)                  |
|  [CHAPTER LABEL -- left]     [기강 LOGO -- right]         |
+----------------------------------------------------------+  <- 1.4cm
|                                                          |
|  TITLE ZONE (Y: 2.0cm)                                   |
|  [Slide Title -- 32-36pt Bold]                           |
|  [Subtitle -- 18-20pt, below title]                      |
|                                                          |  <- ~4.2cm
+- - - - - - - - - - - - - - - - - - - - - - - - - - - -  +
|                                                          |
|  CONTENT ZONE (Y: 4.5cm to 16.5cm)                       |
|  [Main body — columns, cards, charts, bullets, images]   |
|                                                          |
|  BOTTOM FILL ZONE — flush against footer bar             |
|  [Key takeaway bar / stat row / source / action strip]   |
|                                                          |
+----------------------------------------------------------+  <- 17.0cm
|  FOOTER BAR (1px Border line top, H: 0.7cm)             |
|  [Document title -- left]            [Slide number -- right] |
+----------------------------------------------------------+  <- 19.05cm
```

### Zone Specifications

**Header Bar**
- X=0, Y=0; Width=full, Height=1.4cm; Background: `#4369E9`
- Chapter label: 10pt Bold, White, ALL CAPS, charSpacing 1.5pt
- 기강 Logo: Right-aligned, vertically centered; white version

**Title Zone**
- Title: X=0.9cm, Y=1.7cm; 32-36pt Bold, `#0F172A`
- Subtitle: X=0.9cm, Y=3.2cm; 18-20pt, `#64748B`
- Pale divider hairline: `#E2E8F0`, 1pt

**Content Zone**
- Y=4.5cm ~ 16.5cm; left/right margin: 0.9cm

**Bottom Fill Zone (REQUIRED)**
- Footer 바에 밀착. 빈 공간 금지.
- Key Takeaway Bar 구조 (권장):
  - Background: Dark Slate `#0F172A`, full width
  - Left accent strip: Gigang Indigo `#4369E9`, width ~0.18"
  - Label: 13pt Bold, Pale Indigo `#C7D2FE`
  - Body: 13pt Regular, White `#FFFFFF`

**Footer Bar**
- Y=18.35cm; Height=0.7cm; Top: 1pt `#E2E8F0`
- Left: 문서 제목, 9pt, `#64748B`
- Right: `03 / 12`, 9pt, `#64748B`

---

## Slide Type Library

### TYPE A — Title Slide
- Full-bleed: Dark Slate `#0F172A`
- Title: 40-48pt Bold, White, left or center
- Subtitle: 22pt, `#CBD5E1`
- Bottom: Indigo accent bar + 발표자명/날짜
- Logo: white version, top-right

### TYPE B — Standard Content Slide
- Background: White
- Header: Indigo bar + white logo
- Content: 2-column, 3-column, icon grid, mixed layout

### TYPE C — Data / KPI Slide
- Background: Ice Indigo `#EEF2FF`
- 3-4 large stat callouts (48pt, `#4369E9`)

### TYPE D — Visual / Diagram Slide
- Timeline, process flow, comparison table

### TYPE E — Two-Column Slide
- Left (60%): text; Right (40%): visual

### TYPE F — Section Divider
- Full-bleed: Gigang Indigo `#4369E9`
- Chapter number: 80pt, white, semi-transparent
- Chapter title: 40pt Bold White

---

## Logo Usage

### 기강 로고 파일
- 원본: `C:\Prog\PRIVATE\gigang-client\public\logo.webp` (흑백, 1774×1774px)
- 흰색 버전: `C:\Prog\PRIVATE\gigang-client\public\logo_white.webp` (567×567px)
- SVG: `C:\Prog\PRIVATE\gigang-client\public\icon.svg`

### 슬라이드 배치
- 밝은 배경 슬라이드: 흑백 `logo.webp` 또는 SVG
- 어두운 배경 슬라이드: `logo_white.webp`
- 헤더 바 우측 배치, 높이 약 1cm
- 왜곡·회전·색상 변경 금지

---

## Bullet & Text Emphasis

### Bullet Style
- Marker: `U+2022` (•), Gigang Indigo `#4369E9`, Bold
- 불릿 기호 뒤 두 칸 공백
- 최대 5불릿/컬럼

### Inline Bold
- 핵심 단어·수치만 Bold — 슬라이드당 2개 이하

---

## Production Checklist

- [ ] 전체 16:9 (33.87 × 19.05cm)
- [ ] 모든 슬라이드에 헤더 바 일치
- [ ] 기강 로고 올바른 위치
- [ ] Chapter label 섹션별 업데이트
- [ ] Title Y좌표 동일
- [ ] Bottom Fill Zone 항상 존재, Footer와 밀착
- [ ] 승인된 팔레트 외 색상 사용 금지
- [ ] 불릿 마커: Gigang Indigo `#4369E9`
- [ ] 폰트: Pretendard 통일

---

## Revision History

| Version | Changes |
|---------|---------|
| v1.0 | 기강 브랜드 기반 초기 제작 (4brain-skills education 적용) |
