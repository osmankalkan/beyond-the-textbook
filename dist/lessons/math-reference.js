import {T, v, n, o, r, p, f, pow, sub, prime, eq, plus, minus, x, y, C, dx, dy, fn, exp, abs, integral, dot} from '../study/math.js';
import {pickLang} from '../i18n.js';

const rule=(tr,en,math)=>({label:T(tr,en),math});
const defIntegral=(a,b,body)=>`<msubsup>${o('∫')}${r(a)}${r(b)}</msubsup>${body}`;

/* Derivative rules. Every fragment is inserted inside the app's <math><mrow> root. */
const dPowerX=rule('Kuvvet kuralı','Power rule',f(v('d'),dx)+pow(x,v('n'))+eq+v('n')+pow(x,v('n')+minus+n(1)));
const dPowerU=rule('Genelleştirilmiş kuvvet kuralı','Generalized power rule',f(v('d'),dx)+pow(v('u'),v('n'))+eq+v('n')+pow(v('u'),v('n')+minus+n(1))+prime('u'));
const dExp=rule('Üstel fonksiyon','Exponential function',f(v('d'),dx)+exp(x)+eq+exp(x));
const dExpChain=rule('Zincirli üstel','Exponential with chain rule',f(v('d'),dx)+exp(v('u'))+eq+exp(v('u'))+prime('u'));
const dLn=rule('Logaritma','Logarithm',f(v('d'),dx)+fn('ln',v('u'))+eq+f(prime('u'),v('u')));
const dSin=rule('Sinüs','Sine',f(v('d'),dx)+fn('sin',v('u'))+eq+prime('u')+fn('cos',v('u')));
const dCos=rule('Kosinüs','Cosine',f(v('d'),dx)+fn('cos',v('u'))+eq+minus+prime('u')+fn('sin',v('u')));
const dArctan=rule('Arktanjant','Arctangent',f(v('d'),dx)+fn('arctan',v('u'))+eq+f(prime('u'),n(1)+plus+pow(v('u'),n(2))));
const dProduct=rule('Çarpım kuralı','Product rule',prime(p(v('u')+v('v')))+eq+prime('u')+v('v')+plus+v('u')+prime('v'));
const dQuotient=rule('Bölüm kuralı','Quotient rule',prime(p(f(v('u'),v('v'))))+eq+f(prime('u')+v('v')+minus+v('u')+prime('v'),pow(v('v'),n(2))));
const dChain=rule('Zincir kuralı','Chain rule',f(v('d')+y,v('d')+x)+eq+f(v('d')+y,v('d')+v('u'))+f(v('d')+v('u'),v('d')+x));
const dLinear=rule('Doğrusallık','Linearity',prime(p(sub(v('c'),n(1))+v('u')+plus+sub(v('c'),n(2))+v('v')))+eq+sub(v('c'),n(1))+prime('u')+plus+sub(v('c'),n(2))+prime('v'));
const dImplicit=rule('Kapalı türev','Implicit differentiation',fn('F',x+o(',')+y)+eq+n(0)+o('⟹')+prime('y')+eq+minus+f(sub(v('F'),x),sub(v('F'),y)));
const dParametric=rule('Parametrik türev','Parametric derivative',f(v('d')+y,v('d')+x)+eq+f(f(v('d')+y,v('d')+v('t')),f(v('d')+x,v('d')+v('t'))));
const dReciprocal=rule('Ters türev','Inverse derivative',f(v('d')+x,v('d')+y)+eq+f(n(1),f(v('d')+y,v('d')+x)));
const dTotal=rule('Tam diferansiyel','Total differential',v('d')+v('u')+eq+sub(v('u'),x)+dx+plus+sub(v('u'),y)+dy);
const dMixed=rule('Karışık kısmi türev','Mixed partial derivative',sub(v('u'),x+y)+eq+sub(v('u'),y+x));
const dOperator=rule('D operatörü','The D operator',pow(v('D'),v('n'))+v('y')+eq+pow(v('y'),p(v('n'))));
const dExpLambda=rule('Karakteristik üstel','Characteristic exponential',pow(v('D'),v('n'))+exp(v('λ')+x)+eq+pow(v('λ'),v('n'))+exp(v('λ')+x));
const dSinh=rule('Hiperbolik sinüs','Hyperbolic sine',f(v('d'),dx)+fn('sinh',v('u'))+eq+prime('u')+fn('cosh',v('u')));
const dCosh=rule('Hiperbolik kosinüs','Hyperbolic cosine',f(v('d'),dx)+fn('cosh',v('u'))+eq+prime('u')+fn('sinh',v('u')));
const dEuler=rule('Euler operatörü','Euler operator',pow(x,n(2))+pow(v('D'),n(2))+y+eq+v('𝒟')+p(v('𝒟')+minus+n(1))+y);
const sVar=v('s'),FVar=v('F'),LVar=v('ℒ');
const dLaplacePrime=rule('Türevin dönüşümü','Transform of derivative',LVar+p(prime('f')+p(v('t')))+eq+sVar+FVar+p(sVar)+minus+fn('f',n(0)));
const dLaplaceSecond=rule('İkinci türevin dönüşümü','Second derivative transform',LVar+p(prime('f',2)+p(v('t')))+eq+pow(sVar,n(2))+FVar+p(sVar)+minus+sVar+fn('f',n(0))+minus+prime('f')+p(n(0)));
const dLaplaceParam=rule('s bölgesinde türev','Differentiation in s',f(v('d'),v('d')+sVar)+FVar+p(sVar)+eq+minus+LVar+p(v('t')+fn('f',v('t'))));
const dLaplaceShift=rule('Frekans kaydırma','Frequency shifting',LVar+p(exp(v('a')+v('t'))+fn('f',v('t')))+eq+FVar+p(sVar+minus+v('a')));
const dHeavisideShift=rule('İkinci kaydırma teoremi','Second shifting theorem',LVar+p(fn('f',v('t')+minus+v('a'))+fn('H',v('t')+minus+v('a')))+eq+exp(minus+v('a')+sVar)+FVar+p(sVar));
const dHeavisideDist=rule('Basamak türevi','Derivative of step',f(v('d'),v('d')+v('t'))+fn('H',v('t')+minus+v('a'))+eq+fn('δ',v('t')+minus+v('a')));
const dDiracLaplace=rule('Dirac delta dönüşümü','Dirac delta transform',LVar+p(fn('δ',v('t')+minus+v('a')))+eq+exp(minus+v('a')+sVar));
const dDiracModulated=rule('Modüle darbe dönüşümü','Modulated impulse transform',LVar+p(fn('f',v('t'))+fn('δ',v('t')+minus+v('a')))+eq+exp(minus+v('a')+sVar)+fn('f',v('a')));
const LinvVar=pow(LVar,minus+n(1));
const dInverseLinear=rule('Ters Laplace doğrusallığı','Inverse Laplace linearity',LinvVar+p(sub(v('c'),n(1))+sub(FVar,n(1))+plus+sub(v('c'),n(2))+sub(FVar,n(2)))+eq+sub(v('c'),n(1))+sub(fn('f',v('t')),n(1))+plus+sub(v('c'),n(2))+sub(fn('f',v('t')),n(2)));
const dInverseShift=rule('Ters frekans kaydırma','Inverse frequency shift',LinvVar+p(FVar+p(sVar+minus+v('a')))+eq+exp(v('a')+v('t'))+fn('f',v('t')));

