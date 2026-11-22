import {T} from '../../../study/math.js';
import {study, clinic} from './study.js';
import {questions} from './questions.js';

const base = 'lessons/kurose-ross-8e/1-8';

export const networkReviewLesson = {
  id: 'kurose-ross-8e:1.8',
  section: '1.8',
  chapterNumber: '01',
  chapterTitle: T('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: T('Ünite özeti: Bağlantıyı uçtan uca oku', 'Chapter review: Follow the full path'),
  englishTitle: 'Chapter review: Follow the full path',
  subtitle: T('Üç çerçeveli bir kampüs bağlantısında darboğaz, kuyruk ve yayılmayı karşılaştır.', 'Compare bottlenecks, queueing, and propagation for three frames on a campus path.'),
  pages: T('64–65', '64–65'),
  pdfPages: '75–76',
  lessonPath: T(`${base}/lesson.md`, `${base}/lesson-en.md`),
  mathPath: `${base}/math.json`,
  inlinePath: `${base}/inline.json`,
  labFamily: 'network-review',
  downloadName: T('1-8-ders-notu.md', '1-8-network-review.md'),
  highlights: T(['Erişim ve çekirdek', 'Kapsülleme ve ilk varış', 'Darboğaz ve güvenlik'], ['Access and core', 'Encapsulation and first arrival', 'Bottleneck and security']),
  sourceSummary: T(
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8. baskı, §1.8, basılı s. 64–65 (PDF 75–76). Şemalar ve sorular bu ders için yazıldı.',
    'Kurose & Ross, Computer Networking: A Top-Down Approach, 8th ed., §1.8, printed pp. 64–65 (PDF 75–76). Diagrams and questions were created for this lesson.'
  ),
  modelLimits: T('Model üç eş çerçeveyi sabit iki bağlantıda işler. Başka trafik, TCP kurulumu ve işleme gecikmesi hesap dışıdır.', 'The model sends three equal frames across two fixed links. Background traffic, TCP setup, and processing delay are outside the calculation.'),
  notesPlaceholder: T('Bu dersteki ilk tahminin ve gerekçen neydi?', 'What was your first prediction and why?'),
  presentation: {
    clinicEyebrow: T('§1.8 · Ünite özeti: Bağlantıyı uçtan uca oku', '§1.8 · Chapter review: Follow the full path'),
    lab: T('Ünite kapanış labı', 'Chapter review lab'),
    practice: T('Çözümler ve sorular', 'Worked cases and questions'),
    practiceTitle: T('Sonucu gerekçelendir ve kontrol et.', 'Explain and check your result.'),
    practiceIntro: T('Dört çözümlü vaka ve 12 özgün soru.', 'Four worked cases and 12 original questions.')
  },
  studySupport: study,
  guidedTools: clinic,
  questions
};
