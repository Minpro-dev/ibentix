interface PersonalInfo {
  ticketNumber: number;
}

export default function PersonalInfo({ ticketNumber }: PersonalInfo) {
  // const { personalDetails, setPersonalDetails } = useOrderStore();

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      {/* Judul sesuai gambar: Bold dan berwarna Slate gelap */}
      <h2 className="text-xl font-bold text-[#0F172A] mb-8">
        Ticket Details {ticketNumber}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Full Name Field */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#0F172A]">
            Full Name
          </label>
          <input
            className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            placeholder="Enter your legal name"
            type="text"
            // value={personalDetails.fullName}
            // onChange={(e) => setPersonalDetails({ fullName: e.target.value })}
          />
        </div>

        {/* Email Address Field */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#0F172A]">
            Email Address
          </label>
          <input
            className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            placeholder="example@email.com"
            type="email"
            // value={personalDetails.email}
            // onChange={(e) => setPersonalDetails({ email: e.target.value })}
          />
        </div>
      </div>
    </section>
  );
}
