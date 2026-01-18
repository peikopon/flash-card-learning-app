import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard_title": "AWS Cloud Practitioner Prep",
      "dashboard_subtitle": "Master the cloud concepts",
      "start_random": "Start Random Session",
      "view_mastered": "View Mastered",
      "study_by_section": "Study by Section",
      "mastery_level": "Mastery Level",
      "mastered_count": "{{count}} / {{total}}",
      "exit": "Exit",
      "back": "Back",
      "card_progress": "Card {{current}} of {{total}}",
      "flip_instruction": "Tap to flip",
      "mastered_title": "Mastered Cards",
      "filter_placeholder": "Filter by section or topic...",
      "no_mastered": "No cards mastered yet.",
      "keep_studying": "Keep studying to fill this list!",
      "session_complete": "Session Complete!",
      "session_result": "You mastered {{correct}} out of {{total}} cards in this session.",
      "study_again": "Study Again",
      "back_dashboard": "Back to Dashboard",
      "delist_confirm": "Are you sure you want to un-master \"{{item}}\"?"
    }
  },
  ja: {
    translation: {
      "dashboard_title": "AWS クラウドプラクティショナー 復習",
      "dashboard_subtitle": "クラウドの概念をマスターしよう",
      "start_random": "ランダム学習を開始",
      "view_mastered": "習得済みを表示",
      "study_by_section": "セクション別学習",
      "mastery_level": "習得レベル",
      "mastered_count": "{{count}} / {{total}}",
      "exit": "終了",
      "back": "戻る",
      "card_progress": "カード {{current}} / {{total}}",
      "flip_instruction": "タップして裏返す",
      "mastered_title": "習得済みカード",
      "filter_placeholder": "セクションやトピックで検索...",
      "no_mastered": "まだ習得したカードはありません。",
      "keep_studying": "学習を続けてリストを埋めましょう！",
      "session_complete": "セッション完了！",
      "session_result": "今回のセッションで {{total}} 枚中 {{correct}} 枚を習得しました。",
      "study_again": "もう一度学習する",
      "back_dashboard": "ダッシュボードに戻る",
      "delist_confirm": "「{{item}}」を習得済みから削除してもよろしいですか？"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
