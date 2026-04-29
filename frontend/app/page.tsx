"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Sparkles,
  Search,
  Target,
  BarChart3,
  Award,
  Zap,
  CheckCircle2,
  Trophy,
  Users
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-8 rounded-[32px] bg-white border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#3525cd] mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h4 className="text-lg font-black text-[#1A1C1E] mb-3">{title}</h4>
    <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
  </motion.div>
);

const StatItem = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="p-3 rounded-xl bg-white/10 text-white mb-2">
      <Icon size={24} />
    </div>
    <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{label}</div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden flex flex-col font-sans selection:bg-[#3525cd]/10 selection:text-[#3525cd]">
      {/* Background Blobs */}
      <div className="fixed -top-40 -left-40 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[100px] -z-10" />
      
      {/* Navigation */}
      <nav className="w-full h-24 flex justify-between items-center px-10 max-w-screen-2xl mx-auto z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-lg shadow-[#3525cd]/20">
            <Layers size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-[#1A1C1E]">Nexus Talent</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-[#3525cd] transition-colors">Sign In</Link>
          <Link href="/register" className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-[#3525cd] shadow-[0_10px_30px_rgba(53,37,205,0.25)] hover:shadow-[0_15px_35px_rgba(53,37,205,0.35)] hover:-translate-y-1 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="max-w-4xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] font-bold tracking-widest uppercase text-[#3525cd] mb-10"
          >
            <Sparkles size={14} className="text-amber-400" />
            Empowering the next generation of talent
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[90px] font-black tracking-tighter text-[#1A1C1E] leading-[0.85] mb-8"
          >
            Architect your<br />
            <span className="text-[#3525cd] italic">professional </span> legacy.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            A high-fidelity career orchestration platform designed for modern engineers, 
            visionaries, and the leaders of tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register" className="w-full sm:w-auto px-10 py-5 rounded-[20px] bg-[#3525cd] text-white flex items-center justify-center gap-3 font-bold shadow-2xl shadow-indigo-200 hover:-translate-y-1 transition-all group">
              Start Your Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 rounded-[20px] bg-white border border-slate-200 text-slate-700 flex items-center justify-center gap-3 font-bold hover:bg-slate-50 transition-all">
              <Zap size={20} className="text-amber-500" />
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Background Shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="max-w-screen-xl mx-auto px-10 py-20 w-full mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: "Student", href: "/student", icon: GraduationCap, desc: "Discover premium opportunities, track applications, and cultivate your professional presence." },
            { role: "Recruiter", href: "/recruiter", icon: Briefcase, desc: "Identify world-class talent, streamline your acquisition pipeline, and scale your vision." },
            { role: "Staff", href: "/staff", icon: ShieldCheck, desc: "Oversee ecosystem dynamics, moderate insights, and drive institutional excellence." }
          ].map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={item.href} className="group block h-full">
                <div className="relative h-full p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 text-left flex flex-col items-start overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:bg-[#3525cd] transition-colors duration-500">
                    <item.icon size={28} strokeWidth={2} className="text-[#3525cd] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1A1C1E] mb-3">{item.role}</h3>
                  <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-10 flex-grow">{item.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#3525cd] group-hover:gap-4 transition-all">
                    Enter Portal <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section className="bg-white py-32 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-10">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3525cd] mb-6">Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1A1C1E] leading-tight">Everything you need<br />to succeed in the industry.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Target} 
              title="Smart Matching" 
              desc="Our AI algorithm maps your skills directly to high-impact career opportunities." 
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Live Analytics" 
              desc="Track your profile performance and application status with real-time insights." 
              delay={0.2}
            />
            <FeatureCard 
              icon={Trophy} 
              title="Skill Grading" 
              desc="Get instant scores on your technical skills via automated assessment modules." 
              delay={0.3}
            />
            <FeatureCard 
              icon={Award} 
              title="Verified Badges" 
              desc="Showcase your achievements with blockchain-backed credentials for potential employers." 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How it Works - Student Journey */}
      <section className="py-32">
        <div className="max-w-screen-xl mx-auto px-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-left">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3525cd] mb-6">The Journey</h2>
              <h3 className="text-5xl font-black tracking-tighter text-[#1A1C1E] leading-[0.95] mb-12">How students land<br />their dream careers.</h3>
              
              <div className="space-y-10">
                {[
                  { step: "01", title: "Build Premium Profile", desc: "Showcase your skills, projects, and potential to world-class recruiters." },
                  { step: "02", title: "AI-Powered Matching", desc: "Receive curated job recommendations that align perfectly with your career goals." },
                  { step: "03", title: "Apply & Conquer", desc: "Track every application and move through the hiring pipeline with confidence." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="text-4xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors uppercase italic">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-black text-[#1A1C1E] mb-2">{item.title}</h4>
                      <p className="text-[15px] font-medium text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop" 
                  alt="Student using platform" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-lg font-black text-[#1A1C1E]">98% Success Rate</div>
                  <div className="text-xs font-bold text-slate-400">Match Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 bg-[#1A1C1E] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#3525cd]/10 mix-blend-overlay -z-10" />
        <div className="max-w-screen-xl mx-auto px-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <StatItem icon={Users} label="Active Students" value="12k+" />
            <StatItem icon={Briefcase} label="Job Vacancies" value="5.8k" />
            <StatItem icon={CheckCircle2} label="Placements" value="850+" />
            <StatItem icon={Layers} label="Top Companies" value="200+" />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#3525cd] rounded-[60px] p-12 lg:p-24 text-center text-white relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8">Ready to define your professional future?</h2>
              <p className="text-xl text-white/70 font-medium mb-12 leading-relaxed">Join thousands of students and recruiters already shaping the industry on Nexus Talent.</p>
              
              <Link href="/register" className="inline-flex items-center gap-4 px-12 py-6 rounded-[24px] bg-white text-[#3525cd] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Get Started Now <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 flex flex-col items-center gap-6 text-slate-400 bg-white border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3525cd] flex items-center justify-center text-white">
            <Layers size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-black tracking-tighter text-[#1A1C1E]">Nexus Talent</span>
        </div>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
          <Link href="#" className="hover:text-[#3525cd] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#3525cd] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[#3525cd] transition-colors">Contact Support</Link>
        </div>
        <p className="text-sm font-medium">© 2026 CareerArchitect. Engineered for Excellence.</p>
      </footer>
    </div>
  );
}

