#!/bin/bash
# Gigang inline status — Claude Code 멀티라인 statusline
# line 1: user@host:path [model] 🌿branch (+staged ~modified)
# line 2: 무지개 컨텍스트 바 % (used/size tokens) | $cost | ⏱ duration
# line 3: 5h / 7d rate-limit 무지개 바 (Pro/Max 구독 + 첫 API 응답 후에만)
#
# 의존성: jq, awk (Git Bash 기본 포함), TrueColor(24bit) 지원 터미널
# 설치/연결은 set-inline-status 스킬이 처리.
input=$(cat)

MODEL=$(echo "$input" | jq -r '.model.display_name // "?"')
DIR=$(echo "$input"   | jq -r '.workspace.current_dir // .cwd')
COST=$(echo "$input"  | jq -r '.cost.total_cost_usd // 0')
DUR_MS=$(echo "$input" | jq -r '.cost.total_duration_ms // 0')
PCT=$(echo "$input"   | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
CTX_SIZE=$(echo "$input" | jq -r '.context_window.context_window_size // 0')
CTX_IN=$(echo "$input"   | jq -r '.context_window.total_input_tokens // 0')
FIVE_H=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
WEEK=$(echo "$input"   | jq -r '.rate_limits.seven_day.used_percentage // empty')

# colors
GREEN='\033[01;32m'; BLUE='\033[01;34m'; CYAN='\033[36m'
YELLOW='\033[33m'; RED='\033[31m'; DIM='\033[02m'; RESET='\033[00m'

# 무지개 그라데이션 프로그레스 바: make_bar <pct> <width>
# 채워진 칸은 사용량 비율만큼 초록(시작)→노랑→주황→빨강(끝)으로 흐른다.
# 빈 칸은 흐린 ░.  hue 120(초록)→0(빨강) 선형 보간.
make_bar() {
    awk -v p="$1" -v w="$2" '
    function absf(v){ return v<0 ? -v : v }
    function hsv(h,   hp,x,seg,r,g,b){
        hp=h/60.0; seg=int(hp); x=1-absf((hp-2*int(hp/2))-1)
        if      (seg==0){r=1;g=x;b=0}
        else if (seg==1){r=x;g=1;b=0}
        else if (seg==2){r=0;g=1;b=x}
        else if (seg==3){r=0;g=x;b=1}
        else if (seg==4){r=x;g=0;b=1}
        else            {r=1;g=0;b=x}
        return sprintf("\033[38;2;%d;%d;%dm", r*255, g*255, b*255)
    }
    BEGIN{
        if(p>100)p=100; if(p<0)p=0
        filled=int(p*w/100)
        for(i=0;i<w;i++){
            if(i<filled){
                h = (w>1) ? 120-(i/(w-1))*120 : 120
                printf "%s█", hsv(h)
            } else {
                printf "\033[02m░"
            }
        }
        printf "\033[00m"
    }'
}

# 토큰 수 사람이 읽기 좋게: 84000 -> 84k, 1000000 -> 1.0M
fmt_tok() {
    local n=$1
    if   [ "$n" -ge 1000000 ]; then awk "BEGIN{printf \"%.1fM\", $n/1000000}"
    elif [ "$n" -ge 1000 ];    then echo "$((n / 1000))k"
    else echo "$n"; fi
}

# git info
BRANCH=""; GIT_EXTRA=""
if git -C "$DIR" rev-parse --git-dir >/dev/null 2>&1; then
    BRANCH=$(git -C "$DIR" branch --show-current 2>/dev/null)
    STAGED=$(git -C "$DIR" diff --cached --numstat 2>/dev/null | wc -l | tr -d ' ')
    MODIFIED=$(git -C "$DIR" diff --numstat 2>/dev/null | wc -l | tr -d ' ')
    [ "$STAGED" -gt 0 ] && GIT_EXTRA="${GREEN}+${STAGED}${RESET}"
    [ "$MODIFIED" -gt 0 ] && GIT_EXTRA="${GIT_EXTRA} ${YELLOW}~${MODIFIED}${RESET}"
fi

# duration
MINS=$((DUR_MS / 60000)); SECS=$(((DUR_MS % 60000) / 1000))
COST_FMT=$(printf '$%.2f' "$COST")
CTX_TOK="$(fmt_tok "$CTX_IN")/$(fmt_tok "$CTX_SIZE")"

# line 1
printf '%b' "${GREEN}$(whoami)@$(hostname -s)${RESET}:${BLUE}${DIR}${RESET}"
[ -n "$BRANCH" ] && printf '%b' " ${CYAN}[$MODEL]${RESET} 🌿 ${BRANCH} ${GIT_EXTRA}" || printf '%b' " ${CYAN}[$MODEL]${RESET}"
printf '\n'
# line 2 — context bar
printf '%b' "$(make_bar "$PCT" 10) ${PCT}% ${DIM}(${CTX_TOK})${RESET} ${DIM}|${RESET} ${YELLOW}${COST_FMT}${RESET} ${DIM}|${RESET} ⏱ ${MINS}m ${SECS}s"
# line 3 — rate-limit bars (only if present)
if [ -n "$FIVE_H" ] || [ -n "$WEEK" ]; then
    printf '\n'
    PARTS=""
    if [ -n "$FIVE_H" ]; then
        p5=$(printf '%.0f' "$FIVE_H")
        PARTS="${DIM}5h${RESET} $(make_bar "$p5" 8) ${p5}%"
    fi
    if [ -n "$WEEK" ]; then
        p7=$(printf '%.0f' "$WEEK")
        PARTS="${PARTS:+$PARTS   }${DIM}7d${RESET} $(make_bar "$p7" 8) ${p7}%"
    fi
    printf '%b' "📊 ${PARTS}"
fi
