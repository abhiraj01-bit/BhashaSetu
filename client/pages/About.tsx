import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Globe, Zap, Shield, Users, Code } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Eye,
      title: "Advanced OCR",
      description: "State-of-the-art optical character recognition optimized for Devanagari and Sinhala scripts",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Globe,
      title: "AI/ML Translation",
      description: "Powered by Google Gemini AI/ML for natural, context-aware translations to English",
      color: "bg-green-500/10 text-green-600 dark:text-green-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process images and PDFs in seconds with optimized algorithms and modern web technologies",
      color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure with client-side processing and optional self-hosted backends",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    },
    {
      icon: Users,
      title: "Researcher Friendly",
      description: "Export parallel corpora in TSV format for training custom translation models",
      color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
    },
    {
      icon: Code,
      title: "Open Architecture",
      description: "Modular design supports multiple translation backends and OCR engines",
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
    }
  ];

  const stats = [
    { label: "Languages Supported", value: "3", desc: "Nepali, Sinhala, English" },
    { label: "File Formats", value: "10+", desc: "Images, PDFs, and more" },
    { label: "Processing Speed", value: "<5s", desc: "Average OCR time" },
    { label: "Accuracy Rate", value: "95%+", desc: "For clear text images" }
  ];

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">About BhashaSetu</Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900/90 mix-blend-multiply dark:text-white mb-6">
                Bridging Languages with AI/ML
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                BhashaSetu (भाषा सेतु) means "Language Bridge" in Nepali. We're breaking down language barriers 
                by making Nepali and Sinhala text accessible through advanced OCR and AI/ML-powered translation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance</h2>
            <p className="text-xl text-muted-foreground">Optimized for speed, accuracy, and user experience</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We believe language should never be a barrier to accessing information. BhashaSetu empowers 
                    researchers, students, and professionals to work with Nepali and Sinhala content seamlessly.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Preserve cultural heritage through digitization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Enable cross-cultural research and collaboration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Support academic and professional workflows</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🌉</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
