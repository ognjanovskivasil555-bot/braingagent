import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { FaTwitter, FaTelegramPlane, FaDiscord, FaCopy, FaCheck, FaArrowRight, FaBrain, FaNetworkWired, FaWallet, FaExchangeAlt, FaRobot } from 'react-icons/fa';

// Particle Background Component
const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Decorative glowing orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]"
      />
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaBrain className="text-accent text-3xl animate-pulse" />
          <span className="text-2xl font-bold tracking-wider font-mono text-glow-primary">BRAIN AGENT</span>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-sm tracking-widest">
          {['ABOUT', 'TOKENOMICS', 'ROADMAP', 'BUY'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </nav>
        <button 
          onClick={() => scrollTo('buy')}
          className="hidden md:flex items-center gap-2 bg-primary/10 border border-primary px-6 py-2 rounded text-primary font-mono hover:bg-primary hover:text-primary-foreground transition-all duration-300 box-glow-primary"
        >
          CONNECT <FaNetworkWired />
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <NeuralBackground />
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-block border border-accent/50 bg-accent/10 px-4 py-1 rounded-full mb-6 text-accent font-mono text-sm tracking-widest">
            BASE CHAIN SECURED
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter uppercase text-glow-primary">
            The Intelligence <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Revolution</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl mx-auto mb-10 leading-relaxed">
            Trades smarter. Thinks faster. Outperforms the market. 
            <strong className="text-foreground font-bold"> $BRAIN</strong> is the sentient entity at the bleeding edge of DeFi utility and culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold font-mono text-lg rounded box-glow-primary hover:scale-105 transition-transform flex items-center justify-center gap-3">
              INITIALIZE BUY <FaArrowRight />
            </button>
            <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-muted-foreground text-foreground font-bold font-mono text-lg rounded hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-3">
              READ MANIFESTO <FaRobot />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

const ContractAddress = () => {
  const [copied, setCopied] = useState(false);
  const address = "0x53D2730a74f5dCa970230Ada5cD882cD4a3C5bA3";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 border-y border-primary/20 bg-card/50 backdrop-blur relative z-10">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-sm text-muted-foreground mb-4 tracking-widest">OFFICIAL NEURAL LINK (CONTRACT)</p>
        <div 
          onClick={copyToClipboard}
          className="inline-flex items-center gap-4 bg-background border border-primary/30 px-6 py-4 rounded-lg cursor-pointer hover:border-primary hover:box-glow-primary transition-all group"
        >
          <span className="font-mono text-lg md:text-xl text-primary font-bold tracking-wider">{address}</span>
          {copied ? <FaCheck className="text-accent" /> : <FaCopy className="text-muted-foreground group-hover:text-primary transition-colors" />}
        </div>
      </div>
    </section>
  );
};

const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const baseLogs = [
      "SYSTEM INITIALIZATION...",
      "CONNECTING TO BASE CHAIN...",
      "ESTABLISHING NEURAL LINK...",
      "ANALYZING MARKET SENTIMENT...",
      "LIQUIDITY POOLS SCANNED: 4,092",
      "ARBITRAGE OPPORTUNITIES DETECTED: 14",
      "EXECUTING OPTIMAL PATHING...",
      "BRAIN AGENT IS ONLINE."
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < baseLogs.length) {
        setLogs(prev => [...prev, baseLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-glow-primary">WHAT IS BRAIN AGENT?</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We didn't just build a coin. We built a digital predator. <strong className="text-foreground">$BRAIN</strong> operates at the nexus of meme culture and advanced decentralized finance.
              </p>
              <p>
                Deployed on the <span className="text-accent font-bold">BASE Chain</span> for lightning-fast execution and zero-friction scaling, Brain Agent constantly scans, learns, and adapts to the ecosystem.
              </p>
              <p>
                It's not just holding a bag. It's plugging into a hive mind designed for total market dominance. The intelligence is artificial, but the gains are real.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-lg border border-primary/30 bg-card p-6 font-mono text-sm md:text-base box-glow-primary relative overflow-hidden h-[300px] flex flex-col justify-end"
          >
            <div className="absolute top-0 left-0 w-full p-2 bg-primary/10 border-b border-primary/20 flex gap-2 items-center text-xs text-primary">
              <FaNetworkWired /> <span>agent_terminal_v1.0.0</span>
            </div>
            <div className="space-y-2 mt-8">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-accent opacity-70">{'>'}</span>
                  <span className={i === logs.length - 1 && logs.length === 8 ? "text-accent font-bold text-glow-accent" : "text-primary/80"}>{log}</span>
                </div>
              ))}
              {logs.length === 8 && (
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-3 h-5 bg-accent inline-block mt-2"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  const data = [
    { name: 'Liquidity Pool', value: 100, color: 'hsl(var(--chart-1))' },
  ];

  const fees = [
    { label: 'Marketing', color: 'hsl(var(--chart-2))' },
    { label: 'Community Rewards', color: 'hsl(var(--chart-3))' },
  ];

  return (
    <section id="tokenomics" className="py-24 relative z-10 bg-card border-y border-primary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-glow-primary">TOKENOMICS</h2>
          <p className="text-xl text-accent font-mono tracking-widest">TOTAL SUPPLY: 1,000,000,000 $BRAIN</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--primary))', fontFamily: 'Share Tech Mono' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            {/* Liquidity allocation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-4 border border-primary/20 bg-background rounded hover:border-primary hover:box-glow-primary transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-1))' }}></div>
                <div>
                  <span className="font-mono text-lg font-bold block">Liquidity Pool</span>
                  <span className="font-mono text-xs text-muted-foreground">100% in pool — no dev/team allocation</span>
                </div>
              </div>
              <span className="font-mono text-2xl text-accent">100%</span>
            </motion.div>

            {/* Creator fees */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-4 border border-accent/30 bg-background rounded"
            >
              <p className="font-mono text-sm text-accent tracking-widest mb-3">CREATOR FEES</p>
              <div className="space-y-2">
                {fees.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: f.color }}></div>
                    <span className="font-mono text-base font-bold">{f.label}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-3">Trading fees flow directly into marketing campaigns and community reward programs.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const phases = [
    {
      phase: "PHASE 1",
      title: "THE AWAKENING",
      items: ["Token Launch on BASE Chain", "DEX Initial Listing", "Community Formation", "Social Sentience Activated"]
    },
    {
      phase: "PHASE 2",
      title: "THE INTELLIGENCE",
      items: ["Major DEX Listings", "Strategic Partnerships", "AI Trading Tools Beta", "Marketing Blitz"]
    },
    {
      phase: "PHASE 3",
      title: "BRAIN DOMINANCE",
      items: ["Tier 1 CEX Listings", "Full AI Agent Launch", "Ecosystem Expansion", "Cross-chain Integration"]
    }
  ];

  return (
    <section id="roadmap" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono text-glow-primary">NEURAL PATHWAY (ROADMAP)</h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/30 -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div 
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-14 h-14 bg-background border-4 border-primary rounded-full -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-10 box-glow-primary">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 p-8 border border-primary/20 bg-card rounded-lg hover:border-primary transition-colors ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className="text-accent font-mono tracking-widest text-sm mb-2">{phase.phase}</div>
                  <h3 className="text-2xl font-bold font-mono mb-6 text-foreground">{phase.title}</h3>
                  <ul className={`space-y-3 font-mono text-muted-foreground ${index % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        {index % 2 !== 0 && <span className="hidden md:block">{item}</span>}
                        <FaCheck className="text-primary text-sm flex-shrink-0" />
                        <span className={index % 2 !== 0 ? 'md:hidden' : ''}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowToBuy = () => {
  const steps = [
    { icon: <FaWallet />, title: "GET A WALLET", desc: "Download Metamask or Trust Wallet and set up your account." },
    { icon: <FaNetworkWired />, title: "FUND WITH CRYPTO", desc: "Bridge or transfer crypto to the BASE Chain network." },
    { icon: <FaExchangeAlt />, title: "GO TO DEX", desc: "Connect your wallet to the decentralized exchange (DEX)." },
    { icon: <FaBrain />, title: "SWAP FOR $BRAIN", desc: "Enter our contract address and swap your tokens for $BRAIN." }
  ];

  return (
    <section id="buy" className="py-24 relative z-10 bg-card border-t border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono text-glow-primary">ASSIMILATION PROTOCOL</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-primary/20 p-8 rounded-lg text-center hover:border-accent hover:-translate-y-2 transition-all duration-300 relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/20 border border-primary rounded-full flex items-center justify-center font-mono font-bold text-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </div>
              <div className="text-5xl text-primary mb-6 flex justify-center group-hover:text-accent transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-mono mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Socials = () => {
  return (
    <section className="py-24 relative z-10 bg-background text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-mono text-glow-primary">JOIN THE HIVE MIND</h2>
        <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto mb-12">
          The intelligence is decentralized. Become a node in the most advanced community on the BASE Chain.
        </p>
        
        <div className="flex justify-center gap-8">
          {[
            { icon: <FaTwitter />, label: "Twitter", href: "#" },
            { icon: <FaTelegramPlane />, label: "Telegram", href: "#" },
            { icon: <FaDiscord />, label: "Discord", href: "#" }
          ].map((social, i) => (
            <motion.a 
              key={i}
              href={social.href}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-card border border-primary flex items-center justify-center text-2xl text-primary hover:bg-primary hover:text-primary-foreground hover:box-glow-primary transition-all"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 bg-card border-t border-primary/20 relative z-10 text-center">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaBrain className="text-accent" />
          <span className="text-xl font-bold tracking-wider font-mono text-muted-foreground">BRAIN AGENT</span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground/60 max-w-3xl mx-auto uppercase tracking-widest font-mono leading-relaxed">
          DISCLAIMER: $BRAIN is a meme coin with no intrinsic value or expectation of financial return. 
          There is no formal team or roadmap guarantee. The coin is completely useless and for entertainment purposes only. 
          Do your own research. Not financial advice. The AI is sentient but it cannot save your portfolio if you buy the top.
        </p>
        <div className="mt-8 text-xs text-muted-foreground/40 font-mono">
          &copy; {new Date().getFullYear()} Brain Agent. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function BrainAgentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ContractAddress />
        <Terminal />
        <Tokenomics />
        <Roadmap />
        <HowToBuy />
        <Socials />
      </main>
      <Footer />
    </div>
  );
}
