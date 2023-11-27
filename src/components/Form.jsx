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

const Form = () => {
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
        setIsLoading(true);
        const formEl = document.querySelector("#form");
        const formData = new FormData(formEl);
        formData.append("costume_id", costume.value);
        formData.append("city_id", city.value);

        try {
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_PROCESS_URL}`,
                formData
            );
            setResult(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <form
                className="max-w-[80%] pt-20 min-h-screen mx-auto mt-4"
                id="form"
            >
                <div className="mb-2">
                    <span className="block font-medium mb-3">
                        Pilih bobot kepentingan setiap kriteria
                    </span>
                    <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  gap-4">
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
                        {costume?.label}{" "}
                    </span>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="border">
                                    <th scope="col" className="px-6 py-3 w-2">
                                        Rank
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Penyedia Jasa
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
                                                {item["jasa sewa"]}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Form;
