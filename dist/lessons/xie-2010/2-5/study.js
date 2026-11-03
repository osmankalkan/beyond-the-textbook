import {T,step,v,n,o,p,f,pow,prime,eq,plus,minus,x,y,C,fn,exp,integral,dx,dy,abs,lines,r} from '../../../study/math.js';
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),nine=n(9);
const x2=pow(x,two),y2=pow(y,two),y3=pow(y,three);
const pv=v('p'),A=v('a'),F=v('F'),fvar=v('f'),gvar=v('g');
const phi=v('ϕ'),varphi=v('φ');
const sq=s=>'<msqrt>'+r(s)+'</msqrt>';
const d=s=>v('d')+s;
const ln=s=>fn('ln',s);
const par=s=>p(s);
const eqn=(a,b)=>a+eq+b;
const mu=v('μ');
const neq=o('≠'),gt=o('>');

export const solvableFamilies={
 'clairaut-square':{
  name:'y = xp + p²',
  initialLabel:T('C · eğim','C · slope'),
  method:F+par(x+o(',')+y+o(',')+pv)+eq+zero,
  solution:y+eq+C+x+plus+pow(C,two),
  singular:y+eq+minus+f(x2,four),
  note:T('Clairaut denklemi y=xp+p². Genel çözüm y=Cx+C² doğru ailesidir; tekil çözüm y=−x²/4 parabolüdür. Her doğru parabole bir noktada teğettir.','The Clairaut equation y=xp+p². The general solution is the line family y=Cx+C²; the singular solution is the parabola y=−x²/4. Each line is tangent to the parabola at one point.'),
  excluded:T('C=0 doğrusu y=0 olur ve x=0’da parabole teğettir. Tekil çözüm genel aileden hiçbir C ile elde edilemez.','C=0 gives the line y=0, tangent to the parabola at x=0. The singular solution is not obtained from the general family for any C.')
 },
 'clairaut-inverse':{
  name:'y = xp + 1/p',
  initialLabel:T('C · eğim','C · slope'),
  method:y+eq+x+pv+plus+f(one,pv),
  solution:y+eq+C+x+plus+f(one,C),
  singular:pow(y,two)+eq+four+x,
  note:T('Clairaut denklemi y=xp+1/p. Genel çözüm y=Cx+1/C doğru ailesidir; tekil çözüm y²=4x parabolüdür. Pozitif C üst dala, negatif C alt dala teğettir.','The Clairaut equation y=xp+1/p. The general solution is the line family y=Cx+1/C; the singular solution is the parabola y²=4x. Positive C lines are tangent to the upper branch and negative C to the lower branch.'),
  excluded:T('C=0 tanımsızdır. Tekil parabol yalnız x≥0 için gerçektir; seçili C’nin işareti dalı belirler.','C=0 is undefined. The singular parabola is real only for x≥0; the sign of C selects the branch.')
 },
 'solvable-x-238':{
  name:'y²p² + 3xp − y = 0',
  initialLabel:T('C · aile parametresi','C · family parameter'),
  method:y2+pow(pv,two)+plus+three+x+pv+minus+y+eq+zero,
  solution:y3+eq+three+C+x+plus+pow(C,two),
  singular:nine+x2+plus+four+y3+eq+zero,
  note:T('x için çözülebilen denklem (Örnek 2.38). Genel çözüm y³=3Cx+C²; tekil çözüm 9x²+4y³=0 eğrisidir. y=0 ayrı bir çözümdür.','An equation solvable for x (Example 2.38). The general solution is y³=3Cx+C²; the singular solution is 9x²+4y³=0. The branch y=0 is a separate solution.'),
  excluded:T('Tekil eğri y≤0 dalındadır ve yalnız x=0’da y=0 olur. y=0 çözümü C=0 ile genel aileye girer; p=0 dalı başlangıçta ayrıca kontrol edilir.','The singular curve lies on y≤0 and meets y=0 only at x=0. The solution y=0 belongs to the general family with C=0; the p=0 branch is checked separately at the start.')
 },
 'solvable-y-236':{
  name:'xp² − 2yp − x = 0',
  initialLabel:T('C · aile parametresi','C · family parameter'),
  method:x+pow(pv,two)+minus+two+y+pv+minus+x+eq+zero,
  solution:two+y+eq+C+x2+minus+f(one,C),
  singular:null,
  note:T('y için çözülebilen denklem (Örnek 2.36). Genel çözüm 2y=Cx²−1/C; tekil çözüm yoktur. p=±1 özel değerleri y=0 verir ve bu dal asıl denklemi sağlamaz.','An equation solvable for y (Example 2.36). The general solution is 2y=Cx²−1/C; there is no singular solution. The special values p=±1 give y=0, which does not satisfy the original equation.'),
  excluded:T('C=0 ve x=0 dışlanır. Her C için eğri x’in tüm gerçek değerlerinde tanımlıdır; zarf oluşmaz.','C=0 and x=0 are excluded. For each C the curve is defined for every real x; no envelope forms.')
 }
};