/* Integral rules. */
const iPower=rule('Kuvvet kuralı','Power rule',integral(pow(x,v('n'))+dx)+eq+f(pow(x,v('n')+plus+n(1)),v('n')+plus+n(1))+plus+C+o(',')+v('n')+o('≠')+minus+n(1));
const iReciprocal=rule('Ters fonksiyon','Reciprocal',integral(f(dx,x))+eq+fn('ln',abs(x))+plus+C);
const iLogU=rule('Logaritmik integral','Logarithmic integral',integral(f(v('d')+v('u'),v('u')))+eq+fn('ln',abs(v('u')))+plus+C);
const iShift=rule('Doğrusal payda','Linear denominator',integral(f(dx,x+minus+v('a')))+eq+fn('ln',abs(x+minus+v('a')))+plus+C);
const iExp=rule('Üstel fonksiyon','Exponential function',integral(exp(x)+dx)+eq+exp(x)+plus+C);
const iExpA=rule('Ölçekli üstel','Scaled exponential',integral(exp(v('a')+x)+dx)+eq+f(n(1),v('a'))+exp(v('a')+x)+plus+C+o(',')+v('a')+o('≠')+n(0));
const iSin=rule('Sinüs','Sine',integral(fn('sin',x)+dx)+eq+minus+fn('cos',x)+plus+C);
const iCos=rule('Kosinüs','Cosine',integral(fn('cos',x)+dx)+eq+fn('sin',x)+plus+C);
const iSinh=rule('Hiperbolik sinüs','Hyperbolic sine',integral(fn('sinh',x)+dx)+eq+fn('cosh',x)+plus+C);
const iCosh=rule('Hiperbolik kosinüs','Hyperbolic cosine',integral(fn('cosh',x)+dx)+eq+fn('sinh',x)+plus+C);
const iInverseD=rule('Ters operatör','Inverse operator',pow(v('D'),minus+n(1))+fn('f',x)+eq+integral(fn('f',x)+dx));
const iSub=rule('Değişken değiştirme','Substitution',integral(fn('f',fn('g',x))+prime('g')+p(x)+dx)+eq+integral(fn('f',v('u'))+v('d')+v('u')));
const iParts=rule('Kısmi integrasyon','Integration by parts',integral(v('u')+v('d')+v('v'))+eq+v('u')+v('v')+minus+integral(v('v')+v('d')+v('u')));
const iArctan=rule('Arktanjant integrali','Arctangent integral',integral(f(v('d')+v('u'),n(1)+plus+pow(v('u'),n(2))))+eq+fn('arctan',v('u'))+plus+C);
const iLinear=rule('Doğrusallık','Linearity',integral(p(sub(v('c'),n(1))+v('u')+plus+sub(v('c'),n(2))+v('v'))+dx)+eq+sub(v('c'),n(1))+integral(v('u')+dx)+plus+sub(v('c'),n(2))+integral(v('v')+dx));
const iFTC=rule('Belirli integral','Definite integral',defIntegral(v('a'),v('b'),prime('F')+p(x)+dx)+eq+v('F')+p(v('b'))+minus+v('F')+p(v('a')));
const iSeparable=rule('Ayrılabilir denklem','Separable equation',integral(f(v('d')+y,fn('g',y)))+eq+integral(fn('f',x)+dx));
const iRepeated=rule('Ardışık integrasyon','Repeated integration',integral(pow(v('y'),p(v('n')))+dx)+eq+pow(v('y'),p(v('n')+minus+n(1)))+plus+C);
const iPotential=rule('Potansiyel fonksiyon','Potential function',v('u')+p(x+o(',')+y)+eq+integral(fn('M',x+o(',')+y)+dx)+plus+fn('g',y));
const iPartialFrac=rule('Basit kesirlere ayırma','Partial fractions',f(n(1),y+p(n(1)+minus+y))+eq+f(n(1),y)+plus+f(n(1),n(1)+minus+y));
const iLaplaceDef=rule('Laplace çekirdek integrali','Kernel integral',defIntegral(n(0),v('∞'),exp(minus+sVar+v('t'))+v('d')+v('t'))+eq+f(n(1),sVar)+o(',')+sVar+o('>')+n(0));
const iLaplaceExp=rule('Üstel çekirdek integrali','Shifted kernel integral',defIntegral(n(0),v('∞'),exp(minus+p(sVar+minus+v('a'))+v('t'))+v('d')+v('t'))+eq+f(n(1),sVar+minus+v('a'))+o(',')+sVar+o('>')+v('a'));
const iLaplaceSin=rule('Sinüs çekirdek integrali','Sine kernel integral',defIntegral(n(0),v('∞'),exp(minus+sVar+v('t'))+fn('sin',v('ω')+v('t'))+v('d')+v('t'))+eq+f(v('ω'),pow(sVar,n(2))+plus+pow(v('ω'),n(2))));
const iLaplaceCos=rule('Kosinüs çekirdek integrali','Cosine kernel integral',defIntegral(n(0),v('∞'),exp(minus+sVar+v('t'))+fn('cos',v('ω')+v('t'))+v('d')+v('t'))+eq+f(sVar,pow(sVar,n(2))+plus+pow(v('ω'),n(2))));
const iHeavisideStep=rule('Basamak çekirdek integrali','Delayed step integral',defIntegral(v('a'),v('∞'),exp(minus+sVar+v('t'))+v('d')+v('t'))+eq+f(exp(minus+v('a')+sVar),sVar));
const iHeavisidePulse=rule('Darbe pencere integrali','Pulse window integral',defIntegral(v('a'),v('b'),exp(minus+sVar+v('t'))+v('d')+v('t'))+eq+f(exp(minus+v('a')+sVar)+minus+exp(minus+v('b')+sVar),sVar));
const iDiracArea=rule('Dirac alan integrali','Dirac unit area',integral(fn('δ',v('t')+minus+v('a'))+v('d')+v('t'))+eq+n(1));
const iDiracSifting=rule('Süzme özelliği integrali','Sifting property integral',integral(fn('g',v('t'))+fn('δ',v('t')+minus+v('a'))+v('d')+v('t'))+eq+fn('g',v('a')));
const iInverseConvolution=rule('Konvolüsyon teoremi','Convolution theorem',LinvVar+p(FVar+p(sVar)+v('G')+p(sVar))+eq+defIntegral(n(0),v('t'),fn('f',v('u'))+fn('g',v('t')+minus+v('u'))+v('d')+v('u')));
const iInversePartialFrac=rule('Kısmi kesir ayrışımı','Partial fraction decomposition',f(n(1),p(sVar+minus+v('a'))+p(sVar+minus+v('b')))+eq+f(n(1),v('a')+minus+v('b'))+p(f(n(1),sVar+minus+v('a'))+minus+f(n(1),sVar+minus+v('b'))));

