/* 옵션 설정 */
const tasks = [
   {
      id: 'task1', // 고유 작업 ID (dependencies 연결 시 필요)
      name: '기획서 작성', // 작업 이름
      start: '2025-06-10', // 시작일 (형식: YYYY-MM-DD)
      end: '2025-06-12', // 종료일 (형식: YYYY-MM-DD)
      progress: 50, // 작업 진행률 (0~100%)
      dependencies: '', //앞선 작업 ID (작업 순서 연결용)
   },
   {
      id: 'task2',
      name: '디자인 작업',
      start: '2025-06-13',
      end: '2025-06-15',
      progress: 20,
      dependencies: 'task1',
   },
];
// const gantt = new Gantt("#gantt", tasks);
const gantt = new Gantt('#gantt', tasks, {
   language: 'kr', //현지화를 위한 언어
   // 날짜 세팅
   view_mode: 'Day', // 간트 차트의 초기 보기 모드(Day, Week, Month, Year.)
   view_mode_select: true, // 드롭다운에서 보기 모드를 선택할지
   today_button: true, // 오늘 날짜로 이동하는 버튼 추가
   date_format: 'YYYY-MM-DD', // 날짜를 표시하는 형식.
   scroll_to: 'today', // 차트가 렌더링될 때의 시작점(today, start, end, 또는 날짜 문자열)
   // 팝업 세팅
   popup_on: 'click', // 팝업 표시를 트리거하는 이벤트(click, hover)
   custom_popup_html: null,
   //css 스타일링
   arrow_curve: 5, // 연결선 곡선 반경,
   bar_corner_radius: 3, // 작업표시줄 모서리 반경
   bar_height: 40, // 작업표시줄 높이
   container_height: 'auto', // 컨테이너 높이
   upper_header_height: 45, // 타임라인 상단 헤더 높이
   lower_header_height: 30, // 타임라인 하단 헤더 높이
   column_width: 50, // 타임라인의 각 열의 너비
   step: 24, // 시간 간격 (분 단위)
   snap_at: '1d', // 크기 조정이나 드래그 시 특정 간격으로 작업을 스냅
   lines: 'vertical', // 표시할 격자선 (none, vertical, horixontal, both)
   // 기타
   // ignore: [], 렌더링에서 무시된 영역 weekend 또는 문자열이나 날짜 객체의 배열( weekend배열에도 존재할 수 있음).
   // holidays: { 'var(--g-weekend-highlight-color)': 'weekend' }, // 타임라인 휴일 강조 표시, 휴일 유형에 CSS 색상을 매핑하는 객체 {date: ..., label: ...}
   infinite_padding: false, // 사용자가 스크롤할 때 타임라인을 무한대로 확장할지 여부, true가 기본상태이나 true 상태일 경우 여분의 기간을 같이 가져와 가로 스크롤이 길어짐
   //show_expected_progress: true, // 작업에 대한 예상 진행 상황
   move_dependencies: true, // 작업을 이동하면 해당 종속성도 자동으로 이동되는지 여부
   readonly: false, // 모든 편집 기능을 비활성화
   readonly_dates: false, // 작업 날짜 편집을 비활성화
   readonly_progress: false, //작업 진행 상황 편집을 비활성화
   auto_move_label: false, // 사용자가 수평으로 스크롤하면 작업 라벨을 이동함
   on_click: (task) => {
      console.log(`클릭한 작업: ${task.name}`);
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
      console.log(`현재 보기 모드: ${mode}`);
   },
});

/*
    << 이벤트 핸들러 >>

    1. on_click(task) : 바 클릭 시 호출
    2. on_date_change(task, start, end) : 드래그로 날짜 바뀔 때 호출
    3. on_progress_change(task, progress) : 진행률 드래그로 변경 시 호출
    4. on_view_change(mode)	: 뷰 모드가 바뀔 때 호출됨 (e.g., Day → Week)
*/

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
const tasks2 = [
   {
      id: 'task1', // 고유 작업 ID (dependencies 연결 시 필요)
      name: '기획서 작성', // 작업 이름
      start: '2025-06-10', // 시작일 (형식: YYYY-MM-DD)
      end: '2025-06-12', // 종료일 (형식: YYYY-MM-DD)
      progress: 50, // 작업 진행률 (0~100%)
      dependencies: '', //앞선 작업 ID (작업 순서 연결용)
   },
   {
      id: 'task2',
      name: '디자인 작업',
      start: '2025-06-13',
      end: '2025-06-15',
      progress: 20,
      dependencies: 'task1',
   },
];

const gantt2 = new Gantt('#gantt-popupHTML', tasks, {
   infinite_padding: false,
   container_height: 400, // 컨테이너 높이
   popup_on: 'click',
   popup: ({ task, chart, set_title, set_details, add_action }) => {
      set_title(`<b>${task.name}이다!</b>`);
      set_details(`
      <p><strong>기간:</strong> ${task.start} ~ ${task.end}</p>
      <p><strong>진행률:</strong> ${task.progress}%</p>
    `);
      add_action('<button>삭제</button>', () => {
         alert(`${task.name} 삭제 클릭됨`);
      });
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
document.getElementById('view-month').addEventListener('click', () => {
   gantt.change_view_mode('Month');
});

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

/* "특정 날짜 범위로 스크롤 이동"*/
