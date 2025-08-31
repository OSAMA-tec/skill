import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, File, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFilesUploaded: (files: string[]) => void;
  existingFiles?: string[];
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

export default function FileUpload({
  onFilesUploaded,
  existingFiles = [],
  accept = "*/*",
  maxFiles = 5,
  maxFileSize = 10
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(existingFiles);
  const { toast } = useToast();

  const handleFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    
    // Check file count limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }

    // Validate and process files
    const validFiles: string[] = [];
    
    fileArray.forEach((file) => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxFileSize}MB limit`,
          variant: "destructive"
        });
        return;
      }

      // For demo purposes, we'll just use the file name
      // In a real app, you'd upload to a server and get back URLs
      const mockUrl = `uploads/${Date.now()}-${file.name}`;
      validFiles.push(mockUrl);
    });

    if (validFiles.length > 0) {
      const newFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(newFiles);
      onFilesUploaded(newFiles);
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} file(s) uploaded successfully`
      });
    }
  }, [uploadedFiles, maxFiles, maxFileSize, onFilesUploaded, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input to allow selecting same file again
    e.target.value = '';
  };

  const removeFile = (fileToRemove: string) => {
    const newFiles = uploadedFiles.filter(file => file !== fileToRemove);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop() || filePath;
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        data-testid="file-upload-area"
      >
        <CardContent 
          className="p-8 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {accept === "image/*" ? "Images only" : "All file types"} • 
            Max {maxFileSize}MB per file • 
            Up to {maxFiles} files
          </p>
          <Button variant="outline" type="button" data-testid="button-select-files">
            Select Files
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
            data-testid="input-file-upload"
          />
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                data-testid={`file-item-${index}`}
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <span className="text-sm font-medium truncate max-w-xs">
                    {getFileName(file)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {file.includes('image') ? 'Image' : 'Document'}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file);
                  }}
                  className="h-auto p-1 hover:bg-destructive/10 hover:text-destructive"
                  data-testid={`button-remove-file-${index}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Count Indicator */}
      <div className="text-xs text-muted-foreground text-right">
        {uploadedFiles.length} / {maxFiles} files uploaded
      </div>
    </div>
  );
}
