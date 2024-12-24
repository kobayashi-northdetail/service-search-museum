import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja'; // 日本語ロケール

// プラグインの適用
dayjs.extend(utc);
dayjs.extend(timezone);

// 日本時間をデフォルトに設定（オプション）
dayjs.locale('ja');
dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
