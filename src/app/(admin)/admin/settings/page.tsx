"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, User, Globe, Mail, Shield } from "lucide-react"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [settings, setSettings] = useState({
        // Site Settings
        siteName: "Steve's Portfolio",
        siteDescription: "Entrepreneur, Innovator, and Business Leader",
        siteUrl: "https://steveportfolio.com",

        // Profile Settings
        profileName: "Steve",
        profileBio: "Passionate entrepreneur with a focus on innovation and technology.",
        profileEmail: "steve@example.com",

        // Newsletter Settings
        newsletterEnabled: true,
        welcomeEmailEnabled: true,

        // Security Settings
        twoFactorEnabled: false,
        loginNotifications: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-heading font-bold leading-relaxed">Settings</h2>
                <p className="text-muted-foreground">Manage your portfolio and account settings</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Site Settings */}
                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Site Settings
                        </CardTitle>
                        <CardDescription>Configure your portfolio website settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input
                                id="siteName"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="siteDescription">Site Description</Label>
                            <Textarea
                                id="siteDescription"
                                value={settings.siteDescription}
                                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="siteUrl">Site URL</Label>
                            <Input
                                id="siteUrl"
                                value={settings.siteUrl}
                                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Settings */}
                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="profileName">Name</Label>
                            <Input
                                id="profileName"
                                value={settings.profileName}
                                onChange={(e) => setSettings({ ...settings, profileName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profileBio">Bio</Label>
                            <Textarea
                                id="profileBio"
                                value={settings.profileBio}
                                onChange={(e) => setSettings({ ...settings, profileBio: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profileEmail">Email</Label>
                            <Input
                                id="profileEmail"
                                type="email"
                                value={settings.profileEmail}
                                onChange={(e) => setSettings({ ...settings, profileEmail: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Newsletter Settings */}
                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Newsletter Settings
                        </CardTitle>
                        <CardDescription>Configure newsletter and email preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Newsletter Signup</Label>
                                <p className="text-sm text-muted-foreground">Allow visitors to subscribe to your newsletter</p>
                            </div>
                            <Switch
                                checked={settings.newsletterEnabled}
                                onCheckedChange={(checked) => setSettings({ ...settings, newsletterEnabled: checked })}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Welcome Emails</Label>
                                <p className="text-sm text-muted-foreground">Send welcome emails to new subscribers</p>
                            </div>
                            <Switch
                                checked={settings.welcomeEmailEnabled}
                                onCheckedChange={(checked) => setSettings({ ...settings, welcomeEmailEnabled: checked })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="rounded-md shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security Settings
                        </CardTitle>
                        <CardDescription>Manage your account security preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <Switch
                                checked={settings.twoFactorEnabled}
                                onCheckedChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Login Notifications</Label>
                                <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                            </div>
                            <Switch
                                checked={settings.loginNotifications}
                                onCheckedChange={(checked) => setSettings({ ...settings, loginNotifications: checked })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Saving..." : "Save Settings"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
