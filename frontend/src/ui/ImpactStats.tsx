import { motion } from 'motion/react';
import type { User } from '../types/reviewType';


interface ImpactStatsProps {
  user: User;
}

export default function ImpactStats({ user }: ImpactStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-4 bg-primary text-white rounded-xl p-8 flex flex-col justify-center shadow-lg relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="relative z-10 w-full">
        <h4 className="text-sm font-headline font-bold mb-6 opacity-90 uppercase tracking-widest">Your Impact</h4>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="opacity-80 text-sm">Helpful Votes</span>
            <span className="text-3xl font-headline font-bold">{user.impact.helpfulVotes}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="opacity-80 text-sm">Avg. Rating</span>
            <span className="text-3xl font-headline font-bold">{user.impact.avgRating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="opacity-80 text-sm">Review Points</span>
            <span className="text-3xl font-headline font-bold">{user.impact.reviewPoints}</span>
          </div>
        </div>
        <div className="mt-10 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <p className="text-sm leading-relaxed">
            You're in the top {user.impact.topPercentage}% of contributors this month. Keep it up!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
