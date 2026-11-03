import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,C,fn,exp,integral,dx,dy,abs,lines,r} from '../../../study/math.js';
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),ten=n(10),twelve=n(12),fifteen=n(15);
const x2=pow(x,two),x3=pow(x,three),x4=pow(x,four),y2=pow(y,two),y3=pow(y,three),y4=pow(y,four),y5=pow(y,five);
const d=s=>v('d')+s;
const pd=(a,b)=>f(o('∂')+v(a),o('∂')+v(b));
const ln=s=>fn('ln',s);
const sin=s=>fn('sin',s);
const cos=s=>fn('cos',s);
const tan=s=>fn('tan',s);
const arctan=s=>fn('arctan',s);
const sqrt=s=>'<msqrt>'+r(s)+'</msqrt>';
const sec=s=>fn('sec',s);
const expm=s=>exp(s);
const paren=s=>p(s);
const eqn=(a,b)=>a+eq+b;
const mu=v('μ');
const xy=v('x')+v('y');

export const exactnessFamilies={
 exact:{
  name:'(2x+y)dx+(x+2y)dy=0',
  potential:x2+plus+xy+plus+y2,
  multiplier:mu+eq+one,
  note:T('Tam denklemde μ=1’dir. Düzey eğrileri x²+xy+y²=C elipsleridir; A ve B farklı C değerleri seçer.','For an exact equation μ=1. The level curves are the ellipses x²+xy+y²=C; A and B select different values of C.')
 },
 'factor-x':{
  name:'y(2x−y+2)dx+2(x−y)dy=0',
  potential:expm(x)+y+p(two+x+minus+y),
  multiplier:mu+eq+expm(x),
  note:T('Denklem başlangıçta tam değildir; μ=e^x ile tam hale gelir. Düzey eğrileri e^x y(2x−y)=C’dir.','The equation is not exact at first; μ=e^x makes it exact. The level curves are e^x y(2x−y)=C.')
 },
 'factor-y':{
  name:'y²dx+(xy+y²−1)dy=0',
  potential:xy+plus+f(y2,two)+minus+ln(y),
  multiplier:mu+eq+f(one,y),
  note:T('y=0 ayrı bir çözümdür. y>0 dalında μ=1/y ile tam hale gelir; düzey eğrileri xy+½y²−ln y=C’dir.','y=0 is a separate solution. On the branch y>0, μ=1/y makes the equation exact; the level curves are xy+½y²−ln y=C.')
 },
 inspection:{
  name:'(2x√x+x²+y²)dx+2y√x dy=0',
  potential:ln(x2+plus+y2)+plus+two+sqrt(x),
  multiplier:mu+eq+f(one,sqrt(x)+p(x2+plus+y2)),
  note:T('İnceleme yöntemi x dx+y dy ve √x terimlerini ayırır. μ=1/[√x(x²+y²)] ile düzey eğrileri ln(x²+y²)+2√x=C olur.','Inspection separates the x dx+y dy and √x terms. With μ=1/[√x(x²+y²)] the level curves are ln(x²+y²)+2√x=C.')
 }
};

