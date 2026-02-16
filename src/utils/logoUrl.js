const LOGO_TOKEN = 'pk_KkJ3WedxRNGjbpxwrBlmmQ';

export function logoUrl(domain, { theme = 'dark', size = 128 } = {}) {
  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png&size=${size}&theme=${theme}&fallback=monogram`;
}
