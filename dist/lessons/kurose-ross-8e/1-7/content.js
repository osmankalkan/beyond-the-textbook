import {T} from '../../../study/math.js';
import {study, clinic} from './study.js';
import {questions} from './questions.js';

const base = 'lessons/kurose-ross-8e/1-7';

export const networkHistoryLesson = {
  id: 'kurose-ross-8e:1.7',
  section: '1.7',
  chapterNumber: '01',
  chapterTitle: T('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: T('Bilgisayar ağlarının ve İnternet’in tarihçesi', 'History of computer networking and the Internet'),
  englishTitle: 'History of computer networking and the Internet',
  subtitle: T('Paket ağlarından ortak TCP/IP’ye ve Web’e uzanan tasarım kararlarını izle.', 'Trace the design decisions from packet networks to TCP/IP and the Web.'),
  pages: T('58–64', '58–64'),
  pdfPages: '69–75',
  lessonPath: T(`${base}/lesson.md`, `${base}/lesson-en.md`),
  mathPath: `${base}/math.json`,
  inlinePath: `${base}/inline.json`,
  labFamily: 'network-history',
  downloadName: T('1-7-ders-notu.md', '1-7-network-history.md'),
  highlights: T(['ARPANET ve paket radyosu', 'Ağlar arası ortak protokoller', 'Web, mobil erişim ve içerik ağları'], ['ARPANET and packet radio', 'Common internetworking protocols', 'Web, mobile access, and content networks']),
  sourceSummary: T(
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8. baskı, §1.7, basılı s. 58–64 (PDF 69–75). Şemalar ve sorular bu ders için yazıldı.',
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8th ed., §1.7, printed pp. 58–64 (PDF 69–75). Diagrams and questions were created for this lesson.'
  ),
  modelLimits: T('Zaman çizelgesi seçili dönüm noktalarını özetler. Tarihler farklı ağların tamamı için geçiş yılı değildir.', 'The timeline selects key milestones. Dates do not mark a universal transition of all networks.'),
  notesPlaceholder: T('Bu dersteki ilk tahminin ve gerekçen neydi?', 'What was your first prediction and why?'),
  presentation: {
    clinicEyebrow: T('§1.7 · Bilgisayar ağlarının ve İnternet’in tarihçesi', '§1.7 · History of computer networking and the Internet'),
    lab: T('Zaman çizelgesi labı', 'Timeline lab'),
    practice: T('Çözümler ve sorular', 'Worked cases and questions'),
    practiceTitle: T('Sonucu gerekçelendir ve kontrol et.', 'Explain and check your result.'),
    practiceIntro: T('Dört çözümlü vaka ve 12 özgün soru.', 'Four worked cases and 12 original questions.')
  },
  studySupport: study,
  guidedTools: clinic,
  questions
};