const path235=[
 step('1. x için çözülmüş biçimi yaz','1. Write the form solved for x',lines(x+eq+pv+plus+pow(pv,four)+o(',')+pv+eq+prime(y)),'Denklem x=p+p⁴ biçiminde zaten x için çözülmüştür. p serbest parametredir; her p değeri eğri üzerinde bir nokta üretir.','The equation is already solved for x as x=p+p⁴. The symbol p is a free parameter; each value of p produces one point on the curve.'),
 step('2. dx/dy=1/p zincirini kur','2. Build the chain with dx/dy=1/p',lines(f(d(x),d(pv))+eq+one+plus+four+pow(pv,three)+o(',')+f(one,pv)+eq+p(one+plus+four+pow(pv,three))+f(d(pv),d(y))),'x’in p’ye göre türevi 1+4p³’tür. Zincir kuralı dx/dy=(dx/dp)(dp/dy) olduğundan 1/p=(1+4p³)dp/dy çıkar.','The derivative of x with respect to p is 1+4p³. Since dx/dy=(dx/dp)(dp/dy), we get 1/p=(1+4p³)dp/dy.'),
 step('3. Değişkenleri ayır','3. Separate the variables',lines(f(d(pv),p(one+plus+four+pow(pv,three)))+eq+f(d(y),p(one+plus+four+pow(pv,three))),d(y)+eq+p(pv+plus+four+pow(pv,four))+d(pv)),'Her iki tarafı (1+4p³) ile çarpıp dy’yi yalıt: dy=(p+4p⁴)dp. Sağ taraf yalnız p’ye bağlıdır; integral doğrudan alınır.','Multiply both sides by (1+4p³) and isolate dy: dy=(p+4p⁴)dp. The right side depends only on p, so the integral is direct.'),
 step('4. p’ye göre integre et','4. Integrate with respect to p',lines(y+eq+f(pow(pv,two),two)+plus+f(four,four)+pow(pv,five)+plus+C,y+eq+f(pow(pv,two),two)+plus+f(four,five)+pow(pv,five)+plus+C),'∫(p+4p⁴)dp=p²/2+4p⁵/5. İntegral sabiti C eklenir; bu, eğrilerin bir parametreli ailesidir.','∫(p+4p⁴)dp=p²/2+4p⁵/5. Add the constant C; this is a one-parameter family of curves.'),
 step('5. Parametrik çözümü ve türev kontrolünü yaz','5. State the parametric solution and check the derivative',lines(x+eq+pv+plus+pow(pv,four)+o(',')+y+eq+f(pow(pv,two),two)+plus+f(four,five)+pow(pv,five)+plus+C,f(d(y),d(x))+eq+f(f(d(y),d(pv)),f(d(x),d(pv)))+eq+f(pv+plus+four+pow(pv,four),one+plus+four+pow(pv,three))+eq+pv),'p elenemediği için çözüm parametrik kalır. Türev oranı (p+4p⁴)/(1+4p³)=p verir; bu, p=y′ tanımıyla tutarlıdır. Tekil çözüm yoktur.','Since p cannot be eliminated, the solution stays parametric. The derivative ratio (p+4p⁴)/(1+4p³)=p agrees with p=y′. There is no singular solution.')
];

