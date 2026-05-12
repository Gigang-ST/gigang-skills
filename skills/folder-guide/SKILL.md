---
name: folder-guide
description: 비개발자를 위한 대화형 폴더 구조 가이드. "폴더 구조 잡아줘", "폴더 정리해줘", "프로젝트 디렉토리 만들어줘" 등으로 발동.
---

# Folder Guide Skill

비개발자가 프로젝트 폴더를 일관성 있게 정리할 수 있도록 대화형으로 안내한다.
**폴더를 만들기 전에 반드시 구조를 먼저 보여주고 확인을 받는다.**

## 실행 순서

### 1. 현재 디렉토리 스캔

Read 또는 Bash로 현재 디렉토리의 파일/폴더 목록을 확인한다:

```powershell
Get-ChildItem -Depth 1 | Select-Object Name, PSIsContainer
```

기존 파일이 있으면 나중에 이동 여부를 물어봐야 함을 기억해 둔다.

### 2. 프로젝트 유형 질문

AskUserQuestion으로 유형을 선택받는다:

```
질문: "이 프로젝트는 주로 어떤 작업인가요?"
옵션:
  A) 업무문서 — 보고서, 엑셀, PPT 등 일반 업무 파일
  B) AI 활용 — Claude/GPT 프롬프트와 결과물 관리
  C) 데이터 분석 — 데이터 처리, 분석, 차트 생성
  D) 복합 — 위 여러 유형이 섞여 있음
```

D(복합) 선택 시 추가 질문으로 어떤 유형을 조합할지 확인한다.

### 3. 폴더 구조 제안 출력

`skills/folder-guide/templates.md` 를 읽어 해당 유형의 구조를 트리 형태로 출력한다.

복합형은 선택된 유형들의 폴더를 합친 구조를 제안한다 (중복 폴더 제거).

### 4. 애매한 항목 확인

기존 파일이 있으면 AskUserQuestion으로 확인:

```
질문: "기존 파일을 새 폴더 구조에 맞게 이동할까요?"
옵션:
  A) 예, 자동으로 이동해줘
  B) 아니요, 빈 폴더만 만들어줘
  C) 나중에 직접 할게요
```

### 5. 폴더 생성

사용자 확인 후 PowerShell로 폴더를 생성한다:

```powershell
# 예시: 데이터 분석형
New-Item -ItemType Directory -Force "data\raw"
New-Item -ItemType Directory -Force "data\processed"
New-Item -ItemType Directory -Force "analysis"
New-Item -ItemType Directory -Force "outputs\figures"
New-Item -ItemType Directory -Force "outputs\reports"
New-Item -ItemType Directory -Force "docs"
```

### 6. 루트 파일 생성

`todo.md`와 `notes.md`가 없으면 templates.md의 템플릿으로 생성한다.
이미 있으면 덮어쓰지 않는다.

### 7. 기존 파일 이동 (Step 4에서 A 선택 시)

파일 목록을 보여주며 AskUserQuestion으로 각 파일의 이동 위치를 확인한다.
확인 후 PowerShell Move-Item으로 이동한다.

### 8. 경로 참조 업데이트

Grep으로 이전 경로 패턴을 스캔한다:

```
대상 파일: .md, .py, .ps1, .json, .txt
패턴: 파일 이동 전의 전체 경로(예: data/raw/report.csv)를 그대로 검색
  → 파일명만 검색하면 관련 없는 줄까지 걸림
```

영향받는 파일 목록을 출력하고 AskUserQuestion으로 확인:

```
질문: "다음 파일에서 경로 참조를 자동으로 업데이트할까요?"
옵션:
  A) 예, 모두 업데이트
  B) 직접 확인하면서 하나씩
  C) 건너뛰기
```

확인 후 Edit으로 경로를 일괄 치환한다.

### 9. CLAUDE.md 길이 체크

CLAUDE.md가 있으면 줄 수를 확인:

```powershell
(Get-Content CLAUDE.md | Measure-Object -Line).Lines
```

150줄 초과이면 AskUserQuestion으로 분리 여부 확인:

```
질문: "CLAUDE.md가 {N}줄입니다. 내용을 분리해서 관리하기 쉽게 할까요?"
옵션:
  A) 예, 분리해줘
  B) 아니요, 그대로 유지
```

A 선택 시:
1. 폴더 구조·네이밍 규칙 → `docs/folder-conventions.md` 로 추출
   (예: "outputs/ 에 최종 결과물 저장", "raw/ 는 절대 수정 금지" 등)
2. AI 작업 지시사항 → `docs/ai-context.md` 로 추출
   (예: 언어 설정, 응답 스타일, 프롬프트 지침 등)
3. 나머지(hook, 커밋 규칙, 도구 허용 목록 등)는 CLAUDE.md에 그대로 유지
4. CLAUDE.md 상단에 `@docs/folder-conventions.md`, `@docs/ai-context.md` 참조 삽입

### 10. 완료 요약

생성된 폴더 목록, 이동한 파일 수, 업데이트한 경로 참조 수를 요약 출력한다.
