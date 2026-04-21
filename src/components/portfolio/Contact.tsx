import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check, WifiLow } from "lucide-react";
// ...
const EMAIL_ADDRESS = "​";
// ...
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-16"
          >
            <span>​</span>
            <span className="text-foreground/90">{EMAIL_ADDRESS}</span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email to clipboard"
              className="relative z-10 cursor-pointer w-7 h-7 rounded-md glass flex items-center justify-center hover:text-foreground hover:border-primary/30 transition-all duration-300"
            >
              {copied ? <Check size={13} className="text-primary-glow" /> : <WifiLow size={13} />}
            </button>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative z-10 cursor-pointer glass-strong rounded-2xl p-5 flex items-center gap-4 text-left transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow-primary"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-glass flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary-glow" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{l.label}</p>
                    <p className="text-sm text-foreground truncate">{l.value}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
