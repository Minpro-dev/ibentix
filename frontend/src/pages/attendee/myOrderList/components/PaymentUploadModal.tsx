import { useState } from "react";
import {
  RiUploadCloud2Line,
  RiFileImageLine,
  RiCloseLine,
} from "react-icons/ri";
import { useUploadPayment } from "../hooks/usePaymentMutation";

interface Props {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentUploadModal({
  orderId,
  isOpen,
  onClose,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: upload, isPending } = useUploadPayment(orderId);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      upload(selectedFile, {
        onSuccess: () => {
          setSelectedFile(null);
          onClose();
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-gray-900 text-lg">
            Upload Payment Proof
          </h2>
          <button
            onClick={onClose}
            className="p-1 cursor-pointer hover:bg-gray-100 text-zinc-600 bg-gray-200 rounded-full transition-colors">
            <RiCloseLine size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* DROPZONE AREA */}
          <label
            className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
              selectedFile
                ? "border-indigo-500 bg-indigo-50/30"
                : "border-gray-200 hover:border-indigo-300"
            }`}>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <div className="text-center">
                <RiFileImageLine
                  className="mx-auto text-indigo-500 mb-2"
                  size={40}
                />
                <p className="text-sm font-medium text-gray-900 truncate max-w-50">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-gray-500 mt-1">
                  Click to change file
                </p>
              </div>
            ) : (
              <div className="text-center">
                <RiUploadCloud2Line
                  className="mx-auto text-gray-400 mb-2"
                  size={40}
                />
                <p className="text-sm text-gray-600">Select Image Proof</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  PNG, JPG, JPEG up to 2MB
                </p>
              </div>
            )}
          </label>

          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isPending}
            className="w-full cursor-pointer py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all disabled:bg-gray-200 disabled:text-gray-400">
            {isPending ? "Uploading..." : "Submit Proof"}
          </button>
        </div>
      </div>
    </div>
  );
}
