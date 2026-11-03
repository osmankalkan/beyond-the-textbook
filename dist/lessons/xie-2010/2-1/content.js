import {extraQuestions} from './questions.js';
import {separationStudy,separationClinic} from './study.js';
const text=(tr,en)=>({tr,en});
export const separationLesson={
 id:'xie-2010:2.1',section:'2.1',chapterNumber:'02',chapterTitle:text('Birinci mertebe ve basit yüksek mertebe denklemler','First-order and simple higher-order equations'),
 title:text('Değişkenlerin ayrılması','Separation of variables'),englishTitle:'The Method of Separation of Variables',
 subtitle:text('Çarpanları ayır, denge çözümlerini koru, sonucu doğrula.','Separate factors, preserve equilibria, verify the result.'),pages:'16–19',pdfPages:'34–37',
 lessonPath:text('lessons/xie-2010/2-1/lesson.md','lessons/xie-2010/2-1/lesson-en.md'),mathPath:'lessons/xie-2010/2-1/math.json',labFamily:'separation',downloadName:text('2-1-degiskenlerin-ayrilmasi.md','2-1-separation.md'),
 highlights:text(['Ayrılabilir denklemi tanı','Sıfıra bölme ve tekil çözümler','Örnek 2.1–2.3','Vize hazırlığı: dört çözümlü soru'],['Recognize separable equations','Division by zero and singular solutions','Examples 2.1–2.3','Midterm practice: four worked problems']),
 notesPlaceholder:text('Hangi çarpana böldüm? Hangi çözümler kaybolabilir?','Which factor did I divide by? Which solutions could be lost?'),sourceSummary:text('§2.1, s.16–19 temelinde özgün uyarlama. Vize soruları uygulama için hazırlanmıştır.','Original adaptation of §2.1, pp.16–19. Midterm problems were written for this app.'),modelLimits:text('Dört tanımlı analitik aile için k>0 kabul edilir. Eğriler başlangıç noktasını içeren çözüm aralığında çizilir; kutuplar geçilmez. Lojistik örnek ek çalışma içindir.','Four defined analytic families use k>0. Curves are plotted on the solution interval containing the initial point; poles are not crossed. The logistic model is supplementary.'),
 presentation:{clinicEyebrow:text('§2.1 · VİZE ÇALIŞMASI · ÖZGÜN SORULAR','§2.1 · MIDTERM STUDY · ORIGINAL PROBLEMS'),lab:text('Ayırma atölyesi','Separation workshop'),practice:text('Vize hazırlığı','Midterm preparation'),practiceTitle:text('Önce çöz, sonra denetle.','Solve first, then check.'),practiceIntro:text('18 dakika · 20 puan. Aşağıdaki dört çözümlü örneği çalış; ardından 11 aşamalı soruyla kendini sına.','18 minutes · 20 points. Work through four solved examples, then test yourself with 11 scaffolded questions.'),practiceDisclaimer:text('Sorular özgün çalışma sorularıdır; gerçek sınav tahmini değildir.','Original study questions; these do not predict an actual exam.')},
 studySupport:separationStudy,
 guidedTools:separationClinic,
 questions:[

 {title:text('Çarpanlarına ayır','Factor the equation'),tag:'2.1',text:text('y′=x(1+y²) ayrılabilir mi?','Is y′=x(1+y²) separable?'),choices:text(['Evet','Hayır'],['Yes','No']),answer:0,feedback:text('Evet: dy/(1+y²)=x dx.','Yes: dy/(1+y²)=x dx.'),hints:text(['x ve y çarpanlarını ayır.'],['Separate the x and y factors.'])},
 {title:text('Başlangıç sabiti','Initial constant'),tag:'IVP',text:text('y=C exp(x²/2), y(0)=2 için C kaçtır?','For y=C exp(x²/2), y(0)=2, what is C?'),answer:2,tolerance:.001,unit:'C',feedback:text('C=2.','C=2.'),hints:text(['exp(0)=1.'],['exp(0)=1.'])},
 {title:text('Kaybolan çözüm','Lost solution'),tag:'2.1',text:text('y′=y² denkleminde y²’ye bölmek hangi çözümü kaybettirir?','Which solution is lost when dividing y′=y² by y²?'),choices:['y=0','y=1','y=x'],answer:0,feedback:text('y=0 asıl denklemde 0=0 verir.','y=0 gives 0=0 in the original equation.'),hints:text(['Böldüğün çarpanı sıfır yapan değeri dene.'],['Test the root of the factor divided out.'])},
 ...extraQuestions
 ]
};
