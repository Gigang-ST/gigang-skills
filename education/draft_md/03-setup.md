# 설치 가이드

> Claude Code와 gigang-skills를 설치합니다. 각 단계 완료 시 [OK] 표시하세요.

**설치 순서:** Claude Code → Git → GitHub CLI → GH 인증 → gigang-skills → gigang-init

## 터미널이란?

**비유:** 컴퓨터에게 문자로 직접 명령하는 창.
마우스 클릭 대신 글자를 입력해서 컴퓨터를 조작한다.

Windows에서는 **PowerShell** 또는 **Windows Terminal**을 사용한다.

여는 방법: `Win + R` → `powershell` 입력 → Enter

## Step 1: Claude Code 설치 [ ]

PowerShell에 아래 명령어를 복사해서 붙여넣고 Enter:

```powershell
winget install Anthropic.ClaudeCode
```

완료 확인:
```powershell
claude --version
```
버전 숫자가 나오면 [OK]
> ※ 명령어를 찾을 수 없다면 PowerShell 창을 닫고 새로 열어보세요.

## Step 2: Git 설치 [ ]

```powershell
winget install Git.Git
```

완료 확인:
```powershell
git --version
```
`git version 2.x.x` 가 나오면 [OK]

## Step 3: GitHub CLI 설치 [ ]

```powershell
winget install -e --id GitHub.cli --accept-package-agreements --accept-source-agreements
```

완료 확인:
```powershell
gh --version
```
버전 숫자가 나오면 [OK]

## Step 4: GitHub 인증 [ ]

> ⚠️ 이 단계는 브라우저가 열립니다. 강사 안내에 따라 진행하세요.
gigang-skills는 GitHub에서 내려받는 비공개 저장소입니다. 인증이 필요합니다.

새 PowerShell 창을 열고:
```powershell
gh auth login
```

1. `GitHub.com` 선택
2. `HTTPS` 선택
3. `Login with a web browser` 선택
4. 브라우저에서 GitHub 로그인 완료
5. PowerShell로 돌아와 인증 완료 확인

완료 확인:
```powershell
gh auth status
```
`Logged in to github.com` 이 나오면 [OK]

## Step 5: gigang-skills 설치 [ ]

```powershell
gh repo clone LHG4650/gigang-skills C:\WORK\gigang-skills
```

```powershell
& "C:\WORK\gigang-skills\install.ps1"
```

완료 확인: 설치 완료 메시지가 나오면 [OK]

## Step 6: gigang-init 실행 [ ]

새 PowerShell 창을 열고 `claude` 입력 후 Enter.
Claude Code가 실행되면:

```
/gigang-init
```

초기 설정 안내에 따라 진행. 완료 메시지가 나오면 [OK]

## 설치 완료 확인

모든 [OK]가 체크되면 설치 완료입니다.

## 트러블슈팅
- `winget` 명령이 없다: Windows Terminal 설치 후 재시도
- `gh auth login` 실패: 브라우저 팝업 허용 후 재시도
- 기타: 강사에게 문의
