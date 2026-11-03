import {T,step,v,n,o,p,f,pow,prime,eq,plus,minus,x,y,C,fn,exp,integral,dx,dy,abs,lines,r} from '../../../study/math.js';
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),twelve=n(12);
const x2=pow(x,two),x3=pow(x,three),x4=pow(x,four),y2=pow(y,two),y3=pow(y,three),y4=pow(y,four);
const d=s=>v('d')+s;
const ln=s=>fn('ln',s);
const sin=s=>fn('sin',s);
const cos=s=>fn('cos',s);
const tan=s=>fn('tan',s);
const sec=s=>fn('sec',s);
const expm=s=>exp(s);
const paren=s=>p(s);
const eqn=(a,b)=>a+eq+b;
const mu=v('μ'),u=v('u'),P=v('P'),Q=v('Q'),nvar=v('n');
const powMinus=(a,b)=>pow(a,minus+b);
const e2y=expm(two+y);
const noteq=o('≠');

export const linearFamilies={
 'linear-tan':{
  name:'y′ = 1 + 3y tan x',
  initialLabel:T('A · y(0)','A · y(0)'),
  method:mu+eq+pow(cos(x),three),
  solution:y+eq+pow(sec(x),three)+p(sin(x)+minus+f(pow(sin(x),three),three)+plus+C),
  note:T('Doğrusal denklemde μ=cos³x olur. A ve B, y(0) verisiyle farklı C düzeyleri seçer; x=±π/2 kutupları dışlanır.','For the linear equation μ=cos³x. A and B choose different levels C through y(0); the poles x=±π/2 are excluded.'),
  excluded:T('Çözüm aralığı (−π/2,π/2); cos x=0 noktalarında denklem tanımsızdır.','The solution interval is (−π/2,π/2); the equation is undefined where cos x=0.')
 },
 'linear-y':{
  name:'y dx − (e^y+2xy−2x) dy = 0',
  initialLabel:T('A · x(1)','A · x(1)'),
  method:mu+eq+y2+expm(minus+two+y),
  solution:x+y2+eq+C+e2y+minus+expm(y)+p(y+plus+one),
  note:T('x bağımlı değişken olur. y=0 ayrı bir çözümdür; x(1) verisi y>0 dalını seçer ve μ=y²e^{−2y} kullanılır.','x becomes the dependent variable. y=0 is a separate solution; the datum x(1) selects the branch y>0, where μ=y²e^{−2y}.'),
  excluded:T('y=0 denklemde ayrıca çözümdür; genel çözümde C=1 ile yakalanır. y<0 dalı ayrı ele alınır.','y=0 is also a solution; it is recovered from the general solution with C=1. The branch y<0 is treated separately.')
 },
 'bernoulli-33':{
  name:'2xyy′ = y² − 2x³',
  initialLabel:T('A · y(1)','A · y(1)'),
  method:nvar+eq+minus+one+o(',')+u+eq+y2,
  solution:y2+eq+x+p(C+minus+x2),
  note:T('Bernoulli denkleminde n=−1 ve u=y² olur. A ve B üst dalda farklı y(1) verileri seçer; bağlı aralık 0<x<√C’dir.','For the Bernoulli equation n=−1 and u=y². A and B choose different y(1) data on the upper branch; the connected interval is 0<x<√C.'),
  excluded:T('y(1)>0 üst dalı seçer. x=0 ve y=0 başlangıçta tekildir; alt dal y=−√(x(C−x²)) ayrıca yazılır.','y(1)>0 selects the upper branch. x=0 and y=0 are singular in the original equation; the lower branch y=−√(x(C−x²)) is stated separately.')
 },
 'bernoulli-34':{
  name:'3y dx − (x+3x⁴y ln y) dy = 0',
  initialLabel:T('A · x(1)','A · x(1)'),
  method:nvar+eq+four+o(',')+u+eq+powMinus(x,three),
  solution:x3+eq+f(four+y,four+C+minus+three+y2+p(two+ln(y)+minus+one)),
  note:T('Bernoulli denkleminde n=4 ve u=x^{−3} olur. x(1) verisi y>0 dalını seçer; μ=y ve iki kez kısmi integrasyon kullanılır.','For the Bernoulli equation n=4 and u=x^{−3}. The datum x(1) selects the branch y>0; use μ=y and integrate by parts twice.'),
  excluded:T('ln y için y>0 gerekir. y=1 başlangıç noktasıdır; x(1)>0 pozitif dalı seçer.','y>0 is required by ln y. y=1 is the initial point; x(1)>0 selects the positive branch.')
 }
};

