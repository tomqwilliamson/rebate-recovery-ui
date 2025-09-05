import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  FileText,
  Calendar,
  Building,
  DollarSign,
  Percent,
  Package,
  AlertCircle,
  CheckCircle,
  File,
  Trash2
} from 'lucide-react';
import { Button } from '@components/common/UI/Button';
import { Card } from '@components/common/UI/Card';

interface ContractUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (contractData: any) => void;
}

export const ContractUploadModal: React.FC<ContractUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [contractData, setContractData] = useState({
    name: '',
    vendor: '',
    type: 'Medical Supplies',
    startDate: '',
    endDate: '',
    minRebateRate: '',
    maxRebateRate: '',
    estimatedValue: '',
    paymentTerms: '30',
    autoRenew: false,
    notes: ''
  });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setActiveStep(2);
  };

  const handleSubmit = () => {
    const finalData = {
      ...contractData,
      file: uploadedFile,
      uploadDate: new Date().toISOString()
    };
    onUpload?.(finalData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setActiveStep(1);
    setUploadedFile(null);
    setContractData({
      name: '',
      vendor: '',
      type: 'Medical Supplies',
      startDate: '',
      endDate: '',
      minRebateRate: '',
      maxRebateRate: '',
      estimatedValue: '',
      paymentTerms: '30',
      autoRenew: false,
      notes: ''
    });
  };

  const steps = [
    { number: 1, title: 'Upload File', icon: Upload },
    { number: 2, title: 'Contract Details', icon: FileText },
    { number: 3, title: 'Review & Submit', icon: CheckCircle }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl my-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Upload Contract</h2>
                        <p className="text-white/80 text-sm mt-1">Add a new vendor contract to the system</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            activeStep >= step.number
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`ml-3 font-medium ${
                          activeStep >= step.number ? 'text-slate-900' : 'text-slate-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-24 h-0.5 mx-4 ${
                          activeStep > step.number ? 'bg-primary-500' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-8">
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                          dragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <Upload className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          Drag and drop your contract file here
                        </h3>
                        <p className="text-slate-600 mb-4">or</p>
                        <label className="inline-block">
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileInput}
                            accept=".pdf,.doc,.docx,.xlsx"
                          />
                          <Button variant="primary" size="lg">
                            Browse Files
                          </Button>
                        </label>
                        <p className="text-sm text-slate-500 mt-4">
                          Supported formats: PDF, DOC, DOCX, XLSX (Max 50MB)
                        </p>
                      </div>

                      <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-900">Pro Tip</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Our AI will automatically extract key information from your contract, 
                              including vendor details, rebate rates, and important dates. You can 
                              review and edit everything in the next step.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {uploadedFile && (
                        <Card className="p-4 bg-emerald-50 border-emerald-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <File className="w-5 h-5 text-emerald-600" />
                              <div>
                                <p className="font-medium text-emerald-900">{uploadedFile.name}</p>
                                <p className="text-sm text-emerald-700">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setUploadedFile(null);
                                setActiveStep(1);
                              }}
                              className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-emerald-600" />
                            </button>
                          </div>
                        </Card>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contract Name *
                          </label>
                          <input
                            type="text"
                            value={contractData.name}
                            onChange={(e) => setContractData({...contractData, name: e.target.value})}
                            placeholder="e.g., Medical Supplies Agreement 2024"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Vendor *
                          </label>
                          <input
                            type="text"
                            value={contractData.vendor}
                            onChange={(e) => setContractData({...contractData, vendor: e.target.value})}
                            placeholder="e.g., AmeriMed Solutions"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contract Type
                          </label>
                          <select
                            value={contractData.type}
                            onChange={(e) => setContractData({...contractData, type: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="Medical Supplies">Medical Supplies</option>
                            <option value="Surgical Equipment">Surgical Equipment</option>
                            <option value="Pharmaceuticals">Pharmaceuticals</option>
                            <option value="Diagnostic Equipment">Diagnostic Equipment</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Estimated Value
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                              type="text"
                              value={contractData.estimatedValue}
                              onChange={(e) => setContractData({...contractData, estimatedValue: e.target.value})}
                              placeholder="e.g., 2,400,000"
                              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Start Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                              type="date"
                              value={contractData.startDate}
                              onChange={(e) => setContractData({...contractData, startDate: e.target.value})}
                              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            End Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                              type="date"
                              value={contractData.endDate}
                              onChange={(e) => setContractData({...contractData, endDate: e.target.value})}
                              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Rebate Rate Range
                          </label>
                          <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={contractData.minRebateRate}
                                onChange={(e) => setContractData({...contractData, minRebateRate: e.target.value})}
                                placeholder="Min"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                            <span className="text-slate-500">to</span>
                            <div className="relative flex-1">
                              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <input
                                type="text"
                                value={contractData.maxRebateRate}
                                onChange={(e) => setContractData({...contractData, maxRebateRate: e.target.value})}
                                placeholder="Max"
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Payment Terms (Days)
                          </label>
                          <select
                            value={contractData.paymentTerms}
                            onChange={(e) => setContractData({...contractData, paymentTerms: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="15">Net 15</option>
                            <option value="30">Net 30</option>
                            <option value="45">Net 45</option>
                            <option value="60">Net 60</option>
                            <option value="90">Net 90</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Notes / Additional Information
                        </label>
                        <textarea
                          value={contractData.notes}
                          onChange={(e) => setContractData({...contractData, notes: e.target.value})}
                          placeholder="Add any additional notes or special terms..."
                          rows={4}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="autoRenew"
                          checked={contractData.autoRenew}
                          onChange={(e) => setContractData({...contractData, autoRenew: e.target.checked})}
                          className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="autoRenew" className="text-sm text-slate-700">
                          Enable auto-renewal notifications
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Contract Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Contract Name</span>
                            <span className="font-medium text-slate-900">{contractData.name || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Vendor</span>
                            <span className="font-medium text-slate-900">{contractData.vendor || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Type</span>
                            <span className="font-medium text-slate-900">{contractData.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Contract Period</span>
                            <span className="font-medium text-slate-900">
                              {contractData.startDate && contractData.endDate
                                ? `${new Date(contractData.startDate).toLocaleDateString()} - ${new Date(contractData.endDate).toLocaleDateString()}`
                                : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Rebate Range</span>
                            <span className="font-medium text-slate-900">
                              {contractData.minRebateRate && contractData.maxRebateRate
                                ? `${contractData.minRebateRate}% - ${contractData.maxRebateRate}%`
                                : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Estimated Value</span>
                            <span className="font-medium text-slate-900">
                              {contractData.estimatedValue ? `$${contractData.estimatedValue}` : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">File</span>
                            <span className="font-medium text-slate-900">{uploadedFile?.name || 'No file'}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-emerald-50 border-emerald-200">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-emerald-900">Ready to Upload</h4>
                            <p className="text-sm text-emerald-700 mt-1">
                              Your contract will be processed and added to the system. 
                              You'll receive a notification once the AI has finished extracting all contract items.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
                  <Button
                    variant="secondary"
                    onClick={activeStep === 1 ? onClose : () => setActiveStep(activeStep - 1)}
                  >
                    {activeStep === 1 ? 'Cancel' : 'Back'}
                  </Button>
                  <div className="flex items-center space-x-3">
                    {activeStep < 3 && (
                      <Button
                        variant="primary"
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={activeStep === 1 && !uploadedFile}
                      >
                        Next
                      </Button>
                    )}
                    {activeStep === 3 && (
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Contract
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};