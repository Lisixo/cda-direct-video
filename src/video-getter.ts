import { isSupportedDomain, isURL } from "./utils"

export function getDirectLinks(url: string): (Results | ErrorMessage){
  if(!isURL(url) || !isSupportedDomain(url)){
    return { 
      success: false,
      message: 'Invalid URL'
    }
  }
}

export interface ErrorMessage{
  success: false
  message: string
}

export interface Results{
  success: true
  videos: {[key: string]: string}
}