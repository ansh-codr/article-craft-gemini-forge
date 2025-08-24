import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, BookOpen, Sparkles, FileText, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from '@google/generative-ai';

interface FormData {
  topic: string;
  tone: string;
  depth: string;
  format: string;
  apiKey: string;
}

interface ArticleGeneratorProps {
  onGenerate: (article: string) => void;
  isGenerating: boolean;
}

export const ArticleGenerator = ({ onGenerate, isGenerating }: ArticleGeneratorProps) => {
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    tone: "",
    depth: "",
    format: "",
    apiKey: ""
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setFormData(prev => ({ ...prev, apiKey: savedApiKey }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic or keywords for your article.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.tone || !formData.depth || !formData.format) {
      toast({
        title: "Complete the Form",
        description: "Please select all options to generate your article.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Gemini API key to generate articles.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Save API key to localStorage for future use
      localStorage.setItem('gemini_api_key', formData.apiKey);
      
      // Generate article using Gemini API
      const article = await generateArticleWithGemini(formData);
      onGenerate(article);

      toast({
        title: "Article Generated!",
        description: "Your educational article has been created successfully.",
      });
    } catch (error) {
      console.error('Error generating article:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate article. Please check your API key and try again.",
        variant: "destructive"
      });
    }
  };

  const generateArticleWithGemini = async (data: FormData): Promise<string> => {
    const genAI = new GoogleGenerativeAI(data.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert educator and content creator. Generate a comprehensive, well-structured educational article based on the following requirements:

Topic: ${data.topic}
Tone: ${data.tone}
Depth Level: ${data.depth}
Format Style: ${data.format}

Please create an article that includes:
1. An engaging introduction that sets the context
2. Clear section headings and subheadings
3. Detailed explanations with examples where appropriate
4. Practical applications and real-world connections
5. Key takeaways or summary points
6. A section for further reading suggestions

The article should be written in Markdown format, be educational and informative, and match the specified tone and depth level. Make it comprehensive but accessible to the target audience.

Structure the content logically and ensure it flows well from introduction to conclusion. Include relevant examples, case studies, or practical applications where they would enhance understanding.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  const generateMockArticle = (data: FormData): string => {
    return `# ${data.topic}: A Comprehensive Guide

## Introduction

Welcome to this ${data.depth.toLowerCase()} exploration of **${data.topic}**. This ${data.format.toLowerCase()} is designed to provide you with a thorough understanding of the subject matter in a ${data.tone.toLowerCase()} tone.

## Key Concepts

### Understanding the Fundamentals

${data.topic} represents a fascinating area of study that combines theoretical knowledge with practical applications. Let's explore the core principles that govern this subject.

### Historical Context

The development of ${data.topic} has been shaped by numerous factors throughout history. Understanding this background provides crucial context for modern applications.

## Detailed Analysis

### Core Components

1. **Primary Elements**: The fundamental building blocks that form the foundation of ${data.topic}
2. **Secondary Factors**: Supporting elements that enhance understanding
3. **Advanced Concepts**: Complex ideas that build upon basic principles

### Practical Applications

${data.topic} finds application in numerous real-world scenarios:

- **Industry Applications**: How professionals use these concepts
- **Academic Research**: Current studies and developments
- **Future Trends**: Emerging opportunities and challenges

## Examples and Case Studies

### Case Study 1: Real-World Implementation

This example demonstrates how ${data.topic} principles apply in practice, showing the step-by-step process and outcomes.

### Case Study 2: Innovative Approaches

Exploring creative solutions and modern methodologies that push the boundaries of traditional understanding.

## Best Practices and Guidelines

### Essential Strategies

- Start with solid foundational knowledge
- Practice regularly to reinforce learning
- Stay updated with latest developments
- Apply concepts to real-world situations

### Common Pitfalls to Avoid

Understanding what not to do is just as important as knowing the correct approach. Here are key mistakes to avoid.

## Conclusion

${data.topic} offers rich opportunities for learning and application. By following the principles outlined in this guide, you'll be well-equipped to succeed in your journey.

## Further Reading

- **Books**: Recommended texts for deeper exploration
- **Research Papers**: Latest academic findings
- **Online Resources**: Websites and databases for continued learning
- **Communities**: Professional groups and forums for discussion

---

*This article was generated using AI to provide educational content. Always verify information from multiple sources for academic or professional use.*`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-hero border border-glow hover-intense bg-gradient-to-br from-card via-card to-muted/20">
      <CardHeader className="space-y-4 border-b border-glow/30">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 shadow-glow border border-glow">
            <BookOpen className="h-8 w-8 text-primary-glow" />
          </div>
          <div>
            <CardTitle className="text-3xl font-display font-bold text-glow">Article Generator</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Create comprehensive educational content with AI-powered precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
            <Label htmlFor="apiKey" className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <Key className="h-5 w-5 text-primary-glow" />
              Google Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Google Gemini API key..."
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                className="pr-12 py-3 border-glow focus:shadow-glow focus:border-primary-glow transition-smooth bg-background/50"
                disabled={isGenerating}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-primary/10 hover:shadow-glow transition-smooth"
                onClick={() => setShowApiKey(!showApiKey)}
                disabled={isGenerating}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary-glow transition-smooth" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground hover:text-primary-glow transition-smooth" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your free API key from{" "}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="topic" className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <FileText className="h-5 w-5 text-accent" />
              Topic or Keywords
            </Label>
            <Textarea
              id="topic"
              placeholder="Enter your syllabus outline, topic keywords, or specific subject you'd like to learn about..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="min-h-[120px] border-accent-glow focus:shadow-accent-glow focus:border-accent transition-smooth bg-background/50 resize-none"
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium">Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
                disabled={isGenerating}
              >
                <SelectTrigger id="tone" className="transition-smooth">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Engaging">Engaging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth" className="text-sm font-medium">Depth</Label>
              <Select
                value={formData.depth}
                onValueChange={(value) => setFormData({ ...formData, depth: value })}
                disabled={isGenerating}
              >
                <SelectTrigger id="depth" className="transition-smooth">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Introductory Overview">Introductory</SelectItem>
                  <SelectItem value="Intermediate Detail">Intermediate</SelectItem>
                  <SelectItem value="Advanced Deep Dive">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format" className="text-sm font-medium">Format</Label>
              <Select
                value={formData.format}
                onValueChange={(value) => setFormData({ ...formData, format: value })}
                disabled={isGenerating}
              >
                <SelectTrigger id="format" className="transition-smooth">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Structured Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Step-by-Step Guide">Step Guide</SelectItem>
                  <SelectItem value="FAQ Format">FAQ Format</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full py-6"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Article...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Educational Article
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};