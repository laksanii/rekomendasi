import { useEffect, useState } from "react";
import SelectBox from "./partials/SelectBox";
import SelectSearch from "react-select-search";
import { cityList } from "../constanta";
import Select from "react-select";
import axios from "axios";
import {
    FLASK_API_URL,
    FLASK_GET_COSTUME_URL,
    FLASK_PROCESS_URL,
} from "../API";

import "react-select-search/style.css";

const provinceList = [
    {
        value: "1",
        name: "Bali",
    },
    {
        value: "2",
        name: "Bangka Belitung",
    },
    {
        value: "3",
        name: "Banten",
    },
    {
        value: "4",
        name: "Bengkulu",
    },
    {
        value: "5",
        name: "DI Yogyakarta",
    },
    {
        value: "6",
        name: "DKI Jakarta",
    },
    {
        value: "7",
        name: "Gorontalo",
    },
    {
        value: "8",
        name: "Jambi",
    },
    {
        value: "9",
        name: "Jawa Barat",
    },
    {
        value: "10",
        name: "Jawa Tengah",
    },
    {
        value: "11",
        name: "Jawa Timur",
    },
    {
        value: "12",
        name: "Kalimantan Barat",
    },
    {
        value: "13",
        name: "Kalimantan Selatan",
    },
    {
        value: "14",
        name: "Kalimantan Tengah",
    },
    {
        value: "15",
        name: "Kalimantan Timur",
    },
    {
        value: "16",
        name: "Kalimantan Utara",
    },
    {
        value: "17",
        name: "Kepulauan Riau",
    },
    {
        value: "18",
        name: "Lampung",
    },
    {
        value: "19",
        name: "Maluku",
    },
    {
        value: "20",
        name: "Maluku Utara",
    },
    {
        value: "21",
        name: "Nanggroe Aceh Darussalam (NAD)",
    },
    {
        value: "22",
        name: "Nusa Tenggara Barat (NTB)",
    },
    {
        value: "23",
        name: "Nusa Tenggara Timur (NTT)",
    },
    {
        value: "24",
        name: "Papua",
    },
    {
        value: "25",
        name: "Papua Barat",
    },
    {
        value: "26",
        name: "Riau",
    },
    {
        value: "27",
        name: "Sulawesi Barat",
    },
    {
        value: "28",
        name: "Sulawesi Selatan",
    },
    {
        value: "29",
        name: "Sulawesi Tengah",
    },
    {
        value: "30",
        name: "Sulawesi Tenggara",
    },
    {
        value: "31",
        name: "Sulawesi Utara",
    },
    {
        value: "32",
        name: "Sumatera Barat",
    },
    {
        value: "33",
        name: "Sumatera Selatan",
    },
    {
        value: "34",
        name: "Sumatera Utara",
    },
];

const Detail = () => {
    const [provinceSelect, setProvinceSelect] = useState(
        provinceList.map(function (item) {
            return {
                label: `${item.name}`,
                value: item.value,
            };
        })
    );
    const [cities, setCities] = useState([]);
    const [costumes, setCostumes] = useState([]);
    const [province, setProvince] = useState(null);
    const [costume, setCostume] = useState(null);
    const [city, setCity] = useState(null);
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getCostumes = async () => {
            try {
                const response = await axios.get(
                    `${FLASK_API_URL}${FLASK_GET_COSTUME_URL}`
                );
                setCostumes(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getCostumes();
    }, []);
    return (
        <>
            <div className="min-h-screen" id="section2">
                <div className="max-w-[80%] pt-20 mx-auto mt-4">
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center py-10">
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                Sunnycos-rent
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Surabaya | 20500 Followers
                            </span>
                            <div className="flex mt-4 md:mt-6">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 48 48"
                                    >
                                        <radialGradient
                                            id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                                            cx="19.38"
                                            cy="42.035"
                                            r="44.899"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                offset="0"
                                                stopColor="#fd5"
                                            ></stop>
                                            <stop
                                                offset=".328"
                                                stopColor="#ff543f"
                                            ></stop>
                                            <stop
                                                offset=".348"
                                                stopColor="#fc5245"
                                            ></stop>
                                            <stop
                                                offset=".504"
                                                stopColor="#e64771"
                                            ></stop>
                                            <stop
                                                offset=".643"
                                                stopColor="#d53e91"
                                            ></stop>
                                            <stop
                                                offset=".761"
                                                stopColor="#cc39a4"
                                            ></stop>
                                            <stop
                                                offset=".841"
                                                stopColor="#c837ab"
                                            ></stop>
                                        </radialGradient>
                                        <path
                                            fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                                            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                                        ></path>
                                        <radialGradient
                                            id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                                            cx="11.786"
                                            cy="5.54"
                                            r="29.813"
                                            gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                offset="0"
                                                stopColor="#4168c9"
                                            ></stop>
                                            <stop
                                                offset=".999"
                                                stopColor="#4168c9"
                                                stopOpacity="0"
                                            ></stop>
                                        </radialGradient>
                                        <path
                                            fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                                            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                                        ></path>
                                        <circle
                                            cx="31.5"
                                            cy="16.5"
                                            r="1.5"
                                            fill="#fff"
                                        ></circle>
                                        <path
                                            fill="#fff"
                                            d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
