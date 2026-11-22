import {networkCoreQuestions} from './questions.js';
import {networkCoreStudy, networkCoreClinic} from './study.js';
import {T} from '../../../study/math.js';

const base = 'lessons/kurose-ross-8e/1-3';

export const networkCoreLesson = {
  id: 'kurose-ross-8e:1.3',
  section: '1.3',
  chapterNumber: '01',
  chapterTitle: T('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: T('Ağ çekirdeği: Paketler, devreler ve ağların ağı', 'The network core: Packets, circuits, and a network of networks'),
  englishTitle: 'The Network Core',
  subtitle: T(
    'Bir paketin çıkışını seç, trafik patlamasının kuyruğunu izle ve İnternet servis sağlayıcılarının nasıl bağlandığını çöz.',
    'Choose a packet’s output link, follow a burst through the queue, and trace how Internet service providers connect.'
  ),
  pages: T('22–34', '22–34'),
  pdfPages: '33–45',
  lessonPath: T(`${base}/lesson.md`, `${base}/lesson-en.md`),
  mathPath: `${base}/math.json`,
  inlinePath: `${base}/inline.json`,
  labFamily: 'network-core',
  downloadName: T('1-3-ag-cekirdegi.md', '1-3-the-network-core.md'),
  highlights: T(
    ['Paketi iletme ve rotayı hesaplama', 'Devre rezervasyonu, FDM ve TDM', 'Patlamalı trafik ve çıkış kuyruğu', 'Transit, peering ve İnternet değişim noktaları'],
    ['Forwarding a packet and computing a route', 'Circuit reservation, FDM, and TDM', 'Bursty traffic and the output queue', 'Transit, peering, and Internet exchange points']
  ),
  notesPlaceholder: T('Örneğin: Ortalama yük düşükken bir kuyruk nasıl oluşur?', 'For example: How can a queue form when average load is low?'),
  sourceSummary: T(
    'Kurose & Ross, Computer Networking: A Top-Down Approach (8. baskı, Pearson, 2021), §1.3.1–§1.3.3, basılı s. 22–34 (PDF s. 33–45). Diyagramlar ve alıştırmalar bu ders için hazırlandı.',
    'Kurose & Ross, Computer Networking: A Top-Down Approach (8th ed., Pearson, 2021), §1.3.1–§1.3.3, printed pp. 22–34 (PDF pp. 33–45). The diagrams and exercises were created for this lesson.'
  ),
  modelLimits: T(
    'Lab tek çıkış hattı, eş boyutlu paketler, eşzamanlı geliş ve sınırsız kuyruk varsayar. Devre kurulumu ve uçtan uca gecikme hesap dışıdır.',
    'The lab assumes one output link, equal-size packets, synchronized arrivals, and an unlimited queue. Circuit setup and end-to-end delay are outside the model.'
  ),
  presentation: {
    clinicEyebrow: T('§1.3 · AĞ ÇEKİRDEĞİ', '§1.3 · THE NETWORK CORE'),
    lab: T('Paket ve devre labı', 'Packet and circuit lab'),
    practice: T('Çözümler ve sorular', 'Worked cases and questions'),
    practiceTitle: T('Çıkışı seç, kuyruğu hesapla, bağlantıyı yorumla.', 'Choose the output, compute the queue, and interpret the connection.'),
    practiceIntro: T('Dört çözümlü vaka ve 12 soru. İpucunu açmadan önce bir ara işlem yaz.', 'Four worked cases and 12 questions. Write an intermediate step before opening a hint.')
  },
  studySupport: networkCoreStudy,
  guidedTools: networkCoreClinic,
  questions: networkCoreQuestions
};
