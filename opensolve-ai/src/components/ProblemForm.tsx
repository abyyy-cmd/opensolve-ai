"use client";

import { useState } from "react";
import { Category, Urgency, ProblemInput } from "@/lib/types";

const MAX_TITLE = 150;
const MAX_DESCRIPTION = 5000;
const MAX_LOCATION = 200;
const MAX_AFFECTED = 300;

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  affectedUsers?: string;
  urgency?: string;
}

interface ProblemFormProps {
  onSubmit: (data: ProblemInput) => void;
}

export default function ProblemForm({ onSubmit }: ProblemFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<ProblemInput>({
    title: "",
    description: "",
    category: "Other",
    location: "",
    affectedUsers: "",
    urgency: "medium",
  });

  function updateField(key: keyof ProblemInput, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key as keyof FormErrors]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.affectedUsers.trim())
      newErrors.affectedUsers = "Please specify who is affected";
    if (!form.urgency) newErrors.urgency = "Urgency level is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      location: form.location.trim(),
      affectedUsers: form.affectedUsers.trim(),
      urgency: form.urgency,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Problem Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={MAX_TITLE}
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="What problem are you trying to solve?"
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={!!errors.title}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
            errors.title
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
          } focus:ring-2`}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.title ? (
            <p id="title-error" className="text-xs text-red-600" role="alert">
              {errors.title}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400">
            {form.title.length}/{MAX_TITLE}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={MAX_DESCRIPTION}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe the problem, what is happening, and why it matters..."
          rows={6}
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={!!errors.description}
          className={`w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
            errors.description
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
          } focus:ring-2`}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.description ? (
            <p
              id="description-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {errors.description}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400">
            {form.description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      {/* Category + Urgency */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value as Category)}
            aria-invalid={!!errors.category}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Agriculture">Agriculture</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Community">Community</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.category}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="urgency"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Urgency <span className="text-red-500">*</span>
          </label>
          <select
            id="urgency"
            name="urgency"
            value={form.urgency}
            onChange={(e) => updateField("urgency", e.target.value as Urgency)}
            aria-invalid={!!errors.urgency}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          {errors.urgency && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.urgency}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Location{" "}
          <span className="text-xs font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          maxLength={MAX_LOCATION}
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="Where is this problem occurring?"
          aria-describedby="location-hint"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <div className="mt-1 flex items-center justify-between">
          <span id="location-hint" className="text-xs text-gray-400">
            Country, region, or community
          </span>
          <span className="text-xs text-gray-400">
            {form.location.length}/{MAX_LOCATION}
          </span>
        </div>
      </div>

      {/* Affected Users */}
      <div>
        <label
          htmlFor="affectedUsers"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Who is affected? <span className="text-red-500">*</span>
        </label>
        <input
          id="affectedUsers"
          name="affectedUsers"
          type="text"
          required
          maxLength={MAX_AFFECTED}
          value={form.affectedUsers}
          onChange={(e) => updateField("affectedUsers", e.target.value)}
          placeholder="Who is affected by this problem?"
          aria-describedby={errors.affectedUsers ? "affected-error" : undefined}
          aria-invalid={!!errors.affectedUsers}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
            errors.affectedUsers
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20"
          } focus:ring-2`}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.affectedUsers ? (
            <p
              id="affected-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {errors.affectedUsers}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400">
            {form.affectedUsers.length}/{MAX_AFFECTED}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Analyze Problem
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </form>
  );
}
