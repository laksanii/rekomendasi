import Select from "react-select";
import { cityList, provinceList } from "../constanta";
import axios from "axios";
import SelectBox from "./partials/SelectBox";
import {
    FLASK_API_URL,
    FLASK_BRAND_URL,
    FLASK_GET_COSTUME_URL,
    FLASK_JASA_SEWA_COSTUME_URL,
    FLASK_JASA_SEWA_URL,
    FLASK_COSTUME_BY_JASA_SEWA_URL,
} from "../API";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useState, useEffect } from "react";

const Update = () => {
    const [cities, setCities] = useState([]);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [costumes, setCostumes] = useState([]);
    const [costumesByJasaSewa, setCostumesByJasaSewa] = useState([]);
    const [costume, setCostume] = useState(null);
    const [selectedCostume, setSelectedCostume] = useState(null);
    const [listJasaSewa, setLisJasaSewa] = useState([]);
    const [jasaSewa, setJasaSewa] = useState(null);
    const [jasaSewaCostume, setJasaSewaCostume] = useState(null);
    const [listBrand, setListBrand] = useState([]);
    const [brand, setBrand] = useState(null);
    const [brandCostume, setBrandCostume] = useState(null);
    const [brandWig, setBrandWig] = useState(null);
    const [aksesoris, setAksesoris] = useState(null);
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCostume, setIsLoadingCostume] = useState(false);
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

    useEffect(() => {
        setIsLoading(true);

        const kota = cityList.find((c) => c.value == jasaSewa?.domisili);

        const prov = provinceList.find((p) => p.value == kota?.province_id);

        selectProvince(prov);

        setTimeout(() => {
            selectCity(kota);
        }, 1500);

        setIsLoading(false);
    }, [jasaSewa]);

    useEffect(() => {
        const getCostumesByJasaSewa = async () => {
            try {
                const response = await axios.get(
                    `${FLASK_API_URL}${FLASK_COSTUME_BY_JASA_SEWA_URL}/${jasaSewaCostume.value}`
                );

                setCostumesByJasaSewa(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getCostumesByJasaSewa();
    }, [jasaSewaCostume]);

    useEffect(() => {
        const brand_costume = listBrand.find(
            (b) => b.value == selectedCostume?.brand_costume
        );

        const brand_wig = listBrand.find(
            (b) => b.value == selectedCostume?.brand_wig
        );

        setBrandCostume(brand_costume);
        setBrandWig(brand_wig);
    }, [selectedCostume]);

    const selectProvince = (province) => {
        setProvince(province);
    };

    const selectCity = (city) => {
        setCity(city);
    };

    const updateJasaSewa = async () => {
        try {
            const formEl = document.querySelector("#tambah-jasa-sewa");
            const formData = new FormData(formEl);
            formData.append("kota", city.value);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_JASA_SEWA_URL}/${jasaSewa.value}`,
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

    const updateCostume = async () => {
        setIsLoadingCostume(true);
        try {
            const formEl = document.querySelector("#tambah-costume");
            const formData = new FormData(formEl);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_GET_COSTUME_URL}/${costume.value}`,
                formData
            );
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
        setIsLoadingCostume(false);
        document
            .querySelector("#tambah")
            .scrollIntoView({ behavior: "smooth" });
    };

    const updateBrand = async () => {
        try {
            const formEl = document.querySelector("#tambah-brand");
            const formData = new FormData(formEl);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_BRAND_URL}/${brand.value}`,
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

    const updateJasaSewaCostume = async () => {
        try {
            const formEl = document.querySelector("#tambah-jasa-sewa-costume");
            const formData = new FormData(formEl);
            formData.append("jasa_sewa", jasaSewaCostume.value);
            formData.append("costume", selectedCostume.value);
            formData.append("brand_costume", brandCostume.value);
            formData.append("brand_wig", brandWig.value);
            const response = await axios.post(
                `${FLASK_API_URL}${FLASK_JASA_SEWA_COSTUME_URL}/${selectedCostume.id}`,
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
                    <Alert color="success" onDismiss={() => setSuccess(false)}>
                        <span className="font-medium">Berhasil!</span> Data
                        berhasil diupdate.
                    </Alert>
                ) : (
                    ""
                )}
                {failed ? (
                    <Alert color="failure" onDismiss={() => setFailed(false)}>
                        <span className="font-medium">Gagal!</span> Data gagal
                        diupdate.
                    </Alert>
                ) : (
                    ""
                )}
                <span className="block text-2xl font-medium">Update Data</span>
                <form
                    id="tambah-jasa-sewa"
                    className="mt-5 shadow-md px-3 py-5 rounded border"
                >
                    <span className="text-lg font-medium">
                        Update Penyedia Jasa Sewa
                    </span>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="mt-2">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Penyedia Jasa Sewa
                            </label>
                            <Select
                                options={listJasaSewa}
                                onChange={(e) => selectJasaSewa(e)}
                                value={jasaSewa ?? ""}
                            />
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
                    ) : jasaSewa ? (
                        <>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
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
                                        value={jasaSewa.label}
                                        onChange={(e) =>
                                            setJasaSewa({
                                                ...jasaSewa,
                                                label: e.target.value,
                                            })
                                        }
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
                                        value={
                                            jasaSewa.jumlah_followers_instagram
                                        }
                                        onChange={(e) =>
                                            setJasaSewa({
                                                ...jasaSewa,
                                                jumlah_followers_instagram:
                                                    e.target.value,
                                            })
                                        }
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
                                        value={jasaSewa.pilihan_jasa_pengiriman}
                                        onChange={(e) =>
                                            setJasaSewa({
                                                ...jasaSewa,
                                                pilihan_jasa_pengiriman:
                                                    e.target.value,
                                            })
                                        }
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
                                        options={provinceList}
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
                                        value={jasaSewa.whatsapp}
                                        onChange={(e) =>
                                            setJasaSewa({
                                                ...jasaSewa,
                                                whatsapp: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="w-full h-fit bg-sky-500 text-white px-4 py-2 rounded mt-3 mx-auto hover:bg-sky-700"
                                    onClick={updateJasaSewa}
                                >
                                    update
                                </button>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </form>
                <form
                    id="tambah-costume"
                    className="mt-5 shadow-md px-3 py-5 rounded border"
                >
                    <span className="text-lg font-medium">Update Kostum</span>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="mt-2">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Kostum
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
                    </div>
                    {costume ? (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
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
                                    value={costume.label}
                                    onChange={(e) =>
                                        setCostume({
                                            ...costume,
                                            label: e.target.value,
                                        })
                                    }
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
                                    value={costume.aksesoris}
                                    onChange={(e) =>
                                        setCostume({
                                            ...costume,
                                            aksesoris: e.target.value,
                                        })
                                    }
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
                                    value={costume.img}
                                    onChange={(e) =>
                                        setCostume({
                                            ...costume,
                                            img: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-2 flex items-end col-span-full">
                                {isLoadingCostume ? (
                                    <div
                                        role="status"
                                        className="mx-auto w-fit"
                                    >
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
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={updateCostume}
                                        className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </form>
                <form
                    id="tambah-brand"
                    className="mt-5 shadow-md px-3 py-5 rounded border"
                >
                    <span className="text-lg font-medium">Update Brand</span>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="mt-2">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Brand
                            </label>
                            <Select
                                options={listBrand}
                                onChange={(e) => setBrand(e)}
                                value={brand}
                                formatOptionLabel={(item) =>
                                    `${item.label} (${item.quality})`
                                }
                            />
                        </div>
                    </div>
                    {brand ? (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
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
                                    value={brand.label}
                                    onChange={(e) =>
                                        setBrand({
                                            ...brand,
                                            label: e.target.value,
                                        })
                                    }
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
                                    onClick={updateBrand}
                                    className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </form>
                <form
                    id="tambah-jasa-sewa-costume"
                    className="mt-5 shadow-md px-3 py-5 rounded border"
                >
                    <span className="text-lg font-medium">
                        Update Kostum Jasa Sewa
                    </span>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="mt-2">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Penyedia Jasa Sewa
                            </label>
                            <Select
                                options={listJasaSewa}
                                onChange={(e) => setJasaSewaCostume(e)}
                                value={jasaSewaCostume}
                            />
                        </div>
                        <div className="mt-2">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Pilih Kostum
                            </label>
                            <Select
                                options={costumesByJasaSewa}
                                onChange={(e) => setSelectedCostume(e)}
                                value={selectedCostume}
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
                    </div>
                    {jasaSewaCostume && selectedCostume ? (
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
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
                                    value={selectedCostume.harga_sewa}
                                    onChange={(e) =>
                                        setSelectedCostume({
                                            ...selectedCostume,
                                            harga_sewa: e.target.value,
                                        })
                                    }
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
                                    value={selectedCostume.aksesoris_dimiliki}
                                    onChange={(e) =>
                                        setAksesoris({
                                            ...selectedCostume,
                                            aksesoris_dimiliki: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-2 flex items-end col-span-full">
                                <button
                                    type="button"
                                    onClick={updateJasaSewaCostume}
                                    className="w-full h-fit py-2 bg-sky-500 text-white px-4 rounded mt-3 hover:bg-sky-700"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        </div>
    );
};

export default Update;
