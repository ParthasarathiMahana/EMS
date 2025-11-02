import React, { useState } from 'react';
import { 
  Calendar, Clock, FileText, AlertCircle, CheckCircle2, 
  User, Mail, Building, ChevronLeft, Send, Save, X,
  CalendarDays
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';

export default function LeaveRequest() {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const employeeInfo = {
    name: 'Sarah Johnson',
    employeeId: 'EMP-2024-1234',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    manager: 'John Davis'
  };

  const leaveBalance = [
    { type: 'Annual Leave', available: 12, total: 20, color: 'bg-blue-500' },
    { type: 'Sick Leave', available: 8, total: 10, color: 'bg-green-500' },
    { type: 'Personal Leave', available: 2, total: 5, color: 'bg-purple-500' },
    { type: 'Casual Leave', available: 5, total: 7, color: 'bg-orange-500' }
  ];

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave', icon: '🏖️' },
    { value: 'sick', label: 'Sick Leave', icon: '🏥' },
    { value: 'personal', label: 'Personal Leave', icon: '👤' },
    { value: 'casual', label: 'Casual Leave', icon: '☕' },
    { value: 'maternity', label: 'Maternity Leave', icon: '👶' },
    { value: 'paternity', label: 'Paternity Leave', icon: '👨‍👶' },
    { value: 'bereavement', label: 'Bereavement Leave', icon: '🕊️' },
    { value: 'unpaid', label: 'Unpaid Leave', icon: '📋' }
  ];

  const recentRequests = [
    { id: 1, type: 'Annual Leave', dates: 'Oct 15 - Oct 20', days: 5, status: 'approved' },
    { id: 2, type: 'Sick Leave', dates: 'Sep 05 - Sep 06', days: 2, status: 'approved' },
    { id: 3, type: 'Personal Leave', dates: 'Aug 12', days: 1, status: 'rejected' }
  ];

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start: any = new Date(formData.startDate);
      const end: any = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
          emergencyContact: '',
          attachments: []
        });
      }, 3000);
    }, 1500);
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button> */}
            <div>
              <h1 className="text-2xl font-bold">Request Leave</h1>
              <p className="text-sm text-muted-foreground">Submit a new leave request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div className="px-6 pt-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Leave request submitted successfully! Your manager will review it shortly.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Leave Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Type</CardTitle>
                <CardDescription>Select the type of leave you want to request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleChange('leaveType', type.value)}
                      className={`p-4 border-2 rounded-lg text-center transition-all hover:border-primary ${
                        formData.leaveType === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Duration</CardTitle>
                <CardDescription>Select your leave start and end dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="pl-10"
                        min={formData.startDate}
                      />
                    </div>
                  </div>
                </div>

                {formData.startDate && formData.endDate && (
                  <Alert>
                    <CalendarDays className="h-4 w-4" />
                    <AlertDescription>
                      You are requesting <strong>{calculateDays()} day(s)</strong> of leave from{' '}
                      <strong>{new Date(formData.startDate).toLocaleDateString()}</strong> to{' '}
                      <strong>{new Date(formData.endDate).toLocaleDateString()}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Reason */}
            <Card>
              <CardHeader>
                <CardTitle>Reason for Leave</CardTitle>
                <CardDescription>Provide details about your leave request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a detailed reason for your leave request..."
                    rows={5}
                    value={formData.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.reason.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="emergencyContact"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.emergencyContact}
                      onChange={(e) => handleChange('emergencyContact', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>Attach any relevant documents (medical certificates, etc.)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, or image files (max 5MB)</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleSubmit} 
                disabled={!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Employee Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Employee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {employeeInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employeeInfo.name}</p>
                    <p className="text-xs text-muted-foreground">{employeeInfo.employeeId}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{employeeInfo.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Manager: {employeeInfo.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs">{employeeInfo.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Leave Balance</CardTitle>
                <CardDescription className="text-xs">Your remaining leave days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveBalance.map((leave, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{leave.type}</span>
                      <span className="text-muted-foreground">
                        {leave.available}/{leave.total}
                      </span>
                    </div>
                    <Progress 
                      value={(leave.available / leave.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Important Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Submit requests at least 7 days in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Medical certificate required for sick leave &gt; 3 days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Emergency leaves require manager approval</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Check with team before requesting leave</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="p-3 border rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{request.type}</span>
                        <Badge variant="outline" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{request.dates}</p>
                      <p className="text-xs text-muted-foreground">{request.days} day(s)</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}