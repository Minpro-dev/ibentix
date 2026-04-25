import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  RiLockPasswordLine,
  RiArrowLeftLine,
  RiShieldUserLine,
} from "react-icons/ri";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 flex justify-center">
          <div className="w-24 h-24 bg-indigo-50 rounded-4xl flex items-center justify-center text-indigo-600 relative z-10">
            <RiLockPasswordLine size={48} />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -z-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-indigo-600 mb-2">
            <RiShieldUserLine size={18} />
            <span className="text-[10px] uppercase">Security Check</span>
          </div>

          <h1 className="text-3xl text-zinc-900">Restricted Access</h1>

          <p className="text-zinc-500 text-sm md:text-base leading-relaxed px-4">
            Oops! You are not authorized to access this page
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="group cursor-pointer w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 text-sm">
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
            Go to Previous Page
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-4 text-xs cursor-pointer text-zinc-400 hover:text-indigo-600 transition-colors">
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
