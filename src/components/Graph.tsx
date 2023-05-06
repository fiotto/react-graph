import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
};

const labels = ['1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045'];

function Graph () {
  useEffect(() => {
    setTimeout(() => {
      fetchPopulation(13)
    }, 2000)
  },[])

  const [ datasets , setDatasets ] = useState<any>([
    {
      label: 'サンプル',
      data: [ 9683802, 10869244, 9683802, 10869244, 9683802, 10869244, 9683802, 10869244, 9683802, 10869244 ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ])

  const data = {
    labels,
    datasets,
  };
  
  const fetchPopulation = async (prefCode: number) => {
    const res = await axios.get<any>('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', {
      headers: {
        'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY
      },
      params: {
        prefCode: prefCode,
        cityCode: '-'
      }
    })
    console.log('res', res.data.result)
  
    const populationData = res.data.result.data.find((value: any) => value.label === '総人口').data
    console.log('populationData', populationData)
    const hoge = populationData.map((value: any) => value.value)
    console.log('hoge', hoge)

    datasets.push(datasets[0])
    const newDatasets = JSON.parse(JSON.stringify(datasets))
    newDatasets[0].data = hoge
    setDatasets(newDatasets)
  }
  
  return (
    <Line options={options} data={data} />
  ) 
}

export default Graph
