"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

type Placement = "top" | "bottom" | "left" | "right";

export interface Step {
  target: string;
  title?: string;
  content?: string;
  placement?: Placement;
}

export interface TourScriptProps {
  steps?: Step[];
  onComplete?: () => void;
}

export const TourScript: React.FC<TourScriptProps> = ({
  steps = [],
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightPosition, setHighlightPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const updatePositions = useCallback(() => {
    const step = steps[currentStep];
    if (!step) return;

    const targetElement = document.querySelector(step.target);
    if (!targetElement) {
      console.warn(`Element not found: ${step.target}`);
      return;
    }

    const rect = targetElement.getBoundingClientRect();

    // Use viewport-relative coordinates and position fixed elements for stability
    setHighlightPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    // Calculate tooltip position after layout so tooltipRef exists
    requestAnimationFrame(() => {
      if (!tooltipRef.current) return;
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let top, left;

      const placement = step.placement || "bottom";
      const spacing = 12;

      switch (placement) {
        case "top":
          top = rect.top - tooltipRect.height - spacing;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + spacing;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.left - tooltipRect.width - spacing;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.right + spacing;
          break;
        default:
          top = rect.bottom + spacing;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      }

      // Keep tooltip within viewport
      const padding = 10;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding)
        left = window.innerWidth - tooltipRect.width - padding;
      if (top < padding)
        top = Math.min(
          rect.bottom + spacing,
          window.innerHeight - tooltipRect.height - padding,
        );

      setTooltipPosition({ top, left });
    });

    // Ensure element is visible (center) but don't block calculation
    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [steps, currentStep]);

  useEffect(() => {
    if (!isActive) return;

    // initial positioning
    updatePositions();

    const onResizeOrScroll = () => updatePositions();

    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll);
    };
  }, [isActive, currentStep, updatePositions]);

  const startTour = useCallback(() => {
    if (!steps || steps.length === 0) return;
    setCurrentStep(0);
    setIsActive(true);
  }, [steps]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < steps.length - 1) return prev + 1;
      // finish
      setIsActive(false);
      if (onComplete) onComplete();
      return 0;
    });
  }, [steps.length, onComplete]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      if (e.key === "Escape") endTour();
      else if (e.key === "ArrowRight") nextStep();
      else if (e.key === "ArrowLeft") previousStep();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, endTour, nextStep, previousStep]);

  if (!isActive) {
    return (
      <button
        onClick={startTour}
        id="demo"
        aria-label="Start tour"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          padding: "12px 20px",
          background: "#f0b420",
          color: "white",
          border: "none",
          borderRadius: "999px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(49, 130, 206, 0.4)",
          transition: "transform 0.15s, box-shadow 0.15s",
          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 6px 16px rgba(49, 130, 206, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(49, 130, 206, 0.4)";
        }}
      >
        Try Demo
      </button>
    );
  }

  const step = steps[currentStep] || {};

  return (
    <>
      {/* Overlay */}
      <div
        onClick={endTour}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 9998,
        }}
      />

      {/* Highlight (fixed so it follows viewport) */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: `${highlightPosition.top}px`,
          left: `${highlightPosition.left}px`,
          width: `${highlightPosition.width}px`,
          height: `${highlightPosition.height}px`,
          boxShadow:
            "0 0 0 4px rgba(49, 130, 206, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.6)",
          borderRadius: "8px",
          zIndex: 9999,
          pointerEvents: "none",
          transition: "all 0.25s ease",
        }}
      />

      {/* Tooltip (fixed positioning) */}
      <div
        ref={tooltipRef}
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          zIndex: 10000,
          maxWidth: "320px",
          overflow: "hidden",
          transition: "transform 0.18s ease, opacity 0.18s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            position: "relative",
          }}
        >
          <button
            onClick={endTour}
            aria-label="Close tour"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              fontSize: "20px",
              color: "#a0aec0",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f7fafc";
              e.currentTarget.style.color = "#2d3748";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "#a0aec0";
            }}
          >
            ×
          </button>

          <div
            style={{
              fontSize: "12px",
              color: "#718096",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Step {currentStep + 1} of {steps.length}
          </div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#2d3748",
              margin: 0,
              paddingRight: "36px",
            }}
          >
            {step.title}
          </h3>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ color: "#4a5568", lineHeight: 1.6, margin: 0 }}>
            {step.content}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            background: "#f7fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <div style={{ fontSize: "13px", color: "#718096" }}>{currentStep + 1} / {steps.length}</div> */}
          <div className="h-8 w-8"></div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                background: "#e2e8f0",
                color: "#2d3748",
                opacity: currentStep === 0 ? 0.5 : 1,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 0)
                  e.currentTarget.style.background = "#cbd5e0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
              }}
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                background: "#3182ce",
                color: "white",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2c5282";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#3182ce";
              }}
            >
              {currentStep === steps.length - 1 ? "Finish ✓" : "Next"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
`}</style>
    </>
  );
};

export default TourScript;
