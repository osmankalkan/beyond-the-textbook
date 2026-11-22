import {T} from '../../../study/math.js';
import {study, clinic} from './study.js';
import {questions} from './questions.js';

const base = 'lessons/kurose-ross-8e/2-1';
export const applicationPrinciplesLesson = {
  id:'kurose-ross-8e:2.1', section:'2.1', chapterNumber:'02',
  chapterTitle:T('Uygulama katmanı','Application layer'),
  title:T('Ağ uygulamalarının ilkeleri','Principles of network applications'),
  englishTitle:'Principles of network applications',
  subtitle:T('Soket, protokol ve taşıma hizmetini ayır. İki farklı mimarinin dosya dağıtımını karşılaştır.',
    'Distinguish sockets, protocols, and transport services. Compare file distribution across two architectures.'),
  pages:T('82–95','82–95'), pdfPages:'93–106',
  lessonPath:T(base+'/lesson.md',base+'/lesson-en.md'), mathPath:base+'/math.json', inlinePath:base+'/inline.json',
  labFamily:'application-principles',
  downloadName:T('2-1-ag-uygulamalari.md','2-1-network-applications.md'),
  highlights:T(['İstemci–sunucu ve P2P','Süreçler ve soketler','TCP, UDP ve uygulama gereksinimleri'],['Client–server and P2P','Processes and sockets','TCP, UDP, and application requirements']),
  sourceSummary:T('Kurose & Ross, 8. baskı, §2.1, s. 82–95. Dağıtım deneyi §2.5’e hazırlıktır.','Kurose & Ross, 8th edition, §2.1, pp. 82–95. The distribution experiment previews §2.5.'),
  notesPlaceholder:T('Hangi gereksinim taşıma seçimini değiştirdi?','Which requirement changed your transport choice?'),
  modelLimits:T('Taşıma deneyi senaryoları nitel karşılaştırır. Dağıtım deneyi ideal alt sınırları hesaplar.','The transport experiment compares scenarios qualitatively. The distribution experiment computes ideal lower bounds.'),
  presentation:{
    clinicEyebrow:T('§2.1 · Ağ uygulamaları','§2.1 · Network applications'),
    lab:T('Taşıma ve dağıtım labları','Transport and distribution labs'),
    practice:T('Çözümler ve sorular','Worked cases and questions'),
    practiceTitle:T('Gereksinimi, mimariyi ve sınırı gerekçelendir.','Justify the requirement, architecture, and bound.'),
    practiceIntro:T('Dört puanlamalı vaka ve 12 ipuçlu soru.','Four scored cases and 12 questions with hints.')
  },
  studySupport:study, guidedTools:clinic, questions
};
