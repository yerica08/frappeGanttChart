/* perfect scrollbar */
const container = document.querySelector('.inner-right-section-scroll');
const ps = new PerfectScrollbar(container);

/* frappe gantt */
let currentYear = 2025;
let currentMonth = 5; // 6월
let StartChartDate, EndChartDate;

function setChartDuration(year, month) {
   const start = new Date(year, month, 1);
   start.setHours(0, 0, 0, 0);
   const end = new Date(year, month + 1, 0);
   end.setHours(0, 0, 0, 0);

   StartChartDate = start;
   EndChartDate = end;
   //console.log(StartChartDate, EndChartDate);
}
setChartDuration(currentYear, currentMonth);

/* 옵션 설정 */
const tasks = [
   {
      id: 'task0',
      name: '이전날짜 테스트',
      start: '2025-05-20',
      end: '2025-05-21',
      progress: 100,
      dependencies: '',
      type: 'sub',
      group: 'teamZ',
      style: 'blue',
      href: 'https://example.com/req',
   },
   {
      id: 'teamA',
      name: 'Team A',
      start: '2025-06-01',
      end: '2025-06-05',
      progress: 80,
      dependencies: '',
      type: 'main',
      group: 'teamA',
      style: 'gray',
      href: '',
   },
   {
      id: 'task1',
      name: '요구사항 수집',
      start: '2025-06-01',
      end: '2025-06-03',
      progress: 100,
      dependencies: '',
      type: 'sub',
      group: 'teamA',
      style: 'red',
      href: 'https://example.com/req',
   },
   {
      id: 'task2',
      name: '설계 회의',
      start: '2025-06-03',
      end: '2025-06-05',
      progress: 60,
      dependencies: 'task1',
      type: 'sub',
      group: 'teamA',
      style: 'red',
      href: 'https://example.com/design',
   },
   {
      id: 'teamB',
      name: 'Team B',
      start: '2025-06-06',
      end: '2025-06-16',
      progress: 80,
      dependencies: '',
      type: 'main',
      group: 'teamB',
      style: 'gray',
      href: '',
   },
   {
      id: 'task3',
      name: 'DB 설계',
      start: '2025-06-06',
      end: '2025-06-10',
      progress: 30,
      dependencies: '',
      type: 'sub',
      group: 'teamB',
      style: 'green',
      href: 'https://example.com/db',
   },
   {
      id: 'task5',
      name: '백엔드 개발',
      start: '2025-06-10',
      end: '2025-06-16',
      progress: 20,
      dependencies: 'task3',
      type: 'sub',
      group: 'teamB',
      style: 'green',
      href: 'https://example.com/back',
   },
   {
      id: 'teamC',
      name: 'Team C',
      start: '2025-06-08',
      end: '2025-06-22',
      progress: 80,
      dependencies: '',
      type: 'main',
      group: 'teamC',
      style: 'gray',
      href: '',
   },
   {
      id: 'task4',
      name: '프론트엔드 개발',
      start: '2025-06-08',
      end: '2025-06-15',
      progress: 45,
      dependencies: '',
      type: 'sub',
      group: 'teamC',
      style: 'orange',
      href: 'https://example.com/front',
   },
   {
      id: 'task6',
      name: 'API 연동',
      start: '2025-06-18',
      end: '2025-06-22',
      progress: 0,
      dependencies: 'task4',
      type: 'sub',
      group: 'teamC',
      style: 'orange',
      href: 'https://example.com/api',
   },
   {
      id: 'teamD',
      name: 'Team D',
      start: '2025-06-05',
      end: '2025-06-08',
      progress: 80,
      dependencies: '',
      type: 'main',
      group: 'teamD',
      style: 'gray',
      href: '',
   },
   {
      id: 'task7',
      name: '디자인 피드백',
      start: '2025-06-05',
      end: '2025-06-08',
      progress: 90,
      dependencies: '',
      type: 'sub',
      group: 'teamD',
      style: 'pink',
      href: 'https://example.com/design-feedback',
   },
   {
      id: 'teamE',
      name: 'Team E',
      start: '2025-06-15',
      end: '2025-06-29',
      progress: 80,
      dependencies: '',
      type: 'main',
      group: 'teamE',
      style: 'gray',
      href: '',
   },
   {
      id: 'task8',
      name: '유저 테스트',
      start: '2025-06-15',
      end: '2025-06-25',
      progress: 10,
      dependencies: '',
      type: 'sub',
      group: 'teamE',
      style: 'blue',
      href: 'https://example.com/user-test',
   },
   {
      id: 'task9',
      name: '배포 준비',
      start: '2025-06-26',
      end: '2025-06-27',
      progress: 0,
      dependencies: 'task8',
      type: 'sub',
      group: 'teamE',
      style: 'blue',
      href: 'https://example.com/deploy',
   },
   {
      id: 'task10',
      name: '런칭',
      start: '2025-06-28',
      end: '2025-06-29',
      progress: 0,
      dependencies: 'task9',
      type: 'sub',
      group: 'teamE',
      style: 'blue',
      href: 'https://example.com/launch',
   },
];

