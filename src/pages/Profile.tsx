import React, { useState } from "react";
import { LogOut, UserCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Omkar",
    email: "omkar@gmail.com",
    profilePic: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser({ ...user, profilePic: file });
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // or use context logout logic
    navigate("/login");
  };

  return (
    <Layout>
      <div className="min-h-screen py-10 px-4 max-w-2xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-2">
              {user.profilePic ? (
                <img
                  src={URL.createObjectURL(user.profilePic)}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              ) : (
                <UserCircle className="w-24 h-24 text-gray-400" />
              )}
              <div>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
            <CardTitle className="mt-4 text-2xl">Your Profile</CardTitle>
            <CardDescription>Update your personal information and profile photo</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
