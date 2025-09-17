import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Eye, 
  Trash2, 
  Search, 
  Calendar, 
  Globe,
  Filter
} from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';
import { WebsitePreview } from './WebsitePreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const WebsiteGallery = () => {
  const { websites, isLoading, deleteWebsite } = useWebsites();
  const [selectedWebsite, setSelectedWebsite] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Filter websites based on search and type
  const filteredWebsites = websites.filter(website => {
    const matchesSearch = website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || website.template_type === filterType;
    return matchesSearch && matchesType;
  });

  // Get unique template types for filter
  const templateTypes = Array.from(new Set(websites.map(w => w.template_type)));

  const handleDeleteWebsite = async (websiteId: string) => {
    await deleteWebsite(websiteId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading websites...</div>
      </div>
    );
  }

  if (selectedWebsite) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedWebsite(null)}
          className="mb-4"
        >
          ← Back to Gallery
        </Button>
        <WebsitePreview website={selectedWebsite} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {templateTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredWebsites.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            {websites.length === 0 ? 'No websites created yet' : 'No websites match your search'}
          </h3>
          <p className="text-muted-foreground">
            {websites.length === 0 
              ? 'Start a conversation to generate your first website!'
              : 'Try adjusting your search terms or filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website) => (
            <Card key={website.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{website.title}</CardTitle>
                    {website.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {website.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{website.template_type}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(website.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Website Preview</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedWebsite(website)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Website</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{website.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteWebsite(website.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};