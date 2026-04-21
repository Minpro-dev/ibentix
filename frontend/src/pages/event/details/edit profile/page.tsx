import React from 'react';
import Navbar from '../../../../ui/Navbar';
import { MobileNav } from '../../../../ui/MobileNav';

import ProfilePhoto from './components/Profile/ProfilePhoto';
import VerifiedBanner from './components/Profile/VerifiedBanner';
import PersonalDetailsForm from './components/Profile/PersonalDetailsForm';
import SecurityForm from './components/Profile/SecurityForm';
import Button from './components/ui/Button';
import { useAuthStore } from '../../../../store/useAuthStore';


export default function App() {
  const { isLoading } = useUserStore();

  const handleSave = () => {
    // In a real app, this would collect form data and call userService.updateProfile
    alert('Changes saved successfully (Simulation)');
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navbar />
      <div className="flex">
        
        <main className="flex-1 md:ml-64 p-4 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Header Section */}
            <header className="space-y-2">
              <h1 className="text-5xl font-black text-on-surface tracking-tight leading-tight">Edit Profile</h1>
              <p className="text-on-surface-variant text-lg">Manage your personal information and security preferences.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Sidebar: Profile Photo & Verification */}
              <div className="lg:col-span-4 space-y-6">
                <ProfilePhoto />
                <VerifiedBanner />
              </div>

              {/* Main Forms Section */}
              <div className="lg:col-span-8 space-y-8">
                <PersonalDetailsForm />
                <SecurityForm />

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="w-full sm:w-auto order-1 sm:order-2"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
