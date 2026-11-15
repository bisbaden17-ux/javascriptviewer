/**
 * ============================================================================
 * 1. 페이지 라우팅 (하위 페이지 전환 기능)
 * HTML 파일을 여러 개 만들지 않고, JS로 섹션을 숨기고 보여주어 페이지 이동처럼 구현합니다.
 * ============================================================================
 */
function navigateTo(pageId) {
    // 모든 페이지 섹션을 숨김 처리
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // 선택한 페이지만 표시
    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // 메인 페이지가 아닐 때만 상단 '메인으로 돌아가기' 버튼 표시
    const homeBtn = document.getElementById('homeBtn');
    if (pageId === 'home') {
        homeBtn.classList.add('hidden');
    } else {
        homeBtn.classList.remove('hidden');
    }

    // 페이지 이동 시 스크롤을 맨 위로 부드럽게 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/**
 * ============================================================================
 * 2. [기능 01] 화면 및 디자인 실시간 제어 (DOM 조작)
 * ============================================================================
 */
function toggleDarkMode() {
    // <html> 태그에 'dark' 클래스를 넣었다 뺐다 하며 다크모드 전환
    document.documentElement.classList.toggle('dark');
}

function changeBoxColor() {
    const box = document.getElementById('colorPreviewBox');
    const text = document.getElementById('previewText');

    // 적용할 색상과 문구 후보들
    const themes = [
        { bg: 'bg-indigo-500', msg: '차분한 인디고 블루 테마로 변경되었습니다!' },
        { bg: 'bg-emerald-500', msg: '싱그러운 에메랄드 그린 테마입니다!' },
        { bg: 'bg-rose-500', msg: '화사한 로즈 핑크 색상으로 바뀌었습니다!' },
        { bg: 'bg-amber-500', msg: '따뜻한 앰버 옐로우 테마입니다!' },
        { bg: 'bg-purple-600', msg: '신비로운 퍼플 색상으로 변신했습니다!' }
    ];

    // 기존 배경색 클래스 제거
    themes.forEach(t => box.classList.remove(t.bg));

    // 랜덤으로 하나 선택하여 적용
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    box.classList.add(randomTheme.bg);
    text.textContent = randomTheme.msg;
}


/**
 * ============================================================================
 * 3. [기능 02] 실시간 데이터 계산기
 * ============================================================================
 */
function calculateTotal() {
    const price = Number(document.getElementById('calcPrice').value) || 0;
    const qty = Number(document.getElementById('calcQty').value) || 0;
    const isVip = document.getElementById('calcVip').checked;

    const subtotal = price * qty;
    const discount = isVip ? Math.floor(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    // 천 단위 콤마(,)를 찍어서 화면에 업데이트
    document.getElementById('resSubtotal').textContent = `${subtotal.toLocaleString()}원`;
    document.getElementById('resDiscount').textContent = `- ${discount.toLocaleString()}원`;
    document.getElementById('resTotal').textContent = `${total.toLocaleString()}원`;
}


/**
 * ============================================================================
 * 4. [기능 03] 동적 리스트 (할 일 목록 추가 및 삭제)
 * ============================================================================
 */
function addTodo(defaultText = null) {
    const input = document.getElementById('todoInput');
    const text = defaultText || input.value.trim();

    if (!text) return; // 빈 값이면 무시

    const todoList = document.getElementById('todoList');

    // 새로운 <li> 태그 생성
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600';

    // 내부 HTML 구성 (완료 체크용 텍스트 + 삭제 버튼)
    li.innerHTML = `
        <span onclick="this.classList.toggle('line-through'); this.classList.toggle('opacity-50');" 
              class="cursor-pointer select-none flex-grow font-medium">
            ✅ ${text}
        </span>
        <button onclick="this.parentElement.remove()" 
                class="text-xs px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-200 rounded-lg transition">
            삭제
        </button>
    `;

    todoList.appendChild(li);

    if (!defaultText) {
        input.value = ''; // 입력창 비우기
        input.focus();
    }
}


/**
 * ============================================================================
 * 5. [기능 04] 외부 서버(구글 스프레드시트 등) 데이터 통신 시뮬레이션
 * ============================================================================
 */
function simulateServerSend() {
    const name = document.getElementById('apiName').value.trim() || '익명 사용자';
    const msg = document.getElementById('apiMessage').value.trim() || '테스트 메시지입니다.';
    const consoleBox = document.getElementById('apiConsole');

    // 전송할 데이터를 JSON 객체 형태로 포장
    const payload = {
        timestamp: new Date().toLocaleTimeString(),
        user: name,
        message: msg
    };

    consoleBox.innerHTML = `<p class="text-amber-300">[1/3] 데이터 포장 완료 (JSON 형식):</p>
                            <p class="text-slate-300 pl-2">${JSON.stringify(payload)}</p>
                            <p class="text-sky-300 mt-2">[2/3] 외부 서버(구글 앱스 스크립트)로 전송 중...</p>`;

    // 실제 통신(fetch)처럼 약 1초의 지연 시간 후 응답 처리 시뮬레이션
    setTimeout(() => {
        consoleBox.innerHTML += `<p class="text-emerald-400 mt-2">[3/3] ✔ 서버 응답 성공! (Status: 200 OK)</p>
                                 <p class="text-slate-400 pl-2">-> 스프레드시트 새 행에 "${name}"님의 데이터가 기록되었습니다.</p>`;
    }, 1000);
}


/**
 * ============================================================================
 * 6. 초기 실행 설정 (페이지 로드 시 기본 데이터 세팅)
 * ============================================================================
 */
window.addEventListener('DOMContentLoaded', () => {
    // 할 일 목록에 기본 예시 2개 추가
    addTodo('깃허브 저장소(Repository) 생성하기');
    addTodo('index.html 과 script.js 파일 업로드하기');
});