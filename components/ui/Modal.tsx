type ModalProps = {
    children: React.ReactNode;
    handleClick?: () => void;
    handleCancel: () => void;
};

const Modal = ({ children, handleClick, handleCancel }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md text-black border border-gray-400">
                <div className="mb-4">{children}</div>
                <div className="flex justify-end gap-3">
                    {handleClick && (
                        <button
                            onClick={() => {
                                handleClick()
                                handleCancel()
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Confirm
                        </button>
                    )}
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
