import { useState } from "react";
import { ArticleGenerator } from "@/components/ArticleGenerator";
import { ArticleDisplay } from "@/components/ArticleDisplay";
import { GraduationCap, Lightbulb, Target } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  const [generatedArticle, setGeneratedArticle] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Educational resources and learning materials"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Educational Content</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
              Educational
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Article Generator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform your learning topics into comprehensive, well-structured educational articles. 
              Perfect for students, educators, and lifelong learners.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
                <GraduationCap className="h-4 w-4" />
                Expert-Level Content
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
                <Target className="h-4 w-4" />
                Customizable Depth
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
                <Lightbulb className="h-4 w-4" />
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
            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-card transition-smooth hover:shadow-elegant">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Academic Excellence
              </h3>
              <p className="text-muted-foreground">
                Content created with pedagogical best practices, ensuring comprehensive coverage 
                and structured learning progression.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-card transition-smooth hover:shadow-elegant">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-xl flex items-center justify-center">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Customizable Depth
              </h3>
              <p className="text-muted-foreground">
                From introductory overviews to advanced deep dives, tailor the complexity 
                to match your current knowledge level.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-card transition-smooth hover:shadow-elegant">
              <div className="w-16 h-16 mx-auto bg-primary-glow/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary-glow" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Multiple Formats
              </h3>
              <p className="text-muted-foreground">
                Choose from blog posts, step-by-step guides, or FAQ formats to match 
                your preferred learning style.
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