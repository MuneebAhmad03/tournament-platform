import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FileUpload from '../components/FileUpload';
import { 
  ArrowLeft, ArrowRight, User, CreditCard, Upload, 
  CheckCircle, Building2, Smartphone, AlertCircle
} from 'lucide-react';

const steps = [
  { id: 1, label: 'Player Info', icon: User },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Upload Proof', icon: Upload },
];

export default function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTournamentById, addRegistration, paymentInfo } = useApp();
  const tournament = getTournamentById(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gamingHandle: '',
    paymentScreenshot: null,
  });
  const [errors, setErrors] = useState({});

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tournament Not Found</h2>
          <Link to="/" className="px-6 py-3 bg-red-600 text-white rounded-xl">Back to Home</Link>
        </div>
      </div>
    );
  }

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.gamingHandle.trim()) newErrors.gamingHandle = 'Gaming handle is required';
    }
    if (step === 3) {
      if (!formData.paymentScreenshot) newErrors.screenshot = 'Please upload payment screenshot';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;
    
    addRegistration({
      tournamentId: tournament.id,
      playerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      gamingHandle: formData.gamingHandle,
      paymentScreenshot: formData.paymentScreenshot?.name || 'screenshot.jpg',
    });
    
    setSubmitted(true);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Registration Submitted!</h2>
          <p className="text-gray-400 mb-2">
            Your registration for <span className="text-red-500 font-semibold">{tournament.title}</span> has been submitted successfully.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Your payment will be verified within 24 hours. Check your Player Dashboard for status updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors"
            >
              Browse More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Link to={`/tournament/${tournament.id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to {tournament.title}
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 mt-6 mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Register for Tournament</h1>
        <p className="text-gray-500">
          {tournament.title} • Entry Fee: <span className="text-red-500 font-semibold">PKR {tournament.entryFee.toLocaleString()}</span>
        </p>
      </div>

      {/* Step Indicator */}
      <div className="max-w-3xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 
                      isActive ? 'bg-red-600 shadow-[0_0_15px_rgba(188,2,2,0.4)]' : 
                      'bg-white/10'}`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <StepIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive ? 'text-red-500' : isCompleted ? 'text-green-400' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 mb-6 ${isCompleted ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
          
          {/* Step 1: Player Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Player Information</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="e.g., Ahmed"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="e.g., Khan"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="e.g., ahmed@email.com"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Gaming Handle / Team Name</label>
                  <input
                    type="text"
                    value={formData.gamingHandle}
                    onChange={(e) => updateField('gamingHandle', e.target.value)}
                    placeholder="e.g., ProGamer_PK"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.gamingHandle ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                  />
                  {errors.gamingHandle && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.gamingHandle}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Payment Details</h2>
              <p className="text-gray-500 text-sm mb-6">
                Transfer <span className="text-red-500 font-bold">PKR {tournament.entryFee.toLocaleString()}</span> using any of the methods below and upload the screenshot in the next step.
              </p>

              <div className="space-y-4">
                {/* Bank Transfer */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold">Bank Transfer</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bank</span>
                      <span className="text-white font-medium">{paymentInfo.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Title</span>
                      <span className="text-white font-medium">{paymentInfo.accountTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Number</span>
                      <span className="text-red-500 font-mono font-semibold">{paymentInfo.accountNumber}</span>
                    </div>
                  </div>
                </div>

                {/* EasyPaisa */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white font-semibold">EasyPaisa</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Number</span>
                    <span className="text-green-400 font-mono font-semibold">{paymentInfo.easypaisaNumber}</span>
                  </div>
                </div>

                {/* JazzCash */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-white font-semibold">JazzCash</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Number</span>
                    <span className="text-red-400 font-mono font-semibold">{paymentInfo.jazzcashNumber}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400 text-sm">
                  <strong>Important:</strong> {paymentInfo.instructions}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Upload */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Upload Payment Proof</h2>
              <p className="text-gray-500 text-sm mb-6">
                Upload a clear screenshot of your payment confirmation.
              </p>
              <FileUpload onFileSelect={(file) => updateField('paymentScreenshot', file)} />
              {errors.screenshot && (
                <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.screenshot}
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(188,2,2,0.4)]"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Registration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
