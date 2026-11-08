/** Keep Visual Data Agent links inside its product section. */
export function visualDataAgentHref(href: string = '/'): string {
  return href.startsWith('/') && !href.startsWith('//')
    ? `${import.meta.env.BASE_URL}${href.slice(1)}`
    : href;
}
