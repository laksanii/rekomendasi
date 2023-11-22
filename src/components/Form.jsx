import { useEffect, useState } from "react";
import SelectBox from "./partials/SelectBox";
import SelectSearch from "react-select-search";
import { cityList } from "../constanta";
import Select from "react-select";
import axios from "axios";

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

    useEffect(() => {
        const getCostumes = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:5000/costume"
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

    return (
        <form className="max-w-[80%] mx-auto mt-4">
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
                        <button className="sm:h-full w-full py-2 rounded bg-blue-700 hover:bg-blue-500 text-white shadow">
                            Cari
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;