function filterTasksByDate(tasks, startDate, endDate) {
   const start = new Date(startDate);
   const end = new Date(endDate);

   return tasks.filter((task) => {
      const taskStart = new Date(task.start);
      const taskEnd = new Date(task.end);

      taskStart.setHours(0, 0, 0, 0);
      taskEnd.setHours(0, 0, 0, 0);

      return (
         (taskStart >= start && taskStart <= end) || // 시작일이 범위 안
         (taskEnd >= start && taskEnd <= end) || // 종료일이 범위 안
         (taskStart <= start && taskEnd >= end) // 걸쳐 있는 경우
      );
   });
}
const filteredTasks = filterTasksByDate(tasks, StartChartDate, EndChartDate);

let firstLoad = true;

// const gantt = new Gantt("#gantt", tasks);
const gantt = new Gantt('#gantt', filteredTasks, {
   language: 'kr', //현지화를 위한 언어(ISO 639-1) || en
   // 날짜 세팅
   gantt_start: StartChartDate,
   gantt_end: EndChartDate,
   view_mode: 'Day', // 간트 차트의 초기 보기 모드(Day, Week, Month, Year) || Day
   view_mode_select: false, // 드롭다운에서 보기 모드를 선택할지(true, false) || false
   today_button: true, // 오늘 날짜로 이동하는 버튼 추가(true, false) || true
   date_format: 'YYYY-MM-DD', // 날짜를 표시하는 형식(js 날짜 형식 문자열) || YYYY-MM-DD
   scroll_to: 'today', // 차트가 렌더링될 때의 시작점(today, start, end, 또는 날짜 문자열)|| today
   // 팝업 세팅
   popup_on: 'hover', // 팝업 표시를 트리거하는 이벤트(click, hover) || click
   /*
       << 팝업구성 >>

       popup 은 함수로, 다음을 retrun 한다.

       1. false : 팝업이 나오지 않음.
       2. undefined : 팝업은 함수 내의 조작에 따라 렌더링.
       3. HTML 문자열인 경우 팝업은 해당 문자열이 된다.

       또한 popup함수는 다음을 포함하는 하나의 객체를 인수로 받는데,

       1. task : 객체로, id, name, start, end, progress, dependencies 등의 속성을 가졌다.
       2. chart : 전체 간트 차트
       3. get_title, get_subtitle, get_details 함수 : 관련 섹션을 HTML 노드로 가져옴.
       4. set_title, set_subtitle, set_details 함수 : 관련 섹션의 HTML을 가져옴.
       5. add_action 함수 : 두 개의 매개변수를 가진다. add_action(html, func(){...}) 형태로 각각 동작의 HTML을 결정하고, 동작이 눌렸을 때 콜백을 결정한다.
   */
   popup: ({ task, chart, set_title, set_details, add_action }) => {
      set_title(`<b>${task.name}</b>`);
      set_details(`
      <p><strong>기간:</strong> ${task.start} ~ ${task.end}</p>
      <p><strong>진행률:</strong> ${task.progress}%</p>`);
   },
   //css 스타일링
   arrow_curve: 5, // 연결선 곡선 반경 || 5
   bar_corner_radius: 0, // 작업 박스 모서리 반경(정수) || 3
   bar_height: 20, // 작업 박스 높이(정수) || 30
   container_height: 1500, // 컨테이너 높이(auto, 정수) || auto
   upper_header_height: 40, // 타임라인 상단 헤더 높이(정수) || 45
   lower_header_height: 25, // 타임라인 하단 헤더 높이(정수) || 30
   column_width: 35, // 타임라인의 각 열의 너비(정수) || 45
   padding: 18, // 작업표시줄 주변의 패딩(정수) || 18
   unit: 'day',
   step: 1,
   //step: 24, // 시간 간격 (분 단위)
   //snap_at: '1d', // 크기 조정이나 드래그 시 특정 간격으로 작업을 스냅(모든 간격) || 1d
   lines: 'both', // 표시할 격자선 (none, vertical, horixontal, both) || both
   // 기타
   //ignore: [], // 특정 날짜 구간을 렌더링에서 제외하는 옵션. 즉, 특정 날들을 회색배경(비작업시간)처럼 보이게 만드는 역할. weekend 또는 문자열이나 날짜 객체의 배열( weekend배열에도 존재할 수 있음). (주말무시 : ['weekend']), ( 특정 날짜 무시 : ['2025-06-17', new Date('2025-06-18')]), ( 둘 다 무시 : ['weekend', '2025-06-25', new Date('2025-06-30')]) || []
   holidays: { 'var(--g-weekend-highlight-color)': 'weekend' }, // 타임라인 휴일 강조 표시, 휴일 유형에 CSS 색상을 매핑하는 객체 ('weekend', 문자열, 날짜객체, 형식 객체 {date: ..., label: ...}) || { 'var(--g-weekend-highlight-color)': 'weekend' }
   infinite_padding: false, // 사용자가 스크롤할 때 타임라인을 무한대로 확장할지 여부, true가 기본상태이나 true 상태일 경우 여분의 기간을 같이 가져와 가로 스크롤이 길어짐(true, false) || true
   show_expected_progress: false, // 작업에 대한 예상 진행 상황(true, false) || false
   move_dependencies: false, // 작업을 이동하면 해당 종속성도 자동으로 이동되는지 여부(true, false) || true
   readonly: true, // 모든 편집 기능을 비활성화(true, false) || false
   readonly_dates: true, // 작업 날짜 편집을 비활성화(true, false) || false
   readonly_progress: true, //작업 진행 상황 편집을 비활성화(true, false) || false
   auto_move_label: false, // 사용자가 수평으로 스크롤하면 작업 라벨을 이동함(false, true) || false
   // 이벤트 핸들러
   /*
       << 이벤트 핸들러 >>

       1. on_click(task) : 바 클릭 시 호출
       2. on_date_change(task, start, end) : 드래그로 날짜 바뀔 때 호출
       3. on_progress_change(task, progress) : 진행률 드래그로 변경 시 호출
       4. on_view_change(mode)	: 뷰 모드가 바뀔 때 호출됨 (e.g., Day → Week)
   */
   on_click: (task) => {
      console.log(`클릭한 작업: ${task.name}`);
      // bar.$bar는 SVG <rect> 요소 (막대 자체)
      const bar = gantt.get_bar(task.id);
      const x = bar.$bar.getX() + bar.$bar.getWidth() + 5; // SVG <rect>의 x 좌표 + 넓이
      const y = bar.$bar.getY(); // SVG <rect>의 y 좌표

      const popup = document.getElementById('gantt-popupHTML');

      popup.querySelector('.title').innerHTML = task.name;
      popup.querySelector('.duration').innerHTML =
         task.start + ' ~ ' + task.end;
      popup.querySelector('.expected_progress').innerHTML = task.progress;
      popup.querySelector('.link').href = task.href;
      popup.style.top = y + 'px';
      popup.style.left = x + 'px';
      popup.style.display = 'block';
   },
   on_date_change: (task, start, end) => {
      console.log(`${task.name} 날짜 변경됨`);
      console.log(`시작일: ${start}`);
      console.log(`종료일: ${end}`);
   },
   on_progress_change: (task, progress) => {
      console.log(`${task.name} 진행률 변경: ${progress}%`);
   },
   on_view_change: (mode) => {
      //console.log(`현재 보기 모드: ${mode.name}`);
      //console.log(mode);
      if (firstLoad) {
         firstLoad = false;
         //console.log('🎯 최초 로드 시 처리 실행');
         // const clone = document.getElementById("list_wrap_clone").cloneNode();

         // clone.querySelector(".list-Name").innerHTML =
      } else {
         console.log('🔄 뷰 변경됨:', mode.name);
      }
   },
   on_double_click: (task) => {
      console.log(`더블 클릭한 작업: ${task.name}`);
   },
});

