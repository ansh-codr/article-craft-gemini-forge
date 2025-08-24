import { useState } from "react";
import { ArticleGenerator } from "@/components/ArticleGenerator";
import { ArticleDisplay } from "@/components/ArticleDisplay";
import { GraduationCap, Lightbulb, Target, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  const [generatedArticle, setGeneratedArticle] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleGenerate = async (article: string) => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedArticle(article);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGeneratedArticle("");
  };

  if (generatedArticle) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <ArticleDisplay article={generatedArticle} onReset={handleReset} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Educational resources and learning materials"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-animated opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/40" />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/40 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Theme Toggle */}
            <div className="flex justify-end mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:shadow-glow transition-smooth"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg border border-glow rounded-full px-6 py-3 text-white shadow-glow hover:shadow-intense transition-smooth">
              <Lightbulb className="h-5 w-5 text-primary-glow" />
              <span className="text-sm font-medium text-glow">AI-Powered Educational Content</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight">
              <span className="text-glow">Educational</span>
              <span className="block bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent text-accent-glow">
                Article Generator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your learning topics into comprehensive, well-structured educational articles. 
              Perfect for students, educators, and lifelong learners seeking excellence.
            </p>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-accent-glow rounded-full px-6 py-3 text-white text-sm font-medium shadow-accent-glow hover:shadow-intense transition-smooth hover:scale-105">
                <GraduationCap className="h-5 w-5 text-accent" />
                Expert-Level Content
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-glow rounded-full px-6 py-3 text-white text-sm font-medium shadow-glow hover:shadow-intense transition-smooth hover:scale-105">
                <Target className="h-5 w-5 text-primary-glow" />
                Customizable Depth
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-accent-glow rounded-full px-6 py-3 text-white text-sm font-medium shadow-accent-glow hover:shadow-intense transition-smooth hover:scale-105">
                <Lightbulb className="h-5 w-5 text-accent" />
                Multiple Formats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Create Your Educational Content
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simply provide your topic and preferences, and our AI will generate a comprehensive, 
              well-structured article tailored to your learning needs.
            </p>
          </div>
          
          <ArticleGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Our Generator?
            </h2>
            <p className="text-lg text-muted-foreground">
              Designed specifically for educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center space-y-6 p-8 rounded-2xl bg-card border border-glow shadow-card hover-glow cursor-pointer">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-smooth group-hover:scale-110">
                <GraduationCap className="h-10 w-10 text-primary group-hover:text-primary-glow transition-smooth" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-glow transition-smooth">
                Academic Excellence
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-smooth leading-relaxed">
                Content created with pedagogical best practices, ensuring comprehensive coverage 
                and structured learning progression for optimal knowledge retention.
              </p>
            </div>

            <div className="group text-center space-y-6 p-8 rounded-2xl bg-card border border-accent-glow shadow-card hover-intense cursor-pointer">
              <div className="w-20 h-20 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center group-hover:shadow-accent-glow transition-smooth group-hover:scale-110">
                <Target className="h-10 w-10 text-accent group-hover:text-accent-glow transition-smooth" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-accent-glow transition-smooth">
                Customizable Depth
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-smooth leading-relaxed">
                From introductory overviews to advanced deep dives, tailor the complexity 
                to match your current knowledge level and learning objectives.
              </p>
            </div>

            <div className="group text-center space-y-6 p-8 rounded-2xl bg-card border border-glow shadow-card hover-glow cursor-pointer">
              <div className="w-20 h-20 mx-auto bg-primary-glow/10 rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-smooth group-hover:scale-110">
                <Lightbulb className="h-10 w-10 text-primary-glow group-hover:text-accent transition-smooth" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-glow transition-smooth">
                Multiple Formats
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-smooth leading-relaxed">
                Choose from blog posts, step-by-step guides, or FAQ formats to match 
                your preferred learning style and educational context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            Educational Article Generator • Built with React and AI • 
            <span className="text-primary font-medium ml-1">
              Empowering Learning Through Technology
            </span>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;