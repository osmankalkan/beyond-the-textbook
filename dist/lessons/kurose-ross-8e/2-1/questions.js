import {T} from '../../../study/math.js';
import {choice, numeric} from '../chapter-one-study.js';

const concept = T('Tasarım','Design');
const time = T('Dağıtım','Distribution');
const seconds = T('sn','s');

export const questions = [
 choice(concept,T('Merkezi dizin','Central directory'),T('Dizin merkezi, dosyayı alıcılar birbirinden indiriyor. Veri dağıtımı hangi mimaride?','Discovery is central, but recipients download pieces from one another. What is the data distribution architecture?'),
 T(['P2P','Yalnız istemci–sunucu','Devre anahtarlama'],['P2P','Pure client–server','Circuit switching']),0,
 T(['Keşfi dağıtımdan ayır.','Dosyayı hangi süreçlerin sunduğunu izle.'],['Separate discovery from distribution.','Trace who serves the file data.']),
 T('Dosyayı eşler de sunuyor. Merkezi keşif, veri yolunun P2P olmasını engellemez.','Peers serve file data. Central discovery is compatible with a P2P data path.')),
 choice(concept,T('Aynı portta iki istemci','Two clients on one port'),T('Aynı sunucu portuna farklı IP’lerden TCP bağlantısı geliyor. Hangi bilgi bağlantıları ayırır?','TCP connections reach one server port from different IPs. What distinguishes them?'),
 T(['Yalnız hedef port','Kaynak ve hedef IP/port çiftleri','Ethernet FCS'],['Destination port alone','Source and destination IP/port pairs','Ethernet FCS']),1,
 T(['Paylaşılan alanı bul.','Kaynağın hangi bileşeni farklı?'],['Find the shared field.','Which source component differs?']),
 T('TCP bağlantı anahtarında kaynak IP farklıdır. Hedef port aynı kalabilir.','The source IP differs in the TCP connection key. The destination port can stay the same.')),
 choice(concept,T('İki yazma, bir okuma','Two writes, one read'),T('Uygulama TCP’ye iki mesaj yazıyor, alıcı tek okumada ikisinin baytlarını alıyor. Ne eksik?','An app writes two messages to TCP, and the receiver reads their bytes together. What is missing?'),
 T(['Bağlantı kapasitesi','IP adresi','Uygulama mesaj çerçeveleme kuralı'],['Link capacity','IP address','Application message framing rule']),2,
 T(['TCP akışı düşün.','Ayırıcı veya uzunluk alanı neyi çözer?'],['Think of the TCP stream.','What does a delimiter or length field solve?']),
 T('TCP sıralı bayt akışı sunar. Mesaj sınırını uygulama örneğin uzunluk alanıyla belirtir.','TCP supplies an ordered stream. The application can specify boundaries with a length field.')),
 choice(concept,T('Geç gelen güncelleme','Late update'),T('Yeni konum geldiğinde önceki konumun geç gelen tekrarını uygulama nasıl ele almalı?','After receiving a new position, how should the application handle a late copy of the older position?'),
 T(['Sıra bilgisiyle eskiyi ayır','Her zaman eskisine dön','Hedef portu değiştir'],['Identify the older update using sequence information','Always revert to the older position','Change the destination port']),0,
 T(['Hedef güncel konum.','Hangi alan güncelliği gösterir?'],['The goal is the current position.','Which field identifies freshness?']),
 T('Sıra bilgisi, geç gelen eski konumu ayırmayı sağlar.','Sequence information lets the application identify the stale position.')),
 choice(concept,T('Eksiksiz UDP dosyası','Complete file over UDP'),T('UDP ile eksiksiz bir dosya teslimi isteniyor. Hangi ek iş gerekir?','A complete file must arrive over UDP. What is needed?'),
 T(['Yalnız port seçmek','Eksikleri saptamak ve telafi etmek','Yalnız zaman etiketlemek'],['Only choosing a port','Detecting and recovering missing data','Only adding timestamps']),1,
 T(['UDP teslim garantisi vermez.','Alıcı eksik parçayı nasıl anlar?'],['UDP does not guarantee delivery.','How does the receiver detect a missing piece?']),
 T('Uygulama eksikleri ve tekrarları belirleyip eksik parçaları geri kazanmalıdır.','The application must detect gaps and duplicates and recover missing pieces.')),
 choice(concept,T('Garantinin kapsamı','Scope of a guarantee'),T('Canlı uygulama 40 ms üst sınır istiyor. Ham TCP veya UDP ne vaat eder?','A live application needs latency capped at 40 ms. What do bare TCP or UDP promise?'),
 T(['Yalnız TCP sınırı garanti eder','Yalnız UDP sınırı garanti eder','İkisi de bu sınırı garanti etmez'],['Only TCP guarantees the cap','Only UDP guarantees the cap','Neither guarantees the cap']),2,
 T(['Sıra garantisini gecikmeden ayır.','UDP de ağdaki kuyruğu kontrol etmez.'],['Separate ordering from delay.','UDP cannot control network queues either.']),
 T('TCP güvenilir teslim sunar. UDP ek teslim mekanizmaları sağlamaz. İkisi de 40 ms gecikme garantisi vermez.','TCP supplies reliable delivery. UDP adds no delivery machinery. Neither guarantees a 40 ms deadline.')),
 choice(concept,T('Kodun anlamı','Meaning of a code'),T('Alıcı bir hata alanının değerini okudu. Değerin ne anlama geldiğini hangi sözleşme belirler?','A receiver reads an error field. What contract defines its meaning?'),
 T(['Uygulama protokolünün anlambilimi','TCP pencere yönetimi','IP yönlendirme'],['Application protocol semantics','TCP window management','IP routing']),0,
 T(['Biçim ve anlamı ayır.','Veri doğru sırayla zaten geldi.'],['Separate syntax and meaning.','The data has already arrived in order.']),
 T('Anlam ve hata sonrası davranış uygulama protokolüne aittir.','Meaning and behavior after the error belong to the application protocol.')),
 choice(concept,T('Sıralı ama doğrulanmamış','Ordered but unauthenticated'),T('TCP baytları sırayla geliyor. Beklenen sunucuya bağlandığını ve içeriğin korunduğunu doğrulamak için ne gerekir?','TCP delivers bytes in order. What verifies the expected server and protects the content?'),
 T(['Daha büyük TCP penceresi','Kimlik doğrulaması güvenilir TLS','Daha küçük port'],['A larger TCP window','TLS with trusted authentication','A lower port number']),1,
 T(['Teslim ile kimliği ayır.','Şifreli kanalın karşı ucunu doğrula.'],['Separate delivery from identity.','Authenticate the other end of the encrypted channel.']),
 T('Güvenilir TLS doğrulaması kimliği ve kanal korumasını sağlar. TCP tek başına bunları sağlamaz.','Trusted TLS authentication supplies identity checks and channel protection. TCP alone supplies neither.')),
 numeric(time,T('Kaynağın kopyaları','Source copies'),T('500 Mbit, 8 alıcı, kaynak 20 Mbit/sn, en yavaş indirme 10 Mbit/sn. İstemci–sunucu alt sınırı kaç saniye?','500 Mbit, eight recipients, source 20 Mbit/s, slowest download 10 Mbit/s. Client–server bound in seconds?'),seconds,200,
 T(['Tüm kopyaların yükleme süresini bul.','En yavaş indirme süresiyle karşılaştır.'],['Compute upload time for all copies.','Compare against the slowest download.']),
 T('8 × 500 / 20 = 200, alıcı sınırı 50. Büyük olan 200 sn.','8 × 500 / 20 = 200 and the receiver bound is 50. The larger is 200 s.')),
 numeric(time,T('Toplam kapasite','Aggregate capacity'),T('500 Mbit, 8 eş, kaynak 20, eş yüklemesi 2,5 ve en yavaş indirme 10 Mbit/sn. P2P alt sınırı kaç saniye?','500 Mbit, eight peers, source 20, peer upload 2.5, and slowest download 10 Mbit/s. P2P bound in seconds?'),seconds,100,
 T(['Kaynak ve eş hızlarını topla.','Üç adayın en büyüğünü seç.'],['Add source and peer upload rates.','Choose the largest of the three candidates.']),
 T('İlk kopya 25, alıcı 50, toplam yükleme 4.000 / 40 = 100 sn.','First copy takes 25 s, receiver takes 50 s, and aggregate upload takes 4,000 / 40 = 100 s.')),
 numeric(time,T('En yavaş alıcı baskın','The slowest receiver dominates'),T('1.000 Mbit, 10 alıcı, kaynak 20, eş 8 ve en yavaş indirme 2 Mbit/sn. P2P alt sınırı kaç saniye?','1,000 Mbit, ten receivers, source 20, peers 8 each, slowest download 2 Mbit/s. P2P bound in seconds?'),seconds,500,
 T(['İndirme süresini ayrı hesapla.','Toplam yüklemede 20 + 10 × 8 kullan.'],['Compute download time separately.','Use 20 + 10 × 8 for aggregate upload.']),
 T('Adaylar 50, 500 ve 100 sn. İndirme sınırı 500 sn.','Candidates are 50, 500, and 100 s. The download bound of 500 s dominates.')),
 choice(time,T('Alt sınır ve ölçüm','Bound and measurement'),T('P2P alt sınırı 250 sn, ölçüm 310 sn. Bu tek başına hangi sonucu destekler?','P2P lower bound is 250 s and measured completion is 310 s. What follows from this alone?'),
 T(['Model ihlal edildi','Ölçüm alt sınırla uyumlu','Gerçek süre tam 250 sn olmalı'],['The model was violated','The measurement is consistent with the bound','Actual time must be exactly 250 s']),1,
 T(['Alt sınırın neyi dışladığını düşün.','Ek yük ve parça bulunabilirliğini hesaba kat.'],['Ask what a lower bound rules out.','Consider overhead and piece availability.']),
 T('310 sn, 250 sn alt sınırının üzerindedir. Gerçek zaman ek yük ve zamanlamadan etkilenebilir.','310 s exceeds the 250 s bound. Overhead and scheduling can affect actual completion.'))
];
