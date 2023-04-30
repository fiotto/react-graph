import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserCount = createContext(10);

export interface PrefecturesApi {
  message: string | null
  result: Prefecture[]
}

export interface Prefecture {
  prefCode: number 
  prefName: string
}

export default function usePrefectures() {
  const [ prefectures, setPrefectures ] = useState<Prefecture[]>([]);

  const fetchPrefectures = async () => {
    const res = await axios.get<PrefecturesApi>('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY
      }
    })
    console.log('res', res)
    setPrefectures(res.data.result)
  }

  useEffect(() => {
    fetchPrefectures()
  },[])

  return {
    prefectures,
    setPrefectures
  }
}