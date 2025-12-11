"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import withAuth from "@/utils/withAuth";
import { BiEditAlt } from "react-icons/bi";
import { steps } from "@/data";
import { FiEdit3 } from "react-icons/fi";

interface TourStep {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  steps: TourStep[];
  user_id?: string;
}

interface SupabaseStepRow {
  id: string;
  title: string;
  content: string;
  order: number;
  tour_id: string;
}

interface SupabaseTourRow {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  steps?: SupabaseStepRow[];
}

function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourDesc, setNewTourDesc] = useState("");

  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [editingTourTitle, setEditingTourTitle] = useState("");
  const [editingTourDesc, setEditingTourDesc] = useState("");

  const [newSteps, setNewSteps] = useState<{
    [tourId: string]: { title: string; content: string };
  }>({});

  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editingStepTitle, setEditingStepTitle] = useState("");
  const [editingStepContent, setEditingStepContent] = useState("");
  const [addingTour, setAddingTour] = useState(false);
  const [addingStep, setAddingStep] = useState<{ [tourId: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_e, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch tours
  useEffect(() => {
    if (!user) return;

    const fetchTours = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("tours")
          .select("*, steps(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formatted: Tour[] = (data as SupabaseTourRow[]).map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          created_at: t.created_at,
          updated_at: t.updated_at,
          user_id: t.user_id,
          steps: (t.steps || []).map((s: SupabaseStepRow) => ({
            id: s.id,
            title: s.title,
            content: s.content,
            order: s.order,
          })),
        }));

        setTours(formatted);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [user]);

  // Add new tour
  const handleAddTour = async () => {
    if (!user || !newTourTitle.trim()) return;

    try {
      setAddingTour(true); // start loading

      const { data: tour, error } = await supabase
        .from("tours")
        .insert([
          {
            title: newTourTitle,
            description: newTourDesc,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setTours([{ ...(tour as SupabaseTourRow), steps: [] }, ...tours]);
      setNewTourTitle("");
      setNewTourDesc("");
    } catch (err) {
      console.error(err);
      alert("Failed to create tour");
    } finally {
      setAddingTour(false); // stop loading
    }
  };

  // Edit tour
  const handleEditTour = (tour: Tour) => {
    setEditingTourId(tour.id);
    setEditingTourTitle(tour.title);
    setEditingTourDesc(tour.description || "");
  };

  const handleSaveTour = async (id: string) => {
    try {
      const { data: updated, error } = await supabase
        .from("tours")
        .update({
          title: editingTourTitle,
          description: editingTourDesc,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setTours(
        tours.map((t) =>
          t.id === id ? { ...(updated as SupabaseTourRow), steps: t.steps } : t,
        ),
      );

      setEditingTourId(null);
      setEditingTourTitle("");
      setEditingTourDesc("");
    } catch (err) {
      console.error(err);
      alert("Failed to update tour");
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Delete this tour?")) return;

    try {
      await supabase.from("steps").delete().eq("tour_id", id);
      await supabase.from("tours").delete().eq("id", id);
      setTours(tours.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete tour");
    }
  };

  const handleStepInputChange = (
    tourId: string,
    field: "title" | "content",
    value: string,
  ) => {
    setNewSteps((prev) => ({
      ...prev,
      [tourId]: { ...prev[tourId], [field]: value },
    }));
  };

  const handleAddStep = async (tourId: string) => {
    const { title, content } = newSteps[tourId] || {};
    if (!title?.trim()) return;

    try {
      setAddingStep((prev) => ({ ...prev, [tourId]: true })); // start loading

      const parentTour = tours.find((t) => t.id === tourId);

      const { data: step, error } = await supabase
        .from("steps")
        .insert([
          {
            tour_id: tourId,
            title,
            content,
            order: (parentTour?.steps.length || 0) + 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const formatted: TourStep = {
        id: (step as SupabaseStepRow).id,
        title: (step as SupabaseStepRow).title,
        content: (step as SupabaseStepRow).content,
        order: (step as SupabaseStepRow).order,
      };

      setTours(
        tours.map((t) =>
          t.id === tourId ? { ...t, steps: [...t.steps, formatted] } : t,
        ),
      );

      setNewSteps((prev) => ({
        ...prev,
        [tourId]: { title: "", content: "" },
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to add step");
    } finally {
      setAddingStep((prev) => ({ ...prev, [tourId]: false })); // stop loading
    }
  };

  const handleSaveStep = async (tourId: string, stepId: string) => {
    try {
      const { data: updated, error } = await supabase
        .from("steps")
        .update({
          title: editingStepTitle,
          content: editingStepContent,
        })
        .eq("id", stepId)
        .select()
        .single();

      if (error) throw error;

      const row = updated as SupabaseStepRow;

      setTours(
        tours.map((t) =>
          t.id === tourId
            ? {
                ...t,
                steps: t.steps.map((s) =>
                  s.id === stepId
                    ? {
                        id: row.id,
                        title: row.title,
                        content: row.content,
                        order: row.order,
                      }
                    : s,
                ),
              }
            : t,
        ),
      );

      setEditingStepId(null);
      setEditingStepTitle("");
      setEditingStepContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to update step");
    }
  };

  const handleDeleteStep = async (tourId: string, stepId: string) => {
    try {
      await supabase.from("steps").delete().eq("id", stepId);

      setTours(
        tours.map((t) =>
          t.id === tourId
            ? { ...t, steps: t.steps.filter((s) => s.id !== stepId) }
            : t,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete step");
    }
  };

  const handleDisable = () => {
    steps.length < 5;
  };

  useEffect(() => {
    console.log("Fetched tours:", tours);
  }, [tours]);

  return (
    <div className="flex min-h-screen overflow-x-hidden text-white">
      <main className="h-screen flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-tay-bea text-3xl text-black lg:text-5xl">
                Welcome back!
              </h2>
              <p className="mt-2 text-gray-700">
                Create and manage your interactive tours
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="bg-light-black/90 rounded-lg border p-3">
                  <span className="font-medium text-cyan-300">
                    {tours.length === 0 ? (
                      <span className="text-gray-100">No Tours</span>
                    ) : (
                      <>
                        <span className="font-bold text-cyan-300">
                          {tours.length}
                        </span>
                        <span className="ml-2 text-gray-100">
                          {tours.length === 1 ? "Tour" : "Tours"}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <div className="bg-light-black rounded-lg border p-3">
                  {(() => {
                    const totalSteps = tours.reduce(
                      (acc, tour) => acc + (tour.steps?.length ?? 0),
                      0,
                    );

                    return totalSteps === 0 ? (
                      <span className="text-gray-100">No Steps</span>
                    ) : (
                      <>
                        <span className="font-bold text-purple-300">
                          {totalSteps}
                        </span>
                        <span className="ml-2 text-gray-100">
                          {totalSteps === 1 ? "Step" : "Steps"}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Create New Tour */}
          <div className="bg-light-brown/40 rounded-2xl border border-white/10 p-8">
            <h3 className="text-light-black mb-4 text-xl font-bold">
              Create New Tour
            </h3>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Tour Title */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tour-title"
                  className="text-base font-medium text-gray-900"
                >
                  Tour Title
                </label>
                <input
                  id="tour-title"
                  type="text"
                  placeholder="Enter tour title"
                  className="bg-bg-color text-light-black rounded-lg border border-white/10 p-3"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                />
              </div>

              {/* Tour Description */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tour-desc"
                  className="text-base font-medium text-gray-900"
                >
                  Tour Description
                </label>
                <input
                  id="tour-desc"
                  type="text"
                  placeholder="Enter tour description"
                  className="bg-bg-color text-light-black rounded-lg border border-white/10 p-3"
                  value={newTourDesc}
                  onChange={(e) => setNewTourDesc(e.target.value)}
                />
              </div>
            </form>

            <button
              onClick={handleAddTour}
              className="bg-yellow/90 mt-4 inline-flex cursor-pointer items-center rounded-xl px-6 py-3 transition-colors duration-200 ease-in-out hover:bg-black"
              disabled={addingTour}
            >
              {addingTour ? (
                "Creating..."
              ) : (
                <>
                  <Plus className="mr-2 inline h-4 w-4" /> Create Tour
                </>
              )}
            </button>
          </div>

          {/* Tours List */}
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-light-brown/50 rounded-2xl border border-white/10 p-8"
            >
              {editingTourId === tour.id ? (
                <div className="space-y-4">
                  <input
                    className="w-full rounded-lg border border-white/10 bg-gray-800 p-3"
                    value={editingTourTitle}
                    onChange={(e) => setEditingTourTitle(e.target.value)}
                  />
                  <input
                    className="w-full rounded-lg border border-white/10 bg-gray-800 p-3"
                    value={editingTourDesc}
                    onChange={(e) => setEditingTourDesc(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveTour(tour.id)}
                      className="rounded-lg bg-green-600 px-4 py-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTourId(null)}
                      className="rounded-lg bg-gray-700 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold text-gray-900 capitalize sm:text-2xl">
                      {tour.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-gray-700">
                      {tour.description}
                    </p>
                    <p className="mt-1 text-sm text-gray-800">
                      {tour.steps.length === 0
                        ? "No Steps"
                        : tour.steps.length === 1
                          ? "1 Step"
                          : `${tour.steps.length} Steps`}
                    </p>
                  </div>

                  {/* Actions: stacked on mobile, inline on desktop */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0 md:gap-3">
                    <button
                      onClick={() => handleEditTour(tour)}
                      aria-label="Edit tour"
                      className="flex h-8 w-auto items-center justify-center rounded-md border border-white/30 bg-white/20 px-2 py-1 text-sm text-black hover:bg-white/15"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      aria-label="Delete tour"
                      className="flex h-8 items-center justify-center rounded-md border border-white/30 bg-white/20 px-2 py-1 text-sm hover:bg-white/15"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                      <span className="ml-2 hidden text-sm text-red-600 sm:inline">
                        Delete
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        const embedCode = `<script data-id="${tour.id}" src="https://tours-embed-widget-vite.vercel.app/main.iife.js"></script>`;
                        navigator.clipboard.writeText(embedCode);
                        alert("Embed code copied to clipboard!");
                      }}
                      aria-label="Copy embed code"
                      className="flex h-8 items-center justify-center rounded-md border border-white/30 bg-black px-3 py-1 text-sm hover:bg-black/80"
                    >
                      <span className="truncate">Copy Embed Code</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="mt-6 space-y-4">
                {tour.steps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-light-black/50 text-light-black flex justify-between rounded-lg p-4"
                  >
                    {editingStepId === step.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          className="bg-bg-color w-full rounded p-2"
                          value={editingStepTitle}
                          onChange={(e) => setEditingStepTitle(e.target.value)}
                        />
                        <textarea
                          className="bg-bg-color w-full rounded p-2"
                          value={editingStepContent}
                          onChange={(e) =>
                            setEditingStepContent(e.target.value)
                          }
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveStep(tour.id, step.id)}
                            className="rounded bg-green-600 px-3 py-1 text-white transition-colors duration-200 ease-in-out hover:bg-green-600/80"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingStepId(null)}
                            className="rounded bg-gray-600 px-3 py-1 text-white transition-colors duration-200 ease-in-out hover:bg-gray-600/80"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{step.title}</p>
                          <p className="text-sm text-white/80">
                            {step.content}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingStepId(step.id);
                              setEditingStepTitle(step.title);
                              setEditingStepContent(step.content);
                            }}
                            className="cursor-pointer rounded-lg border border-white/50 bg-white/20 p-2 hover:bg-white/15"
                          >
                            <FiEdit3 className="h-4 w-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteStep(tour.id, step.id)}
                            className="cursor-pointer rounded-lg border border-white/50 bg-white/20 p-2 hover:bg-white/15"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Add new step */}
                <form className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
                  {/* Step Title */}
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor={`step-title-${tour.id}`}
                      className="text-text mb-1 text-sm font-medium"
                    >
                      Step Title
                    </label>
                    <input
                      id={`step-title-${tour.id}`}
                      placeholder="Enter step title"
                      className="bg-bg-color text-text rounded p-2"
                      value={newSteps[tour.id]?.title || ""}
                      onChange={(e) =>
                        handleStepInputChange(tour.id, "title", e.target.value)
                      }
                    />
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor={`step-content-${tour.id}`}
                      className="text-text mb-1 text-sm font-medium"
                    >
                      Step Content
                    </label>
                    <input
                      id={`step-content-${tour.id}`}
                      placeholder="Enter step content"
                      className="bg-bg-color text-text rounded p-2"
                      value={newSteps[tour.id]?.content || ""}
                      onChange={(e) =>
                        handleStepInputChange(
                          tour.id,
                          "content",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  {/* Add Step Button */}
                  <button
                    onClick={() => handleAddStep(tour.id)}
                    type="button"
                    className="bg-yellow/90 mt-2 inline-flex w-fit cursor-pointer items-center rounded-xl px-6 py-3 transition-colors duration-200 ease-in-out hover:bg-black md:mt-6"
                    disabled={addingStep[tour.id]}
                  >
                    {addingStep[tour.id] ? (
                      "Adding..."
                    ) : (
                      <>
                        <Plus className="mr-1 inline h-4 w-4" /> Add Step
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default withAuth(ToursPage);
