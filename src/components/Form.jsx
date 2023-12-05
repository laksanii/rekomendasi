import { useEffect, useState } from "react";
import { Modal, Alert } from "flowbite-react";
import SelectBox from "./partials/SelectBox";
import SelectSearch from "react-select-search";
import { cityList } from "../constanta";
import Select from "react-select";
import axios from "axios";
import {
    FLASK_API_URL,
    FLASK_DETAIL_URL,
    FLASK_GET_COSTUME_URL,
    FLASK_PROCESS_URL,
} from "../API";
import Chart from "react-apexcharts";

import assets1 from "../assets/assets1.png";

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

const Form = () => {
    const [provinceSelect, setProvinceSelect] = useState(
        provinceList.map(function (item) {
            return {
                label: `${item.name}`,
                value: item.value,
            };
        })
    );
    const [options, setOptions] = useState(null);

    const [series, setSeries] = useState(null);
    const [cities, setCities] = useState([]);
    const [costumes, setCostumes] = useState([]);
    const [province, setProvince] = useState(null);
    const [costume, setCostume] = useState(null);
    const [city, setCity] = useState(null);
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalName, setModalName] = useState("");
    const [modalDom, setModalDom] = useState("");
    const [modalFollowers, setModalFollowers] = useState(0);
    const [modalWhatsapp, setModalWhatsapp] = useState(null);
    const [failed, setFailed] = useState(false);

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

    useEffect(() => {
        const temp = cityList.filter(
            (city) => city.province_id == province?.value
        );
        setCities(temp);
        setCity(null);
    }, [province]);

    const selectProvince = (province) => {
        setProvince(province);
    };

    const selectCity = (city) => {
        setCity(city);
    };

    const selectCostume = (costume) => {
        setCostume(costume);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const formEl = document.querySelector("#form");
            const formData = new FormData(formEl);
            if (!city || !costume) {
                setFailed(true);
                setIsLoading(false);
                return;
            }
            formData.append("costume_id", costume.value);
            formData.append("city_id", city.value);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_PROCESS_URL}`,
                formData
            );
            const merged = [];
            // setResult(response.data);
            console.log(response.data);
            response.data.data.forEach((obj1) => {
                const matching = response.data.rank.find(
                    (obj2) => obj2["jasa sewa"] === obj1["jasa sewa"]
                );

                if (matching) {
                    merged.push({ ...obj1, ...matching });
                }
            });

            const myseries = response.data.rank.map((item) => item.V);
            const myoptions = response.data.rank.map(
                (item) => item["jasa sewa"]
            );
            const tempOption = {
                chart: {
                    id: "line-chart",
                },
                xaxis: {
                    categories: myoptions,
                },
            };
            const tempSeries = [
                {
                    name: "Preference",
                    data: myseries,
                },
            ];
            setSeries(tempSeries);
            setOptions(tempOption);

            setResult(merged.sort((a, b) => b.V - a.V));
            console.log(merged.sort((a, b) => b.V - a.V));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const openDetail = async (id) => {
        try {
            const response = await axios.get(
                `${FLASK_API_URL}${FLASK_DETAIL_URL}/${id}`
            );
            setModalName(response.data[0].nama);
            setModalDom(response.data[0].kota);
            setModalFollowers(response.data[0].jumlah_followers_instagram);
            setModalWhatsapp(response.data[0].whatsapp);
            setOpenModal(true);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getYears = () => {
        const start = 2023;
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = start; i <= currentYear; i++) {
            years.push(i);
        }
        years.push("data terbaru");

        return years;
    };

    const card = () => {
        return (
            <div className="pb-10 dark:bg-gray-800 dark:border-gray-700">
                <img className="absolute right-0 h-40" src={assets1} alt="" />
                <div className="flex flex-col items-center">
                    <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                        {modalName}
                    </h5>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                        {modalDom} | {modalFollowers} Followers
                    </span>
                    <div className="flex gap-3 mt-4 md:mt-6">
                        <a
                            href={`https://www.instagram.com/${modalName}`}
                            target="_blank"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="50"
                                height="50"
                                viewBox="0 0 48 48"
                            >
                                <radialGradient
                                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                                    cx="19.38"
                                    cy="42.035"
                                    r="44.899"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0" stopColor="#fd5"></stop>
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
                                    <stop offset="0" stopColor="#4168c9"></stop>
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

                        {modalWhatsapp ? (
                            <a
                                href={`https://wa.me/${modalWhatsapp}`}
                                target="_blank"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        fill="#fff"
                                        d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
                                    ></path>
                                    <path
                                        fill="#fff"
                                        d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                                    ></path>
                                    <path
                                        fill="#cfd8dc"
                                        d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                                    ></path>
                                    <path
                                        fill="#40c351"
                                        d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                                    ></path>
                                    <path
                                        fill="#fff"
                                        fillRule="evenodd"
                                        d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="min-h-screen" id="section2">
                <form className="max-w-[80%] pt-20 mx-auto mt-4" id="form">
                    {failed ? (
                        <Alert
                            color="failure"
                            onDismiss={() => setFailed(false)}
                        >
                            <span className="font-medium">Gagal!</span> Lengkapi
                            data yang diperlukan.
                        </Alert>
                    ) : (
                        ""
                    )}
                    <div className="my-2">
                        <span className="block font-medium mb-3">
                            Pilih bobot kepentingan setiap kriteria
                        </span>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4">
                            <SelectBox
                                label={"Harga Sewa"}
                                id={"harga_sewa"}
                                name={"harga_sewa"}
                            />
                            <SelectBox
                                label={"Kelengkapan Aksesoris"}
                                id={"kelengkapan_aksesoris"}
                                name={"kelengkapan_aksesoris"}
                            />
                            <SelectBox
                                label={"Ongkos Kirim"}
                                id={"ongkos_kirim"}
                                name={"ongkos_kirim"}
                            />
                            <SelectBox
                                label={"Brand Kostum"}
                                id={"brand_kostum"}
                                name={"brand_kostum"}
                            />
                            <SelectBox
                                label={"Brand Wig"}
                                id={"brand_wig"}
                                name={"brand_wig"}
                            />
                            <SelectBox
                                label={"Pilihan Jasa Pengiriman"}
                                id={"pilihan_jasa_pengiriman"}
                                name={"pilihan_jasa_pengiriman"}
                            />
                            <SelectBox
                                label={"Followers Instagram"}
                                id={"followers_instagram"}
                                name={"followers_instagram"}
                            />
                            <SelectBox
                                label={"Riwayat Data"}
                                id={"riwayat_data"}
                                name={"riwayat_data"}
                                options={getYears().reverse()}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="block font-medium mb-3">
                            Masukan domisili anda
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                            <div className="field">
                                <label
                                    htmlFor="province"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Provinsi
                                </label>
                                <Select
                                    options={provinceSelect}
                                    onChange={(e) => selectProvince(e)}
                                    value={province}
                                />
                            </div>
                            <div className="field">
                                <label
                                    htmlFor="Kota"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Kota
                                </label>
                                <Select
                                    options={cities}
                                    onChange={(e) => selectCity(e)}
                                    value={city}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="block font-medium mb-3">
                            Pilih kostum yang ingin dicari
                        </span>
                        <div className="grid sm:grid-cols-7 gap-4">
                            <div className="field sm:col-span-6">
                                <Select
                                    options={costumes}
                                    onChange={(e) => selectCostume(e)}
                                    value={costume}
                                    formatOptionLabel={(item) => (
                                        <div className="flex h-10 items-center gap-3">
                                            <span>{item.label}</span>
                                            {item.img ? (
                                                <img
                                                    src={item.img}
                                                    alt=""
                                                    className="object-contain h-full"
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field sm:col-span-1">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="sm:h-full w-full py-2 rounded bg-blue-700 hover:bg-blue-500 text-white shadow"
                                >
                                    Cari
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div role="status" className="mx-auto w-fit">
                            <svg
                                aria-hidden="true"
                                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        ""
                    )}
                </form>
                {result.length > 0 ? (
                    <div className="max-w-[80%] mx-auto mt-4">
                        <span className="font-medium">
                            Daftar Ranking Penyedia Jasa Sewa Kostum{" "}
                            <span className="capitalize">{costume?.label}</span>{" "}
                        </span>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                            <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="border">
                                        <th scope="col" className="px-6 py-3">
                                            Rank
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nama Penyedia Jasa
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3"
                                        >
                                            Harga Sewa
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Brand Kostum
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Brand Wig
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3"
                                        >
                                            Ongkos Kirim
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3"
                                        >
                                            Aksesoris dimiliki
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3"
                                        >
                                            Jumlah pilihan ekspedisi
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3"
                                        >
                                            Jumlah followers Instagram
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((item, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            >
                                                <td
                                                    scope="col"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white"
                                                >
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="cursor-pointer underline hover:text-slate-700"
                                                        onClick={() =>
                                                            openDetail(
                                                                item[
                                                                    "jasa sewa"
                                                                ]
                                                            )
                                                        }
                                                    >
                                                        {item["jasa sewa"]}
                                                    </span>
                                                </td>
                                                <td className="text-center py-4">
                                                    {`Rp ${parseInt(
                                                        item["harga sewa"]
                                                    ).toLocaleString("id-ID")}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`${item["brand kostum"]} (${item["kualitas kostum"]})`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`${item["brand wig"]} (${item["kualitas wig"]})`}
                                                </td>
                                                <td className="py-4 text-center">
                                                    {`Rp ${item[
                                                        "ongkos kirim"
                                                    ].toLocaleString("id-ID")}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item["aksesoris dimiliki"]}
                                                </td>
                                                <td className="text-center py-4">
                                                    {
                                                        item[
                                                            "pilihan jasa pengiriman"
                                                        ]
                                                    }
                                                </td>
                                                <td className="text-center py-4">
                                                    {`${item[
                                                        "jumlah followers instagram"
                                                    ].toLocaleString("id-ID")}`}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4">
                            <Chart
                                options={options}
                                series={series}
                                type="line"
                                width="100%"
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <Modal
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Detail Penyedia Jasa Sewa</Modal.Header>
                <Modal.Body>{card()}</Modal.Body>
            </Modal>
        </>
    );
};

export default Form;
