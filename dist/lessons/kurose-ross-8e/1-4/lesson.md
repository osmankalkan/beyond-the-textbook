# §1.4 İletim Gecikmesi, Yayılma Gecikmesi ve Store-and-Forward Paket Anahtarlama

İnternet üzerindeki bir istemciden sunucuya bir mesaj gönderdiğimizde, verinin hedefe "anında" ve "tek parça" ulaştığını hissederiz. Gerçekte ise uygulama katmanı mesajı **paket** (*packet*) adı verilen daha küçük veri bloklarına bölünür ve her paket, kaynak ile hedef arasındaki **iletişim bağlantıları** (*communication links*) ile **paket anahtarlarından** (*packet switches* — yönlendiriciler ve katman-2 anahtarlar) geçerek ilerler.

Kurose ve Ross’un *Computer Networking: A Top-Down Approach* (8. Baskı) kitabının **§1.3.1 (Packet Switching, s.23–26)** ve **§1.4 (Delay, Loss, and Throughput in Packet-Switched Networks, s.35–46)** bölümlerini birleştiren bu derste şu beş temel soruyu yanıtlayacağız:

1. **İletim gecikmesi (\(d_{\mathrm{trans}} = L/R\))** ile **yayılma gecikmesi (\(d_{\mathrm{prop}} = d/v\))** arasındaki fiziksel fark nedir ve bant genişliğini (\(R\)) artırmak bir bitin kablodaki yürüyüş hızını neden değiştirmez?
2. Bir yönlendiricinin **store-and-forward (depola ve ilet)** çalışması ne demektir ve uçtan uca gecikmeyi nasıl etkiler?
3. Birden çok paket arka arkaya gönderildiğinde **boru hattı etkisi (pipelining)** ve **mesaj bölütleme (message segmentation)** toplam aktarım süresini nasıl kısaltır?
4. **Bant Genişliği–Gecikme Çarpımı (\(\mathrm{BDP} = R \cdot d_{\mathrm{prop}}\))** ve bir bitin kablodaki metre cinsinden fiziksel uzunluğu (\(w_{\mathrm{bit}} = v/R\)) nasıl yorumlanır?
5. Bağlantı hızları eşit olmadığında (**darboğaz bağlantı / bottleneck link**) yönlendirici çıkış tamponunda **kuyruk gecikmesi (\(d_{\mathrm{queue}}\))** nasıl birikir?

---

## 1. Karar Haritası: Dört Düğüm Gecikmesi Bileşeni

Bir paket kaynaktan hedefe giderken yol üzerindeki her düğümde (gönderici veya yönlendirici, **Şekil 1.16, basılı s.36, PDF s.47**) dört farklı gecikme bileşeniyle karşılaşır:

| Gecikme Bileşeni | Sembol ve Formül | Fiziksel Anlamı | Neye Bağlıdır? | Tipik Mertebe |
| :--- | :--- | :--- | :--- | :--- |
| **İşleme Gecikmesi** (*Processing*) | \(d_{\mathrm{proc}}\) | Paket başlığını (*header*) inceleme, yönlendirme tablosuna bakma ve bit hatalarını denetleme süresi | Yönlendirici donanımı ve tablo arama mimarisi | Mikrosaniye (\(\mu\mathrm{s}\)) veya daha az |
| **Kuyruk Gecikmesi** (*Queuing*) | \(d_{\mathrm{queue}}\) | Çıkış bağlantısı meşgulken paketin çıkış tamponunda (*output buffer*) sıra bekleme süresi | Trafik yoğunluğu \(I = La/R\) ve gelişlerin kümelenme (*burst*) yapısı | Sıfır ile milisaniyeler (\(\mathrm{ms}\)) arası (değişken!) |
| **İletim Gecikmesi** (*Transmission*) | \(d_{\mathrm{trans}} = L/R\) | Paketin \(L\) bitinin tamamını ilk bitten son bite kadar bağlantıya itme (*push/serialize*) süresi | Paket boyutu \(L\) (bit) ve bağlantı iletim hızı \(R\) (bit/sn) | Mikrosaniye ile milisaniye arası |
| **Yayılma Gecikmesi** (*Propagation*) | \(d_{\mathrm{prop}} = d/v\) | Kabloya verilen **tek bir bitin** bağlantı başından sonuna kadar fiziksel ortamda ilerleme süresi | Fiziksel mesafe \(d\) (m) ve ortamın elektromanyetik yayılma hızı \(v\) (m/sn) | Kampüste \(\mu\mathrm{s}\), kıtalararası fiberde / uyduda onlarca-yüzlerce \(\mathrm{ms}\) |

Bir düğümdeki **toplam düğüm gecikmesi** (*total nodal delay*) bu dört bileşenin toplamıdır:

