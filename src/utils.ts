const WWW_FILTER_REGEX = /\b(?!www\.)(?!http:\/\/www\.)(?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*(?:\.?|\b)/g
const DOMAINS = ['cda.pl', 'ebd.cda.pl']

export function getID(url: string): number{
  return 0
}

export function isURL(url: string): boolean{
  try{
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function formatDomain(url: string){
  return new URL(url).hostname.match(WWW_FILTER_REGEX)[0]
}

export function isSupportedDomain(url: string){
  return DOMAINS.includes(formatDomain(url))
}