const linearPath=[
 step('1. Standart biçime getir','1. Put in standard form',eqn(prime(y)+minus+three+tan(x)+y,one),'Denklem y′+P(x)y=Q(x) biçimindedir; P(x)=−3tan x ve Q(x)=1. Doğrusal terimler y ve y′ dir.','The equation has the form y′+P(x)y=Q(x) with P(x)=−3tan x and Q(x)=1. The linear terms are y and y′.'),
 step('2. İntegrasyon çarpanını kur','2. Build the integrating factor',lines(integral(P+dx)+eq+three+ln(abs(cos(x)))+o(','),mu+eq+expm(integral(P+dx))+eq+pow(cos(x),three)),'∫P dx=∫−3tan x dx=3ln|cos x|. Bu yüzden μ=e^{3ln|cos x|}=cos³x olur; işaret mutlak değer içinde kalır.','∫P dx=∫−3tan x dx=3ln|cos x|. Hence μ=e^{3ln|cos x|}=cos³x; the sign stays inside the absolute value.'),
 step('3. Çarp ve tam diferansiyele getir','3. Multiply and form an exact differential',d(y+pow(cos(x),three))+eq+pow(cos(x),three)+dx,'cos³x ile çarpınca sol taraf d(y cos³x) olur: cos³x y′−3cos²x sin x y=(y cos³x)′. Sağ taraf cos³x dx kalır.','Multiplying by cos³x turns the left side into d(y cos³x): cos³x y′−3cos²x sin x y=(y cos³x)′. The right side remains cos³x dx.'),
 step('4. Trigonometrik integrali al','4. Evaluate the trigonometric integral',lines(integral(pow(cos(x),three)+dx)+eq+integral(p(one+minus+pow(sin(x),two))+d(sin(x))),integral(pow(cos(x),three)+dx)+eq+sin(x)+minus+f(pow(sin(x),three),three)),'cos³x=(1−sin²x)cos x yazıp u=sin x alınca ∫(1−u²)du=u−u³/3 olur. Böylece ∫cos³x dx=sin x−sin³x/3.','Write cos³x=(1−sin²x)cos x and set u=sin x to get ∫(1−u²)du=u−u³/3. Thus ∫cos³x dx=sin x−sin³x/3.'),
 step('5. Çöz, bölgeyi ve doğrulamayı yaz','5. Solve, state the domain and verify',lines(y+pow(cos(x),three)+eq+sin(x)+minus+f(pow(sin(x),three),three)+plus+C,y+eq+pow(sec(x),three)+p(sin(x)+minus+f(pow(sin(x),three),three)+plus+C)),'y cos³x=sin x−sin³x/3+C olduğundan y=sec³x(sin x−sin³x/3+C). cos x=0 kutupları dışlanır. Türev alıp y′=1+3y tan x ile karşılaştır.','Since y cos³x=sin x−sin³x/3+C, y=sec³x(sin x−sin³x/3+C). The poles cos x=0 are excluded. Differentiate and compare with y′=1+3y tan x.')
];