$$ d_{\mathrm{nodal}} = d_{\mathrm{proc}} + d_{\mathrm{queue}} + d_{\mathrm{trans}} + d_{\mathrm{prop}} $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 225" role="img" aria-label="A yönlendiricisindeki dört düğüm gecikmesi bileşeni: işleme, kuyruk, iletim ve yayılma">
    <defs>
      <marker id="fig16-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 Z" fill="#2563eb"/>
      </marker>
    </defs>
    <line x1="72" y1="44" x2="180" y2="88" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="72" y1="138" x2="180" y2="96" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="180" y1="88" x2="232" y2="88" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="180" y1="96" x2="232" y2="96" stroke="var(--text,#334155)" stroke-width="2"/>
    <rect x="28" y="24" width="40" height="28" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="32" y="28" width="32" height="20" rx="2" fill="#94a3b8"/>
    <path d="M36 52 L60 52 L66 58 L30 58 Z" fill="#64748b"/>
    <rect x="28" y="118" width="40" height="28" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="32" y="122" width="32" height="20" rx="2" fill="#94a3b8"/>
    <path d="M36 146 L60 146 L66 152 L30 152 Z" fill="#64748b"/>
    <rect x="108" y="42" width="12" height="22" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <line x1="126" y1="56" x2="156" y2="68" stroke="#2563eb" stroke-width="2.2" marker-end="url(#fig16-arr)"/>
    <rect x="108" y="112" width="12" height="22" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <line x1="126" y1="120" x2="156" y2="108" stroke="#059669" stroke-width="2.2" marker-end="url(#fig16-arr)"/>
    <text x="275" y="40" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text,#1e293b)">Yönlendirici A</text>
    <path d="M230 60 L230 114 A45 14 0 0 0 320 114 L320 60 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="275" cy="60" rx="45" ry="14" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="255" y1="55" x2="295" y2="65" stroke="#334155" stroke-width="2.2"/>
    <line x1="255" y1="65" x2="295" y2="55" stroke="#334155" stroke-width="2.2"/>
    <rect x="266" y="78" width="46" height="26" rx="3" fill="#ffffff" fill-opacity="0.85" stroke="#64748b" stroke-width="1.2"/>
    <rect x="272" y="81" width="9" height="20" rx="1.5" fill="#d97706"/>
    <rect x="285" y="81" width="9" height="20" rx="1.5" fill="#059669"/>
    <rect x="298" y="81" width="9" height="20" rx="1.5" fill="#2563eb"/>
    <line x1="320" y1="90" x2="615" y2="90" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <rect x="330" y="77" width="16" height="24" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <line x1="352" y1="90" x2="405" y2="90" stroke="#2563eb" stroke-width="2.6" marker-end="url(#fig16-arr)"/>
    <text x="650" y="62" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text,#1e293b)">Yönlendirici B</text>
    <path d="M615 82 L615 104 A35 11 0 0 0 685 104 L685 82 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="650" cy="82" rx="35" ry="11" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="634" y1="78" x2="666" y2="86" stroke="#334155" stroke-width="2"/>
    <line x1="634" y1="86" x2="666" y2="78" stroke="#334155" stroke-width="2"/>
    <path d="M230 130 L230 142 L264 142 L264 130" fill="none" stroke="#7c3aed" stroke-width="1.8"/>
    <line x1="247" y1="142" x2="145" y2="174" stroke="#7c3aed" stroke-width="1.4"/>
    <text x="145" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">1. İşleme (d_proc)</text>
    <text x="145" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Başlık &amp; tablo (~μs)</text>
    <path d="M268 130 L268 142 L316 142 L316 130" fill="none" stroke="#d97706" stroke-width="1.8"/>
    <line x1="292" y1="142" x2="290" y2="174" stroke="#d97706" stroke-width="1.4"/>
    <text x="290" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">2. Kuyruk (d_queue)</text>
    <text x="290" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Tamponda sıra (La/R)</text>
    <path d="M322 130 L322 142 L354 142 L354 130" fill="none" stroke="#2563eb" stroke-width="1.8"/>
    <line x1="338" y1="142" x2="440" y2="174" stroke="#2563eb" stroke-width="1.4"/>
    <text x="440" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">3. İletim (L/R)</text>
    <text x="440" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Bitleri kabloya itme</text>
    <path d="M360 130 L360 142 L612 142 L612 130" fill="none" stroke="#059669" stroke-width="1.8"/>
    <line x1="486" y1="142" x2="595" y2="174" stroke="#059669" stroke-width="1.4"/>
    <text x="595" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">4. Yayılma (d/v)</text>
    <text x="595" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Kabloda ışık hızı</text>
  </svg>
  <figcaption><strong>Şekil 1.16 Uyarlaması (basılı s.36, PDF s.47):</strong> Yönlendirici A’da toplam düğüm gecikmesinin dört fiziksel aşaması. İletim gecikmesi (L/R) çıkış kapısında bitleri kabloya serileştirme süresiyken, yayılma gecikmesi (d/v) kabloya çıkmış bitin Yönlendirici B’ye ulaşma süresidir.</figcaption>
</figure>

> **ZİHİN MODELİ:** **İletim gecikmesi (\(L/R\))**, dar bir turnikeden \(L\) kişilik bir grubun **tek sıra hâlinde geçip otoyola adım atması** için gereken süredir; turnikenin kapasitesine (\(R\)) ve gruptaki kişi sayısına (\(L\)) bağlıdır. **Yayılma gecikmesi (\(d/v\))** ise turnikeden çıkan **tek bir kişinin** otoyol boyunca \(d\) kilometre yürüyüp karşı gişeye ulaşma süresidir; yalnızca yolun uzunluğuna (\(d\)) ve yürüme hızına (\(v\)) bağlıdır.

---

## 2. İletim Gecikmesi (\(L/R\)) vs Yayılma Gecikmesi (\(d/v\))

Bilgisayar ağlarında en sık yapılan kavramsal hata, bir bağlantının iletim hızını (bant genişliğini, \(R\)) artırdığımızda bitlerin kablo içinde daha hızlı hareket ettiğini sanmaktır. İki büyüklüğü matematiksel olarak yan yana koyalım:

$$ d_{\mathrm{trans}} = \frac{L}{R}, \qquad d_{\mathrm{prop}} = \frac{d}{v} $$

Burada birimler hayati önem taşır:

- \(L\): Paket uzunluğu (**bit** cinsinden; \(1\text{ B} = 8\text{ b}\)).
- \(R\): Bağlantının iletim hızı (**bit/saniye** veya **bps**; \(10^3\), \(10^6\), \(10^9\) çarpanlarıyla).
- \(d\): İki düğüm arasındaki fiziksel bağlantı uzunluğu (**metre**; \(1\text{ km} = 10^3\text{ m}\)).
- \(v\) (kitapta \(s\) ile de gösterilir): Fiziksel ortamdaki sinyal yayılma hızı (**metre/saniye**). Bakır kabloda ve fiber optikte ışık hızının yaklaşık üçte ikisi ile tamamı arasındadır:

