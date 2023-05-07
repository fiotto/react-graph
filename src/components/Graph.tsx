import { useContext, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { PrefectureContent } from "../composables/usePrefectures";
import { GRAPH_COLOR_SET, GRAPH_GRID_COLOR } from "../consts";

interface PopulationApi {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
}

interface PopulationCategory {
  label: string;
  data: PopulationData[];
}

interface PopulationData {
  year: number;
  value: number;
  rate?: number;
}

interface GraphProps {
  populations: number[];
}

interface Dataset {
  label: string | undefined;
  data: number[] | undefined;
  borderColor: string | undefined;
  backgroundColor: string | undefined;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = [
  "1960",
  "1965",
  "1970",
  "1975",
  "1980",
  "1985",
  "1990",
  "1995",
  "2000",
  "2005",
  "2010",
  "2015",
  "2020",
  "2025",
  "2030",
  "2035",
  "2040",
  "2045",
];

function Graph(props: GraphProps) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [populations, setPopulations] = useState<number[]>([]);
  const { prefectures } = useContext(PrefectureContent);

  const getOption = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const gridColor = isDarkMode ? GRAPH_GRID_COLOR.dark : GRAPH_GRID_COLOR.light
  
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "right" as const,
          labels: {
            color: gridColor
          }
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '人口数',
            color: gridColor
          },
          grid: {
            color: gridColor
          },
          ticks: {
            color: gridColor
          }
        },
        y: {
          title: {
            display: true,
            text: '年度',
            color: gridColor
          },
          grid: {
            color: gridColor
          },
          ticks: {
            color: gridColor
          }
        }
      }
    }
  }

  const [options, setPptions] = useState(getOption());

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      setPptions(getOption())
      
      console.log('ダークモードの切り替え')  
      const darkModeOn = e.matches;
      if (darkModeOn) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
      }
    });
  }, [])

  useEffect(() => {
    // 追加するグラフ
    const addItems = props.populations.filter(
      (item) => !populations.includes(item)
    );
    addItems.forEach((value) => {
      fetchPopulation(value);
    });

    // 削除するグラフ
    const deleteItems = populations.filter(
      (item) => !props.populations.includes(item)
    );
    deleteGraph(deleteItems);

    // 内容の更新
    setPopulations(props.populations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.populations]);

  const data = {
    labels,
    datasets,
  };

  const fetchPopulation = async (prefCode: number) => {
    const res = await axios.get<PopulationApi>(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      {
        headers: {
          "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
        },
        params: {
          prefCode: prefCode,
          cityCode: "-",
        },
      }
    );

    const populationData = res.data.result.data.find(
      (value) => value.label === "総人口"
    )?.data;
    const pointData = populationData?.map((value) => value.value);
    const label = prefectures.find(
      (item) => item.prefCode === prefCode
    )?.prefName;

    const newValue: Dataset = {
      label,
      data: pointData,
      borderColor: "",
      backgroundColor: "",
    };

    datasets.push(newValue);

    updateDatasets(datasets);
  };

  const deleteGraph = (deleteItems: number[]) => {
    deleteItems.forEach((value) => {
      const label = prefectures.find(
        (item) => item.prefCode === value
      )?.prefName;
      const newDatasets = [
        ...datasets.filter((value) => value.label !== label),
      ];

      updateDatasets(newDatasets);
    });
  };

  const updateDatasets = (datasets: Dataset[]) => {
    // グラフカラーの再設定
    datasets.forEach((item, index) => {
      const color = GRAPH_COLOR_SET[index % GRAPH_COLOR_SET.length];
      item.borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
      item.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b}, 0.5)`;
    });

    setDatasets([...datasets]);
  };

  return <Line options={options} data={data} />;
}

export default Graph;