const path239=[
 step('1. Clairaut biçimini tanı','1. Recognize the Clairaut form',lines(y+eq+x+pv+plus+f(pow(A,two),pv)+o(',')+pv+neq+zero),'Denklem y=xp+f(p) biçimindedir; f(p)=a²/p. p=0 tanımsızdır, bu yüzden p≠0 aralığında çalışılır.','The equation has the form y=xp+f(p) with f(p)=a²/p. Since p=0 is undefined, work on the interval p≠0.'),
 step('2. x’e göre türev al','2. Differentiate with respect to x',lines(pv+eq+pv+par(x+minus+f(pow(A,two),pow(pv,two)))+f(d(pv),d(x)),par(x+minus+f(pow(A,two),pow(pv,two)))+f(d(pv),d(x))+eq+zero),'y′=p olduğundan sol taraf p olur. f′(p)=−a²/p² olduğundan p=p+(x−a²/p²)dp/dx; terimler sadeleşince (x−a²/p²)dp/dx=0 kalır.','Since y′=p, the left side is p. With f′(p)=−a²/p², p=p+(x−a²/p²)dp/dx; after cancellation, (x−a²/p²)dp/dx=0.'),
 step('3. İki dalı ayır','3. Separate the two branches',lines(pv+eq+C+o('⇒')+y+eq+C+x+plus+f(pow(A,two),C),f(pow(A,two),pow(pv,two))+eq+x+o('⇒')+pow(pv,two)+eq+f(pow(A,two),x)),'Birinci dal dp/dx=0, yani p=C’dir ve y=Cx+a²/C doğru ailesini verir. İkinci dal x−a²/p²=0, yani p²=a²/x’tir.','The first branch dp/dx=0 gives p=C and the line family y=Cx+a²/C. The second branch x−a²/p²=0 gives p²=a²/x.'),
 step('4. Tekil çözümü kur','4. Build the singular solution',lines(x+eq+f(pow(A,two),pow(pv,two))+o(',')+y+eq+f(two+pow(A,two),pv),pow(y,two)+eq+four+pow(A,two)+x),'İkinci dalı y=xp+a²/p içine koy: x=a²/p² iken y=2a²/p olur. p elenince y²=4a²x parabolü çıkar. Bu, doğru ailesinin zarfıdır.','Substitute the second branch into y=xp+a²/p: when x=a²/p², y=2a²/p. Eliminating p gives the parabola y²=4a²x, the envelope of the line family.'),
 step('5. Dalı, bölgeyi ve doğrulamayı yaz','5. State the branch, domain and verification',lines(two+y+prime(y)+eq+four+pow(A,two)+o(',')+prime(y)+eq+f(two+pow(A,two),y),x+gt+zero),'Parabol x>0 için gerçektir. Pozitif C üst dala (y=2a√x), negatif C alt dala (y=−2a√x) teğettir. Türev kontrolü 2yy′=4a², y′=2a²/y verir.','The parabola is real for x>0. Positive C lines are tangent to the upper branch (y=2a√x) and negative C lines to the lower branch (y=−2a√x). The derivative check gives 2yy′=4a², y′=2a²/y.')
];

