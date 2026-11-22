export const defenseCases = {
  confidentiality: 'encrypt',
  integrity: 'authenticate',
  recovery: 'isolate',
  availability: 'reserve'
};

export function evaluateDefense(incident, response) {
  const matches = defenseCases[incident] === response;
  if (incident !== 'availability') return {matches};

  // Fixed classroom workload. Ordinary service has 100 work units per
  // window. Background work has already claimed 60 in the base scenario.
  const capacity = 100;
  const requested = 80;
  const available = matches ? 80 : capacity - 60;
  return {matches, requested, served: Math.min(requested, available)};
}