const exactPath=[
 step('1. Tamlığı sına','1. Test exactness',lines(eqn(p(six+x+y2+plus+four+x3+y)+dx+plus+p(six+x2+y+plus+x4+plus+expm(y))+dy,zero),pd('M','y')+eq+twelve+xy+plus+four+x3+eq+pd('N','x')),'M=6xy²+4x³y ve N=6x²y+x⁴+e^y. Kısmi türevler eşit olduğu için denklem tamdır; bir potansiyel u(x,y) vardır.','M=6xy²+4x³y and N=6x²y+x⁴+e^y. The partial derivatives agree, so the equation is exact and a potential u(x,y) exists.'),
 step('2. M’yi x’e göre integre et','2. Integrate M with respect to x',lines(v('u')+eq+integral(p(six+x+y2+plus+four+x3+y)+dx)+plus+v('g')+p(y),v('u')+eq+three+x2+y2+plus+x4+y+plus+v('g')+p(y)),'x’e göre integre ederken y sabittir. ∫6xy²dx=3x²y², ∫4x³y dx=x⁴y. İntegral sabiti y’nin fonksiyonu g(y) olur.','While integrating with respect to x, y is constant. ∫6xy²dx=3x²y² and ∫4x³y dx=x⁴y. The integration constant is a function g(y).'),
 step('3. u_y’yi N ile eşleştir','3. Match u_y with N',lines(pd('u','y')+eq+six+x2+y+plus+x4+plus+prime('g')+p(y)+eq+six+x2+y+plus+x4+plus+expm(y),prime('g')+p(y)+eq+expm(y)),'u_y=6x²y+x⁴+g′(y). Bunu N=6x²y+x⁴+e^y ile karşılaştırınca g′(y)=e^y kalır.','u_y=6x²y+x⁴+g′(y). Comparing with N=6x²y+x⁴+e^y leaves g′(y)=e^y.'),
 step('4. g’yi bul ve aileyi yaz','4. Find g and write the family',lines(v('g')+p(y)+eq+expm(y),v('u')+eq+three+x2+y2+plus+x4+y+plus+expm(y)+eq+C),'g(y)=e^y olduğundan potansiyel u=3x²y²+x⁴y+e^y’dir. Çözümler u=C düzey eğrileridir.','Since g(y)=e^y, the potential is u=3x²y²+x⁴y+e^y. The solutions are the level curves u=C.'),
 step('5. Türevle doğrula','5. Verify by differentiation',lines(pd('u','x')+eq+six+x+y2+plus+four+x3+y+eq+v('M'),pd('u','y')+eq+six+x2+y+plus+x4+plus+expm(y)+eq+v('N')),'u_x=M ve u_y=N olduğundan du=M dx+N dy=0 tam olarak asıl denklemi verir. Bölme yapılmadığı için kayıp dal yoktur; çözüm tüm düzlemde örtüktür.','Since u_x=M and u_y=N, du=M dx+N dy=0 recovers the original equation exactly. No division occurred, so no branch is lost; the solution is implicit on the whole plane.')
];

const groupsPath=[
 step('1. Tam değil: önce sına','1. Not exact: test first',lines(eqn(p(four+xy+plus+three+y4)+dx+plus+p(two+x2+plus+five+x+y3)+dy,zero),pd('M','y')+eq+four+x+plus+twelve+y3+eq+pd('N','x')+o('≠')),'M_y=4x+12y³, N_x=4x+15y³. Fark −3y³ sıfır değildir. Tek başına x’e veya y’ye bağlı bir integrasyon çarpanı da yoktur; terimleri gruplara ayır.','M_y=4x+12y³ and N_x=4x+15y³. The difference −3y³ is nonzero. No integrating factor depending on x or y alone exists either; split the terms into groups.'),
 step('2. İki grup kur','2. Build two groups',lines(p(four+xy+dx+plus+two+x2+dy)+plus+p(three+y4+dx+plus+five+x+y3+dy)+eq+zero),'Birinci grup (4xy dx+2x²dy), ikinci grup (3y⁴dx+5xy³dy). Her grubu ayrı ayrı tam hale getirip ortak bir μ bulacağız.','The first group is (4xy dx+2x²dy); the second is (3y⁴dx+5xy³dy). We make each group exact separately, then match a common μ.'),
 step('3. Grupların çarpanları','3. Factors for the groups',lines(pd('M','y')+eq+four+x+eq+pd('N','x')+o('⇒')+two+d(x2+y),f(seven,five+x)+o('⇒')+sub(mu,'2')+eq+pow(x,f(seven,five))),'Birinci grup tamdır: 4xy dx+2x²dy=2d(x²y), yani v₁=x²y ve μ₁=1. İkinci grupta (M_y−N_x)/N=7/(5x); μ₂=x^{7/5} seçilince grup x^{12/5}y⁴’ün diferansiyeli olur.','The first group is exact: 4xy dx+2x²dy=2d(x²y), so v₁=x²y and μ₁=1. In the second group (M_y−N_x)/N=7/(5x); choosing μ₂=x^{7/5} makes the group a differential of x^{12/5}y⁴.'),
 step('4. Ortak çarpanı eşleştir','4. Match the common factor',lines(pow(x2+y,v('α'))+eq+pow(x,f(seven,five))+pow(pow(x,f(twelve,five))+y4,v('β')),v('α')+eq+one+o(','),v('β')+eq+f(one,four)+o('⇒')+mu+eq+x2+y),'μ₁g₁(v₁)=μ₂g₂(v₂) yaz. g₁(v₁)=v₁^α, g₂(v₂)=v₂^β alınca üslerden α=1, β=1/4 çıkar. Böylece ortak çarpan μ=x²y olur.','Write μ₁g₁(v₁)=μ₂g₂(v₂). Taking g₁(v₁)=v₁^α and g₂(v₂)=v₂^β gives α=1 and β=1/4 from the exponents. The common factor is μ=x²y.'),
 step('5. Çarp, integre et, doğrula','5. Multiply, integrate, verify',lines(p(four+x3+y2+plus+three+x2+y5)+dx+plus+p(two+x4+y+plus+five+x3+y4)+dy+eq+zero,x4+y2+plus+x3+y5+eq+C),'μ=x²y ile çarpınca terimler x⁴y² ve x³y⁵’in diferansiyelleri olur: d(x⁴y²+x³y⁵)=0. Türevle doğrula; μ’nün sıfır olduğu x=0 veya y=0 dalları ayrıca incelenir.','Multiplying by μ=x²y turns the terms into differentials of x⁴y² and x³y⁵: d(x⁴y²+x³y⁵)=0. Verify by differentiation; the branches x=0 or y=0 where μ vanishes need separate inspection.')
];

