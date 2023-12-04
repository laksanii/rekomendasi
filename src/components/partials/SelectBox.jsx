const SelectBox = ({
    label,
    id,
    name,
    options = ["sangat penting", "penting", "cukup penting", "tidak penting"],
}) => {
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
                {options.map((item, index) => {
                    return (
                        <option key={index} value={item} className="capitalize">
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;