const bernoulliPath=[
 step('1. Bernoulli biçimini tanı','1. Recognize the Bernoulli form',lines(eqn(two+x+y+prime(y),y2+minus+two+x3),eqn(prime(y)+minus+f(one,two+x)+y,minus+x2+powMinus(y,one))),'İki tarafı 2xy’ye bölünce y′−(1/(2x))y=−x²y^{−1} çıkar. Bu, n=−1 olan bir Bernoulli denklemidir.','Dividing both sides by 2xy gives y′−(1/(2x))y=−x²y^{−1}. This is a Bernoulli equation with n=−1.'),
 step('2. y ile çarp','2. Multiply by y',eqn(y+prime(y)+minus+f(one,two+x)+y2,minus+x2),'n=−1 olduğu için y ile çarpmak y^{1−n}=y² terimini hazırlar. Denklem yy′−(1/(2x))y²=−x² olur.','Since n=−1, multiplying by y prepares the term y^{1−n}=y². The equation becomes yy′−(1/(2x))y²=−x².'),
 step('3. u=y² dönüşümünü uygula','3. Apply u=y²',lines(u+eq+y2+o(',')+prime(u)+eq+two+y+prime(y),prime(u)+minus+f(one,x)+u+eq+minus+two+x2),'u′=2yy′ olduğundan yy′=u′/2. Yerine koyunca (1/2)u′−(1/(2x))u=−x², yani u′−(1/x)u=−2x² doğrusal denklemi çıkar.','Since u′=2yy′, yy′=u′/2. Substitution gives (1/2)u′−(1/(2x))u=−x², i.e. the linear equation u′−(1/x)u=−2x².'),
 step('4. Doğrusal denklemi çöz','4. Solve the linear equation',lines(mu+eq+f(one,x)+o(','),d(f(u,x))+eq+minus+two+x+dx,f(u,x)+eq+minus+x2+plus+C),'P=−1/x için μ=e^{−ln x}=1/x. (u/x)′=−2x olur; integre edince u/x=−x²+C, yani u=x(C−x²) elde edilir.','For P=−1/x, μ=e^{−ln x}=1/x. Then (u/x)′=−2x; integrating gives u/x=−x²+C, so u=x(C−x²).'),
 step('5. Başlangıç verisi, dal ve bölge','5. Initial datum, branch and domain',lines(y2+eq+x+p(C+minus+x2),four+eq+one+p(C+minus+one)+o('⇒')+C+eq+five),'y(1)=2 verisi C=5 verir: y²=x(5−x²). Üst dal y=+√(x(5−x²)) seçilir; bağlı aralık 1<x<√5’tir. Türevle doğrula.','The datum y(1)=2 gives C=5: y²=x(5−x²). The upper branch y=+√(x(5−x²)) is selected; the connected interval is 1<x<√5. Verify by differentiation.')
];

const example30=[
 step('1. Standart biçim (1 puan)','1. Standard form (1 point)',eqn(prime(y)+minus+three+tan(x)+y,one),'P(x)=−3tan x, Q(x)=1. Denklem doğrusaldır; y ve y′ birinci kuvvette görünür.','P(x)=−3tan x and Q(x)=1. The equation is linear; y and y′ appear to the first power.'),
 step('2. Çarpan (1 puan)','2. Integrating factor (1 point)',lines(integral(P+dx)+eq+three+ln(abs(cos(x))),mu+eq+pow(cos(x),three)),'∫P dx=3ln|cos x| olduğundan μ=e^{3ln|cos x|}=cos³x. Mutlak değeri atmadan önce cos x’in işaretini bölgeye göre düşün.','Since ∫P dx=3ln|cos x|, μ=e^{3ln|cos x|}=cos³x. Before dropping the absolute value, consider the sign of cos x on the interval.'),
 step('3. Çarp ve grupla (1 puan)','3. Multiply and group (1 point)',d(y+pow(cos(x),three))+eq+pow(cos(x),three)+dx,'cos³x ile çarpınca sol taraf (y cos³x)′ olur. Böylece d(y cos³x)=cos³x dx tam diferansiyeli elde edilir.','Multiplying by cos³x makes the left side (y cos³x)′. Thus d(y cos³x)=cos³x dx.'),
 step('4. İntegre et (1 puan)','4. Integrate (1 point)',integral(pow(cos(x),three)+dx)+eq+sin(x)+minus+f(pow(sin(x),three),three),'∫cos³x dx=∫(1−sin²x)d(sin x)=sin x−sin³x/3. İntegral sabiti C eklenir.','∫cos³x dx=∫(1−sin²x)d(sin x)=sin x−sin³x/3. Add the constant C.'),
 step('5. Çöz ve doğrula (1 puan)','5. Solve and verify (1 point)',lines(y+eq+pow(sec(x),three)+p(sin(x)+minus+f(pow(sin(x),three),three)+plus+C),prime(y)+eq+one+plus+three+y+tan(x)),'y=sec³x(sin x−sin³x/3+C). Türev, y′=1+3y tan x asıl denklemini verir. cos x=0 kutupları çözüm aralığından çıkarılır.','y=sec³x(sin x−sin³x/3+C). Differentiation recovers y′=1+3y tan x. The poles cos x=0 are removed from the solution interval.')
];