$$ 2 \times 10^8 \le v \le 3 \times 10^8 $$

### 2.1 Karavan ve Gişe Analojisi (Şekil 1.17, basılı s.38, PDF s.49)

Kurose ve Ross bu ayrımı netleştirmek için **10 araçlık bir karavan** (*ten-car caravan*) ve **otoyol gişeleri** (*tollbooths*) analojisini kurar:

- Her bir **araç** bir **biti**, 10 araçlık **karavanın tamamı** bir **paketi** (\(L = 10\)) temsil eder.
- Her bir **gişe** bir **yönlendiriciyi**, iki gişe arasındaki \(d = 100\text{ km}\) uzunluğundaki **otoyol** ise bir **iletişim bağlantısını** temsil eder.
- Araçlar otoyolda sabit \(v = 100\text{ km/h}\) hızla seyreder (**yayılma hızı**).
- Gişe her bir araca 12 saniyede hizmet verir, yani dakikada \(R = 5\) araç hızla araçları otoyola çıkarır (**iletim hızı**).

Gişenin 10 araçlık karavanın tamamını otoyola çıkarması (iletim gecikmesi, dakika) ve bir aracın 100 km’lik otoyolu geçmesi (yayılma gecikmesi, dakika) sırasıyla şöyledir:

$$ d_{\mathrm{trans}} = \frac{10}{5} = 2, \qquad d_{\mathrm{prop}} = \frac{100}{100} \times 60 = 60, \qquad d_{\mathrm{trans}} + d_{\mathrm{prop}} = 62 $$

Gişe store-and-forward kuralıyla çalışıyorsa (10 aracın tamamı gişede toplanmadan hiçbir araç sonraki gişeden çıkamıyorsa), karavanın birinci gişe önünden ikinci gişe önüne tam olarak toplanması 62 dakika sürer.

