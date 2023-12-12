import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const Hasil = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: ["Skor 1", "Skor 2", "Skor 3", "Skor 4", "Skor 5"],
        },
    });
    const [series, setSeries] = useState([
        {
            name: "Pertanyaan 1",
            data: [0, 1, 3, 16, 30],
        },
        {
            name: "Pertanyaan 3",
            data: [0, 4, 3, 9, 34],
        },
        {
            name: "Pertanyaan 5",
            data: [2, 1, 5, 2, 31],
        },
        {
            name: "Pertanyaan 7",
            data: [0, 3, 7, 18, 22],
        },
        {
            name: "Pertanyaan 9",
            data: [0, 1, 1, 11, 37],
        },
    ]);

    const [options2, setOptions2] = useState({
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: ["Skor 1", "Skor 2", "Skor 3", "Skor 4", "Skor 5"],
        },
    });
    const [series2, setSeries2] = useState([
        {
            name: "Pertanyaan 2",
            data: [26, 16, 4, 3, 1],
        },
        {
            name: "Pertanyaan 4",
            data: [29, 9, 7, 4, 1],
        },
        {
            name: "Pertanyaan 6",
            data: [27, 10, 7, 2, 4],
        },
        {
            name: "Pertanyaan 8",
            data: [30, 13, 3, 2, 2],
        },
        {
            name: "Pertanyaan 10",
            data: [26, 14, 4, 4, 2],
        },
    ]);
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
                <span className="block text-2xl font-medium">
                    Grafik Hasil Analisa Kuesioner
                </span>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="">
                        <span>Grafik Skor Pertanyaan Ganjil</span>
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                        />
                    </div>
                    <div className="">
                        <span>Grafik Skor Pertanyaan Genap</span>
                        <Chart
                            options={options2}
                            series={series2}
                            type="bar"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hasil;