const example13=[
 step('1. Tamlık testi (1 puan)','1. Exactness test (1 point)',lines(pd('M','y')+eq+twelve+xy+plus+four+x3+eq+pd('N','x')),'M=6xy²+4x³y, N=6x²y+x⁴+e^y. M_y=N_x olduğundan denklem tamdır; potansiyel fonksiyon vardır.','M=6xy²+4x³y and N=6x²y+x⁴+e^y. Since M_y=N_x, the equation is exact and a potential exists.'),
 step('2. M’yi integre et (1 puan)','2. Integrate M (1 point)',v('u')+eq+three+x2+y2+plus+x4+y+plus+v('g')+p(y),'x’e göre integre et: ∫(6xy²+4x³y)dx=3x²y²+x⁴y. Sabit g(y) henüz bilinmiyor.','Integrate with respect to x: ∫(6xy²+4x³y)dx=3x²y²+x⁴y. The constant g(y) is still unknown.'),
 step('3. u_y=N eşleştir (1 puan)','3. Match u_y=N (1 point)',lines(pd('u','y')+eq+six+x2+y+plus+x4+plus+prime('g')+p(y),prime('g')+p(y)+eq+expm(y)),'u_y=6x²y+x⁴+g′(y) olmalı; N ile karşılaştırınca g′(y)=e^y.','u_y must equal 6x²y+x⁴+g′(y); comparing with N gives g′(y)=e^y.'),
 step('4. Potansiyel ve aile (1 puan)','4. Potential and family (1 point)',three+x2+y2+plus+x4+y+plus+expm(y)+eq+C,'g=e^y olduğundan u=3x²y²+x⁴y+e^y. Genel çözüm u=C’dir.','Since g=e^y, u=3x²y²+x⁴y+e^y. The general solution is u=C.'),
 step('5. Doğrulama ve bölge (1 puan)','5. Verification and domain (1 point)',lines(pd('u','x')+eq+v('M')+o(','),pd('u','y')+eq+v('N')),'u_x=M ve u_y=N olduğundan du=0 asıl denklemi verir. Hiçbir yere bölünmediği için tekil dal yoktur; çözüm her (x,y) için örtüktür.','Since u_x=M and u_y=N, du=0 recovers the original equation. No division occurred, so there is no singular branch; the solution is implicit for every (x,y).')
];

