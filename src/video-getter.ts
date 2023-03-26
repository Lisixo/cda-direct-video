import axios, { AxiosError } from "axios"
import { isSupportedDomain, isURL } from "./utils.js"
import { JSDOM } from 'jsdom'

export async function getDirectLinks(url: string): Promise<(Results | ErrorMessage)>{
  if(!isURL(url) || !isSupportedDomain(url)){
    return { 
      success: false,
      code: 'E_INVALID_URL',
      message: 'Provided invalid URL'
    }
  }

  let cdaRequest

  try{
    cdaRequest = await axios.get(url, { withCredentials: false })
  } catch(error: unknown){
    if( error instanceof AxiosError ){
      if(error.response.status === 404)
        return { 
          success: false,
          code: 'E_INVALID_ID',
          message: 'Invalid video ID provided'
        }
      
      return { 
        success: false,
        code: 'E_BAD_REQUEST',
        message: 'Received invalid response from platform'
      }
    }

    return { 
      success: false,
      code: 'E_UNKNOWN',
      message: 'Unknown error'
    }
  }
  

  const { window: playerWindow } = new JSDOM(cdaRequest.data)

  const player = playerWindow.document.querySelector('div[player_data]')

  if(!player || !player.getAttribute('player_data')){
    return { 
      success: false,
      code: 'E_NO_PLAYER',
      message: 'No supported player found'
    }
  }

  const data = JSON.parse(player.getAttribute('player_data'))

  if(!data.video || !data.video.qualities){
    return { 
      success: false,
      code: 'E_NO_INFO',
      message: 'Player not provided required data'
    }
  }

  const rawQualities: {[key: string]: string} = data.video.qualities
  const id = data.video.id
  const timestamp = data.video.ts
  const hash = data.video.hash2
  
  let qualities: VideoData[] = []
  let i = 0

  for(const resolution of Object.keys(rawQualities)){
    const qualitySymbol = rawQualities[resolution]

    const body = {
      jsonrpc: "2.0",
      method: "videoGetLink",
      params: [
        id,
        qualitySymbol,
        timestamp,
        hash,
        {}
      ],
      id: ++i
    }

    const api = await axios.post<CdaAPIResponse>(`https://www.cda.pl`, body)

    if(api.data.result.status !== 'ok')
      continue

    qualities.push({
      resolution,
      symbol: qualitySymbol,
      url: api.data.result.resp
    })
  }

  return {
    success: true,
    id: id,
    title: decodeURI(data.video.title),
    videos: qualities
  }
}

export interface ErrorMessage{
  success: false
  code: string
  message: string
}

export interface Results{
  success: true
  id: string
  title: string
  videos: VideoData[]
}

export interface VideoData{
  resolution: string
  symbol: string
  url: string
}

interface CdaAPIResponse{
  result: {
    status: 'ok' | 'error',
    resp: string
  },
  id: string,
  jsonrpc: string
}