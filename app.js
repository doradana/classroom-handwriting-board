const STORAGE_KEY = "classroom-handwriting-room";
const LANGUAGE_KEY = "classroom-handwriting-language";
const TEACHER_KEY = "classroom-handwriting-teacher";
const TEACHER_TOKEN_KEY = "classroom-handwriting-teacher-token";
const API_BASE = window.location.protocol === "file:" ? "http://127.0.0.1:8030" : "";

const TRANSLATIONS = {
  "zh-Hans": {
    title: "中文手写房间公布栏",
    eyebrow: "课堂手写练习",
    appTitle: "中文手写房间公布栏",
    languageLabel: "界面语言",
    roomPassword: "房间密码",
    joinHeadline: "老师设定数字，学生输入后一起进入同一个公布栏",
    teacher: "老师",
    student: "学生",
    teacherLoginTitle: "老师账号",
    teacherNotSignedIn: "尚未记录老师资料",
    teacherSignedIn: "已记录：{name}",
    googleLogin: "登入老师账号",
    googleUnavailable: "请使用网站老师账号登入。",
    teacherNameLabel: "老师姓名",
    teacherNamePlaceholder: "例如：王老师",
    teacherEmailLabel: "账号",
    teacherEmailPlaceholder: "teacher01",
    googleNote: "老师使用网站账号登入后，就能保存自己的课程纪录。",
    roomCodeLabel: "房间数字密码",
    roomCodePlaceholder: "例如：2468",
    enterRoom: "进入房间",
    roomNote: "老师先设定 4 到 8 位数字；学生输入同一组数字，就会看到同一个公布栏。",
    courseFolder: "课程文件夹",
    defaultCourse: "默认课程",
    selectCourse: "选择课程",
    newCourseName: "新增课程文件夹",
    newCoursePlaceholder: "例如：三年级第一课",
    addCourse: "新增",
    courseCreated: "已新增课程：{name}",
    courseCreateFailed: "新增课程失败，请确认服务器是否开启。",
    studentName: "学生姓名",
    studentNamePlaceholder: "例如：小明",
    practiceTopic: "练习主题",
    promptPlaceholder: "例如：今天的句子",
    pen: "笔",
    eraser: "擦",
    brushSize: "粗细",
    inkColor: "墨色",
    clearShort: "清",
    drawTitle: "写字",
    eraseTitle: "橡皮擦",
    brushTitle: "笔画粗细",
    inkTitle: "墨水颜色",
    undoTitle: "撤销",
    clearTitle: "清空",
    canvasLabel: "请在这里手写中文",
    submitPost: "送到公布栏",
    sameRoomVisible: "同房间可见",
    boardTitle: "公布栏",
    switchRoom: "换房间",
    clearBoard: "清空公布栏",
    searchPlaceholder: "搜索姓名或主题",
    searchLabel: "搜索作品",
    sortLabel: "排序",
    sortNewest: "最新",
    sortOldest: "最旧",
    sortName: "姓名",
    emptyTitle: "这个课程还没有作品",
    emptyText: "学生送出手写作品后，会出现在这里。",
    roomPrefix: "房间",
    postCount: "{count} 件作品",
    roomSync: "房间同步",
    offline: "离线",
    notInRoom: "未进入房间",
    helperLocked: "请先进入房间，再开始书写。",
    helperInRoom: "写完后送出；同房间、同课程的人都会看到。",
    invalidRoom: "房间密码必须是 4 到 8 位数字。",
    roomNotFound: "这个房间还没有建立。请确认老师已经先设定这个数字。",
    roomCheckFailed: "无法确认房间，请确认服务器是否开启。",
    creatingRoom: "正在建立房间...",
    checkingRoom: "正在检查房间...",
    serverMissing: "尚未连接服务器。跨装置使用需要开启服务器或发布到公开网址。",
    enterFirst: "请先进入房间。",
    writeFirst: "请先在手写板写字。",
    sending: "正在送出...",
    defaultPrompt: "中文手写练习",
    sentToRoom: "已送到 {course}。",
    sendFailed: "送出失败，请确认服务器是否开启。",
    confirmClear: "确定清空「{course}」的公布栏吗？",
    clearFailed: "清空失败，请确认服务器是否开启。",
    imageAlt: "{name} 的手写中文",
    expandBoard: "放大公布栏",
    closeBoard: "关闭满版公布栏",
  },
  "zh-Hant": {
    title: "中文手寫房間公佈欄",
    eyebrow: "課堂手寫練習",
    appTitle: "中文手寫房間公佈欄",
    languageLabel: "介面語言",
    roomPassword: "房間密碼",
    joinHeadline: "老師設定數字，學生輸入後一起進入同一個公佈欄",
    teacher: "老師",
    student: "學生",
    teacherLoginTitle: "老師帳號",
    teacherNotSignedIn: "尚未記錄老師資料",
    teacherSignedIn: "已記錄：{name}",
    googleLogin: "登入老師帳號",
    googleUnavailable: "請使用網站老師帳號登入。",
    teacherNameLabel: "老師姓名",
    teacherNamePlaceholder: "例如：王老師",
    teacherEmailLabel: "帳號",
    teacherEmailPlaceholder: "teacher01",
    googleNote: "老師使用網站帳號登入後，就能保存自己的課程紀錄。",
    roomCodeLabel: "房間數字密碼",
    roomCodePlaceholder: "例如：2468",
    enterRoom: "進入房間",
    roomNote: "老師先設定 4 到 8 位數字；學生輸入同一組數字，就會看到同一個公佈欄。",
    courseFolder: "課程資料夾",
    defaultCourse: "預設課程",
    selectCourse: "選擇課程",
    newCourseName: "新增課程資料夾",
    newCoursePlaceholder: "例如：三年級第一課",
    addCourse: "新增",
    courseCreated: "已新增課程：{name}",
    courseCreateFailed: "新增課程失敗，請確認伺服器是否開啟。",
    studentName: "學生姓名",
    studentNamePlaceholder: "例如：小明",
    practiceTopic: "練習主題",
    promptPlaceholder: "例如：今天的句子",
    pen: "筆",
    eraser: "擦",
    brushSize: "粗細",
    inkColor: "墨色",
    clearShort: "清",
    drawTitle: "寫字",
    eraseTitle: "橡皮擦",
    brushTitle: "筆畫粗細",
    inkTitle: "墨水顏色",
    undoTitle: "復原",
    clearTitle: "清空",
    canvasLabel: "請在這裡手寫中文",
    submitPost: "送到公佈欄",
    sameRoomVisible: "同房間可見",
    boardTitle: "公佈欄",
    switchRoom: "換房間",
    clearBoard: "清空公佈欄",
    searchPlaceholder: "搜尋姓名或主題",
    searchLabel: "搜尋作品",
    sortLabel: "排序",
    sortNewest: "最新",
    sortOldest: "最舊",
    sortName: "姓名",
    emptyTitle: "這個課程還沒有作品",
    emptyText: "學生送出手寫作品後，會出現在這裡。",
    roomPrefix: "房間",
    postCount: "{count} 件作品",
    roomSync: "房間同步",
    offline: "離線",
    notInRoom: "未進入房間",
    helperLocked: "請先進入房間，再開始書寫。",
    helperInRoom: "寫完後送出；同房間、同課程的人都會看到。",
    invalidRoom: "房間密碼必須是 4 到 8 位數字。",
    roomNotFound: "這個房間還沒有建立。請確認老師已經先設定這個數字。",
    roomCheckFailed: "無法確認房間，請確認伺服器是否開啟。",
    creatingRoom: "正在建立房間...",
    checkingRoom: "正在檢查房間...",
    serverMissing: "尚未連接伺服器。跨裝置使用需要開啟伺服器或發布到公開網址。",
    enterFirst: "請先進入房間。",
    writeFirst: "請先在手寫板寫字。",
    sending: "正在送出...",
    defaultPrompt: "中文手寫練習",
    sentToRoom: "已送到 {course}。",
    sendFailed: "送出失敗，請確認伺服器是否開啟。",
    confirmClear: "確定清空「{course}」的公佈欄嗎？",
    clearFailed: "清空失敗，請確認伺服器是否開啟。",
    imageAlt: "{name} 的手寫中文",
    expandBoard: "放大公佈欄",
    closeBoard: "關閉滿版公佈欄",
  },
  en: {
    title: "Chinese Handwriting Room Board",
    eyebrow: "Class handwriting practice",
    appTitle: "Chinese Handwriting Room Board",
    languageLabel: "Interface language",
    roomPassword: "Room code",
    joinHeadline: "The teacher sets a number, and students join the same board",
    teacher: "Teacher",
    student: "Student",
    teacherLoginTitle: "Teacher account",
    teacherNotSignedIn: "No teacher saved yet",
    teacherSignedIn: "Saved: {name}",
    googleLogin: "Sign in to teacher account",
    googleUnavailable: "Please use the website teacher account.",
    teacherNameLabel: "Teacher name",
    teacherNamePlaceholder: "Example: Ms. Wang",
    teacherEmailLabel: "Account",
    teacherEmailPlaceholder: "teacher01",
    googleNote: "Sign in with a website teacher account to save course history.",
    roomCodeLabel: "Numeric room code",
    roomCodePlaceholder: "Example: 2468",
    enterRoom: "Enter room",
    roomNote: "The teacher sets a 4 to 8 digit code. Students enter the same code to see the shared board.",
    courseFolder: "Course folder",
    defaultCourse: "Default course",
    selectCourse: "Select course",
    newCourseName: "New course folder",
    newCoursePlaceholder: "Example: Grade 3 Lesson 1",
    addCourse: "Add",
    courseCreated: "Course added: {name}",
    courseCreateFailed: "Could not add course. Please check the server.",
    studentName: "Student name",
    studentNamePlaceholder: "Example: Ming",
    practiceTopic: "Practice topic",
    promptPlaceholder: "Example: today's sentence",
    pen: "Pen",
    eraser: "Erase",
    brushSize: "Size",
    inkColor: "Ink",
    clearShort: "Clear",
    drawTitle: "Write",
    eraseTitle: "Eraser",
    brushTitle: "Stroke width",
    inkTitle: "Ink color",
    undoTitle: "Undo",
    clearTitle: "Clear canvas",
    canvasLabel: "Handwrite Chinese here",
    submitPost: "Send to board",
    sameRoomVisible: "Visible in this room",
    boardTitle: "Board",
    switchRoom: "Switch room",
    clearBoard: "Clear board",
    searchPlaceholder: "Search name or topic",
    searchLabel: "Search work",
    sortLabel: "Sort",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortName: "Name",
    emptyTitle: "No work in this course yet",
    emptyText: "Student handwriting will appear here after submission.",
    roomPrefix: "Room",
    postCount: "{count} works",
    roomSync: "Room sync",
    offline: "Offline",
    notInRoom: "Not in room",
    helperLocked: "Enter a room before handwriting.",
    helperInRoom: "Submit when finished. Everyone in the same room and course will see it.",
    invalidRoom: "The room code must be 4 to 8 digits.",
    roomNotFound: "This room has not been created yet. Please check that the teacher has set this number first.",
    roomCheckFailed: "Could not check the room. Please confirm that the server is running.",
    creatingRoom: "Creating room...",
    checkingRoom: "Checking room...",
    serverMissing: "No server connection. Cross-device use needs a running server or public deployment.",
    enterFirst: "Enter the room first.",
    writeFirst: "Please write on the board before submitting.",
    sending: "Sending...",
    defaultPrompt: "Chinese handwriting practice",
    sentToRoom: "Sent to {course}.",
    sendFailed: "Send failed. Please check the server.",
    confirmClear: "Clear the board for \"{course}\"?",
    clearFailed: "Clear failed. Please check the server.",
    imageAlt: "{name}'s handwritten Chinese",
    expandBoard: "Expand board",
    closeBoard: "Close full-screen board",
  },
  ja: {
    title: "中国語手書きルーム掲示板",
    eyebrow: "授業の手書き練習",
    appTitle: "中国語手書きルーム掲示板",
    languageLabel: "表示言語",
    roomPassword: "ルーム番号",
    joinHeadline: "先生が数字を設定し、学生が入力して同じ掲示板に入ります",
    teacher: "先生",
    student: "学生",
    teacherLoginTitle: "先生アカウント",
    teacherNotSignedIn: "先生情報は未保存です",
    teacherSignedIn: "保存済み：{name}",
    googleLogin: "先生アカウントでログイン",
    googleUnavailable: "サイトの先生アカウントを使用してください。",
    teacherNameLabel: "先生名",
    teacherNamePlaceholder: "例：王先生",
    teacherEmailLabel: "アカウント",
    teacherEmailPlaceholder: "teacher01",
    googleNote: "サイトの先生アカウントでログインすると授業履歴を保存できます。",
    roomCodeLabel: "数字のルーム番号",
    roomCodePlaceholder: "例：2468",
    enterRoom: "入室",
    roomNote: "先生が 4 から 8 桁の数字を設定します。学生は同じ数字を入力すると同じ掲示板を見られます。",
    courseFolder: "授業フォルダ",
    defaultCourse: "標準コース",
    selectCourse: "コース選択",
    newCourseName: "新しい授業フォルダ",
    newCoursePlaceholder: "例：3年生 第1課",
    addCourse: "追加",
    courseCreated: "コースを追加しました：{name}",
    courseCreateFailed: "コースを追加できません。サーバーを確認してください。",
    studentName: "学生名",
    studentNamePlaceholder: "例：小明",
    practiceTopic: "練習テーマ",
    promptPlaceholder: "例：今日の文",
    pen: "ペン",
    eraser: "消す",
    brushSize: "太さ",
    inkColor: "色",
    clearShort: "消去",
    drawTitle: "書く",
    eraseTitle: "消しゴム",
    brushTitle: "線の太さ",
    inkTitle: "インク色",
    undoTitle: "戻す",
    clearTitle: "全消去",
    canvasLabel: "ここに中国語を手書きしてください",
    submitPost: "掲示板に送信",
    sameRoomVisible: "同じルームで表示",
    boardTitle: "掲示板",
    switchRoom: "ルーム変更",
    clearBoard: "掲示板を消去",
    searchPlaceholder: "名前やテーマを検索",
    searchLabel: "作品検索",
    sortLabel: "並び替え",
    sortNewest: "新しい順",
    sortOldest: "古い順",
    sortName: "名前",
    emptyTitle: "このコースにはまだ作品がありません",
    emptyText: "学生が送信すると、ここに表示されます。",
    roomPrefix: "ルーム",
    postCount: "{count} 件",
    roomSync: "同期中",
    offline: "オフライン",
    notInRoom: "未入室",
    helperLocked: "先にルームへ入ってください。",
    helperInRoom: "書き終わったら送信します。同じルーム、同じコースの人が見られます。",
    invalidRoom: "ルーム番号は 4 から 8 桁の数字です。",
    roomNotFound: "このルームはまだ作成されていません。先生が先に設定したか確認してください。",
    roomCheckFailed: "ルームを確認できません。サーバーが起動しているか確認してください。",
    creatingRoom: "ルーム作成中...",
    checkingRoom: "ルーム確認中...",
    serverMissing: "サーバーに接続していません。複数端末で使うにはサーバー起動または公開URLが必要です。",
    enterFirst: "先に入室してください。",
    writeFirst: "送信前に手書きしてください。",
    sending: "送信中...",
    defaultPrompt: "中国語手書き練習",
    sentToRoom: "{course} に送信しました。",
    sendFailed: "送信できません。サーバーを確認してください。",
    confirmClear: "「{course}」の掲示板を消去しますか？",
    clearFailed: "消去できません。サーバーを確認してください。",
    imageAlt: "{name} の手書き中国語",
    expandBoard: "掲示板を拡大",
    closeBoard: "全画面掲示板を閉じる",
  },
  vi: {
    title: "Bảng phòng luyện viết tay tiếng Trung",
    eyebrow: "Luyện viết tay trong lớp",
    appTitle: "Bảng phòng luyện viết tay tiếng Trung",
    languageLabel: "Ngôn ngữ giao diện",
    roomPassword: "Mã phòng",
    joinHeadline: "Giáo viên đặt số, học sinh nhập để vào cùng một bảng",
    teacher: "Giáo viên",
    student: "Học sinh",
    teacherLoginTitle: "Tài khoản giáo viên",
    teacherNotSignedIn: "Chưa lưu thông tin giáo viên",
    teacherSignedIn: "Đã lưu: {name}",
    googleLogin: "Đăng nhập tài khoản giáo viên",
    googleUnavailable: "Hãy dùng tài khoản giáo viên của trang web.",
    teacherNameLabel: "Tên giáo viên",
    teacherNamePlaceholder: "Ví dụ: Cô Wang",
    teacherEmailLabel: "Tài khoản",
    teacherEmailPlaceholder: "teacher01",
    googleNote: "Đăng nhập bằng tài khoản giáo viên của trang web để lưu lịch sử lớp học.",
    roomCodeLabel: "Mã phòng bằng số",
    roomCodePlaceholder: "Ví dụ: 2468",
    enterRoom: "Vào phòng",
    roomNote: "Giáo viên đặt mã từ 4 đến 8 chữ số. Học sinh nhập cùng mã để xem chung một bảng.",
    courseFolder: "Thư mục lớp học",
    defaultCourse: "Lớp mặc định",
    selectCourse: "Chọn lớp",
    newCourseName: "Thư mục lớp mới",
    newCoursePlaceholder: "Ví dụ: Lớp 3 Bài 1",
    addCourse: "Thêm",
    courseCreated: "Đã thêm lớp: {name}",
    courseCreateFailed: "Không thể thêm lớp. Hãy kiểm tra máy chủ.",
    studentName: "Tên học sinh",
    studentNamePlaceholder: "Ví dụ: Minh",
    practiceTopic: "Chủ đề luyện tập",
    promptPlaceholder: "Ví dụ: câu hôm nay",
    pen: "Bút",
    eraser: "Xóa",
    brushSize: "Nét",
    inkColor: "Mực",
    clearShort: "Xóa",
    drawTitle: "Viết",
    eraseTitle: "Tẩy",
    brushTitle: "Độ dày nét",
    inkTitle: "Màu mực",
    undoTitle: "Hoàn tác",
    clearTitle: "Xóa bảng viết",
    canvasLabel: "Viết tay tiếng Trung tại đây",
    submitPost: "Gửi lên bảng",
    sameRoomVisible: "Hiển thị trong cùng phòng",
    boardTitle: "Bảng",
    switchRoom: "Đổi phòng",
    clearBoard: "Xóa bảng",
    searchPlaceholder: "Tìm tên hoặc chủ đề",
    searchLabel: "Tìm bài viết",
    sortLabel: "Sắp xếp",
    sortNewest: "Mới nhất",
    sortOldest: "Cũ nhất",
    sortName: "Tên",
    emptyTitle: "Lớp này chưa có bài",
    emptyText: "Bài viết tay của học sinh sẽ xuất hiện ở đây sau khi gửi.",
    roomPrefix: "Phòng",
    postCount: "{count} bài",
    roomSync: "Đồng bộ phòng",
    offline: "Mất kết nối",
    notInRoom: "Chưa vào phòng",
    helperLocked: "Hãy vào phòng trước khi viết.",
    helperInRoom: "Gửi sau khi viết xong. Mọi người cùng phòng và cùng lớp sẽ thấy.",
    invalidRoom: "Mã phòng phải gồm 4 đến 8 chữ số.",
    roomNotFound: "Phòng này chưa được tạo. Hãy kiểm tra giáo viên đã đặt mã này trước chưa.",
    roomCheckFailed: "Không thể kiểm tra phòng. Hãy xác nhận máy chủ đang chạy.",
    creatingRoom: "Đang tạo phòng...",
    checkingRoom: "Đang kiểm tra phòng...",
    serverMissing: "Chưa kết nối máy chủ. Dùng nhiều thiết bị cần bật máy chủ hoặc xuất bản URL công khai.",
    enterFirst: "Hãy vào phòng trước.",
    writeFirst: "Hãy viết trên bảng trước khi gửi.",
    sending: "Đang gửi...",
    defaultPrompt: "Luyện viết tay tiếng Trung",
    sentToRoom: "Đã gửi vào {course}.",
    sendFailed: "Gửi thất bại. Hãy kiểm tra máy chủ.",
    confirmClear: "Xóa bảng của \"{course}\"?",
    clearFailed: "Xóa thất bại. Hãy kiểm tra máy chủ.",
    imageAlt: "Bài viết tay tiếng Trung của {name}",
    expandBoard: "Phóng to bảng",
    closeBoard: "Đóng bảng toàn màn hình",
  },
};