const example18=[
 step('1. Standart biçim ve fark (1 puan)','1. Standard form and difference (1 point)',lines(pd('M','y')+eq+two+x+minus+two+y+plus+two+o(','),pd('N','x')+eq+two,o('⇒')+pd('M','y')+minus+pd('N','x')+eq+two+p(x+minus+y)),'M=y(2x−y+2), N=2(x−y). M_y−N_x=2x−2y+2−2=2(x−y). Denklem tam değildir.','M=y(2x−y+2) and N=2(x−y). Then M_y−N_x=2x−2y+2−2=2(x−y). The equation is not exact.'),
 step('2. μ(x) formülü (1 puan)','2. The μ(x) formula (1 point)',lines(f(pd('M','y')+minus+pd('N','x'),v('N'))+eq+one,f(pd('M','y')+minus+pd('N','x'),v('N'))+eq+f(one,v('N'))+f(v('d')+mu,v('d')+x)+o('⇒')+mu+eq+expm(x)),'Bölüm yalnız x’e bağlıdır: 2(x−y)/[2(x−y)]=1. μ(x)=exp(∫1 dx)=e^x.','The quotient depends only on x: 2(x−y)/[2(x−y)]=1. Hence μ(x)=exp(∫1 dx)=e^x.'),
 step('3. Denklemi çarp (1 puan)','3. Multiply the equation (1 point)',expm(x)+p(y+p(two+x+minus+y+plus+two)+dx+plus+two+p(x+minus+y)+dy)+eq+zero,'Her terimi e^x ile çarp. Yeni M=e^x y(2x−y+2), N=2e^x(x−y) tamdır.','Multiply every term by e^x. The new M=e^x y(2x−y+2) and N=2e^x(x−y) are exact.'),
 step('4. Potansiyeli kur (1 puan)','4. Build the potential (1 point)',expm(x)+y+p(two+x+minus+y)+eq+C,'e^x y(2x−y) fonksiyonunun diferansiyeli çarpmadan sonraki denklemi verir. Genel çözüm bu düzey eğrisidir.','The differential of e^x y(2x−y) gives the multiplied equation. The general solution is this level curve.'),
 step('5. Doğrula, dalları yaz (1 puan)','5. Verify and state branches (1 point)',lines(y+eq+zero+o(','),y+eq+two+x),'y=0 ve y=2x asıl denklemin çözümleridir; μ pozitif olduğu için bunlar kaybolmaz. Başlangıç verisi bu iki doğru üzerinde seçilemez. Doğrulama için örtük türev al.','y=0 and y=2x are solutions of the original equation; since μ is positive they are not lost. Initial data cannot lie on these two lines. Verify by implicit differentiation.')
];

const example21=[
 step('1. Tamlığı sına (1 puan)','1. Test exactness (1 point)',lines(pd('M','y')+eq+one+o(','),pd('N','x')+eq+four+xy+minus+one,o('⇒')+pd('M','y')+minus+pd('N','x')+o('≠')+zero),'M=3x⁴+y, N=2x²y−x. M_y=1, N_x=4xy−1; denklem tam değildir.','M=3x⁴+y and N=2x²y−x. Here M_y=1 and N_x=4xy−1; the equation is not exact.'),
 step('2. Terimleri yeniden düzenle (1 puan)','2. Rearrange the terms (1 point)',x2+p(three+x2+dx+plus+two+y+dy)+plus+p(y+dx+minus+x+dy)+eq+zero,'x²(3x²dx+2y dy)+(y dx−x dy)=0. İlk parça x³+y²’nin, ikinci parça y/x’in diferansiyeline benzer.','x²(3x²dx+2y dy)+(y dx−x dy)=0. The first part resembles the differential of x³+y²; the second resembles that of y/x.'),
 step('3. x²’ye böl, tanı (1 puan)','3. Divide by x² and recognize (1 point)',lines(three+x2+dx+plus+two+y+dy+plus+f(y+dx+minus+x+dy,x2)+eq+zero,d(x3)+plus+d(y2)+minus+d(f(y,x))+eq+zero),'x²’ye bölünce (y dx−x dy)/x²=−d(y/x) olur. Böylece denklem üç tam diferansiyelin toplamıdır.','Dividing by x² gives (y dx−x dy)/x²=−d(y/x). The equation is therefore a sum of three exact differentials.'),
 step('4. İntegre et (1 puan)','4. Integrate (1 point)',x3+plus+y2+minus+f(y,x)+eq+C,'d(x³+y²−y/x)=0 olduğundan genel çözüm x³+y²−y/x=C. Burada μ=1/x² kullanılmıştır.','Since d(x³+y²−y/x)=0, the general solution is x³+y²−y/x=C. Here μ=1/x² was used.'),
 step('5. Doğrula, x≠0 yaz (1 puan)','5. Verify and state x≠0 (1 point)',lines(pd('u','x')+eq+three+x2+plus+f(y,x2)+o(','),pd('u','y')+eq+two+y+minus+f(one,x)),'u_x=(3x⁴+y)/x² ve u_y=(2x²y−x)/x²; bu, x² ile çarpılmış asıl denklemdir. x=0 başlangıçta tanımsızdır; çözüm aralığı x≠0 bölgesindedir.','u_x=(3x⁴+y)/x² and u_y=(2x²y−x)/x², which is the original equation multiplied by x². x=0 is undefined in the original; the solution interval lies in x≠0.')
];

