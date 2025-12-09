"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabaseClient";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ChevronRight, 
  Layers, 
  BarChart3, 
  Settings,
  Globe,
  Map,
  Camera,
  Users
} from "lucide-react";

type Step = {
  id: string;
  tour_id: string;
  title: string;
  description: string;
  order: number;
};

type Tour = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  steps: Step[];
};

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTourName, setNewTourName] = useState("");
  const [newTourDesc, setNewTourDesc] = useState("");
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [editingTourName, setEditingTourName] = useState("");
  const [editingTourDesc, setEditingTourDesc] = useState("");

  const [newStepTitle, setNewStepTitle] = useState("");
  const [newStepDesc, setNewStepDesc] = useState("");
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editingStepTitle, setEditingStepTitle] = useState("");
  const [editingStepDesc, setEditingStepDesc] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tours")
        .select("*, steps(*)")
        .order("created_at", { ascending: false });
      if (error) console.error("Error fetching tours:", error);
      else setTours(data || []);
      setLoading(false);
    };
    fetchTours();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-spin"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Loading Tours...
              </span>
            </div>
          </div>
        </div>
      </div>
    );


  const handleAddTour = () => {
    if (!newTourName.trim()) return;
    const newTour: Tour = {
      id: uuidv4(),
      name: newTourName,
      description: newTourDesc,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      steps: [],
    };
    setTours([newTour, ...tours]);
    setNewTourName("");
    setNewTourDesc("");
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTourId(tour.id);
    setEditingTourName(tour.name);
    setEditingTourDesc(tour.description || "");
  };

  const handleSaveTour = (id: string) => {
    setTours(
      tours.map((tour) =>
        tour.id === id
          ? {
              ...tour,
              name: editingTourName,
              description: editingTourDesc,
              updated_at: new Date().toISOString(),
            }
          : tour
      )
    );
    setEditingTourId(null);
    setEditingTourName("");
    setEditingTourDesc("");
  };

  const handleDeleteTour = (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    setTours(tours.filter((tour) => tour.id !== id));
  };

  
  const handleAddStep = (tourId: string) => {
    if (!newStepTitle.trim()) return;
    const newStep: Step = {
      id: uuidv4(),
      tour_id: tourId,
      title: newStepTitle,
      description: newStepDesc,
      order: (tours.find((t) => t.id === tourId)?.steps.length ?? 0) + 1,
    };
    setTours(
      tours.map((t) =>
        t.id === tourId ? { ...t, steps: [...t.steps, newStep] } : t
      )
    );
    setNewStepTitle("");
    setNewStepDesc("");
  };

  const handleSaveStep = (tourId: string, stepId: string) => {
    setTours(
      tours.map((t) =>
        t.id === tourId
          ? {
              ...t,
              steps: t.steps.map((s) =>
                s.id === stepId
                  ? { ...s, title: editingStepTitle, description: editingStepDesc }
                  : s
              ),
            }
          : t
      )
    );
    setEditingStepId(null);
    setEditingStepTitle("");
    setEditingStepDesc("");
  };

  const handleDeleteStep = (tourId: string, stepId: string) => {
    setTours(
      tours.map((t) =>
        t.id === tourId ? { ...t, steps: t.steps.filter((s) => s.id !== stepId) } : t
      )
    );
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-20 lg:w-64 bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col items-center lg:items-start">
          <div className="flex items-center space-x-3 mb-12">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <Globe className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold hidden lg:block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              TourFlow
            </h1>
          </div>
          
          <nav className="flex flex-col space-y-4 w-full">
            <a href="#" className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 hover:border-cyan-400/30 transition-all group">
              <Layers className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Tours</span>
              <ChevronRight className="w-4 h-4 ml-auto hidden lg:block opacity-0 group-hover:opacity-100 transition" />
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group">
              <BarChart3 className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group">
              <Settings className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Settings</span>
            </a>
          </nav>
        </aside>

        
        <main className="flex-1 p-6 lg:p-10 overflow-x-auto">
          
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Tour Manager
                </h2>
                <p className="text-gray-300 mt-2">Create and manage your interactive tours</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-white/10">
                  <span className="font-bold text-cyan-300">{tours.length}</span>
                  <span className="text-gray-400 ml-2">Tours</span>
                </div>
                <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-white/10">
                  <span className="font-bold text-purple-300">
                    {tours.reduce((acc, tour) => acc + tour.steps.length, 0)}
                  </span>
                  <span className="text-gray-400 ml-2">Steps</span>
                </div>
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/30 transition-all">
                <div className="flex items-center space-x-3">
                  <Map className="w-8 h-8 text-cyan-300" />
                  <div>
                    <p className="text-sm text-gray-300">Active Tours</p>
                    <p className="text-2xl font-bold">{tours.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/30 transition-all">
                <div className="flex items-center space-x-3">
                  <Camera className="w-8 h-8 text-purple-300" />
                  <div>
                    <p className="text-sm text-gray-300">Total Steps</p>
                    <p className="text-2xl font-bold">
                      {tours.reduce((acc, tour) => acc + tour.steps.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 hover:border-pink-400/30 transition-all">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-pink-300" />
                  <div>
                    <p className="text-sm text-gray-300">Last Updated</p>
                    <p className="text-xl font-bold">Just Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="space-y-8 max-w-6xl mx-auto">
            
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 hover:border-cyan-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                  <Plus className="w-5 h-5" />
                </div>
                <span>Create New Tour</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="🌍 Tour Name"
                  value={newTourName}
                  onChange={(e) => setNewTourName(e.target.value)}
                  className="bg-gray-900/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <input
                  type="text"
                  placeholder="📝 Tour Description"
                  value={newTourDesc}
                  onChange={(e) => setNewTourDesc(e.target.value)}
                  className="bg-gray-900/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <button
                onClick={handleAddTour}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl px-8 py-4 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Tour</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            
            <div className="space-y-6">
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-cyan-500/10"
                >
                  
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                    {editingTourId === tour.id ? (
                      <div className="flex-1 space-y-4">
                        <input
                          value={editingTourName}
                          onChange={(e) => setEditingTourName(e.target.value)}
                          className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-4 text-xl font-bold focus:outline-none focus:border-cyan-500/50"
                          placeholder="Tour Name"
                        />
                        <input
                          value={editingTourDesc}
                          onChange={(e) => setEditingTourDesc(e.target.value)}
                          className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-purple-500/50"
                          placeholder="Tour Description"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSaveTour(tour.id)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </button>
                          <button
                            onClick={() => setEditingTourId(null)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 rounded-xl hover:shadow-lg transition-all border border-white/10"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
                              <span className="text-2xl font-bold text-cyan-300">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                                {tour.name}
                              </h3>
                              <p className="text-gray-300 mt-2">{tour.description}</p>
                              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                                <span>{tour.steps.length} steps</span>
                                <span>•</span>
                                <span>Created {new Date(tour.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditTour(tour)}
                            className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
                          >
                            <Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTour(tour.id)}
                            className="group flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                 
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-300 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>Tour Steps ({tour.steps.length})</span>
                      </h4>
                    </div>

                    
                    <div className="space-y-4">
                      {tour.steps.map((step, stepIndex) => (
                        <div
                          key={step.id}
                          className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-cyan-500/20 transition-all group/step"
                        >
                          {editingStepId === step.id ? (
                            <div className="space-y-4">
                              <input
                                value={editingStepTitle}
                                onChange={(e) => setEditingStepTitle(e.target.value)}
                                className="w-full bg-gray-900/50 border border-white/10 rounded-lg p-3 font-medium focus:outline-none focus:border-cyan-500/50"
                                placeholder="Step Title"
                              />
                              <textarea
                                value={editingStepDesc}
                                onChange={(e) => setEditingStepDesc(e.target.value)}
                                className="w-full bg-gray-900/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-purple-500/50"
                                placeholder="Step Description"
                                rows={3}
                              />
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleSaveStep(tour.id, step.id)}
                                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg hover:shadow transition-all"
                                >
                                  <Save className="w-4 h-4" />
                                  <span>Save</span>
                                </button>
                                <button
                                  onClick={() => setEditingStepId(null)}
                                  className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 rounded-lg hover:shadow transition-all"
                                >
                                  <X className="w-4 h-4" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
                                  <span className="font-bold text-purple-300">#{stepIndex + 1}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-lg text-white group-hover/step:text-cyan-300 transition-colors">
                                    {step.title}
                                  </p>
                                  <p className="text-gray-400 mt-1">{step.description}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingStepId(step.id);
                                    setEditingStepTitle(step.title);
                                    setEditingStepDesc(step.description);
                                  }}
                                  className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-all hover:scale-105"
                                  title="Edit Step"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStep(tour.id, step.id)}
                                  className="p-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg border border-white/10 hover:border-red-400/30 transition-all hover:scale-105"
                                  title="Delete Step"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    
                    <div className="mt-6 bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          placeholder="📍 Step Title"
                          value={newStepTitle}
                          onChange={(e) => setNewStepTitle(e.target.value)}
                          className="bg-gray-900/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                        <input
                          placeholder="📝 Step Description"
                          value={newStepDesc}
                          onChange={(e) => setNewStepDesc(e.target.value)}
                          className="bg-gray-900/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </div>
                      <button
                        onClick={() => handleAddStep(tour.id)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg px-6 py-3 hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Step</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}