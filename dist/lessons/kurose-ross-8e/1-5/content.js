import {T} from '../../../study/math.js';
import {protocolLayersStudy, protocolLayersClinic} from './study.js';
import {protocolLayersQuestions} from './questions.js';

const base = 'lessons/kurose-ross-8e/1-5';

export const protocolLayersLesson = {
  id: 'kurose-ross-8e:1.5',
  section: '1.5',
  chapterNumber: '01',
  chapterTitle: T('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: T('Protokol katmanları ve hizmet modelleri', 'Protocol layers and their service models'),
  englishTitle: 'Protocol Layers and Their Service Models',
  subtitle: T('Bir mesajın TCP veya UDP, IPv4 ve Ethernet üzerinden nasıl taşındığını izle.', 'Follow a message through TCP or UDP, IPv4, and Ethernet.'),
  pages: T('47–54', '47–54'),
  pdfPages: '58–65',
  lessonPath: T(`${base}/lesson.md`, `${base}/lesson-en.md`),
  mathPath: `${base}/math.json`,
  inlinePath: `${base}/inline.json`,
  labFamily: 'protocol-layers',
  downloadName: T('1-5-protokol-katmanlari.md', '1-5-protocol-layers.md'),
  highlights: T(
    ['Katmanlar ve hizmet sözleşmeleri', 'İnternet modeli ve OSI', 'Kapsülleme ve bayt hesabı', 'Anahtar, yönlendirici ve alıcı'],
    ['Layers and service contracts', 'Internet and OSI models', 'Encapsulation and byte accounting', 'Switch, router, and receiver']
  ),
  notesPlaceholder: T('Örneğin: Yönlendiriciden geçerken hangi adresler değişir?', 'For example: Which addresses change at the router?'),
  sourceSummary: T(
    'Kurose & Ross, Computer Networking: A Top-Down Approach (8. baskı, Pearson, 2021), §1.5.1–§1.5.2, s. 47–54 (PDF 58–65). Diyagramlar ve alıştırmalar bu ders için hazırlandı.',
    'Kurose & Ross, Computer Networking: A Top-Down Approach (8th ed., Pearson, 2021), §1.5.1–§1.5.2, pp. 47–54 (PDF 58–65). Diagrams and exercises were authored for this lesson.'
  ),
  modelLimits: T(
    'Lab örnek başlık boyutlarıyla bir uygulama mesajını tek IP datagramında, etiketsiz iki Ethernet bağlantısından geçirir. Çıkış rotası ve Ethernet komşuları önceden bilinir.',
    'The lab uses fixed header sizes to carry one application message in a single IP datagram across two untagged Ethernet links. The route and Ethernet neighbors are known in advance.'
  ),
  presentation: {
    clinicEyebrow: T('§1.5 · PROTOKOL KATMANLARI', '§1.5 · PROTOCOL LAYERS'),
    lab: T('Kapsülleme labı', 'Encapsulation lab'),
    practice: T('Çözümler ve sorular', 'Worked cases and questions'),
    practiceTitle: T('Katmanı seç, başlıkları izle, baytları doğrula.', 'Identify the layer, trace the headers, and check the bytes.'),
    practiceIntro: T('Dört çözümlü vaka ve 12 özgün soru. Önce paketin hangi adımda olduğunu belirle.', 'Four worked cases and 12 original questions. Start by identifying where the packet is in its journey.')
  },
  studySupport: protocolLayersStudy,
  guidedTools: protocolLayersClinic,
  questions: protocolLayersQuestions
};