export const exactnessStudy={
 title:T('Tam diferansiyel, çözümü tek bir potansiyel fonksiyona indirir.','An exact differential reduces the solution to a single potential function.'),
 intro:T('Önce M_y=N_x testini yap. Tam değilse μ(x), μ(y), inceleme veya gruplar yöntemlerinden hangisinin uyduğunu tahmin et; sonra iki tam örneği ara işlemleriyle türet ve dört ailede düzey eğrilerini karşılaştır.','Run the M_y=N_x test first. If the equation is not exact, predict whether μ(x), μ(y), inspection, or grouping fits; then derive two exact examples with intermediate work and compare level curves in four families.'),
 paths:[
  {title:T('Örnek 2.13 · Tam denklem','Example 2.13 · Exact equation'),prompt:T('M_y=N_x eşitliği neden bir potansiyel fonksiyonun varlığını garanti eder?','Why does M_y=N_x guarantee a potential function?'),steps:exactPath,reflection:T('Hangi adımda integrasyon sabiti y’ye bağlı bir fonksiyona dönüşür?','At which step does the integration constant become a function of y?')},
  {title:T('Örnek 2.26 · Gruplarla çarpan','Example 2.26 · Factors by groups'),prompt:T('İki grubu ayrı ayrı tam yapıp ortak bir μ’de nasıl buluşturursun?','How do you make two groups exact separately and match them at a common μ?'),steps:groupsPath,reflection:T('Grupların çarpanları neden tek başına asıl denklemin çarpanı değildir?','Why are the group factors not automatically factors of the whole equation?')}
 ],
 predictions:[
  {id:'exact-test',question:T('(2x+y)dx+(x+2y)dy=0 için M_y−N_x kaçtır?','For (2x+y)dx+(x+2y)dy=0, what is M_y−N_x?'),context:T('M=2x+y ve N=x+2y.','M=2x+y and N=x+2y.'),choices:T(['0','2','−2'],['0','2','−2']),answer:0,reason:T('M_y=1 ve N_x=1 olduğundan fark sıfırdır; denklem tamdır.','M_y=1 and N_x=1, so the difference is zero and the equation is exact.'),math:pd('M','y')+minus+pd('N','x')+eq+zero,try:T('Aşağıdaki tam ailede düzey eğrisinin neden elips olduğunu izle.','Follow why the level curve is an ellipse in the exact family below.')},
  {id:'mu-x',question:T('y(2x−y+2)dx+2(x−y)dy=0 için (M_y−N_x)/N=1 ise μ(x) nedir?','For y(2x−y+2)dx+2(x−y)dy=0, if (M_y−N_x)/N=1, what is μ(x)?'),context:T('μ(x)=exp(∫[(M_y−N_x)/N]dx).','μ(x)=exp(∫[(M_y−N_x)/N]dx).'),choices:T(['e^x','e^{−x}','x'],['e^x','e^{−x}','x']),answer:0,reason:T('İntegral ∫1 dx=x olduğundan μ=e^x. İşareti ters çevirmek sık hatadır.','The integral is ∫1 dx=x, so μ=e^x. Reversing the sign is a common error.'),math:mu+eq+expm(x),try:T('Aşağıdaki μ(x) ailesinde çarpanın düzey eğrisini nasıl değiştirdiğini gör.','See how the factor changes the level curve in the μ(x) family below.')}
 ]
};