/*
   << api >>

    1. .update_options : 특정 옵션을 업데이트한 후 차트를 다시 렌더링
                         (new_options- 새로운 옵션을 포함하는 객체.)
    2. .change_view_mode : 뷰 모드를 프로그래밍적으로 바꿀 수 있는 함수로,
                           "Quarter Day", "Half Day", "Day", "Week", "Month" 로 바꿀 수 있다.
                           * view_mode : 뷰 모드 또는 뷰 모드 객체의 이름
                           * maintain_pos : 다시 렌더링한 후 현재 스크롤 위치로 돌아갈지 여부(기본값은 false.)
    3. .scroll_current : 현재 날짜로 스크롤
    4. .update_task : 특정 작업 표시줄만 다시 렌더링
                      * task_id : 작업의 ID 
                      * new_details : 업데이트할 작업 속성이 포함된 객체입니다.
*/

// document.getElementById('scroll-current').addEventListener('click', () => {
//    gantt.scroll_current();
// });

/*
    << 작업 추가 및 삭제 방법 >>

    Gantt 인스턴스에는 내부적으로 this.tasks 배열과 this.setup_tasks() 함수가 있는데,
    공식적으로는 제공되지 않지만, 다음과 같은 방식으로 추가 후 다시 그릴 수 있다.

*/
// 추가 방법
// 1. 작업 배열에 새 작업 추가
// tasks.push({
//    id: 'task3',
//    name: '테스트 작업',
//    start: '2025-06-25',
//    end: '2025-06-28',
//    progress: 0,
// });