const example31=[
 step('1. y=0 dalı ve yeniden düzenleme (1 puan)','1. The y=0 branch and rearrangement (1 point)',lines(y+eq+zero,eqn(f(d(x),d(y))+f(two+p(one+minus+y),y)+x,f(expm(y),y))),'y=0 asıl denklemi sağlar. y≠0 için x’i y’nin fonksiyonu olarak çöz: dx/dy+[2(1−y)/y]x=e^y/y.','y=0 satisfies the original equation. For y≠0, solve for x as a function of y: dx/dy+[2(1−y)/y]x=e^y/y.'),
 step('2. Çarpanı hesapla (1 puan)','2. Compute the factor (1 point)',lines(integral(P+dy)+eq+two+ln(abs(y))+minus+two+y,mu+eq+y2+expm(minus+two+y)),'P(y)=2(1−y)/y=2/y−2. ∫P dy=2ln|y|−2y, dolayısıyla μ=e^{2ln|y|−2y}=y²e^{−2y}.','P(y)=2(1−y)/y=2/y−2. ∫P dy=2ln|y|−2y, so μ=e^{2ln|y|−2y}=y²e^{−2y}.'),
 step('3. Sağ tarafı integre et (1 puan)','3. Integrate the right side (1 point)',lines(mu+Q+eq+y+expm(minus+y),integral(p(y+expm(minus+y))+dy)+eq+minus+p(y+plus+one)+expm(minus+y)),'μQ=y²e^{−2y}·e^y/y=y e^{−y}. Kısmi integrasyonla ∫y e^{−y}dy=−(y+1)e^{−y} olur.','μQ=y²e^{−2y}·e^y/y=y e^{−y}. Integration by parts gives ∫y e^{−y}dy=−(y+1)e^{−y}.'),
 step('4. Genel çözüm ve C=1 (1 puan)','4. General solution and C=1 (1 point)',lines(x+y2+expm(minus+two+y)+eq+C+minus+p(y+plus+one)+expm(minus+y),x+y2+eq+C+e2y+minus+expm(y)+p(y+plus+one)),'x y²e^{−2y}=C−(y+1)e^{−y}; e^{2y} ile çarpınca x y²=C e^{2y}−e^y(y+1). y=0 dalı C=1 ile genel çözüme dahil olur.','x y²e^{−2y}=C−(y+1)e^{−y}; multiplying by e^{2y} gives x y²=C e^{2y}−e^y(y+1). The branch y=0 is included in the general solution with C=1.'),
 step('5. Doğrula ve bölgeyi yaz (1 puan)','5. Verify and state the domain (1 point)',lines(f(d(x),d(y))+eq+f(expm(y),y)+two+x+p(one+minus+f(one,y))+o(','),y+eq+zero+o(','),y+noteq+zero),'Örtük türev asıl denklemi verir. y=0 ayrıca yazılır; x(1) verisi y>0 dalını seçer ve y=0’dan geçemez.','Implicit differentiation recovers the original equation. State y=0 separately; the datum x(1) selects y>0 and cannot cross y=0.')
];

