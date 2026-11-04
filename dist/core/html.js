export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export const formatMathText = value => {
  if (value === null || value === undefined) return '';
  let s = escapeHtml(value);

  // 1. Arrows & relations
  s = s.replace(/=>/g, ' ⇒ ').replace(/->/g, ' → ');
  s = s.replace(/!=/g, ' ≠ ').replace(/<=/g, ' ≤ ').replace(/>=/g, ' ≥ ');

  // 2. Dots & ellipses
  s = s.replace(/\s*\+\s*\.\.\.\s*\+\s*/g, ' + ⋯ + ');
  s = s.replace(/\.\.\./g, '⋯');

  // 3. Exponents with braces: e^{3x}, y^{(n)}, x^{k+p}, e^{-2x}, φ^{(p)}(a), D^{m+1}
  s = s.replace(/\^{([^}]+)}/g, '<sup>$1</sup>');

  // 4. Subscripts with braces: a_{n-1}, p_{n-1}, C_{p-1}
  s = s.replace(/_{([^}]+)}/g, '<sub>$1</sub>');

  // 5. Named subscripts: a_n, y_C, y_P, c_1, a_0, x_0, T_B, λ_k
  s = s.replace(/([a-zA-Z\u0370-\u03FF])_([0-9a-zA-Z]+)/g, '$1<sub>$2</sub>');

  // 6. Exponents without braces: e^x, x^2, D^2, y^k, (D-a)^p, λ^2
  // Match single token (alphanumeric or parenthesized), not spanning across binary operators (+, -)
  s = s.replace(/([a-zA-Z0-9\)\u0370-\u03FF\u1F00-\u1FFF\u2100-\u214F])\^(\([^\)]+\)|-?[0-9a-zA-Z]+)/g, '$1<sup>$2</sup>');

  // 7. Math spacing for equals, not equals, plus/minus in expressions
  s = s.replace(/([a-zA-Z0-9\)>subsup]+)\s*=\s*([a-zA-Z0-9\(−])/g, '$1 = $2');
  s = s.replace(/([a-zA-Z0-9\)>subsup]+)\s*≠\s*([a-zA-Z0-9\(−])/g, '$1 ≠ $2');
  s = s.replace(/([a-zA-Z0-9\)>subsup]+)\s*±\s*([a-zA-Z0-9\(])/g, '$1 ± $2');

  // 8. Math minus: convert ASCII hyphen - to unicode minus − in mathematical contexts
  // Binary minus between math tokens:
  s = s.replace(/([²³⁴ⁿ¹⁰]|<\/sup>|<\/sub>)\s*-\s*([0-9a-zA-Z\(])/g, '$1 − $2');
  s = s.replace(/(\))\s*-\s*([0-9a-zA-Z\(\[])/g, '$1 − $2');
  s = s.replace(/([0-9a-zA-Z])\s+-\s+([0-9a-zA-Z\(\[])/g, '$1 − $2');
  s = s.replace(/([0-9]+|[a-zA-Z])\s*-\s*([0-9]+|[a-zA-Z](?![a-zA-Z]))/g, (match, p1, p2) => {
    if (/^\d+$/.test(p1) && /^\d+$/.test(p2) && (p1.length > 1 || p2.length > 1)) {
      return match; // page range or year range like 140-142
    }
    return `${p1} − ${p2}`;
  });

  // Unary minus after =, (, [, or start:
  s = s.replace(/([=\(\[±,])\s*-([0-9a-zA-Z\(])/g, '$1 −$2');

  // Binary plus: clean spacing e.g. 3D+2 -> 3D + 2
  s = s.replace(/([²³⁴ⁿ¹⁰]|<\/sup>|<\/sub>|\))\s*\+\s*([0-9a-zA-Z\(])/g, '$1 + $2');
  s = s.replace(/([0-9a-zA-Z])\s*\+\s*([0-9a-zA-Z\(])/g, '$1 + $2');

  // 9. Clean minus signs inside <sup> and <sub>
  s = s.replace(/<sup>(.*?)<\/sup>/g, (_, inner) => '<sup>' + inner.replace(/-/g, '−') + '</sup>');
  s = s.replace(/<sub>(.*?)<\/sub>/g, (_, inner) => '<sub>' + inner.replace(/-/g, '−') + '</sub>');

  // 10. Clean multiple spaces
  s = s.replace(/ {2,}/g, ' ');

  return s;
};
