const SelectBox = ({ label, id, name }) => {
    return (
        <div className="field">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value={"sangat penting"}>Sangat Penting</option>
                <option value={"penting"}>Penting</option>
                <option value={"cukup penting"}>Cukup Penting</option>
                <option value={"tidak penting"}>Tidak Penting</option>
            </select>
        </div>
    );
};

export default SelectBox;
