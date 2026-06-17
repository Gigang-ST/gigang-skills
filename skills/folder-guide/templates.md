# Gigang Folder Guide — 유형별 템플릿

## 업무문서형

```
{project}/
  docs/           # 문서, 보고서
  working/        # 작업 중인 파일 (임시)
  outputs/        # 최종 결과물
  resources/      # 참고자료, 이미지
  archive/        # 완료된 구버전 파일
  todo.md
  notes.md
```

**각 폴더 용도:**
- `docs/` — 완성된 문서, 공유할 보고서
- `working/` — 아직 작업 중인 파일. 여기 있는 건 최종본 아님
- `outputs/` — 외부에 전달하거나 제출하는 최종 결과물
- `resources/` — 로고, 이미지, 참고자료 등 직접 만들지 않은 파일
- `archive/` — 더 이상 안 쓰지만 지우기 아까운 파일

---

## AI 활용형

```
{project}/
  prompts/        # 프롬프트 모음
  inputs/         # AI에 넣을 입력 파일
  outputs/        # AI가 만든 결과물
  docs/           # 관련 문서
  resources/      # 참고자료
  todo.md
  notes.md
```

**각 폴더 용도:**
- `prompts/` — Claude에 쓰는 프롬프트 텍스트 파일
- `inputs/` — AI에게 분석/처리 시킬 원본 파일
- `outputs/` — AI가 생성한 결과물 (날짜별 보관 권장)
- `docs/` — 작업 방법, 결과 해석 문서
- `resources/` — 참고자료, 매뉴얼

---

## 데이터 분석형

```
{project}/
  data/
    raw/          # 원본 데이터 (절대 수정 금지)
    processed/    # 전처리된 데이터
  analysis/       # 분석 코드/노트북
  outputs/
    figures/      # 차트, 그래프
    reports/      # 보고서
  docs/           # 문서
  todo.md
  notes.md
```

**각 폴더 용도:**
- `data/raw/` — 받은 그대로의 원본. 절대 수정 금지
- `data/processed/` — raw를 가공한 파일
- `analysis/` — 분석 스크립트, Excel 수식 정리
- `outputs/figures/` — 차트, 그래프 이미지
- `outputs/reports/` — 최종 보고서
- `docs/` — 분석 방법론, 데이터 설명 문서

---

## 소프트웨어 개발형

```
{project}/
  src/            # 소스 코드
  docs/           # 설계 문서, 계획서 (.md)
  outputs/        # 생성된 데이터·보고서 (실행 결과물)
  dist/           # 배포용 설치파일·패키지
  build/          # 빌드 중간 산물 (자동 생성, .gitignore 권장)
  tests/          # 테스트 코드
  main.py         # (또는 프로젝트 진입점)
  README.md
```

**각 폴더 용도:**
- `src/` — 모든 소스 코드. main.py 등 진입점은 루트에 둬도 무방
- `docs/` — 설계 문서, 계획서, 분석 메모 (.md 파일들)
- `outputs/` — 프로그램 실행으로 생성된 파일 (.xlsx, .pdf, .pkl 등)
- `dist/` — 배포·설치용 파일 (.exe, wheel 등). git에 안 올리는 경우 많음
- `build/` — 빌드 도구 자동 생성 폴더. .gitignore에 추가 권장
- `tests/` — 단위·통합 테스트

---

## todo.md 기본 템플릿

```markdown
# TODO

## 진행중
- [ ] 

## 완료
- [x] 
```

## notes.md 기본 템플릿

```markdown
# Notes

```
