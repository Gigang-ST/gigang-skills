---
name: gigang-뭐했더라
description: "어제 뭐했더라", "저번에 뭐했더라", "지난주에 뭐했지", "5/13에 뭐했지" 처럼 과거 Claude 세션 작업 내역이 궁금할 때 발동. 현재 프로젝트 로그만 기본 조회. "전체" 키워드 시 모든 프로젝트 조회.
---

# gigang-뭐했더라

`~/.claude/logs/prompts/{프로젝트}/{날짜}.md` 로그를 읽어 작업 내역을 요약해주는 스킬.

- **오늘**: 각 턴 첫 줄만 (가볍게)
- **과거**: `{YYMMDD}_summary.md` 캐시 있으면 재활용, 없으면 요약 생성 후 저장

## 발동 조건

- "어제 뭐했더라", "어제 뭐했지"
- "저번에 뭐했더라", "저번 주 뭐했지"
- "이번주 정리해줘", "지난주 뭐했지"
- "5/13에 뭐했더라", "2026-05-13 작업 내역"
- "전체 어제 뭐했더라" → 모든 프로젝트 조회
- 날짜 없으면 최근 3일 기본값

## 절차

### 1. 현재 프로젝트 감지

```powershell
$projectName = Split-Path (Get-Location) -Leaf
```

현재 폴더명을 그대로 사용. "전체" 키워드가 있을 때만 전체 조회.

### 2. 로그 수집

```powershell
$query   = '<사용자_발언>'   # single-quote escape 필수: ' → \'
$project = $projectName
$pyCode = @"
import sys, json, re
from pathlib import Path
from datetime import date, timedelta

sys.stdout.reconfigure(encoding='utf-8')

query   = '''$query'''
project = '''$project'''
all_projects = '전체' in query

today = date.today()

def parse_dates(q):
    if '어제' in q:
        return [today - timedelta(days=1)]
    if any(k in q for k in ['이번주', '이번 주']):
        mon = today - timedelta(days=today.weekday())
        return [mon + timedelta(days=i) for i in range((today - mon).days + 1)]
    if any(k in q for k in ['지난주', '저번주', '지난 주', '저번 주']):
        lmon = today - timedelta(days=today.weekday() + 7)
        return [lmon + timedelta(days=i) for i in range(7)]
    m = re.search(r'(\d{4})-(\d{1,2})-(\d{1,2})', q)
    if m:
        return [date(int(m[1]), int(m[2]), int(m[3]))]
    m = re.search(r'(\d{1,2})/(\d{1,2})', q)
    if m:
        try: return [date(today.year, int(m[1]), int(m[2]))]
        except ValueError: pass
    return [today - timedelta(days=i) for i in range(3)]

def extract_brief(content):
    turns = []
    lines = content.splitlines()
    i = 0
    while i < len(lines):
        if lines[i].startswith('## [') and '응답' not in lines[i]:
            j = i + 1
            while j < len(lines):
                stripped = lines[j].strip()
                if stripped.startswith('### 응답') or stripped.startswith('## ['):
                    break
                if stripped:
                    turns.append(f"{lines[i]}\n{stripped}")
                    break
                j += 1
        i += 1
    return turns

def extract_full(content):
    turns = []
    lines = content.splitlines()
    i = 0
    while i < len(lines):
        if lines[i].startswith('## [') and '응답' not in lines[i]:
            parts = [lines[i]]
            j = i + 1
            while j < len(lines):
                l = lines[j]
                if l.startswith('## [') or l.startswith('### 응답'):
                    break
                parts.append(l)
                j += 1
            text = '\n'.join(parts).strip()
            if text:
                turns.append(text)
            i = j
        else:
            i += 1
    return turns

target_dates = parse_dates(query)
logs_dir = Path.home() / '.claude' / 'logs' / 'prompts'
results = {}

for d in sorted(target_dates):
    ds = d.strftime('%Y-%m-%d')
    is_today = (d == today)
    sum_name = d.strftime('%y%m%d') + '_summary.md'

    if all_projects:
        candidates = [p for p in sorted(logs_dir.iterdir()) if p.is_dir() and not p.name.startswith('_')]
    else:
        proj_dir = logs_dir / project.strip()
        candidates = [proj_dir] if proj_dir.exists() else []

    for proj in candidates:
        log_file = proj / f'{ds}.md'
        sum_file = proj / sum_name
        if not log_file.exists():
            continue
        content = log_file.read_text(encoding='utf-8')
        if is_today:
            turns = extract_brief(content)
            if turns:
                results.setdefault(proj.name, {})[ds] = {'type': 'today', 'turns': turns}
        elif sum_file.exists():
            summary = sum_file.read_text(encoding='utf-8')
            results.setdefault(proj.name, {})[ds] = {'type': 'summary', 'content': summary}
        else:
            turns = extract_full(content)
            if turns:
                results.setdefault(proj.name, {})[ds] = {
                    'type': 'needs_summary',
                    'turns': turns,
                    'sum_path': str(sum_file)
                }

print(json.dumps({
    'dates': [d.strftime('%Y-%m-%d') for d in sorted(target_dates)],
    'project': project,
    'all': all_projects,
    'logs': results
}, ensure_ascii=False))
"@
uv run --no-project python -c $pyCode
```

### 3. 결과 처리

JSON 출력의 `logs` 를 프로젝트·날짜별로 순회:

**`type: today`** — 오늘 작업, 첫 줄 목록 표시:
```
## 오늘 (2026-05-14) — gigang_skills
- [11:30 KST] 스킬 제작 논의 ...
```

**`type: summary`** — 캐시된 요약 파일 내용을 그대로 표시.

**`type: needs_summary`** — 전체 턴 내용을 읽고:
1. 무슨 작업을 했는지 3-5줄 bullet 요약 생성
2. **Write tool로 `sum_path` 에 저장** (아래 포맷)
3. 요약 내용 표시

**요약 파일 포맷** (`{YYMMDD}_summary.md`):
```markdown
## {YYYY-MM-DD} — {project}

- 작업 항목 1
- 작업 항목 2
- ...
```

**로그 없음:**
```
{프로젝트} — {날짜} 기록 없음.
```

전체 조회면 프로젝트별 섹션으로 구분.

## 흔한 실수

- `$query`/`$project` 안에 single quote(`'`) 있으면 Python heredoc 깨짐 → escape 필수
- `needs_summary` 처리 시 Write tool 누락하면 다음에도 다시 생성 (캐시 효과 없음)
- 로그 없다고 그날 작업 안 한 게 아님 — Claude Code 미사용 세션은 로그 없음