const example32=[
 step('1. Rolleri değiştir (1 puan)','1. Exchange the roles (1 point)',eqn(f(d(x),d(y))+minus+cos(y)+x,sin(two+y)),'dy/dx=1/(x cos y+sin2y) ifadesini ters çevir: dx/dy−cos y·x=sin2y. cos y=0 noktaları dışlanır.','Invert dy/dx=1/(x cos y+sin2y): dx/dy−cos y·x=sin2y. Points with cos y=0 are excluded.'),
 step('2. Çarpan (1 puan)','2. Integrating factor (1 point)',lines(integral(P+dy)+eq+minus+sin(y),mu+eq+expm(minus+sin(y))),'P(y)=−cos y olduğundan ∫P dy=−sin y ve μ=e^{−sin y}. Ters çarpan e^{−∫P}=e^{sin y} olur.','Since P(y)=−cos y, ∫P dy=−sin y and μ=e^{−sin y}. The reciprocal factor is e^{−∫P}=e^{sin y}.'),
 step('3. Kısmi integrasyon (1 puan)','3. Integration by parts (1 point)',lines(integral(sin(two+y)+expm(minus+sin(y))+dy)+eq+integral(two+sin(y)+cos(y)+expm(minus+sin(y))+dy),integral(sin(two+y)+expm(minus+sin(y))+dy)+eq+minus+two+expm(minus+sin(y))+p(sin(y)+plus+one)),'sin2y=2sin y cos y ve du=cos y dy al. ∫2u e^{−u}du=−2e^{−u}(u+1); u=sin y geri konur.','Take sin2y=2sin y cos y and du=cos y dy. Then ∫2u e^{−u}du=−2e^{−u}(u+1); restore u=sin y.'),
 step('4. Çözümü kur (1 puan)','4. Build the solution (1 point)',lines(x+eq+expm(sin(y))+p(C+minus+two+expm(minus+sin(y))+p(sin(y)+plus+one)),x+eq+C+expm(sin(y))+minus+two+p(sin(y)+plus+one)),'x e^{−sin y}=C−2e^{−sin y}(sin y+1). e^{sin y} ile çarpınca x=C e^{sin y}−2(sin y+1) elde edilir.','x e^{−sin y}=C−2e^{−sin y}(sin y+1). Multiplying by e^{sin y} gives x=C e^{sin y}−2(sin y+1).'),
 step('5. Doğrula ve cos y≠0 yaz (1 puan)','5. Verify and state cos y≠0 (1 point)',lines(f(d(x),d(y))+minus+cos(y)+x+eq+sin(two+y)+o(','),cos(y)+noteq+zero),'Türev asıl ters denklemi verir. cos y=0 olduğunda dx/dy tanımsızdır; başlangıç verisi bu noktalardan seçilemez.','Differentiation recovers the inverted equation. When cos y=0, dx/dy is undefined; initial data cannot be chosen at those points.')
];

const example33=[
 step('1. Bernoulli biçimi (1 puan)','1. Bernoulli form (1 point)',lines(eqn(two+x+y+prime(y),y2+minus+two+x3),nvar+eq+minus+one+o(',')+u+eq+y2),'2xy’ye bölünce y′−(1/(2x))y=−x²y^{−1}. Bu n=−1 Bernoulli denklemidir; u=y^{1−n}=y² seçilir.','Dividing by 2xy gives y′−(1/(2x))y=−x²y^{−1}. This is a Bernoulli equation with n=−1; choose u=y^{1−n}=y².'),
 step('2. y ile çarp (1 puan)','2. Multiply by y',eqn(y+prime(y)+minus+f(one,two+x)+y2,minus+x2),'Her terimi y ile çarp: yy′−(1/(2x))y²=−x². Bu adım y^{−1} terimini kaldırır.','Multiply every term by y: yy′−(1/(2x))y²=−x². This removes the y^{−1} term.'),
 step('3. Doğrusal denkleme geç (1 puan)','3. Pass to a linear equation',lines(u+eq+y2+o(',')+prime(u)+eq+two+y+prime(y),prime(u)+minus+f(one,x)+u+eq+minus+two+x2),'u′=2yy′ olduğundan yy′=u′/2. Böylece u′−(1/x)u=−2x² doğrusal denklemi çıkar.','Since u′=2yy′, yy′=u′/2. This gives the linear equation u′−(1/x)u=−2x².'),
 step('4. Çöz (1 puan)','4. Solve (1 point)',lines(mu+eq+f(one,x)+o(','),u+eq+x+p(C+minus+x2)),'μ=1/x ile (u/x)′=−2x; integre edince u/x=−x²+C ve u=x(C−x²).','With μ=1/x, (u/x)′=−2x; integrating gives u/x=−x²+C and u=x(C−x²).'),
 step('5. Başlangıç verisi ve dal (1 puan)','5. Initial datum and branch (1 point)',lines(y2+eq+x+p(five+minus+x2),y+eq+sqrt(x+p(five+minus+x2))),'y(1)=2 verisi C=5 verir. y²=x(5−x²); üst dal seçilir. Bağlı aralık 1<x<√5, çünkü x=√5’te y=0 asıl denklemi sağlamaz.','The datum y(1)=2 gives C=5. y²=x(5−x²); the upper branch is selected. The connected interval is 1<x<√5 because y=0 at x=√5 does not satisfy the original equation.')
];

