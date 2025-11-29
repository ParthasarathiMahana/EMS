
import React, { useState } from 'react';
import { 
  Camera, Mail, Phone, MapPin, Calendar, 
  Building, Users, Edit2, Save, X,
  Target, TrendingUp, FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    employeeId: 'EMP-2024-1234',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    manager: 'John Davis',
    location: 'San Francisco Office',
    joiningDate: 'Jan 15, 2020',
    employmentType: 'Full-time',
    status: 'Active',
    bio: 'Experienced software engineer specializing in full-stack development with a focus on scalable cloud solutions.',
  });

  const [editForm, setEditForm] = useState(employee);

  const stats = [
    { label: 'Years at Company', value: '4.8', icon: Calendar, color: 'text-blue-600' },
    { label: 'Projects Completed', value: '28', icon: Target, color: 'text-green-600' },
    { label: 'Team Size', value: '12', icon: Users, color: 'text-purple-600' },
    { label: 'Performance', value: '94%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const skills = [
    'React', 'Node.js', 'TypeScript', 'Python', 'AWS',
    'Docker', 'Kubernetes', 'PostgreSQL', 'GraphQL', 'CI/CD'
  ];

  const recentActivities = [
    { type: 'attendance', desc: 'Checked in for the day', time: '2 hours ago', status: 'success' },
    { type: 'leave', desc: 'Leave request approved', time: '1 day ago', status: 'info' },
    { type: 'task', desc: 'Completed project milestone', time: '2 days ago', status: 'success' },
    { type: 'training', desc: 'Attended leadership workshop', time: '5 days ago', status: 'warning' }
  ];

  const leaveBalance = [
    { type: 'Annual Leave', used: 8, total: 20, color: 'bg-blue-500' },
    { type: 'Sick Leave', used: 2, total: 10, color: 'bg-green-500' },
    { type: 'Personal Leave', used: 3, total: 5, color: 'bg-purple-500' }
  ];

  const documents = [
    { name: 'Employment Contract', date: 'Jan 15, 2020', type: 'PDF' },
    { name: 'Performance Review 2024', date: 'Jun 30, 2024', type: 'PDF' },
    { name: 'Benefits Summary', date: 'Jan 01, 2024', type: 'PDF' },
    { name: 'Tax Documents', date: 'Dec 31, 2023', type: 'PDF' }
  ];

  const handleEdit = () => {
    setEditForm(employee);
    setIsEditing(true);
  };

  const handleSave = () => {
    setEmployee(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(employee);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  return (
    <div className="min-h-screen bg-var(--background) p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Employee Info */}
              <div className="flex-1 space-y-1">
                {!isEditing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{employee.name}</h1>
                      <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">{employee.position}</p>
                    <p className="text-sm text-muted-foreground">ID: {employee.employeeId}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {employee.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {employee.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {employee.joiningDate}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 w-full max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={editForm.position}
                          onChange={(e) => handleChange('position', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leaves</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isEditing ? (
                      <p className="text-muted-foreground">{employee.bio}</p>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => handleChange('bio', e.target.value)}
                          rows={4}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Employee ID</Label>
                        <p className="font-medium">{employee.employeeId}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Employment Type</Label>
                        <p className="font-medium">{employee.employmentType}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Department</Label>
                        <p className="font-medium">{employee.department}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Manager</Label>
                        <p className="font-medium">{employee.manager}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Joining Date</Label>
                        <p className="font-medium">{employee.joiningDate}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Status</Label>
                        <Badge variant="default">{employee.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isEditing ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label className="text-xs text-muted-foreground">Email</Label>
                            <p className="text-sm">{employee.email}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label className="text-xs text-muted-foreground">Phone</Label>
                            <p className="text-sm">{employee.phone}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'success' ? 'bg-green-500' :
                            activity.status === 'info' ? 'bg-blue-500' :
                            activity.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.desc}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Your attendance record for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">22</div>
                    <div className="text-sm text-muted-foreground">Days Present</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-sm text-muted-foreground">Days Absent</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-muted-foreground">Days Late</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
                <CardDescription>Your remaining leave days for this year</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveBalance.map((leave, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{leave.type}</span>
                      <span className="text-muted-foreground">
                        {leave.total - leave.used} of {leave.total} remaining
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${leave.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(leave.used / leave.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Your employment documents and records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile