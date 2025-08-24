import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, BookOpen, Sparkles, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  topic: string;
  tone: string;
  depth: string;
  format: string;
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
    format: ""
  });
  const { toast } = useToast();

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

    // For demo purposes, generate a mock article
    // In a real implementation, this would call an API
    const mockArticle = generateMockArticle(formData);
    onGenerate(mockArticle);

    toast({
      title: "Article Generated!",
      description: "Your educational article has been created successfully.",
    });
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
    <Card className="w-full max-w-2xl mx-auto shadow-card transition-smooth hover:shadow-elegant">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Article Generator</CardTitle>
            <CardDescription>
              Create comprehensive educational content tailored to your needs
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Topic or Keywords
            </Label>
            <Textarea
              id="topic"
              placeholder="Enter your syllabus outline, topic keywords, or specific subject you'd like to learn about..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="min-h-[100px] transition-smooth focus:shadow-glow"
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