const example34=[
 step('1. Yeniden düzenle ve n’yi bul (1 puan)','1. Rearrange and find n (1 point)',lines(eqn(three+y+f(d(x),d(y))+minus+x,three+x4+y+ln(y)),eqn(f(d(x),d(y))+minus+f(one,three+y)+x,x4+ln(y))),'3y’ye bölünce dx/dy−x/(3y)=x⁴ln y. Bu n=4 olan bir Bernoulli denklemidir.','Dividing by 3y gives dx/dy−x/(3y)=x⁴ln y. This is a Bernoulli equation with n=4.'),
 step('2. x⁴’e böl ve u’yu seç (1 puan)','2. Divide by x⁴ and choose u (1 point)',lines(powMinus(x,four)+f(d(x),d(y))+minus+f(one,three+y)+powMinus(x,three)+eq+ln(y),u+eq+powMinus(x,three)+o(',')+prime(u)+eq+minus+three+powMinus(x,four)+f(d(x),d(y))),'x⁴’e bölünce x^{−4}x′−(1/(3y))x^{−3}=ln y. u=x^{−3} için u′=−3x^{−4}x′ olur.','Dividing by x⁴ gives x^{−4}x′−(1/(3y))x^{−3}=ln y. For u=x^{−3}, u′=−3x^{−4}x′.'),
 step('3. Doğrusal denkleme geç (1 puan)','3. Pass to a linear equation',eqn(prime(u)+f(one,y)+u,minus+three+ln(y)),'Yerine koyunca −(1/3)u′−(1/(3y))u=ln y, yani u′+(1/y)u=−3ln y doğrusal denklemi çıkar.','Substitution gives −(1/3)u′−(1/(3y))u=ln y, i.e. the linear equation u′+(1/y)u=−3ln y.'),
 step('4. μ=y ile integre et (1 puan)','4. Integrate with μ=y (1 point)',lines(mu+eq+y+o(','),d(y+u)+eq+minus+three+y+ln(y)+dy,y+u+eq+f(three,four)+y2+p(one+minus+two+ln(y))+plus+C),'μ=e^{∫1/y dy}=y. (yu)′=−3y ln y; kısmi integrasyonla ∫−3y ln y dy=(3/4)y²(1−2ln y).','μ=e^{∫1/y dy}=y. (yu)′=−3y ln y; integration by parts gives ∫−3y ln y dy=(3/4)y²(1−2ln y).'),
 step('5. x’e dön ve doğrula (1 puan)','5. Return to x and verify (1 point)',lines(powMinus(x,three)+eq+f(one,y)+brack(C+minus+f(three,four)+y2+p(two+ln(y)+minus+one)),x3+eq+f(four+y,four+C+minus+three+y2+p(two+ln(y)+minus+one))),'u=x^{−3} yerine konur: x³=4y/[4C−3y²(2ln y−1)]. y>0 gerekir; türev asıl denklemi verir.','Substitute u=x^{−3}: x³=4y/[4C−3y²(2ln y−1)]. y>0 is required; differentiation recovers the original equation.')
];

function sqrt(s){return '<msqrt>'+r(s)+'</msqrt>';}
function brack(s){return o('[')+r(s)+o(']');}

export const linearStudy={
 title:T('Doğrusal denklem tek bir çarpanla çözülür; Bernoulli ise yeni bir değişkenle doğrusallaşır.','A linear equation is solved by one factor; Bernoulli becomes linear through a new variable.'),
 intro:T('Önce denklemi y′+P(x)y=Q(x) biçimine getir. Doğrusalysa μ=e^{∫P dx} çarpanını kur; Bernoulli ise n’yi belirle, u=y^{1−n} dönüşümüyle doğrusal denkleme geç ve kayıp dalları ayrıca yaz. İki yolu ara işlemleriyle türet, sonra dört ailede çözüm eğrilerini karşılaştır.','First put the equation into y′+P(x)y=Q(x). If it is linear, build μ=e^{∫P dx}; if Bernoulli, identify n, pass to a linear equation with u=y^{1−n}, and state lost branches separately. Derive both paths with intermediate work, then compare solution curves in four families.'),
 paths:[
  {title:T('Örnek 2.30 · Doğrusal denklem','Example 2.30 · Linear equation'),prompt:T('μ=cos³x çarpanı denklemi neden tek bir diferansiyele indirir?','Why does the factor μ=cos³x reduce the equation to a single differential?'),steps:linearPath,reflection:T('cos³x integralinde neden u=sin x dönüşümü gerekir?','Why is the substitution u=sin x needed in the integral of cos³x?')},
  {title:T('Örnek 2.33 · Bernoulli IVP','Example 2.33 · Bernoulli IVP'),prompt:T('n=−1 olduğunda u=y² dönüşümü hangi terimi doğrusallaştırır?','When n=−1, which term does u=y² linearize?'),steps:bernoulliPath,reflection:T('y²=x(5−x²) çözümünde neden yalnız üst dalı ve 1<x<√5 aralığını alıyoruz?','Why do we take only the upper branch and 1<x<√5 in y²=x(5−x²)?')}
 ],
 predictions:[
  {id:'mu-tan',question:T('y′−3tan x·y=1 için μ(x) nedir?','For y′−3tan x·y=1, what is μ(x)?'),context:T('P(x)=−3tan x ve μ=e^{∫P dx}.','P(x)=−3tan x and μ=e^{∫P dx}.'),choices:T(['cos³x','sec³x','cos x'],['cos³x','sec³x','cos x']),answer:0,reason:T('∫−3tan x dx=3ln|cos x| olduğundan μ=e^{3ln|cos x|}=cos³x. sec³x çözümün kendisinde görülen ters çarpandır.','Since ∫−3tan x dx=3ln|cos x|, μ=e^{3ln|cos x|}=cos³x. The factor sec³x is the reciprocal that appears in the solution itself.'),math:mu+eq+pow(cos(x),three),try:T('Aşağıdaki doğrusal ailede μ’nün çözüm eğrisini nasıl düzenlediğini izle.','Follow how μ organizes the solution curve in the linear family below.')},
  {id:'bernoulli-n',question:T('2xyy′=y²−2x³ için n ve u nedir?','For 2xyy′=y²−2x³, what are n and u?'),context:T('Denklemi 2xy’ye böl ve y^{−1} terimini tanı.','Divide by 2xy and identify the y^{−1} term.'),choices:T(['n=−1, u=y²','n=1, u=y','n=2, u=y^{−1}'],['n=−1, u=y²','n=1, u=y','n=2, u=y^{−1}']),answer:0,reason:T('y′−(1/(2x))y=−x²y^{−1} biçiminde n=−1’dir; u=y^{1−n}=y² seçilir.','In the form y′−(1/(2x))y=−x²y^{−1}, n=−1; choose u=y^{1−n}=y².'),math:nvar+eq+minus+one+o(',')+u+eq+y2,try:T('Aşağıdaki Bernoulli ailesinde dalın ve aralığın nasıl değiştiğini gör.','See how the branch and interval change in the Bernoulli family below.')}
 ]
};