const canvas = document.querySelector("#writingCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const canvasWrap = document.querySelector(".canvas-wrap");
const form = document.querySelector("#postForm");
Object.assign(TRANSLATIONS["zh-Hans"], {
  teacherNotSignedIn: "尚未登入老师账号",
  teacherSignedIn: "已登入：{name}",
  teacherUsernameLabel: "账号",
  teacherUsernamePlaceholder: "例如：teacher01",
  teacherPasswordLabel: "密码",
  teacherPasswordPlaceholder: "至少 6 个字",
  loginTeacher: "登入",
  registerTeacher: "建立账号",
  logoutTeacher: "登出",
  loginRequired: "请先登入老师账号，才能建立房间。",
  loginSuccess: "老师账号已登入。",
  registerSuccess: "账号已建立并登入。",
    loginFailed: "登入失败，请确认账号和密码。",
    registerFailed: "建立账号失败，账号可能已被使用，或密码少于 6 个字。",
    teacherSessionExpired: "老师登入已失效，请重新登入后再建立房间。",
  historyTitle: "历史课程",
  historyEmpty: "登入后建立的课程会显示在这里。",
  openHistoryRoom: "进入",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  teacherNotSignedIn: "尚未登入老師帳號",
  teacherSignedIn: "已登入：{name}",
  teacherUsernameLabel: "帳號",
  teacherUsernamePlaceholder: "例如：teacher01",
  teacherPasswordLabel: "密碼",
  teacherPasswordPlaceholder: "至少 6 個字",
  loginTeacher: "登入",
  registerTeacher: "建立帳號",
  logoutTeacher: "登出",
  loginRequired: "請先登入老師帳號，才能建立房間。",
  loginSuccess: "老師帳號已登入。",
  registerSuccess: "帳號已建立並登入。",
    loginFailed: "登入失敗，請確認帳號和密碼。",
    registerFailed: "建立帳號失敗，帳號可能已被使用，或密碼少於 6 個字。",
    teacherSessionExpired: "老師登入已失效，請重新登入後再建立房間。",
  historyTitle: "歷史課程",
  historyEmpty: "登入後建立的課程會顯示在這裡。",
  openHistoryRoom: "進入",
});

Object.assign(TRANSLATIONS.en, {
  teacherNotSignedIn: "Teacher account is not signed in",
  teacherSignedIn: "Signed in: {name}",
  teacherUsernameLabel: "Account",
  teacherUsernamePlaceholder: "Example: teacher01",
  teacherPasswordLabel: "Password",
  teacherPasswordPlaceholder: "At least 6 characters",
  loginTeacher: "Log in",
  registerTeacher: "Create account",
  logoutTeacher: "Log out",
  loginRequired: "Log in with a teacher account before creating a room.",
  loginSuccess: "Teacher account signed in.",
  registerSuccess: "Account created and signed in.",
  loginFailed: "Login failed. Check the account and password.",
  registerFailed: "Could not create the account. It may already exist, or the password is too short.",
  teacherSessionExpired: "Teacher login expired. Please log in again before creating a room.",
  historyTitle: "Course history",
  historyEmpty: "Rooms created after login will appear here.",
  openHistoryRoom: "Open",
});

Object.assign(TRANSLATIONS.ja, {
  teacherNotSignedIn: "先生アカウントは未ログインです",
  teacherSignedIn: "ログイン中：{name}",
  teacherUsernameLabel: "アカウント",
  teacherUsernamePlaceholder: "例：teacher01",
  teacherPasswordLabel: "パスワード",
  teacherPasswordPlaceholder: "6文字以上",
  loginTeacher: "ログイン",
  registerTeacher: "アカウント作成",
  logoutTeacher: "ログアウト",
  loginRequired: "部屋を作成する前に先生アカウントでログインしてください。",
  loginSuccess: "先生アカウントでログインしました。",
  registerSuccess: "アカウントを作成してログインしました。",
  loginFailed: "ログインできません。アカウントとパスワードを確認してください。",
  registerFailed: "アカウントを作成できません。既に使用中、またはパスワードが短すぎます。",
  teacherSessionExpired: "先生ログインの有効期限が切れました。もう一度ログインしてください。",
  historyTitle: "授業履歴",
  historyEmpty: "ログイン後に作成した部屋がここに表示されます。",
  openHistoryRoom: "開く",
});

Object.assign(TRANSLATIONS.vi, {
  teacherNotSignedIn: "Chưa đăng nhập tài khoản giáo viên",
  teacherSignedIn: "Đã đăng nhập: {name}",
  teacherUsernameLabel: "Tài khoản",
  teacherUsernamePlaceholder: "Ví dụ: teacher01",
  teacherPasswordLabel: "Mật khẩu",
  teacherPasswordPlaceholder: "Ít nhất 6 ký tự",
  loginTeacher: "Đăng nhập",
  registerTeacher: "Tạo tài khoản",
  logoutTeacher: "Đăng xuất",
  loginRequired: "Hãy đăng nhập tài khoản giáo viên trước khi tạo phòng.",
  loginSuccess: "Đã đăng nhập tài khoản giáo viên.",
  registerSuccess: "Đã tạo tài khoản và đăng nhập.",
  loginFailed: "Đăng nhập thất bại. Hãy kiểm tra tài khoản và mật khẩu.",
  registerFailed: "Không thể tạo tài khoản. Tài khoản có thể đã tồn tại hoặc mật khẩu quá ngắn.",
  teacherSessionExpired: "Phiên đăng nhập giáo viên đã hết hạn. Hãy đăng nhập lại.",
  historyTitle: "Lịch sử lớp học",
  historyEmpty: "Các phòng tạo sau khi đăng nhập sẽ hiện ở đây.",
  openHistoryRoom: "Mở",
});

const roomForm = document.querySelector("#roomForm");
const roomCodeInput = document.querySelector("#roomCode");
const roomMessage = document.querySelector("#roomMessage");
const joinPanel = document.querySelector("#joinPanel");
const classroomLayout = document.querySelector("#classroomLayout");
const teacherLoginCard = document.querySelector("#teacherLoginCard");
const teacherName = document.querySelector("#teacherName");
const teacherUsername = document.querySelector("#teacherUsername");
const teacherPassword = document.querySelector("#teacherPassword");
const teacherFields = document.querySelector("#teacherFields");
const teacherStatusText = document.querySelector("#teacherStatusText");
const teacherLoginButton = document.querySelector("#teacherLoginButton");
const teacherRegisterButton = document.querySelector("#teacherRegisterButton");
const teacherLogoutButton = document.querySelector("#teacherLogoutButton");
const teacherHistory = document.querySelector("#teacherHistory");
const studentName = document.querySelector("#studentName");
const promptText = document.querySelector("#promptText");
const coursePanel = document.querySelector("#coursePanel");
const courseForm = document.querySelector("#courseForm");
const courseSelect = document.querySelector("#courseSelect");
const courseNameInput = document.querySelector("#courseNameInput");
const activeCourseName = document.querySelector("#activeCourseName");
const boardCourseLabel = document.querySelector("#boardCourseLabel");
const brushSize = document.querySelector("#brushSize");
const inkColor = document.querySelector("#inkColor");
const helperText = document.querySelector("#helperText");
const boardList = document.querySelector("#boardList");
const boardPanel = document.querySelector(".board-panel");
const fullscreenBoardButton = document.querySelector("#fullscreenBoardButton");
const endCourseButton = document.querySelector("#endCourseButton");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const emptyTemplate = document.querySelector("#emptyTemplate");
const languageSelect = document.querySelector("#languageSelect");

let posts = [];
let courses = [];
let teacherSession = loadTeacherProfile();
let activeRoom = "";
let activeRole = "teacher";
let activeCourseId = "default";
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "zh-Hant";
let useServer = true;
let mode = "draw";
let drawing = false;
let lastPoint = null;
let hasInk = false;
let undoStack = [];
let resizeTimer = null;
let refreshTimer = null;
let courseRefreshTimer = null;
let isBoardFullscreen = false;

function t(key, values = {}) {
  const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS["zh-Hant"];
  const fallback = TRANSLATIONS["zh-Hant"][key] || key;
  return (dictionary[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function endCourseLabel() {
  const messages = {
    "zh-Hans": "结束课程并产生新密码",
    "zh-Hant": "結束課程並產生新密碼",
    en: "End course and create new code",
    ja: "授業終了・新しい番号を作成",
    vi: "Kết thúc lớp và tạo mã mới",
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function confirmEndCourseMessage() {
  const messages = {
    "zh-Hans": "确定要结束这次课程并产生新房间密码吗？旧密码将不能再进入这个房间，但可以重新用来建立新的房间。",
    "zh-Hant": "確定要結束這次課程並產生新房間密碼嗎？舊密碼將不能再進入這個房間，但可以重新用來建立新的房間。",
    en: "End this course and create a new room code? The old code will no longer enter this room, but it can be used to create a new room.",
    ja: "この授業を終了して新しいルーム番号を作成しますか？古い番号ではこのルームに入れませんが、新しいルーム作成には使えます。",
    vi: "Kết thúc lớp này và tạo mã phòng mới? Mã cũ sẽ không vào được phòng này nữa, nhưng có thể dùng để tạo phòng mới.",
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function passwordRotatedMessage(code) {
  const messages = {
    "zh-Hans": `课程已结束。这个房间的新密码是：${code}`,
    "zh-Hant": `課程已結束。這個房間的新密碼是：${code}`,
    en: `Course ended. The new room code is: ${code}`,
    ja: `授業を終了しました。新しいルーム番号：${code}`,
    vi: `Đã kết thúc lớp. Mã phòng mới là: ${code}`,
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function passwordRotateFailedMessage() {
  const messages = {
    "zh-Hans": "无法产生新密码，请确认服务器是否开启。",
    "zh-Hant": "無法產生新密碼，請確認伺服器是否開啟。",
    en: "Could not create a new code. Please check the server.",
    ja: "新しい番号を作成できません。サーバーを確認してください。",
    vi: "Không thể tạo mã mới. Hãy kiểm tra máy chủ.",
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function applyLanguage(language) {
  currentLanguage = TRANSLATIONS[language] ? language : "zh-Hant";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.title = t("title");
  languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  updateTeacherStatus();
  updateBoardFullscreenUi();
  updateEndCourseButton();
  renderCourses();
  setRoomUi();
  renderBoard();
}

function teacherProfile() {
  return {
    name: teacherName.value.trim(),
    username: teacherUsername.value.trim(),
  };
}

function loadTeacherProfile() {
  try {
    return JSON.parse(localStorage.getItem(TEACHER_KEY)) || {};
  } catch {
    return {};
  }
}

function saveTeacherProfile(profile) {
  const clean = {
    id: String(profile.id || "").trim(),
    name: String(profile.name || "").trim().slice(0, 40),
    username: String(profile.username || "").trim().slice(0, 80),
  };
  teacherSession = clean;
  localStorage.setItem(TEACHER_KEY, JSON.stringify(clean));
  teacherName.value = clean.name;
  teacherUsername.value = clean.username;
  updateTeacherStatus();
  return clean;
}

function updateTeacherStatus() {
  const token = localStorage.getItem(TEACHER_TOKEN_KEY);
  const label = teacherSession?.name || teacherSession?.username || "";
  teacherStatusText.textContent = label ? t("teacherSignedIn", { name: label }) : t("teacherNotSignedIn");
  teacherFields.hidden = Boolean(token && label);
  teacherLogoutButton.hidden = !token;
  teacherHistory.hidden = !token;
}

function teacherToken() {
  return localStorage.getItem(TEACHER_TOKEN_KEY) || "";
}

function authHeaders() {
  const token = teacherToken();
  return token ? { "X-Teacher-Token": token } : {};
}

async function teacherAuth(mode) {
  const payload = {
    name: teacherName.value.trim(),
    username: teacherUsername.value.trim(),
    password: teacherPassword.value,
  };
  if (!payload.username || !payload.password || (mode === "register" && !payload.name)) {
    teacherUsername.focus();
    return;
  }
  teacherLoginButton.disabled = true;
  teacherRegisterButton.disabled = true;
  try {
    const result = await apiRequest(`/api/teacher/${mode}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem(TEACHER_TOKEN_KEY, result.token);
    saveTeacherProfile(result.teacher || {});
    teacherPassword.value = "";
    roomMessage.textContent = t(mode === "register" ? "registerSuccess" : "loginSuccess");
    await loadTeacherHistory();
  } catch {
    roomMessage.textContent = t(mode === "register" ? "registerFailed" : "loginFailed");
  } finally {
    teacherLoginButton.disabled = false;
    teacherRegisterButton.disabled = false;
  }
}

function logoutTeacher() {
  localStorage.removeItem(TEACHER_TOKEN_KEY);
  localStorage.removeItem(TEACHER_KEY);
  teacherSession = {};
  teacherName.value = "";
  teacherUsername.value = "";
  teacherPassword.value = "";
  teacherHistory.replaceChildren();
  updateTeacherStatus();
}

async function loadTeacherHistory() {
  if (!teacherToken()) {
    renderTeacherHistory([]);
    return;
  }
  try {
    const session = await apiRequest("/api/teacher/me", { headers: authHeaders() });
    saveTeacherProfile(session.teacher || teacherSession || {});
    const data = await apiRequest("/api/teacher/history", { headers: authHeaders() });
    renderTeacherHistory(data.rooms || []);
  } catch {
    localStorage.removeItem(TEACHER_TOKEN_KEY);
    teacherSession = {};
    updateTeacherStatus();
    renderTeacherHistory([]);
  }
}

function renderTeacherHistory(rooms) {
  teacherHistory.replaceChildren();
  const title = document.createElement("p");
  title.className = "history-title";
  title.textContent = t("historyTitle");
  teacherHistory.append(title);

  if (!rooms.length) {
    const empty = document.createElement("span");
    empty.className = "form-note";
    empty.textContent = t("historyEmpty");
    teacherHistory.append(empty);
    return;
  }

  const list = document.createElement("div");
  list.className = "history-list";
  rooms.slice(0, 8).forEach((room) => {
    const item = document.createElement("div");
    item.className = "history-item";
    const label = document.createElement("strong");
    const courseNames = (room.courses || []).map((course) => course.name).filter(Boolean).slice(0, 2).join("、");
    label.textContent = `${t("roomPrefix")} ${room.room} · ${courseNames || t("defaultCourse")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiet-button";
    button.textContent = t("openHistoryRoom");
    button.addEventListener("click", () => {
      roomCodeInput.value = room.room;
      enterRoom(room.room, "teacher");
    });
    item.append(label, button);
    list.append(item);
  });
  teacherHistory.append(list);
}

function activeCourse() {
  return courses.find((course) => course.id === activeCourseId) || courses[0] || { id: "default", name: t("defaultCourse") };
}

function updateBoardFullscreenUi() {
  if (!fullscreenBoardButton || !boardPanel) return;
  const label = isBoardFullscreen ? t("closeBoard") : t("expandBoard");
  fullscreenBoardButton.textContent = isBoardFullscreen ? "×" : "⛶";
  fullscreenBoardButton.title = label;
  fullscreenBoardButton.setAttribute("aria-label", label);
  fullscreenBoardButton.setAttribute("aria-pressed", String(isBoardFullscreen));
  boardPanel.classList.toggle("is-fullscreen", isBoardFullscreen);
  document.body.classList.toggle("board-fullscreen", isBoardFullscreen);
}

function setBoardFullscreen(value) {
  isBoardFullscreen = value;
  updateBoardFullscreenUi();
}

function roomInfoPath(roomCode) {
  return `/api/rooms/${encodeURIComponent(roomCode)}`;
}

function coursesPath() {
  return `/api/rooms/${encodeURIComponent(activeRoom)}/courses`;
}

function rotateRoomPath() {
  return `/api/rooms/${encodeURIComponent(activeRoom)}/rotate`;
}

function coursePostsPath(courseId = activeCourseId) {
  return `/api/rooms/${encodeURIComponent(activeRoom)}/courses/${encodeURIComponent(courseId)}/posts`;
}

function loadSavedRoom() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function saveCurrentRoom() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ room: activeRoom, role: activeRole, courseId: activeCourseId }));
}

function validateRoomCode(value) {
  return /^[0-9]{4,8}$/.test(value);
}

function setRoomUi() {
  const inRoom = Boolean(activeRoom);
  joinPanel.hidden = inRoom;
  classroomLayout.hidden = !inRoom;
  courseForm.hidden = activeRole !== "teacher";
  document.querySelector("#clearBoardButton").hidden = activeRole !== "teacher";
  endCourseButton.hidden = activeRole !== "teacher";
  teacherLoginCard.hidden = new FormData(roomForm).get("role") !== "teacher";
  helperText.textContent = inRoom ? t("helperInRoom") : t("helperLocked");
  const course = activeCourse();
  activeCourseName.textContent = course.name || t("defaultCourse");
  boardCourseLabel.textContent = inRoom ? `${t("roomPrefix")} ${activeRoom} · ${course.name}` : t("sameRoomVisible");
}

function updateEndCourseButton() {
  if (!endCourseButton) return;
  endCourseButton.textContent = endCourseLabel();
  endCourseButton.title = endCourseLabel();
}

async function apiRequest(path, options = {}) {
  let response;
  try {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    throw new Error("Server is not reachable", { cause: error });
  }
  if (!response.ok) {
    const error = new Error(`Request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function enterRoom(roomCode, role) {
  if (!validateRoomCode(roomCode)) {
    roomMessage.textContent = t("invalidRoom");
    roomCodeInput.focus();
    return;
  }

  const submitButton = roomForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  roomMessage.textContent = role === "teacher" ? t("creatingRoom") : t("checkingRoom");

  try {
    let roomInfo;
    if (role === "teacher") {
      if (!teacherToken()) {
        roomMessage.textContent = t("loginRequired");
        teacherUsername.focus();
        return;
      }
      roomInfo = await apiRequest(roomInfoPath(roomCode), {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ role: "teacher" }),
      });
      await loadTeacherHistory();
    } else {
      roomInfo = await apiRequest(roomInfoPath(roomCode));
      if (!roomInfo.exists) {
        roomMessage.textContent = t("roomNotFound");
        roomCodeInput.focus();
        return;
      }
    }

    activeRoom = roomCode;
    activeRole = role;
    courses = roomInfo.courses?.length ? roomInfo.courses : [{ id: "default", name: t("defaultCourse") }];
    activeCourseId = roomInfo.activeCourseId || courses[0].id;
    useServer = true;
    roomMessage.textContent = "";
    saveCurrentRoom();
    renderCourses();
    setRoomUi();
    window.requestAnimationFrame(resizeCanvas);
    await refreshPosts();
    startTimers();
  } catch (error) {
    if (role === "teacher" && error.status === 401) {
      localStorage.removeItem(TEACHER_TOKEN_KEY);
      updateTeacherStatus();
      roomMessage.textContent = t("teacherSessionExpired");
    } else if (role !== "teacher" && error.status === 404) {
      roomMessage.textContent = t("roomNotFound");
    } else {
      roomMessage.textContent = t("roomCheckFailed");
    }
    roomCodeInput.focus();
  } finally {
    submitButton.disabled = false;
  }
}

function startTimers() {
  if (refreshTimer) window.clearInterval(refreshTimer);
  if (courseRefreshTimer) window.clearInterval(courseRefreshTimer);
  refreshTimer = window.setInterval(() => refreshPosts({ quiet: true }), 2000);
  courseRefreshTimer = window.setInterval(() => refreshCourses({ quiet: true }), 4000);
}

async function refreshCourses({ quiet = false } = {}) {
  if (!activeRoom || !useServer) return;
  try {
    const data = await apiRequest(coursesPath());
    const previous = activeCourseId;
    courses = data.courses?.length ? data.courses : courses;
    if (!courses.some((course) => course.id === activeCourseId)) {
      activeCourseId = data.activeCourseId || courses[0]?.id || "default";
    }
    renderCourses();
    if (previous !== activeCourseId) await refreshPosts({ quiet: true });
  } catch {
    if (!quiet) helperText.textContent = t("serverMissing");
  }
}

async function createCourse(name) {
  if (!activeRoom || activeRole !== "teacher") return;
  const courseName = name.trim();
  if (!courseName) {
    courseNameInput.focus();
    return;
  }
  try {
    const data = await apiRequest(coursesPath(), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name: courseName }),
    });
    courses = data.courses;
    activeCourseId = data.activeCourseId;
    posts = [];
    courseNameInput.value = "";
    renderCourses();
    setRoomUi();
    renderBoard();
    await loadTeacherHistory();
    helperText.textContent = t("courseCreated", { name: activeCourse().name });
  } catch {
    helperText.textContent = t("courseCreateFailed");
  }
}

async function endCourseAndRotatePassword() {
  if (!activeRoom || activeRole !== "teacher") return;
  if (!window.confirm(confirmEndCourseMessage())) return;

  endCourseButton.disabled = true;
  try {
    const roomInfo = await apiRequest(rotateRoomPath(), { method: "POST", headers: authHeaders() });
    activeRoom = roomInfo.room;
    courses = roomInfo.courses?.length ? roomInfo.courses : courses;
    activeCourseId = roomInfo.activeCourseId || activeCourseId;
    roomCodeInput.value = activeRoom;
    saveCurrentRoom();
    renderCourses();
    setRoomUi();
    await refreshPosts();
    const message = passwordRotatedMessage(activeRoom);
    await loadTeacherHistory();
    helperText.textContent = message;
    window.alert(message);
  } catch {
    helperText.textContent = passwordRotateFailedMessage();
  } finally {
    endCourseButton.disabled = false;
  }
}

function renderCourses() {
  const previous = activeCourseId;
  courseSelect.replaceChildren();
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    courseSelect.append(option);
  });
  if (courses.some((course) => course.id === previous)) activeCourseId = previous;
  if (!courses.some((course) => course.id === activeCourseId)) activeCourseId = courses[0]?.id || "default";
  courseSelect.value = activeCourseId;
  setRoomUi();
}

async function refreshPosts({ quiet = false } = {}) {
  if (!activeRoom || !useServer || !activeCourseId) return;
  try {
    posts = await apiRequest(coursePostsPath());
    renderBoard();
  } catch {
    useServer = false;
    if (!quiet) helperText.textContent = t("serverMissing");
    renderBoard();
  }
}

function resizeCanvas() {
  const snapshot = canvas.width ? canvas.toDataURL("image/png") : null;
  const rect = canvasWrap.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (snapshot) {
    const image = new Image();
    image.onload = () => ctx.drawImage(image, 0, 0, rect.width, rect.height);
    image.src = snapshot;
  }
}

function pushUndoState() {
  undoStack.push(canvas.toDataURL("image/png"));
  if (undoStack.length > 20) undoStack.shift();
}

function restoreImage(dataUrl) {
  const rect = canvasWrap.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  const image = new Image();
  image.onload = () => ctx.drawImage(image, 0, 0, rect.width, rect.height);
  image.src = dataUrl;
}

function pointerPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function beginStroke(event) {
  if (!activeRoom) return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  pushUndoState();
  drawing = true;
  lastPoint = pointerPoint(event);
  drawDot(lastPoint);
}

function drawDot(point) {
  const size = Number(brushSize.value);
  ctx.save();
  ctx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";
  ctx.fillStyle = mode === "erase" ? "rgba(0,0,0,1)" : inkColor.value;
  ctx.beginPath();
  ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (mode === "draw") hasInk = true;
}

function continueStroke(event) {
  if (!drawing || !lastPoint) return;
  event.preventDefault();
  const point = pointerPoint(event);
  ctx.save();
  ctx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";
  ctx.strokeStyle = mode === "erase" ? "rgba(0,0,0,1)" : inkColor.value;
  ctx.lineWidth = Number(brushSize.value);
  ctx.beginPath();
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  ctx.restore();
  lastPoint = point;
  if (mode === "draw") hasInk = true;
}

function endStroke(event) {
  if (!drawing) return;
  drawing = false;
  lastPoint = null;
  if (event.pointerId !== undefined) {
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      // Some browsers release capture automatically.
    }
  }
}

function clearCanvas() {
  pushUndoState();
  const rect = canvasWrap.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  hasInk = false;
}

function undo() {
  const previous = undoStack.pop();
  if (!previous) return;
  restoreImage(previous);
  hasInk = true;
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

async function submitPost() {
  if (!activeRoom) {
    helperText.textContent = t("enterFirst");
    return;
  }
  if (!form.reportValidity()) return;
  if (!hasInk) {
    helperText.textContent = t("writeFirst");
    return;
  }

  const post = {
    name: studentName.value.trim(),
    prompt: promptText.value.trim() || t("defaultPrompt"),
    image: canvas.toDataURL("image/png"),
  };

  document.querySelector("#submitButton").disabled = true;
  helperText.textContent = t("sending");

  try {
    posts = await apiRequest(coursePostsPath(), {
      method: "POST",
      body: JSON.stringify(post),
    });
    renderBoard();
    clearCanvas();
    helperText.textContent = t("sentToRoom", { course: activeCourse().name });
  } catch {
    helperText.textContent = t("sendFailed");
  } finally {
    document.querySelector("#submitButton").disabled = false;
  }
}

function formatTime(value) {
  return new Intl.DateTimeFormat(currentLanguage, {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function filteredPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const list = posts.filter((post) => {
    const text = `${post.name} ${post.prompt}`.toLocaleLowerCase();
    return text.includes(query);
  });

  if (sortSelect.value === "oldest") {
    return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  if (sortSelect.value === "name") {
    return list.sort((a, b) => a.name.localeCompare(b.name, currentLanguage));
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function renderBoard() {
  boardList.replaceChildren();
  const course = activeCourse();
  activeCourseName.textContent = course.name || t("defaultCourse");
  boardCourseLabel.textContent = activeRoom ? `${t("roomPrefix")} ${activeRoom} · ${course.name}` : t("sameRoomVisible");

  const visiblePosts = filteredPosts();
  if (!visiblePosts.length) {
    const emptyState = emptyTemplate.content.cloneNode(true);
    emptyState.querySelector("strong").textContent = t("emptyTitle");
    emptyState.querySelector("span").textContent = t("emptyText");
    boardList.append(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();
  visiblePosts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = post.image;
    image.alt = t("imageAlt", { name: post.name });

    const meta = document.createElement("div");
    meta.className = "post-meta";

    const title = document.createElement("div");
    title.className = "post-title";
    const name = document.createElement("span");
    name.textContent = post.name;
    const time = document.createElement("time");
    time.dateTime = post.createdAt;
    time.textContent = formatTime(post.createdAt);
    title.append(name, time);

    const prompt = document.createElement("div");
    prompt.className = "post-prompt";
    prompt.textContent = post.prompt;

    meta.append(title, prompt);
    card.append(image, meta);
    fragment.append(card);
  });
  boardList.append(fragment);
}

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = new FormData(roomForm).get("role");
  enterRoom(roomCodeInput.value.trim(), role);
});

roomForm.addEventListener("change", () => setRoomUi());
teacherLoginButton.addEventListener("click", () => teacherAuth("login"));
teacherRegisterButton.addEventListener("click", () => teacherAuth("register"));
teacherLogoutButton.addEventListener("click", logoutTeacher);
teacherPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    teacherAuth("login");
  }
});

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCourse(courseNameInput.value);
});

courseSelect.addEventListener("change", async () => {
  activeCourseId = courseSelect.value;
  saveCurrentRoom();
  setRoomUi();
  await refreshPosts();
});

document.querySelector("#switchRoomButton").addEventListener("click", () => {
  setBoardFullscreen(false);
  activeRoom = "";
  posts = [];
  courses = [];
  activeCourseId = "default";
  if (refreshTimer) window.clearInterval(refreshTimer);
  if (courseRefreshTimer) window.clearInterval(courseRefreshTimer);
  localStorage.removeItem(STORAGE_KEY);
  setRoomUi();
  renderCourses();
  renderBoard();
});

fullscreenBoardButton.addEventListener("click", () => {
  setBoardFullscreen(!isBoardFullscreen);
});

canvas.addEventListener("pointerdown", beginStroke);
canvas.addEventListener("pointermove", continueStroke);
canvas.addEventListener("pointerup", endStroke);
canvas.addEventListener("pointercancel", endStroke);
canvas.addEventListener("pointerleave", endStroke);

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelector("#clearButton").addEventListener("click", clearCanvas);
document.querySelector("#undoButton").addEventListener("click", undo);
document.querySelector("#submitButton").addEventListener("click", submitPost);
endCourseButton.addEventListener("click", endCourseAndRotatePassword);
document.querySelector("#clearBoardButton").addEventListener("click", async () => {
  if (activeRole !== "teacher" || !posts.length) return;
  const confirmed = window.confirm(t("confirmClear", { course: activeCourse().name }));
  if (!confirmed) return;
  try {
    posts = await apiRequest(coursePostsPath(), { method: "DELETE", headers: authHeaders() });
    renderBoard();
  } catch {
    helperText.textContent = t("clearFailed");
  }
});
searchInput.addEventListener("input", renderBoard);
sortSelect.addEventListener("change", renderBoard);

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 150);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isBoardFullscreen) {
    setBoardFullscreen(false);
  }
});

const savedTeacher = loadTeacherProfile();
teacherName.value = savedTeacher.name || "";
teacherUsername.value = savedTeacher.username || "";
teacherSession = savedTeacher;
window.addEventListener("load", loadTeacherHistory);

courses = [{ id: "default", name: t("defaultCourse") }];
resizeCanvas();
languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
applyLanguage(currentLanguage);
setRoomUi();
renderBoard();