const example35=[
 step('1. x için çöz ve p’yi tanımla (1 puan)','1. Solve for x and define p (1 point)',lines(x+eq+pv+plus+pow(pv,four)+o(',')+pv+eq+prime(y)),'Denklem x için çözülmüştür. p=y′ serbest parametredir; p’nin her değeri eğri üzerinde bir nokta verir.','The equation is solved for x. The symbol p=y′ is a free parameter; each p gives a point on the curve.'),
 step('2. Zincir kuralını kur (1 puan)','2. Build the chain rule (1 point)',lines(f(d(x),d(pv))+eq+one+plus+four+pow(pv,three)+o(',')+f(one,pv)+eq+p(one+plus+four+pow(pv,three))+f(d(pv),d(y))),'dx/dp=1+4p³ ve dx/dy=1/p olduğundan 1/p=(1+4p³)dp/dy. Bu, p ile y arasında ayrılabilir bir denklemdir.','Since dx/dp=1+4p³ and dx/dy=1/p, 1/p=(1+4p³)dp/dy. This is a separable equation between p and y.'),
 step('3. Ayır ve integre et (1 puan)','3. Separate and integrate (1 point)',lines(d(y)+eq+p(pv+plus+four+pow(pv,four))+d(pv),y+eq+f(pow(pv,two),two)+plus+f(four,five)+pow(pv,five)+plus+C),'dy=(p+4p⁴)dp. İntegral y=p²/2+4p⁵/5+C verir; C tek parametredir.','dy=(p+4p⁴)dp. Integration gives y=p²/2+4p⁵/5+C; C is the single parameter.'),
 step('4. Parametrik cevabı yaz (1 puan)','4. Write the parametric answer (1 point)',lines(x+eq+pv+plus+pow(pv,four)+o(',')+y+eq+f(pow(pv,two),two)+plus+f(four,five)+pow(pv,five)+plus+C),'p elenemediği için cevap iki denklemli parametrik biçimde bırakılır. Bu bir eğri ailesidir, tek bir kapalı formül değildir.','Since p cannot be eliminated, the answer stays as two parametric equations. This is a family of curves, not a single closed formula.'),
 step('5. Doğrula ve tekil çözümü kontrol et (1 puan)','5. Verify and check for a singular solution (1 point)',lines(f(d(y),d(x))+eq+f(pv+plus+four+pow(pv,four),one+plus+four+pow(pv,three))+eq+pv),'Türev oranı p’yi verir; çözüm asıl denklemi sağlar. Aile tekil çözüm üretmez; her p bir C eğrisi üzerinde kalır.','The derivative ratio returns p; the solution satisfies the original equation. The family produces no singular solution; every p stays on a curve of the C-family.')
];

const example36=[
 step('1. p=0 dalını dene (1 puan)','1. Test the p=0 branch (1 point)',lines(pv+eq+zero+o('⇒')+minus+x+eq+zero),'p=0 konunca −x=0 kalır. Bu yalnız x=0 noktasında sağlanır ve bir çözüm eğrisi vermez; bu yüzden p≠0 alınır.','Setting p=0 leaves −x=0. This holds only at the single point x=0 and gives no solution curve, so take p≠0.'),
 step('2. y için çöz (1 puan)','2. Solve for y (1 point)',lines(y+eq+f(x+par(pow(pv,two)+minus+one),two+pv)+eq+f(x,two)+par(pv+minus+f(one,pv))),'xp²−2yp−x=0 denklemini y için çöz: 2yp=x(p²−1), yani y=x(p²−1)/(2p)=x(p−1/p)/2.','Solve xp²−2yp−x=0 for y: 2yp=x(p²−1), so y=x(p²−1)/(2p)=x(p−1/p)/2.'),
 step('3. x’e göre türev al ve ayır (1 puan)','3. Differentiate with respect to x and separate (1 point)',lines(pv+eq+f(one,two)+par(pv+minus+f(one,pv))+plus+f(x,two)+par(one+plus+f(one,pow(pv,two)))+f(d(pv),d(x)),f(d(pv),pv)+eq+f(d(x),x)),'Türev alıp düzenleyince (p²+1)/p=x(p²+1)/p²·dp/dx. p²+1≠0 olduğundan dp/p=dx/x kalır.','Differentiating and rearranging gives (p²+1)/p=x(p²+1)/p²·dp/dx. Since p²+1≠0, we are left with dp/p=dx/x.'),
 step('4. İntegre et ve genel çözümü yaz (1 puan)','4. Integrate and write the general solution (1 point)',lines(ln(abs(pv))+eq+ln(abs(x))+plus+ln(abs(C))+o('⇒')+pv+eq+C+x,two+y+eq+C+x2+minus+f(one,C)),'ln|p|=ln|x|+ln|C| verir p=Cx. Bunu y ifadesine koyunca 2y=Cx²−1/C genel çözümü çıkar.','ln|p|=ln|x|+ln|C| gives p=Cx. Substituting into y gives the general solution 2y=Cx²−1/C.'),
 step('5. İkinci yolu ve doğrulamayı yaz (1 puan)','5. State the second route and verify (1 point)',lines(x+eq+C+y+o(',')+C+x2+minus+one+eq+two+C+y),'x’i y’nin fonksiyonu yaparak aynı aile C↦1/C ile elde edilir. p=±1 y=0 verir; y=0 asıl denklemi sağlamadığı için dışlanır. Türevle doğrula.','Solving for x as a function of y gives the same family under C↦1/C. The values p=±1 give y=0, which does not satisfy the original equation and is excluded. Verify by differentiation.')
];

