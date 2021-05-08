import Base from '../base';

export function envFn(v: string, fallback?: string | number) {
  const envVal = Base.envVariables[v.toLowerCase()];
  return (typeof envVal === 'function' ? envVal() : envVal) ?? fallback;
}
