---
name: gigang-report
description: Gigang Skills 사용 중 에러·문제·개선 아이디어를 GitHub Issue로 제출. "리포트 올려줘", "버그 보고해줘", "이슈 올려줘", "에러 났어", "문제 제보해줘" 등으로 발동. Gigang Skills 자체 문제 맥락이 명확할 때만 발동.
---

# Gigang Report Skill

Gigang Skills 사용 중 발생한 문제·에러·개선 아이디어를 GitHub Issue로 제출한다.

## 실행 순서

### 1. gh CLI 확인

```powershell
gh auth status 2>&1
```

**gh가 없거나 인증 안 된 경우** → 아래 안내 출력 후 사용자가 완료하면 계속:

```
gh (GitHub CLI)가 필요합니다.

1. 설치 (이미 있으면 skip):
   winget install GitHub.cli

2. 로그인 (새 PowerShell 창에서):
   gh auth login
   → "GitHub.com" 선택 → "HTTPS" 선택 → "Login with a web browser" 선택 → 브라우저에서 코드 입력

3. 완료 후 이 창에서 다시 "/gigang-report" 실행하거나
   직접 올리려면: https://github.com/Gigang-ST/gigang-skills/issues/new
```

gh 없이도 진행하고 싶다면 Step 5에서 URL 링크로 안내.

### 2. 이슈 유형 파악

AskUserQuestion으로 유형을 선택받는다:

```
질문: "어떤 종류의 내용을 올릴까요?"
옵션:
  A) 버그 / 에러 — 스킬·커맨드가 오동작하거나 에러 발생
  B) 개선 제안 — 더 잘 됐으면 하는 점
  C) 기능 요청 — 새로 추가됐으면 하는 기능
  D) 기타 — 위에 해당 없음
```

### 3. 세부 내용 수집

AskUserQuestion으로 추가 정보를 받는다:

버그/에러인 경우:
```
질문: "어떤 스킬/커맨드에서 발생했나요? 그리고 어떤 증상이었나요?"
(자유 입력 — Other 선택 유도)
```

개선/기능 요청인 경우:
```
질문: "어떤 내용인지 간단히 설명해줘요."
(자유 입력)
```

### 4. 이슈 제목·본문 생성

수집한 정보를 바탕으로 이슈 제목과 본문을 작성한다.

**제목 형식:**
- 버그: `[Bug] <스킬명> — <한 줄 증상>`
- 개선: `[Enhancement] <한 줄 내용>`
- 기능: `[Feature] <한 줄 내용>`
- 기타: `[Misc] <한 줄 내용>`

**본문 형식 (버그):**
```markdown
## 증상
{사용자가 설명한 내용}

## 재현 방법
{파악된 재현 절차, 모르면 "미확인"}

## 관련 스킬/커맨드
{예: skills/gigang-folder-guide, commands/gigang-init}

## 기대 동작
{어떻게 됐어야 하는지}

## 환경
- 보고자: {git config user.name}
- Gigang Skills 버전: {git -C ~/.gigang-skills log --oneline -1 2>/dev/null 또는 C:\Prog\gigang-skills}
```

**본문 형식 (개선/기능/기타):**
```markdown
## 내용
{사용자가 설명한 내용}

## 보고자
{git config user.name}
```

### 5. 미리보기 후 확인

생성한 제목·본문을 출력하고 AskUserQuestion으로 확인:

```
질문: "이 내용으로 GitHub Issue를 올릴까요?"
옵션:
  A) 예, 올려줘
  B) 내용 수정하고 싶어
  C) 취소
```

B 선택 시 수정할 부분을 물어보고 본문을 업데이트한 뒤 다시 미리보기를 보여준다.

### 6. GitHub Issue 생성

A 선택 시:

**gh 사용 가능한 경우:**

```powershell
gh issue create `
  --repo Gigang-ST/gigang-skills `
  --title "<제목>" `
  --body "<본문>" `
  --label "<label>"
```

라벨 매핑:
- 버그 → `bug`
- 개선 → `enhancement`
- 기능 → `feature`
- 기타 → (라벨 없음)

라벨이 repo에 없으면 `--label` 옵션 생략.

**gh 없거나 인증 실패한 경우:**

직접 올릴 수 있는 링크 안내:
```
gh 없이 직접 올리기: https://github.com/Gigang-ST/gigang-skills/issues/new

아래 내용을 복사해서 붙여넣으세요:

제목: <제목>

본문:
<본문>
```

### 7. 완료 출력

생성된 이슈 URL을 출력한다.

```
Issue 생성 완료: https://github.com/Gigang-ST/gigang-skills/issues/{번호}
```
