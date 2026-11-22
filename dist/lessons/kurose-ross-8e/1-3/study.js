import {T, step, v, n, o, f, sub, fn, eq, plus, minus} from '../../../study/math.js';

const capacity = v('K');
const queue = sub(v('Q'), v('t'));
const prior = sub(v('Q'), v('t') + minus + n(1));
const arrivals = sub(v('A'), v('t'));
const sent = sub(v('S'), v('t'));
const rate = sub(v('R'), v('c'));

export const networkCoreFormulas = {
  service: sent + eq + fn('min', capacity + o(',') + prior + plus + arrivals),
  queue: queue + eq + prior + plus + arrivals + minus + sent,
  division: rate + eq + f(v('R'), capacity),
  tdm: rate + eq + v('b') + v('f')
};

const {service, queue: balance, division, tdm} = networkCoreFormulas;
const times = o('×');
const result = (expression, value) => expression + eq + n(value);

export const networkCoreStudy = {
  title: T('Kuyruk ne zaman büyür, devre ne zaman boş kalır?', 'When does the queue grow, and when does a circuit sit idle?'),
  intro: T('Tahminini seç. Sonra her adımı labdaki bir çerçeveyle eşleştir.', 'Make a prediction, then match each step to a frame in the lab.'),
  predictions: [
    {
      id: 'burst',
      question: T('Dört paketlik hatta üç çerçeve boyunca yedişer paket gelirse üçüncü çerçeve sonunda kaç paket bekler?', 'A link serves four packets per frame. If seven arrive in each of three frames, how many are waiting at the end?'),
      context: T('Kuyruk başlangıçta boş, tampon sınırsız.', 'The queue starts empty and the buffer is unlimited.'),
      choices: T(['3 paket', '9 paket', '21 paket'], ['3 packets', '9 packets', '21 packets']),
      answer: 1,
      reason: T('Her çerçeve üç paket ekler. Bekleyen paketler sonraki çerçeveye devreder.', 'Each frame adds three packets. Waiting packets carry over to the next frame.'),
      math: result(n(3) + times + n(3), 9)
    },
    {
      id: 'reserve',
      question: T('Dört TDM yuvası farklı devrelere ayrılmış. Yalnız bir devrenin verisi varsa bir çerçevede kaç yuva kullanılır?', 'Four TDM slots belong to separate circuits. Only one circuit has data. How many slots are used in a frame?'),
      context: T('Her devreye çerçeve başına bir sabit yuva verilmiş.', 'Each circuit has one fixed slot per frame.'),
      choices: T(['1 yuva', '2 yuva', '4 yuva'], ['1 slot', '2 slots', '4 slots']),
      answer: 0,
      reason: T('Etkin devre kendi yuvasını kullanır. Diğer üç devre sessizken ayrılmış yuvaları boş kalır.', 'The active circuit uses its slot. The three silent circuits leave their reserved slots idle.')
    }
  ],
  paths: [
    {
      title: T('Patlamayı ve kuyruğun boşalmasını hesapla', 'Calculate the burst and the drain'),
      prompt: T('Labda Trafik patlaması ayarını seç.', 'Choose Traffic burst in the lab.'),
      steps: [
        step('İlk çerçeveyi yaz', 'Start with the first frame', service, 'Kuyruk boş, yedi paket hazır. Dördü gönderilir.', 'The queue starts empty. Seven are ready and four are sent.'),
        step('Kalanı bir sonraki çerçeveye taşı', 'Carry the remainder into the next frame', balance, 'İlk çerçeve sonunda yediden dört çıkar ve üç kalır. İkinci çerçevede 3 + 7 paket hazırdır.', 'Seven minus four leaves three. In frame two, 3 + 7 packets are ready.'),
        step('Patlama sonundaki kuyruğu bul', 'Find the queue at the end of the burst', result(n(3) + times + n(3), 9), 'Her patlama çerçevesi üç paket ekler. Üçüncü çerçevenin sonunda dokuz paket bekler.', 'Each burst frame adds three packets. Nine wait at the end of frame three.'),
        step('Gelişler durunca kuyruğu izle', 'Drain the queue after arrivals stop', result(n(9) + minus + n(4) + minus + n(4), 1), 'Dördüncü çerçevede beş, beşincide bir kalır. Altıncı çerçeve son paketi taşır.', 'Five are left after frame four, then one after frame five. The sixth frame serves the last packet.'),
        step('Paket sayısını sağla', 'Check packet conservation', result(n(5) + times + n(4) + plus + n(1), 21), '21 paket geldi ve 21 paket çıktı. Labda altıncı çerçeveyi seçip sıfır kuyruğu kontrol et.', 'Twenty-one arrived and twenty-one departed. Select frame six in the lab and check the empty queue.')
      ],
      reflection: T('Bağlantı kapasitesini yediye çıkarırsan kuyruk hangi adımda ortadan kalkar?', 'If you increase link capacity to seven, at what step does the queue disappear?')
    },
    {
      title: T('Ayrılmış yuvaları ve devre hızını hesapla', 'Calculate reserved slots and circuit rate'),
      prompt: T('Çerçevede dört yuva, yuvada 250 bit ve saniyede 1.000 çerçeve düşün.', 'Take four slots per frame, 250 bits per slot, and 1,000 frames per second.'),
      steps: [
        step('Bir çerçevedeki bitleri say', 'Count bits in one frame', result(n(4) + times + n(250), 1000), 'Hat bir çerçevede 1.000 bit taşır.', 'The link carries 1,000 bits per frame.'),
        step('Hat hızını bul', 'Compute the link rate', result(n(1000) + times + n(1000), 1000000), 'Saniyede 1.000 çerçeve, 1 Mbit/sn verir.', 'A thousand frames per second gives 1 Mbit/s.'),
        step('Tek devrenin hızını bul', 'Compute one circuit’s rate', tdm, 'Devre her çerçevede 250 bit gönderir. 250 × 1.000 = 250 kbit/sn.', 'A circuit sends 250 bits per frame. 250 × 1,000 = 250 kbit/s.'),
        step('Hızı ikinci yoldan doğrula', 'Verify the rate another way', division, '1 Mbit/sn’yi dört devreye böl. Yine 250 kbit/sn elde edilir.', 'Divide 1 Mbit/s among four circuits. The result is again 250 kbit/s.'),
        step('Sessizliğin etkisini ölç', 'Measure the effect of silence', result(n(4) + minus + n(1), 3), 'Tek devre etkinse üç yuva boş kalır. Sakin Trafik ayarından etkin akış sayısını bire çek ve ekranda say.', 'With one active circuit, three slots stay idle. Start with Quiet traffic, set active flows to one, and count the idle slots.')
      ],
      reflection: T('Bir akışın bir anda çok sayıda paketi olursa sabit yuvalar ve ortak kuyruk nasıl davranır?', 'How would fixed slots and a shared queue handle a flow that suddenly has many packets?')
    }
  ]
};

const rubric = (tr, en) => step('Puanlama', 'Scoring', '', tr, en);

export const networkCoreClinic = {
  examBlueprint: [
    {step: T('Kapasiteyi aynı birimde yaz', 'Use consistent units'), detail: T('Bit/sn ile paket/çerçeveyi birbirine karıştırma.', 'Keep bits/s and packets/frame distinct.')},
    {step: T('Gelen ve gideni say', 'Count arrivals and departures'), detail: T('Kuyruğu bir sonraki çerçeveye taşı.', 'Carry the queue into the next frame.')},
    {step: T('Bağlantının rolünü belirle', 'Identify the relationship'), detail: T('Transit ve peering için hangi hedeflerin kapsandığını sor.', 'Ask which destinations transit or peering covers.')}
  ],
  examClinic: [
    {
      badge: T('Store-and-forward · 5 puan', 'Store and forward · 5 points'),
      title: T('Son bit hangi anda çıkar?', 'When does the last bit leave?'),
      statement: T('1.500 baytlık bir paket, aradaki yönlendirici üzerinden 6 Mbit/sn ve 3 Mbit/sn hızlarında iki bağlantı geçiyor. Yayılma, işleme ve kuyruk gecikmelerini sıfır al. İkinci hat ne zaman başlar, alıcı son biti ne zaman alır?', 'A 1,500-byte packet crosses two links at 6 Mbit/s and 3 Mbit/s through one router. Ignore propagation, processing, and queuing. When does transmission on link two start, and when does the receiver get the final bit?'),
      trap: T('İkinci hat başlayabilmek için ilk hattın son bitini bekler.', 'The second link starts after the last bit arrives from the first.'),
      steps: [
        step('Paketi bite çevir', 'Convert to bits', result(n(1500) + times + n(8), 12000), 'Her bayt sekiz bit taşır.', 'Each byte contains eight bits.'),
        step('İki iletim süresini bul', 'Compute both transmission times', '', '12.000 / 6.000.000 = 2 ms, 12.000 / 3.000.000 = 4 ms. İkinci iletim 2 ms’de başlar.', '12,000 / 6,000,000 = 2 ms and 12,000 / 3,000,000 = 4 ms. The second transmission begins at 2 ms.'),
        step('Zaman çizelgesini doğrula', 'Verify the timeline', result(n(2) + plus + n(4), 6), 'İlk hat 0–2 ms, ikinci hat 2–6 ms aralığında paketi taşır. Son bit 6 ms’de varır.', 'Link one sends from 0 to 2 ms and link two sends from 2 to 6 ms. The last bit arrives at 6 ms.'),
        rubric('Bite dönüşüm 1, iki iletim süresi 2, ikinci hattın başlangıcı 1, son bitin varışı 1.', 'Bit conversion 1, both transmission times 2, link two start 1, final arrival 1.')
      ]
    },
    {
      badge: T('Kuyruk ve tampon · 6 puan', 'Queue and buffer · 6 points'),
      title: T('Tampon yalnız beş paket alırsa', 'When the buffer holds just five packets'),
      statement: T('Boş bir çıkışa ilk iki çerçevede altışar paket geliyor. Çerçeve başında en çok üç paket o çerçevenin iletimine ayrılıyor, ardından en çok beş bekleyen paket tutuluyor. Üçüncü çerçeveden itibaren yeni paket gelmiyor. Kayıp ve boşalma zamanını bul.', 'Six packets arrive in each of the first two frames at an empty output. At each frame start, up to three packets are selected for transmission. Then up to five waiting packets are retained. No new packets arrive from frame three onward. Find the loss and drain time.'),
      trap: T('Beş paket sınırı, iletime seçilen üç paketin dışındaki bekleyenler içindir.', 'The five-packet limit applies to packets waiting after service selection.'),
      steps: [
        step('İlk çerçeve', 'First frame', result(n(6) + minus + n(3), 3), 'Üç paket gönderilir, üçü bekler. Kayıp yok.', 'Three are sent and three wait. There is no loss.'),
        step('İkinci çerçeve', 'Second frame', result(n(3) + plus + n(6) + minus + n(3) + minus + n(5), 1), 'Dokuz hazır paketten üçü gönderilir, beşi bekler, biri düşer.', 'Of nine ready packets, three are sent, five wait, and one is dropped.'),
        step('Boşalma ve sağlama', 'Drain and verify', result(n(3) + plus + n(3) + plus + n(3) + plus + n(2) + plus + n(1), 12), 'Üçüncü çerçevede üç, dördüncüde iki paket gönderilir. 11 gönderilen ve 1 kayıp, 12 gelişi açıklar.', 'Frame three sends three and frame four sends two. Eleven departures and one loss account for all twelve arrivals.'),
        rubric('İlk kuyruk 1, ikinci çerçeve hesabı 2, kayıp 1, boşalma ve sağlama 2.', 'First queue 1, second-frame calculation 2, loss 1, drain and conservation check 2.')
      ]
    },
    {
      badge: T('Devre hesabı · 6 puan', 'Circuit calculation · 6 points'),
      title: T('Ses devresi ne kadar kapasite ayırır?', 'How much capacity does a voice circuit reserve?'),
      statement: T('TDM hattı saniyede 4.000 çerçeve taşıyor. Her çerçeve, her biri 20 bitlik sekiz eş yuvadan oluşuyor. Bir devrenin hızını, hat hızını ve üç devre kendi yuvalarını doldururken hat kapasitesinin kullanım oranını bul.', 'A TDM link carries 4,000 frames per second. Each frame has eight equal 20-bit slots. Find one circuit’s rate, total link rate, and the fraction of link capacity used when three circuits fill their slots.'),
      trap: T('Bir devreye her çerçevede tek yuva düşer.', 'One circuit gets one slot per frame.'),
      steps: [
        step('Devre hızını bul', 'Find the circuit rate', result(n(20) + times + n(4000), 80000), 'Her devre 80 kbit/sn ayırır.', 'Each circuit reserves 80 kbit/s.'),
        step('Hat hızını doğrula', 'Verify link rate', result(n(8) + times + n(80000), 640000), 'Hat 640 kbit/sn taşır. Aynı sonuç 160 bit/çerçeve × 4.000 çerçeve/sn ile de bulunur.', 'The link carries 640 kbit/s. Multiplying 160 bits/frame by 4,000 frames/s gives the same result.'),
        step('Kullanım oranını bul', 'Find utilization', f(n(3), n(8)) + eq + n('0.375'), 'Her etkin devre yuvasını dolduruyorsa kapasitenin %37,5’i kullanılır. Beş yuva boştur.', 'If active circuits fill their slots, 37.5% of capacity is used. Five slots sit idle.'),
        rubric('Devre hızı 2, toplam hız ve doğrulama 2, kullanım oranı ve yorum 2.', 'Circuit rate 2, total rate and check 2, utilization and interpretation 2.')
      ]
    },
    {
      badge: T('Ağların ağı · 5 puan', 'Network of networks · 5 points'),
      title: T('Yerel bağlantı hangi trafiği taşır?', 'Which traffic uses the local connection?'),
      statement: T('Kampüs ISP’si A, bir IXP’de barındırma ağı B ile peering yapıyor. B yalnız kendi adresleri için rota duyuruyor. A, diğer hedeflere erişimi transit sağlayıcı C’den alıyor. B’deki bir sunucu ile D adlı bağımsız bir ağ için A’nın kullanabileceği çıkışları belirle. A–B bağlantısı kesilirse B’nin erişilebilir kalması neye bağlı?', 'Campus ISP A peers at an IXP with hosting network B. B advertises routes only for its own addresses. A buys transit to other destinations from provider C. Identify A’s possible exits for a server in B and an independent network D. If the A–B link fails, what determines whether B remains reachable?'),
      trap: T('Peering üzerinden yalnızca duyurulan rotalar kullanılabilir.', 'Only advertised routes can be used via the peering link.'),
      steps: [
        step('B sunucusunu izle', 'Trace the server in B', '', 'Peering rotası seçilirse A, IXP üzerinden doğrudan B’ye iletir.', 'If the peering route is selected, A forwards directly to B over the exchange.'),
        step('D için farklı bir çıkış seç', 'Choose another exit for D', '', 'D, B’nin duyurusu kapsamında değil. A, C tarafından sağlanan transit rotayı kullanır.', 'D is outside B’s advertisements. A uses a transit route supplied by C.'),
        step('Kesintiden sonraki rotayı doğrula', 'Check the route after the failure', '', 'A ancak C veya başka bir bağlantı üzerinden B’ye geçerli rota öğrenirse erişimi sürdürür. B rotasının A’ya ulaştığını kontrol et.', 'A keeps reachability only if it learns a valid route to B via C or another connection. Check that A receives a usable route to B.'),
        rubric('B çıkışı 1, D çıkışı 1, iki seçimin gerekçesi 1, alternatif rota koşulu 2.', 'B exit 1, D exit 1, reasoning for both choices 1, backup route condition 2.')
      ]
    }
  ]
};