/* Section 7.1: particle motion in a plane and a multi-story shear building. */
const dNewtonRect=rule('Dikdörtgen koordinatlarda Newton','Newton in rectangular coordinates',v('m')+dot(x,2)+eq+sub(v('F'),x)+p(x+o(',')+y+o(',')+v('t')));
const dRadialAccel=rule('Radyal ivme','Radial acceleration',sub(v('a'),v('r'))+eq+dot(v('r'),2)+minus+v('r')+pow(dot(v('θ')),n(2)));
const dAngularAccel=rule('Açısal ivme','Angular acceleration',sub(v('a'),v('θ'))+eq+n(2)+dot(v('r'))+dot(v('θ'))+plus+v('r')+dot(v('θ'),2));
const dPolarChain=rule('Kutupsal zincir kuralı','Polar chain rule',x+eq+v('r')+fn('cos',v('θ'))+o('⟹')+dot(x)+eq+dot(v('r'))+fn('cos',v('θ'))+minus+v('r')+dot(v('θ'))+fn('sin',v('θ')));
const dStateDerivative=rule('Durum türevi','State derivative',dot(v('y'))+eq+v('A')+p(v('t'))+v('y')+plus+v('B')+v('f')+p(v('t')));
const dPolarBalance=rule('Radyal kuvvet dengesi','Radial force balance',v('m')+p(dot(v('r'),2)+minus+v('r')+pow(dot(v('θ')),n(2)))+eq+sub(v('F'),v('r')));
const iImpulse=rule('İtki–momentum','Impulse–momentum',integral(v('F')+v('d')+v('t'))+eq+v('m')+sub(v('v'),n(2))+minus+v('m')+sub(v('v'),n(1)));
const iAngularImpulse=rule('Açısal itki','Angular impulse',integral(v('M')+v('d')+v('t'))+eq+sub(v('L'),n(2))+minus+sub(v('L'),n(1)));
const iWorkEnergy=rule('İş–enerji','Work–energy',integral(v('F')+v('d')+x)+eq+f(n(1),n(2))+v('m')+pow(sub(v('v'),n(2)),n(2))+minus+f(n(1),n(2))+v('m')+pow(sub(v('v'),n(1)),n(2)));
const iPolarArea=rule('Kutupsal alan','Polar area',v('A')+eq+f(n(1),n(2))+integral(pow(v('r'),n(2))+v('d')+v('θ')));
const iStateTransition=rule('Durum geçiş integrali','State transition integral',v('y')+p(v('t'))+eq+exp(v('A')+v('t'))+v('y')+p(n(0))+plus+defIntegral(n(0),v('t'),exp(v('A')+p(v('t')+minus+v('τ')))+v('B')+v('F')+p(v('τ'))+v('d')+v('τ')));
const iDuhamel=rule('Duhamel integrali','Duhamel integral',x+p(v('t'))+eq+defIntegral(n(0),v('t'),v('h')+p(v('t')+minus+v('τ'))+v('F')+p(v('τ'))+v('d')+v('τ')));

