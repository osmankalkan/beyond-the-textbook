import {T} from '../../../study/math.js';
import {study, clinic} from './study.js';
import {questions} from './questions.js';

const base = 'lessons/kurose-ross-8e/1-6';

export const networkDefenseLesson = {
  id: 'kurose-ross-8e:1.6',
  section: '1.6',
  chapterNumber: '01',
  chapterTitle: T('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: T('Saldırı altındaki ağlar', 'Networks under attack'),
  englishTitle: 'Networks under attack',
  subtitle: T('Gizlilik, kimlik ve kullanılabilirlik belirtilerini birbirinden ayır.', 'Distinguish confidentiality, identity, and availability symptoms.'),
  pages: T('54–58', '54–58'),
  pdfPages: '65–69',
  lessonPath: T(`${base}/lesson.md`, `${base}/lesson-en.md`),
  mathPath: `${base}/math.json`,
  inlinePath: `${base}/inline.json`,
  labFamily: 'network-defense',
  downloadName: T('1-6-ders-notu.md', '1-6-network-defense.md'),
  highlights: T(['Pasif dinleme ve gizlilik', 'Kimlik ve bütünlük', 'Cihaz kurtarma ve kapasite'], ['Eavesdropping and confidentiality', 'Identity and integrity', 'Recovery and capacity']),
  sourceSummary: T(
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8. baskı, §1.6, basılı s. 54–58 (PDF 65–69). Şemalar ve sorular bu ders için yazıldı.',
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8th ed., §1.6, printed pp. 54–58 (PDF 65–69). Diagrams and questions were created for this lesson.'
  ),
  modelLimits: T('Lab dört sentetik olay ve tek pencerelik kapasite modeli kullanır.', 'The lab uses four synthetic incidents and a single-window capacity model.'),
  notesPlaceholder: T('Bu dersteki ilk tahminin ve gerekçen neydi?', 'What was your first prediction and why?'),
  presentation: {
    clinicEyebrow: T('§1.6 · Saldırı altındaki ağlar', '§1.6 · Networks under attack'),
    lab: T('Savunma labı', 'Defense lab'),
    practice: T('Çözümler ve sorular', 'Worked cases and questions'),
    practiceTitle: T('Sonucu gerekçelendir ve kontrol et.', 'Explain and check your result.'),
    practiceIntro: T('Dört çözümlü vaka ve 12 özgün soru.', 'Four worked cases and 12 original questions.')
  },
  studySupport: study,
  guidedTools: clinic,
  questions
};