// 2. 새 Gantt 인스턴스 다시 그리기 (덮어쓰기)
//gantt.refresh(tasks);

// 삭제 방법
// ID가 'task1'인 작업 삭제
// const index = tasks.findIndex((t) => t.id === 'task1');
// if (index !== -1) {
//    tasks.splice(index, 1);
//    gantt.refresh(tasks); // 다시 그리기

/*
   !! refresh() 함수 사용 시 주의사항
   refresh(newTasks)는 기존 Gantt 인스턴스를 유지하면서 데이터를 새로 불러오기 때문에,
   상태 유지(ex. 선택된 뷰 모드)를 원한다면 별도 저장해야함.
*/

/*
    << 6월에 해당하는 작업만 필터링해서 전달하기 >>

    const filteredTasks = tasks.filter((task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
    
      // 2025년 6월 1일부터 6월 30일까지만 허용
      const juneStart = new Date("2025-06-01");
      const juneEnd = new Date("2025-06-30");
    
      return (
        (start >= juneStart && start <= juneEnd) ||
        (end >= juneStart && end <= juneEnd) ||
        (start <= juneStart && end >= juneEnd) // 완전히 걸쳐 있는 경우도 포함
      );
    });
    
    gantt.refresh(filteredTasks); // 필터링한 작업만 보여주기
*/

/* task 속성 부여 */
function dataIdSlice() {
   filteredTasks.forEach((task) => {
      const thisTask = document.querySelector(`[data-id="${task.id}"]`);

      thisTask.dataset.group = task.group;
      thisTask.classList.add(task.style);

      if (task.type == 'main') {
         thisTask.classList.add('main-task');
      } else if (task.type == 'sub') {
         thisTask.classList.add('sub-task');
      }
   });
}
/* main-task rect 모양 바꾸기 */
function clipMainBarsWithRibbonShape() {
   const svg = document.querySelector('#gantt svg');
   if (!svg) return;

   // <defs>가 없으면 생성
   let defs = svg.querySelector('defs');
   if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.prepend(defs);
   }

   const mainBars = document.querySelectorAll('.bar-wrapper.main-task');

   mainBars.forEach((wrapper, idx) => {
      const rect = wrapper.querySelector('rect.bar');
      const progress = wrapper.querySelector('rect.bar-progress');
      if (!rect) return;

      const x = parseFloat(rect.getAttribute('x'));
      const y = parseFloat(rect.getAttribute('y'));
      const width = parseFloat(rect.getAttribute('width'));
      const height = parseFloat(rect.getAttribute('height')) - 8;
      const wing = 6; // 삼각형 날개 깊이

      const clipId = `clip-ribbon-${idx}`;

      // 기존 클립 제거 (중복 방지)
      const existing = document.getElementById(clipId);
      if (existing) existing.remove();

      // <clipPath> 정의
      const svgNS = 'http://www.w3.org/2000/svg';
      const clipPath = document.createElementNS(svgNS, 'clipPath');
      clipPath.setAttribute('id', clipId);
      clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse'); // 전체 좌표 기준

      // 리본 모양 path
      const path = document.createElementNS(svgNS, 'path');
      const d = `
         M${x},${y}
         H${x + width}
         V${y + height}
         L${x + width - wing},${y + height * 0.6}
         H${x + wing}
         L${x},${y + height}
         V${y}
         Z
      `.replace(/\s+/g, ' ');

      path.setAttribute('d', d);
      clipPath.appendChild(path);
      defs.appendChild(clipPath);

      // 실제 막대에 clip-path 적용
      rect.setAttribute('clip-path', `url(#${clipId})`);
      if (progress) {
         progress.setAttribute('clip-path', `url(#${clipId})`);
      }
   });
}