/* Section 7.2: operator method for linear differential systems. */
const dOperatorDet=rule('Operatör determinantı','Operator determinant',fn('φ',v('D'))+eq+fn('det',o('[')+v('φ')+sub(v('i'),v('j'))+p(v('D'))+o(']')));
const dCramerOperator=rule('Operatörlü Cramer kuralı',"Cramer's rule with operators",sub(x,v('P'))+p(v('t'))+eq+f(n(1),fn('φ',v('D')))+sub(v('Δ'),x)+p(v('t')));
const dOperatorShift=rule('Üstel kaydırma kuralı','Exponential shift rule',f(n(1),fn('P',v('D')))+p(exp(v('a')+v('t'))+fn('g',v('t')))+eq+exp(v('a')+v('t'))+f(n(1),fn('P',v('D')+plus+v('a')))+fn('g',v('t')));
const dOperatorResonance=rule('Rezonans operatör kuralı','Resonance operator rule',f(n(1),pow(v('D'),n(2))+plus+pow(v('ω'),n(2)))+fn('sin',v('ω')+v('t'))+eq+minus+f(v('t'),n(2)+v('ω'))+fn('cos',v('ω')+v('t')));
const iParamVariation=rule('Parametre değişimi integrali','Variation of parameters integral',sub(v('c'),v('i'))+p(v('t'))+eq+integral(f(sub(v('Δ'),v('i'))+p(v('t')),v('Δ')+p(v('t')))+v('d')+v('t')));
const iInverseOpIntegral=rule('Ters operatör integrali','Inverse operator integral',f(n(1),v('D'))+fn('f',v('t'))+eq+defIntegral(n(0),v('t'),fn('f',v('τ'))+v('d')+v('τ')));

