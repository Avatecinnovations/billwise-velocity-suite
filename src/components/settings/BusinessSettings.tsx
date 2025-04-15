
import { useState } from "react";
import { Building, Mail, Phone, MapPin, Globe, Upload, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const BusinessSettings = () => {
  const [businessData, setBusinessData] = useState({
    name: "Your Business Name",
    email: "contact@yourbusiness.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State, ZIP",
    website: "www.yourbusiness.com",
    taxId: "TAX-123456",
    logo: "",
    contactPerson: "John Doe",
    contactPosition: "CEO"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData({
      ...businessData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    // In a real app, this would be connected to a backend
    toast.success("Business information saved successfully!");
  };
  
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          This information will appear on your invoices and other documents
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              {businessData.logo ? (
                <img 
                  src={businessData.logo} 
                  alt="Business Logo" 
                  className="max-w-full max-h-full p-2"
                />
              ) : (
                <div className="text-center p-4">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload your business logo</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or SVG (max 2MB)</p>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              className="mt-3"
              onClick={() => {/* File upload logic would go here */}}
            >
              Upload Logo
            </Button>
          </div>
          
          <div className="md:w-2/3 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="business-name"
                  name="name"
                  className="pl-10"
                  value={businessData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="business-email"
                    name="email"
                    type="email"
                    className="pl-10"
                    value={businessData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="business-phone"
                    name="phone"
                    className="pl-10"
                    value={businessData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Textarea 
                  id="business-address"
                  name="address"
                  className="pl-10 min-h-[80px]"
                  value={businessData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="business-website"
                    name="website"
                    className="pl-10"
                    value={businessData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-tax-id">Tax ID / VAT Number</Label>
                <Input 
                  id="business-tax-id"
                  name="taxId"
                  value={businessData.taxId}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="contact-person"
                    name="contactPerson"
                    className="pl-10"
                    value={businessData.contactPerson}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-position">Position</Label>
                <Input 
                  id="contact-position"
                  name="contactPosition"
                  value={businessData.contactPosition}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">Business Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                Your business information will be used on invoices, quotes, and other documents
                sent to your clients. It's important to keep this information up to date.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSettings;
