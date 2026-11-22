import {T, step, v, n, f, eq, minus} from '../../../study/math.js';
import {explain, score, prediction, path, worked} from '../chapter-one-study.js';

const available = n(100) + minus + n(60) + eq + n(40);
const portion = f(n(40), n(80)) + eq + n('0.50');
export const defenseFraction = v('A') + eq + f(v('S'), v('N'));

export const study = {
  title: T('Kanıttan doğru savunmaya', 'From evidence to an appropriate defense'),
  intro: T('Olayın hangi güvenlik hedefini etkilediğini seç ve labda ilk hipotezini sına.', 'Choose the affected security objective and test your first hypothesis in the lab.'),
  predictions: [
    prediction('readable', T('Mesaj yolda okunabiliyor ve alıcıya eksiksiz ulaşıyor. Öncelikle hangi hedef bozuldu?', 'A message can be read en route and arrives intact. Which objective failed?'),
      T(['Gizlilik', 'Kullanılabilirlik', 'Yalnız bütünlük'], ['Confidentiality', 'Availability', 'Integrity alone']), 0,
      T('Yetkisiz bir gözlemci içeriği okuyabiliyor. Mesajın eksiksiz ulaşması gizlilik sağlamaz.', 'An unauthorized observer can read the content. Delivery without modification does not provide confidentiality.')),
    prediction('capacity', T('100 iş biriminin 60’ı meşgul ve 80 yeni meşru istek var. Ortak havuz bu pencerede kaçını karşılar?', 'Sixty of 100 work units are busy and 80 new legitimate units are requested. How many can the shared pool serve this window?'),
      T(['80', '40', '60'], ['80', '40', '60']), 1,
      T('Önce meşgul 60 birimi toplam kapasiteden çıkar. Geriye 40 kalır.', 'Subtract the 60 busy units from total capacity, leaving 40.'))
  ],
  paths: [
    path(T('Gizliliği ve kimliği ayrı doğrula', 'Check confidentiality and identity separately'),
      T('İçeriğin okunabildiği sentetik olayı seç.', 'Select the synthetic incident with readable content.'),
      [
        explain('Kanıtı yaz', 'Write down the evidence', 'Denetim kaydı içeriğin açık metin olarak okunabildiğini gösteriyor.', 'The audit shows the content is readable in transit.'),
        explain('İhlal edilen hedefi seç', 'Identify the affected objective', 'Gizlilik, içeriğe yetkisiz erişimi önlemeyi amaçlar.', 'Confidentiality protects content from unauthorized access.'),
        explain('Kanalı değiştir', 'Change the channel', 'Kimliği doğrulanmış şifreleme, ağ yolundaki içeriği korur.', 'Authenticated encryption protects content in transit.'),
        explain('Güveni gözden geçir', 'Check the trust assumption', 'Doğru uçla konuştuğunu doğrula. Paylaşılan bir anahtarın yetkisiz birinin eline geçmesi korumayı zayıflatır.', 'Verify that you are talking to the expected endpoint. A leaked key weakens the protection.'),
        explain('Farkı labda doğrula', 'Verify the distinction in the lab', 'Kapasite rezervasyonu içerik gözlemini çözmez. Labda iki seçimi değiştir.', 'A capacity reservation does not protect readable content. Compare the two choices in the lab.')
      ], T('Uç cihaz ele geçirilirse taşıma yolunun şifreli olması hangi riski kapsar?', 'If the endpoint is compromised, which risk does encryption in transit still address?')),
    path(T('Kapasiteyi say, meşru hizmeti ölç', 'Count capacity and measure legitimate service'),
      T('Labda hizmet kapasitesi dolu olayını seç.', 'Select the incident with exhausted service capacity.'),
      [
        explain('Ölçü birimini belirle', 'Define the unit', 'Bir pencere içinde tamamlanabilen iş birimlerini sayıyoruz.', 'Count how many units of work can complete within one window.'),
        step('Boş kapasiteyi hesapla', 'Calculate free capacity', available, 'Yeni işlere 40 birim kalıyor.', 'Forty units remain for new work.'),
        step('Talebe göre oranla', 'Compare with demand', portion, '80 talebin yarısı tamamlanır.', 'Half of the 80 requested units complete.'),
        explain('Rezervasyonu uygula', 'Apply a reservation', 'Modelde 80 birim meşru işe ayrılır. Bu seçim toplam kapasiteyi büyütmez.', 'The model reserves 80 units for legitimate work. Total capacity is unchanged.'),
        explain('Sonucu karşılaştır', 'Compare the result', 'Rezervasyonla 80/80, ortak havuzda 40/80. Gözlediğin fark bir güvenlik hedefinin ölçümüdür.', 'With reservation the lab shows 80/80, versus 40/80 in the shared pool. Both readings measure availability.')
      ], T('Meşru talep rezervasyonu aşarsa neyi yeniden ölçersin?', 'What would you measure again if legitimate demand exceeded the reservation?'))
  ]
};

export const clinic = {
  examBlueprint: [
    {step:T('Belirtiyi yaz', 'State the evidence'), detail:T('Okunabilir içerik, doğrulama hatası ve gecikme farklı işaretlerdir.', 'Readable content, failed verification, and delays are different signals.')},
    {step:T('Sonucu ölç', 'Measure the outcome'), detail:T('Düzeltmeden önce ve sonra aynı birimde karşılaştır.', 'Compare the same measure before and after the change.')}
  ],
  examClinic: [
    worked(5, T('İçerik okunuyor, veri değişmiyor', 'Readable content arrives unchanged'),
      T('Log, uygulama mesajının ağ yolunda açık metin olduğunu gösteriyor. Alıcı mesajı eksiksiz aldı. Hedefi, savunmayı ve sınırını yaz.',
        'The audit shows plaintext application content in transit. The recipient received it intact. Identify the objective, a defense, and its limit.'),
      T('Başarılı teslim, gizlilik garantisi değildir.', 'Successful delivery does not guarantee confidentiality.'),
      [
        explain('Hedef', 'Objective', 'İhlal edilen hedef gizlilik.', 'Confidentiality is the affected objective.'),
        explain('Savunma', 'Defense', 'Gönderen ile beklenen alıcı arasında kimliği doğrulanmış şifreli kanal kullan.', 'Use an authenticated encrypted channel between the sender and expected recipient.'),
        explain('Doğrulama', 'Verification', 'Yetkili testte ağ yolundaki içerik okunamaz görünür. Uç cihazdaki yetkili kullanıcı içeriği okuyabilir.', 'In an authorized check, the content is unreadable in transit. The authorized user at the endpoint can still read it.'),
        score('Hedef 1, savunma 2, doğrulama ve sınır 2.', 'Objective 1, defense 2, verification and limit 2.')
      ]),
    worked(5, T('Adres tanıdık, kimlik belirsiz', 'Familiar address, uncertain identity'),
      T('Bir mesaj, tanıdık kaynak adresiyle geliyor. Uygulamadaki gönderici doğrulaması başarısız. Hassas bir işlem öncesi ne yaparsın?',
        'A message has a familiar source address but fails sender verification in the application. What do you do before a sensitive action?'),
      T('Kaynak adresi doğrulanmış kimliğin yerine geçmez.', 'A source address is insufficient proof of identity.'),
      [
        explain('Kanıtı sırala', 'Weigh the evidence', 'Ağ başlığında adres var. Uygulamanın beklediği kimlik kanıtı geçerli değil.', 'The network header has an address. The expected application identity proof failed.'),
        explain('Karar ver', 'Decide', 'Hassas işlemi durdur. Kimliği ve veriyi bağımsız, güvenilir yöntemle doğrula.', 'Hold the sensitive action. Verify identity and data through a separate trusted method.'),
        explain('Yeniden kontrol et', 'Recheck', 'Beklenen uç kimliği ve veri bütünlüğü birlikte doğrulanınca işlem değerlendirilebilir.', 'Consider proceeding once the expected identity and message integrity are verified.'),
        score('Kanıt 2, eylem 2, yeniden kontrol 1.', 'Evidence 2, action 2, recheck 1.')
      ]),
    worked(6, T('Meşru iş ne kadar tamamlandı?', 'How much legitimate work finished?'),
      T('100 birimden 60’ı meşgul, meşru talep 80. Ortak havuz ve 80 birimlik rezervasyon için tamamlanan payı hesapla.', 'Sixty of 100 units are busy and legitimate demand is 80. Compute completion shares for the shared pool and an 80-unit reservation.'),
      T('Paydanın meşru talep olduğuna dikkat et.', 'Use legitimate demand in the denominator.'),
      [
        step('Boş kısmı hesapla', 'Compute available capacity', available, 'Ortak havuzda yeni 40 iş tamamlanır.', 'The shared pool completes 40 new jobs.'),
        step('İki oranı bul', 'Find both shares', portion, '40/80 = %50. Rezervasyonda 80/80 = %100.', '40/80 is 50%. A reservation gives 80/80, or 100%.'),
        explain('Bütçeyi doğrula', 'Check the budget', '80 birim ayrılınca diğer işler için en fazla 20 kalır. Toplam hâlâ 100.', 'After reserving 80, at most 20 remain for other work. Total capacity is still 100.'),
        score('Boş kısım 2, iki oran 2, bütçe 2.', 'Available capacity 2, both shares 2, budget check 2.')
      ]),
    worked(6, T('Ele geçirilen cihazı kurtar', 'Recover a compromised device'),
      T('Bir uç cihazda zararlı davranış doğrulandı. Güvenilir bir yedek var. İlk adımı, kurtarmayı ve yeniden bağlamadan önceki kontrolü açıkla.',
        'Malicious behavior is confirmed on an endpoint. A trusted backup is available. Describe the first action, recovery, and the check before reconnecting.'),
      T('Kanal şifreleme uç cihazın durumunu onarmaz.', 'Channel encryption leaves the endpoint state untouched.'),
      [
        explain('Sınırla', 'Contain', 'Cihazı ayır. Olay kayıtlarını koru ve diğer cihazları kontrol et.', 'Isolate the device. Preserve incident evidence and check other devices.'),
        explain('Güvenilir durumdan dön', 'Recover from a trusted state', 'Doğrulanmış yedekten ya da temiz kurulumdan dön. Yamaları ve yetkileri gözden geçir.', 'Restore a verified backup or clean installation. Review patches and privileges.'),
        explain('Denetle', 'Verify', 'Beklenen davranışın döndüğünü, etkilenen erişim bilgilerinin yenilendiğini ve izleme çalıştığını doğrula.', 'Confirm normal behavior, replacement of affected credentials, and working monitoring.'),
        score('Sınırlama 2, kurtarma 2, denetim 2.', 'Containment 2, recovery 2, verification 2.')
      ])
  ]
};
