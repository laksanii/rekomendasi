import { useEffect, useState } from "react";
import Select from "react-select";
import { cityList } from "../constanta";
import axios from "axios";
import SelectBox from "./partials/SelectBox";
import {
    FLASK_API_URL,
    FLASK_BRAND_URL,
    FLASK_GET_COSTUME_URL,
    FLASK_JASA_SEWA_COSTUME_URL,
    FLASK_JASA_SEWA_URL,
} from "../API";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";

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

const TambahData = () => {
    const [provinceSelect, setProvinceSelect] = useState(
        provinceList.map(function (item) {
            return {
                label: `${item.name}`,
                value: item.value,
            };
        })
    );
    const [cities, setCities] = useState([]);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [costumes, setCostumes] = useState([]);
    const [costume, setCostume] = useState("");
    const [listJasaSewa, setLisJasaSewa] = useState([]);
    const [jasaSewa, setJasaSewa] = useState("");
    const [listBrand, setListBrand] = useState([]);
    const [brandCostume, setBrandCostume] = useState("");
    const [brandWig, setBrandWig] = useState("");
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();

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

        const getJasaSewa = async () => {
            try {
                const response = await axios.get(
                    `${FLASK_API_URL}${FLASK_JASA_SEWA_URL}`
                );
                setLisJasaSewa(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getBrands = async () => {
            try {
                const response = await axios.get(
                    `${FLASK_API_URL}${FLASK_BRAND_URL}`
                );
                setListBrand(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getCostumes();
        getJasaSewa();
        getBrands();
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

    const insertJasaSewa = async () => {
        try {
            const formEl = document.querySelector("#tambah-jasa-sewa");
            const formData = new FormData(formEl);
            formData.append("kota", city.value);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_JASA_SEWA_URL}`,
                formData
            );
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
    };

    const insertCostume = async () => {
        try {
            const formEl = document.querySelector("#tambah-costume");
            const formData = new FormData(formEl);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_GET_COSTUME_URL}`,
                formData
            );
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
    };

    const insertBrand = async () => {
        try {
            const formEl = document.querySelector("#tambah-brand");
            const formData = new FormData(formEl);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_BRAND_URL}`,
                formData
            );
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
    };

    const insertJasaSewaCostume = async () => {
        try {
            const formEl = document.querySelector("#tambah-jasa-sewa-costume");
            const formData = new FormData(formEl);
            formData.append("jasa_sewa", jasaSewa.value);
            formData.append("costume", costume.value);
            formData.append("brand_costume", brandCostume.value);
            formData.append("brand_wig", brandWig.value);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_JASA_SEWA_COSTUME_URL}`,
                formData
            );
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
        document
            .querySelector("#tambah")
            .scrollIntoView({ behavior: "smooth" });
    };

    const selectJasaSewa = (jasaSewa) => {
        setJasaSewa(jasaSewa);
    };

    const selectCostume = (costume) => {
        setCostume(costume);
    };

    const selectBrandCostume = (brand) => {
        setBrandCostume(brand);
    };

    const selectBrandWig = (brand) => {
        setBrandWig(brand);
    };

    return (
        <>
            <div className="min-h-screen pb-10" id="tambah">
                <div className="max-w-[80%] mx-auto mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="px-2 py-2 bg-sky-500 rounded text-white font-medium mb-3 flex items-center"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0}></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M15 6L9 12L15 18"
                                    stroke="#FFFFFF"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>{" "}
                        Kembali ke Home
                    </button>
                    {success ? (
                        <Alert
                            color="success"
                            onDismiss={() => setSuccess(false)}
                        >
                            <span className="font-medium">Berhasil!</span> Data
                            berhasil ditambahkan.
                        </Alert>
                    ) : (
                        ""
                    )}
                    {failed ? (
                        <Alert
                            color="failure"
                            onDismiss={() => setFailed(false)}
                        >
                            <span className="font-medium">Gagal!</span> Data
                            gagal ditambahkan.
                        </Alert>
                    ) : (
                        ""
                    )}
                    <span className="block text-2xl font-medium">
                        Tambah Data
                    </span>
                    <form
                        id="tambah-jasa-sewa"
                        className="mt-5 shadow-md px-3 py-5 rounded border"
                    >
                        <span className="text-lg font-medium">
                            Tambah Penyedia Jasa Sewa
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username Instagram Jasa Sewa
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="username"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Followers Instagram Jasa Sewa
                                </label>
                                <input
                                    type="number"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="jumlah_followers"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Jumlah Pilihan Jasa Pengiriman
                                </label>
                                <input
                                    type="number"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="jasa_pengiriman"
                                />
                            </div>
                            <div className="mt-2">
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
                            <div className="mt-2">
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
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    No Whatsapp
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="whatsapp"
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="bg-sky-500 text-white px-4 py-2 rounded mt-3 mx-auto hover:bg-sky-700"
                                onClick={insertJasaSewa}
                            >
                                Tambah
                            </button>
                        </div>
                    </form>
                    <form
                        id="tambah-costume"
                        className="mt-5 shadow-md px-3 py-5 rounded border"
                    >
                        <span className="text-lg font-medium">
                            Tambah Kostum
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nama Kostum
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="nama"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Aksesoris
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="aksesoris"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    URL Gambar
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="img"
                                />
                            </div>
                            <div className="mt-2 flex items-end col-span-full">
                                <button
                                    type="button"
                                    onClick={insertCostume}
                                    className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </form>
                    <form
                        id="tambah-brand"
                        className="mt-5 shadow-md px-3 py-5 rounded border"
                    >
                        <span className="text-lg font-medium">
                            Tambah Brand
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nama Brand
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="nama"
                                />
                            </div>
                            <div className="mt-2">
                                <SelectBox
                                    label={"Kualitas Brand"}
                                    id={"kualitas_kostum"}
                                    name={"quality"}
                                    options={["bagus", "cukup", "kurang"]}
                                />
                            </div>
                            <div className="mt-2 flex items-end">
                                <button
                                    type="button"
                                    onClick={insertBrand}
                                    className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </form>
                    <form
                        id="tambah-jasa-sewa-costume"
                        className="mt-5 shadow-md px-3 py-5 rounded border"
                    >
                        <span className="text-lg font-medium">
                            Tambah Kostum ke Jasa Sewa
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Jasa Sewa
                                </label>
                                <Select
                                    options={listJasaSewa}
                                    onChange={(e) => selectJasaSewa(e)}
                                    value={jasaSewa}
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Kostum
                                </label>
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
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Harga kostum
                                </label>
                                <input
                                    type="number"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="harga_sewa"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Brand Kostum
                                </label>
                                <Select
                                    options={listBrand}
                                    onChange={(e) => selectBrandCostume(e)}
                                    value={brandCostume}
                                    formatOptionLabel={(item) => (
                                        <div className="flex h-10 items-center gap-3">
                                            <span>
                                                {item.label} ({item.quality})
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Brand Wig
                                </label>
                                <Select
                                    options={listBrand}
                                    onChange={(e) => selectBrandWig(e)}
                                    value={brandWig}
                                    formatOptionLabel={(item) => (
                                        <div className="flex h-10 items-center gap-3">
                                            <span>
                                                {item.label} ({item.quality})
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="base-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    aksesoris dimiliki
                                </label>
                                <input
                                    type="text"
                                    id="base-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="aksesoris_dimiliki"
                                />
                            </div>
                            <div className="mt-2 flex items-end col-span-full">
                                <button
                                    type="button"
                                    onClick={insertJasaSewaCostume}
                                    className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TambahData;