Peki otoyoldaki araçlar çok daha hızlı (\(v = 1000\text{ km/h} \implies d_{\mathrm{prop}} = 6\)), gişe ise daha yavaş (\(R = 1 \implies d_{\mathrm{trans}} = 10\)) olsaydı ne olurdu? Bu durumda \(d_{\mathrm{prop}} < d_{\mathrm{trans}}\) (\(6 < 10\)) olduğu için **karavanın ilk araçları ikinci gişeye vardığında, son araçlar henüz birinci gişeden ayrılmamış olurdu!**

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Şekil 1.17 Karavan ve gişe analojisi: 10 araçlık karavan ve 100 km aralıklı iki gişe">
    <rect x="20" y="92" width="680" height="14" rx="3" fill="#64748b" fill-opacity="0.25"/>
    <line x1="25" y1="99" x2="695" y2="99" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="8 6"/>
    <g transform="translate(32,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <circle cx="105" cy="84" r="3" fill="#2563eb"/><circle cx="117" cy="84" r="3" fill="#2563eb"/><circle cx="129" cy="84" r="3" fill="#2563eb"/>
    <g transform="translate(144,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <g transform="translate(212,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <path d="M32 114 L32 124 L268 124 L268 114" fill="none" stroke="var(--text,#334155)" stroke-width="1.6"/>
    <line x1="150" y1="124" x2="150" y2="134" stroke="var(--text,#334155)" stroke-width="1.6"/>
    <text x="145" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">10 Araçlık Karavan (L = 10 bit)</text>
    <text x="145" y="165" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Her araç = 1 bit</text>
    <rect x="304" y="28" width="44" height="8" rx="2" fill="#475569"/>
    <rect x="314" y="36" width="28" height="70" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <rect x="319" y="50" width="18" height="24" rx="2" fill="#e0f2fe" stroke="#64748b" stroke-width="1.2"/>
    <text x="328" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">1. Gişe (Yönlendirici)</text>
    <text x="328" y="151" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">R = 5 araç/dk</text>
    <text x="328" y="166" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2563eb">d_trans = L/R = 2 dk</text>
    <line x1="352" y1="60" x2="546" y2="60" stroke="#059669" stroke-width="2"/>
    <polygon points="352,60 360,55 360,65" fill="#059669"/>
    <polygon points="546,60 538,55 538,65" fill="#059669"/>
    <text x="449" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Mesafe d = 100 km · v = 100 km/sa</text>
    <text x="449" y="51" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">d_prop = d/v = 60 dk</text>
    <rect x="548" y="28" width="44" height="8" rx="2" fill="#475569"/>
    <rect x="558" y="36" width="28" height="70" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <rect x="563" y="50" width="18" height="24" rx="2" fill="#e0f2fe" stroke="#64748b" stroke-width="1.2"/>
    <text x="572" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">2. Gişe (Yönlendirici)</text>
    <text x="572" y="151" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">10 aracın tamamını bekler</text>
    <text x="572" y="166" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Toplam = 2 + 60 = 62 dk</text>
    <line x1="596" y1="60" x2="692" y2="60" stroke="#059669" stroke-width="2" stroke-dasharray="5 4"/>
    <polygon points="596,60 604,55 604,65" fill="#059669"/>
    <text x="646" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">100 km →</text>
  </svg>
  <figcaption><strong>Şekil 1.17 Uyarlaması (basılı s.38, PDF s.49):</strong> Karavan ve gişe analojisi. Gişenin karavanı otoyola çıkarma süresi iletim gecikmesine (L/R = 2 dk), bir aracın iki gişe arasındaki 100 km otoyolu katetme süresi ise yayılma gecikmesine (d/v = 60 dk) karşılık gelir.</figcaption>
</figure>

> **PRATİK KONTROL:** Gönderici \(t = 0\) anında iletime başladığında son bit göndericiyi \(t = d_{\mathrm{trans}}\) anında terk eder. İlk bit ise alıcıya \(t = d_{\mathrm{prop}}\) anında varır.
> - Eğer \(d_{\mathrm{prop}} > d_{\mathrm{trans}}\) ise: \(t = d_{\mathrm{trans}}\) anında ilk bit henüz yoldadır; paketin **tüm bitleri kablo üzerinde uçuş hâlindedir**.
> - Eğer \(d_{\mathrm{prop}} < d_{\mathrm{trans}}\) ise: \(t = d_{\mathrm{trans}}\) anında ilk bit çoktan alıcıya ulaşmış ve tamponlanmaya başlamıştır; gönderici hâlâ son bitleri kabloya itmektedir.

---

## 3. Bant Genişliği–Gecikme Çarpımı (BDP) ve Bir Bitin Fiziksel Boyu

Bir bağlantı üzerinde aynı anda "havada / kabloda uçuşta" (*in flight*) bulunabilecek maksimum bit sayısına bağlantının **Bant Genişliği–Gecikme Çarpımı** (*Bandwidth-Delay Product*, **BDP**, **Problem P25–P27, basılı s.74**) denir:

$$ \mathrm{BDP} = R \cdot d_{\mathrm{prop}} = R \cdot \frac{d}{v} $$

BDP, iletişim borusunun **bit cinsinden hacmidir**:

- Gönderici kabloya saniyede \(R\) bit basar.
- İlk bit karşı uca ulaşana kadar \(d_{\mathrm{prop}}\) saniye geçer.
- Dolayısıyla ilk bit karşı uca ulaştığı anda borunun içine basılmış toplam bit sayısı en fazla \(R \cdot d_{\mathrm{prop}}\) olabilir.

Buna bağlı olarak, kabloda yayılan **tek bir bitin metre cinsinden fiziksel uzunluğu (genişliği)** \(w_{\mathrm{bit}}\) şöyledir:

$$ w_{\mathrm{bit}} = \frac{d}{\mathrm{BDP}} = \frac{v}{R} $$

Örneğin \(v = 2 \times 10^8\) m/sn olan bir fiber kabloda:
- \(R = 2 \times 10^6\) bps (2 Mbps) iken bir bitin kablodaki boyu \(w_{\mathrm{bit}} = 100\) metre (bir futbol sahası uzunluğunda!) olur.
- \(R = 10^9\) bps (1 Gbps) iken bir bitin kablodaki boyu \(w_{\mathrm{bit}} = 0.2\) metre (20 cm) değerine düşer.

Bant genişliği \(R\) arttığında bitler kabloda daha hızlı koşmaz; **bitlerin kablodaki fiziksel boyu kısalır ve birim uzunluğa daha fazla bit sıkışır!**

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Bant genişliği-gecikme çarpımı (BDP) ve bitin fiziksel genişliği: R artınca yayılma hızı v değişmez, bir bitin kablodaki metre cinsinden boyu v/R kısalır">
    <text x="20" y="24" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">(a) Düşük İletim Hızı (R = 2 Mbps, v = 2×10⁸ m/sn) → Bir bitin boyu w_bit = v/R = 100 m</text>
    <rect x="20" y="34" width="680" height="36" rx="18" fill="var(--surface,#ffffff)" stroke="var(--line,#cbd5e1)" stroke-width="1.8"/>
    <rect x="28" y="40" width="212" height="24" rx="12" fill="#2563eb" opacity="0.88"/>
    <text x="134" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 3 (w_bit = 100 m)</text>
    <rect x="248" y="40" width="212" height="24" rx="12" fill="#3b82f6" opacity="0.88"/>
    <text x="354" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 2 (w_bit = 100 m)</text>
    <rect x="468" y="40" width="212" height="24" rx="12" fill="#60a5fa" opacity="0.88"/>
    <text x="574" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 1 (w_bit = 100 m) → v</text>
    <text x="20" y="102" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">(b) Yüksek İletim Hızı (R = 1 Gbps, aynı v = 2×10⁸ m/sn) → Bir bitin boyu w_bit = v/R = 0.2 m (20 cm)</text>
    <rect x="20" y="112" width="680" height="36" rx="18" fill="var(--surface,#ffffff)" stroke="var(--line,#cbd5e1)" stroke-width="1.8"/>
    <g fill="#059669" opacity="0.88">
      <rect x="28" y="118" width="24" height="24" rx="5"/><rect x="56" y="118" width="24" height="24" rx="5"/><rect x="84" y="118" width="24" height="24" rx="5"/><rect x="112" y="118" width="24" height="24" rx="5"/><rect x="140" y="118" width="24" height="24" rx="5"/><rect x="168" y="118" width="24" height="24" rx="5"/><rect x="196" y="118" width="24" height="24" rx="5"/><rect x="224" y="118" width="24" height="24" rx="5"/><rect x="252" y="118" width="24" height="24" rx="5"/><rect x="280" y="118" width="24" height="24" rx="5"/><rect x="308" y="118" width="24" height="24" rx="5"/><rect x="336" y="118" width="24" height="24" rx="5"/><rect x="364" y="118" width="24" height="24" rx="5"/><rect x="392" y="118" width="24" height="24" rx="5"/><rect x="420" y="118" width="24" height="24" rx="5"/><rect x="448" y="118" width="24" height="24" rx="5"/><rect x="476" y="118" width="24" height="24" rx="5"/><rect x="504" y="118" width="24" height="24" rx="5"/><rect x="532" y="118" width="24" height="24" rx="5"/><rect x="560" y="118" width="24" height="24" rx="5"/><rect x="588" y="118" width="24" height="24" rx="5"/><rect x="616" y="118" width="24" height="24" rx="5"/><rect x="644" y="118" width="24" height="24" rx="5"/>
    </g>
    <text x="360" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Aynı yayılma hızı v ve aynı d_prop = d/v; ancak aynı kablo kesitine 500 kat daha fazla bit (BDP = R · d_prop) sığar</text>
  </svg>
  <figcaption><strong>Boru Hacmi (BDP) ve Fiziksel Bit Genişliği (Problem P25–P27, basılı s.74):</strong> İletim hızı R arttığında sinyalin yayılma hızı v değişmez; bitler kabloya daha sık aralıklarla basıldığı için her bir bitin fiziksel uzunluğu (w_bit = v/R) kısalır ve borudaki uçuş hâlindeki bit kapasitesi (BDP = R · d_prop) artar.</figcaption>
</figure>

---

## 4. Store-and-Forward Paket Anahtarlama ve Boru Hattı (Pipelining)

Modern yönlendiricilerin büyük çoğunluğu **store-and-forward (depola ve ilet)** ilkesiyle çalışır (**§1.3.1, Şekil 1.11, basılı s.23–24, PDF s.34–35**).

### 4.1 Store-and-Forward Kuralı Nedir?

Yönlendirici, gelen bir paketin **tamamını** (ilk bitten son bite kadar tüm \(L\) bitini) giriş tamponuna alıp depolamadan, o paketin ilk bitini çıkış bağlantısına iletmeye **başlayamaz**. Bunun iki temel mühendislik nedeni vardır:
1. Yönlendirici paketin bozuk olup olmadığını anlamak için paketin sonundaki hata denetim kodunu (CRC / sağlama toplamı) doğrulamak zorundadır.
2. Giriş bağlantısı yavaş, çıkış bağlantısı hızlıysa (\(R_1 < R_2\)), paketin tamamı gelmeden hızlı bağlantıya bit basmaya başlamak paket ortasında veri tükenmesine (*buffer underflow*) yol açar.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Şekil 1.11 Store-and-forward paket anahtarlama: 1. paketin ön kısmı yönlendiricide depolanırken kalan bitleri bekleniyor">
    <defs>
      <marker id="fig11-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 Z" fill="#0284c7"/>
      </marker>
    </defs>
    <line x1="125" y1="88" x2="315" y2="88" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <line x1="395" y1="88" x2="585" y2="88" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <rect x="65" y="48" width="54" height="36" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
    <rect x="70" y="53" width="44" height="26" rx="2" fill="#94a3b8"/>
    <path d="M78 84 L106 84 L114 94 L70 94 Z" fill="#64748b"/>
    <text x="92" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text,#1e293b)">Gönderici (Kaynak)</text>
    <text x="143" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">3</text>
    <rect x="137" y="54" width="12" height="30" rx="2" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
    <text x="161" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">2</text>
    <rect x="155" y="54" width="12" height="30" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="180" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">1</text>
    <rect x="174" y="54" width="14" height="30" rx="2" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="174" y="68" width="14" height="16" rx="1.5" fill="#0284c7"/>
    <line x1="190" y1="76" x2="338" y2="76" stroke="#0284c7" stroke-width="4" marker-end="url(#fig11-arr)"/>
    <text x="235" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">R bps</text>
    <path d="M315 56 L315 98 A40 12 0 0 0 395 98 L395 56 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="355" cy="56" rx="40" ry="12" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="337" y1="51" x2="373" y2="61" stroke="#334155" stroke-width="2.2"/>
    <line x1="337" y1="61" x2="373" y2="51" stroke="#334155" stroke-width="2.2"/>
    <rect x="348" y="64" width="16" height="28" rx="2" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="348" y="78" width="16" height="14" rx="1.5" fill="#0284c7"/>
    <text x="355" y="124" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0284c7">Paket 1’in ön bitleri yönlendiricide depolandı;</text>
    <text x="355" y="140" text-anchor="middle" font-size="11" fill="var(--muted-ink,#52634c)">sonraki bağlantıya iletmeden önce kalan bitlerin</text>
    <text x="355" y="155" text-anchor="middle" font-size="11" fill="var(--muted-ink,#52634c)">tamamının gelmesi bekleniyor (Store-and-Forward)</text>
    <text x="490" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">R bps (henüz boş)</text>
    <rect x="585" y="48" width="54" height="36" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
    <rect x="590" y="53" width="44" height="26" rx="2" fill="#94a3b8"/>
    <path d="M598 84 L626 84 L634 94 L590 94 Z" fill="#64748b"/>
    <text x="612" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text,#1e293b)">Alıcı (Hedef)</text>
  </svg>
  <figcaption><strong>Şekil 1.11 Uyarlaması (basılı s.24, PDF s.35):</strong> Store-and-forward paket anahtarlama. Gönderici Paket 1’in bir kısmını göndermiş ve ilk bitler yönlendiriciye ulaşmıştır; ancak yönlendirici, Paket 1’in son bitini de alıp tamponda birleştirmeden çıkış bağlantısına iletime başlayamaz.</figcaption>
</figure>

### 4.2 Tek Paket İçin \(N\) Bağlantılı Uçtan Uca Gecikme

Kaynak ile hedef arasında \(N - 1\) yönlendirici, yani birbirine seri bağlı **\(N\) adet iletişim bağlantısı** bulunsun. Önce yayılma, işleme ve kuyruk gecikmelerini ihmal edelim (\(d_{\mathrm{prop}} = d_{\mathrm{proc}} = d_{\mathrm{queue}} = 0\)) ve tüm bağlantıların özdeş \(R\) hızında olduğunu varsayalım:

- \(t = 0\): Kaynak ilk biti 1. bağlantıya vermeye başlar.
- \(t = L/R\): Paketin son biti 1. yönlendiriciye ulaşır. 1. yönlendirici paketin tamamını depolamıştır; hemen 2. bağlantıya iletmeye başlar.
- \(t = 2L/R\): Paketin tamamı 2. yönlendiriciye (veya \(N = 2\) ise hedefe) ulaşır.

Genel olarak \(N\) özdeş bağlantılı bir yolda tek bir paketin store-and-forward iletim gecikmesi (**Denklem 1.1, basılı s.24**):

$$ d_{\mathrm{end}} = N \frac{L}{R} $$

Şimdi her düğümdeki işleme gecikmesini (\(d_{\mathrm{proc}}\)) ve her bağlantıdaki yayılma gecikmesini (\(d_{\mathrm{prop}} = d/v\)) modele geri ekleyelim (**Denklem 1.2, basılı s.41**):

$$ d_{\mathrm{end}} = N \left( d_{\mathrm{proc}} + \frac{L}{R} + \frac{d}{v} \right) $$

Bağlantıların hızları (\(R_i\)), uzunlukları (\(d_i\)), yayılma hızları (\(v_i\)) ve kuyruk gecikmeleri (\(d_{\mathrm{queue},i}\)) birbirinden farklıysa (**heterojen yol, Problem P10 & P17**), tek bir paketin uçtan uca gecikmesi tüm bağlantıların toplamıdır:

$$ d_{\mathrm{end}} = \sum_{i=1}^{N} \left( \frac{L}{R_i} + \frac{d_i}{v_i} + d_{\mathrm{queue},i} \right) + (N - 1) d_{\mathrm{proc}} $$

> **SIK HATA:** \(N\) bağlantılı bir yolda kaynak ile hedef arasında **\(N - 1\) adet ara yönlendirici** vardır! Soruda "her paket anahtarı \(d_{\mathrm{proc}} = 3\text{ ms}\) işleme gecikmesi ekliyor" denildiğinde (\(N = 3\) bağlantı için, **Problem P10**) işleme gecikmesi \(3 \times 3 = 9\text{ ms}\) değil, \((3 - 1) \times 3 = 6\text{ ms}\) olarak eklenir.

### 4.3 Çok Paketli Boru Hattı (Pipelining, Şekil 1.11 & Problem P2)

Kaynak arka arkaya **\(P\) adet paket** (her biri \(L\) bit) gönderdiğinde ne olur? **Şekil 1.11** (\(N = 2\) bağlantı, \(P = 3\) paket) üzerindeki zaman çizelgesini izleyelim (\(d_{\mathrm{prop}} = 0\) özel durumunda):

- \(t = L/R\) anında 1. yönlendirici **Paket 1**’i 2. bağlantıya iletmeye başlar.
- **Aynı \(t = L/R\) anında**, kaynak boş durmaz ve **Paket 2**’yi 1. bağlantıya iletmeye başlar!
- \(t = 2L/R\) anında Paket 1 hedefe ulaşır; aynı anda Paket 2 yönlendiricide tam depolanmıştır ve yönlendirici Paket 2’yi 2. bağlantıya verirken kaynak Paket 3’ü 1. bağlantıya verir.
- \(t = 3L/R\) anında Paket 2 hedefe, Paket 3 yönlendiriciye ulaşır.
- \(t = 4L/R\) anında Paket 3 hedefe ulaşır ve aktarım tamamlanır!

Genel olarak, \(N\) özdeş bağlantılı bir yolda arka arkaya gönderilen **\(P\) adet paketin** tamamının hedefe ulaşma süresi (**Problem P2** ve yayılma gecikmeli genellemesi):

$$ d_{\mathrm{end}}(P, N) = (N + P - 1)\frac{L}{R} + N\frac{d}{v} $$

Bu formülün fiziksel okuması çok berraktır:
1. **İlk paket** boru hattını doldurarak \(N(L/R) + N(d/v)\) sürede hedefe ulaşır.
2. **Kalan \(P - 1\) paketin** her biri, boru hattından yalnızca birer iletim süresi (\(L/R\)) arayla peş peşe çıkar: \((P - 1)(L/R)\).

---

## 5. Mesaj Bölütleme (Message Segmentation, Şekil 1.27 & Problem P31)

Büyük bir uygulama mesajını (\(F\) bit) neden tek bir dev paket olarak göndermek yerine her biri \(L = F/P\) bitlik \(P\) küçük pakete böleriz? **Şekil 1.27 (basılı s.75, PDF s.86)** ve **Problem P31** üzerinden karşılaştıralım (\(F = 10^6\), \(N = 3\), \(R = 5 \times 10^6\), \(d_{\mathrm{prop}} = 0\)):

1. **Bölütlemesiz (Şekil 1.27a):** Tek bir bağlantıda iletim süresi \(F/R = 200\text{ ms}\)’dir. Birinci anahtar 200 ms boyunca mesajın tamamını bekler, ikinci anahtar bir 200 ms daha bekler; mesaj hedefe \(N \cdot (F/R) = 600\text{ ms}\)’de varır. Her anda yalnızca tek bir bağlantı çalışır, diğer iki bağlantı boş bekler.
2. **\(P = 100\) pakete bölütlü (Şekil 1.27b):** Her paket \(L = 10^4\) bit olur ve tek bağlantıda \(L/R = 2\text{ ms}\) sürer. Birinci anahtar yalnızca 2 ms sonra ilk paketi ikinci bağlantıya aktarmaya başlar! 100 paketin tamamı \((N + P - 1)(L/R) = 102 \times 2 = 204\text{ ms}\) içinde hedefe varır:

$$ \frac{T_{\mathrm{seg}}}{T_{\mathrm{single}}} = \frac{N + P - 1}{N \cdot P} = \frac{102}{300} = 0.34 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 230" role="img" aria-label="Şekil 1.27 Mesaj bölütleme: bölütlemesiz tek dev mesaj ile bölütlü paket boru hattı karşılaştırması">
    <!-- (a) Bölütlemesiz -->
    <text x="18" y="24" font-size="11.5" font-weight="700" fill="#dc2626">a. Bölütlemesiz (Tek Parça Mesaj): Her anda yalnız 1 bağlantı çalışır (Toplam = 3 × 200 = 600 ms)</text>
    <line x1="95" y1="66" x2="235" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="295" y1="66" x2="435" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="495" y1="66" x2="625" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <!-- Düğümler (a) -->
    <rect x="48" y="42" width="44" height="30" rx="4" fill="#334155"/><rect x="52" y="46" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="70" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Kaynak</text>
    <path d="M230 44 L230 76 A35 9 0 0 0 300 76 L300 44 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="265" cy="44" rx="35" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <!-- Dev mesaj bloğu Anahtar 1 içinde -->
    <rect x="236" y="52" width="58" height="19" rx="3" fill="#0284c7" stroke="#ffffff" stroke-width="1"/>
    <text x="265" y="65" text-anchor="middle" font-size="9.5" font-weight="700" fill="#ffffff">Mesaj (F)</text>
    <text x="265" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">1. Anahtar (200 ms)</text>
    <path d="M435 44 L435 76 A30 9 0 0 0 495 76 L495 44 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="465" cy="44" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <text x="465" y="92" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">2. Anahtar (boş bekliyor)</text>
    <rect x="625" y="42" width="44" height="30" rx="4" fill="#334155"/><rect x="629" y="46" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="647" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Hedef</text>
    <!-- Ayırıcı çizgi -->
    <line x1="18" y1="112" x2="702" y2="112" stroke="var(--line,#cbd5e1)" stroke-width="1" stroke-dasharray="4 4"/>
    <!-- (b) Bölütlü (Boru Hattı) -->
    <text x="18" y="134" font-size="11.5" font-weight="700" fill="#059669">b. Bölütlü (P = 100 Paket Boru Hattı): Üç bağlantı aynı anda paralel çalışır (Toplam = 204 ms · ~3× Hızlanma!)</text>
    <line x1="95" y1="176" x2="235" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="295" y1="176" x2="435" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="495" y1="176" x2="625" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <!-- Düğümler (b) -->
    <rect x="48" y="152" width="44" height="30" rx="4" fill="#334155"/><rect x="52" y="156" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="70" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Kaynak</text>
    <!-- Bağlantı 1'de Paket p+2 -->
    <rect x="155" y="156" width="12" height="20" rx="2" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
    <text x="161" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#d97706">P3</text>
    <path d="M235 154 L235 186 A30 9 0 0 0 295 186 L295 154 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="265" cy="154" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="259" y="162" width="12" height="20" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="265" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">1. Anahtar (P2’yi iletiyor)</text>
    <!-- Bağlantı 2'de Paket p+1 -->
    <rect x="355" y="156" width="12" height="20" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="361" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">P2</text>
    <path d="M435 154 L435 186 A30 9 0 0 0 495 186 L495 154 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="465" cy="154" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="459" y="162" width="12" height="20" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <text x="465" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2563eb">2. Anahtar (P1’i iletiyor)</text>
    <!-- Bağlantı 3'te Paket p -->
    <rect x="555" y="156" width="12" height="20" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <text x="561" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2563eb">P1</text>
    <rect x="625" y="152" width="44" height="30" rx="4" fill="#334155"/><rect x="629" y="156" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="647" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Hedef</text>
  </svg>
  <figcaption><strong>Şekil 1.27 Uyarlaması (basılı s.75, PDF s.86, Problem P31):</strong> (a) Bölütlemesiz aktarımda her anahtar tüm mesajın bitmesini bekler. (b) Mesaj küçük paketlere bölündüğünde boru hattı (pipelining) devreye girer: 2. anahtar P1’i hedefe, 1. anahtar P2’yi 2. anahtara, kaynak ise P3’ü 1. anahtara aynı anda iletir.</figcaption>
</figure>

---

## 6. Darboğaz Bağlantı (Bottleneck Link), Verim (Throughput) ve Kuyruk Birikimi

Gerçek ağlarda bir yol üzerindeki tüm bağlantıların iletim hızı aynı değildir (**§1.4.4, Şekil 1.19–1.20, basılı s.44–46**). Sunucu ile istemci arasındaki \(N\) bağlantının hızları \(R_1, R_2, \ldots, R_N\) olduğunda, başka trafik yoksa uçtan uca **verim (throughput)** en yavaş bağlantının (**darboğaz bağlantı / bottleneck link**) hızına eşittir:

$$ R_{\mathrm{throughput}} = \min\{R_1, R_2, \ldots, R_N\} $$

İki bağlantılı (\(R_1\) ve \(R_2\)) bir yolda kaynak arka arkaya paket gönderdiğinde iki rejim ortaya çıkar (**Problem P23, basılı s.73**):

1. **Darboğaz ilk bağlantıysa (\(R_1 \le R_2\)):** Paketler yönlendiriciye \(L/R_1\) aralıklarla gelir ve yönlendirici her paketi \(L/R_2 \le L/R_1\) sürede hızla boşaltır. **Yönlendiricide hiçbir zaman kuyruk oluşmaz (\(d_{\mathrm{queue}} = 0\))** ve paketler hedefe \(L/R_1\) aralıklarla varır.
2. **Darboğaz ikinci bağlantıysa (\(R_1 > R_2\)):** Kaynak paketleri \(L/R_1\) gibi kısa aralıklarla yönlendiriciye pompalar; fakat yönlendirici her paketi çıkış bağlantısına \(L/R_2 > L/R_1\) gibi daha uzun bir sürede boşaltabilir (**Şekil 1.12, basılı s.25**).
   - 1. paket boş kuyruğa gelir: \(d_{\mathrm{queue},1} = 0\).
   - 2. paket yönlendiriciye vardığında 1. paketin iletimi henüz bitmemiştir! 2. paket çıkış tamponunda \(d_{\mathrm{queue},2} = L/R_2 - L/R_1\) süre bekler.
   - \(p\). paket çıkış tamponunda aşağıdaki süre kadar bekler:

$$ d_{\mathrm{queue},p} = (p - 1)\left(\frac{L}{R_2} - \frac{L}{R_1}\right), \qquad R_1 > R_2 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Şekil 1.12 ve 1.19 Darboğaz bağlantısı ve yönlendirici çıkış kuyruğunda paket birikimi">
    <!-- A ve B kaynakları (100 Mbps Ethernet) -->
    <rect x="34" y="24" width="42" height="28" rx="4" fill="#334155"/><rect x="38" y="28" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="55" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Kaynak A</text>
    <rect x="34" y="114" width="42" height="28" rx="4" fill="#334155"/><rect x="38" y="118" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="55" y="158" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Kaynak B</text>
    <line x1="78" y1="40" x2="210" y2="82" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="78" y1="128" x2="210" y2="90" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <text x="142" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Hızlı Giriş: R₁ = 100 Mbps</text>
    <rect x="122" y="46" width="11" height="20" rx="2" fill="#2563eb"/>
    <rect x="122" y="102" width="11" height="20" rx="2" fill="#0891b2"/>
    <!-- Yönlendirici ve Çıkış Kuyruğu -->
    <path d="M210 56 L210 108 A46 13 0 0 0 302 108 L302 56 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="256" cy="56" rx="46" ry="13" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="236" y1="51" x2="276" y2="61" stroke="#334155" stroke-width="2"/>
    <line x1="236" y1="61" x2="276" y2="51" stroke="#334155" stroke-width="2"/>
    <!-- Kuyruk kutusu -->
    <rect x="232" y="73" width="62" height="26" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
    <rect x="237" y="76" width="9" height="20" rx="1.5" fill="#d97706"/>
    <rect x="249" y="76" width="9" height="20" rx="1.5" fill="#0891b2"/>
    <rect x="261" y="76" width="9" height="20" rx="1.5" fill="#059669"/>
    <rect x="273" y="76" width="9" height="20" rx="1.5" fill="#2563eb"/>
    <path d="M232 122 L232 132 L294 132 L294 122" fill="none" stroke="#dc2626" stroke-width="1.6"/>
    <text x="263" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">Çıkış tamponunda kuyruk</text>
    <text x="263" y="163" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">(R_giriş &gt; R_çıkış birikimi)</text>
    <!-- Darboğaz Bağlantısı (15 Mbps) -->
    <line x1="302" y1="86" x2="555" y2="86" stroke="#dc2626" stroke-width="2.6"/>
    <rect x="335" y="64" width="12" height="20" rx="2" fill="#2563eb"/>
    <rect x="360" y="64" width="12" height="20" rx="2" fill="#0891b2"/>
    <rect x="385" y="64" width="12" height="20" rx="2" fill="#059669"/>
    <rect x="425" y="64" width="12" height="20" rx="2" fill="#2563eb"/>
    <rect x="465" y="64" width="12" height="20" rx="2" fill="#0891b2"/>
    <text x="428" y="48" text-anchor="middle" font-size="11.5" font-weight="700" fill="#dc2626">Darboğaz Bağlantı: R₂ = 15 Mbps</text>
    <text x="428" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Uçtan Uca Verim = min{R₁, R₂} = 15 Mbps</text>
    <!-- Hedef Yönlendirici ve Alıcı -->
    <path d="M555 72 L555 96 A28 9 0 0 0 611 96 L611 72 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
    <ellipse cx="583" cy="72" rx="28" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <line x1="611" y1="86" x2="646" y2="86" stroke="var(--text,#334155)" stroke-width="2"/>
    <rect x="646" y="70" width="42" height="28" rx="4" fill="#334155"/><rect x="650" y="74" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="667" y="114" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Hedef E</text>
  </svg>
  <figcaption><strong>Şekil 1.12 &amp; 1.19 Uyarlaması (basılı s.25 ve s.44, PDF s.36 ve s.55):</strong> Hızlı giriş bağlantılarından (100 Mbps) daha yavaş bir darboğaz çıkış bağlantısına (15 Mbps) geçişte paketler yönlendiricinin çıkış tamponunda kuyruk oluşturur. Uçtan uca verim darboğaz hızı olan min{R₁, R₂} değerini aşamaz.</figcaption>
</figure>

> **BAĞIMSIZ DOĞRULAMA:** Laboratuvarda **"Darboğaz & Kuyruk (R₁ > R₂)"** hazır ayarını (\(R_1 = 6 \times 10^6 \implies d_{\mathrm{trans},1} = 2\text{ ms}\), \(R_2 = 2 \times 10^6 \implies d_{\mathrm{trans},2} = 6\text{ ms}\)) seçtiğinde, 1., 2., 3. ve 4. paketlerin yönlendirici kuyruğunda sırasıyla \(0\text{ ms}\), \(4\text{ ms}\), \(8\text{ ms}\) ve \(12\text{ ms}\) beklediğini hem uzay-zaman diyagramında hem de olay kaydında doğrudan doğrulayabilirsin.

## 7. Sonlu tampon ve ölçülen yol

\(a\) ortalama paket geliş hızı (paket/sn), \(L\) paket boyu (bit) ve \(R\) çıkış hızı (bit/sn) olsun. Ortalama gelen yükü kapasiteyle karşılaştırmak için trafik yoğunluğunu hesapla:

$$ I = \frac{La}{R} $$

\(I>1\) sürerse sınırsız kuyruk büyür. Gerçek bir çıkış tamponu dolduğunda gelen paket düşebilir. \(I<1\) olsa da kısa bir patlama tamponu doldurabilir. Örneğin aynı anda 8 paket gelirse ve boş çıkış birini hemen işleme alıp 4’ünü bekletebiliyorsa 3 paket düşer. Gelişlerin zamana dağılışı bu hesabın parçasıdır. §1.3’te patlamanın kuyruğunu adım adım inceleyebilirsin.

**Traceroute** ölçümünde her satır, ilgili ara düğümden dönen yanıtın gidiş-dönüş süresini gösterir. Örneğin iki satırda 12 ms ve 18 ms görmek, aradaki bağlantının tek yön gecikmesinin 6 ms olduğunu göstermez. Yanıt yolu, kuyruk ve işleme farklı olabilir. Yanıt alınmayan bir satır da tek başına sonraki hedeflerin erişilemez olduğunu kanıtlamaz.
