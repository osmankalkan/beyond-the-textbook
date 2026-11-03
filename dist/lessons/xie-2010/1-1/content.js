const text=(tr,en)=>({tr,en});

export const modelingExamples = [
  {
    id:'projectile', icon:'↗', pages:'1–2', formulaIndices:[0,1], experiment:'projectile',
    title:text('Hava dirençli atış','Projectile with air resistance'),
    summary:text('Bir cismin yolunu, üzerine etkiyen kuvvetlerden kur.','Build a trajectory from the forces acting on a body.'),
    unknown:text('x(t), y(t): yatay ve düşey konum (m).','x(t), y(t): horizontal and vertical position (m).'),
    independent:text('Zaman t (s). Hız konumun, ivme hızın değişimidir.','Time t (s). Velocity changes position; acceleration changes velocity.'),
    balance:text('Newton: kütle × ivme = kuvvetlerin toplamı. Hava direnci hıza zıt yöndedir: R = −βv.','Newton: mass × acceleration = total force. Air resistance opposes velocity: R = −βv.'),
    conditions:text('x(0)=y(0)=0; x′(0)=v₀ cos θ₀; y′(0)=v₀ sin θ₀. Başlangıç için dört bilgi gerekir.','x(0)=y(0)=0; x′(0)=v₀ cos θ₀; y′(0)=v₀ sin θ₀. Four initial values specify the launch.'),
    assumptions:text('Sabit g ve β, durgun hava, noktasal cisim, düz zemin. Doğrusal direnç, her hız aralığı için uygun değildir.','Constant g and β, still air, point mass and flat ground. Linear drag is not suitable for every speed regime.'),
    prompt:text('β = 0 yapınca yatay hareket neden düzgün kalırken düşey hareket değişiyor?','When β = 0, why is horizontal velocity constant while vertical velocity still changes?'),
    hint:text('Yatay denklemde β = 0 iken x″ = 0; düşey denklemde yerçekimi hâlâ var: y″ = −g.','With β = 0 the horizontal equation gives x″ = 0; gravity remains in the vertical equation: y″ = −g.')
  },
  {
    id:'tank',icon:'⇄',pages:'2–3',formulaIndices:[2,3],experiment:'tank',
    title:text('Karışım tankında kirletici','Pollutant in a mixing tank'),
    summary:text('Giren ve çıkan maddeyi say; yoğunluğun neden değiştiğini bul.','Account for material entering and leaving to explain changing concentration.'),
    unknown:text('c(t): tanktaki kirletici oranı. Kirletici miktarı M(t)=V(t)c(t).','c(t): pollutant fraction in the tank. Pollutant amount is M(t)=V(t)c(t).'),
    independent:text('Zaman t (dakika). V litre, Q değerleri litre/dakika.','Time t (minutes). V is in litres and flow rates Q are in litres/minute.'),
    balance:text('M′ = Qin cin − Qout c. M = Vc için ürün kuralı: M′ = Vc′ + V′c ve V′ = Qin − Qout.','M′ = Qin cin − Qout c. The product rule for M = Vc gives M′ = Vc′ + V′c, with V′ = Qin − Qout.'),
    conditions:text('V(0)=V₀>0 ve c(0)=c₀. V(t)>0 olmalı; sonlu bir tankta taşma olmadan model durdurulmalı.','V(0)=V₀>0 and c(0)=c₀. Require V(t)>0; in a finite tank stop the model before overflow.'),
    assumptions:text('Anlık tam karışım, sabit debiler, kimyasal tepkime yok. Çıkış yoğunluğu tanktaki yoğunluğa eşittir.','Instantaneous perfect mixing, constant flow rates and no reaction. Outlet concentration equals tank concentration.'),
    prompt:text('Qout son denklemde c’nin katsayısı olarak görünmüyor. Tanktan çıkışın etkisi gerçekten kayboldu mu?','Qout does not appear as the coefficient of c in the final equation. Has outflow really lost its influence?'),
    hint:text('Hayır. Qout, V(t)=V₀+(Qin−Qout)t içinde kalır. Çıkış debisi hacmi ve böylece yoğunluğun değişim hızını etkiler.','No. Qout remains inside V(t)=V₀+(Qin−Qout)t. It changes the volume and therefore the concentration response.')
  },
  {
    id:'cable',icon:'⌒',pages:'3–4',formulaIndices:[4],
    title:text('Asma köprünün kablosu','Cable of a suspension bridge'),
    summary:text('Denge halindeki bir şekil de diferansiyel denklemle tarif edilir.','A shape at rest can also be described by a differential equation.'),
    unknown:text('y(x): kablonun en alçak noktaya göre yüksekliği.','y(x): cable height relative to its lowest point.'),
    independent:text('Yatay konum x. Bu modelde türevler zamana göre alınmaz.','Horizontal position x. Derivatives in this model are not time derivatives.'),
    balance:text('Kablonun yatay gerilme bileşeni H sabittir; düşey denge H y″ = w(x) verir.','The horizontal tension component H is constant; vertical equilibrium gives H y″ = w(x).'),
    conditions:text('Orijin en alçak noktadaysa y(0)=0 ve y′(0)=0. Destek yüksekliği H’yi belirlemek için kullanılabilir.','With the origin at the lowest point, y(0)=0 and y′(0)=0. Support geometry can determine H.'),
    assumptions:text('Esnek kablo, eğilme direnci ihmal ediliyor; w(x) yatay uzunluk başına yüktür. Sabit w parabol verir; kablonun kendi ağırlığıyla aynı varsayım değildir.','Flexible cable with negligible bending resistance; w(x) is load per horizontal length. Constant w gives a parabola, unlike the self-weight-only cable assumption.'),
    prompt:text('Aynı H altında w iki katına çıkarsa profilin ikinci türevi y″ nasıl değişir?','For the same H, how does doubling w change the profile’s second derivative y″?'),
    hint:text('y″ = w/H. H sabitken y″ de iki katına çıkar. Bu örnek, diferansiyel denklemin mutlaka bir zaman hareketi anlatmadığını gösterir.','Since y″ = w/H, doubling w doubles y″ at fixed H. A differential equation need not describe motion in time.')
  },
  {
    id:'earthquake',icon:'⇆',pages:'4',formulaIndices:[5],
    title:text('Deprem etkisindeki bina','Building under earthquake excitation'),
    summary:text('Bina ile zeminin hareketini ayır; göreli koordinatı seç.','Separate building and ground motion by choosing a relative coordinate.'),
    unknown:text('y(t)=x(t)−x₀(t): binanın zemine göre yer değiştirmesi.','y(t)=x(t)−x₀(t): building displacement relative to the ground.'),
    independent:text('Zaman t; x₀(t) verilmiş zemin hareketidir.','Time t; x₀(t) is the prescribed ground motion.'),
    balance:text('Mutlak ivme x″=y″+x₀″. Yay ve sönüm kuvvetleri göreli harekete bağlıdır; m x₀″ sağ tarafa geçer.','Absolute acceleration is x″=y″+x₀″. Spring and damping forces depend on relative motion; m x₀″ moves to the right-hand side.'),
    conditions:text('y(0) ve y′(0), ayrıca zemin ivmesinin zaman geçmişi verilmelidir.','Specify y(0), y′(0) and the time history of ground acceleration.'),
    assumptions:text('Tek serbestlik derecesi, rijit kat, doğrusal yay ve viskoz sönüm.','One degree of freedom, rigid floor, linear spring and viscous damping.'),
    prompt:text('Zemin sabit hızla kayarken x₀″ = 0 ise bu koordinatta sürekli deprem zorlaması oluşur mu?','If the ground moves at constant velocity so x₀″ = 0, is there a continuing earthquake forcing term in this coordinate?'),
    hint:text('Sürekli zorlayıcı terim −m x₀″ olduğundan sıfırdır. Başlangıçta göreli yer değiştirme veya hız varsa serbest tepki yine oluşabilir.','The continuing forcing term −m x₀″ is zero. Initial relative displacement or velocity may still produce a free response.')
  },
  {
    id:'absorber',icon:'↕',pages:'4–5',formulaIndices:[6,7],
    title:text('Titreşim sönümleyici','Vibration absorber'),
    summary:text('İki kütlenin hareketi birbirini etkiliyorsa iki denklemi birlikte kur.','When two masses affect one another, formulate their equations together.'),
    unknown:text('x(t): ekipmanın, xₐ(t): ek sönümleyici kütlenin yer değiştirmesi.','x(t): equipment displacement; xₐ(t): attached absorber displacement.'),
    independent:text('İki bilinmeyen için ortak zaman t.','A shared time variable t for two unknown functions.'),
    balance:text('Bağlantı kuvveti cₐ(x′−xₐ′)+kₐ(x−xₐ), iki kütleye eşit büyüklükte ve zıt yönde etkir.','The coupling force cₐ(x′−xₐ′)+kₐ(x−xₐ) acts on the masses with equal magnitude and opposite direction.'),
    conditions:text('x(0), x′(0), xₐ(0), xₐ′(0) ve dış kuvvet F₀ sin Ωt verilmelidir.','Specify x(0), x′(0), xₐ(0), xₐ′(0) and the applied force F₀ sin Ωt.'),
    assumptions:text('Doğrusal yaylar, viskoz sönüm ve denge konumuna göre ölçülen küçük hareketler. Ek kütle her frekansta titreşimi azaltmak zorunda değildir.','Linear springs, viscous damping and small motion measured about equilibrium. An added mass does not necessarily reduce vibration at every frequency.'),
    prompt:text('İki denklemi topladığında bağlantı yayının ve bağlantı sönümünün kuvvetlerine ne olur?','What happens to coupling spring and damper forces when you add the two equations?'),
    hint:text('İç kuvvetler birbirini götürür. Bu işaret kontrolü, yanlış kurulmuş bir sistemi yakalamanın iyi bir yoludur.','Internal coupling forces cancel. This sign check is a useful way to detect an incorrectly formulated system.')
  },
  {
    id:'beam',icon:'↦',pages:'5–6',formulaIndices:[8,9,10],
    title:text('Hareketli yük altındaki köprü','Bridge under a moving load'),
    summary:text('Aynı anda hem nerede hem ne zaman sorusunu sor.','Ask both where and when at the same time.'),
    unknown:text('v(x,t): köprünün x konumunda ve t anındaki düşey sehim miktarı.','v(x,t): vertical beam deflection at position x and time t.'),
    independent:text('Konum x ve zaman t. İki bağımsız değişken kısmi türev gerektirir.','Position x and time t. Two independent variables require partial derivatives.'),
    balance:text('Birim uzunluk başına atalet ρA vtt ve eğilme etkisi EI vxxxx, hareketli tekil yük Pδ(x−Ut) ile dengelenir.','Inertia per unit length ρA vtt and bending EI vxxxx balance the moving point load Pδ(x−Ut).'),
    conditions:text('Başlangıçta sehim ve hız sıfırdır. Basit mesnetlerde sehim ve eğilme momenti sıfırdır: v=0 ve vxx=0.','Initially deflection and velocity are zero. At simple supports, deflection and bending moment vanish: v=0 and vxx=0.'),
    assumptions:text('Euler–Bernoulli kirişi, sabit EI ve ρA, küçük sehim, sabit U, sönüm ihmal. Dirac deltası normal bir sonlu kuvvet yüksekliği değildir; noktasal yükün dağılım gösterimidir.','Euler–Bernoulli beam, constant EI and ρA, small deflection, fixed U and no damping. The Dirac delta is a distribution representing a point load, not an ordinary finite-height force.'),
    prompt:text('Pδ(x−Ut) içindeki x = Ut ilişkisi fiziksel olarak ne söylüyor?','What physical information is expressed by x = Ut inside Pδ(x−Ut)?'),
    hint:text('Yükün uygulandığı konum zamanla değişir: t=0’da sol uçta, t=L/U’da sağ uçtadır. Bu model yalnızca aracın açıklık üzerinde olduğu aralıkta kullanılır.','The load location changes with time: it is at the left end at t=0 and reaches the right end at t=L/U. Use this load model while the vehicle is on the span.')
  }
];