const example38=[
 step('1. p=0 dalını ayır (1 puan)','1. Isolate the p=0 branch (1 point)',lines(pv+eq+zero+o('⇒')+y+eq+zero),'p=0 konunca −y=0 kalır; y=0 gerçekten bir çözümdür. Bu dal genel aileden ayrıca yazılmalıdır.','Setting p=0 leaves −y=0; y=0 is indeed a solution. This branch must be stated separately from the general family.'),
 step('2. x için çöz ve türev al (1 puan)','2. Solve for x and differentiate (1 point)',lines(x+eq+f(y+minus+y2+pow(pv,two),three+pv)+eq+f(one,three)+par(f(y,pv)+minus+y2+pv),f(one,pv)+eq+f(one,three)+par(f(one,pv)+minus+two+y+pv)+minus+f(one,three)+par(f(y,pow(pv,two))+plus+y2)+f(d(pv),d(y))),'p≠0 için x=(y−y²p²)/(3p). dx/dy=1/p kullanıp türev alınca üç terimli ifade çıkar; düzenleme iki çarpana ayrılır.','For p≠0, x=(y−y²p²)/(3p). Using dx/dy=1/p and differentiating gives three terms; rearranging factors them into two groups.'),
 step('3. Çarpanları ayır (1 puan)','3. Split the factors (1 point)',lines(par(y+pow(pv,two)+plus+one)+par(f(y,pv)+f(d(pv),d(y))+plus+two)+eq+zero,f(d(pv),pv)+eq+minus+f(two+d(y),y)),'Birinci çarpan yp²+1=0 tekil çözüme gider. İkinci çarpan dp/p=−2dy/y verir; integral p=C/y² olur.','The first factor yp²+1=0 leads to the singular solution. The second gives dp/p=−2dy/y; integrating gives p=C/y².'),
 step('4. Genel ve tekil çözümü yaz (1 puan)','4. Write the general and singular solutions (1 point)',lines(y3+eq+three+C+x+plus+pow(C,two),nine+x2+plus+four+y3+eq+zero),'p=C/y²’yi x ifadesine koyunca y³=3Cx+C² genel çözümü çıkar. yp²+1=0 dalı y²p²=−y ve p²=−1/y ile 9x²+4y³=0 tekil çözümünü verir.','Substituting p=C/y² into x gives the general solution y³=3Cx+C². The branch yp²+1=0, with y²p²=−y and p²=−1/y, gives the singular solution 9x²+4y³=0.'),
 step('5. Tanım dalını ve doğrulamayı yaz (1 puan)','5. State the domain branch and verify (1 point)',lines(pow(x,two)+eq+minus+f(four+y3,nine)+o(',')+y+o('≤')+zero),'Tekil eğri yalnız y≤0 için gerçektir ve genel aileden hiçbir C ile elde edilemez. Türevle her iki çözümü de doğrula; y=0 dalını unutma.','The singular curve is real only for y≤0 and cannot be obtained from the general family for any C. Verify both solutions by differentiation; do not forget the branch y=0.')
];

