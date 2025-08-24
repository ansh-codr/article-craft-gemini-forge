import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2, FileText, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ArticleDisplayProps {
  article: string;
  onReset: () => void;
}

export const ArticleDisplay = ({ article, onReset }: ArticleDisplayProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to Clipboard",
        description: "The article has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy the article. Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([article], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'educational-article.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your article is being downloaded as a Markdown file.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Educational Article',
          text: article,
        });
      } catch (error) {
        // Fallback to copy
        handleCopy();
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  // Convert markdown to HTML for display (basic conversion)
  const formatArticleForDisplay = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-primary mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-primary mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium text-foreground mb-3 mt-5">$1</h3>')
      .replace(/^\* (.*$)/gim, '<li class="mb-2 text-muted-foreground">$1</li>')
      .replace(/^\- (.*$)/gim, '<li class="mb-2 text-muted-foreground">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="mb-2 text-muted-foreground">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-4 text-muted-foreground">')
      .replace(/<\/p><p[^>]*>(<h[1-6][^>]*>)/g, '$1')
      .replace(/<\/p><p[^>]*>(<li[^>]*>)/g, '<ul class="mb-4 ml-6">$1')
      .replace(/(<\/li>)\s*<p[^>]*>/g, '$1')
      .replace(/(<\/li>\s*<\/p>)/g, '</li></ul>');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 pb-8 border-b border-glow/30">
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 shadow-glow border border-glow">
              <FileText className="h-10 w-10 text-primary-glow" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-glow">
              Generated Article
            </h1>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="bg-card/50 border-glow hover:shadow-glow hover:scale-105 transition-smooth"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Content
                </>
              )}
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              className="bg-card/50 border-accent-glow hover:shadow-accent-glow hover:scale-105 transition-smooth"
            >
              <Download className="h-4 w-4 mr-2" />
              Download as Markdown
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="bg-card/50 border-glow hover:shadow-glow hover:scale-105 transition-smooth"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button
              onClick={onReset}
              variant="hero"
              className="shadow-hero hover:shadow-intense"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Generate New Article
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <Card className="shadow-hero border border-glow/50 bg-gradient-to-br from-card via-card to-muted/10">
          <CardContent className="p-8 md:p-12">
            <div 
              className="prose-custom max-w-none animate-fade-in"
              dangerouslySetInnerHTML={{ __html: formatArticleForDisplay(article) }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};