export const introductionLesson = {
  id:'xie-2010:1.1', section:'1.1', chapterNumber:'01',
  chapterTitle:text('Giriş','Introduction'),
  title:text('Motive edici örnekler','Motivating examples'),
  englishTitle:'Motivating Examples',
  subtitle:text('Altı mühendislik problemi. Ortak soru: Değişimi hangi fiziksel yasa belirliyor?','Six engineering problems. One shared question: which physical law governs the change?'),
  pages:'1–6',pdfPages:'19–24',
  lessonPath:text('lessons/xie-2010/1-1/lesson.md','lessons/xie-2010/1-1/lesson-en.md'),
  mathPath:'lessons/xie-2010/1-1/math.json',
  downloadName:text('1-1-motive-edici-ornekler.md','1-1-motivating-examples.md'),
  labFamily:'introduction-modeling',
  highlights:text(['Kuvvetten hareket denklemine','Kirletici ve hacim dengesi','Denge halindeki kablo','Göreli hareket ve bağlı sistemler','Konum + zaman: köprü modeli'],['From forces to motion equations','Pollutant and volume balances','A cable in static equilibrium','Relative motion and coupled systems','Position + time: the beam model']),
  notesPlaceholder:text('Bir örnek seç: bilinmeyen fonksiyon, bağımsız değişken, fiziksel denge ve varsayımlar nelerdir?','Choose an example: identify the unknown function, independent variable, physical balance and assumptions.'),
  sourceSummary:text('Wei-Chau Xie, §1.1, basılı s.1–6 (PDF s.19–24) temelinde özgün çalışma uyarlaması. Altı örneğin model kurma mantığı ele alınır; §1.2 henüz ders olarak eklenmemiştir. Atış ve tank grafikleri bu uygulama için hazırlanmıştır.','An original study adaptation based on Wei-Chau Xie, §1.1, printed pp.1–6 (PDF pp.19–24). It explores model formulation in six examples; §1.2 has not been added as a lesson. Projectile and tank plots were created for this application.'),
  modelLimits:text('Atışta doğrusal hava direnci, tankta anlık tam karışım varsayılır. Sayısal parametreler kitap verisi değil keşif değerleridir. Diğer dört örnek, denklemleri ve koşullarıyla model incelemesidir; çözüm simülasyonu sunulmaz. Kaynak şekiller kopyalanmamıştır.','The projectile assumes linear drag and the tank assumes instantaneous perfect mixing. Numerical parameters are exploratory values, not textbook data. The remaining four examples are model walkthroughs with equations and conditions, not solution simulations. Source illustrations have not been copied.'),
  presentation:{
    wrongFeedback:text('Henüz doğru değil. Bilinmeyeni, kuvvet veya madde dengesini ve varsayımları yeniden kontrol et. İpucundan yararlanabilirsin.','Not quite right. Recheck the unknown, the force or material balance and the assumptions. You can reveal a hint.'),
    lab:text('Modelleri keşfet','Explore models'),practice:text('Kavrama soruları','Concept checks'),
    practiceEyebrow:text('§1.1 · MODEL KURMA','§1.1 · FORMULATING MODELS'),
    practiceTitle:text('Denklemi kurmadan önce.','Before solving the equation.'),
    practiceIntro:text('Altı örnekten ne öğrendiğini sınayalım. Her soru fiziksel dengeye veya modelin varsayımına odaklanır.','Check what you learned from the six examples. Each question focuses on a physical balance or modeling assumption.'),
    practiceDisclaimer:text('Bu altı kavrama sorusu §1.1 için uygulamaya özgü hazırlanmıştır; kitaptan alınmış sınav soruları değildir.','These six concept checks were written for this application based on §1.1; they are not copied textbook exam questions.'),
    featureSummary:text('Türkçe/İngilizce ders notu, altı model incelemesi, atış ve tank için iki etkileşimli grafik, altı kavrama sorusu, ders bazlı notlar ve ilerleme. §1.2 inceleme sonrasına bırakıldı.','Bilingual lesson notes, six model walkthroughs, two interactive plots for projectile and tank models, six concept checks, and per-lesson notes and progress. §1.2 is reserved for a later review step.')
  },
  modelingExamples,
  questions:[
    {title:text('Direnç yoksa ne kalır?','What remains without drag?'),tag:text('ATIŞ','PROJECTILE'),text:text('β=0 iken yatay harekette dış kuvvet yoktur. Hangi ifade doğrudur?','With β=0 there is no horizontal force. Which statement is correct?'),choices:text(['Yatay hız sabittir; düşey ivme −g’dir.','Her iki yönde hız sabittir.','Yerçekimi yatay yönde etkir.'],['Horizontal velocity is constant; vertical acceleration is −g.','Velocity is constant in both directions.','Gravity acts horizontally.']),answer:0,feedback:text('Doğru: m x″=0 ve m y″=−mg. Hız bileşenlerini birbirinden ayırmak önemlidir.','Correct: m x″=0 and m y″=−mg. Keep the two velocity components separate.'),hints:text(['Yatay ve düşey kuvvet toplamını ayrı yaz.','Direnci kaldırmak yerçekimini kaldırmaz.'],['Write the horizontal and vertical force balances separately.','Removing drag does not remove gravity.'])},
    {title:text('Tankta ilk değişim hızı','Initial concentration rate'),tag:text('KARIŞIM DENGESİ','MIXING BALANCE'),text:text('V₀=100 L, Qin=Qout=5 L/dk, c₀=%10 ve cin=%2. İlk anda yoğunluk dakikada kaç yüzde puan değişir? Azalma için eksi işareti kullan.','V₀=100 L, Qin=Qout=5 L/min, c₀=10% and cin=2%. How many percentage points per minute does concentration initially change? Use a negative sign for a decrease.'),unit:text('yüzde puan / dk','percentage points / min'),answer:-0.4,tolerance:0.005,feedback:text('Doğru: c′=(5/100)(0,02−0,10)=−0,004 dk⁻¹; yüzde puanla −0,4/dk.','Correct: c′=(5/100)(0.02−0.10)=−0.004 min⁻¹, or −0.4 percentage points/min.'),hints:text(['c′ = Qin(cin−c)/V. Önce yüzdeleri oran olarak yaz.','−0,004 oran/dk, −0,4 yüzde puan/dk demektir.'],['Use c′ = Qin(cin−c)/V and convert percentages to fractions first.','−0.004 fraction/min means −0.4 percentage points/min.'])},
    {title:text('Zaman olmadan türev','A derivative without time'),tag:text('KABLO','CABLE'),text:text('Kablo modeli y″(x)=w(x)/H denkleminde bağımsız değişken hangisidir?','In the cable model y″(x)=w(x)/H, what is the independent variable?'),choices:text(['Zaman t','Yatay konum x','Gerilme H'],['Time t','Horizontal position x','Tension H']),answer:1,feedback:text('Doğru. Bu denklem zamana bağlı bir hareketi değil, denge halindeki şekli tarif eder.','Correct. This equation describes an equilibrium shape, not a time-dependent motion.'),hints:text(['Türevin hangi değişkene göre alındığını incele.'],['Look at the variable with respect to which the derivative is taken.'])},
    {title:text('Deprem modelinin zorlaması','Forcing in the earthquake model'),tag:text('GÖRELİ HAREKET','RELATIVE MOTION'),text:text('y=x−x₀ seçildiğinde m y″+c y′+k y denkleminin sağ tarafı nedir?','With y=x−x₀, what is the right-hand side of m y″+c y′+k y?'),choices:text(['−m x₀″','−k x₀','Sıfır; zemin hareketi etkisizdir.'],['−m x₀″','−k x₀','Zero; ground motion has no effect.']),answer:0,feedback:text('Doğru. x″=y″+x₀″ yazıp m x₀″ terimini karşı tarafa taşı.','Correct. Substitute x″=y″+x₀″ and move m x₀″ to the other side.'),hints:text(['Önce mutlak ivmeyi göreli ivme ve zemin ivmesi cinsinden yaz.'],['First express absolute acceleration in terms of relative and ground acceleration.'])},
    {title:text('Bağlantı kuvvetlerini kontrol et','Check the coupling forces'),tag:text('SÖNÜMLEYİCİ','ABSORBER'),text:text('Ekipman ve ek kütle denklemleri toplanınca aralarındaki yay ve sönüm kuvvetlerine ne olur?','When the equipment and absorber equations are added, what happens to their coupling spring and damping forces?'),choices:text(['İki katına çıkar.','Eşit ve zıt oldukları için birbirini götürür.','Her ikisi de dış kuvvete dönüşür.'],['They double.','They cancel because they are equal and opposite.','They both become external forces.']),answer:1,feedback:text('Doğru. İç kuvvetler toplam sistemin kuvvet dengesinde kalmaz.','Correct. Internal forces cancel in the force balance of the combined system.'),hints:text(['Aynı bağlantının iki ucundaki kuvvetlerin yönlerini karşılaştır.'],['Compare the directions of the forces at the two ends of the same connection.'])},
    {title:text('Hem nerede hem ne zaman?','Both where and when?'),tag:text('KÖPRÜ','BRIDGE'),text:text('Hareketli yük altındaki köprünün bilinmeyeni neden v(x,t) olarak yazılır?','Why is the unknown bridge deflection written as v(x,t)?'),choices:text(['Sehim yalnızca aracın hızına bağlıdır.','Köprünün her noktasındaki sehim zamanla değişir.','x ve t aynı değişkenin iki adıdır.'],['Deflection depends only on vehicle speed.','Deflection at each point of the bridge changes over time.','x and t are two names for the same variable.']),answer:1,feedback:text('Doğru. Uzay ve zaman iki bağımsız değişkendir; kısmi türevli model ve hem başlangıç hem sınır koşulları gerekir.','Correct. Space and time are independent variables; the model uses partial derivatives and needs both initial and boundary conditions.'),hints:text(['Araba geçerken köprünün ortası ve uçları aynı şekilde hareket eder mi?'],['While the vehicle crosses, do the midpoint and ends of the bridge move in the same way?'])}
  ]
};
