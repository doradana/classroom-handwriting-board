const STORAGE_KEY = "classroom-handwriting-room";
const LANGUAGE_KEY = "classroom-handwriting-language";
const TEACHER_KEY = "classroom-handwriting-teacher";
const TEACHER_TOKEN_KEY = "classroom-handwriting-teacher-token";
const CANVAS_HEIGHT_KEY = "classroom-handwriting-canvas-height";
const API_BASE = window.location.protocol === "file:" ? "http://127.0.0.1:8030" : "";

const TRANSLATIONS = {
  "zh-Hans": {
    title: "中文手写房间公布栏",
    eyebrow: "课堂手写练习",
    appTitle: "中文手写房间公布栏",
    languageLabel: "语言",
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
    newCourseName: "课程名称",
    newCoursePlaceholder: "例如：三年级第一课",
    addCourse: "新增",
    renameCourse: "修改名称",
    courseRenamed: "课程已改名：{name}",
    courseRenameFailed: "修改课程名称失败，请确认老师账号是否已登入。",
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
    myWorksTitle: "我的作品",
    switchRoom: "换房间",
    leaveRoom: "离开",
  clearBoard: "清空公布栏",
  deleteRoom: "删除房间",
    searchPlaceholder: "搜索姓名或主题",
    searchLabel: "搜索作品",
    sortLabel: "排序",
    sortNewest: "最新",
    sortOldest: "最旧",
    sortName: "姓名",
    emptyTitle: "这个课程还没有作品",
    emptyText: "学生送出手写作品后，会出现在这里。",
    myWorksEmptyTitle: "你还没有送出作品",
    myWorksEmptyText: "你送出的手写作品会出现在这里。",
    roomPrefix: "房间",
    postCount: "{count} 件作品",
    roomSync: "房间同步",
    offline: "离线",
    notInRoom: "未进入房间",
    helperLocked: "请先进入房间，再开始书写。",
    helperInRoom: "写完后送出；同房间、同课程的人都会看到。",
    helperInRoomStudent: "写完后送出；老师可以看到，你也能看到自己的作品。",
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
    expandPost: "放大学生作品",
    closePost: "关闭放大作品",
    deletePost: "删除这篇作品",
    confirmDeletePost: "确定删除 {name} 的这篇作品吗？",
    deletePostFailed: "删除失败，请确认老师账号是否已登入。",
  },
  "zh-Hant": {
    title: "中文手寫房間公佈欄",
    eyebrow: "課堂手寫練習",
    appTitle: "中文手寫房間公佈欄",
    languageLabel: "語言",
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
    newCourseName: "課程名稱",
    newCoursePlaceholder: "例如：三年級第一課",
    addCourse: "新增",
    renameCourse: "修改名稱",
    courseRenamed: "課程已改名：{name}",
    courseRenameFailed: "修改課程名稱失敗，請確認老師帳號是否已登入。",
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
    myWorksTitle: "我的作品",
    switchRoom: "換房間",
    leaveRoom: "離開",
  clearBoard: "清空公佈欄",
  deleteRoom: "刪除房間",
    searchPlaceholder: "搜尋姓名或主題",
    searchLabel: "搜尋作品",
    sortLabel: "排序",
    sortNewest: "最新",
    sortOldest: "最舊",
    sortName: "姓名",
    emptyTitle: "這個課程還沒有作品",
    emptyText: "學生送出手寫作品後，會出現在這裡。",
    myWorksEmptyTitle: "你還沒有送出作品",
    myWorksEmptyText: "你送出的手寫作品會出現在這裡。",
    roomPrefix: "房間",
    postCount: "{count} 件作品",
    roomSync: "房間同步",
    offline: "離線",
    notInRoom: "未進入房間",
    helperLocked: "請先進入房間，再開始書寫。",
    helperInRoom: "寫完後送出；同房間、同課程的人都會看到。",
    helperInRoomStudent: "寫完後送出；老師可以看到，你也能看到自己的作品。",
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
    expandPost: "放大學生作品",
    closePost: "關閉放大作品",
    deletePost: "刪除這篇作品",
    confirmDeletePost: "確定刪除 {name} 的這篇作品嗎？",
    deletePostFailed: "刪除失敗，請確認老師帳號是否已登入。",
  },
  en: {
    title: "Chinese Handwriting Room Board",
    eyebrow: "Class handwriting practice",
    appTitle: "Chinese Handwriting Room Board",
    languageLabel: "Language",
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
    newCourseName: "Course name",
    newCoursePlaceholder: "Example: Grade 3 Lesson 1",
    addCourse: "Add",
    renameCourse: "Rename",
    courseRenamed: "Course renamed: {name}",
    courseRenameFailed: "Could not rename the course. Check that the teacher account is signed in.",
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
    myWorksTitle: "My work",
    switchRoom: "Switch room",
    leaveRoom: "Leave",
  clearBoard: "Clear board",
  deleteRoom: "Delete room",
    searchPlaceholder: "Search name or topic",
    searchLabel: "Search work",
    sortLabel: "Sort",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortName: "Name",
    emptyTitle: "No work in this course yet",
    emptyText: "Student handwriting will appear here after submission.",
    myWorksEmptyTitle: "You have not submitted work yet",
    myWorksEmptyText: "Your submitted handwriting will appear here.",
    roomPrefix: "Room",
    postCount: "{count} works",
    roomSync: "Room sync",
    offline: "Offline",
    notInRoom: "Not in room",
    helperLocked: "Enter a room before handwriting.",
    helperInRoom: "Submit when finished. Everyone in the same room and course will see it.",
    helperInRoomStudent: "Submit when finished. The teacher can see it, and you can see your own work.",
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
    expandPost: "Enlarge student work",
    closePost: "Close enlarged work",
    deletePost: "Delete this work",
    confirmDeletePost: "Delete this work by {name}?",
    deletePostFailed: "Delete failed. Check that the teacher account is signed in.",
  },
  ja: {
    title: "中国語手書きルーム掲示板",
    eyebrow: "授業の手書き練習",
    appTitle: "中国語手書きルーム掲示板",
    languageLabel: "言語",
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
    newCourseName: "授業名",
    newCoursePlaceholder: "例：3年生 第1課",
    addCourse: "追加",
    renameCourse: "名前を変更",
    courseRenamed: "コース名を変更しました：{name}",
    courseRenameFailed: "コース名を変更できません。先生アカウントでログインしているか確認してください。",
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
    myWorksTitle: "自分の作品",
    switchRoom: "ルーム変更",
    leaveRoom: "退出",
  clearBoard: "掲示板を消去",
  deleteRoom: "部屋を削除",
    searchPlaceholder: "名前やテーマを検索",
    searchLabel: "作品検索",
    sortLabel: "並び替え",
    sortNewest: "新しい順",
    sortOldest: "古い順",
    sortName: "名前",
    emptyTitle: "このコースにはまだ作品がありません",
    emptyText: "学生が送信すると、ここに表示されます。",
    myWorksEmptyTitle: "まだ作品を送信していません",
    myWorksEmptyText: "送信した手書き作品がここに表示されます。",
    roomPrefix: "ルーム",
    postCount: "{count} 件",
    roomSync: "同期中",
    offline: "オフライン",
    notInRoom: "未入室",
    helperLocked: "先にルームへ入ってください。",
    helperInRoom: "書き終わったら送信します。同じルーム、同じコースの人が見られます。",
    helperInRoomStudent: "書き終わったら送信します。先生が確認でき、自分の作品も見られます。",
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
    languageLabel: "Ngôn ngữ",
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
    newCourseName: "Tên lớp học",
    newCoursePlaceholder: "Ví dụ: Lớp 3 Bài 1",
    addCourse: "Thêm",
    renameCourse: "Đổi tên",
    courseRenamed: "Đã đổi tên lớp: {name}",
    courseRenameFailed: "Không thể đổi tên lớp. Hãy kiểm tra tài khoản giáo viên đã đăng nhập.",
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
    myWorksTitle: "Bài của em",
    switchRoom: "Đổi phòng",
    leaveRoom: "Rời khỏi",
  clearBoard: "Xóa bảng",
  deleteRoom: "Xóa phòng",
    searchPlaceholder: "Tìm tên hoặc chủ đề",
    searchLabel: "Tìm bài viết",
    sortLabel: "Sắp xếp",
    sortNewest: "Mới nhất",
    sortOldest: "Cũ nhất",
    sortName: "Tên",
    emptyTitle: "Lớp này chưa có bài",
    emptyText: "Bài viết tay của học sinh sẽ xuất hiện ở đây sau khi gửi.",
    myWorksEmptyTitle: "Em chưa gửi bài",
    myWorksEmptyText: "Bài viết tay em đã gửi sẽ xuất hiện ở đây.",
    roomPrefix: "Phòng",
    postCount: "{count} bài",
    roomSync: "Đồng bộ phòng",
    offline: "Mất kết nối",
    notInRoom: "Chưa vào phòng",
    helperLocked: "Hãy vào phòng trước khi viết.",
    helperInRoom: "Gửi sau khi viết xong. Mọi người cùng phòng và cùng lớp sẽ thấy.",
    helperInRoomStudent: "Gửi sau khi viết xong. Giáo viên sẽ thấy, và em sẽ thấy bài của mình.",
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
const canvasStage = document.querySelector(".canvas-stage");
const form = document.querySelector("#postForm");
Object.assign(TRANSLATIONS["zh-Hans"], {
  teacherNotSignedIn: "尚未登入老师账号",
  teacherSignedIn: "已登入：{name}",
  teacherDashboardEyebrow: "老师主画面",
  teacherDashboardTitle: "新建房间或开启历史课程",
  teacherUsernameLabel: "账号",
  teacherUsernamePlaceholder: "例如：teacher01",
  teacherPasswordLabel: "密码",
  teacherPasswordPlaceholder: "至少 6 个字",
  loginTeacher: "登入",
  registerTeacher: "建立账号",
  resetTeacherPassword: "忘记密码",
  logoutTeacher: "登出",
  loginRequired: "请先登入老师账号，才能建立房间。",
  loginSuccess: "老师账号已登入。",
  registerSuccess: "账号已建立并登入。",
  resetPasswordSuccess: "密码已重设并登入。",
  resetPasswordFailed: "无法重设密码，请确认老师姓名、账号，并输入至少 6 个字的新密码。",
  resetPasswordRequired: "请输入老师姓名、账号和新密码，再按忘记密码。",
    loginFailed: "登入失败，请确认账号和密码。",
    registerFailed: "建立账号失败，账号可能已被使用，或密码少于 6 个字。",
    teacherSessionExpired: "老师登入已失效，请重新登入后再建立房间。",
  historyTitle: "课程资料夹",
  historyEmpty: "登入后建立的课程资料夹会显示在这里。",
  openHistoryRoom: "进入",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  teacherNotSignedIn: "尚未登入老師帳號",
  teacherSignedIn: "已登入：{name}",
  teacherDashboardEyebrow: "老師主畫面",
  teacherDashboardTitle: "新建房間或開啟歷史課程",
  teacherUsernameLabel: "帳號",
  teacherUsernamePlaceholder: "例如：teacher01",
  teacherPasswordLabel: "密碼",
  teacherPasswordPlaceholder: "至少 6 個字",
  loginTeacher: "登入",
  registerTeacher: "建立帳號",
  resetTeacherPassword: "忘記密碼",
  logoutTeacher: "登出",
  loginRequired: "請先登入老師帳號，才能建立房間。",
  loginSuccess: "老師帳號已登入。",
  registerSuccess: "帳號已建立並登入。",
  resetPasswordSuccess: "密碼已重設並登入。",
  resetPasswordFailed: "無法重設密碼，請確認老師姓名、帳號，並輸入至少 6 個字的新密碼。",
  resetPasswordRequired: "請輸入老師姓名、帳號和新密碼，再按忘記密碼。",
    loginFailed: "登入失敗，請確認帳號和密碼。",
    registerFailed: "建立帳號失敗，帳號可能已被使用，或密碼少於 6 個字。",
    teacherSessionExpired: "老師登入已失效，請重新登入後再建立房間。",
  historyTitle: "課程資料夾",
  historyEmpty: "登入後建立的課程資料夾會顯示在這裡。",
  openHistoryRoom: "進入",
});

Object.assign(TRANSLATIONS.en, {
  teacherNotSignedIn: "Teacher account is not signed in",
  teacherSignedIn: "Signed in: {name}",
  teacherDashboardEyebrow: "Teacher dashboard",
  teacherDashboardTitle: "Create a room or open course history",
  teacherUsernameLabel: "Account",
  teacherUsernamePlaceholder: "Example: teacher01",
  teacherPasswordLabel: "Password",
  teacherPasswordPlaceholder: "At least 6 characters",
  loginTeacher: "Log in",
  registerTeacher: "Create account",
  resetTeacherPassword: "Forgot password",
  logoutTeacher: "Log out",
  loginRequired: "Log in with a teacher account before creating a room.",
  loginSuccess: "Teacher account signed in.",
  registerSuccess: "Account created and signed in.",
  resetPasswordSuccess: "Password reset and signed in.",
  resetPasswordFailed: "Could not reset the password. Check the teacher name, account, and use a new password with at least 6 characters.",
  resetPasswordRequired: "Enter teacher name, account, and a new password, then press Forgot password.",
  loginFailed: "Login failed. Check the account and password.",
  registerFailed: "Could not create the account. It may already exist, or the password is too short.",
  teacherSessionExpired: "Teacher login expired. Please log in again before creating a room.",
  historyTitle: "Course folders",
  historyEmpty: "Course folders created after login will appear here.",
  openHistoryRoom: "Open",
});

Object.assign(TRANSLATIONS.ja, {
  teacherNotSignedIn: "先生アカウントは未ログインです",
  teacherSignedIn: "ログイン中：{name}",
  teacherDashboardEyebrow: "先生メニュー",
  teacherDashboardTitle: "部屋を作成、または履歴を開く",
  teacherUsernameLabel: "アカウント",
  teacherUsernamePlaceholder: "例：teacher01",
  teacherPasswordLabel: "パスワード",
  teacherPasswordPlaceholder: "6文字以上",
  loginTeacher: "ログイン",
  registerTeacher: "アカウント作成",
  resetTeacherPassword: "パスワードを忘れた",
  logoutTeacher: "ログアウト",
  loginRequired: "部屋を作成する前に先生アカウントでログインしてください。",
  loginSuccess: "先生アカウントでログインしました。",
  registerSuccess: "アカウントを作成してログインしました。",
  resetPasswordSuccess: "パスワードを再設定してログインしました。",
  resetPasswordFailed: "パスワードを再設定できません。先生名、アカウントを確認し、6文字以上の新しいパスワードを入力してください。",
  resetPasswordRequired: "先生名、アカウント、新しいパスワードを入力してから、パスワードを忘れたボタンを押してください。",
  loginFailed: "ログインできません。アカウントとパスワードを確認してください。",
  registerFailed: "アカウントを作成できません。既に使用中、またはパスワードが短すぎます。",
  teacherSessionExpired: "先生ログインの有効期限が切れました。もう一度ログインしてください。",
  historyTitle: "授業フォルダ",
  historyEmpty: "ログイン後に作成した授業フォルダがここに表示されます。",
  openHistoryRoom: "開く",
  expandPost: "作品を拡大",
  closePost: "拡大表示を閉じる",
  deletePost: "この作品を削除",
  confirmDeletePost: "{name} の作品を削除しますか？",
  deletePostFailed: "削除できません。先生アカウントでログインしているか確認してください。",
});

Object.assign(TRANSLATIONS.vi, {
  teacherNotSignedIn: "Chưa đăng nhập tài khoản giáo viên",
  teacherSignedIn: "Đã đăng nhập: {name}",
  teacherDashboardEyebrow: "Màn hình giáo viên",
  teacherDashboardTitle: "Tạo phòng hoặc mở lịch sử lớp học",
  teacherUsernameLabel: "Tài khoản",
  teacherUsernamePlaceholder: "Ví dụ: teacher01",
  teacherPasswordLabel: "Mật khẩu",
  teacherPasswordPlaceholder: "Ít nhất 6 ký tự",
  loginTeacher: "Đăng nhập",
  registerTeacher: "Tạo tài khoản",
  resetTeacherPassword: "Quên mật khẩu",
  logoutTeacher: "Đăng xuất",
  loginRequired: "Hãy đăng nhập tài khoản giáo viên trước khi tạo phòng.",
  loginSuccess: "Đã đăng nhập tài khoản giáo viên.",
  registerSuccess: "Đã tạo tài khoản và đăng nhập.",
  resetPasswordSuccess: "Đã đặt lại mật khẩu và đăng nhập.",
  resetPasswordFailed: "Không thể đặt lại mật khẩu. Hãy kiểm tra tên giáo viên, tài khoản và nhập mật khẩu mới ít nhất 6 ký tự.",
  resetPasswordRequired: "Nhập tên giáo viên, tài khoản và mật khẩu mới, rồi bấm Quên mật khẩu.",
  loginFailed: "Đăng nhập thất bại. Hãy kiểm tra tài khoản và mật khẩu.",
  registerFailed: "Không thể tạo tài khoản. Tài khoản có thể đã tồn tại hoặc mật khẩu quá ngắn.",
  teacherSessionExpired: "Phiên đăng nhập giáo viên đã hết hạn. Hãy đăng nhập lại.",
  historyTitle: "Thu muc lop hoc",
  historyEmpty: "Thu muc lop hoc tao sau khi dang nhap se hien o day.",
  openHistoryRoom: "Mở",
  expandPost: "Phóng to bài viết",
  closePost: "Đóng bài viết phóng to",
  deletePost: "Xóa bài này",
  confirmDeletePost: "Xóa bài của {name}?",
  deletePostFailed: "Xóa thất bại. Hãy kiểm tra tài khoản giáo viên đã đăng nhập.",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  canvasShrinkTitle: "缩小手写区",
  canvasGrowTitle: "放大手写区",
  canvasScaleTitle: "画布缩放比例",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  canvasShrinkTitle: "縮小手寫區",
  canvasGrowTitle: "放大手寫區",
  canvasScaleTitle: "畫布縮放比例",
});

Object.assign(TRANSLATIONS.en, {
  canvasShrinkTitle: "Make handwriting area smaller",
  canvasGrowTitle: "Make handwriting area larger",
  canvasScaleTitle: "Canvas zoom",
});

Object.assign(TRANSLATIONS.ja, {
  canvasShrinkTitle: "手書きエリアを小さくする",
  canvasGrowTitle: "手書きエリアを大きくする",
  canvasScaleTitle: "キャンバス倍率",
});

Object.assign(TRANSLATIONS.vi, {
  canvasShrinkTitle: "Thu nhỏ vùng viết tay",
  canvasGrowTitle: "Phóng to vùng viết tay",
  canvasScaleTitle: "Tỷ lệ bảng viết",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  deleteCourse: "删除资料夹",
  courseDeleted: "已删除资料夹：{name}",
  courseDeleteFailed: "无法删除资料夹，请确认老师账号已登入。",
  confirmDeleteCourse: "确定要删除资料夹「{name}」吗？这个资料夹里的学生作品也会被删除。",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  deleteCourse: "刪除資料夾",
  courseDeleted: "已刪除資料夾：{name}",
  courseDeleteFailed: "無法刪除資料夾，請確認老師帳號已登入。",
  confirmDeleteCourse: "確定要刪除資料夾「{name}」嗎？這個資料夾裡的學生作品也會被刪除。",
});

Object.assign(TRANSLATIONS.en, {
  deleteCourse: "Delete course",
  courseDeleted: "Course deleted: {name}",
  courseDeleteFailed: "Could not delete the course. Check that the teacher account is signed in.",
  confirmDeleteCourse: "Delete \"{name}\"? Student works in this course will also be deleted.",
});

Object.assign(TRANSLATIONS.ja, {
  deleteCourse: "\u30b3\u30fc\u30b9\u524a\u9664",
  courseDeleted: "\u30b3\u30fc\u30b9\u3092\u524a\u9664\u3057\u307e\u3057\u305f\uff1a{name}",
  courseDeleteFailed: "\u30b3\u30fc\u30b9\u3092\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3002\u6559\u5e2b\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3044\u308b\u304b\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
  confirmDeleteCourse: "\u300c{name}\u300d\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f\u3053\u306e\u30b3\u30fc\u30b9\u306e\u751f\u5f92\u4f5c\u54c1\u3082\u524a\u9664\u3055\u308c\u307e\u3059\u3002",
});

Object.assign(TRANSLATIONS.vi, {
  deleteCourse: "Xoa lop",
  courseDeleted: "Da xoa lop: {name}",
  courseDeleteFailed: "Khong the xoa lop. Hay kiem tra tai khoan giao vien da dang nhap.",
  confirmDeleteCourse: "Xoa \"{name}\"? Bai viet cua hoc sinh trong lop nay cung se bi xoa.",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  roomNameLabel: "\u623f\u95f4\u540d\u79f0",
  roomNamePlaceholder: "\u4f8b\u5982\uff1a\u5468\u4e09\u4e2d\u6587\u8bfe",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  roomNameLabel: "\u623f\u9593\u540d\u7a31",
  roomNamePlaceholder: "\u4f8b\u5982\uff1a\u9031\u4e09\u4e2d\u6587\u8ab2",
});

Object.assign(TRANSLATIONS.en, {
  roomNameLabel: "Room name",
  roomNamePlaceholder: "Example: Wednesday Chinese class",
});

Object.assign(TRANSLATIONS.ja, {
  roomNameLabel: "\u90e8\u5c4b\u540d",
  roomNamePlaceholder: "\u4f8b\uff1a\u6c34\u66dc\u4e2d\u56fd\u8a9e\u30af\u30e9\u30b9",
});

Object.assign(TRANSLATIONS.vi, {
  roomNameLabel: "Ten phong",
  roomNamePlaceholder: "Vi du: Lop tieng Trung thu Tu",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  renameRoom: "\u4fee\u6539\u623f\u95f4\u540d\u79f0",
  renameRoomPrompt: "\u8bf7\u8f93\u5165\u65b0\u7684\u623f\u95f4\u540d\u79f0",
  roomRenamed: "\u5df2\u4fee\u6539\u623f\u95f4\u540d\u79f0\u3002",
  roomRenameFailed: "\u65e0\u6cd5\u4fee\u6539\u623f\u95f4\u540d\u79f0\uff0c\u8bf7\u786e\u8ba4\u8001\u5e08\u5e10\u53f7\u5df2\u767b\u5165\u3002",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  renameRoom: "\u4fee\u6539\u623f\u9593\u540d\u7a31",
  renameRoomPrompt: "\u8acb\u8f38\u5165\u65b0\u7684\u623f\u9593\u540d\u7a31",
  roomRenamed: "\u5df2\u4fee\u6539\u623f\u9593\u540d\u7a31\u3002",
  roomRenameFailed: "\u7121\u6cd5\u4fee\u6539\u623f\u9593\u540d\u7a31\uff0c\u8acb\u78ba\u8a8d\u8001\u5e2b\u5e33\u865f\u5df2\u767b\u5165\u3002",
});

Object.assign(TRANSLATIONS.en, {
  renameRoom: "Rename room",
  renameRoomPrompt: "Enter the new room name",
  roomRenamed: "Room name updated.",
  roomRenameFailed: "Could not rename the room. Check that the teacher account is signed in.",
});

Object.assign(TRANSLATIONS.ja, {
  renameRoom: "\u90e8\u5c4b\u540d\u3092\u5909\u66f4",
  renameRoomPrompt: "\u65b0\u3057\u3044\u90e8\u5c4b\u540d\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044",
  roomRenamed: "\u90e8\u5c4b\u540d\u3092\u5909\u66f4\u3057\u307e\u3057\u305f\u3002",
  roomRenameFailed: "\u90e8\u5c4b\u540d\u3092\u5909\u66f4\u3067\u304d\u307e\u305b\u3093\u3002\u6559\u5e2b\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
});

Object.assign(TRANSLATIONS.vi, {
  renameRoom: "Doi ten phong",
  renameRoomPrompt: "Nhap ten phong moi",
  roomRenamed: "Da doi ten phong.",
  roomRenameFailed: "Khong the doi ten phong. Hay kiem tra tai khoan giao vien da dang nhap.",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  cancelEdit: "\u53d6\u6d88",
  saveEdit: "\u50a8\u5b58",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  cancelEdit: "\u53d6\u6d88",
  saveEdit: "\u5132\u5b58",
});

Object.assign(TRANSLATIONS.en, {
  cancelEdit: "Cancel",
  saveEdit: "Save",
});

Object.assign(TRANSLATIONS.ja, {
  cancelEdit: "\u30ad\u30e3\u30f3\u30bb\u30eb",
  saveEdit: "\u4fdd\u5b58",
});

Object.assign(TRANSLATIONS.vi, {
  cancelEdit: "Huy",
  saveEdit: "Luu",
});

Object.assign(TRANSLATIONS["zh-Hans"], {
  roomPassword: "课程密码",
  joinHeadline: "学生输入课程密码后，只会进入该课程的公布栏",
  roomCodeLabel: "课程数字密码",
  roomCodePlaceholder: "例如：246801",
  courseCodeLabel: "课程密码",
  courseCodePlaceholder: "系统自动产生",
  enterRoom: "进入课程",
  roomNote: "老师进入课程不需要密码；系统会为每个课程自动产生 6 位数字密码，给学生输入使用。",
  invalidRoom: "课程密码必须是 6 位数字。",
  roomNotFound: "找不到这个课程。请确认老师已经先建立课程密码。",
  roomCheckFailed: "无法确认课程，请确认服务器是否开启，或课程密码是否已被使用。",
  creatingRoom: "正在建立房间与课程...",
  checkingRoom: "正在检查课程...",
  helperLocked: "请先进入课程，再开始书写。",
  helperInRoom: "写完后送出；同课程的人都会看到。",
  helperInRoomStudent: "写完后送出；老师可以看到，你也能看到自己的作品。",
  courseCreateFailed: "新增课程失败，请确认服务器是否开启。",
});

Object.assign(TRANSLATIONS["zh-Hant"], {
  roomPassword: "課程密碼",
  joinHeadline: "學生輸入課程密碼後，只會進入該課程的公佈欄",
  roomCodeLabel: "課程數字密碼",
  roomCodePlaceholder: "例如：246801",
  courseCodeLabel: "課程密碼",
  courseCodePlaceholder: "系統自動產生",
  enterRoom: "進入課程",
  roomNote: "老師進入課程不需要密碼；系統會為每個課程自動產生 6 位數字密碼，給學生輸入使用。",
  invalidRoom: "課程密碼必須是 6 位數字。",
  roomNotFound: "找不到這個課程。請確認老師已經先建立課程密碼。",
  roomCheckFailed: "無法確認課程，請確認伺服器是否開啟，或課程密碼是否已被使用。",
  creatingRoom: "正在建立房間與課程...",
  checkingRoom: "正在檢查課程...",
  helperLocked: "請先進入課程，再開始書寫。",
  helperInRoom: "寫完後送出；同課程的人都會看到。",
  helperInRoomStudent: "寫完後送出；老師可以看到，你也能看到自己的作品。",
  courseCreateFailed: "新增課程失敗，請確認伺服器是否開啟。",
});

Object.assign(TRANSLATIONS.en, {
  roomPassword: "Course code",
  joinHeadline: "Students enter a course code and only join that course board",
  roomCodeLabel: "Numeric course code",
  roomCodePlaceholder: "Example: 246801",
  courseCodeLabel: "Course code",
  courseCodePlaceholder: "Generated automatically",
  enterRoom: "Enter course",
  roomNote: "Teachers do not need a password to enter. The system creates a 6 digit course code for students.",
  invalidRoom: "The course code must be 6 digits.",
  roomNotFound: "This course was not found. Check that the teacher has created the course code first.",
  roomCheckFailed: "Could not check the course. Confirm the server is running or that the code is not already used.",
  creatingRoom: "Creating room and course...",
  checkingRoom: "Checking course...",
  helperLocked: "Enter a course before handwriting.",
  helperInRoom: "Submit when finished. Everyone in this course will see it.",
  helperInRoomStudent: "Submit when finished. The teacher can see it, and you can see your own work.",
  courseCreateFailed: "Could not add the course. Confirm the server is running.",
});

Object.assign(TRANSLATIONS.ja, {
  roomPassword: "授業コード",
  joinHeadline: "学生は授業コードを入力し、その授業の掲示板だけに入ります",
  roomCodeLabel: "数字の授業コード",
  roomCodePlaceholder: "例：246801",
  courseCodeLabel: "授業コード",
  courseCodePlaceholder: "自動生成",
  enterRoom: "授業に入る",
  roomNote: "先生はパスワードなしで授業に入れます。学生用の 6 桁コードは自動で作成されます。",
  invalidRoom: "授業コードは 6 桁の数字です。",
  roomNotFound: "この授業が見つかりません。先生が先に授業コードを作成したか確認してください。",
  roomCheckFailed: "授業を確認できません。サーバーまたはコードの重複を確認してください。",
  creatingRoom: "部屋と授業を作成中...",
  checkingRoom: "授業を確認中...",
  helperLocked: "先に授業に入ってから書いてください。",
  helperInRoom: "書き終わったら送信します。同じ授業の人が見られます。",
  helperInRoomStudent: "書き終わったら送信します。先生が確認でき、自分の作品も見られます。",
  courseCreateFailed: "授業を追加できません。サーバーを確認してください。",
});

Object.assign(TRANSLATIONS.vi, {
  roomPassword: "Ma lop hoc",
  joinHeadline: "Hoc sinh nhap ma lop va chi vao bang cua lop do",
  roomCodeLabel: "Ma lop bang so",
  roomCodePlaceholder: "Vi du: 246801",
  courseCodeLabel: "Ma lop hoc",
  courseCodePlaceholder: "Tu dong tao",
  enterRoom: "Vao lop",
  roomNote: "Giao vien vao lop khong can mat ma. He thong tu tao ma 6 chu so cho hoc sinh.",
  invalidRoom: "Ma lop phai la 6 chu so.",
  roomNotFound: "Khong tim thay lop nay. Hay kiem tra giao vien da tao ma lop truoc chua.",
  roomCheckFailed: "Khong the kiem tra lop. Hay xac nhan may chu dang chay hoac ma chua bi dung.",
  creatingRoom: "Dang tao phong va lop...",
  checkingRoom: "Dang kiem tra lop...",
  helperLocked: "Hay vao lop truoc khi viet tay.",
  helperInRoom: "Gui sau khi viet xong. Moi nguoi trong lop nay se thay.",
  helperInRoomStudent: "Gui sau khi viet xong. Giao vien se thay, va em se thay bai cua minh.",
  courseCreateFailed: "Khong the them lop. Hay xac nhan may chu dang chay.",
});

const roomForm = document.querySelector("#roomForm");
const roomCodeInput = document.querySelector("#roomCode");
const roomEntry = document.querySelector("#roomEntry");
const roomMessage = document.querySelector("#roomMessage");
const joinPanel = document.querySelector("#joinPanel");
const teacherDashboard = document.querySelector("#teacherDashboard");
const teacherRoomForm = document.querySelector("#teacherRoomForm");
const teacherRoomCodeInput = document.querySelector("#teacherRoomCode");
const teacherRoomNameInput = document.querySelector("#teacherRoomName");
const teacherDashboardMessage = document.querySelector("#teacherDashboardMessage");
const teacherDashboardStatusText = document.querySelector("#teacherDashboardStatusText");
const teacherDashboardLogoutButton = document.querySelector("#teacherDashboardLogoutButton");
const classroomLayout = document.querySelector("#classroomLayout");
const writerPanel = document.querySelector(".writer-panel");
const teacherLoginCard = document.querySelector("#teacherLoginCard");
const teacherName = document.querySelector("#teacherName");
const teacherUsername = document.querySelector("#teacherUsername");
const teacherPassword = document.querySelector("#teacherPassword");
const teacherFields = document.querySelector("#teacherFields");
const teacherStatusText = document.querySelector("#teacherStatusText");
const teacherLoginButton = document.querySelector("#teacherLoginButton");
const teacherRegisterButton = document.querySelector("#teacherRegisterButton");
const teacherResetButton = document.querySelector("#teacherResetButton");
const teacherLogoutButton = document.querySelector("#teacherLogoutButton");
const teacherHistory = document.querySelector("#teacherHistory");
const studentName = document.querySelector("#studentName");
const promptText = document.querySelector("#promptText");
const coursePanel = document.querySelector("#coursePanel");
const courseControls = document.querySelector(".course-controls");
const courseForm = document.querySelector("#courseForm");
const courseSelect = document.querySelector("#courseSelect");
const courseNameInput = document.querySelector("#courseNameInput");
const courseCodeInput = document.querySelector("#courseCodeInput");
const renameCourseButton = document.querySelector("#renameCourseButton");
const deleteCourseButton = document.querySelector("#deleteCourseButton");
const activeCourseName = document.querySelector("#activeCourseName");
const boardCourseLabel = document.querySelector("#boardCourseLabel");
const boardTitle = document.querySelector(".board-title-row h2");
const brushSize = document.querySelector("#brushSize");
const inkColor = document.querySelector("#inkColor");
const canvasShrinkButton = document.querySelector("#canvasShrinkButton");
const canvasGrowButton = document.querySelector("#canvasGrowButton");
const canvasScaleInput = document.querySelector("#canvasScaleInput");
const canvasScaleValue = document.querySelector("#canvasScaleValue");
const helperText = document.querySelector("#helperText");
const boardList = document.querySelector("#boardList");
const boardPanel = document.querySelector(".board-panel");
const fullscreenBoardButton = document.querySelector("#fullscreenBoardButton");
const leaveRoomButton = document.querySelector("#leaveRoomButton");
const renameRoomButton = document.querySelector("#renameRoomButton");
const endCourseButton = document.querySelector("#endCourseButton");
const deleteRoomButton = document.querySelector("#deleteRoomButton");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const emptyTemplate = document.querySelector("#emptyTemplate");
const languageSelect = document.querySelector("#languageSelect");
const roomNameModal = document.querySelector("#roomNameModal");
const roomNameForm = document.querySelector("#roomNameForm");
const roomNameModalInput = document.querySelector("#roomNameModalInput");
const roomNameCancelButton = document.querySelector("#roomNameCancelButton");

let posts = [];
let courses = [];
let teacherRooms = [];
let teacherSession = loadTeacherProfile();
let activeRoom = "";
let activeRoomName = "";
let activeRole = "teacher";
let activeCourseId = "default";
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "zh-Hant";
let useServer = true;
let mode = "draw";
let drawing = false;
let lastPoint = null;
let lastMidPoint = null;
let smoothPoint = null;
let hasInk = false;
let undoStack = [];
let undoInkStack = [];
let resizeTimer = null;
let studentNameRefreshTimer = null;
let canvasBaseWidth = 0;
let canvasBaseHeight = 0;
let canvasContentWidth = 0;
let canvasContentHeight = 0;
let canvasScalePercent = 100;
const MASTER_CANVAS_SCALE = 2;
const CANVAS_WORLD_FACTOR = 3;
const masterCanvas = document.createElement("canvas");
const masterCtx = masterCanvas.getContext("2d", { willReadFrequently: true });
let refreshTimer = null;
let courseRefreshTimer = null;
let isBoardFullscreen = false;
let handlingBrowserBack = false;
let activeStrokePointerId = null;
let touchPanState = null;
const activeTouchPointers = new Map();

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

function confirmDeleteRoomMessage(code) {
  const messages = {
    "zh-Hans": `确定要删除房间 ${code} 吗？房间里的课程和作品都会删除。`,
    "zh-Hant": `確定要刪除房間 ${code} 嗎？房間裡的課程和作品都會刪除。`,
    en: `Delete room ${code}? Courses and student works in this room will be deleted.`,
    ja: `部屋 ${code} を削除しますか？この部屋の授業と作品も削除されます。`,
    vi: `Xóa phòng ${code}? Các lớp học và bài viết trong phòng này cũng sẽ bị xóa.`,
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function roomDeletedMessage(code) {
  const messages = {
    "zh-Hans": `房间 ${code} 已删除。`,
    "zh-Hant": `房間 ${code} 已刪除。`,
    en: `Room ${code} has been deleted.`,
    ja: `部屋 ${code} を削除しました。`,
    vi: `Đã xóa phòng ${code}.`,
  };
  return messages[currentLanguage] || messages["zh-Hant"];
}

function deleteRoomFailedMessage() {
  const messages = {
    "zh-Hans": "删除房间失败，请确认老师账号是否已登入。",
    "zh-Hant": "刪除房間失敗，請確認老師帳號是否已登入。",
    en: "Could not delete the room. Check that the teacher account is signed in.",
    ja: "部屋を削除できません。先生アカウントでログインしているか確認してください。",
    vi: "Không thể xóa phòng. Hãy kiểm tra tài khoản giáo viên đã đăng nhập.",
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
    const label = t(element.dataset.i18nTitle);
    element.title = label;
    if (element.hasAttribute("aria-label")) {
      element.setAttribute("aria-label", label);
    }
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
  teacherDashboardStatusText.textContent = label ? t("teacherSignedIn", { name: label }) : t("teacherNotSignedIn");
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

async function continueAfterTeacherAuth(successKey) {
  activeRole = "teacher";
  roomMessage.textContent = "";
  teacherDashboardMessage.textContent = t(successKey);
  await openTeacherDefaultClassroom();
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
  teacherResetButton.disabled = true;
  try {
    const result = await apiRequest(`/api/teacher/${mode}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem(TEACHER_TOKEN_KEY, result.token);
    saveTeacherProfile(result.teacher || {});
    teacherPassword.value = "";
    await continueAfterTeacherAuth(mode === "register" ? "registerSuccess" : "loginSuccess");
  } catch {
    roomMessage.textContent = t(mode === "register" ? "registerFailed" : "loginFailed");
  } finally {
    teacherLoginButton.disabled = false;
    teacherRegisterButton.disabled = false;
    teacherResetButton.disabled = false;
  }
}

async function resetTeacherPassword() {
  const payload = {
    name: teacherName.value.trim(),
    username: teacherUsername.value.trim(),
    password: teacherPassword.value,
  };
  if (!payload.name || !payload.username || !payload.password) {
    roomMessage.textContent = t("resetPasswordRequired");
    (payload.name ? teacherUsername : teacherName).focus();
    return;
  }
  teacherLoginButton.disabled = true;
  teacherRegisterButton.disabled = true;
  teacherResetButton.disabled = true;
  try {
    const result = await apiRequest("/api/teacher/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem(TEACHER_TOKEN_KEY, result.token);
    saveTeacherProfile(result.teacher || {});
    teacherPassword.value = "";
    await continueAfterTeacherAuth("resetPasswordSuccess");
  } catch {
    roomMessage.textContent = t("resetPasswordFailed");
  } finally {
    teacherLoginButton.disabled = false;
    teacherRegisterButton.disabled = false;
    teacherResetButton.disabled = false;
  }
}

function logoutTeacher() {
  localStorage.removeItem(TEACHER_TOKEN_KEY);
  localStorage.removeItem(TEACHER_KEY);
  teacherSession = {};
  teacherName.value = "";
  teacherUsername.value = "";
  teacherPassword.value = "";
  teacherRoomCodeInput.value = "";
  teacherRoomNameInput.value = "";
  teacherDashboardMessage.textContent = "";
  teacherHistory.replaceChildren();
  updateTeacherStatus();
  setRoomUi();
  updateBrowserHistory();
}

async function loadTeacherHistory() {
  if (!teacherToken()) {
    teacherRooms = [];
    renderTeacherHistory([]);
    return;
  }
  try {
    const session = await apiRequest("/api/teacher/me", { headers: authHeaders() });
    saveTeacherProfile(session.teacher || teacherSession || {});
    const data = await apiRequest("/api/teacher/history", { headers: authHeaders() });
    teacherRooms = data.rooms || [];
    renderTeacherHistory(teacherRooms);
  } catch {
    localStorage.removeItem(TEACHER_TOKEN_KEY);
    teacherSession = {};
    teacherRooms = [];
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

  const row = document.createElement("div");
  row.className = "history-select-row";
  const select = document.createElement("select");
  select.className = "history-select";
  select.setAttribute("aria-label", t("historyTitle"));
  rooms.forEach((room) => {
    const option = document.createElement("option");
    const courseNames = (room.courses || []).map((course) => course.name).filter(Boolean).slice(0, 2).join(" / ");
    const roomName = String(room.name || "").trim();
    option.value = room.room;
    option.textContent = roomName || courseNames || t("defaultCourse");
    select.append(option);
  });
  if (activeRoom && rooms.some((room) => String(room.room) === String(activeRoom))) {
    select.value = activeRoom;
  }
  select.addEventListener("change", () => {
    teacherRoomCodeInput.value = select.value;
    const room = rooms.find((item) => item.room === select.value);
    teacherRoomNameInput.value = String(room?.name || "");
    enterRoom(select.value, "teacher", { existing: true });
  });

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "quiet-button";
  addButton.textContent = t("addCourse");
  addButton.addEventListener("click", () => {
    teacherRoomNameInput.value = t("defaultCourse");
    enterRoom("", "teacher");
  });

  const renameButton = document.createElement("button");
  renameButton.type = "button";
  renameButton.className = "quiet-button";
  renameButton.textContent = t("renameCourse");
  renameButton.addEventListener("click", renameRoom);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "quiet-button danger-button";
  deleteButton.textContent = t("deleteCourse");
  deleteButton.addEventListener("click", () => deleteRoom(activeRoom));

  row.append(select, addButton, renameButton, deleteButton);
  teacherHistory.append(row);
}

async function openTeacherDefaultClassroom() {
  if (!teacherToken()) return;
  await loadTeacherHistory();
  const saved = loadSavedRoom();
  if (saved?.role === "teacher" && validateRoomCode(String(saved.room || ""))) {
    await enterRoom(String(saved.room), "teacher", { existing: true });
    if (activeRoom) return;
  }
  const firstRoom = teacherRooms[0];
  if (firstRoom?.room) {
    await enterRoom(String(firstRoom.room), "teacher", { existing: true });
    if (activeRoom) return;
  }
  teacherRoomNameInput.value = t("defaultCourse");
  await enterRoom("", "teacher");
}
function activeCourse() {
  return courses.find((course) => course.id === activeCourseId) || courses[0] || { id: "default", name: t("defaultCourse") };
}

function syncCourseNameInput(force = false) {
  if (activeRole !== "teacher" || !courseNameInput) return;
  const name = activeCourse().name || t("defaultCourse");
  courseNameInput.placeholder = name;
  if (force) {
    courseNameInput.value = name;
  }
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
  syncBoardHeight();
}

function syncBoardHeight() {
  if (!boardPanel || !writerPanel || !classroomLayout) return;
  const shouldUseNaturalHeight =
    classroomLayout.hidden ||
    isBoardFullscreen ||
    window.matchMedia("(max-width: 1120px)").matches;

  if (shouldUseNaturalHeight) {
    boardPanel.style.removeProperty("--board-panel-height");
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const height = Math.round(writerPanel.getBoundingClientRect().height);
      if (height > 0) {
        boardPanel.style.setProperty("--board-panel-height", `${height}px`);
      }
    });
  });
}

function roomInfoPath(roomCode) {
  return `/api/rooms/${encodeURIComponent(roomCode)}`;
}

function createRoomPath() {
  return "/api/rooms";
}

function courseLookupPath(courseCode) {
  return `/api/courses/by-code/${encodeURIComponent(courseCode)}`;
}

function roomDisplayLabel() {
  const course = activeCourse();
  const name = course.name || activeRoomName || t("defaultCourse");
  if (activeRole === "teacher" && course.code) {
    return `${name} · ${course.code}`;
  }
  return name;
}

function updateBoardCourseLabel() {
  if (!boardCourseLabel) return;
  boardCourseLabel.replaceChildren();
  if (!activeRoom) {
    boardCourseLabel.textContent = t("sameRoomVisible");
    return;
  }

  const course = activeCourse();
  const name = course.name || activeRoomName || t("defaultCourse");
  const nameLine = document.createElement("span");
  nameLine.className = "board-course-name";
  nameLine.textContent = name;
  boardCourseLabel.append(nameLine);

  if (activeRole === "teacher" && course.code) {
    const passwordLine = document.createElement("span");
    passwordLine.className = "board-course-password";
    passwordLine.textContent = `密碼: ${course.code}`;
    boardCourseLabel.append(passwordLine);
  }
}

function coursesPath() {
  return `/api/rooms/${encodeURIComponent(activeRoom)}/courses`;
}

function coursePath(courseId = activeCourseId) {
  return `${coursesPath()}/${encodeURIComponent(courseId)}`;
}

function rotateRoomPath() {
  return `/api/rooms/${encodeURIComponent(activeRoom)}/rotate`;
}

function roomPath(roomCode = activeRoom) {
  return `/api/rooms/${encodeURIComponent(roomCode)}`;
}

function coursePostsPath(courseId = activeCourseId) {
  const basePath = `/api/rooms/${encodeURIComponent(activeRoom)}/courses/${encodeURIComponent(courseId)}/posts`;
  const name = studentName?.value?.trim() || "";
  if (activeRole === "student") {
    return `${basePath}?student=${encodeURIComponent(name)}`;
  }
  return basePath;
}

function singlePostPath(postId, courseId = activeCourseId) {
  return `${coursePostsPath(courseId)}/${encodeURIComponent(postId)}`;
}

function loadSavedRoom() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function saveCurrentRoom() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ room: activeRoom, roomName: activeRoomName, role: activeRole, courseId: activeCourseId }));
}

function currentViewName() {
  if (activeRoom) return "classroom";
  return "join";
}

function browserStateForCurrentView() {
  return {
    view: currentViewName(),
    room: activeRoom || "",
    roomName: activeRoomName || "",
    role: activeRole || new FormData(roomForm).get("role") || "student",
    courseId: activeCourseId || "default",
  };
}

function updateBrowserHistory(options = {}) {
  if (handlingBrowserBack) return;
  const state = browserStateForCurrentView();
  const method = options.replace ? "replaceState" : "pushState";
  window.history[method](state, "", window.location.pathname || "/");
}

function leaveCurrentRoomForHistory() {
  setBoardFullscreen(false);
  activeRoom = "";
  activeRoomName = "";
  posts = [];
  courses = [{ id: "default", name: t("defaultCourse") }];
  activeCourseId = "default";
  if (refreshTimer) window.clearInterval(refreshTimer);
  if (courseRefreshTimer) window.clearInterval(courseRefreshTimer);
  localStorage.removeItem(STORAGE_KEY);
  renderCourses();
  renderBoard();
  resetCanvasDraft();
}

function showTeacherDashboardFromHistory() {
  leaveCurrentRoomForHistory();
  const teacherRole = roomForm.querySelector('input[name="role"][value="teacher"]');
  if (teacherRole) teacherRole.checked = true;
  activeRole = "teacher";
  setRoomUi();
}

function showJoinFromHistory() {
  leaveCurrentRoomForHistory();
  const studentRole = roomForm.querySelector('input[name="role"][value="student"]');
  if (studentRole) studentRole.checked = true;
  activeRole = "student";
  setRoomUi();
}

function initializeBrowserHistory() {
  window.history.replaceState({ view: "join", role: new FormData(roomForm).get("role") || "student" }, "", window.location.pathname || "/");
  const state = browserStateForCurrentView();
  if (state.view !== "join") {
    window.history.pushState(state, "", window.location.pathname || "/");
  }
}

function primeSavedRoomUi() {
  const saved = loadSavedRoom();
  if (!saved || !validateRoomCode(String(saved.room || ""))) return;
  if (saved.role === "teacher" && !teacherToken()) return;
  activeRoom = String(saved.room);
  activeRoomName = String(saved.roomName || "").trim();
  activeRole = saved.role === "teacher" ? "teacher" : "student";
  activeCourseId = saved.courseId || "default";
  roomCodeInput.value = activeRoom;
  teacherRoomCodeInput.value = activeRoom;
  if (teacherRoomNameInput) teacherRoomNameInput.value = activeRoomName;
}

function validateRoomCode(value) {
  return /^[0-9]{4,8}$/.test(value);
}

function validateCourseCode(value) {
  return /^[0-9]{6}$/.test(value);
}

function setRoomUi() {
  const inRoom = Boolean(activeRoom);
  const selectedRole = new FormData(roomForm).get("role");
  const isTeacherSelected = selectedRole === "teacher";
  const showTeacherDashboard = false;
  joinPanel.hidden = inRoom;
  teacherDashboard.hidden = true;
  classroomLayout.hidden = !inRoom;
  classroomLayout.classList.toggle("student-writing-only", inRoom && activeRole === "student");
  boardPanel.hidden = !inRoom;
  if (leaveRoomButton) leaveRoomButton.hidden = !inRoom;
  document.querySelector(".board-actions").hidden = true;
  coursePanel.hidden = activeRole !== "teacher";
  courseControls.hidden = activeRole !== "teacher";
  courseForm.hidden = activeRole !== "teacher";
  deleteCourseButton.disabled = activeRole !== "teacher" || !activeRoom || !activeCourseId || !courses.length;
  renameRoomButton.hidden = activeRole !== "teacher";
  endCourseButton.hidden = activeRole !== "teacher";
  deleteRoomButton.hidden = activeRole !== "teacher";
  if (activeRole === "teacher" && inRoom && teacherHistory.nextElementSibling !== courseControls) {
    coursePanel.insertBefore(teacherHistory, courseControls);
  }
  teacherHistory.hidden = !(activeRole === "teacher" && inRoom && teacherToken());
  teacherLoginCard.hidden = !isTeacherSelected;
  roomEntry.hidden = inRoom || isTeacherSelected;
  helperText.textContent = inRoom ? t(activeRole === "student" ? "helperInRoomStudent" : "helperInRoom") : t("helperLocked");
  const course = activeCourse();
  if (activeCourseName) activeCourseName.textContent = course.name || t("defaultCourse");
  updateBoardCourseLabel();
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

async function enterRoom(roomCode, role, options = {}) {
  const isTeacherRole = role === "teacher";
  const codeInput = isTeacherRole ? teacherRoomCodeInput : roomCodeInput;
  const messageTarget = isTeacherRole ? teacherDashboardMessage : roomMessage;
  const isValidEntryCode = isTeacherRole ? validateRoomCode(roomCode) : validateCourseCode(roomCode);
  if ((!isTeacherRole || options.existing) && !isValidEntryCode) {
    messageTarget.textContent = t("invalidRoom");
    codeInput.focus();
    return;
  }

  const submitButton = isTeacherRole
    ? teacherRoomForm.querySelector('button[type="submit"]')
    : roomForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  messageTarget.textContent = isTeacherRole ? t("creatingRoom") : t("checkingRoom");

  try {
    let roomInfo;
    if (isTeacherRole) {
      if (!teacherToken()) {
        messageTarget.textContent = t("loginRequired");
        teacherUsername.focus();
        return;
      }
      if (options.existing) {
        roomInfo = await apiRequest(roomInfoPath(roomCode), { headers: authHeaders() });
        if (!roomInfo.exists) {
          localStorage.removeItem(STORAGE_KEY);
          messageTarget.textContent = t("roomNotFound");
          return;
        }
      } else {
        const roomName = teacherRoomNameInput.value.trim() || t("defaultCourse");
        roomInfo = await apiRequest(createRoomPath(), {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ role: "teacher", name: roomName, courseName: t("defaultCourse") }),
        });
      }
      await loadTeacherHistory();
    } else {
      roomInfo = await apiRequest(courseLookupPath(roomCode));
      if (!roomInfo.exists) {
        messageTarget.textContent = t("roomNotFound");
        codeInput.focus();
        return;
      }
    }

    activeRoom = String(roomInfo.room || roomCode);
    activeRoomName = String(roomInfo.name || "").trim();
    if (isTeacherRole && teacherRoomNameInput) teacherRoomNameInput.value = activeRoomName;
    activeRole = role;
    courses = roomInfo.courses?.length ? roomInfo.courses : [{ id: "default", name: t("defaultCourse") }];
    activeCourseId = roomInfo.activeCourseId || courses[0].id;
    useServer = true;
    roomMessage.textContent = "";
    teacherDashboardMessage.textContent = "";
    saveCurrentRoom();
    renderCourses();
    syncCourseNameInput(true);
    setRoomUi();
    updateBrowserHistory();
    window.requestAnimationFrame(() => {
      resizeCanvas({ center: true, snapshot: null });
      resetCanvasDraft();
    });
    await refreshPosts();
    startTimers();
  } catch (error) {
    if (isTeacherRole && error.status === 401) {
      localStorage.removeItem(TEACHER_TOKEN_KEY);
      updateTeacherStatus();
      messageTarget.textContent = t("teacherSessionExpired");
    } else if (role !== "teacher" && error.status === 404) {
      messageTarget.textContent = t("roomNotFound");
    } else {
      messageTarget.textContent = t("roomCheckFailed");
    }
    codeInput.focus();
  } finally {
    submitButton.disabled = false;
  }
}

async function restoreSavedRoom() {
  const saved = loadSavedRoom();
  if (!saved || !validateRoomCode(String(saved.room || ""))) return;
  if (saved.role === "teacher" && !teacherToken()) return;

  try {
    const roomInfo = await apiRequest(roomInfoPath(saved.room));
    if (!roomInfo.exists) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    activeRoom = String(saved.room);
    activeRoomName = String(roomInfo.name || saved.roomName || "").trim();
    activeRole = saved.role === "teacher" ? "teacher" : "student";
    courses = roomInfo.courses?.length ? roomInfo.courses : [{ id: "default", name: t("defaultCourse") }];
    activeCourseId = courses.some((course) => course.id === saved.courseId)
      ? saved.courseId
      : roomInfo.activeCourseId || courses[0].id;
    useServer = true;
    roomCodeInput.value = activeRoom;
    teacherRoomCodeInput.value = activeRoom;
    if (teacherRoomNameInput) teacherRoomNameInput.value = activeRoomName;
    roomMessage.textContent = "";
    teacherDashboardMessage.textContent = "";
    saveCurrentRoom();
    renderCourses();
    syncCourseNameInput(true);
    setRoomUi();
    window.requestAnimationFrame(() => {
      resizeCanvas({ center: true, snapshot: null });
      resetCanvasDraft();
    });
    await refreshPosts({ quiet: true });
    startTimers();
  } catch {
    useServer = false;
    setRoomUi();
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
    if (courseCodeInput) courseCodeInput.value = "";
    renderCourses();
    setRoomUi();
    renderBoard();
    await loadTeacherHistory();
    helperText.textContent = t("courseCreated", { name: activeCourse().name });
  } catch {
    helperText.textContent = t("courseCreateFailed");
  }
}

async function renameCourse(name) {
  if (!activeRoom || activeRole !== "teacher" || !activeCourseId) return;
  const courseName = name.trim();
  if (!courseName) {
    courseNameInput.focus();
    return;
  }
  try {
    const data = await apiRequest(coursePath(activeCourseId), {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ name: courseName }),
    });
    courses = data.courses;
    activeCourseId = data.activeCourseId || activeCourseId;
    renderCourses();
    syncCourseNameInput(true);
    setRoomUi();
    renderBoard();
    await loadTeacherHistory();
    helperText.textContent = t("courseRenamed", { name: activeCourse().name });
  } catch {
    helperText.textContent = t("courseRenameFailed");
  }
}

async function deleteCourse() {
  if (!activeRoom || activeRole !== "teacher" || !activeCourseId) return;
  const course = activeCourse();
  const courseName = course.name || t("defaultCourse");
  if (!window.confirm(t("confirmDeleteCourse", { name: courseName }))) return;
  deleteCourseButton.disabled = true;
  try {
    const data = await apiRequest(coursePath(course.id), {
      method: "DELETE",
      headers: authHeaders(),
    });
    courses = data.courses?.length ? data.courses : [{ id: "default", name: t("defaultCourse") }];
    activeCourseId = data.activeCourseId || courses[0]?.id || "default";
    posts = data.posts || [];
    renderCourses();
    syncCourseNameInput(true);
    setRoomUi();
    renderBoard();
    await loadTeacherHistory();
    helperText.textContent = t("courseDeleted", { name: courseName });
  } catch {
    helperText.textContent = t("courseDeleteFailed");
  } finally {
    deleteCourseButton.disabled = false;
  }
}

async function renameRoom() {
  if (!activeRoom || activeRole !== "teacher") return;
  openRoomNameModal();
}

function openRoomNameModal() {
  roomNameModalInput.value = activeRoomName || "";
  roomNameModal.hidden = false;
  window.setTimeout(() => {
    roomNameModalInput.focus();
    roomNameModalInput.select();
  }, 0);
}

function closeRoomNameModal() {
  roomNameModal.hidden = true;
}

async function saveRoomName(nextName) {
  if (!activeRoom || activeRole !== "teacher") return;
  try {
    const roomInfo = await apiRequest(roomPath(activeRoom), {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ name: nextName.trim() }),
    });
    activeRoomName = String(roomInfo.name || "").trim();
    if (teacherRoomNameInput) teacherRoomNameInput.value = activeRoomName;
    saveCurrentRoom();
    setRoomUi();
    renderBoard();
    await loadTeacherHistory();
    helperText.textContent = t("roomRenamed");
    closeRoomNameModal();
  } catch {
    helperText.textContent = t("roomRenameFailed");
  }
}

async function endCourseAndRotatePassword() {
  if (!activeRoom || activeRole !== "teacher") return;
  if (!window.confirm(confirmEndCourseMessage())) return;

  endCourseButton.disabled = true;
  try {
    const roomInfo = await apiRequest(rotateRoomPath(), { method: "POST", headers: authHeaders() });
    activeRoom = roomInfo.room;
    activeRoomName = String(roomInfo.name || activeRoomName || "").trim();
    courses = roomInfo.courses?.length ? roomInfo.courses : courses;
    activeCourseId = roomInfo.activeCourseId || activeCourseId;
    roomCodeInput.value = activeRoom;
    if (teacherRoomNameInput) teacherRoomNameInput.value = activeRoomName;
    saveCurrentRoom();
    renderCourses();
    setRoomUi();
    await refreshPosts();
    const message = passwordRotatedMessage(activeCourse().code || "");
    await loadTeacherHistory();
    helperText.textContent = message;
    window.alert(message);
  } catch {
    helperText.textContent = passwordRotateFailedMessage();
  } finally {
    endCourseButton.disabled = false;
  }
}

async function deleteRoom(roomCode = activeRoom, options = {}) {
  if (!roomCode || activeRole !== "teacher") return;
  if (!window.confirm(confirmDeleteRoomMessage(roomCode))) return;
  deleteRoomButton.disabled = true;
  try {
    await apiRequest(roomPath(roomCode), { method: "DELETE", headers: authHeaders() });
    if (roomCode === activeRoom) {
      activeRoom = "";
      activeRoomName = "";
      posts = [];
      courses = [];
      activeCourseId = "default";
      if (refreshTimer) window.clearInterval(refreshTimer);
      if (courseRefreshTimer) window.clearInterval(courseRefreshTimer);
      localStorage.removeItem(STORAGE_KEY);
      setRoomUi();
      renderCourses();
      renderBoard();
      updateBrowserHistory();
    }
    await loadTeacherHistory();
    helperText.textContent = roomDeletedMessage(roomCode);
  } catch {
    helperText.textContent = deleteRoomFailedMessage();
  } finally {
    deleteRoomButton.disabled = false;
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
  syncCourseNameInput(false);
  setRoomUi();
}

async function refreshPosts({ quiet = false } = {}) {
  if (!activeRoom || !useServer || !activeCourseId) return;
  if (activeRole === "student" && !studentName.value.trim()) {
    posts = [];
    renderBoard();
    return;
  }
  try {
    posts = await apiRequest(coursePostsPath(), {
      headers: activeRole === "teacher" ? authHeaders() : {},
    });
    renderBoard();
  } catch {
    useServer = false;
    if (!quiet) helperText.textContent = t("serverMissing");
    renderBoard();
  }
}

function resizeCanvas(options = {}) {
  const snapshot = options.snapshot ?? (masterCanvas.width ? masterCanvas.toDataURL("image/png") : (canvas.width ? canvas.toDataURL("image/png") : null));
  const oldContentWidth = canvasContentWidth || canvasBaseWidth || canvasWrap.clientWidth || 1;
  const oldContentHeight = canvasContentHeight || canvasBaseHeight || canvasWrap.clientHeight || 1;
  const rect = canvasWrap.getBoundingClientRect();
  const width = Math.max(1, Math.floor(canvasWrap.clientWidth || rect.width));
  const height = Math.max(1, Math.floor(canvasWrap.clientHeight || rect.height));
  const scale = window.devicePixelRatio || 1;
  canvasBaseWidth = width;
  canvasBaseHeight = height;
  canvasContentWidth = Math.max(canvasContentWidth, Math.floor(width * CANVAS_WORLD_FACTOR));
  canvasContentHeight = Math.max(canvasContentHeight, Math.floor(height * CANVAS_WORLD_FACTOR));
  masterCanvas.width = Math.max(1, Math.floor(canvasContentWidth * scale * MASTER_CANVAS_SCALE));
  masterCanvas.height = Math.max(1, Math.floor(canvasContentHeight * scale * MASTER_CANVAS_SCALE));
  masterCtx.setTransform(scale * MASTER_CANVAS_SCALE, 0, 0, scale * MASTER_CANVAS_SCALE, 0, 0);
  masterCtx.lineCap = "round";
  masterCtx.lineJoin = "round";
  updateCanvasScaleUi(currentCanvasScale(), { center: Boolean(options.center) });
  if (snapshot) {
    const image = new Image();
    image.onload = () => {
      masterCtx.drawImage(image, 0, 0, oldContentWidth, oldContentHeight);
      renderCanvasFromMaster();
      if (options.center) centerCanvasViewport();
    };
    image.src = snapshot;
  } else {
    renderCanvasFromMaster();
    if (options.center) centerCanvasViewport();
  }
  syncBoardHeight();
}

function renderCanvasFromMaster() {
  const scale = window.devicePixelRatio || 1;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(masterCanvas, 0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function currentCanvasScale() {
  return canvasScalePercent;
}

function updateCanvasScaleUi(scale = currentCanvasScale(), options = {}) {
  const scaleValue = Math.min(150, Math.max(50, Math.round(Number(scale) || 100)));
  canvasScalePercent = scaleValue;
  canvasScaleInput.value = String(scaleValue);
  canvasScaleValue.textContent = `${scaleValue}%`;
  applyCanvasZoom(scaleValue, options);
}

function applyCanvasZoom(scale = currentCanvasScale(), options = {}) {
  const scaleValue = Math.min(150, Math.max(50, Math.round(Number(scale) || 100)));
  const zoom = scaleValue / 100;
  if (!canvasBaseWidth || !canvasBaseHeight) {
    const rect = canvasWrap.getBoundingClientRect();
    canvasBaseWidth = Math.max(1, Math.floor(canvasWrap.clientWidth || rect.width));
    canvasBaseHeight = Math.max(1, Math.floor(canvasWrap.clientHeight || rect.height));
  }
  canvasContentWidth = Math.max(canvasContentWidth, Math.floor(canvasBaseWidth * CANVAS_WORLD_FACTOR));
  canvasContentHeight = Math.max(canvasContentHeight, Math.floor(canvasBaseHeight * CANVAS_WORLD_FACTOR));
  const displayWidth = Math.max(canvasBaseWidth * 1.35, canvasContentWidth * zoom);
  const displayHeight = Math.max(canvasBaseHeight * 1.35, canvasContentHeight * zoom);
  const pixelScale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(displayWidth * pixelScale));
  canvas.height = Math.max(1, Math.floor(displayHeight * pixelScale));
  canvasStage.style.setProperty("--canvas-stage-width", `${displayWidth}px`);
  canvasStage.style.setProperty("--canvas-stage-height", `${displayHeight}px`);
  canvasWrap.style.setProperty("--canvas-scroll-width", `${displayWidth}px`);
  canvasWrap.style.setProperty("--canvas-scroll-height", `${displayHeight}px`);
  canvasWrap.style.setProperty("--grid-large", `${80 * scaleValue / 100}px`);
  canvasWrap.style.setProperty("--grid-small", `${40 * scaleValue / 100}px`);
  renderCanvasFromMaster();
  if (options.center) centerCanvasViewport();
}

function centerCanvasViewport() {
  const center = () => {
    canvasWrap.scrollLeft = Math.max(0, (canvasWrap.scrollWidth - canvasWrap.clientWidth) / 2);
    canvasWrap.scrollTop = Math.max(0, (canvasWrap.scrollHeight - canvasWrap.clientHeight) / 2);
  };
  center();
  requestAnimationFrame(center);
}

function rescaleCanvasDrawing(previousScale, nextScale) {
  if (!hasInk || !masterCanvas.width || !masterCanvas.height) return;
  const previousContentScale = Math.min(100, Math.max(50, previousScale)) / 100;
  const nextContentScale = Math.min(100, Math.max(50, nextScale)) / 100;
  if (previousContentScale === nextContentScale) return;

  const factor = nextContentScale / previousContentScale;
  const snapshot = document.createElement("canvas");
  snapshot.width = masterCanvas.width;
  snapshot.height = masterCanvas.height;
  const snapshotCtx = snapshot.getContext("2d");
  snapshotCtx.drawImage(masterCanvas, 0, 0);

  const deviceScale = window.devicePixelRatio || 1;
  masterCtx.save();
  masterCtx.setTransform(1, 0, 0, 1, 0, 0);
  masterCtx.clearRect(0, 0, masterCanvas.width, masterCanvas.height);
  masterCtx.imageSmoothingEnabled = true;
  masterCtx.imageSmoothingQuality = "high";
  masterCtx.drawImage(snapshot, 0, 0, masterCanvas.width * factor, masterCanvas.height * factor);
  masterCtx.restore();
  masterCtx.setTransform(deviceScale * MASTER_CANVAS_SCALE, 0, 0, deviceScale * MASTER_CANVAS_SCALE, 0, 0);
  masterCtx.lineCap = "round";
  masterCtx.lineJoin = "round";
  renderCanvasFromMaster();
}

function adjustCanvasScale(delta) {
  setCanvasScale(currentCanvasScale() + delta);
}

function setCanvasScale(percent) {
  const previousScale = currentCanvasScale();
  const nextScale = Math.min(150, Math.max(50, Math.round(Number(percent) || 100)));
  if (nextScale === previousScale) return;
  updateCanvasScaleUi(nextScale);
}

function restoreCanvasScale() {
  canvasWrap.style.removeProperty("--canvas-height");
  localStorage.removeItem(CANVAS_HEIGHT_KEY);
  updateCanvasScaleUi(100, { center: true });
}

function pushUndoState() {
  undoStack.push(masterCanvas.toDataURL("image/png"));
  undoInkStack.push(hasInk);
  if (undoStack.length > 20) undoStack.shift();
  if (undoInkStack.length > 20) undoInkStack.shift();
}

function cancelActiveStroke() {
  if (!drawing) return;
  const previous = undoStack.pop();
  const previousHasInk = undoInkStack.pop();
  drawing = false;
  lastPoint = null;
  lastMidPoint = null;
  smoothPoint = null;
  activeStrokePointerId = null;
  if (previous) {
    hasInk = Boolean(previousHasInk);
    restoreImage(previous);
  } else {
    renderCanvasFromMaster();
  }
}

function restoreImage(dataUrl) {
  const width = canvasContentWidth || canvasBaseWidth || canvasWrap.clientWidth || canvasWrap.getBoundingClientRect().width;
  const height = canvasContentHeight || canvasBaseHeight || canvasWrap.clientHeight || canvasWrap.getBoundingClientRect().height;
  masterCtx.clearRect(0, 0, width, height);
  const image = new Image();
  image.onload = () => {
    masterCtx.drawImage(image, 0, 0, width, height);
    renderCanvasFromMaster();
  };
  image.src = dataUrl;
}

function resetCanvasDraft() {
  const width = canvasContentWidth || canvasBaseWidth || canvasWrap.clientWidth || canvasWrap.getBoundingClientRect().width;
  const height = canvasContentHeight || canvasBaseHeight || canvasWrap.clientHeight || canvasWrap.getBoundingClientRect().height;
  masterCtx.clearRect(0, 0, width, height);
  undoStack = [];
  drawing = false;
  lastPoint = null;
  lastMidPoint = null;
  smoothPoint = null;
  hasInk = false;
  renderCanvasFromMaster();
}

function isTouchPointer(event) {
  return event.pointerType === "touch";
}

function rememberTouchPointer(event) {
  if (!isTouchPointer(event)) return;
  activeTouchPointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
  });
}

function forgetTouchPointer(event) {
  if (!isTouchPointer(event)) return;
  activeTouchPointers.delete(event.pointerId);
  if (activeTouchPointers.size < 2) touchPanState = null;
}

function startTouchCanvasPan(event) {
  if (!isTouchPointer(event) || activeTouchPointers.size < 2) return false;
  cancelActiveStroke();
  event.preventDefault();
  const firstTwoTouches = Array.from(activeTouchPointers.values()).slice(0, 2);
  const centerX = (firstTwoTouches[0].x + firstTwoTouches[1].x) / 2;
  const centerY = (firstTwoTouches[0].y + firstTwoTouches[1].y) / 2;
  touchPanState = {
    centerX,
    centerY,
    scrollLeft: canvasWrap.scrollLeft,
    scrollTop: canvasWrap.scrollTop,
  };
  return true;
}

function updateTouchCanvasPan(event) {
  if (!isTouchPointer(event) || activeTouchPointers.size < 2 || !touchPanState) return false;
  event.preventDefault();
  const firstTwoTouches = Array.from(activeTouchPointers.values()).slice(0, 2);
  const centerX = (firstTwoTouches[0].x + firstTwoTouches[1].x) / 2;
  const centerY = (firstTwoTouches[0].y + firstTwoTouches[1].y) / 2;
  canvasWrap.scrollLeft = touchPanState.scrollLeft - (centerX - touchPanState.centerX);
  canvasWrap.scrollTop = touchPanState.scrollTop - (centerY - touchPanState.centerY);
  return true;
}

function pointerPoint(event) {
  const rect = canvasStage.getBoundingClientRect();
  const zoom = currentCanvasScale() / 100;
  return {
    x: (event.clientX - rect.left) / zoom,
    y: (event.clientY - rect.top) / zoom,
  };
}

function applyBrushStyle() {
  masterCtx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";
  masterCtx.strokeStyle = mode === "erase" ? "rgba(0,0,0,1)" : inkColor.value;
  masterCtx.fillStyle = mode === "erase" ? "rgba(0,0,0,1)" : inkColor.value;
  masterCtx.lineWidth = Number(brushSize.value);
  masterCtx.lineCap = "round";
  masterCtx.lineJoin = "round";
  masterCtx.miterLimit = 1;
}

function drawBrushCircle(point, size = Number(brushSize.value)) {
  masterCtx.beginPath();
  masterCtx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
  masterCtx.fill();
}

function strokeToPoint(point, options = {}) {
  if (!lastPoint) return;
  const size = Number(brushSize.value);
  const origin = smoothPoint || lastPoint;
  const smoothing = options.finish ? 1 : 0.42;
  const nextPoint = {
    x: origin.x + (point.x - origin.x) * smoothing,
    y: origin.y + (point.y - origin.y) * smoothing,
  };
  const distance = Math.hypot(nextPoint.x - lastPoint.x, nextPoint.y - lastPoint.y);
  const steps = Math.max(1, Math.ceil(distance / Math.max(1.5, size * 0.22)));
  const midpoint = {
    x: (lastPoint.x + nextPoint.x) / 2,
    y: (lastPoint.y + nextPoint.y) / 2,
  };
  const startPoint = lastMidPoint || lastPoint;
  masterCtx.beginPath();
  masterCtx.moveTo(startPoint.x, startPoint.y);
  masterCtx.quadraticCurveTo(lastPoint.x, lastPoint.y, midpoint.x, midpoint.y);
  masterCtx.stroke();
  for (let index = 1; index <= steps; index += 1) {
    const ratio = index / steps;
    drawBrushCircle({
      x: lastPoint.x + (nextPoint.x - lastPoint.x) * ratio,
      y: lastPoint.y + (nextPoint.y - lastPoint.y) * ratio,
    }, size);
  }
  lastPoint = nextPoint;
  smoothPoint = nextPoint;
  lastMidPoint = midpoint;
}

function beginStroke(event) {
  if (!activeRoom) return;
  rememberTouchPointer(event);
  if (startTouchCanvasPan(event)) return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  pushUndoState();
  drawing = true;
  activeStrokePointerId = event.pointerId;
  lastPoint = pointerPoint(event);
  lastMidPoint = lastPoint;
  smoothPoint = lastPoint;
  drawDot(lastPoint);
}

function drawDot(point) {
  const size = Number(brushSize.value);
  masterCtx.save();
  applyBrushStyle();
  drawBrushCircle(point, size);
  masterCtx.restore();
  renderCanvasFromMaster();
  if (mode === "draw") hasInk = true;
}

function continueStroke(event) {
  if (isTouchPointer(event) && activeTouchPointers.has(event.pointerId)) {
    activeTouchPointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (updateTouchCanvasPan(event)) return;
  }
  if (!drawing || !lastPoint) return;
  if (activeStrokePointerId !== null && event.pointerId !== activeStrokePointerId) return;
  event.preventDefault();
  const events = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];
  masterCtx.save();
  applyBrushStyle();
  events.forEach((pointerEvent) => strokeToPoint(pointerPoint(pointerEvent)));
  masterCtx.restore();
  renderCanvasFromMaster();
  if (mode === "draw") hasInk = true;
}

function endStroke(event) {
  if (isTouchPointer(event)) {
    forgetTouchPointer(event);
  }
  if (activeStrokePointerId !== null && event?.pointerId !== undefined && event.pointerId !== activeStrokePointerId) return;
  if (!drawing) return;
  if (event?.clientX !== undefined && event?.clientY !== undefined && lastPoint) {
    masterCtx.save();
    applyBrushStyle();
    strokeToPoint(pointerPoint(event), { finish: true });
    masterCtx.restore();
  }
  if (lastPoint && lastMidPoint) {
    masterCtx.save();
    applyBrushStyle();
    masterCtx.beginPath();
    masterCtx.moveTo(lastMidPoint.x, lastMidPoint.y);
    masterCtx.lineTo(lastPoint.x, lastPoint.y);
    masterCtx.stroke();
    masterCtx.restore();
    renderCanvasFromMaster();
  }
  drawing = false;
  activeStrokePointerId = null;
  lastPoint = null;
  lastMidPoint = null;
  smoothPoint = null;
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
  const width = canvasContentWidth || canvasBaseWidth || canvasWrap.clientWidth || canvasWrap.getBoundingClientRect().width;
  const height = canvasContentHeight || canvasBaseHeight || canvasWrap.clientHeight || canvasWrap.getBoundingClientRect().height;
  masterCtx.clearRect(0, 0, width, height);
  renderCanvasFromMaster();
  hasInk = false;
}

function undo() {
  const previous = undoStack.pop();
  const previousHasInk = undoInkStack.pop();
  if (!previous) return;
  hasInk = Boolean(previousHasInk);
  restoreImage(previous);
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
    image: masterCanvas.toDataURL("image/png"),
  };

  document.querySelector("#submitButton").disabled = true;
  helperText.textContent = t("sending");

  try {
    posts = await apiRequest(coursePostsPath(), {
      method: "POST",
      body: JSON.stringify(post),
    });
    renderBoard();
    resetCanvasDraft();
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

function openPostViewer(post) {
  const overlay = document.createElement("div");
  overlay.className = "post-viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", t("expandPost"));

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "post-viewer-close";
  closeButton.textContent = "x";
  closeButton.title = t("closePost");
  closeButton.setAttribute("aria-label", t("closePost"));

  const image = document.createElement("img");
  image.className = "post-viewer-image";
  image.src = post.image;
  image.alt = t("imageAlt", { name: post.name });

  const caption = document.createElement("div");
  caption.className = "post-viewer-caption";
  caption.textContent = `${post.name} · ${post.prompt}`;

  const onKeyDown = (event) => {
    if (event.key === "Escape") closeViewer();
  };
  const closeViewer = () => {
    window.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  };
  closeButton.addEventListener("click", closeViewer);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeViewer();
  });
  window.addEventListener("keydown", onKeyDown);

  overlay.append(closeButton, image, caption);
  document.body.append(overlay);
}

async function deleteSinglePost(post) {
  if (activeRole !== "teacher" || !post?.id) return;
  if (!window.confirm(t("confirmDeletePost", { name: post.name }))) return;
  try {
    posts = await apiRequest(singlePostPath(post.id, post.courseId || activeCourseId), {
      method: "DELETE",
      headers: authHeaders(),
    });
    renderBoard();
  } catch {
    helperText.textContent = t("deletePostFailed");
  }
}

function renderBoard() {
  boardList.replaceChildren();
  const course = activeCourse();
  if (activeCourseName) activeCourseName.textContent = course.name || t("defaultCourse");
  if (boardTitle) boardTitle.textContent = activeRole === "student" ? t("myWorksTitle") : t("boardTitle");
  updateBoardCourseLabel();

  const visiblePosts = filteredPosts();
  if (!visiblePosts.length) {
    const emptyState = emptyTemplate.content.cloneNode(true);
    emptyState.querySelector("strong").textContent = t(activeRole === "student" ? "myWorksEmptyTitle" : "emptyTitle");
    emptyState.querySelector("span").textContent = t(activeRole === "student" ? "myWorksEmptyText" : "emptyText");
    boardList.append(emptyState);
    syncBoardHeight();
    return;
  }

  const fragment = document.createDocumentFragment();
  visiblePosts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "post-image-wrap";

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = post.image;
    image.alt = t("imageAlt", { name: post.name });

    const expandButton = document.createElement("button");
    expandButton.type = "button";
    expandButton.className = "post-action post-action-expand";
    expandButton.textContent = "⛶";
    expandButton.title = t("expandPost");
    expandButton.setAttribute("aria-label", t("expandPost"));
    expandButton.addEventListener("click", () => openPostViewer(post));

    imageWrap.append(image, expandButton);

    if (activeRole === "teacher") {
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "post-action post-action-delete";
      deleteButton.textContent = "x";
      deleteButton.title = t("deletePost");
      deleteButton.setAttribute("aria-label", t("deletePost"));
      deleteButton.addEventListener("click", () => deleteSinglePost(post));
      imageWrap.append(deleteButton);
    }

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
    card.append(imageWrap, meta);
    fragment.append(card);
  });
  boardList.append(fragment);
  syncBoardHeight();
}

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = new FormData(roomForm).get("role");
  if (role === "teacher" && !teacherToken()) {
    roomMessage.textContent = t("loginRequired");
    teacherUsername.focus();
    return;
  }
  enterRoom(roomCodeInput.value.trim(), role);
});

roomForm.addEventListener("change", () => setRoomUi());
teacherRoomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterRoom("", "teacher");
});
teacherLoginButton.addEventListener("click", () => teacherAuth("login"));
teacherRegisterButton.addEventListener("click", () => teacherAuth("register"));
teacherResetButton.addEventListener("click", resetTeacherPassword);
teacherLogoutButton.addEventListener("click", logoutTeacher);
teacherDashboardLogoutButton.addEventListener("click", logoutTeacher);
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

renameCourseButton.addEventListener("click", () => renameCourse(courseNameInput.value));

deleteCourseButton.addEventListener("click", deleteCourse);

courseSelect.addEventListener("change", async () => {
  activeCourseId = courseSelect.value;
  syncCourseNameInput(true);
  saveCurrentRoom();
  setRoomUi();
  await refreshPosts();
});

document.querySelector("#switchRoomButton").addEventListener("click", () => {
  leaveCurrentRoomForHistory();
  if (activeRole === "teacher" && teacherToken()) {
    openTeacherDefaultClassroom();
    return;
  }
  setRoomUi();
  updateBrowserHistory();
});

leaveRoomButton?.addEventListener("click", () => {
  leaveCurrentRoomForHistory();
  setRoomUi();
  updateBrowserHistory({ replace: true });
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
canvasShrinkButton.addEventListener("click", () => adjustCanvasScale(-1));
canvasGrowButton.addEventListener("click", () => adjustCanvasScale(1));
canvasScaleInput.addEventListener("input", () => setCanvasScale(Number(canvasScaleInput.value)));
document.querySelector("#submitButton").addEventListener("click", submitPost);
studentName.addEventListener("input", () => {
  if (studentNameRefreshTimer) window.clearTimeout(studentNameRefreshTimer);
  studentNameRefreshTimer = window.setTimeout(() => {
    if (activeRole === "student" && activeRoom) refreshPosts({ quiet: true });
  }, 350);
});
renameRoomButton.addEventListener("click", renameRoom);
roomNameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveRoomName(roomNameModalInput.value);
});
roomNameCancelButton.addEventListener("click", closeRoomNameModal);
roomNameModal.addEventListener("click", (event) => {
  if (event.target === roomNameModal) closeRoomNameModal();
});
endCourseButton.addEventListener("click", endCourseAndRotatePassword);
deleteRoomButton.addEventListener("click", () => deleteRoom(activeRoom));
searchInput.addEventListener("input", renderBoard);
sortSelect.addEventListener("change", renderBoard);

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
    syncBoardHeight();
  }, 150);
});

window.addEventListener("popstate", (event) => {
  handlingBrowserBack = true;
  const view = event.state?.view || "join";
  if (view === "classroom" && event.state?.room) {
    const saved = loadSavedRoom();
    if (saved && String(saved.room) === String(event.state.room)) {
      restoreSavedRoom();
    } else if (teacherToken() && event.state.role === "teacher") {
      showTeacherDashboardFromHistory();
    } else {
      showJoinFromHistory();
    }
  } else {
    showJoinFromHistory();
  }
  handlingBrowserBack = false;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !roomNameModal.hidden) {
    closeRoomNameModal();
    return;
  }
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
primeSavedRoomUi();
restoreCanvasScale();
resizeCanvas({ center: true });
languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
applyLanguage(currentLanguage);
setRoomUi();
renderBoard();
restoreSavedRoom().finally(async () => {
  if (!activeRoom && teacherToken()) {
    await openTeacherDefaultClassroom();
  }
  initializeBrowserHistory();
});

