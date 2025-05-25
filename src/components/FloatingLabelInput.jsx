const FloatingLabelInput = ({ label, id, type = 'text', value, onChange }) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1/2 peer-focus:-translate-y-1/2 peer-focus:text-blue-500 peer-focus:text-sm"
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingLabelInput;