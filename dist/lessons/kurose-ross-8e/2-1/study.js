import {T,v,o,f,sub,fn,plus} from '../../../study/math.js';
import {explain as e, score, prediction, path, worked} from '../chapter-one-study.js';

const F=v('F'), N=v('N'), u=v('u'), us=sub(u,v('s')), d=v('d');
export const cs = sub(v('T'),v('c'))+o('≥')+fn('max',f(N+F,us)+o(',')+f(F,d));
export const p2p = sub(v('T'),v('p'))+o('≥')+fn('max',f(F,us)+o(',')+f(F,d)+o(',')+f(N+F,us+plus+N+u));

const transport = [
 e('Hedefi belirle','Identify the goal','Ses paketi çalma anına yetişmeli.','Audio must meet its playback deadline.'),
 e('Son tarihi tanımla','Define the deadline','60 ms sonra çalınacak bir parçanın 100 ms’de gelmesi geçtir.','A chunk due at 60 ms is late if it arrives at 100 ms.'),
 e('TCP davranışını izle','Trace TCP behavior','Eksik baytlar yeni baytların uygulamaya teslimini bekletebilir.','Missing bytes can delay delivery of newer bytes to the application.'),
 e('UDP sorumluluğunu belirle','Identify the UDP responsibility','Uygulama geç parçayı atar, kaybı maskeler ve gönderim hızını yönetir.','The application drops late chunks, conceals loss, and manages its send rate.'),
 e('Ölçüm seç','Choose a measure','Çalma anına yetişen parçaların oranını ölç. Dosyada ise eksiksizliği denetle.','Measure the share of chunks meeting playback deadlines. For a file, check completeness.')
];
const distribution = [
 e('Kaynak kopyalarını say','Count source copies','10 × 1.000 / 20 = 500 sn.','10 × 1,000 / 20 = 500 s.'),
 e('İlk dosyayı say','Count the first full copy','Kaynak en az 1.000 / 20 = 50 sn boyunca yeni veri sunar.','The source needs at least 1,000 / 20 = 50 s to supply original data.'),
 e('En yavaş alıcıyı ölç','Measure the slowest receiver','1.000 / 10 = 100 sn. Bu sınır iki mimaride de geçerli.','1,000 / 10 = 100 s. This limit applies to both architectures.'),
 e('Toplam yüklemeyi say','Count aggregate upload','20 + 10 × 2 = 40 Mbit/sn. 10.000 / 40 = 250 sn.','20 + 10 × 2 = 40 Mbit/s. 10,000 / 40 = 250 s.'),
 e('Alt sınırları doğrula','Verify the bounds','İstemci–sunucu 500 sn, P2P 250 sn. Eş yüklemesini sıfırla ve eşitliği kontrol et.','Client–server is bounded by 500 s and P2P by 250 s. Set peer upload to zero and check the tie.')
];
export const study = {
 title:T('Uygulamanın ihtiyacından mimariye','From application needs to architecture'),
 intro:T('Tahmin et, modeli çalıştır ve sonucu bir ölçüyle doğrula.','Predict, run the model, and verify your result with a measure.'),
 predictions:[
  prediction('deadline',T('60 ms son tarihli ses parçası 100 ms’de geliyor. En doğrudan sorun hangisi?','An audio chunk due at 60 ms arrives at 100 ms. What failed?'),T(['Zamanlama','Uç adresleme','Yalnız gizlilik'],['Timing','Endpoint addressing','Confidentiality alone']),0,T('Teslim gerçekleşse bile çalma anı kaçtı.','Delivery succeeded but missed playback.')),
  prediction('upload',T('Eşlerin yüklemesi sıfırsa P2P’nin alt sınırı ne olur?','With zero peer upload, what happens to the P2P bound?'),T(['Sıfır olur','İstemci–sunucuyla eşit olur','Alıcı hızından bağımsızlaşır'],['It becomes zero','It equals the client–server bound','It no longer depends on receiver speed']),1,T('Bütün kopyaları kaynak göndermek zorunda kalır.','The source has to send every copy.'))
 ],
 paths:[
  path(T('Geç veri ile kayıp veriyi ayır','Distinguish late from missing data'),T('Canlı ses için TCP ve UDP’yi karşılaştır.','Compare TCP and UDP for live audio.'),transport,T('Dosya için aynı karar neden değişir?','Why might a file need a different choice?')),
  path(T('Sınırı üç parçadan çıkar','Derive the bound from three constraints'),T('Dağıtım labını ilk değerlerle aç.','Open the distribution lab with its initial values.'),distribution,T('En yavaş alıcı 1 Mbit/sn olursa hangi sınır baskın olur?','Which constraint dominates at 1 Mbit/s slowest download?'))
 ]
};
export const clinic={examBlueprint:[{step:T('Önce gereksinim','Start with requirements'),detail:T('Teslim, zamanlama ve kapasiteyi ayrı kontrol et.','Check delivery, timing, and capacity separately.')}],examClinic:[
 worked(5,T('Canlı sesin son tarihi','Playback deadline'),T('Son tarih 60 ms. Yeniden gönderilen parça 100 ms’de ulaşıyor. Eksiksizlik ve oynatma açısından sonucu yaz.','The deadline is 60 ms and a retry arrives at 100 ms. Explain completeness and playback.'),T('Teslim zamanı, çalma zamanı değildir.','Delivery and playback deadlines differ.'),[...transport.slice(1,4),score('Son tarih 2, taşıma etkisi 2, uygulama kararı 1.','Deadline 2, transport effect 2, application decision 1.')]),
 worked(6,T('10 alıcıya dosya dağıtımı','Distribution to ten receivers'),T('1.000 Mbit, kaynak 20, eş 2, en yavaş alıcı 10 Mbit/sn. İki alt sınırı ve baskın terimi bul.','1,000 Mbit, source 20, peer upload 2, slowest download 10 Mbit/s. Find both bounds and their dominant terms.'),T('Toplam hıza kaynağı da kat.','Include the source in aggregate upload.'),[...distribution,score('İstemci–sunucu 2, P2P adayları 3, baskın terim 1.','Client–server 2, P2P candidates 3, dominant term 1.')]),
 worked(5,T('Aynı port, iki bağlantı','One port, two connections'),T('A ve B aynı sunucu portuna TCP ile bağlanıyor. İkisi de yerel port 51000 kullanıyor. TCP bunları nasıl ayırır?','A and B connect to one TCP server port, both with local port 51000. How does TCP distinguish them?'),T('Sunucu portu tek başına bağlantıyı tanımlamaz.','The server port alone does not identify a connection.'),[
 e('Ortak olanı bul','Find what is shared','Sunucu IP ve portu aynı.','The server IP and port match.'),
 e('Farklı olanı bul','Find what differs','A ve B farklı kaynak IP adreslerine sahipse dört bileşenli bağlantı anahtarları farklıdır.','If A and B have different source IPs, their four-part connection keys differ.'),
 e('Sınırı kontrol et','Check the boundary','Aynı kaynak IP kullanılsaydı aynı hedefe eşzamanlı bağlantılar için farklı kaynak portları gerekirdi.','With the same source IP, simultaneous connections to the same destination would need distinct source ports.'),
 score('Ortak çift 1, kaynak farkı 2, sınır 2.','Shared pair 1, source distinction 2, boundary 2.')]),
 worked(6,T('Yanıtın anlamı ve güvenliği','Response meaning and security'),T('Bir istemci sıralı baytlar alıyor fakat hata kodunu bilmiyor ve sunucunun kimliği doğrulanmamış. Hangi iki katman işi eksik?','A client receives ordered bytes but cannot interpret an error code or verify server identity. What two jobs remain?'),T('Sıralı teslim kodun anlamını ve kimliği belirlemez.','Ordered delivery establishes neither code meaning nor identity.'),[
 e('Taşıma hizmetini ayır','Identify the transport service','TCP baytları sıralar. Mesaj sınırını veya alan anlamını tanımlamaz.','TCP orders bytes. It does not define message boundaries or field meanings.'),
 e('Uygulama sözleşmesini kur','Specify the application contract','Yanıt türünü, alan biçimini ve hata koduna tepkiyi protokole yaz.','Specify the response type, syntax, and action on the error code.'),
 e('Kimliği doğrula','Verify identity','Güvenilir TLS doğrulamasıyla beklenen sunucuya bağlandığını ve yoldaki içeriğin korunduğunu kontrol et.','Use trusted TLS authentication to verify the expected server and protect data in transit.'),
 score('Taşıma 2, uygulama 2, güvenlik 2.','Transport 2, application 2, security 2.')])
]};
