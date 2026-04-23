// Per-category accent colors. Classes are written out in full so Tailwind's
// JIT can discover them at build time.
export const CATEGORY_COLORS = {
  productivity: {
    bar: 'bg-emerald-500',
    tint: 'bg-emerald-50',
    tintText: 'text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  email: {
    bar: 'bg-amber-500',
    tint: 'bg-amber-50',
    tintText: 'text-amber-700',
    iconBg: 'bg-amber-100 text-amber-700',
  },
  communication: {
    bar: 'bg-blue-500',
    tint: 'bg-blue-50',
    tintText: 'text-blue-700',
    iconBg: 'bg-blue-100 text-blue-700',
  },
  files: {
    bar: 'bg-teal-500',
    tint: 'bg-teal-50',
    tintText: 'text-teal-700',
    iconBg: 'bg-teal-100 text-teal-700',
  },
  identity: {
    bar: 'bg-indigo-500',
    tint: 'bg-indigo-50',
    tintText: 'text-indigo-700',
    iconBg: 'bg-indigo-100 text-indigo-700',
  },
  'device-management': {
    bar: 'bg-purple-500',
    tint: 'bg-purple-50',
    tintText: 'text-purple-700',
    iconBg: 'bg-purple-100 text-purple-700',
  },
  'threat-protection': {
    bar: 'bg-red-500',
    tint: 'bg-red-50',
    tintText: 'text-red-700',
    iconBg: 'bg-red-100 text-red-700',
  },
  'information-protection': {
    bar: 'bg-orange-500',
    tint: 'bg-orange-50',
    tintText: 'text-orange-700',
    iconBg: 'bg-orange-100 text-orange-700',
  },
  compliance: {
    bar: 'bg-rose-500',
    tint: 'bg-rose-50',
    tintText: 'text-rose-700',
    iconBg: 'bg-rose-100 text-rose-700',
  },
  analytics: {
    bar: 'bg-cyan-500',
    tint: 'bg-cyan-50',
    tintText: 'text-cyan-700',
    iconBg: 'bg-cyan-100 text-cyan-700',
  },
  voice: {
    bar: 'bg-sky-500',
    tint: 'bg-sky-50',
    tintText: 'text-sky-700',
    iconBg: 'bg-sky-100 text-sky-700',
  },
}

const DEFAULT_COLORS = {
  bar: 'bg-[#1d2d5c]',
  tint: 'bg-gray-50',
  tintText: 'text-gray-700',
  iconBg: 'bg-gray-100 text-gray-700',
}

export const getCategoryColors = (id) => CATEGORY_COLORS[id] || DEFAULT_COLORS
