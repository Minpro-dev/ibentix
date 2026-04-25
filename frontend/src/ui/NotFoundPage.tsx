import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiHome4Line, RiArrowLeftLine } from "react-icons/ri";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-indigo-50/50 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl md:text-6xl">🔍</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Oops! Page Not Found
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Sepertinya halaman yang kamu cari sudah dipindahkan atau tidak
            pernah ada. Yuk, balik ke jalur yang benar!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="group flex cursor-pointer items-center gap-2 px-6 py-3 text-zinc-600 text-sm hover:text-indigo-600 transition-colors">
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            <RiHome4Line size={18} />
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