export const linearClinic={examBlueprint:[
 {step:T('1 · Standart biçim ve tip','1 · Standard form and type'),detail:T('Denklemi y′+P(x)y=Q(x) biçimine getir. y^n terimi varsa n’yi belirle; n=0 veya 1 ise Bernoulli özel durumu doğrusal/ayrılabilir olur.','Put the equation into y′+P(x)y=Q(x). If a y^n term is present, identify n; for n=0 or 1 the Bernoulli equation reduces to a linear or separable case.')},
 {step:T('2 · Çarpan veya dönüşüm','2 · Factor or substitution'),detail:T('Doğrusalda μ=e^{∫P dx}; Bernoulli’de u=y^{1−n} ve u′+(1−n)Pu=(1−n)Q. x ve y rolleri değişebilir.','For linear, μ=e^{∫P dx}; for Bernoulli, u=y^{1−n} and u′+(1−n)Pu=(1−n)Q. The roles of x and y may be exchanged.')},
 {step:T('3 · Çöz, dalı ve aralığı yaz','3 · Solve, state branch and interval'),detail:T('İntegrali al, başlangıç verisini uygula, kayıp y=0 dalını ve payda/kutup sınırlarını ayrıca yaz. Türevle doğrula.','Integrate, apply the initial datum, and state the lost y=0 branch and any denominator or pole restrictions separately. Verify by differentiation.')}
],examClinic:[
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('Doğrusal denklem: tan x katsayısı','Linear equation: a tan x coefficient'),statement:T('y′=1+3y tan x denklemini çöz; çözüm aralığını ve doğrulamayı yaz.','Solve y′=1+3y tan x; state the solution interval and verify.'),trap:T('μ’yü sec³x sanma. ∫P dx=3ln|cos x| olduğu için μ=cos³x; sec³x çözümdeki ters çarpandır.','Do not take μ=sec³x. Since ∫P dx=3ln|cos x|, μ=cos³x; sec³x is the reciprocal factor in the solution.'),steps:example30},
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('x’i y’nin fonksiyonu olarak çöz','Solve x as a function of y'),statement:T('y dx−(e^y+2xy−2x)dy=0 denklemini çöz; y=0 dalını ve C=1 ilişkisini belirt.','Solve y dx−(e^y+2xy−2x)dy=0; state the y=0 branch and its relation to C=1.'),trap:T('x’i y’nin fonksiyonu yaparken işaretleri karıştırma: dx/dy+[2(1−y)/y]x=e^y/y. Çözüm x y²=C e^{2y}−e^y(y+1).','Do not mix up signs when x is a function of y: dx/dy+[2(1−y)/y]x=e^y/y. The solution is x y²=C e^{2y}−e^y(y+1).'),steps:example31},
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('Bernoulli IVP: n=−1','Bernoulli IVP: n=−1'),statement:T('2xyy′=y²−2x³, y(1)=2 başlangıç değer problemini çöz; dalı ve aralığı belirt.','Solve 2xyy′=y²−2x³, y(1)=2; state the branch and interval.'),trap:T('u=y² seçtikten sonra u′−(1/x)u=−2x² denkleminde işareti ve 2 çarpanını koru; C=5, y²=x(5−x²) olur.','After choosing u=y², preserve the sign and the factor 2 in u′−(1/x)u=−2x²; then C=5 and y²=x(5−x²).'),steps:example33},
 {badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),title:T('Bernoulli: n=4 ve kısmi integrasyon','Bernoulli: n=4 and integration by parts'),statement:T('3y dx−(x+3x⁴y ln y)dy=0, y>0 denklemini çöz.','Solve 3y dx−(x+3x⁴y ln y)dy=0 for y>0.'),trap:T('x⁴’e bölüp u=x^{−3} seçince u′+(1/y)u=−3ln y çıkar. μ=y’dir; ∫−3y ln y dy işaretini kaçırma.','Dividing by x⁴ and choosing u=x^{−3} gives u′+(1/y)u=−3ln y. Here μ=y; do not lose the sign in ∫−3y ln y dy.'),steps:example34}
]};