// Gantt 차트를 특정 날짜 범위로 제한해서 보여주는 함수
// 예: 2025년 6월 한 달만 보기

function showRange(ganttInstance, startDate, endDate) {
   ganttInstance.gantt_start = new Date(startDate);
   ganttInstance.gantt_end = new Date(endDate);
   ganttInstance.gantt_start.setHours(0, 0, 0, 0);

   ganttInstance.setup_date_values(); // 내부 날짜 재생성
   ganttInstance.render(); // 다시 그리기

   dataIdSlice();
}
showRange(gantt, StartChartDate, EndChartDate);
clipMainBarsWithRibbonShape();

function resultNowTasks() {
   const navLIst = document.getElementById('gantt-nav-list');
   filteredTasks.forEach((task) => {
      const clone = document
         .querySelector('#list_wrap_clone .list_wrap')
         .cloneNode(true);

      clone.dataset.taskId = task.id;
      clone.querySelector('.list-Name').innerHTML = task.name;
      //clone.querySelector(".list-Duration").textContent = task.name;

      if (task.type == 'main') clone.dataset.type = 'main';
      if (task.type == 'sub') {
         clone.dataset.type = 'sub';
         clone.dataset.group = task.group;

         clone.querySelector('.list-Start').innerHTML = task.start;
         clone.querySelector('.list-Status').innerHTML = task.progress;
      }
      navLIst.appendChild(clone);
   });
}
resultNowTasks();

// 예를 들어, 화면에 보이는 task의 총 진행률 평균을 구하고 싶다면:

// const visibleTasks = getVisibleTasks(gantt);
// const avgProgress =
//    visibleTasks.reduce((sum, t) => sum + t.progress, 0) /
//    visibleTasks.length;

// console.log(`현재 보이는 작업들의 평균 진행률: ${avgProgress.toFixed(1)}%`);

// 화면에 보이는 task 목록	gantt.bars.map(bar => bar.task)
// 각 bar의 위치/크기 접근	bar.$bar.getX(), getY(), getWidth() 등
// 전체 task 목록	gantt.tasks

/* 토글 기능 넣기 */
// ✅ 리스트 토글 및 Gantt 바 위치 재정렬 전체 통합 코드
const GANTT_ROW_HEIGHT = 38; // 행 높이 기준값

