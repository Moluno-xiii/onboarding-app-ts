"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { BiEditAlt } from "react-icons/bi";
import withAuth from "@/utils/withAuth";

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
  const [copied, setCopied] = useState(false);

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
                Welcome Back!
              </h2>
              <p className="mt-2 text-lg text-gray-800">
                Create and manage your interactive tours
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-lg border bg-black/80 px-8 py-3 text-lg">
                {tours.length > 0 && (
                  <span className="text-yellow text-xl font-bold">
                    {tours.length}
                  </span>
                )}
                <span className="ml-2 text-gray-100">
                  {tours.length === 0
                    ? "No Tours"
                    : tours.length === 1
                      ? "Tour"
                      : "Tours"}
                </span>
              </div>

              <div className="rounded-lg border bg-black/80 px-8 py-3 text-lg">
                <span className="text-purple text-xl font-bold">
                  {tours.length > 0 &&
                    tours.reduce(
                      (acc, tour) => acc + (tour.steps?.length ?? 0),
                      0,
                    )}
                </span>

                <span className="ml-2 text-gray-100">
                  {(() => {
                    const totalSteps = tours.reduce(
                      (acc, tour) => acc + (tour.steps?.length ?? 0),
                      0,
                    );

                    return totalSteps === 0
                      ? "No Steps"
                      : totalSteps === 1
                        ? "Step"
                        : "Steps";
                  })()}
                </span>
              </div>
            </div>
          </div>

          {/* Create New Tour */}
          <div className="bg-light-brown/80 rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-bold text-black">
              Create New Tour
            </h3>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <label className="text-gray-800">Tour Title</label>
                <input
                  placeholder="Enter tour title"
                  className="bg-bg-color rounded-lg border border-white/10 p-3 text-black"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-gray-800">Tour Description</label>
                <input
                  placeholder="Enter tour description"
                  className="bg-bg-color rounded-lg border border-white/10 p-3 text-black"
                  value={newTourDesc}
                  onChange={(e) => setNewTourDesc(e.target.value)}
                />
              </div>
            </form>

            <button
              onClick={handleAddTour}
              className="bg-yellow/80 hover:bg-light-black mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 transition-colors"
            >
              <Plus className="inline h-4 w-4" />
              Create Tour
            </button>
          </div>

          {/* Tours List */}
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-light-brown/80 rounded-2xl border border-white/10 p-8"
            >
              {editingTourId === tour.id ? (
                <div className="space-y-3">
                  <input
                    className="w-full rounded-lg border border-white/10 bg-gray-800 p-3"
                    value={editingTourTitle}
                    placeholder="Enter tour title"
                    onChange={(e) => setEditingTourTitle(e.target.value)}
                  />
                  <input
                    className="w-full rounded-lg border border-white/10 bg-gray-800 p-3"
                    value={editingTourDesc}
                    placeholder="Enter tour description"
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
                <div className="flex items-start justify-between">
                  <div className="text-light-black">
                    <h3 className="text-2xl font-bold capitalize">
                      {tour.title}
                    </h3>
                    <p className="">{tour.description}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-lg">{tour.steps.length} </span>
                      Steps
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTour(tour)}
                      className="cursor-pointer rounded-lg border border-white/70 bg-white/20 px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-white/15"
                    >
                      {/* <Edit2 className="h-4 w-4" /> */}
                      <BiEditAlt className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      aria-label="Edit tour"
                      title="Edit tour"
                      className="cursor-pointer rounded-lg border border-white/70 bg-white/20 px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-white/15"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {/* Copy Embed Code Button */}
                    <button
                      onClick={() => {
                        const embedCode = `<script data-id="${tour.id}" src="https://tours-embed-widget-vite.vercel.app/main.iife.js"></script>`;
                        navigator.clipboard.writeText(embedCode);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      aria-label="Edit tour"
                      title="Edit tour"
                      className="bg-yellow/80 hover:bg-light-black/80 cursor-pointer rounded-lg border border-white/10 p-2 transition-colors duration-200 ease-in-out md:w-40"
                    >
                      {copied ? "Copied!" : "Copy Embed Code"}
                    </button>
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="mt-6 space-y-4">
                {tour.steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex justify-between rounded-lg bg-gray-800/50 p-4"
                  >
                    {editingStepId === step.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          className="w-full rounded bg-gray-700 p-2"
                          value={editingStepTitle}
                          aria-label="Edit tour"
                          title="Edit tour"
                          onChange={(e) => setEditingStepTitle(e.target.value)}
                        />
                        <textarea
                          className="w-full rounded bg-gray-700 p-2"
                          value={editingStepContent}
                          onChange={(e) =>
                            setEditingStepContent(e.target.value)
                          }
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveStep(tour.id, step.id)}
                            className="rounded bg-green-600 px-3 py-1"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingStepId(null)}
                            className="rounded bg-gray-600 px-3 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="font-bold">{step.title}</p>
                          <p className="text-sm text-gray-300">
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
                            className="cursor-pointer rounded border border-white/10 bg-white/20 p-2 transition-colors duration-200 ease-in-out hover:bg-white/15"
                          >
                            <BiEditAlt className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStep(tour.id, step.id)}
                            aria-label="Delete tour"
                            title="Delete tour"
                            className="cursor-pointer rounded border border-white/10 bg-white/20 p-2 transition-colors duration-200 ease-in-out hover:bg-white/15"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Add new step */}
                <div className="mt-3 flex flex-col items-end gap-x-2 gap-y-4 md:flex-row">
                  {/* Step Title */}
                  <div className="flex w-full flex-1 flex-col gap-1">
                    <label className="font-medium text-gray-800">
                      Step Title
                    </label>
                    <input
                      placeholder="Enter step title"
                      className="bg-bg-color rounded p-2 text-gray-800"
                      value={newSteps[tour.id]?.title || ""}
                      onChange={(e) =>
                        handleStepInputChange(tour.id, "title", e.target.value)
                      }
                    />
                  </div>

                  {/* Step Content */}
                  <div className="flex w-full flex-1 flex-col gap-1">
                    <label className="font-medium text-gray-800">
                      Step Content
                    </label>
                    <input
                      placeholder="Enter step content"
                      className="bg-bg-color rounded p-2 text-gray-800"
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
                  <button
                    onClick={() => handleAddStep(tour.id)}
                    className="bg-yellow hover:bg-light-black h-fit w-full cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out md:w-fit"
                  >
                    <Plus className="mr-1 inline h-4 w-4" /> Add Step
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default withAuth(ToursPage);