/* Section 7.3: Laplace transform method for systems of linear differential equations. */
const dLaplaceSystemCramer=rule('s bölgesinde Cramer kuralı',"Cramer's rule in s-domain",sub(v('X'),v('i'))+p(sVar)+eq+f(sub(v('Δ'),v('i'))+p(sVar),v('Δ')+p(sVar)));
const dLaplaceResolvent=rule('Rezolvent matrisi','Resolvent matrix',fn('Φ',sVar)+eq+pow(sVar+v('I')+minus+v('A'),minus+n(1)));

/* Section 7.4: Matrix method for systems of linear differential equations. */
const dMatrixCharEq=rule('Karakteristik denklem','Characteristic equation',fn('det',v('A')+minus+v('λ')+v('I'))+eq+n(0));
const dEigenCondition=rule('Özvektör koşulu','Eigenvector condition',v('A')+v('v')+eq+v('λ')+v('v'));
const dJordanChain=rule('Genelleştirilmiş özvektör zinciri','Generalized eigenvector chain',p(v('A')+minus+v('λ')+v('I'))+sub(v('v'),n(2))+eq+sub(v('v'),n(1)));
const dFundamentalMatrixEq=rule('Temel matris diferansiyel denklemi','Fundamental matrix equation',dot(v('X'))+p(v('t'))+eq+v('A')+v('X')+p(v('t')));
const iMatrixVariation=rule('Matris parametre değişimi','Matrix variation of parameters',sub(x,v('P'))+p(v('t'))+eq+v('X')+p(v('t'))+integral(pow(v('X'),minus+n(1))+p(v('t'))+v('f')+p(v('t'))+v('d')+v('t')));
const iTanIntegral=rule('Tanjant integrali','Tangent integral',integral(fn('tan',v('t'))+v('d')+v('t'))+eq+minus+fn('ln',abs(fn('cos',v('t')))));
const iModalTransform=rule('Modal koordinat dönüşümü','Modal transformation',x+p(v('t'))+eq+v('Φ')+v('q')+p(v('t')));