const example39=[
 step('1. Clairaut yapısını yaz (1 puan)','1. Write the Clairaut structure (1 point)',lines(y+eq+x+pv+plus+f(pow(A,two),pv)+o(',')+pv+neq+zero),'Denklem y=xp+a²/p, yani f(p)=a²/p olan bir Clairaut denklemidir. p=0 tanımsızdır.','The equation is y=xp+a²/p, a Clairaut equation with f(p)=a²/p. p=0 is undefined.'),
 step('2. Türev al ve sadeleştir (1 puan)','2. Differentiate and simplify (1 point)',lines(pv+eq+pv+par(x+minus+f(pow(A,two),pow(pv,two)))+f(d(pv),d(x)),par(x+minus+f(pow(A,two),pow(pv,two)))+f(d(pv),d(x))+eq+zero),'f′(p)=−a²/p² olduğundan p=p+(x−a²/p²)dp/dx. Sadeleşince (x−a²/p²)dp/dx=0 kalır.','Since f′(p)=−a²/p², p=p+(x−a²/p²)dp/dx. Cancelling leaves (x−a²/p²)dp/dx=0.'),
 step('3. Doğru ailesini yaz (1 puan)','3. Write the line family (1 point)',lines(pv+eq+C+o('⇒')+y+eq+C+x+plus+f(pow(A,two),C)),'dp/dx=0 dalı p=C verir. Genel çözüm y=Cx+a²/C doğru ailesidir; C eğimi ve y-kesenini birlikte belirler.','The branch dp/dx=0 gives p=C. The general solution is the line family y=Cx+a²/C; C fixes the slope and the y-intercept together.'),
 step('4. Tekil parabolü kur (1 puan)','4. Build the singular parabola (1 point)',lines(f(pow(A,two),pow(pv,two))+eq+x+o('⇒')+pow(pv,two)+eq+f(pow(A,two),x),x+eq+f(pow(A,two),pow(pv,two))+o(',')+y+eq+f(two+pow(A,two),pv)+o('⇒')+pow(y,two)+eq+four+pow(A,two)+x),'İkinci dal x=a²/p² verir. Bunu y=xp+a²/p içine koyunca y=2a²/p olur; p elenince y²=4a²x parabolü çıkar.','The second branch gives x=a²/p². Substituting into y=xp+a²/p gives y=2a²/p; eliminating p yields the parabola y²=4a²x.'),
 step('5. Zarfı, dalı ve doğrulamayı yaz (1 puan)','5. State the envelope, branch and verification (1 point)',lines(two+y+prime(y)+eq+four+pow(A,two)+o(',')+prime(y)+eq+f(two+pow(A,two),y),x+gt+zero),'Parabol x>0 üzerinde tanımlıdır. Pozitif C doğruları üst dala, negatif C doğruları alt dala teğettir. Türev kontrolü y′=2a²/y verir.','The parabola is defined for x>0. Positive C lines are tangent to the upper branch and negative C lines to the lower branch. The derivative check gives y′=2a²/y.')
];

