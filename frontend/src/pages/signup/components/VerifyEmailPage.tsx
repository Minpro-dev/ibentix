import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import api from "../../../api/axiosInstance";
import { useResendOtpQuery } from "./useResendOtpMutation";
import Button from "../../../ui/Button";

export function VerifyEmailPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "Your email";
  const { refetch, isFetching } = useResendOtpQuery();

  const handleResend = async () => {
    if (isFetching) return;

    try {
      const { isSuccess, error } = await refetch();

      if (isSuccess) {
        toast.success("New code sent!", {
          description: "Please check your inbox (and spam folder).",
        });
      } else if (error) {
        const axiosError = error as any;
        const message =
          axiosError?.response?.data?.message || "Failed to resend code";
        toast.error(message.toLowerCase());
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  // Handle input perubahan
  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus ke kotak selanjutnya
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return toast.error("please enter 6 digit code");

    setIsLoading(true);
    try {
      await api.post("/auth/verify-otp", { otp: code });
      toast.success("email verified successfully");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-zinc-50/50">
      <div className="w-[95%] sm:w-112.5 px-8 py-12 bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-100/50 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-800">
          Verify your email
        </h1>
        <p className="text-zinc-500 text-sm mt-3 font-light">
          We've sent a 6-digit code to{" "}
          <span className="text-zinc-800 font-medium">{email}</span>
        </p>

        {/* 6 Digit Inputs */}
        <div className="flex justify-center gap-2 mt-10 mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={data}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 border border-zinc-200 rounded-2xl text-center text-xl font-bold text-indigo-600 bg-zinc-50 outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-200 transition-all"
            />
          ))}
        </div>

        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={isLoading || otp.some((v) => v === "")}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Verify Account"
          )}
        </Button>

        <p className="mt-8 text-[11px] text-zinc-400 lowercase">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={isFetching}
            className="text-indigo-600 cursor-pointer hover:underline">
            {isFetching ? "sending..." : "resend code"}
          </button>
        </p>
      </div>
    </main>
  );
}