/* §4.4 is taught within §4.5; keep its substitution and domain explicit. */
const dEulerFirst=rule('Euler dönüşümü: z = ln x, x > 0; 𝒟 = d/dz','Euler substitution: z = ln x, x > 0; 𝒟 = d/dz',x+prime('y')+eq+v('𝒟')+y);
const dEulerThird=rule('Euler üçüncü türev dönüşümü (x > 0)','Euler third derivative transformation (x > 0)',pow(x,n(3))+prime('y',3)+eq+v('𝒟')+p(v('𝒟')+minus+n(1))+p(v('𝒟')+minus+n(2))+y);
const iEulerSub=rule('Logaritmik değişkenle integral (x > 0, z = ln x)','Integration in the logarithmic variable (x > 0, z = ln x)',integral(fn('g',fn('ln',x))+f(dx,x))+eq+integral(fn('g',v('z'))+v('d')+v('z')));

export const MATH_REFERENCE={
  '1.1':{
    derivative:[dPowerX,dExp,dSin,dCos,dLinear],
    integral:[iPower,iExp,iSin,iCos,iLinear]
  },
  '1.2':{
    derivative:[dPowerX,dExpChain,dLn,dSin,dCos,dProduct,dChain,dImplicit],
    integral:[iPower,iReciprocal,iExp,iSin,iCos,iSub,iFTC]
  },
  '2.1':{
    derivative:[dPowerX,dPowerU,dExpChain,dLn,dChain,dProduct,dArctan],
    integral:[iPower,iReciprocal,iLogU,iExp,iSin,iCos,iSub,iArctan,iPartialFrac]
  },
  '2.2':{
    derivative:[dPowerU,dProduct,dQuotient,dChain,dExpChain,dArctan,dImplicit],
    integral:[iPower,iReciprocal,iLogU,iShift,iExp,iSub,iArctan,iPartialFrac]
  },
  '2.3':{
    derivative:[dPowerX,dExpChain,dProduct,dQuotient,dChain,dTotal,dMixed],
    integral:[iPower,iReciprocal,iLogU,iExp,iSub,iPotential]
  },
  '2.4':{
    derivative:[dPowerX,dProduct,dQuotient,dChain,dExpChain,dLn],
    integral:[iPower,iReciprocal,iLogU,iExp,iExpA,iSub,iParts,iLinear]
  },
  '2.5':{
    derivative:[dPowerX,dProduct,dChain,dParametric,dReciprocal,dImplicit],
    integral:[iPower,iReciprocal,iLogU,iExp,iSub,iParts,iArctan]
  },
  '2.6':{
    derivative:[dPowerU,dProduct,dChain,dExpChain,dSin,dCos],
    integral:[iPower,iReciprocal,iExp,iExpA,iSin,iCos,iSub,iRepeated]
  },
  '2.7':{
    derivative:[dProduct,dQuotient,dChain,dExpChain,dLn,dArctan,dImplicit,dParametric],
    integral:[iPower,iReciprocal,iLogU,iExp,iSub,iParts,iPartialFrac,iArctan,iFTC]
  },
  '3.1':{
    derivative:[dPowerX,dExpChain,dLn,dChain,dLinear,dProduct],
    integral:[iPower,iReciprocal,iLogU,iExpA,iSub,iFTC,iLinear]
  },
  '4.1':{
    derivative:[dPowerX,dExpChain,dSin,dCos,dProduct,dChain,dLinear,dOperator],
    integral:[iPower,iExp,iSin,iCos,iRepeated,iSub,iParts,iLinear]
  },
  '4.2':{
    derivative:[dExpChain,dExpLambda,dSin,dCos,dSinh,dCosh,dProduct,dOperator],
    integral:[iPower,iExp,iExpA,iSin,iCos,iSinh,iCosh,iRepeated]
  },
  '4.3':{
    derivative:[dPowerX,dExpChain,dLn,dSin,dCos,dSinh,dCosh,dProduct,dOperator],
    integral:[iPower,iReciprocal,iLogU,iExpA,iSin,iCos,iParts,iInverseD]
  },
  '4.4':{
    derivative:[dPowerX,dLn,dChain,dProduct,dEulerFirst,dEuler,dEulerThird],
    integral:[iPower,iReciprocal,iEulerSub,iExpA,iParts,iRepeated]
  },
  '4.5':{
    derivative:[dPowerX,dExpChain,dExpLambda,dLn,dSin,dCos,dProduct,dChain,dOperator,dEulerFirst,dEuler,dEulerThird],
    integral:[iPower,iReciprocal,iLogU,iExpA,iSin,iCos,iSub,iParts,iInverseD,iLinear,iEulerSub]
  },
  '6.1':{
    derivative:[dLaplacePrime,dLaplaceSecond,dLaplaceParam,dLaplaceShift,dProduct,dQuotient,dChain],
    integral:[iLaplaceDef,iLaplaceExp,iLaplaceSin,iLaplaceCos,iParts,iLinear]
  },
  '6.2':{
    derivative:[dHeavisideShift,dHeavisideDist,dChain,dProduct,dQuotient,dLinear],
    integral:[iHeavisideStep,iHeavisidePulse,iLaplaceDef,iParts,iLinear]
  },
  '6.3':{
    derivative:[dDiracLaplace,dDiracModulated,dHeavisideDist,dChain,dLinear],
    integral:[iDiracArea,iDiracSifting,iHeavisideStep,iLinear]
  },
  '6.4':{
    derivative:[dInverseLinear,dInverseShift,dLaplaceParam,dChain,dLinear],
    integral:[iInverseConvolution,iInversePartialFrac,iParts,iLinear]
  },
  '6.5':{
    derivative:[dLaplacePrime,dLaplaceSecond,dDiracLaplace,dHeavisideShift,dChain,dLinear],
    integral:[iInverseConvolution,iInversePartialFrac,iDiracSifting,iHeavisideStep,iLinear]
  },
  '6.6':{
    derivative:[dLaplacePrime,dLaplaceSecond,dHeavisideShift,dDiracLaplace,dChain,dLinear],
    integral:[iInverseConvolution,iDiracSifting,iHeavisideStep,iLaplaceDef,iLinear]
  },
  '6.7':{
    derivative:[dLaplacePrime,dLaplaceSecond,dLaplaceParam,dLaplaceShift,dHeavisideShift,dDiracLaplace,dInverseLinear],
    integral:[iLaplaceDef,iInverseConvolution,iInversePartialFrac,iDiracArea,iDiracSifting,iHeavisideStep,iLinear]
  },
  '7.1':{
    derivative:[dNewtonRect,dRadialAccel,dAngularAccel,dPolarChain,dStateDerivative,dPolarBalance],
    integral:[iImpulse,iAngularImpulse,iWorkEnergy,iPolarArea,iStateTransition,iDuhamel]
  },
  '7.2':{
    derivative:[dOperatorDet,dCramerOperator,dOperatorShift,dOperatorResonance,dOperator,dLinear],
    integral:[iParamVariation,iInverseOpIntegral,iInverseD,iParts,iLinear]
  },
  '7.3':{
    derivative:[dLaplacePrime,dLaplaceSecond,dHeavisideShift,dLaplaceSystemCramer,dLaplaceResolvent,dLinear],
    integral:[iInverseConvolution,iInversePartialFrac,iHeavisideStep,iStateTransition,iLaplaceDef,iLinear]
  },
  '7.4':{
    derivative:[dMatrixCharEq,dEigenCondition,dJordanChain,dFundamentalMatrixEq,dLinear],
    integral:[iMatrixVariation,iTanIntegral,iModalTransform,iLinear]
  },
  '7.5':{
    derivative:[dProduct,dExpChain,dSin,dCos,dOperatorDet,dCramerOperator,dLaplacePrime,dLaplaceSecond,dHeavisideShift,dDiracLaplace,dJordanChain,dFundamentalMatrixEq],
    integral:[iExpA,iParts,iInversePartialFrac,iInverseConvolution,iMatrixVariation,iStateTransition]
  }
};

export function getMathReference(section,lang='tr'){
  const entry=MATH_REFERENCE[section];
  if(!entry)return null;
  const localize=list=>list.map(item=>({label:pickLang(item.label,lang),math:item.math}));
  return {derivative:localize(entry.derivative),integral:localize(entry.integral)};
}
