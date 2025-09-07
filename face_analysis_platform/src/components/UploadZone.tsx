import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Video, X, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export default function UploadZone({ onFilesSelected, disabled = false }: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (disabled) return;
    
    const validFiles = acceptedFiles.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not a valid image or video file`);
        return false;
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(validFiles);
      onFilesSelected(validFiles);
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  }, [onFilesSelected, disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.webm']
    },
    multiple: false,
    disabled
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`
          border-2 border-dashed transition-all duration-200 cursor-pointer
          ${isDragActive 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="p-6 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <div className="p-2 bg-pink-100 rounded-full">
              <Camera className="h-6 w-6 text-pink-600" />
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          {isDragActive ? (
            <p className="text-purple-600 font-medium">Drop your files here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">
                Drag & drop your photo or video here
              </p>
              <p className="text-sm text-gray-500">or</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
                disabled={disabled}
              >
                Browse Files
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white rounded">
                  {file.type.startsWith('image/') ? (
                    <FileImage className="h-4 w-4 text-purple-600" />
                  ) : (
                    <Video className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-32">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-6 w-6 p-0 hover:bg-red-100"
              >
                <X className="h-3 w-3 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}