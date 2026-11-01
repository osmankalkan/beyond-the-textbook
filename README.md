# Beyond the Textbook · Denklem Atölyesi

Beyond the Textbook projesini başlattık: kitapları Türkçe ders notları, etkileşimli deneyler, alıştırmalar ve kişisel notlarla çalışılabilen bir öğrenme alanına dönüştürüyoruz. Öğrenme akışı: **oku → tahmin et → dene → çöz → kendi cümlelerinle açıkla**.

İlk prototip olan **Denklem Atölyesi**, Wei-Chau Xie'nin *Differential Equations for Engineers* kitabının §3.1 (basılı s.87–90 / PDF s.105–108) temelinde hazırlanmıştır. Zamanla başka bölümler ve farklı kitaplar ekleyeceğiz. Şu anda yalnızca §3.1 geliştirilmiş ders olarak hazırdır; çok kitaplı kitaplık henüz uygulanmamıştır.

Bu klasör, projenin güncel çalışma klasörüdür. Devam etmeden önce [proje durumu ve devam notlarına](docs/PROJE-DURUMU.md) bakabilirsiniz. [Önizleme](docs/onizleme.jpg) ilk prototipin yerel QA görünümüdür.

## Çalıştırma

Node.js ile, bu klasörde:

```sh
npm start
```

Tarayıcı: http://127.0.0.1:4317

Yerelde çalıştırırken **ChatGPT ile giriş veya başka bir hesap gerekmez**. Node.js kurulu olmalıdır; bağımlılıklar yerel olarak dahil edildiğinden `npm install` gerekmez.

Alternatif olarak `dist` klasörünü herhangi bir statik HTTP sunucusuyla sunabilirsiniz. `file://` üzerinden açmak yerine HTTP kullanın; ders Markdown dosyası `fetch` ile okunur. Üretimde yalnızca `dist` sunulur.

## İçerik ve işlevler

- `dist/lesson.md`: kaynak sayfalarla karşılaştırılmış, LaTeX formülleri içeren Türkçe çalışma notu. Kitabın birebir çevirisi değildir.
- Ders görünümü bu Markdown dosyasından yüklenir. Formüller `math.json` içindeki erişilebilir, yerel MathML karşılıklarıyla görüntülenir. İnternet veya CDN gerekmez. Yeni bir formül eklerken `build_math.py` eşlemesini güncelleyin.
- Soğuma: analitik çözüm, ileri Euler, başlangıç ve ortam sıcaklığı, k, adım büyüklüğü, zaman imleci, CSV ve SVG dışa aktarma.
- Bina: analitik geçici + kalıcı çözüm, dış sıcaklık, geri besleme ve ısıl kapasite etkisi, faz ve genlik hesabı.
- Dört alıştırma: sayısal / çoktan seçmeli cevaplar ve aşamalı ipuçları. Bunlar uygulama için yazılmıştır; kitaptaki alıştırmaların aktarımı değildir.
- Notlar, alıştırma durumu ve ders tamamlama işareti yalnızca o tarayıcının `localStorage` alanında kalır. Tarayıcı verilerini silmek bunları siler. Not dışa aktarma düğmesiyle yedekleyin. Bulut eşitlemesi, hesap yönetimi veya LLM yoktur.
- Kitap haritası tüm ana bölümleri gösterir; §3.1 dışındaki bölümlerde yalnızca içerik haritası vardır.

## Doğrulama

```sh
npm test
```

Testler kitaptaki 3.1 ve 3.2 örneklerinin sonuçlarını, denge ve erişilemeyen hedef durumlarını, Euler yakınsamasını ve bina çözümünün bağımsız RK4 integrasyonu ile uyumunu denetler.

## Sonraki adım: LLM

Bir sunucu uç noktası ve sunucu ortamında saklanan API anahtarı gerekir. Tarayıcı koduna anahtar eklemeyin. İlk bağlam, denetlenmiş `lesson.md` ve seçili deney parametreleri olmalıdır. Yanıtların dayandığı bölüm/sayfa gösterilmeli; matematiksel doğruluk LLM yanıtına bırakılmamalıdır. Bu sürümde çalışan bir sohbet varmış gibi gösterilmez.

## Tam kitap çıkarımı

`private/book/` klasöründeki `differential-equations-for-engineers-ham.md` ayrı bir otomatik metin çıkarımıdır. Şekiller dahil değildir; formüller ve okuma sırası doğrulanmamıştır. Kullanıcının PDF'sinin yerel kopyası da aynı klasördedir. Bu klasör Git dışında tutulur; uygulamaya ve yayımlanan dosyalara eklenmez.

## Yayın ve GitHub

[Mevcut özel uygulama](https://denklem-atolyesi-xie-20261101.readyrice1025.chatgpt.site), yayın servisindeki özel erişim ayarı nedeniyle ChatGPT ile giriş ister. Bu, uygulamanın bir bağımlılığı değildir; `dist/` uygun bir statik sunucuda girişsiz çalışır. Mevcut özel erişim ayarı değiştirilmedi.

[GitHub deposu](https://github.com/osmankalkan/beyond-the-textbook), projenin kaynak kodunu ve geliştirme belgelerini barındırır. İlk aktarım, mevcut iki prototip commit'i korunarak üç ayrı başlangıç commit'iyle hazırlanmıştır: Git kapsamı, prototip ve geliştirme belgeleri, proje hedefi ve başlangıç rehberi.

Geliştirmeyi küçük adımlarla sürdüreceğiz. Sonraki değişiklikler, commit veya push açıkça istenmedikçe yerelde kalır. GitHub'a kaynak kodu aktarmak uygulamayı otomatik olarak yayımlamaz.

`.gitignore`, `private/`, `artifacts/`, `.env` dosyaları ve yerel önbellekleri kapsam dışı bırakır. `artifacts/ilk-prototip-kaynak.zip`, ilk prototipin kaynak anlık görüntüsüdür; güncel çalışma dosyaları bu klasörün kökünde ve `dist/` altında bulunur.

## Bağımlılıklar

Uygulama derlemesizdir. `dist/vendor/marked.js` (MIT, v17.0.5) yerel Markdown görüntüleyicisidir; lisansı aynı klasördedir. `build_math.py`, sadece formül eşlemesini yeniden üretmek için standart Python kullanır. Normal çalıştırmada Python gerekmez.
