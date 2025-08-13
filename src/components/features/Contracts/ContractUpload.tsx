import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  vendorName?: string;
  contractType?: string;
}

export const ContractUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile.id);
    });
  }, []);

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (file.progress < 100) {
            return { ...file, progress: file.progress + 10 };
          } else if (file.status === 'uploading') {
            return { 
              ...file, 
              status: 'processing',
              vendorName: 'AmeriMed Solutions',
              contractType: 'Medical Supplies Agreement'
            };
          } else if (file.status === 'processing') {
            clearInterval(interval);
            return { 
              ...file, 
              status: Math.random() > 0.2 ? 'completed' : 'error',
              progress: 100 
            };
          }
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Zap className="w-5 h-5 text-amber-500 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-emerald-500 to-emerald-600';
      case 'error':
        return 'from-red-500 to-red-600';
      case 'processing':
        return 'from-amber-500 to-amber-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Upload Contracts</h1>
        <p className="text-slate-600">
          Upload vendor contracts and amendments for AI-powered processing and analysis
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer file-upload-zone ${
            isDragActive 
              ? 'border-primary-500 bg-primary-50 drag-over' 
              : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            {isDragActive ? (
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">
                  Drop files here
                </h3>
                <p className="text-primary-600">Release to upload your contracts</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Drag & drop your contracts here
                </h3>
                <p className="text-slate-600 mb-4">
                  or click to browse files
                </p>
                <Button variant="primary" size="lg">
                  Choose Files
                </Button>
              </div>
            )}
            <p className="text-sm text-slate-500">
              Supports PDF, DOC, and DOCX files up to 50MB
            </p>
          </motion.div>
        </div>
      </Card>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Uploaded Files ({uploadedFiles.length})
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setUploadedFiles([])}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {uploadedFiles.map((uploadedFile) => (
                <motion.div
                  key={uploadedFile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-slate-600" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-900 truncate">
                          {uploadedFile.file.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(uploadedFile.status)}
                          <button
                            onClick={() => removeFile(uploadedFile.id)}
                            className="p-1 rounded hover:bg-slate-200 transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      </div>

                      {uploadedFile.vendorName && (
                        <p className="text-xs text-slate-600 mt-1">
                          {uploadedFile.vendorName} • {uploadedFile.contractType}
                        </p>
                      )}

                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span className="capitalize">{uploadedFile.status}</span>
                          <span>{uploadedFile.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadedFile.progress}%` }}
                            className={`h-1.5 rounded-full bg-gradient-to-r ${getStatusColor(uploadedFile.status)}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Processing Results */}
                  {uploadedFile.status === 'completed' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-slate-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="font-medium text-slate-700">Contract Terms:</span>
                          <p className="text-slate-600 mt-1">12 terms extracted</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Rebate Rate:</span>
                          <p className="text-slate-600 mt-1">2.5% - 4.2%</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Items Matched:</span>
                          <p className="text-slate-600 mt-1">847 of 892 (95%)</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {uploadedFile.status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-red-200"
                    >
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">
                          Failed to process. The file may be corrupted or in an unsupported format.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      )}

      {/* Processing Statistics */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center" hover>
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {uploadedFiles.length}
            </h3>
            <p className="text-sm text-slate-600">Files Uploaded</p>
          </Card>

          <Card className="p-6 text-center" hover>
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {uploadedFiles.filter(f => f.status === 'processing').length}
            </h3>
            <p className="text-sm text-slate-600">Processing</p>
          </Card>

          <Card className="p-6 text-center" hover>
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {uploadedFiles.filter(f => f.status === 'completed').length}
            </h3>
            <p className="text-sm text-slate-600">Completed</p>
          </Card>

          <Card className="p-6 text-center" hover>
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {uploadedFiles.filter(f => f.status === 'error').length}
            </h3>
            <p className="text-sm text-slate-600">Errors</p>
          </Card>
        </div>
      )}
    </div>
  );
};