export const solvableStudy={
 title:T('Denklemi çözebildiğin değişkene göre yaz; p parametresini ve tekil çözümü ayrı tut.','Write the equation for the variable you can isolate; keep the parameter p and the singular solution separate.'),
 intro:T('Önce F(x,y,p)=0 biçimine bak. y kolaysa y=f(x,p) kurup x’e göre, x kolaysa x=g(y,p) kurup y’ye göre türev al. Çıkan ayrılabilir denklemi çöz; p’yi ele veya parametrik bırak. Clairaut denkleminde doğru ailesi ile zarfı ayrı ayrı yaz.','First inspect F(x,y,p)=0. If y is easy, set y=f(x,p) and differentiate with respect to x; if x is easy, set x=g(y,p) and differentiate with respect to y. Solve the resulting separable equation; eliminate p or keep it parametric. For a Clairaut equation, state the line family and the envelope separately.'),
 paths:[
  {title:T('Örnek 2.35 · x için çözülebilen denklem','Example 2.35 · An equation solvable for x'),prompt:T('x=p+p⁴ ifadesinde p neden elenemiyor ve çözüm neden parametrik kalıyor?','Why can p not be eliminated from x=p+p⁴, and why does the solution stay parametric?'),steps:path235,reflection:T('Türev oranı (p+4p⁴)/(1+4p³) neden tam olarak p’yi verir?','Why does the derivative ratio (p+4p⁴)/(1+4p³) return exactly p?')},
  {title:T('Örnek 2.39 · Clairaut denklemi','Example 2.39 · A Clairaut equation'),prompt:T('(x−a²/p²)dp/dx=0 çarpanlarından hangisi tekil çözümü üretir?','Which factor of (x−a²/p²)dp/dx=0 produces the singular solution?'),steps:path239,reflection:T('y²=4a²x parabolünün yalnız x>0 dalı neden gerçektir?','Why is only the x>0 branch of the parabola y²=4a²x real?')}
 ],
 predictions:[
  {id:'clairaut-square',question:T('y=xp+p² denkleminin tekil çözümü nedir?','What is the singular solution of y=xp+p²?'),context:T('Doğru ailesi y=Cx+C²; zarfı bul.','The line family is y=Cx+C²; find its envelope.'),choices:T(['y=−x²/4','y=x²/4','Tekil çözüm yok'],['y=−x²/4','y=x²/4','No singular solution']),answer:0,reason:T('f(p)=p² için x=−f′(p)=−2p ve y=f(p)−pf′(p)=−p² olur. p=−x/2 yerine konunca y=−x²/4 çıkar.','For f(p)=p², x=−f′(p)=−2p and y=f(p)−pf′(p)=−p². Substituting p=−x/2 gives y=−x²/4.'),math:y+eq+minus+f(x2,four),try:T('Aşağıdaki Clairaut karesi ailesinde doğrunun parabole teğet olduğu noktayı izle.','Follow the point where the line is tangent to the parabola in the Clairaut-square family below.')},
  {id:'238-branch',question:T('Örnek 2.38’de tekil çözüm hangi çarpandan doğar?','In Example 2.38, which factor produces the singular solution?'),context:T('(yp²+1)(y/p·dp/dy+2)=0 çarpanlarını ayır.','Separate the factors of (yp²+1)(y/p·dp/dy+2)=0.'),choices:T(['yp²+1=0','y/p·dp/dy+2=0','p=0'],['yp²+1=0','y/p·dp/dy+2=0','p=0']),answer:0,reason:T('yp²+1=0 dalı y²p²=−y ve p²=−1/y ile 9x²+4y³=0 verir. İkinci çarpan p=C/y² üzerinden genel aileyi üretir.','The branch yp²+1=0, with y²p²=−y and p²=−1/y, gives 9x²+4y³=0. The second factor produces the general family through p=C/y².'),math:par(y+pow(pv,two)+plus+one)+par(f(y,pv)+f(d(pv),d(y))+plus+two)+eq+zero,try:T('Aşağıdaki 2.38 ailesinde genel eğrinin tekil eğriye nasıl teğet kaldığını gör.','See how the general curve stays tangent to the singular curve in the 2.38 family below.')}
 ]
};

