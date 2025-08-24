import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleDisplayProps {
  article: string;
  onReset: () => void;
}

export const ArticleDisplay = ({ article, onReset }: ArticleDisplayProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article);
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-card">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-display">Generated Article</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="transition-smooth hover:shadow-glow"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="transition-smooth hover:shadow-glow"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="transition-smooth hover:shadow-glow"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div 
            className="prose-custom max-w-none animate-fade-in"
            dangerouslySetInnerHTML={{ __html: formatArticleForDisplay(article) }}
          />
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="px-8 transition-smooth hover:shadow-glow"
        >
          Generate Another Article
        </Button>
      </div>
    </div>
  );
};