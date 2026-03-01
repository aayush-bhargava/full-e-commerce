"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Activity, Sparkles, Heart, Hexagon, Loader2, Upload, X as CloseIcon } from "lucide-react";
import { getSettings, updateSettings, Settings, uploadLogo } from "@/lib/db";

const ICONS = [
    { id: "Activity", icon: Activity },
    { id: "Sparkles", icon: Sparkles },
    { id: "Heart", icon: Heart },
    { id: "Hexagon", icon: Hexagon },
];

export default function BrandingManager() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSettings();
            setSettings(data);
        };
        loadSettings();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setIsSaving(true);
        setMessage(null);

        try {
            let logoUrl = settings.logoUrl;

            // 1. Handle Upload if file selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append("logo", selectedFile);
                logoUrl = await uploadLogo(formData);
            }

            // 2. Update Settings
            const updatedSettings = { ...settings, logoUrl };
            await updateSettings(updatedSettings);

            setSettings(updatedSettings);
            setSelectedFile(null);
            setFilePreview(null);
            setMessage({ type: "success", text: "Branding updated!" });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Update failed." });
        } finally {
            setIsSaving(false);
        }
    };

    if (!settings) {
        return (
            <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-stone-100">
                <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-stone-900">Branding</h2>
                {message && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs font-bold px-2 py-1 rounded ${message.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            }`}
                    >
                        {message.text}
                    </motion.span>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Brand Name</label>
                        <input
                            type="text"
                            value={settings.brandName}
                            onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all text-sm"
                            placeholder="Brand Name"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Logo Image</label>
                            {settings.logoUrl && (
                                <button
                                    type="button"
                                    onClick={() => setSettings({ ...settings, logoUrl: "" })}
                                    className="text-[10px] text-red-500 font-bold uppercase tracking-tight hover:underline"
                                >
                                    Remove Logo
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {(filePreview || settings.logoUrl) ? (
                                    <img
                                        src={filePreview || settings.logoUrl}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-1"
                                    />
                                ) : (
                                    <div className="text-stone-300 flex flex-col items-center gap-1">
                                        <Upload size={20} />
                                        <span className="text-[8px] font-bold uppercase">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <label className="flex items-center justify-center gap-2 px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 cursor-pointer hover:bg-stone-50 transition-colors">
                                    <Upload size={14} />
                                    <span>{settings.logoUrl ? "Change Image" : "Upload Logo"}</span>
                                    <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                </label>
                                {filePreview && (
                                    <button
                                        type="button"
                                        onClick={() => { setSelectedFile(null); setFilePreview(null); }}
                                        className="mt-1 text-[10px] text-red-500 font-bold uppercase tracking-tight flex items-center gap-1 mx-auto"
                                    >
                                        <CloseIcon size={10} /> Cancel Selection
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                            Fallback Icon Style
                            {settings.logoUrl && <span className="ml-2 lowercase font-normal text-stone-400">(hidden by logo)</span>}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {ICONS.map((item) => {
                                const Icon = item.icon;
                                const isSelected = settings.logoIcon === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSettings({ ...settings, logoIcon: item.id })}
                                        className={`p-3 rounded-lg flex items-center justify-center transition-all border ${isSelected
                                            ? "border-stone-900 bg-stone-900 text-white shadow-sm"
                                            : "border-stone-100 bg-stone-50/50 text-stone-400 hover:bg-stone-50"
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all disabled:opacity-50 text-sm shadow-md active:scale-[0.98]"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                    {isSaving ? "Saving..." : "Save Branding"}
                </button>
            </form>
        </div>
    );
}