export const solvableClinic={examBlueprint:[
 {step:T('1 · Hangi değişken çözülüyor?','1 · Which variable is isolated?'),detail:T('Denklemi F(x,y,p)=0 yaz. y=f(x,p) kolaysa x’e göre, x=g(y,p) kolaysa y’ye göre türev al. Clairaut biçimini ayrıca tanı.','Write F(x,y,p)=0. If y=f(x,p) is easy, differentiate with respect to x; if x=g(y,p) is easy, differentiate with respect to y. Recognize the Clairaut form separately.')},
 {step:T('2 · p’yi çöz veya parametre bırak','2 · Solve for p or keep it parametric'),detail:T('Çıkan ayrılabilir denklemi çöz. p elenebiliyorsa genel çözümü kapalı yaz; elenemiyorsa x=x(p), y=y(p) parametrik gösterimini kullan.','Solve the resulting separable equation. If p can be eliminated, write the general solution in closed form; otherwise use the parametric form x=x(p), y=y(p).')},
 {step:T('3 · Tekil çözümü ayrı yaz','3 · State the singular solution separately'),detail:T('Clairaut’ta dp/dx=0 doğru ailesini, x=−f′(p) zarfı verir. Diğer denklemlerde sıfır çarpanını ayrı incele. Tekil çözümün tanım aralığını ve dalını yaz, türevle doğrula.','In Clairaut, dp/dx=0 gives the line family and x=−f′(p) gives the envelope. For other equations, examine each zero factor separately. State the domain and branch of the singular solution and verify by differentiation.')}
],examClinic:[
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('x için çözülebilen denklem: parametrik çözüm','Equation solvable for x: parametric solution'),statement:T('x=p+p⁴ denklemini çöz; genel çözümü parametrik yaz ve türevle doğrula.','Solve x=p+p⁴; write the general solution parametrically and verify by differentiation.'),trap:T('p’yi elemeye çalışıp y’yi yanlışlıkla x’in kapalı fonksiyonu sanma. dx/dy=1/p kullanılır; cevap x=p+p⁴, y=p²/2+4p⁵/5+C olarak kalır.','Do not try to eliminate p and mistake y for a closed function of x. Use dx/dy=1/p; the answer stays x=p+p⁴, y=p²/2+4p⁵/5+C.'),steps:example35},
 {badge:T('5 PUAN · 4 DAKİKA','5 POINTS · 4 MINUTES'),title:T('y için çözülebilen denklem: iki yol','Equation solvable for y: two routes'),statement:T('xp²−2yp−x=0 denklemini çöz; p=0 dalını ve genel çözümü belirt.','Solve xp²−2yp−x=0; state the p=0 branch and the general solution.'),trap:T('p=0 yalnız x=0 noktası verir, çözüm eğrisi değildir. y=x(p−1/p)/2 üzerinden dp/p=dx/x elde edilir; sonuç 2y=Cx²−1/C.','p=0 gives only the point x=0, not a solution curve. From y=x(p−1/p)/2, obtain dp/p=dx/x; the result is 2y=Cx²−1/C.'),steps:example36},
 {badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),title:T('p=0 dalı ve tekil çözüm','The p=0 branch and a singular solution'),statement:T('y²p²+3xp−y=0 denklemini çöz; y=0 dalını ve tekil çözümü ayrıca yaz.','Solve y²p²+3xp−y=0; state the y=0 branch and the singular solution separately.'),trap:T('y=0 gerçek bir çözümdür; onu atlama. yp²+1=0 dalı 9x²+4y³=0 verir ve yalnız y≤0 için gerçektir.','y=0 is a genuine solution; do not omit it. The branch yp²+1=0 gives 9x²+4y³=0 and is real only for y≤0.'),steps:example38},
 {badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),title:T('Clairaut: doğru ailesi ve zarf','Clairaut: line family and envelope'),statement:T('y=xp+a²/p denklemini çöz; doğru ailesini ve tekil parabolü yaz.','Solve y=xp+a²/p; state the line family and the singular parabola.'),trap:T('İkinci dal x=a²/p² ile y=2a²/p verir; p elenince y²=4a²x olur. Parabolün yalnız x>0 dalı gerçektir; C’nin işareti üst/alt dalı seçer.','The second branch x=a²/p² gives y=2a²/p; eliminating p yields y²=4a²x. Only the x>0 branch is real; the sign of C selects the upper or lower branch.'),steps:example39}
]};
