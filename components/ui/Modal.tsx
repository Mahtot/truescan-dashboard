type ModalProps = {
    message: string;
    handleClick: () => void;
    handleCancel: () => void;
};

const Modal = ({ message, handleClick, handleCancel, }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 opacity-100 w-[90%] max-w-md text-black border border-gray-400">
                <h1 className="text-lg font-semibold mb-4">{message}</h1>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Confirm
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
