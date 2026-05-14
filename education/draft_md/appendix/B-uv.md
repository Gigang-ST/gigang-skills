# 부록 B: Python 실행 환경 (uv)

> Python 스크립트를 실행할 때 필요한 도구 uv를 설명합니다.

## uv란?

**비유:** Python 요리 재료를 자동으로 준비해주는 도구.
Python 스크립트를 실행하려면 필요한 라이브러리가 있는데,
uv가 자동으로 설치하고 관리해준다.

## 왜 쓰는가?

Claude Code가 Python 스크립트를 만들 때 uv를 기본으로 사용한다.
`python` 명령 대신 `uv run` 을 쓰면 환경 충돌 없이 실행된다.

## 설치

```powershell
winget install astral-sh.uv
```

## 기본 사용법

```powershell
# Python 스크립트 실행
uv run script.py

# 외부 패키지 사용
uv run --with pandas script.py

# 패키지 추가
uv add pandas
```

## Claude Code에서 사용

Claude Code에게 Python 작업을 시킬 때:
```
pandas로 엑셀 파일 읽는 스크립트 만들어줘.
uv run으로 실행할 수 있게 해줘.
```

## 다음 단계

- [F. 업무 자동화 레시피](F-automation.md)
- [G. 프로젝트 구조](G-project-structure.md)