function updateBarGroupPositions() {
   const groupHidden = new Set();

   document
      .querySelectorAll('.list_wrap[data-type="main"]')
      .forEach((mainItem) => {
         const groupName = mainItem.dataset.taskId;
         const isHidden = mainItem.classList.contains('hidden');
         if (isHidden) groupHidden.add(groupName);
      });

   const wrappers = Array.from(document.querySelectorAll('.bar-wrapper'));

   // group별로 y 좌표 누적 증가값 계산을 위한 맵
   let yOffsets = new Map();
   let groupRowCounts = new Map();

   // 각 그룹의 sub-task 개수 세기
   wrappers.forEach((wrapper) => {
      const group = wrapper.dataset.group;
      const taskId = wrapper.dataset.id;
      const task = gantt.tasks.find((t) => t.id === taskId);
      const isMain = task?.type === 'main';

      if (!isMain && !groupRowCounts.has(group)) {
         const count = wrappers.filter(
            (w) =>
               w.dataset.group === group &&
               gantt.tasks.find((t) => t.id === w.dataset.id)?.type === 'sub'
         ).length;
         groupRowCounts.set(group, count);
      }
   });

   // group 순서에 따라 줄 수만큼 yOffset 누적
   let totalOffset = 0;
   const groupOrder = [...new Set(wrappers.map((w) => w.dataset.group))];
   groupOrder.forEach((group) => {
      yOffsets.set(group, totalOffset);
      if (groupHidden.has(group)) {
         totalOffset -= (groupRowCounts.get(group) || 0) * GANTT_ROW_HEIGHT;
      }
   });

   wrappers.forEach((wrapper) => {
      const group = wrapper.dataset.group;
      const taskId = wrapper.dataset.id;
      const task = gantt.tasks.find((t) => t.id === taskId);
      const isMain = task?.type === 'main';

      const barGroup = wrapper.querySelector('.bar-group');
      if (!barGroup) return;

      const transform = barGroup.getAttribute('transform');
      const match = transform?.match(/translate\(([^,]+),\s*([^)]+)\)/);
      const x = match ? match[1] : 0;
      const originalY = match ? parseFloat(match[2]) : 0;

      // 초기 Y값을 저장 (최초 1회만)
      if (!barGroup.dataset.originalY) {
         barGroup.dataset.originalY = originalY;
      }

      const baseY = parseFloat(barGroup.dataset.originalY);
      const offset = yOffsets.get(group) || 0;

      if (!isMain && groupHidden.has(group)) {
         wrapper.style.display = 'none';
      } else {
         wrapper.style.display = 'block';
         barGroup.setAttribute(
            'transform',
            `translate(${x}, ${baseY + offset})`
         );
      }
   });

   // 🔄 화살표 위치도 업데이트
   const arrows = document.querySelectorAll('.arrow path');

   arrows.forEach((arrow) => {
      const fromId = arrow.dataset.from;
      const toId = arrow.dataset.to;

      const fromWrapper = document.querySelector(
         `.bar-wrapper[data-id="${fromId}"]`
      );
      const toWrapper = document.querySelector(
         `.bar-wrapper[data-id="${toId}"]`
      );
      if (!fromWrapper || !toWrapper) return;

      const fromGroup = fromWrapper.dataset.group;
      const toGroup = toWrapper.dataset.group;
      const fromOffset = yOffsets.get(fromGroup) || 0;
      const toOffset = yOffsets.get(toGroup) || 0;

      if (groupHidden.has(fromGroup) || groupHidden.has(toGroup)) {
         arrow.style.display = 'none';
         return;
      } else {
         arrow.style.display = 'block';
      }

      if (!arrow.dataset.originalD) {
         arrow.dataset.originalD = arrow.getAttribute('d');
      }

      const originalD = arrow.dataset.originalD;
      const commands = originalD.trim().split(/\s*(?=[MLVla])\s*/);
      let lastLY = null;

      const newD =
         commands
            .map((cmd) => {
               const [command, ...rest] = cmd.trim().split(/\s+/);

               if (command === 'M') {
                  const [x, y] = rest.map(parseFloat);
                  return `M ${x} ${y + fromOffset}`;
               }

               if (command === 'V') {
                  const vY = parseFloat(rest[0]);
                  return `V ${vY + fromOffset}`;
               }

               if (command === 'a') {
                  return `a ${rest.join(' ')}`; // 🔁 그대로 유지
               }

               if (command === 'L') {
                  const [x, y] = rest.map(parseFloat);
                  lastLY = y + toOffset;
                  return `L ${x} ${lastLY}`;
               }

               return null;
            })
            .filter(Boolean)
            .join(' ') + ' m -3 -3 l 3 3 l -3 3';

      arrow.setAttribute('d', newD);
   });

   clipMainBarsWithRibbonShape();
}

// ✅ 리스트 클릭 이벤트 핸들러 등록
document
   .querySelectorAll('.list_wrap[data-type="main"]')
   .forEach((mainItem) => {
      mainItem.addEventListener('click', () => {
         const groupName = mainItem.dataset.taskId;
         mainItem.classList.toggle('hidden');
         document
            .querySelector(`[data-id="${groupName}"]`)
            .classList.toggle('hidden');

         document
            .querySelectorAll(
               `.list_wrap[data-group="${groupName}"]:not([data-type="main"])`
            )
            .forEach((el) => {
               el.style.display = el.style.display === 'none' ? 'flex' : 'none';
            });

         updateBarGroupPositions();
      });
   });

// function mainTopPadding() {
//    let y = 75;
//    const main = document.querySelectorAll('g.bar .bar-wrapper');
//    const grids = document.querySelectorAll('g.grid .grid-row');

//    for (let i = 0; i < main.length; i++) {
//       if (main[i].classList.contains('main-task')) {
//          grids[i].setAttribute('height', 50);
//          grids[i].setAttribute('y', y);
//          y += 50;
//       } else {
//          grids[i].setAttribute('height', 38);
//          grids[i].setAttribute('y', y);
//          y += 38;
//       }
//    }
// }
// mainTopPadding();
