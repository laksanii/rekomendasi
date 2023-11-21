import { useEffect, useState } from "react";
import SelectBox from "./partials/SelectBox";
import SelectSearch from "react-select-search";
import axios from "axios";

import { RAJA_ONGKIR_API_KEY, RAJA_ONGKIR_GET_PROVINCE_URL } from "../API";

import "react-select-search/style.css";

const Form = () => {
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        const getProvinces = async () => {
            try {
                const response = await axios.get(
                    `${RAJA_ONGKIR_GET_PROVINCE_URL}`,
                    {
                        params: {
                            key: RAJA_ONGKIR_API_KEY,
                        },
                    }
                );

                const temp = response.data.rajaongkir.results.map(function () {
                    return {
                        name: "province",
                        value: "province_id",
                    };
                });
                setProvinces(temp);
            } catch (error) {
                console.log(error);
            }
        };

        getProvinces();
    }, []);

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
                    Masukan alamat anda
                </span>
                <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
                    <SelectSearch
                        options={provinces}
                        name="province"
                        placeholder="Pilih Provinsi"
                        search={true}
                    />
                </div>
            </div>
        </form>
    );
};

export default Form;