export const exactnessClinic={examBlueprint:[
 {step:T('1 · Tamlığı sına','1 · Test exactness'),detail:T('M_y ve N_x’i hesapla. Eşitse potansiyel kur; değilse farkı ve hangi değişkene bölünebildiğini incele.','Compute M_y and N_x. If equal, build the potential; if not, inspect the difference and which variable it can be divided by.')},
 {step:T('2 · Çarpanı seç','2 · Choose the factor'),detail:T('μ(x)=exp∫(M_y−N_x)/N dx, μ(y)=exp∫(N_x−M_y)/M dy. İkisi de olmuyorsa inceleme formüllerini veya grupları dene.','Use μ(x)=exp∫(M_y−N_x)/N dx or μ(y)=exp∫(N_x−M_y)/M dy. If neither works, try inspection formulas or grouping.')},
 {step:T('3 · Potansiyeli kur, doğrula, dalları yaz','3 · Build the potential, verify, state branches'),detail:T('u_x=M, u_y=N olacak şekilde integre et; u=C yaz. Türevle doğrula; μ’nün sıfır olduğu veya paydanın sıfırlandığı dalları ayrıca incele.','Integrate so that u_x=M and u_y=N, then write u=C. Verify by differentiation; inspect branches where μ vanishes or a denominator is zero.')}
],examClinic:[
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('Tam denklem: polinom potansiyeli','Exact equation: a polynomial potential'),statement:T('(6xy²+4x³y)dx+(6x²y+x⁴+e^y)dy=0 denklemini çöz ve türevle doğrula.','Solve (6xy²+4x³y)dx+(6x²y+x⁴+e^y)dy=0 and verify by differentiation.'),trap:T('u_y’yi N ile eşleştirirken x⁴ terimini tekrar integre etme; x⁴ zaten x integrasyonundan gelir, yalnız g′(y)=e^y kalır.','When matching u_y with N, do not integrate x⁴ again; x⁴ already came from the x-integration, leaving only g′(y)=e^y.'),steps:example13},
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('μ(x)=e^x ile tam yap','Make it exact with μ(x)=e^x'),statement:T('y(2x−y+2)dx+2(x−y)dy=0 denklemini μ(x) bularak çöz; y=0 ve y=2x dallarını belirt.','Solve y(2x−y+2)dx+2(x−y)dy=0 by finding μ(x); state the branches y=0 and y=2x.'),trap:T('(M_y−N_x)/N bölümünü hesaplamadan μ=e^x yazma; bölümün gerçekten 1 olduğunu göster.','Do not write μ=e^x without computing (M_y−N_x)/N; show that the quotient is actually 1.'),steps:example18},
 {badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),title:T('İnceleme: üç diferansiyel','Inspection: three differentials'),statement:T('(3x⁴+y)dx+(2x²y−x)dy=0 denklemini inceleme yöntemiyle çöz.','Solve (3x⁴+y)dx+(2x²y−x)dy=0 by inspection.'),trap:T('(y dx−x dy)/x² ifadesinin d(y/x) değil −d(y/x) olduğunu kaçırma.','Do not miss that (y dx−x dy)/x² is −d(y/x), not d(y/x).'),steps:example21},
 {badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),title:T('Gruplarla ortak çarpan','A common factor by groups'),statement:T('(4xy+3y⁴)dx+(2x²+5xy³)dy=0 denklemini gruplar yöntemiyle çöz.','Solve (4xy+3y⁴)dx+(2x²+5xy³)dy=0 by the method of groups.'),trap:T('Birinci grubun μ₁=1 çarpanını ikinci gruba da uygulama; ikinci grubun kendi çarpanı x^{7/5}’tir.','Do not apply the first group’s factor μ₁=1 to the second; the second group has its own factor x^{7/5}.'),steps:groupsPath}
]};
